import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Wind, Gauge, Activity, ArrowRight, ShieldCheck, Flame } from 'lucide-react';

interface BiomechanicsLabSectionProps {
  onOpenConfigurator: () => void;
}

export const BiomechanicsLabSection: React.FC<BiomechanicsLabSectionProps> = ({
  onOpenConfigurator,
}) => {
  const [activeTab, setActiveTab] = useState<'carbon' | 'peba' | 'aero'>('carbon');

  const labFeatures = {
    carbon: {
      title: '3D LONGITUDINAL CARBON LEVER',
      metric: '72 Nm/rad',
      metricLabel: 'TORSIONAL STIFFNESS',
      description:
        'Unlike flat carbon inserts that cause midfoot fatigue, our bi-axial 3D spoon geometry follows the natural sagittal plane strike path, acting as an elastic catapult during metatarsal toe-off.',
      breakdown: [
        { label: 'CALF STRAIN REDUCTION', value: '-14% ANKLE MOMENT' },
        { label: 'PROPULSION VECTOR', value: '+3.8° FORWARD TILT' },
        { label: 'MATERIAL', value: 'TORAYCA T1100 CARBON' },
      ],
      tag: 'LEVER PROPULSION',
    },
    peba: {
      title: 'SUPERCRITICAL NITROGEN PEBAX FOUNDATION',
      metric: '88.4%',
      metricLabel: 'DYNAMIC ENERGY REBOUND',
      description:
        'Autoclaved under 300 bar supercritical nitrogen gas, our micro-cellular PEBA formulation creates uniform sub-micron gas chambers that resist compression set over 42.2 kilometers.',
      breakdown: [
        { label: 'ENERGY DISSIPATION', value: '11.6% MINIMAL HYSTERESIS' },
        { label: 'MASS DENSITY', value: '0.12 g/cm³ ULTRA-LIGHT' },
        { label: 'DURABILITY', value: '600+ KM PODIUM LIFESPAN' },
      ],
      tag: 'CLOSED-CELL NITROGEN',
    },
    aero: {
      title: 'VAPOR-HYDROPHOBIC MONOMESH AERO WEAVE',
      metric: '0.22 CdA',
      metricLabel: 'AERODYNAMIC DRAG COEFFICIENT',
      description:
        'Single-filament hydrophobic structure repels rain and sweat while providing mechanical micro-rib locks along the navicular bone. Zero moisture retention ensures zero weight gain in wet race conditions.',
      breakdown: [
        { label: 'WATER ABSORPTION', value: '0.04 GRAMS (WATERPROOF)' },
        { label: 'AIR PERMEABILITY', value: '185 CFM MAX VENTILATION' },
        { label: 'TENSILE STRENGTH', value: '1,420 N BREAK RESISTANCE' },
      ],
      tag: 'AERO CONDUIT',
    },
  };

  const current = labFeatures[activeTab];

  return (
    <section id="engineering-lab" className="py-20 bg-[#0F1115] border-t border-[#2A303C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#2A303C]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#D4FF00] tracking-widest uppercase">
              <Activity className="w-3.5 h-3.5" />
              <span>SUBSURFACE BIOMECHANICAL PROTOCOL</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-white font-condensed">
              THE VELOCITY TUNNEL // CURED ENGINEERING
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-[#161920] p-1 border border-[#2A303C] rounded-[4px] shrink-0">
            <button
              onClick={() => setActiveTab('carbon')}
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-[3px] transition-colors cursor-pointer ${
                activeTab === 'carbon' ? 'bg-[#FF5500] text-[#0F1115]' : 'text-[#8E95A5] hover:text-white'
              }`}
            >
              01. CARBON LEVER
            </button>
            <button
              onClick={() => setActiveTab('peba')}
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-[3px] transition-colors cursor-pointer ${
                activeTab === 'peba' ? 'bg-[#D4FF00] text-[#0F1115]' : 'text-[#8E95A5] hover:text-white'
              }`}
            >
              02. NITROGEN PEBA
            </button>
            <button
              onClick={() => setActiveTab('aero')}
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-[3px] transition-colors cursor-pointer ${
                activeTab === 'aero' ? 'bg-white text-[#0F1115]' : 'text-[#8E95A5] hover:text-white'
              }`}
            >
              03. AERO WEAVE
            </button>
          </div>
        </div>

        {/* Feature Interactive Staging Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#161920] border border-[#2A303C] rounded-[4px] p-6 lg:p-10">
          
          {/* Left Column: Metric & Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#111317] border border-[#2A303C] rounded-[2px] text-[10px] font-mono text-[#D4FF00]">
              <Flame className="w-3 h-3 text-[#FF5500]" />
              <span>{current.tag} // LABORATORY VALIDATION</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold uppercase text-white font-condensed">
              {current.title}
            </h3>

            <p className="text-sm text-[#8E95A5] leading-relaxed">
              {current.description}
            </p>

            {/* Breakdown Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {current.breakdown.map((item) => (
                <div key={item.label} className="p-3 bg-[#111317] border border-[#2A303C] rounded-[3px]">
                  <div className="text-[10px] font-mono text-[#8E95A5] uppercase tracking-wider">{item.label}</div>
                  <div className="text-sm font-mono font-bold text-white mt-1">{item.value}</div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenConfigurator}
                className="flex items-center gap-2 px-5 py-3 bg-[#FF5500] hover:bg-[#ff6611] text-[#0F1115] font-bold text-xs uppercase font-mono tracking-wider rounded-[4px] transition-all glow-active cursor-pointer"
              >
                <span>CALIBRATE THIS SPEC IN RIG LAB</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: High-Impact Visual Data Dial */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-[#111317] border border-[#2A303C] rounded-[4px] text-center relative overflow-hidden">
            {/* Background geometric speed accents */}
            <div className="absolute inset-0 bg-radial from-[#FF5500]/10 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 space-y-2">
              <div className="text-[11px] font-mono text-[#8E95A5] uppercase tracking-widest">
                {current.metricLabel}
              </div>
              <div className="text-6xl sm:text-7xl font-extrabold text-[#D4FF00] font-condensed tracking-tighter tabular-nums">
                {current.metric}
              </div>
              <div className="text-xs font-mono text-white pt-2 border-t border-[#2A303C] max-w-xs mx-auto">
                TESTED ACROSS 1,200 RUNNER STRIKE PROFILES
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
