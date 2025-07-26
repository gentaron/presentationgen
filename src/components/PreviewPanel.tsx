import React from 'react';
import { motion } from 'framer-motion';
import { Presentation, Template } from '../types';
import { Eye, Maximize2, Play } from 'lucide-react';

interface PreviewPanelProps {
  presentation: Presentation;
  template: Template;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ presentation, template }) => {
  const [selectedPreviewSlide, setSelectedPreviewSlide] = React.useState(0);

  const currentSlide = presentation.slides[selectedPreviewSlide];

  return (
    <div className="h-full flex flex-col">
      <div className="glass rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Live Preview</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button className="btn-secondary p-2" title="Fullscreen Preview">
              <Maximize2 className="w-4 h-4" />
            </button>
            <button className="btn-secondary p-2" title="Slideshow Mode">
              <Play className="w-4 h-4" />
            </button>
          </div>
        </div>

        {currentSlide ? (
          <motion.div
            key={selectedPreviewSlide}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white rounded-lg shadow-lg"
            style={{ 
              aspectRatio: '16/9',
              background: template.colors.background 
            }}
          >
            {currentSlide.elements.map((element) => (
              <div
                key={element.id}
                className="absolute"
                style={{
                  left: `${element.position.x}%`,
                  top: `${element.position.y}%`,
                  width: `${element.position.width}%`,
                  height: `${element.position.height}%`,
                }}
              >
                {element.type === 'text' && (
                  <div
                    className="w-full h-full flex items-start"
                    style={{
                      fontSize: `${(element.style.fontSize || 18) * 0.5}px`,
                      fontFamily: element.style.fontFamily || 'Inter',
                      color: element.style.color,
                      backgroundColor: element.style.backgroundColor,
                      textAlign: element.style.textAlign,
                      fontWeight: element.style.fontWeight,
                      fontStyle: element.style.fontStyle,
                    }}
                  >
                    {element.content as string || 'Text Element'}
                  </div>
                )}
                
                {element.type === 'image' && (
                  <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-500">Image</span>
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
                    <span className="text-xs text-gray-500">Chart</span>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        ) : (
          <div 
            className="flex items-center justify-center bg-gray-100 rounded-lg text-gray-500"
            style={{ aspectRatio: '16/9' }}
          >
            No slide selected
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setSelectedPreviewSlide(Math.max(0, selectedPreviewSlide - 1))}
            disabled={selectedPreviewSlide === 0}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-gray-400">
            {presentation.slides.length > 0 ? selectedPreviewSlide + 1 : 0} / {presentation.slides.length}
          </span>
          <button
            onClick={() => setSelectedPreviewSlide(Math.min(presentation.slides.length - 1, selectedPreviewSlide + 1))}
            disabled={selectedPreviewSlide >= presentation.slides.length - 1}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      <div className="glass rounded-xl p-4 flex-1">
        <h4 className="text-md font-medium text-white mb-3">Slide Thumbnails</h4>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {presentation.slides.map((slide, index) => (
            <motion.div
              key={slide.id}
              onClick={() => setSelectedPreviewSlide(index)}
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedPreviewSlide === index
                  ? 'bg-blue-500/20 border border-blue-500'
                  : 'hover:bg-white/10 border border-transparent'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className="w-16 h-12 bg-white rounded shadow-sm flex-shrink-0 relative"
                style={{ background: template.colors.background }}
              >
                <div className="absolute inset-1">
                  {slide.elements.slice(0, 3).map((element, i) => (
                    <div
                      key={i}
                      className="absolute bg-gray-300 rounded"
                      style={{
                        left: `${element.position.x * 0.6}%`,
                        top: `${element.position.y * 0.6}%`,
                        width: `${element.position.width * 0.6}%`,
                        height: `${Math.min(element.position.height * 0.6, 20)}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white">
                  Slide {index + 1}
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {slide.elements.length} element{slide.elements.length !== 1 ? 's' : ''}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {presentation.slides.length === 0 && (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Eye className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-400 text-sm">No slides to preview</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;