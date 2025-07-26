import PptxGenJS from 'pptxgenjs';
import { Presentation, Template, SlideElement } from '../types';

interface ExportSettings {
  fileName: string;
  includeNotes: boolean;
  slideSize: string;
  quality: string;
}

export const exportToPowerPoint = async (
  presentation: Presentation,
  template: Template,
  settings: ExportSettings
): Promise<void> => {
  const pptx = new PptxGenJS();

  // Set slide size based on settings
  if (settings.slideSize === '4:3') {
    pptx.layout = 'LAYOUT_4x3';
  } else {
    pptx.layout = 'LAYOUT_16x9';
  }

  // Set presentation properties
  pptx.author = 'Presentation Generator';
  pptx.company = 'AI Powered Presentations';
  pptx.subject = presentation.title;
  pptx.title = presentation.title;

  // Process each slide
  for (const slide of presentation.slides) {
    const pptxSlide = pptx.addSlide();

    // Set slide background
    pptxSlide.background = { color: template.colors.background };

    // Add elements to slide
    for (const element of slide.elements) {
      await addElementToSlide(pptxSlide, element, template);
    }

    // Add speaker notes if enabled
    if (settings.includeNotes) {
      pptxSlide.addNotes(`Slide ${slide.order + 1} notes`);
    }
  }

  // Generate and download the presentation
  const fileName = `${settings.fileName}.pptx`;
  await pptx.writeFile({ fileName });
};

const addElementToSlide = async (
  slide: any,
  element: SlideElement,
  template: Template
): Promise<void> => {
  const position = {
    x: `${element.position.x}%`,
    y: `${element.position.y}%`,
    w: `${element.position.width}%`,
    h: `${element.position.height}%`,
  };

  switch (element.type) {
    case 'text':
      slide.addText(element.content as string, {
        ...position,
        fontSize: element.style.fontSize || 18,
        fontFace: element.style.fontFamily || 'Arial',
        color: element.style.color || template.colors.text,
        align: element.style.textAlign || 'left',
        bold: element.style.fontWeight === 'bold',
        italic: element.style.fontStyle === 'italic',
        fill: element.style.backgroundColor !== 'transparent' ? 
               element.style.backgroundColor : undefined,
        valign: 'top',
      });
      break;

    case 'image':
      if (element.content && typeof element.content === 'object' && 'src' in element.content) {
        try {
          slide.addImage({
            ...position,
            path: element.content.src,
          });
        } catch (error) {
          // Fallback: add placeholder text
          slide.addText('Image Placeholder', {
            ...position,
            fontSize: 16,
            color: '999999',
            align: 'center',
            valign: 'middle',
          });
        }
      }
      break;

    case 'shape':
      slide.addShape('rect', {
        ...position,
        fill: element.style.backgroundColor || template.colors.accent,
        line: { color: template.colors.primary, width: 1 },
      });
      break;

    case 'chart':
      if (element.content && typeof element.content === 'object' && 'type' in element.content) {
        const chartData = element.content;
        
        // Convert chart data to PptxGenJS format
        const dataChartAreaLine = [
          {
            name: 'Sample Data',
            labels: chartData.data?.labels || ['Q1', 'Q2', 'Q3', 'Q4'],
            values: chartData.data?.datasets[0]?.data || [10, 20, 30, 40],
          },
        ];

        slide.addChart('bar', dataChartAreaLine, {
          ...position,
          chartColors: [template.colors.primary, template.colors.secondary, template.colors.accent],
          showTitle: false,
        });
      } else {
        // Fallback: add placeholder shape
        slide.addShape('rect', {
          ...position,
          fill: 'F0F0F0',
          line: { color: 'CCCCCC', width: 1 },
        });
        slide.addText('Chart Placeholder', {
          ...position,
          fontSize: 14,
          color: '666666',
          align: 'center',
          valign: 'middle',
        });
      }
      break;

    default:
      console.warn(`Unknown element type: ${element.type}`);
  }
};

export const generateSampleData = (type: 'bar' | 'line' | 'pie') => {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const data = [65, 59, 80, 81, 56, 55];

  return {
    type,
    data: {
      labels,
      datasets: [
        {
          label: 'Sample Dataset',
          data,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
          borderColor: '#FFFFFF',
        },
      ],
    },
  };
};