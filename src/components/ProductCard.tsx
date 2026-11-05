import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { Check, Plus, Eye, Scale, Zap } from 'lucide-react';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  isCompared: boolean;
  onToggleCompare: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, size: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isCompared,
  onToggleCompare,
  onSelectProduct,
  onQuickAdd,
}) => {
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[3] || product.sizes[0]);
  const [isQuickAddExpanded, setIsQuickAddExpanded] = useState(false);
  const [selectedColorwayIdx, setSelectedColorwayIdx] = useState(0);

  // Parallax tilt on hover
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateXSpring = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    damping: 18,
    stiffness: 140,
  });
  const rotateYSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    damping: 18,
    stiffness: 140,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsQuickAddExpanded(false);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: 'preserve-3d',
      }}
      className="group relative flex flex-col bg-[#161920] border border-[#2A303C] hover:border-[#FF5500]/70 rounded-[4px] transition-all duration-300 hover:shadow-[0_16px_32px_-8px_rgba(0,0,0,0.8)] overflow-hidden"
    >
      {/* Top Floating Badge & Compare Checkbox Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between gap-2 pointer-events-auto">
        {/* Technical Badge */}
        {product.badge ? (
          <span
            className={`text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-[2px] ${
              product.badge.type === 'alert'
                ? 'bg-[#FF5500] text-[#0F1115]'
                : 'bg-[#0F1115]/95 text-[#D4FF00] border border-[#D4FF00]'
            }`}
          >
            {product.badge.label}
          </span>
        ) : (
          <span className="text-[10px] font-mono text-[#8E95A5]">{product.code}</span>
        )}

        {/* Compare Checkbox Tile */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleCompare(product);
          }}
          title={isCompared ? 'Remove from compare' : 'Add to compare'}
          className={`flex items-center gap-1.5 px-2 py-1 rounded-[4px] border text-[10px] font-mono tracking-wider transition-all cursor-pointer ${
            isCompared
              ? 'bg-[#FF5500] border-[#FF5500] text-[#0F1115] font-bold'
              : 'bg-[#222631]/80 hover:bg-[#222631] border-[#2A303C] text-[#8E95A5] hover:text-white'
          }`}
        >
          <span
            className={`w-3.5 h-3.5 rounded-[2px] flex items-center justify-center border ${
              isCompared ? 'bg-white border-white text-[#0F1115]' : 'border-[#8E95A5]'
            }`}
          >
            {isCompared && <Check className="w-2.5 h-2.5 stroke-[3]" />}
          </span>
          <span className="hidden sm:inline">VS</span>
        </button>
      </div>

      {/* Product Image Stage */}
      <div
        onClick={() => onSelectProduct(product)}
        className="relative w-full aspect-[4/3] bg-[#111317] p-5 flex items-center justify-center cursor-pointer overflow-hidden border-b border-[#2A303C]"
      >
        {/* Subtle radial backdrop spotlight */}
        <div className="absolute inset-0 bg-radial from-[#222631]/40 via-transparent to-transparent pointer-events-none" />

        <motion.img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)] group-hover:scale-108 transition-transform duration-500 ease-out"
        />

        {/* Colorway preview dots */}
        <div className="absolute bottom-2 left-3 z-10 flex items-center gap-1.5">
          {product.colorways.map((cw, i) => (
            <button
              key={cw.name}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedColorwayIdx(i);
              }}
              title={cw.name}
              className={`w-3 h-3 rounded-full border transition-transform ${
                selectedColorwayIdx === i ? 'scale-125 border-white' : 'border-black/50'
              }`}
              style={{ backgroundColor: cw.primaryHex }}
            />
          ))}
        </div>

        {/* Quick View trigger */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectProduct(product);
          }}
          className="absolute bottom-2 right-3 z-10 p-1.5 bg-[#161920]/90 border border-[#2A303C] hover:border-[#FF5500] text-[#8E95A5] hover:text-white rounded-[2px] backdrop-blur-sm transition-colors text-[10px] font-mono flex items-center gap-1 cursor-pointer"
        >
          <Eye className="w-3 h-3 text-[#D4FF00]" />
          <span className="hidden sm:inline">SPEC SHEET</span>
        </button>
      </div>

      {/* Metadata & Pricing Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-[#8E95A5] uppercase tracking-wider mb-1">
            <span>{product.category}</span>
            <span className="text-[#D4FF00] font-bold">{product.energyReturnPct}% REBOUND</span>
          </div>

          <h3
            onClick={() => onSelectProduct(product)}
            className="text-xl font-bold uppercase tracking-tight text-white hover:text-[#FF5500] transition-colors cursor-pointer font-condensed line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#8E95A5] mt-1 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Key Engineering Specs Micro Row */}
        <div className="grid grid-cols-2 gap-2 py-2 border-y border-[#2A303C]/70 text-[11px] font-mono">
          <div className="flex items-center gap-1 text-[#8E95A5]">
            <Scale className="w-3 h-3 text-[#FF5500] shrink-0" />
            <span>WEIGHT:</span>
            <span className="text-white font-bold">{product.weightGrams}g</span>
          </div>
          <div className="flex items-center gap-1 text-[#8E95A5]">
            <Zap className="w-3 h-3 text-[#D4FF00] shrink-0" />
            <span>DROP:</span>
            <span className="text-white font-bold">{product.dropMm}mm</span>
          </div>
        </div>

        {/* Price & Quick Add Slide-up Floor */}
        <div className="pt-1 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono text-[#8E95A5] block">VELOCITY ASSET</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-white font-mono tabular-nums leading-none">
                ${product.price}
              </span>
              <span className="text-[11px] font-mono text-[#8E95A5]">USD</span>
            </div>
          </div>

          <button
            onClick={() => setIsQuickAddExpanded(!isQuickAddExpanded)}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#222631] hover:bg-[#FF5500] text-white hover:text-[#0F1115] border border-[#2A303C] hover:border-[#FF5500] text-xs font-bold uppercase tracking-wider rounded-[4px] transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>QUICK ADD</span>
          </button>
        </div>
      </div>

      {/* Quick Add Slide-Up Drawer from Card Floor */}
      {isQuickAddExpanded && (
        <div className="absolute inset-x-0 bottom-0 bg-[#161920] border-t border-[#FF5500] p-4 z-30 animate-in slide-in-from-bottom duration-200 shadow-2xl">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-white font-bold">SELECT US MENS SIZE:</span>
            <button
              onClick={() => setIsQuickAddExpanded(false)}
              className="text-[#8E95A5] hover:text-white cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-4 gap-1.5 mb-3">
            {product.sizes.slice(0, 8).map((sz) => (
              <button
                key={sz}
                onClick={() => setSelectedSize(sz)}
                className={`py-1 rounded-[3px] text-xs font-mono font-bold border transition-colors cursor-pointer ${
                  selectedSize === sz
                    ? 'bg-white text-[#0F1115] border-white'
                    : 'bg-[#222631] text-[#E2E2E8] border-[#2A303C] hover:border-[#D4FF00]'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              onQuickAdd(product, selectedSize);
              setIsQuickAddExpanded(false);
            }}
            className="w-full py-2.5 bg-[#FF5500] hover:bg-[#ff6611] text-[#0F1115] text-xs font-bold font-mono tracking-widest uppercase rounded-[4px] transition-all glow-active cursor-pointer"
          >
            COMMIT TO BAG (${product.price})
          </button>
        </div>
      )}
    </motion.div>
  );
};
