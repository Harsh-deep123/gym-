export interface EngineeringLayer {
  name: string;
  material: string;
  function: string;
}

export interface Product {
  id: string;
  name: string;
  code: string;
  category: 'Road Marathon' | 'Track & Spike' | 'Technical Trail' | 'Recovery';
  price: number;
  weightGrams: number;
  energyReturnPct: number;
  carbonPlate: string;
  stackHeight: string;
  dropMm: number;
  foamCompound: string;
  outsole: string;
  velocityIndex: number;
  image: string;
  badge?: {
    type: 'spec' | 'alert';
    label: string;
  };
  colorways: {
    name: string;
    primaryHex: string;
    accentHex: string;
  }[];
  sizes: number[];
  tagline: string;
  description: string;
  specTable: {
    category: string;
    specs: { label: string; value: string; isHighlight?: boolean }[];
  }[];
  engineeringLayers: EngineeringLayer[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'kinetic-hyper-velocity-x',
    name: 'HYPER VELOCITY ELITE X',
    code: 'KP-HVE-01',
    category: 'Road Marathon',
    price: 295,
    weightGrams: 182,
    energyReturnPct: 88.4,
    carbonPlate: 'Full-Length 3D Sculpted Carbon Spoon',
    stackHeight: '39.8mm / 31.8mm',
    dropMm: 8,
    foamCompound: 'Supercritical Nitrogen-Infused PEBA',
    outsole: 'Micro-Lugged Liquid Carbon Rubber',
    velocityIndex: 99.2,
    image: '/src/assets/images/hero_hyper_velocity_1793907454532.jpg',
    badge: {
      type: 'alert',
      label: 'WORLD RECORD CERTIFIED',
    },
    colorways: [
      { name: 'Hyper Orange / Volt Lime', primaryHex: '#FF5500', accentHex: '#D4FF00' },
      { name: 'Obsidian Stealth / Chrome', primaryHex: '#161920', accentHex: '#FFFFFF' },
      { name: 'Polar White / Volt', primaryHex: '#FFFFFF', accentHex: '#D4FF00' },
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    tagline: 'Engineered for sub-2 hour marathon efficiency and instantaneous kinetic propulsion.',
    description: 'Developed inside our high-velocity biomechanics tunnel. Hyper Velocity Elite X marries a longitudinal carbon-fiber spoon with dual-phase supercritical PEBA foam, reducing metabolic cost by 4.2% over standard racing flats.',
    specTable: [
      {
        category: 'CHASSIS & PROPULSION',
        specs: [
          { label: 'Plate Architecture', value: 'Full-Length 3D Spoon Carbon', isHighlight: true },
          { label: 'Torsional Rigidity', value: '72 Nm/rad (Elite Track Tested)', isHighlight: true },
          { label: 'Energy Return', value: '88.4% Dynamic Rebound', isHighlight: true },
          { label: 'Heel-To-Toe Drop', value: '8.0 mm offset' },
        ],
      },
      {
        category: 'FOAM & CUSHIONING',
        specs: [
          { label: 'Primary Compound', value: 'Supercritical PEBAX Nitrogen Matrix' },
          { label: 'Forefoot Stack', value: '31.8 mm' },
          { label: 'Heel Stack', value: '39.8 mm (World Athletics Max)' },
          { label: 'Density Gradient', value: '0.12 g/cm³ Dual Durometer' },
        ],
      },
      {
        category: 'UPPER & TRACTION',
        specs: [
          { label: 'Upper Matrix', value: 'High-Tensile Hydrophobic Monomesh' },
          { label: 'Total Weight', value: '182 grams (Men US 9.5)', isHighlight: true },
          { label: 'Traction Compound', value: 'Aero-Siped Carbon Rubber Pods' },
          { label: 'Lacing System', value: 'Asymmetric Anatomical Cable Lock' },
        ],
      },
    ],
    engineeringLayers: [
      { name: 'Hydrophobic Monomesh Upper', material: 'Vapor-permeable woven monofilament', function: 'Zero water uptake in rain with anatomical lock' },
      { name: 'Upper PEBA Comfort Wedge', material: 'Low-density 38C supercritical foam', function: 'Instant soft footbed compliance on touchdown' },
      { name: '3D Carbon Spoon Plate', material: 'Bi-axial modulus carbon-fiber matrix', function: 'Propulsive lever snap redirecting vertical force to forward thrust' },
      { name: 'High-Rebound PEBA Foundation', material: 'High-resilience 45C nitro foam', function: 'Absorbs landing strike and returns 88.4% energy' },
      { name: 'Micro-Lugged Carbon Outsole', material: 'Laser-etched high-friction rubber pods', function: 'Zero slip wet cornering on asphalt at 22 km/h' },
    ],
  },
  {
    id: 'kinetic-carbon-stridor-pro',
    name: 'CARBON STRIDOR PRO',
    code: 'KP-CSP-02',
    category: 'Road Marathon',
    price: 260,
    weightGrams: 194,
    energyReturnPct: 86.1,
    carbonPlate: 'Semi-Rigid Curved Carbon Composite',
    stackHeight: '38.0mm / 32.0mm',
    dropMm: 6,
    foamCompound: 'Nitro-Injected Dual Foam System',
    outsole: 'Continuous Wave Carbon-Infused Grid',
    velocityIndex: 96.4,
    image: '/src/assets/images/shoe_carbon_stridor_1793907455160.jpg',
    badge: {
      type: 'spec',
      label: 'DYNAMIC STABILITY TIER 1',
    },
    colorways: [
      { name: 'Stealth Graphite / Hyper Orange', primaryHex: '#282A2E', accentHex: '#FF5500' },
      { name: 'Matte Obsidian / Volt', primaryHex: '#161920', accentHex: '#D4FF00' },
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    tagline: 'High-cadence marathon racer built for runners demanding lateral stability through 42km.',
    description: 'Designed for aggressive marathon transitions. The Stridor Pro features a reinforced carbon composite cradle that restrains excessive medial roll without blunting forward momentum.',
    specTable: [
      {
        category: 'CHASSIS & PROPULSION',
        specs: [
          { label: 'Plate Architecture', value: 'Dual-Wing Carbon Composite Spine', isHighlight: true },
          { label: 'Energy Return', value: '86.1% Measured Rebound', isHighlight: true },
          { label: 'Drop', value: '6.0 mm Midfoot Strike' },
        ],
      },
      {
        category: 'WEIGHT & GEOMETRY',
        specs: [
          { label: 'Total Weight', value: '194 grams (US 9.5)' },
          { label: 'Stack Profile', value: '38.0 mm Heel / 32.0 mm Toe' },
          { label: 'Midsole Foam', value: 'Dual-Density Nitro Polymer' },
        ],
      },
    ],
    engineeringLayers: [
      { name: 'Ripstop Monoweave Casing', material: 'Reinforced ballistic polyester knit', function: 'Micro-adjustable midfoot wrap' },
      { name: 'Winged Carbon Stabilizer', material: 'Pre-impregnated composite weave', function: 'Controls heel eversion during fatigue' },
      { name: 'Dual-Durometer Cushioning', material: 'Nitro-infused polymer base', function: 'Consistent dampening across high mileage' },
    ],
  },
  {
    id: 'kinetic-volt-matrix-spike',
    name: 'VOLT MATRIX SUPERFLY',
    code: 'KP-VMS-03',
    category: 'Track & Spike',
    price: 215,
    weightGrams: 128,
    energyReturnPct: 91.8,
    carbonPlate: 'Full-Foot Stiffened Spike Plate w/ 6 Titanium Pins',
    stackHeight: '20.0mm / 20.0mm',
    dropMm: 0,
    foamCompound: 'Ultra-Thin Micro-PEBA Responsive Strip',
    outsole: 'Generative Honeycomb Carbon Spike Plate',
    velocityIndex: 99.8,
    image: '/src/assets/images/shoe_volt_spike_1793907456086.jpg',
    badge: {
      type: 'alert',
      label: 'MAX VELOCITY // TRACK ONLY',
    },
    colorways: [
      { name: 'Volt Lime / Ghost White', primaryHex: '#D4FF00', accentHex: '#FFFFFF' },
      { name: 'Hyper Orange / Obsidian', primaryHex: '#FF5500', accentHex: '#0F1115' },
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    tagline: 'Ultralight explosive sprint weapon engineered for 60m–400m maximum acceleration.',
    description: 'Weighing an astonishing 128 grams, the Volt Matrix Superfly anchors 6 replaceable titanium spikes into an ultra-rigid carbon plate designed to maximize force transfer off the starting blocks.',
    specTable: [
      {
        category: 'PROPULSION & RIGIDITY',
        specs: [
          { label: 'Plate Architecture', value: 'Ultra-High Modulus Carbon Spike Bed', isHighlight: true },
          { label: 'Torsional Rigidity', value: '98 Nm/rad (Maximum Legal Track)' },
          { label: 'Energy Return', value: '91.8% Instantaneous Snap', isHighlight: true },
          { label: 'Pins', value: '6 Replaceable Titanium 7mm Pins', isHighlight: true },
        ],
      },
      {
        category: 'MASS & PROFILE',
        specs: [
          { label: 'Total Weight', value: '128 grams (Featherweight)', isHighlight: true },
          { label: 'Drop', value: '0 mm Pure Sprint Camber' },
          { label: 'Upper', value: 'Zero-Stretch Monofilament Weave' },
        ],
      },
    ],
    engineeringLayers: [
      { name: 'Ghost Filament Skin', material: 'Single-thread continuous yarn', function: 'Skin-tight structural glove fit' },
      { name: 'Carbon Sprint Chassis', material: 'High-modulus rigid carbon deck', function: 'Zero energy dissipation out of the blocks' },
      { name: 'Titanium Spike Matrix', material: 'Grade 5 aerospace titanium', function: 'Uncompromising track penetration and grip' },
    ],
  },
  {
    id: 'kinetic-apex-terrain-tactix',
    name: 'APEX TERRAIN TACTIX',
    code: 'KP-ATT-04',
    category: 'Technical Trail',
    price: 240,
    weightGrams: 245,
    energyReturnPct: 81.2,
    carbonPlate: 'Segmented Carbon Rock Shield w/ Flex Hinges',
    stackHeight: '34.0mm / 28.0mm',
    dropMm: 6,
    foamCompound: 'Dense Dampening Supercritical EVA-PEBA Blend',
    outsole: '5.5mm Multi-Directional Chevron Rubber Lugs',
    velocityIndex: 93.7,
    image: '/src/assets/images/shoe_apex_trail_1793907456497.jpg',
    badge: {
      type: 'spec',
      label: 'CARBON ROCK SHIELD',
    },
    colorways: [
      { name: 'Dark Obsidian / Hyper Orange', primaryHex: '#161920', accentHex: '#FF5500' },
      { name: 'Granite Slate / Volt', primaryHex: '#333539', accentHex: '#D4FF00' },
    ],
    sizes: [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    tagline: 'Technical alpine velocity engine equipped with protective carbon rock shield and mud lugs.',
    description: 'Conquer jagged scree, slick roots, and aggressive descents. The Apex Terrain Tactix integrates an articulating carbon plate that shields the metatarsals while delivering uphill rebound.',
    specTable: [
      {
        category: 'PROTECTION & CHASSIS',
        specs: [
          { label: 'Rock Protection', value: 'Articulated Carbon Composite Shield', isHighlight: true },
          { label: 'Lug Depth', value: '5.5 mm Deep Mud Clearing Chevrons', isHighlight: true },
          { label: 'Outsole Rubber', value: 'Vibram Megagrip Wet-Traction' },
        ],
      },
      {
        category: 'GEOMETRY & WEAR',
        specs: [
          { label: 'Weight', value: '245 grams (Reinforced)' },
          { label: 'Stack Profile', value: '34.0 mm Heel / 28.0 mm Toe' },
          { label: 'Gaiter Integration', value: 'Dual-Point Micro Hook Ready' },
        ],
      },
    ],
    engineeringLayers: [
      { name: 'Ballistic Cordura Mudguard', material: 'Abrasion-proof woven polymer', function: 'Deflects sharp scree and mud ingress' },
      { name: 'Segmented Carbon Shield', material: 'Multi-flex carbon laminate', function: 'Protects against sharp rock strikes' },
      { name: '5.5mm Chevron Lug Base', material: 'Sticky wet-compound rubber', function: 'Tenacious mechanical interlock on steep trails' },
    ],
  },
  {
    id: 'kinetic-aero-vane-tempo',
    name: 'AERO VANE TEMPO RACER',
    code: 'KP-AVT-05',
    category: 'Road Marathon',
    price: 220,
    weightGrams: 198,
    energyReturnPct: 84.8,
    carbonPlate: 'Parallel Twin Carbon Struts',
    stackHeight: '36.0mm / 28.0mm',
    dropMm: 8,
    foamCompound: 'Hyper-Resilient Nitrogen EVA Core',
    outsole: 'Micro-Grid High Abrasion Rubber',
    velocityIndex: 94.9,
    image: '/src/assets/images/hero_hyper_velocity_1793907454532.jpg',
    badge: {
      type: 'spec',
      label: 'TEMPO & THRESHOLD CALIBRATED',
    },
    colorways: [
      { name: 'Polar White / Hyper Orange', primaryHex: '#FFFFFF', accentHex: '#FF5500' },
      { name: 'Obsidian / Volt', primaryHex: '#161920', accentHex: '#D4FF00' },
    ],
    sizes: [7, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    tagline: 'High-durability carbon tempo shoe for fast weekly workouts and half-marathon races.',
    description: 'Designed to soak up 600km of intense race-pace training without losing energy rebound. Uses parallel twin carbon struts to offer natural foot roll on long tempo efforts.',
    specTable: [
      {
        category: 'TRAINING SPECIFICATION',
        specs: [
          { label: 'Plate System', value: 'Dual Twin Carbon Struts', isHighlight: true },
          { label: 'Lifespan Rating', value: '600+ km High Durability', isHighlight: true },
          { label: 'Energy Return', value: '84.8% Measured' },
        ],
      },
    ],
    engineeringLayers: [
      { name: 'Breathable Jacquard Knit', material: 'Reinforced dual-density knit', function: 'Structural ventilation across midfoot' },
      { name: 'Twin Carbon Struts', material: 'High-tensile composite tubes', function: 'Forward spring with relaxed lateral give' },
      { name: 'Durable Nitro-EVA Core', material: 'Polymer foam alloy', function: 'Maintains rebound resilience across 600km' },
    ],
  },
  {
    id: 'kinetic-strata-recovery-slide',
    name: 'STRATA COMPRESSION SLIDE',
    code: 'KP-SCS-06',
    category: 'Recovery',
    price: 95,
    weightGrams: 140,
    energyReturnPct: 62.0,
    carbonPlate: 'Zero-Plate Anatomical Orthotic Arch Support',
    stackHeight: '44.0mm / 38.0mm',
    dropMm: 6,
    foamCompound: 'Ultra-Plush Zero-Gravity Supercritical Cloud Foam',
    outsole: 'Textured Drainage Wave Sole',
    velocityIndex: 82.0,
    image: '/src/assets/images/shoe_carbon_stridor_1793907455160.jpg',
    badge: {
      type: 'spec',
      label: 'POST-RACE METABOLIC REST',
    },
    colorways: [
      { name: 'Obsidian Charcoal', primaryHex: '#161920', accentHex: '#2A303C' },
      { name: 'Hyper Orange Edition', primaryHex: '#FF5500', accentHex: '#0F1115' },
    ],
    sizes: [7, 8, 9, 10, 11, 12, 13],
    tagline: 'Hyper-cushioned anatomical slide to decompress plantar fascia and expedite lymphatic return.',
    description: 'Engineered specifically for the critical 2 hours following intense competition. The 44mm stack of ultra-plush cloud foam relieves plantar pressure and promotes rapid micro-circulation.',
    specTable: [
      {
        category: 'PHYSIOLOGICAL RECOVERY',
        specs: [
          { label: 'Plantar Pressure Relief', value: '-34% Peak Forefoot Impact', isHighlight: true },
          { label: 'Stack Height', value: '44.0 mm Ultra-Cushion', isHighlight: true },
          { label: 'Footbed', value: 'Textured Lymphatic Micro-Nodes' },
        ],
      },
    ],
    engineeringLayers: [
      { name: 'Ergonomic Bridge Band', material: 'Seamless molded neoprene', function: 'Chafe-free foot instep security' },
      { name: 'Lymphatic Node Footbed', material: 'Textured micro-cell surface', function: 'Stimulates peripheral blood flow' },
      { name: 'Zero-Gravity Cloud Foam', material: 'Super-soft low durometer foam', function: 'Complete ground shock dampening' },
    ],
  },
];
