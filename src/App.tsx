import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ParallaxTelemetryStrip } from './components/ParallaxTelemetryStrip';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { KineticLabConfigurator } from './components/KineticLabConfigurator';
import { ComparisonDrawer } from './components/ComparisonDrawer';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { BiomechanicsLabSection } from './components/BiomechanicsLabSection';
import { Footer } from './components/Footer';
import { PRODUCTS, Product } from './data/products';
import { SlidersHorizontal, ArrowUpDown, Search, Check, Sparkles, X } from 'lucide-react';

export default function App() {
  // Navigation & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Footwear');
  const [sortBy, setSortBy] = useState<'velocity' | 'weight' | 'energy' | 'price'>('velocity');

  // Modals & Drawers State
  const [activeDetailProduct, setActiveDetailProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isConfiguratorModalOpen, setIsConfiguratorModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Bag State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'init-cart-1',
      product: PRODUCTS[0],
      size: 9.5,
      colorway: PRODUCTS[0].colorways[0].name,
      quantity: 1,
    },
  ]);

  // Comparison State
  const [comparedProductIds, setComparedProductIds] = useState<string[]>([PRODUCTS[0].id, PRODUCTS[1].id]);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cart operations
  const handleAddToCart = (product: Product, size: number, colorway: string) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size && item.colorway === colorway
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += 1;
        return next;
      }
      return [
        ...prev,
        {
          id: `${product.id}-${size}-${colorway}-${Date.now()}`,
          product,
          size,
          colorway,
          quantity: 1,
        },
      ];
    });
    showToast(`DEPLOYED TO BAG: ${product.name} (US ${size})`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Compare operations
  const handleToggleCompare = (product: Product) => {
    setComparedProductIds((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      }
      if (prev.length >= 4) {
        showToast('MAXIMUM 4 ASSETS COMPARED SIMULTANEOUSLY');
        return prev;
      }
      const next = [...prev, product.id];
      showToast(`ADDED TO COMPARE MATRIX: ${product.name}`);
      return next;
    });
  };

  const handleRemoveCompare = (id: string) => {
    setComparedProductIds((prev) => prev.filter((pId) => pId !== id));
  };

  const handleClearCompare = () => {
    setComparedProductIds([]);
  };

  // Section scrolling helper
  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter & Sort Logic
  const categories = ['All Footwear', 'Road Marathon', 'Track & Spike', 'Technical Trail', 'Recovery'];

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (selectedCategory !== 'All Footwear') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.carbonPlate.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.foamCompound.toLowerCase().includes(q)
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'velocity') return b.velocityIndex - a.velocityIndex;
      if (sortBy === 'weight') return a.weightGrams - b.weightGrams;
      if (sortBy === 'energy') return b.energyReturnPct - a.energyReturnPct;
      if (sortBy === 'price') return a.price - b.price;
      return 0;
    });

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const comparedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => comparedProductIds.includes(p.id));
  }, [comparedProductIds]);

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#E2E2E8] flex flex-col font-sans selection:bg-[#FF5500] selection:text-[#0F1115]">
      
      {/* 3-Zone Precision Navigation Header */}
      <Navbar
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        compareCount={comparedProductIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenConfigurator={() => setIsConfiguratorModalOpen(true)}
        onNavigateSection={handleNavigateSection}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isSearchOpen={isSearchOpen}
        onToggleSearch={() => setIsSearchOpen(!isSearchOpen)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1">
        
        {/* Parallax Hero View */}
        <HeroSection
          onExploreClick={() => handleNavigateSection('product-matrix')}
          onOpenConfigurator={() => setIsConfiguratorModalOpen(true)}
          onSelectProduct={(p) => setActiveDetailProduct(p)}
        />

        {/* Velocity Telemetry Parallax Marquee */}
        <ParallaxTelemetryStrip />

        {/* Product Catalog Matrix Section */}
        <section id="product-matrix" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header & Category Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#2A303C]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FF5500] tracking-widest uppercase mb-1">
                <span>ATHLETIC FOOTWEAR MATRIX</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#8E95A5]">{filteredProducts.length} MODELS READY</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-white font-condensed">
                PERFORMANCE FOOTWEAR CATALOG
              </h2>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono text-[#8E95A5] flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#D4FF00]" />
                <span>SORT METRIC:</span>
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#161920] border border-[#2A303C] focus:border-[#FF5500] text-white px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-[4px] outline-none cursor-pointer"
              >
                <option value="velocity">VELOCITY INDEX (HIGHEST)</option>
                <option value="weight">MASS (LIGHTEST FIRST)</option>
                <option value="energy">ENERGY REBOUND %</option>
                <option value="price">PRICE (LOWEST)</option>
              </select>
            </div>
          </div>

          {/* Segmented Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-[4px] border text-xs font-mono font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-[#0F1115] border-white shadow-[0_0_12px_rgba(255,255,255,0.3)]'
                    : 'bg-[#161920] border-[#2A303C] text-[#8E95A5] hover:text-white hover:border-[#8E95A5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Empty Search Feedback */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-24 bg-[#161920] border border-[#2A303C] rounded-[4px] p-8 space-y-3">
              <div className="text-3xl text-[#8E95A5]">🔍</div>
              <div className="text-lg font-bold text-white uppercase font-condensed">
                NO FOOTWEAR MATCHING SEARCH PARAMETERS
              </div>
              <p className="text-xs text-[#8E95A5]">
                No rigs found matching "{searchQuery}". Try searching by carbon plate, marathon, stack height, or terrain.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Footwear');
                }}
                className="px-4 py-2 bg-[#FF5500] text-[#0F1115] text-xs font-mono font-bold uppercase rounded-[4px] cursor-pointer"
              >
                RESET FILTERS
              </button>
            </div>
          ) : (
            /* 12-Column Responsive Product Grid (3 cols desktop, 2 cols tablet, 1 col mobile) */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isCompared={comparedProductIds.includes(product.id)}
                  onToggleCompare={handleToggleCompare}
                  onSelectProduct={(p) => setActiveDetailProduct(p)}
                  onQuickAdd={(p, sz) => handleAddToCart(p, sz, p.colorways[0].name)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Biomechanics Lab Telemetry Section */}
        <BiomechanicsLabSection onOpenConfigurator={() => setIsConfiguratorModalOpen(true)} />

        {/* Embedded Custom Rig Configurator Section */}
        <section id="custom-rig-lab" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <KineticLabConfigurator
            onAddToCart={(customProduct, size, colorway) => {
              handleAddToCart(customProduct, size, colorway);
              setIsCartOpen(true);
            }}
          />
        </section>

      </main>

      {/* Global Precision Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={activeDetailProduct}
        onClose={() => setActiveDetailProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleCompare={handleToggleCompare}
        isCompared={activeDetailProduct ? comparedProductIds.includes(activeDetailProduct.id) : false}
      />

      {/* Head-to-Head Comparison Drawer */}
      <ComparisonDrawer
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        comparedProducts={comparedProducts}
        onRemoveProduct={handleRemoveCompare}
        onClearAll={handleClearCompare}
        onSelectProduct={(p) => {
          setIsCompareOpen(false);
          setActiveDetailProduct(p);
        }}
        onQuickAdd={(p, sz) => {
          handleAddToCart(p, sz, p.colorways[0].name);
          showToast(`ADDED ${p.name} TO BAG`);
        }}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={() => {
          setCartItems([]);
          showToast('ORDER RECEIVED // DISPATCH PROTOCOL INITIALIZED');
        }}
      />

      {/* Floating Configurator Modal (Triggered from Nav) */}
      {isConfiguratorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsConfiguratorModalOpen(false)}
            className="fixed inset-0 bg-[#0F1115]/90 backdrop-blur-md"
          />
          <div className="relative w-full max-w-5xl z-10 my-auto">
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={() => setIsConfiguratorModalOpen(false)}
                className="p-2 bg-[#161920] border border-[#2A303C] hover:border-[#FF5500] text-white rounded-[4px] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <KineticLabConfigurator
              onAddToCart={(customProduct, size, colorway) => {
                handleAddToCart(customProduct, size, colorway);
                setIsConfiguratorModalOpen(false);
                setIsCartOpen(true);
              }}
              onClose={() => setIsConfiguratorModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-[#161920] border border-[#FF5500] text-white px-4 py-3 rounded-[4px] shadow-[0_10px_25px_rgba(0,0,0,0.8)] flex items-center gap-2.5 text-xs font-mono tracking-wider"
          >
            <span className="w-2 h-2 bg-[#D4FF00] rounded-full animate-ping" />
            <span className="font-bold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Bottom Compare Bar if models are selected but modal isn't open */}
      {comparedProductIds.length > 0 && !isCompareOpen && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 bg-[#161920]/95 border border-[#2A303C] hover:border-[#D4FF00] rounded-[4px] px-4 py-2.5 backdrop-blur-md shadow-2xl flex items-center gap-4 text-xs font-mono"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#D4FF00] rounded-full" />
            <span className="text-white font-bold">{comparedProductIds.length} ASSETS</span>
            <span className="text-[#8E95A5] hidden sm:inline">IN COMPARE BUFFER</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCompareOpen(true)}
              className="px-3 py-1 bg-[#D4FF00] text-[#0F1115] font-bold rounded-[3px] hover:bg-[#bce600] transition-colors cursor-pointer"
            >
              LAUNCH COMPARISON MATRIX →
            </button>
            <button
              onClick={handleClearCompare}
              className="text-[#8E95A5] hover:text-white p-1 cursor-pointer"
              title="Clear all"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}

    </div>
  );
}
