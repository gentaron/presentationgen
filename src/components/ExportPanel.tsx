import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Presentation, Template } from '../types';
import { Download, FileText, Settings, ArrowLeft, CheckCircle, Loader } from 'lucide-react';
import { exportToPowerPoint } from '../utils/powerpoint';

interface ExportPanelProps {
  presentation: Presentation;
  template: Template;
  onBackToEdit: () => void;
  isExporting: boolean;
  setIsExporting: (isExporting: boolean) => void;
}

const ExportPanel: React.FC<ExportPanelProps> = ({ 
  presentation, 
  template, 
  onBackToEdit,
  isExporting,
  setIsExporting
}) => {
  const [exportSettings, setExportSettings] = useState({
    fileName: presentation.title || 'presentation',
    includeNotes: false,
    slideSize: '16:9',
    quality: 'high'
  });

  const [exportStatus, setExportStatus] = useState<'idle' | 'exporting' | 'success' | 'error'>('idle');

  const handleExport = async () => {
    setIsExporting(true);
    setExportStatus('exporting');

    try {
      await exportToPowerPoint(presentation, template, exportSettings);
      setExportStatus('success');
      setTimeout(() => setExportStatus('idle'), 3000);
    } catch (error) {
      console.error('Export failed:', error);
      setExportStatus('error');
      setTimeout(() => setExportStatus('idle'), 3000);
    } finally {
      setIsExporting(false);
    }
  };

  const exportFormats = [
    { id: 'pptx', name: 'PowerPoint (.pptx)', icon: FileText, description: 'Standard PowerPoint format' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-8"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold gradient-text mb-2">Export Presentation</h2>
            <p className="text-gray-400">Choose your export settings and download your presentation</p>
          </div>
          <button
            onClick={onBackToEdit}
            className="btn-secondary flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Editor</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Export Settings
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    File Name
                  </label>
                  <input
                    type="text"
                    value={exportSettings.fileName}
                    onChange={(e) => setExportSettings({ ...exportSettings, fileName: e.target.value })}
                    className="input w-full"
                    placeholder="Enter file name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Slide Size
                  </label>
                  <select
                    value={exportSettings.slideSize}
                    onChange={(e) => setExportSettings({ ...exportSettings, slideSize: e.target.value })}
                    className="input w-full"
                  >
                    <option value="16:9">16:9 (Widescreen)</option>
                    <option value="4:3">4:3 (Standard)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Quality
                  </label>
                  <select
                    value={exportSettings.quality}
                    onChange={(e) => setExportSettings({ ...exportSettings, quality: e.target.value })}
                    className="input w-full"
                  >
                    <option value="high">High Quality</option>
                    <option value="medium">Medium Quality</option>
                    <option value="low">Low Quality (Smaller file)</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="includeNotes"
                    checked={exportSettings.includeNotes}
                    onChange={(e) => setExportSettings({ ...exportSettings, includeNotes: e.target.checked })}
                    className="w-4 h-4 text-blue-500 bg-transparent border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="includeNotes" className="ml-2 text-sm text-gray-300">
                    Include speaker notes
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-white mb-3">Export Format</h4>
              <div className="space-y-3">
                {exportFormats.map((format) => {
                  const IconComponent = format.icon;
                  return (
                    <motion.div
                      key={format.id}
                      className="card border border-blue-500/50 bg-blue-500/10"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent className="w-6 h-6 text-blue-400" />
                        <div>
                          <div className="font-medium text-white">{format.name}</div>
                          <div className="text-sm text-gray-400">{format.description}</div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-white mb-3">Presentation Summary</h4>
              <div className="glass rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Title:</span>
                  <span className="text-white">{presentation.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Slides:</span>
                  <span className="text-white">{presentation.slides.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Template:</span>
                  <span className="text-white">{template.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Created:</span>
                  <span className="text-white">{presentation.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-white mb-3">Preview</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {presentation.slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className="flex items-center space-x-3 p-3 glass rounded-lg"
                  >
                    <div
                      className="w-12 h-8 bg-white rounded shadow-sm flex-shrink-0"
                      style={{ background: template.colors.background }}
                    >
                      <div className="w-full h-full relative">
                        {slide.elements.slice(0, 2).map((element, i) => (
                          <div
                            key={i}
                            className="absolute bg-gray-300 rounded"
                            style={{
                              left: `${element.position.x * 0.5}%`,
                              top: `${element.position.y * 0.5}%`,
                              width: `${element.position.width * 0.5}%`,
                              height: `${Math.min(element.position.height * 0.5, 30)}%`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Slide {index + 1}</div>
                      <div className="text-xs text-gray-400">
                        {slide.elements.length} elements
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              onClick={handleExport}
              disabled={isExporting || presentation.slides.length === 0}
              className={`w-full py-4 rounded-lg font-medium text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
                isExporting || presentation.slides.length === 0
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
              }`}
              whileHover={!isExporting ? { scale: 1.02 } : {}}
              whileTap={!isExporting ? { scale: 0.98 } : {}}
            >
              {exportStatus === 'exporting' && (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Exporting...</span>
                </>
              )}
              {exportStatus === 'success' && (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Export Successful!</span>
                </>
              )}
              {exportStatus === 'error' && (
                <>
                  <span>Export Failed - Try Again</span>
                </>
              )}
              {exportStatus === 'idle' && (
                <>
                  <Download className="w-5 h-5" />
                  <span>Export Presentation</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ExportPanel;