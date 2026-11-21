export type SvgPrimitiveKind =
  | 'rect'
  | 'circle'
  | 'ellipse'
  | 'line'
  | 'polygon'
  | 'path'
  | 'text'
  | 'image';

export interface SvgPrimitive {
  id: string;
  kind: SvgPrimitiveKind;
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
}

export interface SvgHierarchyNode {
  id: string;
  label: string;
  kind: SvgPrimitiveKind | 'group';
  children: SvgHierarchyNode[];
}

const KIND_LABELS: Record<SvgPrimitiveKind, string> = {
  rect: '矩形',
  circle: '円',
  ellipse: '楕円',
  line: '線',
  polygon: '多角形',
  path: 'パス',
  text: 'テキスト',
  image: '画像',
};

const MIN_OVERLAP = 0.6;

interface Box {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

function boxOf(primitive: SvgPrimitive): Box {
  const centerX = primitive.x + primitive.width / 2;
  const centerY = primitive.y + primitive.height / 2;
  const halfWidth = Math.max(Math.abs(primitive.width), 1e-6) / 2;
  const halfHeight = Math.max(Math.abs(primitive.height), 1e-6) / 2;
  return {
    left: centerX - halfWidth,
    top: centerY - halfHeight,
    right: centerX + halfWidth,
    bottom: centerY + halfHeight,
  };
}

function area(box: Box): number {
  return Math.max(0, box.right - box.left) * Math.max(0, box.bottom - box.top);
}

function overlapRatio(inner: Box, outer: Box): number {
  const innerArea = area(inner);
  if (innerArea === 0) return 0;
  const width = Math.max(0, Math.min(inner.right, outer.right) - Math.max(inner.left, outer.left));
  const height = Math.max(0, Math.min(inner.bottom, outer.bottom) - Math.max(inner.top, outer.top));
  return (width * height) / innerArea;
}

function distanceRatio(a: Box, b: Box): number {
  const ax = (a.left + a.right) / 2;
  const ay = (a.top + a.bottom) / 2;
  const bx = (b.left + b.right) / 2;
  const by = (b.top + b.bottom) / 2;
  const span = Math.max(1, Math.hypot(b.right - b.left, b.bottom - b.top));
  return Math.hypot(ax - bx, ay - by) / span;
}

export function buildSvgHierarchy(primitives: SvgPrimitive[]): SvgHierarchyNode {
  const root: SvgHierarchyNode = {
    id: 'svg-root',
    label: 'SVG ルート',
    kind: 'group',
    children: [],
  };
  const placed: { node: SvgHierarchyNode; box: Box; kind: SvgPrimitiveKind }[] = [];
  const ordered = primitives
    .map((primitive, index) => ({ primitive, index, box: boxOf(primitive) }))
    .sort((a, b) => area(b.box) - area(a.box) || a.index - b.index);

  for (const item of ordered) {
    const node: SvgHierarchyNode = {
      id: item.primitive.id,
      label: item.primitive.label?.trim() || KIND_LABELS[item.primitive.kind] || '図形',
      kind: item.primitive.kind,
      children: [],
    };
    let parent = root;
    let bestScore = -Infinity;
    for (const candidate of placed) {
      const ratio = overlapRatio(item.box, candidate.box);
      if (ratio < MIN_OVERLAP) continue;
      const thinKind = candidate.kind === 'line' || candidate.kind === 'text' ? 0.2 : 0;
      const score = ratio - thinKind - distanceRatio(item.box, candidate.box) * 0.1;
      if (score > bestScore) {
        bestScore = score;
        parent = candidate.node;
      }
    }
    parent.children.push(node);
    placed.push({ node, box: item.box, kind: item.primitive.kind });
  }

  return root;
}
