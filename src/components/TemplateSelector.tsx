import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Template } from '../types';
import { templates } from '../utils/templates';
import { Building2, Minimize2, Palette, GraduationCap, Search, Filter } from 'lucide-react';

interface TemplateSelectorProps {
  onTemplateSelect: (template: Template) => void;
}

const categoryIcons = {
  business: Building2,
  minimal: Minimize2,
  creative: Palette,
  academic: GraduationCap,
};

const categoryLabels = {
  business: 'Business',
  minimal: 'Minimal',
  creative: 'Creative',
  academic: 'Academic',
};

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onTemplateSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['all', ...Object.keys(categoryLabels)];

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-5xl font-bold gradient-text mb-4">
          Choose Your Template
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Select from our collection of professionally designed templates to kickstart your presentation
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4 mb-8"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10 w-full"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="text-gray-400 w-5 h-5" />
          <div className="flex space-x-2">
            {categories.map((category) => {
              const IconComponent = category === 'all' ? Filter : categoryIcons[category as keyof typeof categoryIcons];
              return (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'glass hover:bg-white/20 text-gray-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{category === 'all' ? 'All' : categoryLabels[category as keyof typeof categoryLabels]}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredTemplates.map((template, index) => {
          const IconComponent = categoryIcons[template.category];
          return (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => onTemplateSelect(template)}
              className="card group cursor-pointer hover:scale-105 transform transition-all duration-300"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div 
                className="w-full h-32 rounded-lg mb-4 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`
                }}
              >
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-2 right-2">
                  <div className="glass rounded-full p-2">
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="h-2 glass rounded-full opacity-50"></div>
                  <div className="h-2 glass rounded-full opacity-30 mt-1 w-3/4"></div>
                  <div className="h-2 glass rounded-full opacity-20 mt-1 w-1/2"></div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {template.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">
                    {categoryLabels[template.category]}
                  </span>
                  <div className="flex space-x-1">
                    {Object.values(template.colors).slice(0, 3).map((color, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded-full border border-white/20"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {filteredTemplates.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="glass rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No templates found</h3>
          <p className="text-gray-400">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </div>
  );
};

export default TemplateSelector;