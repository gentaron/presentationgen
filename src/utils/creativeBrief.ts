import type { Slide, SlideElement, Template } from '../types';

export interface CreativeBrief {
  title: string;
  context: string;
  goal: string;
  audience: string;
  keyPoints: string[];
  references: string[];
}

export function parseCreativeBrief(value: unknown): CreativeBrief {
  if (!value || typeof value !== 'object') throw new Error('JSON object required');
  const root = value as Record<string, unknown>;
  if (root.schemaVersion !== 1 || root.type !== 'creative-brief') {
    throw new Error('Expected creative-brief schemaVersion 1');
  }
  if (!root.brief || typeof root.brief !== 'object' || !root.source || typeof root.source !== 'object') {
    throw new Error('Brief and source are required');
  }
  const brief = root.brief as Record<string, unknown>;
  const source = root.source as Record<string, unknown>;
  if (typeof brief.title !== 'string' || !brief.title.trim() ||
      typeof brief.context !== 'string' || !brief.context.trim()) {
    throw new Error('Title and context are required');
  }
  if (typeof source.url !== 'string' || !/^https:\/\/[^\s]+$/.test(source.url)) {
    throw new Error('A valid HTTPS source URL is required');
  }
  if (!Array.isArray(brief.keyPoints) || !brief.keyPoints.every((point) => typeof point === 'string') ||
      !Array.isArray(brief.references) || !brief.references.every((url) => typeof url === 'string' && /^https:\/\/[^\s]+$/.test(url))) {
    throw new Error('keyPoints and references must be valid arrays');
  }
  return {
    title: brief.title.trim(),
    context: brief.context.trim(),
    goal: typeof brief.goal === 'string' ? brief.goal.trim() : '',
    audience: typeof brief.audience === 'string' ? brief.audience.trim() : '',
    keyPoints: brief.keyPoints.map((point: string) => point.trim()).filter(Boolean).slice(0, 20),
    references: [...new Set([source.url, ...brief.references])],
  };
}

export function slidesFromBrief(brief: CreativeBrief, template: Template): Slide[] {
  const text = (id: string, content: string, x: number, y: number, width: number, height: number, fontSize: number, bold = false): SlideElement => ({
    id,
    type: 'text',
    content,
    style: { fontSize, color: template.colors.text, fontFamily: 'Arial', fontWeight: bold ? 'bold' : 'normal' },
    position: { x, y, width, height },
  });
  const layoutId = template.layouts[0]?.id || 'default';
  const slides: Slide[] = [
    {
      id: 'brief-title',
      layoutId,
      order: 0,
      elements: [
        text('title', brief.title, 10, 25, 80, 25, 36, true),
        text('goal', brief.goal || '目的を編集してください', 10, 58, 80, 15, 20),
      ],
    },
    {
      id: 'brief-context',
      layoutId,
      order: 1,
      elements: [
        text('heading', '背景と出典', 10, 10, 80, 15, 30, true),
        text('context', brief.context, 10, 30, 80, 40, 18),
        text('sources', brief.references.join('\n'), 10, 75, 80, 15, 11),
      ],
    },
  ];
  if (brief.keyPoints.length || brief.audience) {
    slides.push({
      id: 'brief-points',
      layoutId,
      order: 2,
      elements: [
        text('heading', '要点', 10, 10, 80, 15, 30, true),
        text('points', brief.keyPoints.map((point) => '• ' + point).join('\n') || '要点を編集してください', 10, 30, 80, 45, 18),
        text('audience', brief.audience ? '対象: ' + brief.audience : '', 10, 80, 80, 10, 14),
      ],
    });
  }
  return slides;
}
