import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Presentation, Template, Slide, SlideElement } from '../types';
import { Plus, Type, Image, BarChart3, Square, Trash2, Copy, Move } from 'lucide-react';

interface SlideEditorProps {
  presentation: Presentation;
  template: Template;
  onSlidesUpdate: (slides: Slide[]) => void;
}

const SlideEditor: React.FC<SlideEditorProps> = ({ 
  presentation, 
  template, 
  onSlidesUpdate 
}) => {
  const [selectedSlideId, setSelectedSlideId] = useState<string | null>(null);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  const createNewSlide = useCallback(() => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      layoutId: template.layouts[0]?.id || 'default',
      elements: template.layouts[0]?.elements.map(element => ({
        id: Date.now().toString() + Math.random(),
        type: element.type,
        content: element.type === 'text' ? 'Click to edit text' : '',
        style: {
          fontSize: element.style.fontSize || 18,
          fontFamily: element.style.fontFamily || 'Inter',
          color: template.colors.text,
          backgroundColor: 'transparent',
          textAlign: element.style.textAlign || 'left',
          fontWeight: element.style.fontWeight || 'normal',
          fontStyle: element.style.fontStyle || 'normal'
        },
        position: element.position
      })) || [],
      order: presentation.slides.length
    };

    const updatedSlides = [...presentation.slides, newSlide];
    onSlidesUpdate(updatedSlides);
    setSelectedSlideId(newSlide.id);
  }, [presentation.slides, template, onSlidesUpdate]);

  const deleteSlide = useCallback((slideId: string) => {
    const updatedSlides = presentation.slides
      .filter(slide => slide.id !== slideId)
      .map((slide, index) => ({ ...slide, order: index }));
    
    onSlidesUpdate(updatedSlides);
    setSelectedSlideId(updatedSlides[0]?.id || null);
  }, [presentation.slides, onSlidesUpdate]);

  const duplicateSlide = useCallback((slideId: string) => {
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

    const updatedSlides = [...presentation.slides, clonedSlide];
    onSlidesUpdate(updatedSlides);
    setSelectedSlideId(clonedSlide.id);
  }, [presentation.slides, onSlidesUpdate]);

  const updateElementContent = useCallback((slideId: string, elementId: string, content: string) => {
    const updatedSlides = presentation.slides.map(slide => {
      if (slide.id === slideId) {
        return {
          ...slide,
          elements: slide.elements.map(element => 
            element.id === elementId ? { ...element, content } : element
          )
        };
      }
      return slide;
    });
    onSlidesUpdate(updatedSlides);
  }, [presentation.slides, onSlidesUpdate]);

  const addElement = useCallback((slideId: string, type: 'text' | 'image' | 'shape' | 'chart') => {
    const newElement: SlideElement = {
      id: Date.now().toString(),
      type,
      content: type === 'text' ? 'New text element' : '',
      style: {
        fontSize: 18,
        fontFamily: 'Inter',
        color: template.colors.text,
        backgroundColor: type === 'shape' ? template.colors.accent : 'transparent',
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

    onSlidesUpdate(updatedSlides);
    setSelectedElementId(newElement.id);
  }, [presentation.slides, template, onSlidesUpdate]);

  const selectedSlide = presentation.slides.find(slide => slide.id === selectedSlideId);

  return (
    <div className="h-full flex flex-col">
      <div className="glass rounded-xl p-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Slide Editor</h3>
          <motion.button
            onClick={createNewSlide}
            className="btn-primary flex items-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-4 h-4" />
            <span>Add Slide</span>
          </motion.button>
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2">
          {presentation.slides.map((slide, index) => (
            <motion.div
              key={slide.id}
              onClick={() => setSelectedSlideId(slide.id)}
              className={`flex-shrink-0 w-32 h-24 rounded-lg border-2 cursor-pointer relative group ${
                selectedSlideId === slide.id
                  ? 'border-blue-500 bg-blue-500/20'
                  : 'border-white/20 glass hover:border-white/40'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-2 bg-white rounded text-xs text-gray-800 p-1">
                <div className="text-center font-medium truncate">Slide {index + 1}</div>
                <div className="space-y-1 mt-1">
                  {slide.elements.slice(0, 3).map((element, i) => (
                    <div
                      key={i}
                      className="h-1 bg-gray-300 rounded"
                      style={{ width: `${80 - i * 20}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      duplicateSlide(slide.id);
                    }}
                    className="w-6 h-6 bg-blue-500 rounded text-white flex items-center justify-center hover:bg-blue-600"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSlide(slide.id);
                    }}
                    className="w-6 h-6 bg-red-500 rounded text-white flex items-center justify-center hover:bg-red-600"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedSlide && (
        <motion.div
          key={selectedSlide.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-6 flex-1"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-white">
              Slide {presentation.slides.findIndex(s => s.id === selectedSlide.id) + 1}
            </h4>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Add Element:</span>
              <button
                onClick={() => addElement(selectedSlide.id, 'text')}
                className="btn-secondary p-2"
                title="Add Text"
              >
                <Type className="w-4 h-4" />
              </button>
              <button
                onClick={() => addElement(selectedSlide.id, 'image')}
                className="btn-secondary p-2"
                title="Add Image"
              >
                <Image className="w-4 h-4" />
              </button>
              <button
                onClick={() => addElement(selectedSlide.id, 'chart')}
                className="btn-secondary p-2"
                title="Add Chart"
              >
                <BarChart3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => addElement(selectedSlide.id, 'shape')}
                className="btn-secondary p-2"
                title="Add Shape"
              >
                <Square className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div 
            className="relative bg-white rounded-lg shadow-lg mx-auto"
            style={{ 
              width: '100%', 
              maxWidth: '800px', 
              aspectRatio: '16/9',
              background: template.colors.background 
            }}
          >
            {selectedSlide.elements.map((element) => (
              <motion.div
                key={element.id}
                className={`absolute cursor-pointer border-2 transition-all duration-200 ${
                  selectedElementId === element.id
                    ? 'border-blue-500 border-dashed'
                    : 'border-transparent hover:border-gray-300'
                }`}
                style={{
                  left: `${element.position.x}%`,
                  top: `${element.position.y}%`,
                  width: `${element.position.width}%`,
                  height: `${element.position.height}%`,
                }}
                onClick={() => setSelectedElementId(element.id)}
                whileHover={{ scale: 1.01 }}
              >
                {element.type === 'text' && (
                  <textarea
                    value={element.content as string}
                    onChange={(e) => updateElementContent(selectedSlide.id, element.id, e.target.value)}
                    className="w-full h-full bg-transparent border-none outline-none resize-none"
                    style={{
                      fontSize: `${element.style.fontSize || 18}px`,
                      fontFamily: element.style.fontFamily || 'Inter',
                      color: element.style.color,
                      backgroundColor: element.style.backgroundColor,
                      textAlign: element.style.textAlign,
                      fontWeight: element.style.fontWeight,
                      fontStyle: element.style.fontStyle,
                    }}
                    placeholder="Click to edit text"
                  />
                )}
                
                {element.type === 'image' && (
                  <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                    <Image className="w-8 h-8 text-gray-400" />
                    <span className="ml-2 text-gray-500 text-sm">Image Placeholder</span>
                  </div>
                )}
                
                {element.type === 'shape' && (
                  <div
                    className="w-full h-full rounded"
                    style={{ backgroundColor: element.style.backgroundColor }}
                  />
                )}
                
                {element.type === 'chart' && (
                  <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                    <BarChart3 className="w-8 h-8 text-gray-400" />
                    <span className="ml-2 text-gray-500 text-sm">Chart Placeholder</span>
                  </div>
                )}

                {selectedElementId === element.id && (
                  <div className="absolute -top-8 right-0 flex space-x-1">
                    <button className="w-6 h-6 bg-blue-500 rounded text-white flex items-center justify-center hover:bg-blue-600">
                      <Move className="w-3 h-3" />
                    </button>
                    <button className="w-6 h-6 bg-red-500 rounded text-white flex items-center justify-center hover:bg-red-600">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {!selectedSlide && presentation.slides.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-xl p-12 flex-1 flex items-center justify-center"
        >
          <div className="text-center">
            <Plus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No slides yet</h3>
            <p className="text-gray-400 mb-6">Create your first slide to get started</p>
            <motion.button
              onClick={createNewSlide}
              className="btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Create First Slide
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SlideEditor;