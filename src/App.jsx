/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { 
  Search, X, Maximize2, Gamepad2, Zap, Flame, Trophy, 
  LayoutDashboard, BookOpen, Calendar, Mail, HelpCircle, 
  User, Settings, Bell, ChevronRight, ExternalLink,
  CheckCircle2, Clock, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './games.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeGame, setActiveGame] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const categories = ['All', ...Array.from(new Set(gamesData.map(g => g.category)))];

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const trendingGames = useMemo(() => {
    // For now, let's just pick the first 6 games as trending
    return gamesData.slice(0, 6);
  }, []);

  const recentGames = gamesData.slice(0, 5);
  const todoGames = gamesData.slice(5, 10);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex font-sans selection:bg-neon-red selection:text-white overflow-hidden">
      {/* Canvas Global Navigation (Left Sidebar) */}
      <nav className="w-[84px] bg-brutal-black flex flex-col items-center py-4 gap-1 z-40 shrink-0 h-screen overflow-y-auto custom-scrollbar border-r border-white/10">
        <div className="w-12 h-12 bg-neon-red flex items-center justify-center rounded-sm mb-4 cursor-pointer hover:bg-dark-red transition-colors shadow-[0_0_15px_rgba(255,0,0,0.3)]">
          <Zap className="text-white fill-white" size={28} />
        </div>
        
        <NavItem icon={<User size={26} />} label="Account" />
        <NavItem icon={<LayoutDashboard size={26} />} label="Dashboard" active />
        <NavItem icon={<BookOpen size={26} />} label="Courses" />
        <NavItem icon={<Calendar size={26} />} label="Calendar" />
        <NavItem icon={<Mail size={26} />} label="Inbox" badge="3" />
        <NavItem icon={<HelpCircle size={26} />} label="Help" />
        
        <div className="mt-auto pb-4">
          <NavItem icon={<Settings size={26} />} label="Settings" />
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header / Breadcrumbs */}
        <header className="h-16 bg-brutal-black border-b border-white/10 flex items-center px-6 justify-between sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-4">
            <button className="text-neon-red hover:text-white transition-colors">
              <LayoutDashboard size={24} />
            </button>
            <div className="flex items-center text-lg font-medium">
              <span className="text-white">Dashboard</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#2a2a2a] border border-white/10 rounded-md py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-neon-red w-64 transition-all text-white"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
            </div>
            <button className="text-white/60 hover:text-neon-red transition-colors relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-neon-red rounded-full shadow-[0_0_5px_rgba(255,0,0,0.8)]"></span>
            </button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden bg-[#1a1a1a]">
          {/* Dashboard Content */}
          <main className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
            <div className="max-w-6xl mx-auto">
              {/* Global Announcement */}
              <div className="mb-8 bg-brutal-black border border-white/10 rounded-md overflow-hidden shadow-2xl">
                <div className="bg-neon-red h-1 w-full shadow-[0_0_10px_rgba(255,0,0,0.5)]"></div>
                <div className="p-4 flex items-start gap-4">
                  <div className="p-2 bg-neon-red/10 rounded-full text-neon-red">
                    <AlertCircle size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Global Announcement</h3>
                    <p className="text-sm text-white/70 mt-1">
                      Welcome to the 2026 Semester of <span className="font-bold text-neon-red">Crazy Unblocked Games</span>. 
                      New modules have been added to your dashboard. Please complete your daily assignments to maintain your GPA.
                    </p>
                    <button className="mt-3 text-xs font-bold text-neon-red hover:underline uppercase">Dismiss</button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold text-white">
                    Dashboard
                  </h2>
                  <p className="text-xs text-white/40 font-mono mt-1 uppercase tracking-widest">
                    Total Modules: {gamesData.length}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs font-bold text-white/60 hover:text-neon-red border border-white/10 px-3 py-1.5 rounded hover:bg-white/5 transition-all flex items-center gap-2">
                    <LayoutDashboard size={14} /> View Grades
                  </button>
                </div>
              </div>

              {/* Trending Games Section */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <Flame className="text-neon-red fill-neon-red" size={20} />
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">Trending Modules</h3>
                  <div className="h-px flex-1 bg-white/10 ml-4"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {trendingGames.map((game) => (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      key={`trending-${game.id}`}
                      onClick={() => setActiveGame(game)}
                      className="relative aspect-[4/5] rounded-md overflow-hidden cursor-pointer group border border-white/10 hover:border-neon-red transition-all"
                    >
                      <img
                        src={game.thumbnail}
                        alt={game.title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brutal-black/90 via-transparent to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-[10px] font-bold text-neon-red uppercase mb-1 truncate">{game.category}</p>
                        <h4 className="text-xs font-bold text-white leading-tight line-clamp-2">{game.title}</h4>
                      </div>
                      <div className="absolute top-2 right-2">
                        <div className="bg-neon-red text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase shadow-[0_0_10px_rgba(255,0,0,0.5)]">
                          Trending
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Course Cards (Games) */}
              <div className="flex items-center gap-2 mb-6">
                <LayoutDashboard className="text-white/40" size={20} />
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">All Modules</h3>
                <div className="h-px flex-1 bg-white/10 ml-4"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredGames.map((game) => (
                  <motion.div
                    layout
                    key={game.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-brutal-black border border-white/10 rounded-md overflow-hidden group hover:border-neon-red/50 hover:shadow-[0_0_20px_rgba(255,0,0,0.1)] transition-all flex flex-col cursor-pointer"
                    onClick={() => setActiveGame(game)}
                  >
                    {/* Course Card Header (Color Block) */}
                    <div className="h-36 bg-neon-red relative overflow-hidden shrink-0">
                      <img
                        src={game.thumbnail}
                        alt={game.title}
                        className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 right-3">
                        <button className="p-1.5 bg-brutal-black/40 hover:bg-brutal-black/60 rounded-full text-white transition-colors">
                          <Settings size={16} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Course Card Body */}
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-neon-red group-hover:underline truncate mb-0.5 leading-tight">
                        {game.title}
                      </h3>
                      <p className="text-sm text-white/60 font-medium truncate mb-1">
                        {game.category} 101
                      </p>
                      <p className="text-[11px] text-white/30 font-mono uppercase tracking-widest">
                        2026 SEMESTER
                      </p>
                      
                      {/* Course Card Icons (Canvas Style) */}
                      <div className="mt-6 flex gap-6 text-white/20 group-hover:text-white/40 transition-colors">
                        <div className="hover:text-neon-red transition-colors" title="Announcements">
                          <Bell size={18} />
                        </div>
                        <div className="hover:text-neon-red transition-colors" title="Assignments">
                          <BookOpen size={18} />
                        </div>
                        <div className="hover:text-neon-red transition-colors" title="Discussions">
                          <Mail size={18} />
                        </div>
                        <div className="hover:text-neon-red transition-colors" title="Files">
                          <Calendar size={18} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredGames.length === 0 && (
                <div className="text-center py-20 bg-brutal-black/50 rounded-xl border border-dashed border-white/10">
                  <AlertCircle className="mx-auto text-neon-red mb-4" size={48} />
                  <h3 className="text-xl font-bold text-white">No courses found</h3>
                  <p className="text-white/40 text-sm mt-2">Check your filters or search query.</p>
                </div>
              )}
            </div>
          </main>

          {/* Canvas Sidebar (Right) */}
          <aside className="w-72 bg-brutal-black border-l border-white/10 p-6 hidden lg:flex flex-col gap-8 overflow-y-auto custom-scrollbar shrink-0">
            <div>
              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                <h3 className="text-sm font-bold text-white">To Do</h3>
              </div>
              <div className="space-y-4">
                {todoGames.map(game => (
                  <div key={game.id} className="flex gap-3 group cursor-pointer relative" onClick={() => setActiveGame(game)}>
                    <div className="mt-1 text-neon-red">
                      <Clock size={16} />
                    </div>
                    <div className="flex-1 pr-6">
                      <h4 className="text-sm font-bold text-neon-red hover:underline line-clamp-2 leading-tight">{game.title}</h4>
                      <p className="text-[11px] text-white/40 mt-1">100 points • Due Mar 29 at 11:59pm</p>
                    </div>
                    <button className="absolute top-0 right-0 text-white/20 hover:text-neon-red">
                      <X size={14} />
                    </button>
                  </div>
                ))}
                {todoGames.length === 0 && (
                  <p className="text-xs text-white/40 italic">Nothing to do for now!</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                <h3 className="text-sm font-bold text-white">Coming Up</h3>
                <button className="text-[10px] text-neon-red hover:underline font-bold uppercase">View Calendar</button>
              </div>
              <div className="space-y-4">
                {gamesData.slice(10, 13).map(game => (
                  <div key={game.id} className="flex gap-3 group cursor-pointer" onClick={() => setActiveGame(game)}>
                    <div className="mt-1 text-white/40 group-hover:text-neon-red transition-colors">
                      <Calendar size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-neon-red hover:underline line-clamp-1">{game.title} Quiz</h4>
                      <p className="text-[11px] text-white/40 mt-0.5">Mar 30 at 11:59pm</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                <h3 className="text-sm font-bold text-white">Recent Feedback</h3>
              </div>
              <div className="space-y-4">
                {recentGames.slice(0, 3).map(game => (
                  <div key={game.id} className="flex gap-3 group cursor-pointer" onClick={() => setActiveGame(game)}>
                    <div className="mt-1 text-green-500">
                      <CheckCircle2 size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-neon-red hover:underline line-clamp-1">{game.title}</h4>
                      <p className="text-[11px] text-white/60 mt-0.5">100 out of 100</p>
                      <p className="text-[11px] text-white/30 mt-0.5 italic">Mar 28 at 4:32pm</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-white/10">
              <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded transition-all flex items-center justify-center gap-2 border border-white/10">
                <Calendar size={14} /> View Calendar
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* Game Player Modal (Assignment View) */}
      <AnimatePresence>
        {activeGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-[#1a1a1a] overflow-hidden"
          >
            {/* Assignment Header (Canvas Style) */}
            <header className="h-16 bg-brutal-black border-b border-white/10 flex items-center px-6 justify-between shrink-0">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setActiveGame(null)}
                  className="text-neon-red hover:text-white transition-colors flex items-center gap-2 font-bold text-sm uppercase"
                >
                  <X size={20} /> Close Assignment
                </button>
                <div className="h-6 w-px bg-white/10 mx-2"></div>
                <div className="flex items-center text-sm font-medium">
                  <span className="text-white/60">Courses</span>
                  <ChevronRight size={16} className="mx-2 text-white/40" />
                  <span className="text-white/60">{activeGame.category}</span>
                  <ChevronRight size={16} className="mx-2 text-white/40" />
                  <span className="text-neon-red uppercase tracking-wider">{activeGame.title}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => window.open(activeGame.url, '_blank')}
                  className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded text-xs font-bold uppercase border border-white/10 transition-all flex items-center gap-2"
                >
                  <ExternalLink size={14} /> Open in New Tab
                </button>
                <button 
                  className="bg-neon-red hover:bg-dark-red text-white px-6 py-2 rounded text-xs font-bold uppercase transition-all shadow-[0_0_15px_rgba(255,0,0,0.3)]"
                >
                  Submit Assignment
                </button>
              </div>
            </header>

            {/* Assignment Content Area */}
            <div className="flex-1 flex overflow-hidden">
              {/* Assignment Main Content */}
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-white text-[#2d3b45]">
                <div className="max-w-5xl mx-auto">
                  <h1 className="text-4xl font-bold mb-4">{activeGame.title}</h1>
                  
                  {/* Assignment Metadata */}
                  <div className="flex flex-wrap gap-8 py-4 border-y border-[#e1e1e1] mb-8 text-sm font-medium">
                    <div>
                      <span className="block text-[#2d3b45]/40 text-[10px] uppercase tracking-widest mb-1">Due</span>
                      <span>Mar 29 at 11:59pm</span>
                    </div>
                    <div>
                      <span className="block text-[#2d3b45]/40 text-[10px] uppercase tracking-widest mb-1">Points</span>
                      <span>100</span>
                    </div>
                    <div>
                      <span className="block text-[#2d3b45]/40 text-[10px] uppercase tracking-widest mb-1">Submitting</span>
                      <span>a website URL</span>
                    </div>
                    <div>
                      <span className="block text-[#2d3b45]/40 text-[10px] uppercase tracking-widest mb-1">Attempts</span>
                      <span>0</span>
                    </div>
                    <div>
                      <span className="block text-[#2d3b45]/40 text-[10px] uppercase tracking-widest mb-1">Allowed Attempts</span>
                      <span>Unlimited</span>
                    </div>
                  </div>

                  {/* Instructions / Description */}
                  <div className="prose prose-sm max-w-none mb-10">
                    <p className="text-lg text-[#2d3b45]/80 leading-relaxed">
                      This module requires you to complete the interactive simulation for <span className="font-bold text-neon-red">{activeGame.title}</span>. 
                      Please ensure you have a stable connection and follow all safety protocols within the simulation environment.
                    </p>
                    <div className="mt-6 p-4 bg-[#f5f5f5] border-l-4 border-neon-red rounded-r-md">
                      <h4 className="font-bold text-sm uppercase mb-2">Learning Objectives:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Master the core mechanics of {activeGame.category}</li>
                        <li>Achieve a high score to unlock advanced modules</li>
                        <li>Demonstrate tactical proficiency in real-time scenarios</li>
                      </ul>
                    </div>
                  </div>

                  {/* The Simulation (Iframe) */}
                  <div className="bg-black rounded-lg overflow-hidden shadow-2xl border-4 border-brutal-black aspect-video relative group">
                    <iframe
                      src={activeGame.url}
                      className="w-full h-full border-none"
                      title={activeGame.title}
                      allowFullScreen
                      sandbox="allow-scripts allow-same-origin allow-forms"
                    />
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => window.open(activeGame.url, '_blank')}
                        className="p-2 bg-brutal-black/80 text-white rounded-md hover:bg-neon-red transition-colors"
                      >
                        <Maximize2 size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Assignment Footer */}
                  <div className="mt-12 pt-8 border-t border-[#e1e1e1] flex justify-between items-center text-[#2d3b45]/40 text-xs font-bold uppercase">
                    <div className="flex items-center gap-4">
                      <span>Course: CRAZY-UNBLOCKED-101</span>
                      <span className="w-1 h-1 bg-[#e1e1e1] rounded-full"></span>
                      <span>Module: {activeGame.id}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neon-red">
                      <Zap size={14} className="fill-neon-red" />
                      Simulation Environment Active
                    </div>
                  </div>
                </div>
              </div>

              {/* Assignment Sidebar (Canvas Style) */}
              <aside className="w-80 bg-[#f5f5f5] border-l border-[#e1e1e1] p-6 hidden xl:flex flex-col gap-8 overflow-y-auto custom-scrollbar shrink-0 text-[#2d3b45]">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-[#e1e1e1] pb-2">Submission</h3>
                  <div className="p-4 bg-white border border-[#e1e1e1] rounded-md text-center">
                    <div className="w-12 h-12 bg-[#f5f5f5] rounded-full flex items-center justify-center mx-auto mb-3 text-[#2d3b45]/20">
                      <AlertCircle size={24} />
                    </div>
                    <p className="text-xs font-bold mb-1">No Submission Yet!</p>
                    <p className="text-[10px] text-[#2d3b45]/40 leading-tight">Click the "Submit Assignment" button to complete this module.</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-[#e1e1e1] pb-2">Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#2d3b45]/60">Points</span>
                      <span className="font-bold">100</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#2d3b45]/60">Submitting</span>
                      <span className="font-bold">Website URL</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#2d3b45]/60">Attempts</span>
                      <span className="font-bold">0</span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  <button 
                    onClick={() => setActiveGame(null)}
                    className="w-full py-2 bg-white hover:bg-[#ebebeb] text-[#2d3b45] text-xs font-bold rounded border border-[#e1e1e1] transition-all flex items-center justify-center gap-2"
                  >
                    <ChevronRight size={14} className="rotate-180" /> Back to Dashboard
                  </button>
                </div>
              </aside>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavItem({ icon, label, active = false, badge = null }) {
  return (
    <div className="group relative flex flex-col items-center cursor-pointer w-full">
      <div className={`p-3 rounded-md transition-all relative ${
        active ? 'bg-white text-brutal-black' : 'text-white/60 group-hover:bg-white/10 group-hover:text-white'
      }`}>
        {icon}
        {badge && (
          <span className="absolute -top-1 -right-1 bg-neon-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-brutal-black">
            {badge}
          </span>
        )}
      </div>
      <span className={`text-[10px] mt-1 font-medium transition-all ${
        active ? 'text-white' : 'text-white/40 group-hover:text-white'
      }`}>
        {label}
      </span>
      {active && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
      )}
    </div>
  );
}
