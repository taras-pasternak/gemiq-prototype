const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

const replacements = {
  'lucide-react': '@phosphor-icons/react',
  '<Sparkles': '<Sparkle',
  'CheckCircle2': 'CheckCircle',
  '<Settings': '<Gear',
  'ChevronRight': 'CaretRight',
  '<Grid ': '<GridFour ',
  '<LayoutList': '<List',
  'Trash2': 'Trash',
  'Loader2': 'CircleNotch',
  'Wand2': 'MagicWand',
  'Paintbrush': 'PaintBrush',
  '<Search': '<MagnifyingGlass',
  '<Filter': '<Funnel',
  '<LayoutGrid': '<SquaresFour',
  '<Home': '<House',
  '<Inbox': '<Tray',
  '<LogOut': '<SignOut',
  '<HelpCircle': '<Question',
  '<Upload': '<UploadSimple'
};

for (const [key, value] of Object.entries(replacements)) {
  content = content.replaceAll(key, value);
}

// Fix the import statement specifically:
content = content.replace(/import \{[\s\S]*?\} from '@phosphor-icons\/react';/, `import { 
  Folder, Image as ImageIcon, Sparkle, CheckCircle, 
  Download, Plus, Gear, CaretRight, GridFour, List, 
  Trash, X, Play, CircleNotch, ArrowLeft, MagicWand, PaintBrush,
  MagnifyingGlass, Funnel, SquaresFour, Layout, House, Tray, User, SignOut, Camera, Info, Question, UploadSimple
} from '@phosphor-icons/react';`);

// Also update the switcher text and size
content = content.replace(
  /<button \n                      onClick=\{\(\) => setViewMode\('grid'\)\}[\s\S]*?<button \n                      onClick=\{\(\) => setViewMode\('list'\)\}[\s\S]*?<\/button>/,
  `<button 
                      onClick={() => setViewMode('grid')}
                      className={\`px-3 py-1.5 rounded-md transition-colors flex items-center justify-center gap-2 \${viewMode === 'grid' ? 'bg-white shadow-sm text-[#1cb0b0] font-medium' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'}\`}
                    >
                      <SquaresFour size={18} /> <span className="text-sm">Grid</span>
                    </button>
                    <button 
                      onClick={() => setViewMode('list')}
                      className={\`px-3 py-1.5 rounded-md transition-colors flex items-center justify-center gap-2 \${viewMode === 'list' ? 'bg-white shadow-sm text-[#1cb0b0] font-medium' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'}\`}
                    >
                      <List size={18} /> <span className="text-sm">List</span>
                    </button>`
);

fs.writeFileSync('src/App.tsx', content);
