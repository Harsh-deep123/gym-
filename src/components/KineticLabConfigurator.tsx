import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sliders, Cpu, Activity, Zap, Check, Sparkles, ShoppingBag } from 'lucide-react';
import { PRODUCTS, Product } from '../data/products';

interface CustomRigConfig {
  chassis: string;
  foam: string;
  dropMm: number;
  colorway: string;
  colorHex: string;
  accentHex: string;
  laserText: string;
}

interface KineticLabConfiguratorProps {
  onAddToCart: (customProduct: Product, size: number, colorway: string) => void;
  onClose?: () => void;
}

export const KineticLabConfigurator: React.FC<KineticLabConfiguratorProps> = ({
  onAddToCart,
  onClose,
}) => {
  const [config, setConfig] = useState<CustomRigConfig>({
    chassis: '3D Longitudinal Carbon Spoon',
    foam: 'Supercritical Nitrogen-Infused PEBAX',
    dropMm: 8,
    colorway: 'Hyper Orange Velocity',
    colorHex: '#FF5500',
    accentHex: '#D4FF00',
    laserText: 'SUB-2:02 PROTO',
  });

  const [selectedSize, setSelectedSize] = useState<number>(9.5);
  const [isSaved, setIsSaved] = useState(false);

  // Chassis options
  const chassisOptions = [
    { name: '3D Longitudinal Carbon Spoon', weightDelta: 0, returnDelta: 0, desc: 'World Athletics compliant sub-2 marathon lever' },
    { name: 'Stiffened Sprint Max Carbon Wing', weightDelta: -8, returnDelta: 2.8, desc: 'Ultra-stiff 94 Nm/rad maximum force transmission' },
    { name: 'Dual-Wing Dynamic Torsion Plate', weightDelta: 6, returnDelta: -1.2, desc: 'Reinforced medial guide rails for 42km fatigue resistance' },
  ];

  // Foam options
  const foamOptions = [
    { name: 'Supercritical Nitrogen-Infused PEBAX', weightDelta: 0, returnDelta: 0, desc: 'Dual-density 38C/45C responsive matrix' },
    { name: 'Feather-Cell Sprint Density Foam', weightDelta: -14, returnDelta: 1.4, desc: 'Ultra-shaved minimum weight composition' },
    { name: 'Hyper-Resilient High Mileage Polymer', weightDelta: 10, returnDelta: -0.8, desc: 'Retains 98% rebound through 800+ km' },
  ];

  // Drop options
  const dropOptions = [4, 6, 8, 10];

  // Colorways
  const colorwayOptions = [
    { name: 'Hyper Orange Velocity', primary: '#FF5500', accent: '#D4FF00' },
    { name: 'Volt Lime High-Frequency', primary: '#D4FF00', accent: '#0F1115' },
    { name: 'Obsidian Stealth Composite', primary: '#161920', accent: '#FF5500' },
    { name: 'Polar White Aero', primary: '#FFFFFF', accent: '#FF5500' },
  ];

  // Calculated live metrics
  const selectedChassisObj = chassisOptions.find((c) => c.name === config.chassis) || chassisOptions[0];
  const selectedFoamObj = foamOptions.find((f) => f.name === config.foam) || foamOptions[0];

  const calculatedWeight = 182 + selectedChassisObj.weightDelta + selectedFoamObj.weightDelta;
  const calculatedEnergyReturn = Number((88.4 + selectedChassisObj.returnDelta + selectedFoamObj.returnDelta).toFixed(1));
  const calculatedRigidity = config.chassis.includes('Sprint') ? 94 : config.chassis.includes('Torsion') ? 78 : 72;
  const customPrice = 320;

  const handleCommitToBag = () => {
    const customProduct: Product = {
      id: `custom-rig-${Date.now()}`,
      name: `CUSTOM RIG // ${config.laserText.toUpperCase() || 'PROTOTYPE'}`,
      code: 'KP-LAB-CUSTOM',
      category: 'Road Marathon',
      price: customPrice,
      weightGrams: calculatedWeight,
      energyReturnPct: calculatedEnergyReturn,
      carbonPlate: config.chassis,
      stackHeight: `39.8mm / ${(39.8 - config.dropMm).toFixed(1)}mm`,
      dropMm: config.dropMm,
      foamCompound: config.foam,
      outsole: 'Micro-Lugged Custom Carbon Rubber',
      velocityIndex: 99.5,
      image: '/src/assets/images/hero_hyper_velocity_1793907454532.jpg',
      badge: {
        type: 'alert',
        label: 'ATHLETE BESPOKE RIG',
      },
      colorways: [{ name: config.colorway, primaryHex: config.colorHex, accentHex: config.accentHex }],
      sizes: [selectedSize],
      tagline: `Bespoke configuration: ${config.chassis} with ${config.dropMm}mm drop.`,
      description: `Engineered with precision for custom stride dynamics. Custom laser-etched badge: "${config.laserText}".`,
      specTable: [
        {
          category: 'BESPOKE RIG SPECIFICATIONS',
          specs: [
            { label: 'Plate System', value: config.chassis, isHighlight: true },
            { label: 'Calculated Mass', value: `${calculatedWeight} grams`, isHighlight: true },
            { label: 'Dynamic Rebound', value: `${calculatedEnergyReturn}%`, isHighlight: true },
            { label: 'Calibrated Drop', value: `${config.dropMm} mm` },
            { label: 'Laser Inscription', value: config.laserText || 'NONE' },
          ],
        },
      ],
      engineeringLayers: PRODUCTS[0].engineeringLayers,
    };

    onAddToCart(customProduct, selectedSize, config.colorway);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      if (onClose) onClose();
    }, 1500);
  };

  return (
    <div className="bg-[#111317] border border-[#2A303C] rounded-[4px] p-4 sm:p-6 lg:p-8">
      {/* Title & Introduction */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2A303C]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#D4FF00] tracking-widest uppercase mb-1">
            <Cpu className="w-3.5 h-3.5" />
            <span>KINETIC PROPULSION LAB // BESPOKE RIG BUILDER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white font-condensed">
            CUSTOM FOOTWEAR RIG CONFIGURATOR
          </h2>
          <p className="text-xs text-[#8E95A5] mt-1 max-w-2xl">
            Fine-tune plate torsional stiffness, supercritical foam durometer, and offset drop to your cadence and footstrike angle.
          </p>
        </div>

        {/* Live Telemetry HUD */}
        <div className="flex items-center gap-2 sm:gap-3 bg-[#161920] border border-[#2A303C] p-3 rounded-[4px] shrink-0">
          <div className="text-center px-2">
            <div className="text-[10px] font-mono text-[#8E95A5]">WEIGHT</div>
            <div className="text-xl font-mono font-bold text-white tabular-nums">
              {calculatedWeight}g
            </div>
          </div>
          <div className="w-[1px] h-8 bg-[#2A303C]" />
          <div className="text-center px-2">
            <div className="text-[10px] font-mono text-[#8E95A5]">REBOUND</div>
            <div className="text-xl font-mono font-bold text-[#D4FF00] tabular-nums">
              {calculatedEnergyReturn}%
            </div>
          </div>
          <div className="w-[1px] h-8 bg-[#2A303C]" />
          <div className="text-center px-2">
            <div className="text-[10px] font-mono text-[#8E95A5]">RIGIDITY</div>
            <div className="text-xl font-mono font-bold text-[#FF5500] tabular-nums">
              {calculatedRigidity} <span className="text-[10px]">Nm</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        
        {/* Left Column: Interactive Visual Blueprint */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="relative aspect-[4/3] bg-[#0c0e12] border border-[#2A303C] rounded-[4px] p-6 flex items-center justify-center overflow-hidden">
            {/* Visual speed lines based on chosen color */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${config.colorHex} 0%, transparent 70%)`,
              }}
            />

            <motion.img
              key={config.colorway}
              initial={{ opacity: 0.6, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src="/src/assets/images/hero_hyper_velocity_1793907454532.jpg"
              alt="Custom Rig Preview"
              className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.9)]"
            />

            {/* Laser Inscription Overlay */}
            <div className="absolute bottom-3 right-4 px-2.5 py-1 bg-[#161920]/90 border border-[#2A303C] rounded-[2px] text-right">
              <div className="text-[9px] font-mono text-[#8E95A5]">LASER ENGRAVED ID</div>
              <div className="text-xs font-mono font-bold text-[#D4FF00] uppercase tracking-wider">
                {config.laserText || 'UNLABELED PROTO'}
              </div>
            </div>

            {/* Live Drop Tag */}
            <div className="absolute top-3 left-4 px-2.5 py-1 bg-[#161920]/90 border border-[#2A303C] rounded-[2px]">
              <div className="text-[9px] font-mono text-[#8E95A5]">CHOSEN OFFSET</div>
              <div className="text-xs font-mono font-bold text-white">
                {config.dropMm}.0 MM DROP
              </div>
            </div>
          </div>

          {/* Config Summary Card */}
          <div className="bg-[#161920] border border-[#2A303C] p-4 rounded-[4px] text-xs font-mono space-y-2">
            <div className="text-[#8E95A5] uppercase tracking-wider font-bold">ACTIVE BUILD SPECS:</div>
            <div className="flex justify-between border-b border-[#2A303C] pb-1">
              <span className="text-[#8E95A5]">Chassis Plate:</span>
              <span className="text-white font-bold">{config.chassis}</span>
            </div>
            <div className="flex justify-between border-b border-[#2A303C] pb-1">
              <span className="text-[#8E95A5]">Foam System:</span>
              <span className="text-white font-bold">{config.foam}</span>
            </div>
            <div className="flex justify-between border-b border-[#2A303C] pb-1">
              <span className="text-[#8E95A5]">Colorway:</span>
              <span className="text-[#D4FF00] font-bold">{config.colorway}</span>
            </div>
            <div className="flex justify-between pt-1 text-sm font-bold">
              <span className="text-white">Bespoke Production Fee:</span>
              <span className="text-[#FF5500] font-mono">${customPrice} USD</span>
            </div>
          </div>
        </div>

        {/* Right Column: Customization Controls */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Carbon Chassis */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-white mb-2">
              01. CARBON-FIBER CHASSIS PROPULSION:
            </label>
            <div className="space-y-2">
              {chassisOptions.map((opt) => (
                <button
                  key={opt.name}
                  onClick={() => setConfig({ ...config, chassis: opt.name })}
                  className={`w-full p-3 rounded-[4px] border text-left transition-all cursor-pointer ${
                    config.chassis === opt.name
                      ? 'bg-[#222631] border-[#FF5500] text-white shadow-[0_0_15px_rgba(255,85,0,0.2)]'
                      : 'bg-[#161920] border-[#2A303C] text-[#8E95A5] hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-white">{opt.name}</span>
                    <span className="text-[10px] text-[#D4FF00]">
                      {opt.returnDelta >= 0 ? `+${opt.returnDelta}% Rebound` : `${opt.returnDelta}% Rebound`}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#8E95A5] mt-1">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Foam Density Core */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-white mb-2">
              02. SUPERCRITICAL FOAM FOUNDATION:
            </label>
            <div className="space-y-2">
              {foamOptions.map((opt) => (
                <button
                  key={opt.name}
                  onClick={() => setConfig({ ...config, foam: opt.name })}
                  className={`w-full p-3 rounded-[4px] border text-left transition-all cursor-pointer ${
                    config.foam === opt.name
                      ? 'bg-[#222631] border-[#D4FF00] text-white'
                      : 'bg-[#161920] border-[#2A303C] text-[#8E95A5] hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-white">{opt.name}</span>
                    <span className="text-[10px] text-[#FF5500]">
                      {opt.weightDelta <= 0 ? `${opt.weightDelta}g Mass` : `+${opt.weightDelta}g Mass`}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#8E95A5] mt-1">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Heel-to-Toe Drop Offset */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-white mb-2">
              03. HEEL-TO-TOE OFFSET DROP:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {dropOptions.map((d) => (
                <button
                  key={d}
                  onClick={() => setConfig({ ...config, dropMm: d })}
                  className={`py-2.5 rounded-[4px] border text-center text-xs font-mono font-bold transition-all cursor-pointer ${
                    config.dropMm === d
                      ? 'bg-white text-[#0F1115] border-white'
                      : 'bg-[#161920] border-[#2A303C] text-[#8E95A5] hover:text-white'
                  }`}
                >
                  {d} MM
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Primary Colorway */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-white mb-2">
              04. FINISH & VISUAL IDENTITY:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {colorwayOptions.map((c) => (
                <button
                  key={c.name}
                  onClick={() =>
                    setConfig({
                      ...config,
                      colorway: c.name,
                      colorHex: c.primary,
                      accentHex: c.accent,
                    })
                  }
                  className={`p-2.5 rounded-[4px] border text-left text-xs font-mono transition-all cursor-pointer ${
                    config.colorway === c.name
                      ? 'bg-[#222631] border-[#FF5500] text-white'
                      : 'bg-[#161920] border-[#2A303C] text-[#8E95A5] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-4 h-4 rounded-full border border-black/40"
                      style={{ backgroundColor: c.primary }}
                    />
                    <span className="text-[11px] font-bold truncate">{c.name.split(' ')[0]}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 5: Laser Inscription & Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-white mb-1.5">
                05. METATARSAL LASER ID:
              </label>
              <input
                type="text"
                maxLength={20}
                value={config.laserText}
                onChange={(e) => setConfig({ ...config, laserText: e.target.value })}
                placeholder="E.G. SUB-2 BOSTON"
                className="w-full bg-[#161920] border border-[#2A303C] focus:border-[#FF5500] text-white px-3 py-2 text-xs font-mono uppercase tracking-wider rounded-[4px] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-white mb-1.5">
                US MENS SIZE:
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(Number(e.target.value))}
                className="w-full bg-[#161920] border border-[#2A303C] focus:border-[#FF5500] text-white px-3 py-2 text-xs font-mono uppercase tracking-wider rounded-[4px] outline-none cursor-pointer"
              >
                {[7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13].map((sz) => (
                  <option key={sz} value={sz}>
                    US {sz} MENS
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Commit Action */}
          <div className="pt-2">
            <button
              onClick={handleCommitToBag}
              className="w-full py-4 bg-[#FF5500] hover:bg-[#ff6611] text-[#0F1115] font-extrabold text-sm tracking-widest uppercase rounded-[4px] transition-all glow-active flex items-center justify-center gap-2 cursor-pointer font-mono"
            >
              {isSaved ? (
                <>
                  <Check className="w-5 h-5 stroke-[3]" />
                  <span>CUSTOM RIG DEPLOYED TO BAG</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>COMMIT BESPOKE RIG TO BAG (${customPrice} USD)</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
