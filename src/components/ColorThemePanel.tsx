import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ColorTheme } from '../types';
import { Palette, Check } from 'lucide-react';

interface ColorThemePanelProps {
  currentTheme: ColorTheme;
  onThemeChange: (theme: ColorTheme) => void;
}

const predefinedThemes: ColorTheme[] = [
  {
    id: 'ocean',
    name: 'Ocean Blue',
    colors: {
      primary: '#0ea5e9',
      secondary: '#0284c7',
      accent: '#38bdf8',
      background: '#ffffff',
      text: '#0f172a'
    }
  },
  {
    id: 'sunset',
    name: 'Sunset Orange',
    colors: {
      primary: '#f97316',
      secondary: '#ea580c',
      accent: '#fb923c',
      background: '#ffffff',
      text: '#1c1917'
    }
  },
  {
    id: 'forest',
    name: 'Forest Green',
    colors: {
      primary: '#059669',
      secondary: '#047857',
      accent: '#34d399',
      background: '#ffffff',
      text: '#0f172a'
    }
  },
  {
    id: 'purple',
    name: 'Royal Purple',
    colors: {
      primary: '#7c3aed',
      secondary: '#6d28d9',
      accent: '#a78bfa',
      background: '#ffffff',
      text: '#1e1b4b'
    }
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    colors: {
      primary: '#6366f1',
      secondary: '#4f46e5',
      accent: '#818cf8',
      background: '#1e293b',
      text: '#f1f5f9'
    }
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    colors: {
      primary: '#374151',
      secondary: '#4b5563',
      accent: '#9ca3af',
      background: '#ffffff',
      text: '#111827'
    }
  }
];

const ColorThemePanel: React.FC<ColorThemePanelProps> = ({ 
  currentTheme, 
  onThemeChange 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="glass rounded-xl p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-white font-medium"
      >
        <div className="flex items-center space-x-2">
          <Palette className="w-5 h-5" />
          <span>Color Themes</span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="text-gray-400"
        >
          ▼
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0
        }}
        className="overflow-hidden"
      >
        <div className="mt-4 space-y-3">
          {predefinedThemes.map((theme) => (
            <motion.button
              key={theme.id}
              onClick={() => onThemeChange(theme)}
              className={`w-full p-3 rounded-lg border transition-all duration-200 ${
                currentTheme.id === theme.id
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-white/20 hover:border-white/40 hover:bg-white/5'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    {Object.values(theme.colors).slice(0, 4).map((color, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span className="text-white font-medium">{theme.name}</span>
                </div>
                {currentTheme.id === theme.id && (
                  <Check className="w-5 h-5 text-blue-400" />
                )}
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-white/20">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Current Theme Colors</h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(currentTheme.colors).map(([key, color]) => (
              <div key={key} className="flex items-center space-x-2">
                <div
                  className="w-6 h-6 rounded border border-white/20"
                  style={{ backgroundColor: color }}
                />
                <div>
                  <div className="text-xs text-gray-300 capitalize">{key}</div>
                  <div className="text-xs text-gray-500">{color}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ColorThemePanel;