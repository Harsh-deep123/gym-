import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, ChevronRight } from 'lucide-react';
import { CartItem } from './CartDrawer';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'confirmed'>('details');
  const [formData, setFormData] = useState({
    athleteName: 'Marcus Vance',
    email: 'marcus.vance@marathonlabs.com',
    address: '840 Commonwealth Avenue, Suite 4B',
    city: 'Boston',
    state: 'MA',
    zipCode: '02215',
    phone: '+1 (617) 555-0192',
    shippingSpeed: 'express', // express (free) vs overnight ($25)
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 9284',
    cardExp: '08/29',
    cardCvc: '419',
  });

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCost = formData.shippingSpeed === 'overnight' ? 25 : subtotal >= 200 ? 0 : 15;
  const total = subtotal + shippingCost;
  const generatedOrderId = `KP-ORD-${Math.floor(100000 + Math.random() * 900000)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirmed');
    onOrderSuccess();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0F1115]/90 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          className="relative w-full max-w-3xl bg-[#161920] border border-[#2A303C] rounded-[4px] modal-rim overflow-hidden my-auto z-10 max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A303C] bg-[#111317]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-4 bg-[#FF5500] rounded-[1px]" />
              <h2 className="text-xl font-bold uppercase tracking-tight text-white font-condensed">
                {step === 'details' ? 'ATHLETE DISPATCH CHECKOUT' : 'DISPATCH CONFIRMED'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#8E95A5] hover:text-white hover:bg-[#222631] rounded-[4px] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-y-auto p-6 flex-1">
            {step === 'details' ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Athlete Verification */}
                <div>
                  <h3 className="text-xs font-mono font-bold text-[#D4FF00] uppercase tracking-wider mb-3">
                    01. ATHLETE RECIPIENT & DISPATCH DESTINATION
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                    <div>
                      <label className="text-[#8E95A5] block mb-1">ATHLETE FULL NAME</label>
                      <input
                        required
                        type="text"
                        value={formData.athleteName}
                        onChange={(e) => setFormData({ ...formData, athleteName: e.target.value })}
                        className="w-full bg-[#111317] border border-[#2A303C] focus:border-[#FF5500] text-white p-2.5 rounded-[4px] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[#8E95A5] block mb-1">EMAIL FOR TELEMETRY / RECEIPT</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#111317] border border-[#2A303C] focus:border-[#FF5500] text-white p-2.5 rounded-[4px] outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[#8E95A5] block mb-1">STREET ADDRESS</label>
                      <input
                        required
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-[#111317] border border-[#2A303C] focus:border-[#FF5500] text-white p-2.5 rounded-[4px] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[#8E95A5] block mb-1">CITY</label>
                      <input
                        required
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-[#111317] border border-[#2A303C] focus:border-[#FF5500] text-white p-2.5 rounded-[4px] outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[#8E95A5] block mb-1">STATE</label>
                        <input
                          required
                          type="text"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full bg-[#111317] border border-[#2A303C] focus:border-[#FF5500] text-white p-2.5 rounded-[4px] outline-none uppercase"
                        />
                      </div>
                      <div>
                        <label className="text-[#8E95A5] block mb-1">ZIP / POSTAL</label>
                        <input
                          required
                          type="text"
                          value={formData.zipCode}
                          onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                          className="w-full bg-[#111317] border border-[#2A303C] focus:border-[#FF5500] text-white p-2.5 rounded-[4px] outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Speed Selection */}
                <div>
                  <h3 className="text-xs font-mono font-bold text-[#D4FF00] uppercase tracking-wider mb-3">
                    02. VELOCITY LOGISTICS SPEED
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      onClick={() => setFormData({ ...formData, shippingSpeed: 'express' })}
                      className={`p-3 border rounded-[4px] flex items-center justify-between text-xs font-mono cursor-pointer transition-colors ${
                        formData.shippingSpeed === 'express'
                          ? 'bg-[#222631] border-[#FF5500] text-white'
                          : 'bg-[#111317] border-[#2A303C] text-[#8E95A5]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-[#D4FF00]" />
                        <div>
                          <div className="font-bold text-white">Carbon Express (2-Day)</div>
                          <div className="text-[10px] text-[#8E95A5]">Tracked high-velocity cargo</div>
                        </div>
                      </div>
                      <span className="font-bold text-[#D4FF00]">{subtotal >= 200 ? 'FREE' : '$15.00'}</span>
                    </label>

                    <label
                      onClick={() => setFormData({ ...formData, shippingSpeed: 'overnight' })}
                      className={`p-3 border rounded-[4px] flex items-center justify-between text-xs font-mono cursor-pointer transition-colors ${
                        formData.shippingSpeed === 'overnight'
                          ? 'bg-[#222631] border-[#FF5500] text-white'
                          : 'bg-[#111317] border-[#2A303C] text-[#8E95A5]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-[#FF5500]" />
                        <div>
                          <div className="font-bold text-white">Priority Race Eve (Next-Day)</div>
                          <div className="text-[10px] text-[#8E95A5]">Pre-marathon urgent air dispatch</div>
                        </div>
                      </div>
                      <span className="font-bold text-white">$25.00</span>
                    </label>
                  </div>
                </div>

                {/* Payment Simulation */}
                <div>
                  <h3 className="text-xs font-mono font-bold text-[#D4FF00] uppercase tracking-wider mb-3">
                    03. ENCRYPTED PAYMENT METHOD
                  </h3>
                  <div className="bg-[#111317] border border-[#2A303C] p-4 rounded-[4px] space-y-3">
                    <div className="flex items-center gap-3 text-xs font-mono text-[#8E95A5]">
                      <CreditCard className="w-4 h-4 text-[#FF5500]" />
                      <span>SIMULATED ATHLETE DIRECT CARD // NO CHARGE</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                      <input
                        readOnly
                        value={formData.cardNumber}
                        className="col-span-2 bg-[#161920] border border-[#2A303C] text-white p-2 rounded-[3px] text-center"
                      />
                      <input
                        readOnly
                        value={formData.cardExp}
                        className="bg-[#161920] border border-[#2A303C] text-white p-2 rounded-[3px] text-center"
                      />
                    </div>
                  </div>
                </div>

                {/* Final Cost Summary & Submit */}
                <div className="border-t border-[#2A303C] pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs font-mono">
                    <div className="text-[#8E95A5]">TOTAL DISPATCH AMOUNT:</div>
                    <div className="text-2xl font-bold text-white font-mono tabular-nums">
                      ${total} <span className="text-xs text-[#FF5500]">USD</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-[#FF5500] hover:bg-[#ff6611] text-[#0F1115] font-extrabold text-xs uppercase tracking-widest rounded-[4px] transition-all glow-active cursor-pointer font-mono"
                  >
                    AUTHORIZE & DISPATCH RIGS
                  </button>
                </div>

              </form>
            ) : (
              /* Order Confirmation State */
              <div className="text-center py-10 space-y-6">
                <div className="w-16 h-16 bg-[#D4FF00]/10 border border-[#D4FF00] rounded-full flex items-center justify-center mx-auto text-[#D4FF00]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <div className="text-xs font-mono text-[#D4FF00] tracking-widest uppercase mb-1">
                    TRANSACTION CONFIRMED // LOGISTICS ACTIVE
                  </div>
                  <h3 className="text-3xl font-extrabold uppercase text-white font-condensed">
                    ORDER {generatedOrderId} DISPATCH SCHEDULED
                  </h3>
                  <p className="text-xs text-[#8E95A5] mt-2 max-w-md mx-auto">
                    Your footwear package is queued for clean-room assembly and carbon-cured quality verification. Preparing shipment to {formData.athleteName} in {formData.city}, {formData.state}.
                  </p>
                </div>

                {/* Receipt Details Box */}
                <div className="bg-[#111317] border border-[#2A303C] p-4 rounded-[4px] max-w-md mx-auto text-left text-xs font-mono space-y-2">
                  <div className="flex justify-between border-b border-[#2A303C] pb-1.5">
                    <span className="text-[#8E95A5]">Tracking Identifier:</span>
                    <span className="text-white font-bold">KINETIC-EXP-{Math.floor(10000000 + Math.random() * 90000000)}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#2A303C] pb-1.5">
                    <span className="text-[#8E95A5]">Delivery Speed:</span>
                    <span className="text-[#D4FF00] uppercase font-bold">{formData.shippingSpeed} (2-3 Business Days)</span>
                  </div>
                  <div className="flex justify-between border-b border-[#2A303C] pb-1.5">
                    <span className="text-[#8E95A5]">Charged Amount:</span>
                    <span className="text-white font-bold">${total} USD</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-[#8E95A5]">Email Telemetry Sent To:</span>
                    <span className="text-white">{formData.email}</span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-[#161920] hover:bg-[#222631] text-white border border-[#2A303C] hover:border-[#FF5500] font-bold text-xs uppercase tracking-widest rounded-[4px] transition-all cursor-pointer font-mono"
                >
                  RETURN TO STORE
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
