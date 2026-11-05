import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Product } from '../data/products';

export interface CartItem {
  id: string; // unique item key
  product: Product;
  size: number;
  colorway: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 200;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0F1115]/85 backdrop-blur-md"
        />

        {/* Level 2 Flyout Drawer with ambient rim glow */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="w-screen max-w-md bg-[#161920] border-l border-[#2A303C] modal-rim flex flex-col justify-between"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#2A303C] bg-[#111317] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-4 bg-[#FF5500] rounded-[1px]" />
                <h2 className="text-xl font-bold uppercase tracking-tight text-white font-condensed">
                  DEPLOYMENT BAG
                </h2>
                <span className="text-xs font-mono text-[#D4FF00] bg-[#161920] px-2 py-0.5 rounded-[2px] border border-[#2A303C]">
                  {items.reduce((sum, i) => sum + i.quantity, 0)} ASSETS
                </span>
              </div>

              <button
                onClick={onClose}
                aria-label="Close cart"
                className="p-1.5 text-[#8E95A5] hover:text-white hover:bg-[#222631] rounded-[4px] border border-transparent hover:border-[#2A303C] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Carbon Freight Meter */}
            <div className="px-6 py-3 bg-[#0c0e12] border-b border-[#2A303C] text-xs font-mono">
              <div className="flex items-center justify-between text-[#8E95A5] mb-1.5">
                <span>CARBON EXPRESS DISPATCH</span>
                <span className={subtotal >= freeShippingThreshold ? 'text-[#D4FF00] font-bold' : 'text-white'}>
                  {subtotal >= freeShippingThreshold ? 'UNLOCKED (FREE 2-DAY)' : `$${freeShippingThreshold - subtotal} TO FREE DISPATCH`}
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#222631] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#FF5500] to-[#D4FF00] transition-all duration-300"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#2A303C]">
              {items.length === 0 ? (
                <div className="text-center py-20 space-y-3">
                  <div className="text-4xl text-[#8E95A5]">👟</div>
                  <div className="text-lg font-bold text-white uppercase font-condensed">
                    YOUR RIG BAG IS CURRENTLY EMPTY
                  </div>
                  <p className="text-xs text-[#8E95A5] max-w-xs mx-auto">
                    Select carbon-plated racing footwear or configure a bespoke rig from our biomechanics laboratory.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-4 px-5 py-2.5 bg-[#FF5500] text-[#0F1115] font-bold text-xs uppercase tracking-wider rounded-[4px] cursor-pointer font-mono"
                  >
                    EXPLORE FOOTWEAR MATRIX
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4 items-start">
                    {/* Thumbnail */}
                    <div className="w-20 h-20 bg-[#111317] border border-[#2A303C] rounded-[4px] p-2 flex items-center justify-center shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain filter drop-shadow-sm"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-bold uppercase text-white font-condensed truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#8E95A5] hover:text-[#FF5500] p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] font-mono text-[#8E95A5] mt-1 space-x-2">
                        <span>SIZE: <strong className="text-white">US {item.size}</strong></span>
                        <span>·</span>
                        <span className="truncate">{item.colorway}</span>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#2A303C] bg-[#111317] rounded-[3px]">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:bg-[#222631] text-[#8E95A5] hover:text-white transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-mono font-bold text-white tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:bg-[#222631] text-[#8E95A5] hover:text-white transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-sm font-mono font-bold text-white tabular-nums">
                          ${item.product.price * item.quantity} <span className="text-[10px] text-[#8E95A5]">USD</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Checkout Summary */}
            {items.length > 0 && (
              <div className="p-6 bg-[#111317] border-t border-[#2A303C] space-y-4">
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-[#8E95A5]">
                    <span>SUBTOTAL:</span>
                    <span className="text-white font-bold tabular-nums">${subtotal} USD</span>
                  </div>
                  <div className="flex justify-between text-[#8E95A5]">
                    <span>ESTIMATED CARBON FREIGHT:</span>
                    <span className={subtotal >= freeShippingThreshold ? 'text-[#D4FF00]' : 'text-white'}>
                      {subtotal >= freeShippingThreshold ? 'FREE ($0.00)' : '$15.00 USD'}
                    </span>
                  </div>
                  <div className="border-t border-[#2A303C] pt-2 flex justify-between text-base font-bold font-mono text-white">
                    <span>ESTIMATED TOTAL:</span>
                    <span className="text-xl text-[#FF5500] tabular-nums">
                      ${subtotal >= freeShippingThreshold ? subtotal : subtotal + 15} USD
                    </span>
                  </div>
                </div>

                <button
                  onClick={onProceedToCheckout}
                  className="w-full py-4 bg-[#FF5500] hover:bg-[#ff6611] text-[#0F1115] font-extrabold text-sm tracking-widest uppercase rounded-[4px] transition-all glow-active flex items-center justify-center gap-2 cursor-pointer font-mono"
                >
                  <span>PROCEED TO ATHLETE CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-[#8E95A5]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4FF00]" />
                  <span>ENCRYPTED HIGH-VELOCITY DISPATCH GUARANTEE</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
