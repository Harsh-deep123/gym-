import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="border-t border-[#2A303C] bg-[#0c0e12] pt-16 pb-12 text-[#8E95A5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-white font-condensed">
              <span className="w-2.5 h-6 bg-[#FF5500] rounded-[1px] transform -skew-x-12" />
              <span>KINETIC</span>
              <span className="text-[#8E95A5] font-light tracking-widest text-lg">PERFORMANCE</span>
            </div>
            <p className="text-xs text-[#8E95A5] leading-relaxed max-w-sm">
              Precision retail engineering for world-class athletes. Developed in collaboration with international biomechanics tunnels to maximize force propulsion and energetic rebound.
            </p>
            <div className="text-[11px] font-mono text-[#8E95A5] space-y-1">
              <div>HEADQUARTERS: CAMBRIDGE BIOMECHANICAL SUITE, MA</div>
              <div>CERTIFICATION: WORLD ATHLETICS TECHNICAL RULE 143.13</div>
            </div>
          </div>

          {/* Quick Links Columns */}
          <div className="md:col-span-3 grid grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <div className="text-white font-bold uppercase tracking-wider mb-3">CATALOG</div>
              <ul className="space-y-2">
                <li><a href="#product-matrix" className="hover:text-white transition-colors">Marathon Racers</a></li>
                <li><a href="#product-matrix" className="hover:text-white transition-colors">Track Spikes</a></li>
                <li><a href="#product-matrix" className="hover:text-white transition-colors">Technical Trail</a></li>
                <li><a href="#product-matrix" className="hover:text-white transition-colors">Recovery Systems</a></li>
              </ul>
            </div>
            <div>
              <div className="text-white font-bold uppercase tracking-wider mb-3">ENGINEERING</div>
              <ul className="space-y-2">
                <li><a href="#engineering-lab" className="hover:text-white transition-colors">Carbon Plates</a></li>
                <li><a href="#engineering-lab" className="hover:text-white transition-colors">Supercritical PEBA</a></li>
                <li><a href="#engineering-lab" className="hover:text-white transition-colors">Wind Tunnel Data</a></li>
                <li><a href="#engineering-lab" className="hover:text-white transition-colors">Podium Trials</a></li>
              </ul>
            </div>
          </div>

          {/* Prototype Drop Telemetry Signup */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              EXPERIMENTAL RIG RELEASES
            </div>
            <p className="text-xs text-[#8E95A5]">
              Receive early access notification for limited prototype batch drops and world record race calibrations.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ATHLETE EMAIL ADDRESS..."
                className="w-full bg-[#161920] border border-[#2A303C] focus:border-[#FF5500] text-white px-3 py-2 text-xs font-mono uppercase tracking-wider rounded-[4px] outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#FF5500] hover:bg-[#ff6611] text-[#0F1115] font-bold text-xs uppercase font-mono rounded-[4px] transition-colors shrink-0 cursor-pointer"
              >
                {isSubscribed ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
            {isSubscribed && (
              <div className="text-[10px] font-mono text-[#D4FF00]">
                ✓ ATHLETE REGISTERED FOR NEXT PROTOTYPE DROP.
              </div>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#2A303C] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono">
          <div>
            © {new Date().getFullYear()} KINETIC PERFORMANCE INC. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-white transition-colors">TERMS OF DEPLOYMENT</a>
            <a href="#" className="hover:text-white transition-colors">WORLD ATHLETICS COMPLIANCE</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
