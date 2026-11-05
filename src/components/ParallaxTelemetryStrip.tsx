import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Flame, Compass, Activity, ArrowUpRight } from 'lucide-react';

export const ParallaxTelemetryStrip: React.FC = () => {
  const telemetryItems = [
    { label: 'FORCE CONVERSION', value: '88.4% KINETIC REBOUND', icon: Flame },
    { label: 'IAAF SPECIFICATION', value: '39.8MM MAX STACK VERIFIED', icon: ShieldCheck },
    { label: 'AERODYNAMIC DRAG', value: '0.22 CdA WIND TUNNEL TESTED', icon: Compass },
    { label: 'METABOLIC COST', value: '-4.2% CONSUMPTION DROP', icon: Activity },
    { label: 'TORSIONAL RIGIDITY', value: '72 NM/RAD LONGITUDINAL LEVER', icon: ArrowUpRight },
  ];

  return (
    <div className="relative border-y border-[#2A303C] bg-[#0c0e12] py-3.5 overflow-hidden select-none">
      {/* Dynamic kinetic marquee */}
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
        className="flex items-center gap-10 whitespace-nowrap will-change-transform"
      >
        {[...telemetryItems, ...telemetryItems, ...telemetryItems].map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-[#FF5500] rounded-[1px]" />
              <Icon className="w-3.5 h-3.5 text-[#D4FF00]" />
              <span className="text-[#8E95A5]">{item.label}:</span>
              <span className="text-white font-bold">{item.value}</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
