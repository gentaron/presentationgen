export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'business' | 'minimal' | 'creative' | 'academic';
  thumbnail: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  layouts: LayoutConfig[];
}

export interface LayoutConfig {
  id: string;
  name: string;
  type: 'title' | 'content' | 'image' | 'chart' | 'split' | 'quote';
  elements: ElementConfig[];
}

export interface ElementConfig {
  id: string;
  type: 'text' | 'image' | 'shape' | 'chart';
  position: { x: number; y: number; width: number; height: number };
  style: Record<string, any>;
  content?: string;
}

export interface Slide {
  id: string;
  layoutId: string;
  elements: SlideElement[];
  order: number;
}

export interface SlideElement {
  id: string;
  type: 'text' | 'image' | 'shape' | 'chart';
  content: string | ImageContent | ChartContent;
  style: ElementStyle;
  position: Position;
}

export interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ElementStyle {
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  backgroundColor?: string;
  textAlign?: 'left' | 'center' | 'right';
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
}

export interface ImageContent {
  src: string;
  alt: string;
}

export interface ChartContent {
  type: 'bar' | 'line' | 'pie' | 'doughnut';
  data: ChartData;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string[];
  }[];
}

export interface Presentation {
  id: string;
  title: string;
  templateId: string;
  slides: Slide[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ColorTheme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
}