import { Template } from '../types';

export const templates: Template[] = [
  {
    id: 'business-corporate',
    name: 'Corporate Professional',
    description: 'Clean and professional design perfect for business presentations',
    category: 'business',
    thumbnail: '',
    colors: {
      primary: '#1e40af',
      secondary: '#3b82f6',
      accent: '#60a5fa',
      background: '#ffffff',
      text: '#1f2937'
    },
    layouts: [
      {
        id: 'title-slide',
        name: 'Title Slide',
        type: 'title',
        elements: [
          {
            id: 'title',
            type: 'text',
            position: { x: 10, y: 30, width: 80, height: 20 },
            style: { fontSize: 44, fontWeight: 'bold', textAlign: 'center' }
          },
          {
            id: 'subtitle',
            type: 'text',
            position: { x: 10, y: 55, width: 80, height: 10 },
            style: { fontSize: 20, textAlign: 'center' }
          }
        ]
      },
      {
        id: 'content-slide',
        name: 'Content Slide',
        type: 'content',
        elements: [
          {
            id: 'title',
            type: 'text',
            position: { x: 10, y: 10, width: 80, height: 15 },
            style: { fontSize: 32, fontWeight: 'bold' }
          },
          {
            id: 'content',
            type: 'text',
            position: { x: 10, y: 30, width: 80, height: 60 },
            style: { fontSize: 18 }
          }
        ]
      }
    ]
  },
  {
    id: 'business-modern',
    name: 'Modern Business',
    description: 'Contemporary design with bold colors for impactful presentations',
    category: 'business',
    thumbnail: '',
    colors: {
      primary: '#7c3aed',
      secondary: '#a855f7',
      accent: '#c084fc',
      background: '#ffffff',
      text: '#374151'
    },
    layouts: [
      {
        id: 'title-slide',
        name: 'Title Slide',
        type: 'title',
        elements: [
          {
            id: 'title',
            type: 'text',
            position: { x: 15, y: 35, width: 70, height: 20 },
            style: { fontSize: 40, fontWeight: 'bold' }
          },
          {
            id: 'subtitle',
            type: 'text',
            position: { x: 15, y: 60, width: 70, height: 10 },
            style: { fontSize: 18 }
          }
        ]
      }
    ]
  },
  {
    id: 'minimal-clean',
    name: 'Clean Minimal',
    description: 'Minimalist design focusing on content with clean typography',
    category: 'minimal',
    thumbnail: '',
    colors: {
      primary: '#374151',
      secondary: '#6b7280',
      accent: '#9ca3af',
      background: '#ffffff',
      text: '#111827'
    },
    layouts: [
      {
        id: 'title-slide',
        name: 'Title Slide',
        type: 'title',
        elements: [
          {
            id: 'title',
            type: 'text',
            position: { x: 20, y: 40, width: 60, height: 15 },
            style: { fontSize: 36, fontWeight: 'normal' }
          },
          {
            id: 'subtitle',
            type: 'text',
            position: { x: 20, y: 58, width: 60, height: 8 },
            style: { fontSize: 16 }
          }
        ]
      }
    ]
  },
  {
    id: 'minimal-typography',
    name: 'Typography Focus',
    description: 'Typography-centered design with elegant spacing and hierarchy',
    category: 'minimal',
    thumbnail: '',
    colors: {
      primary: '#000000',
      secondary: '#404040',
      accent: '#808080',
      background: '#ffffff',
      text: '#000000'
    },
    layouts: [
      {
        id: 'title-slide',
        name: 'Title Slide',
        type: 'title',
        elements: [
          {
            id: 'title',
            type: 'text',
            position: { x: 10, y: 35, width: 80, height: 20 },
            style: { fontSize: 48, fontWeight: 'bold', textAlign: 'left' }
          }
        ]
      }
    ]
  },
  {
    id: 'creative-vibrant',
    name: 'Vibrant Creative',
    description: 'Bold and colorful design perfect for creative presentations',
    category: 'creative',
    thumbnail: '',
    colors: {
      primary: '#f59e0b',
      secondary: '#ef4444',
      accent: '#8b5cf6',
      background: '#1f2937',
      text: '#ffffff'
    },
    layouts: [
      {
        id: 'title-slide',
        name: 'Title Slide',
        type: 'title',
        elements: [
          {
            id: 'title',
            type: 'text',
            position: { x: 15, y: 30, width: 70, height: 25 },
            style: { fontSize: 42, fontWeight: 'bold' }
          },
          {
            id: 'subtitle',
            type: 'text',
            position: { x: 15, y: 60, width: 70, height: 12 },
            style: { fontSize: 20 }
          }
        ]
      }
    ]
  },
  {
    id: 'creative-artistic',
    name: 'Artistic Expression',
    description: 'Artistic and expressive design for creative storytelling',
    category: 'creative',
    thumbnail: '',
    colors: {
      primary: '#ec4899',
      secondary: '#06b6d4',
      accent: '#84cc16',
      background: '#0f172a',
      text: '#f1f5f9'
    },
    layouts: [
      {
        id: 'title-slide',
        name: 'Title Slide',
        type: 'title',
        elements: [
          {
            id: 'title',
            type: 'text',
            position: { x: 10, y: 25, width: 80, height: 30 },
            style: { fontSize: 45, fontWeight: 'bold', textAlign: 'center' }
          }
        ]
      }
    ]
  },
  {
    id: 'academic-research',
    name: 'Research Academic',
    description: 'Professional academic template for research presentations',
    category: 'academic',
    thumbnail: '',
    colors: {
      primary: '#1e3a8a',
      secondary: '#3730a3',
      accent: '#5b21b6',
      background: '#ffffff',
      text: '#1e293b'
    },
    layouts: [
      {
        id: 'title-slide',
        name: 'Title Slide',
        type: 'title',
        elements: [
          {
            id: 'title',
            type: 'text',
            position: { x: 10, y: 25, width: 80, height: 20 },
            style: { fontSize: 38, fontWeight: 'bold', textAlign: 'center' }
          },
          {
            id: 'subtitle',
            type: 'text',
            position: { x: 10, y: 50, width: 80, height: 10 },
            style: { fontSize: 18, textAlign: 'center' }
          },
          {
            id: 'author',
            type: 'text',
            position: { x: 10, y: 70, width: 80, height: 8 },
            style: { fontSize: 16, textAlign: 'center' }
          }
        ]
      }
    ]
  },
  {
    id: 'academic-thesis',
    name: 'Thesis Defense',
    description: 'Formal template designed for thesis and dissertation presentations',
    category: 'academic',
    thumbnail: '',
    colors: {
      primary: '#0369a1',
      secondary: '#0284c7',
      accent: '#0ea5e9',
      background: '#ffffff',
      text: '#0f172a'
    },
    layouts: [
      {
        id: 'title-slide',
        name: 'Title Slide',
        type: 'title',
        elements: [
          {
            id: 'title',
            type: 'text',
            position: { x: 10, y: 20, width: 80, height: 25 },
            style: { fontSize: 34, fontWeight: 'bold', textAlign: 'center' }
          },
          {
            id: 'institution',
            type: 'text',
            position: { x: 10, y: 55, width: 80, height: 8 },
            style: { fontSize: 16, textAlign: 'center' }
          },
          {
            id: 'date',
            type: 'text',
            position: { x: 10, y: 75, width: 80, height: 6 },
            style: { fontSize: 14, textAlign: 'center' }
          }
        ]
      }
    ]
  }
];