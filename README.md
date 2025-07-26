# 🎨 Presentation Generator

A modern, sleek presentation generation tool built with React, TypeScript, and PptxGenJS. Create professional presentations with an intuitive drag-and-drop interface, real-time preview, and multiple export options.

## ✨ Features

### 🎯 Core Features
- **Template-based System**: Choose from Business, Minimal, Creative, and Academic templates
- **Real-time Preview**: See your changes instantly with live slide thumbnails
- **Drag-and-drop Interface**: Intuitive content management and editing
- **Multiple Export Options**: Download presentations as PowerPoint (.pptx) files
- **Responsive Design**: Works seamlessly on desktop and tablet devices

### 🎨 Design Features
- **Modern UI**: Dark theme with glassmorphism effects and smooth animations
- **Professional Templates**: 8+ carefully designed templates for different use cases
- **Color Theme Customization**: Predefined color palettes for consistent branding
- **Rich Content Blocks**: Text, images, charts, and shapes support

### 🚀 Technical Features
- **React 18+** with TypeScript for type safety
- **Tailwind CSS** for modern styling with custom animations
- **Framer Motion** for smooth micro-interactions
- **PptxGenJS** for PowerPoint generation
- **Lucide React** for modern iconography

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd presentation-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 🎯 Usage

### 1. Choose a Template
- Select from Business, Minimal, Creative, or Academic templates
- Each template comes with predefined color schemes and layouts
- Use the search and filter functionality to find the perfect template

### 2. Build Your Presentation
- Add new slides with the "Add Slide" button
- Click on slide elements to edit content directly
- Use the element toolbar to add text, images, charts, and shapes
- Drag elements to reposition them on your slides

### 3. Real-time Preview
- View your presentation in the live preview panel
- Navigate through slides using the thumbnail navigator
- See changes reflected immediately as you edit

### 4. Export Your Presentation
- Click the "Export" button when your presentation is ready
- Customize export settings (file name, slide size, quality)
- Download your presentation as a PowerPoint (.pptx) file

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx       # Application header with navigation
│   ├── TemplateSelector.tsx  # Template selection interface
│   ├── SlideEditor.tsx  # Main slide editing interface
│   ├── PreviewPanel.tsx # Real-time preview panel
│   └── ExportPanel.tsx  # Export settings and download
├── types/               # TypeScript type definitions
│   └── index.ts         # Core interface definitions
├── utils/               # Utility functions
│   ├── templates.ts     # Template configurations
│   └── powerpoint.ts    # PowerPoint export logic
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles and Tailwind imports
```

## 🎨 Templates

### Business Templates
- **Corporate Professional**: Clean and professional design for business presentations
- **Modern Business**: Contemporary design with bold colors for impactful presentations

### Minimal Templates
- **Clean Minimal**: Minimalist design focusing on content with clean typography
- **Typography Focus**: Typography-centered design with elegant spacing

### Creative Templates
- **Vibrant Creative**: Bold and colorful design for creative presentations
- **Artistic Expression**: Artistic design for creative storytelling

### Academic Templates
- **Research Academic**: Professional template for research presentations
- **Thesis Defense**: Formal template for thesis and dissertation presentations

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Tech Stack

- **Frontend Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React for modern iconography
- **Export**: PptxGenJS for PowerPoint generation
- **Build Tool**: Vite for fast development and building

## 🎯 Key Features in Detail

### Template System
Each template includes:
- Predefined color schemes
- Multiple layout configurations
- Element positioning guidelines
- Typography settings

### Slide Editor
- Visual slide builder with element manipulation
- Real-time content editing
- Element toolbar for adding new content
- Slide management (add, delete, duplicate, reorder)

### Export System
- PowerPoint (.pptx) export with PptxGenJS
- Customizable export settings
- Progress indicators during export
- Error handling and user feedback

## 🚀 Future Enhancements

- Drag-and-drop file uploads for images
- Advanced chart editing with data input
- Collaboration features
- Cloud storage integration
- Additional export formats (PDF, Images)
- Animation and transition effects
- Template marketplace

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using React, TypeScript, and modern web technologies.