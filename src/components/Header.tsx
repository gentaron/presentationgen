import React from 'react';
import { motion } from 'framer-motion';
import { Presentation, Download, Zap, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  currentStep: 'template' | 'edit' | 'export';
  onNewPresentation: () => void;
  onExport: () => void;
  canExport: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  currentStep, 
  onNewPresentation, 
  onExport, 
  canExport 
}) => {
  return (
    <motion.header 
      className="glass-strong border-b border-white/20 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Presentation className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">
                Presentation Generator
              </h1>
              <p className="text-gray-400 text-sm">
                {currentStep === 'template' && 'Choose your template'}
                {currentStep === 'edit' && 'Design your presentation'}
                {currentStep === 'export' && 'Export your presentation'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {currentStep !== 'template' && (
              <motion.button
                onClick={onNewPresentation}
                className="btn-secondary flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>New</span>
              </motion.button>
            )}

            {currentStep === 'edit' && canExport && (
              <motion.button
                onClick={onExport}
                className="btn-primary flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </motion.button>
            )}

            <motion.div
              className="flex items-center space-x-2 glass rounded-lg px-3 py-2"
              whileHover={{ scale: 1.02 }}
            >
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">AI Powered</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;