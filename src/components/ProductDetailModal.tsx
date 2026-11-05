import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ShieldCheck, Zap, Scale, Layers, ChevronRight, ShoppingBag } from 'lucide-react';
import { Product } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: number, colorway: string) => void;
  onToggleCompare: (product: Product) => void;
  isCompared: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleCompare,
  isCompared,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[3] || product.sizes[0]);
  const [selectedColorwayIdx, setSelectedColorwayIdx] = useState(0);
  const [activeLayerIndex, setActiveLayerIndex] = useState<number | null>(0);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  const currentColorway = product.colorways[selectedColorwayIdx] || product.colorways[0];

  const handleAdd = () => {
    onAddToCart(product, selectedSize, currentColorway.name);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 1800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop blur with dark obsidian tint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0F1115]/85 backdrop-blur-md"
        />

        {/* Modal Window: Level 2 Modal with precision rim glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-[#161920] border border-[#2A303C] rounded-[4px] modal-rim overflow-hidden my-auto z-10 max-h-[92vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A303C] bg-[#111317]">
            <div className="flex items-center gap-3">
              <span className="w-2 h-4 bg-[#FF5500] rounded-[1px]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#8E95A5]">
                TECHNICAL SPEC SHEET // {product.code}
              </span>
              {product.badge && (
                <span className="text-[10px] font-mono font-bold text-[#D4FF00] border border-[#D4FF00] px-2 py-0.5 rounded-[2px] hidden sm:inline-block">
                  {product.badge.label}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onToggleCompare(product)}
                className={`text-xs font-mono px-3 py-1.5 rounded-[4px] border transition-colors cursor-pointer ${
                  isCompared
                    ? 'bg-[#FF5500] border-[#FF5500] text-[#0F1115] font-bold'
                    : 'bg-[#222631] border-[#2A303C] text-[#8E95A5] hover:text-white'
                }`}
              >
                {isCompared ? '✓ IN COMPARISON' : '+ COMPARE SPEC'}
              </button>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-1.5 text-[#8E95A5] hover:text-white hover:bg-[#222631] rounded-[4px] border border-transparent hover:border-[#2A303C] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8 flex-1">
            
            {/* Top Product Split: Visual Staging (Left) & Purchasing Module (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Visual Staging & Exploded Layers */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative aspect-[4/3] bg-[#0c0e12] border border-[#2A303C] rounded-[4px] p-6 flex items-center justify-center overflow-hidden">
                  {/* Subtle Grid backdrop */}
                  <div
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage: `linear-gradient(#2A303C 1px, transparent 1px), linear-gradient(90deg, #2A303C 1px, transparent 1px)`,
                      backgroundSize: '2rem 2rem',
                    }}
                  />
                  
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.9)]"
                  />

                  {/* Dynamic Colorway Tag */}
                  <div className="absolute bottom-3 left-4 text-xs font-mono text-[#8E95A5] bg-[#111317]/90 px-2.5 py-1 rounded-[2px] border border-[#2A303C]">
                    COLORWAY: <span className="text-white font-bold">{currentColorway.name}</span>
                  </div>

                  {/* Velocity Gauge */}
                  <div className="absolute top-3 right-4 text-right bg-[#111317]/90 px-3 py-1.5 rounded-[2px] border border-[#2A303C]">
                    <div className="text-[10px] font-mono text-[#8E95A5]">VELOCITY INDEX</div>
                    <div className="text-lg font-mono font-bold text-[#D4FF00] tabular-nums">
                      {product.velocityIndex} <span className="text-xs text-white">/ 100</span>
                    </div>
                  </div>
                </div>

                {/* Exploded Engineering Anatomy Viewer */}
                <div className="bg-[#111317] border border-[#2A303C] rounded-[4px] p-4">
                  <div className="flex items-center gap-2 mb-3 text-xs font-mono text-[#D4FF00]">
                    <Layers className="w-4 h-4" />
                    <span className="font-bold uppercase tracking-wider">
                      EXPLODED ANATOMY ARCHITECTURE
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {product.engineeringLayers.map((layer, idx) => (
                      <div
                        key={layer.name}
                        onClick={() => setActiveLayerIndex(activeLayerIndex === idx ? null : idx)}
                        className={`p-2.5 rounded-[3px] border transition-all cursor-pointer ${
                          activeLayerIndex === idx
                            ? 'bg-[#222631] border-[#FF5500] text-white'
                            : 'bg-[#161920] border-[#2A303C] text-[#8E95A5] hover:text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="font-bold flex items-center gap-2">
                            <span className="text-[#FF5500]">0{idx + 1}.</span> {layer.name}
                          </span>
                          <span className="text-[10px] text-[#D4FF00] font-semibold">{layer.material}</span>
                        </div>
                        {activeLayerIndex === idx && (
                          <div className="text-xs text-[#E2E2E8] mt-2 pt-2 border-t border-[#2A303C] font-normal leading-relaxed">
                            {layer.function}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Contiguous Purchase Module */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="text-xs font-mono text-[#8E95A5] tracking-widest uppercase mb-1">
                    {product.category} // SPEED LAB CERTIFIED
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white font-condensed">
                    {product.name}
                  </h2>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white font-mono tabular-nums">
                      ${product.price}
                    </span>
                    <span className="text-xs font-mono text-[#8E95A5]">USD / INCL. CARBON TAX</span>
                  </div>
                  <p className="text-xs text-[#8E95A5] mt-3 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Colorway Selection */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#8E95A5] mb-2">
                    AVAILABLE FINISHES:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colorways.map((cw, idx) => (
                      <button
                        key={cw.name}
                        onClick={() => setSelectedColorwayIdx(idx)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-[3px] border text-xs font-mono transition-all cursor-pointer ${
                          selectedColorwayIdx === idx
                            ? 'bg-[#222631] border-[#FF5500] text-white'
                            : 'bg-[#111317] border-[#2A303C] text-[#8E95A5] hover:text-white'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/50"
                          style={{ backgroundColor: cw.primaryHex }}
                        />
                        <span>{cw.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection Structural Chips */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-[#8E95A5] uppercase tracking-wider">US MENS FIT:</span>
                    <span className="text-[#D4FF00]">RACE TIGHT // TRUE TO SIZE</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-2 rounded-[3px] text-xs font-mono font-bold border transition-all cursor-pointer ${
                          selectedSize === sz
                            ? 'bg-white text-[#0F1115] border-white shadow-[0_0_12px_rgba(255,255,255,0.4)]'
                            : 'bg-[#111317] text-[#E2E2E8] border-[#2A303C] hover:border-[#D4FF00]'
                        }`}
                      >
                        US {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Primary Add To Bag CTA */}
                <div className="pt-2 space-y-2">
                  <button
                    onClick={handleAdd}
                    className="w-full py-4 bg-[#FF5500] hover:bg-[#ff6611] text-[#0F1115] font-extrabold text-sm tracking-widest uppercase rounded-[4px] transition-all glow-active flex items-center justify-center gap-2 cursor-pointer font-mono"
                  >
                    {isAddedFeedback ? (
                      <>
                        <Check className="w-5 h-5 stroke-[3]" />
                        <span>DEPLOYED TO BAG</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>COMMIT TO BAG (${product.price} USD)</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-[11px] font-mono text-[#8E95A5] pt-1">
                    <span>⚡ 2-DAY CARBON EXPRESS SHIPPING</span>
                    <span>30-DAY PODIUM PERFORMANCE TRIAL</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Technical Zebra-Striped Spec Sheet */}
            <div className="pt-4 border-t border-[#2A303C]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold uppercase tracking-tight text-white font-condensed">
                  ENGINEERING METRIC MATRIX
                </h3>
                <span className="text-xs font-mono text-[#D4FF00]">
                  CALIBRATED ACCORDING TO ASTM F1976-13
                </span>
              </div>

              <div className="space-y-6">
                {product.specTable.map((section) => (
                  <div key={section.category} className="border border-[#2A303C] rounded-[4px] overflow-hidden">
                    <div className="bg-[#222631] px-4 py-2 text-xs font-mono font-bold text-white tracking-widest uppercase border-b border-[#2A303C]">
                      {section.category}
                    </div>
                    <div className="divide-y divide-[#2A303C]">
                      {section.specs.map((item, idx) => (
                        <div
                          key={item.label}
                          className={`flex items-center justify-between px-4 py-2.5 text-xs font-mono ${
                            idx % 2 === 0 ? 'bg-[#161920]' : 'bg-[#0F1115]'
                          }`}
                        >
                          <span className="text-[#8E95A5]">{item.label}</span>
                          <span
                            className={`font-semibold tabular-nums ${
                              item.isHighlight ? 'text-[#D4FF00] font-bold' : 'text-white'
                            }`}
                          >
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
