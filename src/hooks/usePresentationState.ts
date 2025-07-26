import { useState, useCallback } from 'react';
import { Presentation, Template, Slide, SlideElement, ColorTheme } from '../types';

export const usePresentationState = () => {
  const [presentation, setPresentation] = useState<Presentation | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [currentTheme, setCurrentTheme] = useState<ColorTheme | null>(null);

  const createPresentation = useCallback((template: Template) => {
    const newPresentation: Presentation = {
      id: Date.now().toString(),
      title: 'New Presentation',
      templateId: template.id,
      slides: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setPresentation(newPresentation);
    setSelectedTemplate(template);
    
    // Set default theme from template
    setCurrentTheme({
      id: 'template-default',
      name: 'Template Default',
      colors: template.colors
    });
  }, []);

  const updateSlides = useCallback((slides: Slide[]) => {
    if (presentation) {
      setPresentation({
        ...presentation,
        slides,
        updatedAt: new Date(),
      });
    }
  }, [presentation]);

  const updatePresentationTitle = useCallback((title: string) => {
    if (presentation) {
      setPresentation({
        ...presentation,
        title,
        updatedAt: new Date(),
      });
    }
  }, [presentation]);

  const applyTheme = useCallback((theme: ColorTheme) => {
    if (selectedTemplate) {
      const updatedTemplate = {
        ...selectedTemplate,
        colors: theme.colors
      };
      setSelectedTemplate(updatedTemplate);
      setCurrentTheme(theme);
    }
  }, [selectedTemplate]);

  const resetPresentation = useCallback(() => {
    setPresentation(null);
    setSelectedTemplate(null);
    setCurrentTheme(null);
  }, []);

  const addSlide = useCallback((layoutId?: string) => {
    if (!presentation || !selectedTemplate) return;

    const layout = selectedTemplate.layouts.find(l => l.id === layoutId) || selectedTemplate.layouts[0];
    if (!layout) return;

    const newSlide: Slide = {
      id: Date.now().toString(),
      layoutId: layout.id,
      elements: layout.elements.map(element => ({
        id: Date.now().toString() + Math.random(),
        type: element.type,
        content: element.type === 'text' ? 'Click to edit text' : '',
        style: {
          fontSize: element.style.fontSize || 18,
          fontFamily: element.style.fontFamily || 'Inter',
          color: selectedTemplate.colors.text,
          backgroundColor: 'transparent',
          textAlign: element.style.textAlign || 'left',
          fontWeight: element.style.fontWeight || 'normal',
          fontStyle: element.style.fontStyle || 'normal'
        },
        position: element.position
      })),
      order: presentation.slides.length
    };

    updateSlides([...presentation.slides, newSlide]);
  }, [presentation, selectedTemplate, updateSlides]);

  const duplicateSlide = useCallback((slideId: string) => {
    if (!presentation) return;

    const slideToClone = presentation.slides.find(slide => slide.id === slideId);
    if (!slideToClone) return;

    const clonedSlide: Slide = {
      ...slideToClone,
      id: Date.now().toString(),
      elements: slideToClone.elements.map(element => ({
        ...element,
        id: Date.now().toString() + Math.random()
      })),
      order: presentation.slides.length
    };

    updateSlides([...presentation.slides, clonedSlide]);
  }, [presentation, updateSlides]);

  const deleteSlide = useCallback((slideId: string) => {
    if (!presentation) return;

    const updatedSlides = presentation.slides
      .filter(slide => slide.id !== slideId)
      .map((slide, index) => ({ ...slide, order: index }));
    
    updateSlides(updatedSlides);
  }, [presentation, updateSlides]);

  const updateElement = useCallback((slideId: string, elementId: string, updates: Partial<SlideElement>) => {
    if (!presentation) return;

    const updatedSlides = presentation.slides.map(slide => {
      if (slide.id === slideId) {
        return {
          ...slide,
          elements: slide.elements.map(element => 
            element.id === elementId ? { ...element, ...updates } : element
          )
        };
      }
      return slide;
    });

    updateSlides(updatedSlides);
  }, [presentation, updateSlides]);

  const addElement = useCallback((slideId: string, type: 'text' | 'image' | 'shape' | 'chart') => {
    if (!presentation || !selectedTemplate) return;

    const newElement: SlideElement = {
      id: Date.now().toString(),
      type,
      content: type === 'text' ? 'New text element' : '',
      style: {
        fontSize: 18,
        fontFamily: 'Inter',
        color: selectedTemplate.colors.text,
        backgroundColor: type === 'shape' ? selectedTemplate.colors.accent : 'transparent',
        textAlign: 'left',
        fontWeight: 'normal',
        fontStyle: 'normal'
      },
      position: { x: 20, y: 20, width: 40, height: 20 }
    };

    const updatedSlides = presentation.slides.map(slide => {
      if (slide.id === slideId) {
        return {
          ...slide,
          elements: [...slide.elements, newElement]
        };
      }
      return slide;
    });

    updateSlides(updatedSlides);
    return newElement.id;
  }, [presentation, selectedTemplate, updateSlides]);

  return {
    presentation,
    selectedTemplate,
    currentTheme,
    createPresentation,
    updateSlides,
    updatePresentationTitle,
    applyTheme,
    resetPresentation,
    addSlide,
    duplicateSlide,
    deleteSlide,
    updateElement,
    addElement,
  };
};