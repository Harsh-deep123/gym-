import React from 'react';
import { ShoppingBag, SlidersHorizontal, Search, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  compareCount: number;
  onOpenCart: () => void;
  onOpenCompare: () => void;
  onOpenConfigurator: () => void;
  onNavigateSection: (sectionId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isSearchOpen: boolean;
  onToggleSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  compareCount,
  onOpenCart,
  onOpenCompare,
  onOpenConfigurator,
  onNavigateSection,
  searchQuery,
  onSearchChange,
  isSearchOpen,
  onToggleSearch,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass-precision transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6 sm:gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center gap-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 font-condensed"
        >
          <span className="w-2.5 h-6 bg-[#FF5500] group-hover:bg-[#D4FF00] transition-colors rounded-[1px] transform -skew-x-12" />
          <span className="tracking-tighter">KINETIC</span>
          <span className="text-[#8E95A5] font-light tracking-widest text-lg sm:text-xl">PERFORMANCE</span>
        </a>

        {/* Zone 2: 4-5 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold tracking-wider text-[#8E95A5] uppercase">
          <button
            onClick={() => onNavigateSection('product-matrix')}
            className="hover:text-white hover:border-b-2 hover:border-[#FF5500] pb-1 transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            Footwear Matrix
          </button>
          <button
            onClick={() => onNavigateSection('engineering-lab')}
            className="hover:text-white hover:border-b-2 hover:border-[#FF5500] pb-1 transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            Biomechanics Lab
          </button>
          <button
            onClick={onOpenConfigurator}
            className="flex items-center gap-1.5 text-[#D4FF00] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Rig Configurator</span>
          </button>
          <button
            onClick={onOpenCompare}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer"
          >
            <span>Compare Matrix</span>
            {compareCount > 0 && (
              <span className="bg-[#D4FF00] text-[#0F1115] text-[10px] font-bold px-1.5 py-0.2 rounded-[2px] tabular-nums font-mono">
                {compareCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: 1 primary action cluster */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Search Toggle */}
          <button
            onClick={onToggleSearch}
            aria-label="Toggle search input"
            className="p-2 text-[#8E95A5] hover:text-white hover:bg-[#161920] border border-transparent hover:border-[#2A303C] rounded-[4px] transition-all cursor-pointer"
          >
            {isSearchOpen ? <X className="w-4 h-4 text-[#FF5500]" /> : <Search className="w-4 h-4" />}
          </button>

          {/* Compare Mobile Trigger */}
          <button
            onClick={onOpenCompare}
            aria-label="Open compare view"
            className="md:hidden relative p-2 text-[#8E95A5] hover:text-white hover:bg-[#161920] border border-[#2A303C] rounded-[4px] cursor-pointer"
          >
            <span className="text-xs font-mono font-bold">VS</span>
            {compareCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D4FF00] text-[#0F1115] text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-[2px] font-mono">
                {compareCount}
              </span>
            )}
          </button>

          {/* Primary Action: Shopping Bag */}
          <button
            onClick={onOpenCart}
            aria-label="View shopping bag"
            className="group relative flex items-center gap-2.5 px-3.5 py-2 bg-[#FF5500] hover:bg-[#ff6611] text-[#0F1115] font-bold text-xs uppercase tracking-wider rounded-[4px] transition-all glow-active cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline font-mono">BAG</span>
            <span className="bg-[#0F1115] text-[#D4FF00] font-mono text-[11px] font-extrabold px-1.5 py-0.5 rounded-[2px] tabular-nums min-w-[20px] text-center">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Collapsible Search Bar with precision inset */}
      {isSearchOpen && (
        <div className="border-t border-[#2A303C] bg-[#161920] px-4 py-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <Search className="w-4 h-4 text-[#FF5500] shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="SEARCH BY MODEL, CARBON PLATE, STACK HEIGHT, OR TERRAIN..."
              className="w-full bg-transparent text-white placeholder-[#8E95A5] text-xs sm:text-sm font-mono uppercase tracking-wider focus:outline-none"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-xs text-[#8E95A5] hover:text-white font-mono cursor-pointer"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
