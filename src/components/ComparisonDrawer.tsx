import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ArrowRight, Trash2, ShoppingBag } from 'lucide-react';
import { Product } from '../data/products';

interface ComparisonDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  comparedProducts: Product[];
  onRemoveProduct: (id: string) => void;
  onClearAll: () => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, size: number) => void;
}

export const ComparisonDrawer: React.FC<ComparisonDrawerProps> = ({
  isOpen,
  onClose,
  comparedProducts,
  onRemoveProduct,
  onClearAll,
  onSelectProduct,
  onQuickAdd,
}) => {
  if (!isOpen) return null;

  // Find superior metrics for dynamic volt highlights
  const minWeight = comparedProducts.length > 0 ? Math.min(...comparedProducts.map((p) => p.weightGrams)) : 0;
  const maxEnergy = comparedProducts.length > 0 ? Math.max(...comparedProducts.map((p) => p.energyReturnPct)) : 0;
  const maxVelocity = comparedProducts.length > 0 ? Math.max(...comparedProducts.map((p) => p.velocityIndex)) : 0;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0F1115]/85 backdrop-blur-md"
        />

        {/* Modal Rim Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="relative w-full max-w-6xl bg-[#161920] border border-[#2A303C] rounded-[4px] modal-rim overflow-hidden my-auto z-10 max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A303C] bg-[#111317]">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-4 bg-[#D4FF00] rounded-[1px]" />
              <h2 className="text-xl font-bold uppercase tracking-tight text-white font-condensed">
                HEAD-TO-HEAD BIOMECHANICAL SPEC MATRIX
              </h2>
              <span className="text-xs font-mono text-[#8E95A5] hidden sm:inline">
                ({comparedProducts.length} RIGS SELECTED)
              </span>
            </div>

            <div className="flex items-center gap-3">
              {comparedProducts.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-xs font-mono text-[#8E95A5] hover:text-[#FF5500] flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>CLEAR</span>
                </button>
              )}
              <button
                onClick={onClose}
                aria-label="Close comparison view"
                className="p-1.5 text-[#8E95A5] hover:text-white hover:bg-[#222631] rounded-[4px] border border-transparent hover:border-[#2A303C] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto overflow-y-auto p-4 sm:p-6 flex-1">
            {comparedProducts.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="text-4xl text-[#8E95A5]">⚖️</div>
                <div className="text-lg font-bold text-white uppercase font-condensed">
                  NO MODELS SELECTED FOR COMPARISON
                </div>
                <p className="text-xs text-[#8E95A5] max-w-md mx-auto">
                  Click the "VS" checkbox on any footwear card in the matrix to compare telemetry, energy return %, and plate specifications.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-5 py-2.5 bg-[#FF5500] text-[#0F1115] font-bold text-xs uppercase tracking-wider rounded-[4px] cursor-pointer font-mono"
                >
                  RETURN TO FOOTWEAR MATRIX
                </button>
              </div>
            ) : (
              <div className="min-w-[650px] space-y-6">
                
                {/* Product Header Row */}
                <div className="grid grid-cols-12 gap-4 pb-4 border-b border-[#2A303C]">
                  <div className="col-span-3 text-xs font-mono font-bold text-[#8E95A5] uppercase tracking-wider flex items-end pb-2">
                    ENGINEERING ATTRIBUTE
                  </div>
                  {comparedProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className={`${
                        comparedProducts.length === 1
                          ? 'col-span-9'
                          : comparedProducts.length === 2
                          ? 'col-span-4'
                          : 'col-span-3'
                      } flex flex-col justify-between bg-[#111317] border border-[#2A303C] p-3 rounded-[4px] relative group`}
                    >
                      <button
                        onClick={() => onRemoveProduct(prod.id)}
                        className="absolute top-2 right-2 text-[#8E95A5] hover:text-[#FF5500] cursor-pointer"
                        title="Remove product"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <div
                        onClick={() => onSelectProduct(prod)}
                        className="cursor-pointer"
                      >
                        <div className="aspect-[4/3] w-full flex items-center justify-center p-2">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            referrerPolicy="no-referrer"
                            className="max-h-24 object-contain filter drop-shadow-md group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="text-xs font-mono text-[#D4FF00]">{prod.code}</div>
                        <h4 className="text-base font-bold uppercase text-white font-condensed line-clamp-1 mt-0.5">
                          {prod.name}
                        </h4>
                        <div className="text-sm font-mono font-bold text-white mt-1">
                          ${prod.price} <span className="text-[10px] text-[#8E95A5]">USD</span>
                        </div>
                      </div>

                      <button
                        onClick={() => onQuickAdd(prod, prod.sizes[3] || prod.sizes[0])}
                        className="mt-3 w-full py-1.5 bg-[#FF5500] hover:bg-[#ff6611] text-[#0F1115] text-[10px] font-mono font-bold uppercase tracking-wider rounded-[3px] transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>DEPLOY TO BAG</span>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Zebra-Striped Metric Rows */}
                <div className="space-y-1">
                  
                  {/* Row 1: Weight */}
                  <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-[#161920] border border-[#2A303C] rounded-[3px] text-xs font-mono items-center">
                    <div className="col-span-3 text-[#8E95A5] font-bold">TOTAL MASS (US 9.5)</div>
                    {comparedProducts.map((p) => {
                      const isBest = p.weightGrams === minWeight;
                      return (
                        <div
                          key={p.id}
                          className={`${
                            comparedProducts.length === 1 ? 'col-span-9' : comparedProducts.length === 2 ? 'col-span-4' : 'col-span-3'
                          } ${isBest ? 'text-[#D4FF00] font-bold' : 'text-white'}`}
                        >
                          {p.weightGrams}g {isBest && <span className="text-[10px] bg-[#D4FF00]/10 px-1 py-0.5 rounded border border-[#D4FF00] ml-1">FEATHERWEIGHT</span>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Row 2: Dynamic Energy Return */}
                  <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-[#0F1115] border border-[#2A303C] rounded-[3px] text-xs font-mono items-center">
                    <div className="col-span-3 text-[#8E95A5] font-bold">ENERGY REBOUND %</div>
                    {comparedProducts.map((p) => {
                      const isBest = p.energyReturnPct === maxEnergy;
                      return (
                        <div
                          key={p.id}
                          className={`${
                            comparedProducts.length === 1 ? 'col-span-9' : comparedProducts.length === 2 ? 'col-span-4' : 'col-span-3'
                          } ${isBest ? 'text-[#D4FF00] font-bold' : 'text-white'}`}
                        >
                          {p.energyReturnPct}% {isBest && <span className="text-[10px] bg-[#D4FF00]/10 px-1 py-0.5 rounded border border-[#D4FF00] ml-1">HIGHEST RETURN</span>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Row 3: Velocity Index */}
                  <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-[#161920] border border-[#2A303C] rounded-[3px] text-xs font-mono items-center">
                    <div className="col-span-3 text-[#8E95A5] font-bold">VELOCITY INDEX</div>
                    {comparedProducts.map((p) => {
                      const isBest = p.velocityIndex === maxVelocity;
                      return (
                        <div
                          key={p.id}
                          className={`${
                            comparedProducts.length === 1 ? 'col-span-9' : comparedProducts.length === 2 ? 'col-span-4' : 'col-span-3'
                          } ${isBest ? 'text-[#D4FF00] font-bold' : 'text-white'}`}
                        >
                          {p.velocityIndex} / 100
                        </div>
                      );
                    })}
                  </div>

                  {/* Row 4: Carbon Plate Spine */}
                  <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-[#0F1115] border border-[#2A303C] rounded-[3px] text-xs font-mono items-center">
                    <div className="col-span-3 text-[#8E95A5] font-bold">CARBON CHASSIS</div>
                    {comparedProducts.map((p) => (
                      <div
                        key={p.id}
                        className={`${
                          comparedProducts.length === 1 ? 'col-span-9' : comparedProducts.length === 2 ? 'col-span-4' : 'col-span-3'
                        } text-white font-medium`}
                      >
                        {p.carbonPlate}
                      </div>
                    ))}
                  </div>

                  {/* Row 5: Stack Profile */}
                  <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-[#161920] border border-[#2A303C] rounded-[3px] text-xs font-mono items-center">
                    <div className="col-span-3 text-[#8E95A5] font-bold">STACK GEOMETRY</div>
                    {comparedProducts.map((p) => (
                      <div
                        key={p.id}
                        className={`${
                          comparedProducts.length === 1 ? 'col-span-9' : comparedProducts.length === 2 ? 'col-span-4' : 'col-span-3'
                        } text-white`}
                      >
                        {p.stackHeight} ({p.dropMm}mm drop)
                      </div>
                    ))}
                  </div>

                  {/* Row 6: Supercritical Foam */}
                  <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-[#0F1115] border border-[#2A303C] rounded-[3px] text-xs font-mono items-center">
                    <div className="col-span-3 text-[#8E95A5] font-bold">FOAM COMPOUND</div>
                    {comparedProducts.map((p) => (
                      <div
                        key={p.id}
                        className={`${
                          comparedProducts.length === 1 ? 'col-span-9' : comparedProducts.length === 2 ? 'col-span-4' : 'col-span-3'
                        } text-white`}
                      >
                        {p.foamCompound}
                      </div>
                    ))}
                  </div>

                  {/* Row 7: Outsole Traction */}
                  <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-[#161920] border border-[#2A303C] rounded-[3px] text-xs font-mono items-center">
                    <div className="col-span-3 text-[#8E95A5] font-bold">OUTSOLE SYSTEM</div>
                    {comparedProducts.map((p) => (
                      <div
                        key={p.id}
                        className={`${
                          comparedProducts.length === 1 ? 'col-span-9' : comparedProducts.length === 2 ? 'col-span-4' : 'col-span-3'
                        } text-white`}
                      >
                        {p.outsole}
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
