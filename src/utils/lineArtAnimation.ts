export interface LineArtAnimationOptions {
  duration?: number;
  delay?: number;
  easing?: string;
  iterations?: number | 'infinite';
  direction?: 'draw' | 'erase';
}

export interface LineArtAnimationResult {
  style: Record<string, string | number>;
  attributes: Record<string, string>;
  keyframesName: string;
  keyframesCss: string;
}

const toIterationCount = (iterations: number | 'infinite' = 1): string =>
  iterations === 'infinite' ? 'infinite' : String(iterations);

export const getSvgPathLength = (element: SVGGeometryElement): number => {
  if (typeof element.getTotalLength === 'function') {
    return element.getTotalLength();
  }
  const d = element.getAttribute('d') || '';
  return Math.max(d.length, 1);
};

export const createLineArtAnimation = (
  element: SVGGeometryElement,
  options: LineArtAnimationOptions = {}
): LineArtAnimationResult => {
  const {
    duration = 2,
    delay = 0,
    easing = 'ease',
    iterations = 1,
    direction = 'draw',
  } = options;

  const length = Math.max(getSvgPathLength(element), 0);
  const from = direction === 'draw' ? length : 0;
  const to = direction === 'draw' ? 0 : length;
  const keyframesName = `line-art-draw-${Math.round(length)}-${direction}`;

  const attributes = {
    'stroke-dasharray': `${length}`,
    'stroke-dashoffset': `${from}`,
  };

  const style = {
    animationName: keyframesName,
    animationDuration: `${duration}s`,
    animationTimingFunction: easing,
    animationDelay: `${delay}s`,
    animationIterationCount: toIterationCount(iterations),
    animationFillMode: 'forwards',
  };

  const keyframesCss = `@keyframes ${keyframesName}{from{stroke-dashoffset:${from};}to{stroke-dashoffset:${to};}}`;

  return { style, attributes, keyframesName, keyframesCss };
};

export const applyLineArtAnimation = (
  element: SVGGeometryElement,
  options: LineArtAnimationOptions = {}
): LineArtAnimationResult => {
  const result = createLineArtAnimation(element, options);

  element.setAttribute('stroke-dasharray', result.attributes['stroke-dasharray']);
  element.setAttribute('stroke-dashoffset', result.attributes['stroke-dashoffset']);
  element.style.animationName = String(result.style.animationName);
  element.style.animationDuration = String(result.style.animationDuration);
  element.style.animationTimingFunction = String(result.style.animationTimingFunction);
  element.style.animationDelay = String(result.style.animationDelay);
  element.style.animationIterationCount = String(result.style.animationIterationCount);
  element.style.animationFillMode = String(result.style.animationFillMode);

  return result;
};
