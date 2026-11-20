import { applyLineArtAnimation, createLineArtAnimation } from './lineArtAnimation';

export function lineArtAnimationUsageExample(): string {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M10 10 H 90 V 90 H 10 Z');
  path.getTotalLength = () => 320;

  const result = applyLineArtAnimation(path, { duration: 1.5, delay: 0.2, easing: 'ease-in-out' });

  return [
    path.getAttribute('stroke-dasharray'),
    path.getAttribute('stroke-dashoffset'),
    path.style.animationName,
    createLineArtAnimation(path, { direction: 'erase' }).keyframesCss,
  ].join('|');
}
