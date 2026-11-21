import assert from 'node:assert/strict';
import test from 'node:test';
import { buildSvgHierarchy, type SvgHierarchyNode, type SvgPrimitive } from '../src/lib/svgHierarchy.ts';

function collect(node: SvgHierarchyNode, result: SvgHierarchyNode[]): void {
  result.push(node);
  node.children.forEach((child) => collect(child, result));
}

test('builds a labeled hierarchy containing every SVG primitive', () => {
  const primitives: SvgPrimitive[] = [
    { id: 'background', kind: 'rect', x: 0, y: 0, width: 200, height: 120 },
    { id: 'badge', kind: 'circle', x: 20, y: 20, width: 40, height: 40, label: 'バッジ' },
    { id: 'caption', kind: 'text', x: 24, y: 30, width: 30, height: 8 },
    { id: 'divider', kind: 'line', x: 150, y: 10, width: 0, height: 100 },
  ];

  const nodes: SvgHierarchyNode[] = [];
  collect(buildSvgHierarchy(primitives), nodes);

  const primitiveIds = primitives.map((primitive) => primitive.id);
  const foundIds = nodes.map((node) => node.id).filter((id) => primitiveIds.includes(id));
  assert.deepEqual([...foundIds].sort(), [...primitiveIds].sort());
  assert.ok(nodes.every((node) => node.label.trim().length > 0));

  const background = nodes.find((node) => node.id === 'background')!;
  const badge = nodes.find((node) => node.id === 'badge')!;
  const caption = nodes.find((node) => node.id === 'caption')!;
  assert.ok(background.children.includes(badge));
  assert.ok(badge.children.includes(caption));
  assert.equal(badge.label, 'バッジ');
});
