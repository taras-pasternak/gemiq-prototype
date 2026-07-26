import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Folder, Image as ImageIcon, Sparkle, CheckCircle, Check,
  Download, CaretRight, GridFour, List, 
  Trash, CircleNotch, ArrowLeft, PaintBrush,
  MagnifyingGlass, House, Tray, Question, UploadSimple,
  FolderOpen, Eye, DownloadSimple, EnvelopeSimple, X,
  DotsThree, Plus, Diamond, ShareNetwork, ShoppingBag,
  Scissors, Ruler, TextT, ImageSquare, Broom, Info, Crop, CaretLeft, ArrowRight,
  ChatCircle, Paperclip, PaperPlaneRight, CaretDown
} from '@phosphor-icons/react';

const MOCK_IMAGES = [
  { id: 1, url: '/img1.jpg', selected: false, name: 'Emerald Halo Ring.png', date: 'Today, 23 Jul 2026' },
  { id: 2, url: '/img2.jpg', selected: false, name: 'Untitled', date: 'Today, 23 Jul 2026' },
  { id: 9, url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80', selected: false, name: 'Silver Chain.jpg', date: 'Today, 23 Jul 2026' },
  { id: 10, url: 'https://images.unsplash.com/photo-1585960622850-ed33c41d6418?w=800&q=80', selected: false, name: 'Gold Ring.jpg', date: 'Today, 23 Jul 2026' },
  { id: 11, url: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&q=80', selected: false, name: 'Diamond Earring.jpg', date: 'Today, 23 Jul 2026' },
  { id: 12, url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80', selected: false, name: 'Ruby Pendant.jpg', date: 'Today, 23 Jul 2026' },
  { id: 13, url: 'https://images.unsplash.com/photo-1590166223826-12dee1677420?w=800&q=80', selected: false, name: 'Sapphire Bracelet.jpg', date: 'Today, 23 Jul 2026' },
  { id: 14, url: 'https://images.unsplash.com/photo-1599458349289-18f0ee82e6ed?w=800&q=80', selected: false, name: 'Pearl Necklace.jpg', date: 'Today, 23 Jul 2026' },
  { id: 15, url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80', selected: false, name: 'Platinum Band.jpg', date: 'Today, 23 Jul 2026' },
  { id: 16, url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80', selected: false, name: 'Opal Brooch.jpg', date: 'Today, 23 Jul 2026' },
  { id: 17, url: 'https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?w=800&q=80', selected: false, name: 'Amethyst Ring.jpg', date: 'Today, 23 Jul 2026' },
  { id: 3, url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80', selected: false, name: 'Diamond Solitaire.jpg', date: 'Yesterday, 22 Jul 2026' },
  { id: 4, url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80', selected: false, name: 'Sapphire Pendant.png', date: 'Yesterday, 22 Jul 2026' },
  { id: 5, url: '/img3.jpg', selected: false, name: 'Untitled', date: 'Yesterday, 22 Jul 2026' },
  { id: 6, url: '/img1.jpg', selected: false, name: 'Gold Wedding Band.jpg', date: 'Jul 20, 2026' },
  { id: 7, url: '/img2.jpg', selected: false, name: 'Rose Gold Band.png', date: 'Jul 20, 2026' },
  { id: 8, url: '/img3.jpg', selected: false, name: 'Vintage Brooch.jpg', date: 'Jul 20, 2026' },
];

const MOCK_FOLDERS = [
  { id: 1, name: 'Fall Collection 2026', items: 24, date: 'Oct 12', previews: ['/img1.jpg', '/img2.jpg', '/img3.jpg', '/img1.jpg'] },
  { id: 2, name: 'Client Deliverables - ABC', items: 8, date: 'Oct 10', previews: ['/img2.jpg', '/img3.jpg', '/img1.jpg', '/img2.jpg'] },
  { id: 3, name: 'Empty Project', items: 0, date: 'Oct 14', previews: [] }
];

const PRESETS = [
  { id: 'insta', name: 'Instagram Story (9:16)', icon: '📱', desc: 'Optimized for social media stories' },
  { id: 'square', name: 'Website Square (1:1)', icon: '⬜', desc: 'Clean white background for e-commerce' },
  { id: 'luxury', name: 'Luxury Dark Theme', icon: '✨', desc: 'Dramatic lighting on dark marble' },
  { id: 'model', name: 'On Model (Lifestyle)', icon: '👩', desc: 'AI generated hand wearing the ring' }
];

export default function App() {
  const [view, setView] = useState<'media' | 'studio' | 'results'>('media');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [originalSize, setOriginalSize] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  const [images, setImages] = useState(MOCK_IMAGES);

  const groupedImages = images.reduce((acc, img) => {
    const dateLabel = img.date || 'Unknown Date';
    if (!acc[dateLabel]) acc[dateLabel] = [];
    acc[dateLabel].push(img);
    return acc;
  }, {} as Record<string, typeof images>);
  const [selectedPreset, setSelectedPreset] = useState('luxury');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResults, setGeneratedResults] = useState<any[]>([]);
  const [editingImageId, setEditingImageId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [previewImage, setPreviewImage] = useState<typeof MOCK_IMAGES[0] | null>(null);
  const [gemStudioImage, setGemStudioImage] = useState<typeof MOCK_IMAGES[0] | null>(null);
  const [gemStudioStep, setGemStudioStep] = useState<'options' | 'model_preferences'>('options');
  const [gemStudioImageStyle, setGemStudioImageStyle] = useState<{name: string, url: string} | null>(null);
  const [gemStudioCategory, setGemStudioCategory] = useState('Model Image');
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isStyleMenuOpen, setIsStyleMenuOpen] = useState(false);

  const todaysImages = MOCK_IMAGES.filter(img => img.date.includes('Today'));
  const isPreviewToday = previewImage ? todaysImages.some(img => img.id === previewImage.id) : false;

  const handlePrevPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!previewImage) return;
    const currentIndex = todaysImages.findIndex(img => img.id === previewImage.id);
    if (currentIndex !== -1) {
      const prevIndex = currentIndex === 0 ? todaysImages.length - 1 : currentIndex - 1;
      setPreviewImage(todaysImages[prevIndex]);
    }
  };

  const handleNextPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!previewImage) return;
    const currentIndex = todaysImages.findIndex(img => img.id === previewImage.id);
    if (currentIndex !== -1) {
      const nextIndex = currentIndex === todaysImages.length - 1 ? 0 : currentIndex + 1;
      setPreviewImage(todaysImages[nextIndex]);
    }
  };

  const selectedImages = images.filter(img => img.selected);

  const toggleSelect = (id: number) => {
    setImages(images.map(img => img.id === id ? { ...img, selected: !img.selected } : img));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedResults([
        { id: 'g1', url: 'https://images.unsplash.com/photo-1599643471711-c752015822f7?w=800&q=80', selected: false, label: 'Variation 1' },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1599643471711-c752015822f7?w=800&q=80&sat=-100', selected: false, label: 'Variation 2' },
        { id: 'g3', url: 'https://images.unsplash.com/photo-1605100804763-247f66150ce8?w=800&q=80', selected: false, label: 'Variation 3' },
        { id: 'g4', url: 'https://images.unsplash.com/photo-1605100804763-247f66150ce8?w=800&q=80&sat=-100', selected: false, label: 'Variation 4' },
      ]);
      setView('results');
    }, 3500);
  };

  const selectedCount = images.filter(img => img.selected).length;

  const ActionMenu = ({ className = "right-0 top-full mt-1", img }: { className?: string, img: typeof MOCK_IMAGES[0] }) => (
    <div className={`absolute ${className} w-64 bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] border border-slate-100 py-1.5 z-[100] text-left font-sans text-slate-700 animate-in fade-in zoom-in-95 duration-100`} onClick={e => e.stopPropagation()}>
      <button 
        onClick={() => { setPreviewImage(img); setOpenMenuId(null); }}
        className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-3 text-sm font-medium transition-colors"
      >
        <Eye size={16} className="text-slate-400" /> Preview (full screen)
      </button>
      <button className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-3 text-sm font-medium transition-colors">
        <ShoppingBag size={16} className="text-slate-400" /> Create product
      </button>
      <button className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-3 text-sm font-medium transition-colors">
        <Plus size={16} className="text-slate-400" /> Add product details
      </button>
      
      <div className="h-px bg-slate-100 my-1.5"></div>
      
      <button className="w-full text-left px-4 py-2 hover:bg-slate-50 flex flex-col gap-0.5 transition-colors">
        <div className="flex items-center gap-3 text-sm font-medium">
          <PaintBrush size={16} className="text-slate-400" /> Edit
        </div>
        <span className="text-[11px] text-slate-400 pl-7 leading-tight">Crop, resize, measure, add text, logo, adjust, erase...</span>
      </button>

      <button 
        className="w-full text-left px-4 py-2 hover:bg-[#ecf7f8] flex flex-col gap-0.5 transition-colors group"
        onClick={(e) => {
          e.stopPropagation();
          setGemStudioImage(img);
          setGemStudioStep('options');
          setOpenMenuId(null);
        }}
      >
        <div className="flex items-center gap-3 text-sm font-medium text-[#1cb0b0]">
          <Sparkle size={16} weight="fill" /> Edit with AI (GemStudio)
        </div>
        <span className="text-[11px] text-slate-500 pl-7 leading-tight">Generate model & lifestyle image, change color</span>
      </button>

      <div className="h-px bg-slate-100 my-1.5"></div>

      <button className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-3 text-sm font-medium transition-colors">
        <ShareNetwork size={16} className="text-slate-400" /> Share
      </button>
      <button className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-3 text-sm font-medium transition-colors">
        <DownloadSimple size={16} className="text-slate-400" /> Download
      </button>
      <button className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-3 text-sm font-medium text-red-500 transition-colors">
        <Trash size={16} className="text-red-400" /> Delete
      </button>
    </div>
  );

  return (
    <div className="flex h-screen bg-white font-sans text-slate-800" onClick={() => setOpenMenuId(null)}>
      {/* Sidebar - Matching the screenshot */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between">
        <div>
          <div className="h-[101px] px-6 border-b border-slate-200 flex items-center">
            <img 
              src="https://gemiq.com/cdn/shop/files/logo-horizontal-color.svg?v=1783497494&width=136" 
              alt="GemIQ Logo" 
              className="h-7 w-auto object-contain" 
            />
          </div>

          <div className="px-4 mb-6 pt-6">
            <button className="w-full h-[80px] bg-[#ecf7f8] border-2 border-transparent hover:border-[#23a9b9] overflow-hidden relative rounded-md flex group hover:bg-[#e0f1f2] transition-all duration-200 text-left">
              <div className="absolute top-0 bottom-0 w-[89px] left-2 pointer-events-none flex items-end justify-center">
                <img alt="GemCam" className="w-[85px] object-contain drop-shadow-sm" src="/gemcam-icon.png.png" />
              </div>
              <div className="flex-1 flex items-center justify-end pr-0 pl-[95px]">
                <p className="font-medium leading-tight text-[#2494a1] text-sm w-[110px]">
                  Capture using<br />GemCam <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </p>
              </div>
            </button>
          </div>

          <nav className="px-4 space-y-6">
            <div>
              <NavItem icon={<House size={18} />} label="Home" />
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3">Inventory</div>
              <div className="space-y-1">
                <NavItem icon={<ImageIcon size={18} />} label="Media" active />
                <NavItem icon={<List size={18} />} label="Products" />
                <NavItem icon={<Folder size={18} />} label="Collections" />
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3">Sales</div>
              <div className="space-y-1">
                <NavItem icon={<Tray size={18} />} label="Inquiries" />
              </div>
            </div>
          </nav>
        </div>

        <div className="border-t border-slate-100">
          <div className="p-4 space-y-1">
            <NavItem icon={<GridFour size={18} />} label="Integrations" />
            <NavItem icon={<Question size={18} />} label="Tutorials" />
          </div>
          <div className="mt-auto">
            <div className="bg-[#fffbeb] border-t border-slate-200 px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-[#ffedd5] transition">
              <div className="flex items-center gap-3">
                <Diamond size={18} weight="bold" className="text-slate-400" />
                <span className="text-sm font-medium text-slate-600">Available Credits: <span className="font-bold text-[#ff6b00]">35</span></span>
              </div>
              <CaretRight size={16} className="text-slate-400" />
            </div>
          </div>
          <div className="border-t border-slate-200 flex items-center gap-3 px-6 py-4 cursor-pointer hover:bg-slate-50 transition">
            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold text-sm shrink-0">WM</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">WeMakeMVP</p>
              <p className="text-xs text-slate-500 truncate">Taras Pasternak</p>
            </div>
            <CaretRight size={16} className="text-slate-400" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col relative bg-slate-50">
        <AnimatePresence mode="wait">
          
          {/* STATE 1: MEDIA LIBRARY */}
          {view === 'media' && (
            <motion.div 
              key="media"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col h-full"
            >
              {/* Header */}
              <div className="p-6 bg-white border-b border-slate-200 shrink-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">Product Media</h1>
                    <p className="text-slate-500 text-sm">Manage your digital assets and product imagery.</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="bg-[#1cb0b0] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-[#159a9a] transition whitespace-nowrap">
                      <UploadSimple size={18} /> Upload images
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex overflow-hidden relative bg-slate-50">
                {/* Center Content Column */}
                <div className="flex-1 flex flex-col min-w-0 relative">
                  <div className="flex-1 overflow-auto p-6">
                    {/* Toolbar */}
                    <div className="flex justify-between items-center mb-6 shrink-0">
                  <div className="relative w-[380px]">
                    <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search by name" 
                      className="w-full border border-slate-300 rounded-md py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:border-[#1cb0b0] bg-white"
                    />
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setOriginalSize(!originalSize)}>
                      <span className="text-xs text-slate-500 select-none">Original image size</span>
                      <button 
                        className={`w-9 h-5 rounded-full relative transition-colors ${originalSize ? 'bg-[#1cb0b0]' : 'bg-slate-300'}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform duration-200 ease-in-out ${originalSize ? 'translate-x-4 left-[2px]' : 'translate-x-0 left-[2px]'}`}></div>
                      </button>
                    </div>
                    
                    <div className="flex bg-slate-200/50 p-1 rounded-lg border border-slate-200">
                      <button 
                        onClick={() => setViewMode('grid')}
                        className={`px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-medium transition ${viewMode === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        <GridFour size={18} /> Grid
                      </button>
                      <button 
                        onClick={() => setViewMode('list')}
                        className={`px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-medium transition ${viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        <List size={18} /> List
                      </button>
                    </div>
                    
                    <div className="flex bg-slate-200/50 p-1 rounded-lg border border-slate-200">
                      <button 
                        onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
                        className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-2 text-sm font-medium ${isRightSidebarOpen ? 'text-[#1cb0b0]' : 'text-slate-500 hover:text-slate-700'}`}
                        title="Toggle Folders Sidebar"
                      >
                        {isRightSidebarOpen ? <X size={18} /> : <Folder size={18} />} Folders
                      </button>
                    </div>
                  </div>
                </div>
                
                {viewMode === 'grid' ? (
                  <div className="flex flex-col gap-8">
                    {Object.entries(groupedImages).map(([dateLabel, groupImages]) => (
                      <div key={dateLabel}>
                        <h3 className="text-sm font-medium text-slate-500 mb-4">{dateLabel}</h3>
                        <div className="grid grid-cols-6 gap-x-3 gap-y-8">
                          {groupImages.map(img => (
                            <div key={img.id} className="relative flex flex-col gap-1 group cursor-pointer" onClick={() => toggleSelect(img.id)}>
                              <div className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-200 border-2 border-transparent group/imgcontainer ${img.selected ? 'ring-2 ring-[#1cb0b0] ring-offset-2' : 'hover:border-[#1cb0b0]'} ${originalSize ? 'bg-white' : ''}`}>
                                <img src={img.url} className={`w-full h-full ${originalSize ? 'object-contain' : 'object-cover'}`} alt="Ring" />
                                
                                {/* View Overlay */}
                                <div 
                                  onClick={(e) => { 
                                    e.stopPropagation(); 
                                    if (selectedCount > 0) {
                                      toggleSelect(img.id);
                                    } else {
                                      setPreviewImage(img); 
                                    }
                                  }}
                                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/imgcontainer:opacity-100 transition-all duration-200 flex items-end justify-center cursor-pointer pb-3"
                                >
                                  {selectedCount === 0 && (
                                    <div className="flex items-center gap-2 text-white transform translate-y-2 group-hover/imgcontainer:translate-y-0 transition-transform duration-300">
                                      <Eye size={18} weight="regular" />
                                      <span className="font-medium text-[13px] tracking-wide">View</span>
                                    </div>
                                  )}
                                </div>
                                
                                {/* Checkbox */}
                                <div 
                                  onClick={(e) => { e.stopPropagation(); toggleSelect(img.id); }}
                                  className={`absolute top-2 left-2 w-6 h-6 rounded border flex items-center justify-center transition-opacity cursor-pointer z-10 ${img.selected ? 'bg-[#1cb0b0] border-[#1cb0b0] opacity-100' : 'bg-white border-slate-500 opacity-0 group-hover:opacity-100'}`}
                                >
                                  {img.selected && <Check size={16} weight="bold" className="text-white" />}
                                </div>
                                <div className={`absolute top-2 right-2 transition-opacity z-10 ${openMenuId === img.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                  <button onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === img.id ? null : img.id); }} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition shadow-sm">
                                    <DotsThree size={20} weight="bold" />
                                  </button>
                                </div>
                              </div>
                              {openMenuId === img.id && <ActionMenu img={img} className="left-3/4 top-8 ml-2" />}
                              <div className="text-left group/name h-7 flex items-center justify-start">
                                {editingImageId === img.id ? (
                                  <input 
                                    autoFocus
                                    type="text"
                                    value={editingName}
                                    onChange={(e) => setEditingName(e.target.value)}
                                    onBlur={() => {
                                      setImages(images.map(i => i.id === img.id ? { ...i, name: editingName || 'Untitled' } : i));
                                      setEditingImageId(null);
                                    }}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        setImages(images.map(i => i.id === img.id ? { ...i, name: editingName || 'Untitled' } : i));
                                        setEditingImageId(null);
                                      }
                                    }}
                                    className="text-sm font-medium text-left border-b-2 border-[#1cb0b0] focus:outline-none w-[90%] bg-transparent"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                ) : (
                                  <span 
                                    className={`text-sm font-medium px-2 py-1 -ml-2 rounded border border-transparent cursor-text transition-all ${img.name.includes('+') ? 'text-[#1cb0b0]' : 'text-slate-800'} hover:border-slate-300 hover:bg-slate-50`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditingImageId(img.id);
                                      setEditingName(img.name === 'Untitled' ? '' : img.name);
                                    }}
                                  >
                                    {img.name}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col bg-white rounded-lg border border-slate-200 overflow-hidden">
                    {/* Table Header */}
                    <div className="flex items-center gap-6 px-6 py-3 bg-slate-100 border-b border-slate-200 text-xs font-semibold text-slate-500">
                      <div className="w-6 shrink-0"></div>
                      <div className="w-16 shrink-0">Img</div>
                      <div className="flex-1">Name</div>
                      <div className="w-32 shrink-0">Date Uploaded</div>
                      <div className="w-32 shrink-0">Date Changed</div>
                      <div className="w-8 shrink-0"></div>
                    </div>

                    {/* Table Body */}
                    {Object.entries(groupedImages).map(([dateLabel, groupImages]) => (
                      <React.Fragment key={dateLabel}>
                        <div className="px-6 py-3 bg-white text-xs font-medium text-slate-500 text-center">
                          {dateLabel.startsWith('Today') ? 'Today' : dateLabel.startsWith('Yesterday') ? 'Yesterday' : dateLabel}
                        </div>
                        {groupImages.map((img) => (
                          <div key={img.id} className={`relative flex items-center gap-6 px-6 py-3 border-b border-slate-100 last:border-b-0 transition-all cursor-pointer ${img.selected ? 'bg-[#ecf7f8]' : 'bg-white hover:bg-slate-50'} ${openMenuId === img.id ? 'z-50' : 'z-10'}`} onClick={() => toggleSelect(img.id)}>
                            <div className={`w-6 h-6 rounded border flex items-center justify-center shrink-0 ${img.selected ? 'bg-[#1cb0b0] border-[#1cb0b0]' : 'bg-white border-slate-500'}`}>
                              {img.selected && <Check size={16} weight="bold" className="text-white" />}
                            </div>
                            
                            <div className="relative group/imgcontainer w-16 h-16 shrink-0 rounded overflow-hidden border border-slate-100">
                              <img src={img.url} className="w-full h-full object-cover" alt="Ring" />
                              <div 
                                onClick={(e) => { 
                                  e.stopPropagation(); 
                                  if (selectedCount > 0) {
                                    toggleSelect(img.id);
                                  } else {
                                    setPreviewImage(img); 
                                  }
                                }}
                                className="absolute inset-0 bg-black/40 opacity-0 group-hover/imgcontainer:opacity-100 transition-opacity duration-200 flex items-center justify-center cursor-pointer"
                              >
                                {selectedCount === 0 && <Eye size={20} weight="regular" className="text-white" />}
                              </div>
                            </div>
                            
                            <div className="flex-1 flex items-center">
                              {editingImageId === img.id ? (
                                <input 
                                  autoFocus
                                  type="text"
                                  value={editingName}
                                  onChange={(e) => setEditingName(e.target.value)}
                                  onBlur={() => {
                                    setImages(images.map(i => i.id === img.id ? { ...i, name: editingName || 'Untitled' } : i));
                                    setEditingImageId(null);
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      setImages(images.map(i => i.id === img.id ? { ...i, name: editingName || 'Untitled' } : i));
                                      setEditingImageId(null);
                                    }
                                  }}
                                  className="text-sm font-medium text-left border-b-2 border-[#1cb0b0] focus:outline-none min-w-[200px] bg-transparent"
                                  onClick={(e) => e.stopPropagation()}
                                />
                              ) : (
                                <span 
                                  className={`text-sm font-medium px-2 py-1 -ml-2 rounded border border-transparent cursor-text transition-all ${img.name.includes('+') ? 'text-[#1cb0b0]' : 'text-slate-800'} hover:border-slate-300 hover:bg-slate-50`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingImageId(img.id);
                                    setEditingName(img.name === 'Untitled' ? '' : img.name);
                                  }}
                                >
                                  {img.name}
                                </span>
                              )}
                            </div>

                            <div className="w-32 shrink-0 text-sm text-slate-500">{img.date?.startsWith('Today') ? 'Today' : img.date?.startsWith('Yesterday') ? 'Yesterday' : img.date}</div>
                            <div className="w-32 shrink-0 text-sm text-slate-500">{img.date?.startsWith('Today') ? 'Today' : img.date?.startsWith('Yesterday') ? 'Yesterday' : img.date}</div>

                            <div className="w-8 shrink-0 flex justify-end relative z-10">
                              <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition" onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === img.id ? null : img.id); }}>
                                <DotsThree size={20} weight="bold" />
                              </button>
                              {openMenuId === img.id && <ActionMenu img={img} />}
                            </div>
                          </div>
                        ))}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>

              {/* BULK ACTION BAR */}

                </div> {/* End Center Content Column */}

                {/* Right Sidebar */}
                <AnimatePresence>
                  {isRightSidebarOpen && (
                    <motion.div 
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 420, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      className="bg-white border-l border-slate-200 flex flex-col h-full shrink-0 overflow-hidden"
                    >
                    <div className="h-[42px] my-6 px-6 flex justify-between items-center shrink-0 w-full">
                      <h2 className="text-sm font-medium text-slate-500">Folders</h2>
                      <button className="w-8 h-8 rounded-full bg-[#e0f1f2] flex items-center justify-center text-[#1cb0b0] hover:bg-[#cde9ea] transition" title="Add Folder">
                        <Plus size={16} weight="bold" />
                      </button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto flex flex-col">
                      {MOCK_FOLDERS.map(folder => (
                        <div key={folder.id} className="border-b border-slate-100 first:border-t last:border-b-0 p-6 hover:bg-slate-50 transition group cursor-pointer relative flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="w-12 h-12 rounded-lg bg-[#e0f1f2] flex items-center justify-center shrink-0 overflow-hidden border border-slate-100">
                              {folder.items > 0 ? (
                                <div className="grid grid-cols-2 grid-rows-2 gap-[1px] w-full h-full bg-slate-200">
                                  {folder.previews.map((src, i) => (
                                    <img key={i} src={src} className="w-full h-full object-cover" alt="preview" />
                                  ))}
                                </div>
                              ) : (
                                <FolderOpen size={24} className="text-[#1cb0b0]" weight="fill" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-semibold text-slate-900 truncate">{folder.name}</h3>
                              <p className="text-xs text-slate-500 mt-1">{folder.items} items • {folder.date}</p>
                            </div>
                          </div>
                          
                          <div className="relative group/menu ml-4">
                            <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition">
                              <DotsThree size={20} weight="bold" />
                            </button>
                            
                            <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-slate-200 rounded-lg shadow-xl py-1 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-50 origin-top-right">
                              <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 hover:text-[#1cb0b0] flex items-center gap-3 transition">
                                <Eye size={16} /> Quick Preview
                              </button>
                              <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 hover:text-[#1cb0b0] flex items-center gap-3 transition">
                                <FolderOpen size={16} /> Open
                              </button>
                              <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 hover:text-[#1cb0b0] flex items-center gap-3 transition">
                                <DownloadSimple size={16} /> Download as Archive
                              </button>
                              <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 hover:text-[#1cb0b0] flex items-center gap-3 transition">
                                <EnvelopeSimple size={16} /> Send Archive via Email
                              </button>
                              
                              <div className="my-1 border-t border-slate-100"></div>
                              
                              <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center gap-3 transition">
                                <Trash size={16} /> Delete Folder
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              </div>

            </motion.div>
          )}

          {/* STATE 2: GEMSTUDIO MARKETING MODE (Kept identical functionality) */}
          {view === 'studio' && (
            <motion.div 
              key="studio"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col h-full bg-[#0a0f16] text-slate-100 z-50 fixed inset-0" 
            >
              <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-[#05080b]">
                <button onClick={() => setView('media')} className="flex items-center gap-2 text-slate-400 hover:text-white transition bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                  <ArrowLeft size={16} /> Cancel
                </button>
                <div className="flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
                  <Sparkle size={18} className="text-[#1cb0b0]" />
                  <span className="font-bold text-sm tracking-wide">GemStudio <span className="text-slate-500 font-normal ml-1">Marketing Assets</span></span>
                </div>
                <div className="w-24"></div> 
              </div>

              <div className="flex-1 flex">
                <div className="w-1/2 p-12 flex flex-col items-center justify-center border-r border-slate-800 relative bg-[#0a0f16]">
                  <div className="absolute top-6 left-6 flex flex-col gap-1">
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Input</span>
                    <span className="text-white text-sm">{selectedImages.length || 1} Photo{(selectedImages.length > 1) ? 's' : ''} Selected</span>
                  </div>
                  
                  <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-800 bg-black">
                    <img src={selectedImages[0]?.url || MOCK_IMAGES[0].url} className="w-full h-full object-cover opacity-90" />
                  </div>
                </div>

                <div className="w-1/2 p-12 bg-[#0d131a] flex flex-col">
                  <h2 className="text-2xl font-bold mb-2">Select Template</h2>
                  <p className="text-slate-400 mb-8 text-sm">Choose a preset to generate high-converting ads.</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {PRESETS.map(preset => (
                      <div 
                        key={preset.id}
                        onClick={() => setSelectedPreset(preset.id)}
                        className={`p-5 rounded-2xl cursor-pointer border-2 transition-all ${selectedPreset === preset.id ? 'border-[#1cb0b0] bg-[#1cb0b0]/10 shadow-[0_0_15px_rgba(28,176,176,0.15)]' : 'border-slate-800 bg-slate-900 hover:border-slate-700'}`}
                      >
                        <div className="text-3xl mb-3 bg-slate-950 w-12 h-12 flex items-center justify-center rounded-xl border border-slate-800">{preset.icon}</div>
                        <div className="font-bold text-slate-100 mb-1">{preset.name}</div>
                        <div className="text-xs text-slate-400 leading-relaxed">{preset.desc}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-slate-400 text-sm font-medium">Output</span>
                      <span className="font-bold">4 Variations</span>
                    </div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-slate-400 text-sm font-medium">Credit Cost</span>
                      <div className="flex items-center gap-2">
                        <Sparkle size={14} className="text-[#1cb0b0]" />
                        <span className="text-white font-bold bg-[#1cb0b0]/20 px-3 py-1 rounded-md border border-[#1cb0b0]/30 text-sm">1 Credit</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="w-full bg-gradient-to-r from-[#1cb0b0] to-[#159a9a] hover:from-[#159a9a] hover:to-[#0f7d7d] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-lg transform hover:-translate-y-0.5"
                    >
                      {isGenerating ? (
                        <>
                          <CircleNotch size={20} className="animate-spin" /> Processing AI...
                        </>
                      ) : (
                        <>
                          <Sparkle size={20} /> Generate Assets
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {isGenerating && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#0a0f16]/90 backdrop-blur-md flex flex-col items-center justify-center z-50"
                  >
                    <div className="bg-slate-900 p-10 rounded-3xl border border-slate-800 shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col items-center max-w-md text-center">
                      <div className="relative mb-8">
                        <div className="absolute inset-0 bg-[#1cb0b0] blur-xl opacity-20 rounded-full animate-pulse"></div>
                        <CircleNotch size={56} className="animate-spin text-[#1cb0b0] relative z-10" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-white">Applying Magic</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-8">Enhancing lighting, removing imperfections, and generating 4 unique marketing variations...</p>
                      
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-[#1cb0b0] to-[#25d3d3]"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 3.5, ease: "linear" }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* STATE 3: RESULTS & EXPORT */}
          {view === 'results' && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col h-full bg-slate-50 z-50 fixed inset-0"
            >
              <div className="p-8 pb-4 flex justify-between items-end border-b border-slate-200 bg-white shadow-sm z-10">
                <div>
                  <button onClick={() => setView('media')} className="text-sm text-slate-500 mb-2 flex items-center gap-1 hover:text-slate-900 font-medium transition">
                    <ArrowLeft size={14} /> Back to Media
                  </button>
                  <h1 className="text-3xl font-bold text-slate-900">Select Best Variations</h1>
                  <p className="text-slate-500 mt-1">Select the images you want to keep. Unselected images will be discarded.</p>
                </div>
                
                <div className="flex gap-3">
                  <button className="px-5 py-2.5 border border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 shadow-sm transition">
                    <PaintBrush size={18} /> Review & Edit
                  </button>
                  <button 
                    onClick={() => {
                      alert('Success! Downloaded ZIP with your selected marketing assets.');
                      setView('media');
                    }}
                    className={`px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition shadow-md transform hover:-translate-y-0.5 ${generatedResults.some(r => r.selected) ? 'bg-slate-900 hover:bg-slate-800 text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                    disabled={!generatedResults.some(r => r.selected)}
                  >
                    <Download size={18} /> Download ZIP
                  </button>
                </div>
              </div>

              <div className="flex-1 p-8 overflow-auto">
                <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {generatedResults.map((res, idx) => (
                    <div 
                      key={res.id}
                      onClick={() => {
                        const newRes = [...generatedResults];
                        newRes[idx].selected = !newRes[idx].selected;
                        setGeneratedResults(newRes);
                      }}
                      className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 ${res.selected ? 'ring-4 ring-[#1cb0b0] ring-offset-2 shadow-xl' : 'border-2 border-slate-200 hover:border-slate-300 hover:shadow-lg'}`}
                    >
                      <img src={res.url} className={`w-full h-full object-cover transition duration-500 ${res.selected ? 'scale-105' : 'group-hover:scale-105'}`} />
                      
                      <div className="absolute top-4 left-4 flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors shadow-sm ${res.selected ? 'bg-[#1cb0b0] border-[#1cb0b0]' : 'border-white bg-black/40 group-hover:bg-black/60 group-hover:border-white'}`}>
                          {res.selected && <CheckCircle size={20} className="text-white" />}
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-end">
                        <span className="text-white font-medium text-sm drop-shadow-md">{res.label}</span>
                        <button className="bg-white/20 hover:bg-white/40 text-white p-2.5 rounded-lg backdrop-blur-md transition flex items-center gap-2 text-sm font-medium border border-white/10">
                          <PaintBrush size={16} /> Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Floating Action Bar */}
        <AnimatePresence>
          {selectedCount > 0 && view === 'media' && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-8 z-50 pointer-events-auto"
            >
              <div className="flex items-center gap-3 border-r border-slate-700 pr-8">
                <span className="text-sm font-medium text-slate-400">{selectedCount} selected</span>
              </div>
              
              <button className="flex items-center gap-2 text-sm font-medium hover:text-[#1cb0b0] transition whitespace-nowrap">
                <Sparkle size={18} /> Create a product
              </button>
              <button className="flex items-center gap-2 text-sm font-medium hover:text-[#1cb0b0] transition whitespace-nowrap">
                <Folder size={18} /> Move to folder
              </button>
              <button className="flex items-center gap-2 text-sm font-medium hover:text-[#1cb0b0] transition whitespace-nowrap">
                <ShareNetwork size={18} /> Share
              </button>
              <button className="flex items-center gap-2 text-sm font-medium hover:text-[#1cb0b0] transition whitespace-nowrap">
                <DownloadSimple size={18} /> Download
              </button>
              <button className="flex items-center gap-2 text-sm font-medium text-red-400 hover:text-red-300 transition whitespace-nowrap">
                <Trash size={18} /> Delete
              </button>
              
              <button onClick={() => setImages(images.map(img => ({ ...img, selected: false })))} className="ml-2 p-1.5 hover:bg-slate-800 rounded-full transition">
                <X size={16} className="text-slate-400" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fullscreen Preview Modal */}
        <AnimatePresence>
          {previewImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex bg-black/80 backdrop-blur-sm"
              onClick={() => setPreviewImage(null)}
            >
              {/* Left Side: Image Preview */}
              <div className="flex-1 flex flex-col relative p-6 h-full">
                <button 
                  className="absolute top-6 left-6 text-white/70 hover:text-white p-2.5 bg-black/20 hover:bg-black/40 rounded-full transition z-10 backdrop-blur-md"
                  onClick={() => setPreviewImage(null)}
                >
                  <X size={20} weight="bold" />
                </button>
                <div className="flex-1 flex items-center justify-center p-8 min-h-0">
                  <motion.img 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    key={previewImage.url} // Re-animate on source change
                    src={previewImage.url} 
                    className="max-w-full max-h-full w-auto h-auto object-contain cursor-default" 
                    onClick={e => e.stopPropagation()}
                  />
                </div>
                
                {isPreviewToday && (
                  <div className="h-24 shrink-0 flex items-center justify-center gap-4 mt-4" onClick={e => e.stopPropagation()}>
                    <button onClick={handlePrevPreview} className="text-white/60 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors">
                      <CaretLeft size={24} weight="bold" />
                    </button>
                    
                    <div className="flex items-center gap-3 px-4">
                      {todaysImages.map(img => (
                        <button 
                          key={img.id}
                          onClick={() => setPreviewImage(img)} 
                          className={`w-[60px] h-[60px] rounded-lg overflow-hidden border-2 transition-all duration-200 ${previewImage.id === img.id ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-50 hover:opacity-100 hover:scale-105'}`}
                        >
                          <img src={img.url} className="w-full h-full object-cover" alt="Thumbnail" />
                        </button>
                      ))}
                    </div>
                    
                    <button onClick={handleNextPreview} className="text-white/60 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors">
                      <CaretRight size={24} weight="bold" />
                    </button>
                  </div>
                )}
              </div>

              {/* Right Side: GemStudio Sidebar */}
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="w-[480px] bg-white h-full shadow-[-10px_0_40px_rgba(0,0,0,0.15)] flex flex-col z-10"
                onClick={e => e.stopPropagation()}
              >
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                  <h2 className="text-lg font-bold text-[#1e293b] truncate" title="Ring_Final_Render.png">Ring_Final_Render.png</h2>
                  <button className="text-slate-400 hover:text-[#1cb0b0] transition shrink-0 ml-4 relative group">
                    <Info size={22} />
                    <div className="absolute right-0 top-full mt-2.5 w-[220px] bg-slate-900 text-white text-xs rounded-lg shadow-xl p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none text-left z-50 flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Dimensions:</span>
                        <span className="font-medium">1024 x 1024</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Size:</span>
                        <span className="font-medium">4.2 MB</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Uploaded:</span>
                        <span className="font-medium">{previewImage.date || 'Today'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">AI Generated:</span>
                        <span className="font-medium text-[#1cb0b0]">Today, 14:30</span>
                      </div>
                    </div>
                  </button>
                </div>
                
                <div className="p-6 flex-1 overflow-y-auto bg-white">
                  <div className="mb-8">
                    <div className="mb-4">
                      <h3 className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">Edit with AI (GemStudio)</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {/* Model Image Card */}
                      <div className="border border-[#e2e8f0] bg-[#f8fafc] hover:bg-[#f1f5f9] hover:border-transparent hover:ring-2 hover:ring-blue-400 rounded-lg p-2.5 flex flex-col items-center text-center cursor-pointer transition-all">
                        <div className="relative w-full aspect-[4/3] shrink-0 rounded-md overflow-hidden mb-2.5">
                          <img src="/img2.jpg" className="w-full h-full object-cover" alt="Model" />
                          <div className="absolute bottom-1.5 left-1.5 bg-[#fef9c3]/95 text-[#854d0e] px-1.5 py-0.5 rounded text-xs font-medium flex items-center gap-1 backdrop-blur-sm">
                            <Diamond size={12} weight="fill" className="text-[#ca8a04]" />
                            1 credit
                          </div>
                        </div>
                        <h3 className="font-bold text-slate-900 text-[15px] leading-snug mb-0.5">Model Image</h3>
                        <p className="text-[11px] text-slate-500 leading-tight">Create hyper-realistic model image</p>
                      </div>

                      {/* Change Color Card */}
                      <div className="border border-[#e2e8f0] bg-[#fdf8f6] hover:bg-[#faeee7] hover:border-transparent hover:ring-2 hover:ring-orange-400 rounded-lg p-2.5 flex flex-col items-center text-center cursor-pointer transition-all">
                        <div className="relative w-full aspect-[4/3] shrink-0 rounded-md overflow-hidden bg-white flex items-center justify-center p-1.5 border border-slate-100 mb-2.5">
                          <img src="/img1.jpg" className="w-full h-full object-contain" alt="Change Color" />
                          <div className="absolute bottom-1.5 left-1.5 bg-[#fef9c3]/95 text-[#854d0e] px-1.5 py-0.5 rounded text-xs font-medium flex items-center gap-1 backdrop-blur-sm">
                            <Diamond size={12} weight="fill" className="text-[#ca8a04]" />
                            1 credit
                          </div>
                        </div>
                        <h3 className="font-bold text-slate-900 text-[15px] leading-snug mb-0.5">Change color</h3>
                        <p className="text-[11px] text-slate-500 leading-tight">Change gold color to silver, yellow, or rose</p>
                      </div>

                      {/* Lifestyle Image Card */}
                      <div className="border border-[#fecdd3]/40 bg-[#fff1f2]/50 hover:bg-[#fff1f2] hover:border-transparent hover:ring-2 hover:ring-rose-400 rounded-lg p-2.5 flex flex-col items-center text-center cursor-pointer transition-all">
                        <div className="relative w-full aspect-[4/3] shrink-0 rounded-md overflow-hidden mb-2.5">
                          <img src="/img3.jpg" className="w-full h-full object-cover" alt="Lifestyle" />
                          <div className="absolute bottom-1.5 left-1.5 bg-[#fef9c3]/95 text-[#854d0e] px-1.5 py-0.5 rounded text-xs font-medium flex items-center gap-1 backdrop-blur-sm">
                            <Diamond size={12} weight="fill" className="text-[#ca8a04]" />
                            1 credit
                          </div>
                        </div>
                        <h3 className="font-bold text-slate-900 text-[15px] leading-snug mb-0.5">Lifestyle</h3>
                        <p className="text-[11px] text-slate-500 leading-tight">Place jewelry in natural environments</p>
                      </div>

                      {/* Model Video Card */}
                      <div className="border border-[#e2e8f0] bg-[#f0f9ff] hover:bg-[#e0f2fe] hover:border-transparent hover:ring-2 hover:ring-sky-400 rounded-lg p-2.5 flex flex-col items-center text-center cursor-pointer transition-all">
                        <div className="relative w-full aspect-[4/3] shrink-0 rounded-md overflow-hidden mb-2.5 bg-slate-100 flex items-center justify-center border border-slate-200/50">
                          <div className="absolute inset-0 flex">
                            <img src={previewImage.url} className="w-1/2 h-full object-cover" alt="Video Left" />
                            <div className="w-1/2 h-full overflow-hidden">
                              <img src={previewImage.url} className="w-full h-full object-cover scale-150 origin-center opacity-90" alt="Video Right" />
                            </div>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="bg-white/90 backdrop-blur w-7 h-7 rounded-full flex items-center justify-center text-[#1cb0b0] shadow-sm border border-slate-100">
                              <ArrowRight size={14} weight="bold" />
                            </div>
                          </div>
                          <div className="absolute bottom-1.5 left-1.5 bg-[#fef9c3]/95 text-[#854d0e] px-1.5 py-0.5 rounded text-xs font-medium flex items-center gap-1 backdrop-blur-sm">
                            <Diamond size={12} weight="fill" className="text-[#ca8a04]" />
                            4 credits
                          </div>
                        </div>
                        <h3 className="font-bold text-slate-900 text-[15px] leading-snug mb-0.5">Create Video</h3>
                        <p className="text-[11px] text-slate-500 leading-tight">Add natural motion to model image</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex items-center justify-between w-full">
                      <div className="flex items-center gap-2.5 text-yellow-800">
                        <div className="bg-yellow-100 p-1.5 rounded-full">
                          <Diamond size={18} weight="fill" className="text-yellow-600" />
                        </div>
                        <span className="font-bold text-sm">22 Available credits</span>
                      </div>
                      <button className="bg-[#1cb0b0] hover:bg-[#189a9a] text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors">
                        Edit with AI in GemStudio
                      </button>
                    </div>
                  </div>

                  <div className="mb-4 mt-8">
                    <div className="flex items-center justify-between mb-4 mt-2">
                      <h3 className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">Media Editor</h3>
                      <button className="text-[#1cb0b0] font-semibold hover:underline text-xs">
                        Open in Editor
                      </button>
                    </div>
                    
                    <div className="bg-white border border-[#e2e8f0] rounded-lg p-3 flex items-center justify-between">
                      {/* Block 1: Remove BG */}
                      <div className="flex flex-col items-center flex-1 cursor-pointer group">
                        <Scissors size={22} className="text-slate-500 mb-1.5 group-hover:text-[#1cb0b0] transition-colors" />
                        <span className="text-[12px] font-semibold text-slate-600 group-hover:text-slate-900 transition-colors text-center whitespace-nowrap">Remove BG</span>
                      </div>
                      
                      {/* Block 2: Measure */}
                      <div className="flex flex-col items-center flex-1 cursor-pointer group">
                        <Ruler size={22} className="text-slate-500 mb-1.5 group-hover:text-[#1cb0b0] transition-colors" />
                        <span className="text-[12px] font-semibold text-slate-600 group-hover:text-slate-900 transition-colors text-center whitespace-nowrap">Measure</span>
                      </div>
                      
                      {/* Block 3: Crop */}
                      <div className="flex flex-col items-center flex-1 cursor-pointer group">
                        <Crop size={22} className="text-slate-500 mb-1.5 group-hover:text-[#1cb0b0] transition-colors" />
                        <span className="text-[12px] font-semibold text-slate-600 group-hover:text-slate-900 transition-colors text-center whitespace-nowrap">Crop & resize</span>
                      </div>
                      
                      {/* Block 4: Other tools */}
                      <div className="flex flex-col items-center flex-1 cursor-pointer group">
                        <div className="flex items-center gap-1 mb-1.5 text-slate-500 group-hover:text-[#1cb0b0] transition-colors">
                          <TextT size={22} />
                          <ImageSquare size={22} />
                          <Broom size={22} />
                        </div>
                        <span className="text-[12px] font-semibold text-slate-600 group-hover:text-slate-900 transition-colors text-center whitespace-nowrap">Other tools...</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8 mt-8">
                    <h3 className="text-[13px] font-bold text-slate-500 uppercase tracking-wider mb-4">Actions</h3>
                    <div className="flex flex-col">
                      <button className="w-full px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-3 rounded-md transition-colors">
                        <ShoppingBag size={18} /> Create product
                      </button>
                      <button className="w-full px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-3 rounded-md transition-colors">
                        <List size={18} /> Add product details
                      </button>
                      <button className="w-full px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-3 rounded-md transition-colors">
                        <DownloadSimple size={18} /> Download
                      </button>
                      <button className="w-full px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-3 rounded-md transition-colors">
                        <ShareNetwork size={18} /> Share
                      </button>
                      <button className="w-full px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-3 rounded-md transition-colors">
                        <FolderOpen size={18} /> Move to Folder
                      </button>
                      <button className="w-full px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-3 rounded-md transition-colors">
                        <Trash size={18} /> Delete
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* GemStudio Full-Screen View */}
      {gemStudioImage && (
        <div className="fixed inset-0 z-[200] bg-white flex flex-col h-screen text-slate-800 animate-in fade-in duration-200">
          {/* Header (Full Width & Static) */}
          <div className="h-[72px] px-6 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white relative z-10 w-full">
            <button 
              onClick={() => { setGemStudioImage(null); setGemStudioStep('options'); }}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors font-medium text-[15px] px-3 py-2 rounded-lg"
            >
              <ArrowLeft size={18} /> Go back to Gem IQ
            </button>
            
            <h2 className="text-[22px] font-bold text-slate-800 flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
              <Sparkle size={26} weight="fill" className="text-[#1cb0b0]" /> GemStudio
            </h2>
            
            <div className="w-[180px]"></div> {/* Spacer */}
          </div>

          {/* Main Layout Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar */}
            <div className="w-[260px] bg-slate-50 border-r border-slate-200 flex flex-col shrink-0">
              <div className="p-4">
                <button className="w-full flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-100 text-slate-700 py-2.5 rounded-[12px] font-medium transition-colors shadow-sm">
                  <Plus size={18} weight="bold" /> New Project
                </button>
              </div>
              
              <div className="px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider mt-2">
                Recent
              </div>
              
              <div className="flex-1 overflow-y-auto px-3 space-y-1">
                {/* Active Chat */}
                <button className="w-full flex items-center px-3 py-2.5 rounded-lg bg-slate-200 text-left font-medium text-slate-800 transition-colors">
                  <span className="truncate">{gemStudioImage.name}</span>
                </button>
                
                {/* Mock Inactive Chats */}
                <button className="w-full flex items-center px-3 py-2.5 rounded-lg text-left hover:bg-slate-100 font-medium text-slate-600 hover:text-slate-800 transition-colors">
                  <span className="truncate">Platinum Band Render</span>
                </button>
                <button className="w-full flex items-center px-3 py-2.5 rounded-lg text-left hover:bg-slate-100 font-medium text-slate-600 hover:text-slate-800 transition-colors">
                  <span className="truncate">Sapphire Necklace Concept</span>
                </button>
              </div>
            </div>

            {/* Main Workspace (Workspace content) */}
            <div className="flex-1 flex flex-col relative bg-white">


            {/* Scrollable Center Content */}
            <div className="flex-1 overflow-y-auto px-12 py-12 pb-40 flex justify-center">
              {gemStudioStep === 'options' ? (
                <div className="w-full max-w-[900px]">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Card 1 */}
                    <div 
                      className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-[#1cb0b0] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all cursor-pointer group flex items-center justify-between gap-4"
                      onClick={() => { setGemStudioCategory('Model Image'); setGemStudioStep('model_preferences'); }}
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-900 text-[17px] mb-1">Model Image</h3>
                        <p className="text-[14px] text-slate-500 leading-relaxed pr-2">Create hyper-realistic model image based on a jewelry image</p>
                      </div>
                      <div className="w-16 h-16 rounded-[14px] bg-slate-100 overflow-hidden shrink-0 relative">
                        <img src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80" alt="Model" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    </div>
                    
                    {/* Card 2 */}
                    <div 
                      className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-[#1cb0b0] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all cursor-pointer group flex items-center justify-between gap-4"
                      onClick={() => { setGemStudioCategory('Change Gold Color'); setGemStudioStep('model_preferences'); }}
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-900 text-[17px] mb-1">Change Gold Color</h3>
                        <p className="text-[14px] text-slate-500 leading-relaxed pr-2">Change the jewelry's gold color to silver, yellow gold, or rose gold</p>
                      </div>
                      <div className="w-16 h-16 rounded-[14px] bg-slate-100 overflow-hidden shrink-0 relative flex items-center justify-center">
                        <div className="absolute inset-0 flex">
                          <img src="https://images.unsplash.com/photo-1599643471711-c752015822f7?w=800&q=80" alt="Gold" className="w-1/2 h-full object-cover group-hover:scale-105 transition-transform duration-500 origin-left" />
                          <img src="https://images.unsplash.com/photo-1599643471711-c752015822f7?w=800&q=80&sat=-100" alt="Silver" className="w-1/2 h-full object-cover group-hover:scale-105 transition-transform duration-500 origin-right" />
                        </div>
                      </div>
                    </div>

                    {/* Card 3 */}
                    <div 
                      className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-[#1cb0b0] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all cursor-pointer group flex items-center justify-between gap-4"
                      onClick={() => { setGemStudioCategory('Lifestyle Image'); setGemStudioStep('model_preferences'); }}
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-900 text-[17px] mb-1">Lifestyle Image</h3>
                        <p className="text-[14px] text-slate-500 leading-relaxed pr-2">Enhance realism by placing jewelry in natural lifestyle environments</p>
                      </div>
                      <div className="w-16 h-16 rounded-[14px] bg-slate-100 overflow-hidden shrink-0 relative">
                        <img src="https://images.unsplash.com/photo-1605100804763-247f66150ce8?w=800&q=80" alt="Lifestyle" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    </div>

                    {/* Card 4 */}
                    <div 
                      className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-[#1cb0b0] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all cursor-pointer group flex items-center justify-between gap-4"
                      onClick={() => { setGemStudioCategory('Create Video'); setGemStudioStep('model_preferences'); }}
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-900 text-[17px] mb-1">Create Video</h3>
                        <p className="text-[14px] text-slate-500 leading-relaxed pr-2">Add natural motion to model image</p>
                      </div>
                      <div className="w-16 h-16 rounded-[14px] bg-slate-100 overflow-hidden shrink-0 relative flex items-center justify-center">
                        <img src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80" alt="Video" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                          <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-md shadow-sm">
                            <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-[#1cb0b0] border-b-[4px] border-b-transparent ml-0.5"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-[800px] mt-4">
                  {/* Category Selector Card */}
                  <div className="relative mb-4">
                    <button 
                      onClick={() => { setIsCategoryMenuOpen(!isCategoryMenuOpen); setIsStyleMenuOpen(false); }}
                      className="w-full bg-white border border-slate-400/60 rounded-[20px] p-4 flex items-center justify-between hover:border-slate-400 hover:bg-slate-50 transition-all shadow-sm"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-[64px] h-[64px] rounded-[12px] overflow-hidden shrink-0 border border-slate-200">
                          <img src={gemStudioImage?.url} alt="Original" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-bold text-slate-900 text-[17px]">{gemStudioCategory}</span>
                      </div>
                      <CaretDown size={24} weight="bold" className={`text-slate-400 mr-2 transition-transform ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {isCategoryMenuOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-[16px] shadow-lg z-50 overflow-hidden"
                        >
                          {['Model Image', 'Change Gold Color', 'Lifestyle Image', 'Create Video'].map(cat => (
                            <button 
                              key={cat}
                              onClick={() => { setGemStudioCategory(cat); setIsCategoryMenuOpen(false); }}
                              className="w-full text-left px-5 py-3.5 hover:bg-slate-50 border-b border-slate-50 last:border-0 font-medium text-[15px] text-slate-700 hover:text-slate-900 transition-colors"
                            >
                              {cat}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {gemStudioImageStyle ? (
                    <div className="relative mb-4">
                      <button 
                        onClick={() => { setIsStyleMenuOpen(!isStyleMenuOpen); setIsCategoryMenuOpen(false); }}
                        className="w-full bg-white border border-slate-400/60 rounded-[20px] p-4 flex items-center justify-between hover:border-slate-400 hover:bg-slate-50 transition-all shadow-sm"
                      >
                        <div className="flex items-center gap-5">
                          <div className="w-[64px] h-[64px] rounded-[12px] overflow-hidden shrink-0 border border-slate-200">
                            <img src={gemStudioImageStyle.url} alt="Style" className="w-full h-full object-cover" />
                          </div>
                          <span className="font-bold text-slate-900 text-[17px]">{gemStudioImageStyle.name}</span>
                        </div>
                        <CaretDown size={24} weight="bold" className={`text-slate-400 mr-2 transition-transform ${isStyleMenuOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {isStyleMenuOpen && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-[16px] shadow-lg z-50 overflow-hidden"
                          >
                            {[
                              { name: 'Standard Close-up', url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80' },
                              { name: 'Fashion Model', url: 'https://images.unsplash.com/photo-1588636746816-1b48b6f3c051?w=800&q=80' },
                              { name: 'Casual Elegance', url: 'https://images.unsplash.com/photo-1620054707185-30f14376fb87?w=800&q=80' }
                            ].map(style => (
                              <button 
                                key={style.name}
                                onClick={() => { setGemStudioImageStyle(style); setIsStyleMenuOpen(false); }}
                                className="w-full text-left px-5 py-3 hover:bg-slate-50 border-b border-slate-50 last:border-0 flex items-center gap-4 transition-colors"
                              >
                                <div className="w-[40px] h-[40px] rounded-lg overflow-hidden shrink-0 border border-slate-200">
                                  <img src={style.url} alt={style.name} className="w-full h-full object-cover" />
                                </div>
                                <span className="font-medium text-[15px] text-slate-700 hover:text-slate-900">{style.name}</span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-bold text-slate-900 text-[17px] mb-4 mt-6">Select Model Image Style</h3>
                      <div className="grid grid-cols-3 gap-5 mb-8">
                        {/* Option 1 */}
                        <div 
                          className="flex flex-col gap-3 cursor-pointer group"
                          onClick={() => setGemStudioImageStyle({name: 'Standard Close-up', url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80'})}
                        >
                          <div className="aspect-square rounded-[20px] overflow-hidden bg-slate-100 relative shadow-sm group-hover:shadow-md transition-all">
                            <img src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80" alt="Standard Close-up" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="text-center font-medium text-[15px] text-slate-600 group-hover:text-slate-900 transition-colors">Standard Close-up</div>
                        </div>
                        {/* Option 2 */}
                        <div 
                          className="flex flex-col gap-3 cursor-pointer group"
                          onClick={() => setGemStudioImageStyle({name: 'Fashion Model', url: 'https://images.unsplash.com/photo-1588636746816-1b48b6f3c051?w=800&q=80'})}
                        >
                          <div className="aspect-square rounded-[20px] overflow-hidden bg-slate-100 relative shadow-sm group-hover:shadow-md transition-all">
                            <img src="https://images.unsplash.com/photo-1588636746816-1b48b6f3c051?w=800&q=80" alt="Fashion Model" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="text-center font-medium text-[15px] text-slate-600 group-hover:text-slate-900 transition-colors">Fashion Model</div>
                        </div>
                        {/* Option 3 */}
                        <div 
                          className="flex flex-col gap-3 cursor-pointer group"
                          onClick={() => setGemStudioImageStyle({name: 'Casual Elegance', url: 'https://images.unsplash.com/photo-1620054707185-30f14376fb87?w=800&q=80'})}
                        >
                          <div className="aspect-square rounded-[20px] overflow-hidden bg-slate-100 relative shadow-sm group-hover:shadow-md transition-all">
                            <img src="https://images.unsplash.com/photo-1620054707185-30f14376fb87?w=800&q=80" alt="Casual Elegance" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="text-center font-medium text-[15px] text-slate-600 group-hover:text-slate-900 transition-colors">Casual Elegance</div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Prompt Input */}
            <div className="absolute bottom-0 left-0 right-0 p-8 pb-10 pointer-events-none">
              <div className="max-w-[800px] mx-auto pointer-events-auto bg-white rounded-[24px] shadow-[0_4px_30px_rgba(0,0,0,0.08)] border border-slate-200 overflow-hidden flex flex-col transition-shadow hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
                
                {/* Image Attachment Indicator */}
                <div className="px-4 pt-4 pb-2 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                    <img src={gemStudioImage.url} alt="Attached" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full flex items-center gap-2">
                    <Paperclip size={14} /> Attached Photo
                  </span>
                </div>

                <div className="flex items-end px-2 pb-3">
                  <div className="px-3 pb-2 pt-1 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
                    <Paperclip size={22} />
                  </div>
                  <textarea 
                    placeholder="Message GemStudio or type recommendations..." 
                    className="flex-1 max-h-32 min-h-[44px] bg-transparent resize-none focus:outline-none text-slate-700 py-2.5 px-2 text-[16px] leading-relaxed"
                    rows={1}
                  />
                  <div className="px-3 pb-1">
                    <button className="w-10 h-10 bg-[#1cb0b0] text-white rounded-full flex items-center justify-center hover:bg-[#159a9a] transition-all transform hover:scale-105 active:scale-95 shadow-md">
                      <PaperPlaneRight size={18} weight="fill" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${active ? 'bg-[#e2f5f5] text-[#1cb0b0] font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}>
      <span className={active ? 'text-[#1cb0b0]' : 'text-slate-400'}>{icon}</span>
      {label}
    </button>
  );
}
