import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { ArrowRight, Cpu, Gauge, Zap, Sparkles } from 'lucide-react';
import { PRODUCTS, Product } from '../data/products';

interface HeroSectionProps {
  onExploreClick: () => void;
  onOpenConfigurator: () => void;
  onSelectProduct: (product: Product) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onOpenConfigurator,
  onSelectProduct,
}) => {
  const heroProduct = PRODUCTS[0]; // Hyper Velocity Elite X
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);

  // Scroll parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const shoeParallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

  // Mouse tilt parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateXSpring = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    damping: 20,
    stiffness: 120,
  });
  const rotateYSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), {
    damping: 20,
    stiffness: 120,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const currentX = (e.clientX - rect.left) / width - 0.5;
    const currentY = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(currentX);
    mouseY.set(currentY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const angles = [
    { label: '01. Aero Profile', detail: 'Sub-2 Marathon Geometry' },
    { label: '02. Carbon Spoon', detail: '3D Longitudinal Lever' },
    { label: '03. Nitrogen PEBA', detail: '88.4% Dynamic Return' },
    { label: '04. Traction Pods', detail: 'Wet Asphalt Friction' },
  ];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] pt-24 pb-16 flex items-center overflow-hidden border-b border-[#2A303C]"
    >
      {/* Parallax Background Grid & Telemetry Lines */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none opacity-20"
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, #2A303C 1px, transparent 1px),
              linear-gradient(to bottom, #2A303C 1px, transparent 1px)
            `,
            backgroundSize: '4rem 4rem',
          }}
        />
        {/* Ambient Velocity Glow */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#FF5500]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-[#D4FF00]/8 rounded-full blur-[120px] pointer-events-none" />
      </motion.div>

      {/* Floating Coordinate Telemetry (Technical Non-Slop Accents) */}
      <div className="absolute top-28 left-6 hidden xl:block text-[10px] font-mono tracking-widest text-[#8E95A5]/60 space-y-1 select-none pointer-events-none">
        <div>SYS_PROPULSION // TORSION_72_NM</div>
        <div>MET_REDUCTION // -4.2% METABOLIC</div>
        <div>CHASSIS // 3D_SPOON_CARBON</div>
      </div>
      <div className="absolute top-28 right-6 hidden xl:block text-[10px] font-mono tracking-widest text-right text-[#8E95A5]/60 space-y-1 select-none pointer-events-none">
        <div>AIRFLOW_VELOCITY // 6.8 M/S</div>
        <div>ENERGY_TRANSFER // 88.4% REC</div>
        <div>STACK_MAX // 39.8MM WA_COMPLIANT</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Bold Architectural Typographic Hierarchy */}
          <motion.div style={{ y: textY }} className="lg:col-span-6 space-y-6">
            
            {/* Supercharged Tagline */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#161920] border border-[#2A303C] rounded-[4px] text-xs font-mono tracking-wider text-[#D4FF00]">
              <span className="w-1.5 h-1.5 bg-[#D4FF00] rounded-[1px]" />
              <span>PROPULSION LAB SERIES // 2026 DEPLOYMENT</span>
            </div>

            {/* Headline Hero (Barlow Condensed 72px) */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white leading-[0.95] font-condensed">
              ENGINEERED FOR <span className="text-[#FF5500]">SUPREMACY.</span>
              <br />
              <span className="text-[#E2E2E8]">ZERO COMPROMISE</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E2E2E8] to-[#8E95A5]">
                VELOCITY.
              </span>
            </h1>

            {/* Body Description */}
            <p className="text-base sm:text-lg text-[#8E95A5] leading-relaxed max-w-xl font-normal">
              High-frequency footwear engineering calibrated for podium finishes. Full-length 3D carbon-fiber spoon plates fused with supercritical PEBAX nitrogen foam to convert every gram of downward impact into horizontal momentum.
            </p>

            {/* Technical Specification KPI Strip */}
            <div className="grid grid-cols-3 gap-3 pt-2 pb-2">
              <div className="p-3 bg-[#161920] border border-[#2A303C] rounded-[4px]">
                <div className="text-[11px] font-mono uppercase text-[#8E95A5] tracking-wider">Weight (US 9.5)</div>
                <div className="text-2xl font-extrabold text-white font-condensed tracking-tight mt-0.5">
                  182<span className="text-xs text-[#FF5500] font-mono ml-0.5">G</span>
                </div>
                <div className="text-[10px] text-[#D4FF00] font-mono mt-0.5">Ultralight Rig</div>
              </div>

              <div className="p-3 bg-[#161920] border border-[#2A303C] rounded-[4px]">
                <div className="text-[11px] font-mono uppercase text-[#8E95A5] tracking-wider">Energy Return</div>
                <div className="text-2xl font-extrabold text-[#D4FF00] font-condensed tracking-tight mt-0.5">
                  88.4<span className="text-xs text-white font-mono ml-0.5">%</span>
                </div>
                <div className="text-[10px] text-[#8E95A5] font-mono mt-0.5">Supercritical Rebound</div>
              </div>

              <div className="p-3 bg-[#161920] border border-[#2A303C] rounded-[4px]">
                <div className="text-[11px] font-mono uppercase text-[#8E95A5] tracking-wider">IAAF Stack</div>
                <div className="text-2xl font-extrabold text-white font-condensed tracking-tight mt-0.5">
                  39.8<span className="text-xs text-[#FF5500] font-mono ml-0.5">MM</span>
                </div>
                <div className="text-[10px] text-[#8E95A5] font-mono mt-0.5">Legal Maximum</div>
              </div>
            </div>

            {/* Kinetic Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="group flex items-center gap-3 px-6 py-3.5 bg-[#FF5500] hover:bg-[#ff6611] text-[#0F1115] font-bold text-xs uppercase tracking-widest rounded-[4px] transition-all glow-active cursor-pointer"
              >
                <span>EXPLORE PRODUCT MATRIX</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenConfigurator}
                className="flex items-center gap-2.5 px-6 py-3.5 bg-[#161920] hover:bg-[#222631] text-white border border-[#2A303C] hover:border-[#FF5500] font-bold text-xs uppercase tracking-widest rounded-[4px] transition-all cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-[#D4FF00]" />
                <span>LAUNCH RIG CONFIGURATOR</span>
              </button>
            </div>

            {/* Trust claim & adjacent proof */}
            <div className="flex items-center gap-3 text-xs text-[#8E95A5] pt-1">
              <span className="text-white font-semibold">Verified:</span>
              <span>-4.2% Metabolic Output</span>
              <span aria-hidden="true">·</span>
              <span>Sub-2:03 Protocol Calibrated</span>
            </div>
          </motion.div>

          {/* Right Column: 3D Interactive Parallax Product Showcase */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            <motion.div
              style={{
                y: shoeParallaxY,
                rotateX: rotateXSpring,
                rotateY: rotateYSpring,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full max-w-lg aspect-[4/3] rounded-[4px] bg-[#161920] border border-[#2A303C] p-4 flex items-center justify-center group shadow-2xl overflow-hidden cursor-pointer"
              onClick={() => onSelectProduct(heroProduct)}
            >
              {/* Radial Rim Glow on Staging Floor */}
              <div className="absolute inset-0 bg-radial from-transparent via-[#0F1115]/30 to-[#0F1115] pointer-events-none" />

              {/* High Contrast Product Photography */}
              <motion.img
                src={heroProduct.image}
                alt={heroProduct.name}
                referrerPolicy="no-referrer"
                className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_25px_30px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Floating Holographic Telemetry Pill Tag */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-2.5 py-1 bg-[#0F1115]/90 border border-[#D4FF00] rounded-[2px] backdrop-blur-md">
                <Zap className="w-3 h-3 text-[#D4FF00]" />
                <span className="text-[10px] font-mono font-bold text-[#D4FF00] tracking-wider uppercase">
                  ACTIVE FLAGSHIP: {heroProduct.code}
                </span>
              </div>

              {/* Quick Spec Badge Bottom Right */}
              <div className="absolute bottom-4 right-4 z-20 px-3 py-1.5 bg-[#0F1115]/90 border border-[#2A303C] rounded-[2px] backdrop-blur-md text-right">
                <div className="text-[10px] font-mono text-[#8E95A5]">PROPULSION INDEX</div>
                <div className="text-sm font-mono font-bold text-white tabular-nums">
                  99.2 <span className="text-[10px] text-[#FF5500]">SCORE</span>
                </div>
              </div>

              {/* View Engineering Blueprint Prompt */}
              <div className="absolute inset-x-0 bottom-0 py-2 bg-[#FF5500]/90 text-[#0F1115] text-[11px] font-bold tracking-widest uppercase text-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                CLICK TO OPEN TECHNICAL SPEC SHEET & EXPLODED VIEW →
              </div>
            </motion.div>

            {/* Interactive Engineering Perspective Switcher */}
            <div className="w-full max-w-lg mt-4 grid grid-cols-4 gap-2">
              {angles.map((angle, idx) => (
                <button
                  key={angle.label}
                  onClick={() => setActiveAngleIndex(idx)}
                  className={`p-2 rounded-[3px] border text-left transition-all cursor-pointer ${
                    activeAngleIndex === idx
                      ? 'bg-[#222631] border-[#FF5500] text-white'
                      : 'bg-[#161920] border-[#2A303C] text-[#8E95A5] hover:text-white hover:border-[#8E95A5]'
                  }`}
                >
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider truncate">
                    {angle.label}
                  </div>
                  <div className="text-[9px] text-[#8E95A5] truncate hidden sm:block">
                    {angle.detail}
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
