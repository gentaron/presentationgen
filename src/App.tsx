import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Presentation, Template, Slide } from './types';
import Header from './components/Header';
import TemplateSelector from './components/TemplateSelector';
import SlideEditor from './components/SlideEditor';
import PreviewPanel from './components/PreviewPanel';
import ExportPanel from './components/ExportPanel';

function App() {
  const [currentStep, setCurrentStep] = useState<'template' | 'edit' | 'export'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [presentation, setPresentation] = useState<Presentation | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    const newPresentation: Presentation = {
      id: Date.now().toString(),
      title: 'New Presentation',
      templateId: template.id,
      slides: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setPresentation(newPresentation);
    setCurrentStep('edit');
  };

  const handleSlidesUpdate = (slides: Slide[]) => {
    if (presentation) {
      setPresentation({
        ...presentation,
        slides,
        updatedAt: new Date(),
      });
    }
  };

  const handleExport = () => {
    setCurrentStep('export');
  };

  const handleBackToEdit = () => {
    setCurrentStep('edit');
  };

  const handleNewPresentation = () => {
    setCurrentStep('template');
    setSelectedTemplate(null);
    setPresentation(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9wYXR0ZXJuPgo8L2RlZnM+CjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz4KPC9zdmc+')] opacity-30"></div>
      
      <div className="relative z-10">
        <Header 
          currentStep={currentStep}
          onNewPresentation={handleNewPresentation}
          onExport={handleExport}
          canExport={presentation && presentation.slides.length > 0}
        />

        <main className="container mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            {currentStep === 'template' && (
              <motion.div
                key="template"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TemplateSelector onTemplateSelect={handleTemplateSelect} />
              </motion.div>
            )}

            {currentStep === 'edit' && presentation && selectedTemplate && (
              <motion.div
                key="edit"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]"
              >
                <div className="lg:col-span-2">
                  <SlideEditor
                    presentation={presentation}
                    template={selectedTemplate}
                    onSlidesUpdate={handleSlidesUpdate}
                  />
                </div>
                <div className="lg:col-span-1">
                  <PreviewPanel
                    presentation={presentation}
                    template={selectedTemplate}
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 'export' && presentation && selectedTemplate && (
              <motion.div
                key="export"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ExportPanel
                  presentation={presentation}
                  template={selectedTemplate}
                  onBackToEdit={handleBackToEdit}
                  isExporting={isExporting}
                  setIsExporting={setIsExporting}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;