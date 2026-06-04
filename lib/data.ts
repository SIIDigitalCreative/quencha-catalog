import type { Product } from './types'
import { v4 as uuidv4 } from 'uuid'

const now = new Date().toISOString()

const OG = [
  { name: 'Snow',  code: 'WT', hex: '#F5F5F0' },
  { name: 'Sand',  code: 'TP', hex: '#C8C5BE' },
  { name: 'Stone', code: 'GY', hex: '#8A8780' },
  { name: 'Onyx',  code: 'BK', hex: '#2A2A28' },
]
const XPRESS = [
  ...OG,
  { name: 'Autumn Sunset',  code: 'AS', hex: '#D4894A' },
  { name: 'Forest Green',   code: 'FG', hex: '#3D6B4F' },
  { name: 'Twilight Teal',  code: 'TT', hex: '#2B8090' },
  { name: 'Coral Oasis',    code: 'CO', hex: '#E8524A' },
]
const BLOOM = [
  { name: 'Sky',     code: 'SK', hex: '#88C4E8' },
  { name: 'Meadow',  code: 'ME', hex: '#5CBF7A' },
  { name: 'Coral',   code: 'CO', hex: '#FF7A5C' },
  { name: 'Blossom', code: 'BL', hex: '#F9A8C4' },
]
const POPLY = [
  { name: 'Bubbly', code: 'BB', hex: '#57C0E8' },
  { name: 'Minty',  code: 'MT', hex: '#48C8C0' },
  { name: 'Purpy',  code: 'PP', hex: '#B09AD8' },
  { name: 'Rosy',   code: 'RO', hex: '#F070A0' },
]

function mkColors(base: string, palette: typeof OG) {
  return palette.map(c => ({ name: c.name, code: c.code, hex: c.hex, sku: `${base}-${c.code}` }))
}

export const SEED_PRODUCTS: Product[] = [
  // ── SIP ──────────────────────────────────────────────────────────
  {
    id: uuidv4(), name: 'Dual Flow Insulated Tumbler 550ml',
    ext: 'core', cat: 'sip',
    desc: 'An insulated tumbler with 2-way spout lid designed to keep beverages at the desired temperature. Offers versatility with two drinking options. Double wall vacuum insulation keeps drinks cold up to 24h and hot up to 12h.',
    badges: ['Double Wall', 'BPA-Free', 'Temp. Retention', '18/8 Stainless Steel', 'Powder Coated'],
    srp: 799.75, packing: 25,
    colors: mkColors('QNH-DFIT550', OG), images: [], createdAt: now, updatedAt: now,
  },
  {
    id: uuidv4(), name: 'Dual Flow Insulated Tumbler 900ml',
    ext: 'core', cat: 'sip',
    desc: 'Larger 2-way spout insulated tumbler for all-day hydration. Same dual flow technology in a bigger 900ml capacity.',
    badges: ['Double Wall', 'BPA-Free', 'Temp. Retention', '18/8 Stainless Steel', 'Powder Coated'],
    srp: 999.75, packing: 16,
    colors: mkColors('QNH-DFIT900', OG), images: [], createdAt: now, updatedAt: now,
  },
  {
    id: uuidv4(), name: 'Insulated Tumbler 550ml with Silicone Boot',
    ext: 'core', cat: 'sip',
    desc: 'Insulated tumbler with protective silicone boot for a non-slip grip. BPA-free, keeps drinks cold or hot all day with 8-color XPRESS palette.',
    badges: ['Double Wall', 'BPA-Free', 'Temp. Retention', '18/8 Stainless Steel', 'Powder Coated'],
    srp: 799.75, packing: 16,
    colors: mkColors('QNH-IT550', XPRESS), images: [], createdAt: now, updatedAt: now,
  },
  {
    id: uuidv4(), name: 'Insulated Tumbler 1100ml with Silicone Boot',
    ext: 'core', cat: 'sip',
    desc: 'Extra-large insulated tumbler with silicone boot. Perfect for athletes, gym sessions, and long workdays. Available in 8 XPRESS colors.',
    badges: ['Double Wall', 'BPA-Free', 'Temp. Retention', '18/8 Stainless Steel', 'Powder Coated'],
    srp: 999.75, packing: 8,
    colors: mkColors('QNH-IT1100', XPRESS), images: [], createdAt: now, updatedAt: now,
  },
  {
    id: uuidv4(), name: 'Insulated Sports Water Tumbler 2200ml',
    ext: 'core', cat: 'sip',
    desc: 'Massive insulated sports jug designed for athletes and outdoor enthusiasts. Double wall vacuum insulation maintains temperature for extended periods.',
    badges: ['Double Wall', 'BPA-Free', 'Temp. Retention', '18/8 Stainless Steel', 'Powder Coated'],
    srp: 1999.75, packing: 8,
    colors: mkColors('QNH-SIT2200', OG), images: [], createdAt: now, updatedAt: now,
  },
  {
    id: uuidv4(), name: 'Insulated Mug Tumbler 1100ml',
    ext: 'core', cat: 'sip',
    desc: 'An insulated coffee mug tumbler with handle and straw lid — designed for home, office, or on-the-go use. Keeps coffee at the perfect temperature all day long.',
    badges: ['Double Wall', 'BPA-Free', 'Temp. Retention', '18/8 Stainless Steel', 'Powder Coated'],
    srp: 799.75, packing: 12,
    colors: mkColors('QNH-IMT1100', XPRESS), images: [], createdAt: now, updatedAt: now,
  },
  {
    id: uuidv4(), name: 'Insulated Coffee Mug 400ml',
    ext: 'core', cat: 'sip',
    desc: 'An insulated desk coffee mug with flip lid, designed for home or office use. Keeps coffee at the perfect temperature while you work.',
    badges: ['Double Wall', 'BPA-Free', 'Temp. Retention', '18/8 Stainless Steel', 'Powder Coated'],
    srp: 799.75, packing: 16,
    colors: mkColors('QNH-ICM400', OG), images: [], createdAt: now, updatedAt: now,
  },
  {
    id: uuidv4(), name: 'Insulated Water Jug 2100ml',
    ext: 'core', cat: 'sip',
    desc: 'Heavy-duty insulated water jug with carry handle. Ideal for outdoor activities, camping, sports events, and group hydration.',
    badges: ['Double Wall', 'BPA-Free', 'Temp. Retention', '18/8 Stainless Steel', 'Powder Coated'],
    srp: 1999.75, packing: 6,
    colors: mkColors('QNH-IWJ2100', OG), images: [], createdAt: now, updatedAt: now,
  },
  {
    id: uuidv4(), name: 'Water Bottle 1100ml',
    ext: 'core', cat: 'sip',
    desc: 'BPA-free polypropylene water bottle with leak-proof lid. Lightweight and perfect for everyday hydration at school, work, or the gym.',
    badges: ['BPA-Free', 'Polypropylene', 'Leak-Proof'],
    srp: 199.75, packing: 24,
    colors: mkColors('QNH-WB1100', XPRESS), images: [], createdAt: now, updatedAt: now,
  },
  // ── SAVOR ──────────────────────────────────────────────────────────
  {
    id: uuidv4(), name: 'Insulated Lunch Box 1300ml',
    ext: 'core', cat: 'savor',
    desc: '2-layer insulated lunch box that keeps meals warm or cold on-the-go. Dual layers separate different food types in one compact container with air-vent lid.',
    badges: ['20/10 Stainless Steel', 'BPA-Free', 'Air-Vent', 'Silicone Seal Ring', 'Hot Temp.'],
    srp: 749.75, packing: 36,
    colors: mkColors('QNH-ILB1300', OG), images: [], createdAt: now, updatedAt: now,
  },
  {
    id: uuidv4(), name: 'Food Storage Container Set 230ml',
    ext: 'core', cat: 'savor',
    desc: 'Stackable BPA-free food storage containers with silicone seal ring and snap-lock lid. Perfect for meal prep, portion control, and daily lunches.',
    badges: ['BPA-Free', 'Leak-Proof', 'Silicone Seal Ring', 'Stackable Lid'],
    srp: 399.75, packing: 36,
    colors: mkColors('QNH-FSCS230', XPRESS), images: [], createdAt: now, updatedAt: now,
  },
  {
    id: uuidv4(), name: 'Food Storage Container Set 390ml',
    ext: 'core', cat: 'savor',
    desc: 'Medium stackable BPA-free food storage containers with secure snap-lock lid. Larger capacity for bigger meals with the same secure seal.',
    badges: ['BPA-Free', 'Leak-Proof', 'Silicone Seal Ring', 'Stackable Lid'],
    srp: 399.75, packing: 36,
    colors: mkColors('QNH-FSCS390', XPRESS), images: [], createdAt: now, updatedAt: now,
  },
  {
    id: uuidv4(), name: 'New Bone Porcelain Mug 325ml',
    ext: 'core', cat: 'savor',
    desc: 'Exquisite New Bone China mugs crafted from fine Bone China. Renowned for delicate appearance and exceptional durability. 100% lead-free with a perfect balance of elegance and practicality.',
    badges: ['New Bone Porcelain', '100% Lead-Free', 'Strong & Durable', 'Hot Temp.'],
    srp: 129.75, packing: 36,
    colors: mkColors('QNH-NBMDIA', XPRESS), images: [], createdAt: now, updatedAt: now,
  },
  // ── GO ──────────────────────────────────────────────────────────
  {
    id: uuidv4(), name: 'Insulated Tote Bag',
    ext: 'core', cat: 'go',
    desc: 'Thermal tote bag with high-quality insulated lining. Keeps meals fresh and drinks perfectly chilled on the go. 14L capacity, water-proof non-woven fabric construction.',
    badges: ['Non-Woven Fabric', 'Water Proof', '14L Capacity', 'Temp. Retention'],
    srp: 299.75, packing: 60,
    colors: mkColors('QNH-ITTB', XPRESS), images: [], createdAt: now, updatedAt: now,
  },
  // ── ACCESSORIES ──────────────────────────────────────────────────
  {
    id: uuidv4(), name: 'Silicone Boot 37oz',
    ext: 'core', cat: 'accessories',
    desc: 'Protective silicone boot designed to fit snugly around the bottom of your tumbler. Non-slip grip cushions tumbler to prevent dents, scratches, and spills.',
    badges: ['Non-Slip', 'BPA-Free', 'Thermal Silicone'],
    srp: 149.75, packing: 100,
    colors: mkColors('QNH-BOOTL', XPRESS), images: [], createdAt: now, updatedAt: now,
  },
  // ── KIDS ──────────────────────────────────────────────────────────
  {
    id: uuidv4(), name: 'Kids Travel Water Bottle 500ml (Bloom)',
    ext: 'kids', cat: 'sip',
    desc: 'Spill-proof kids water bottle with easy-grip, built-in straw, and vibrant playful Bloom designs. BPA-free polycarbonate. Perfect for school, sports, and outdoor adventures.',
    badges: ['Dual Speed Lid', 'BPA-Free', 'Built-in Straw', 'Leak-Proof', 'Rubber Grip'],
    srp: 249.75, packing: 24,
    colors: mkColors('QNH-KDTWB500', BLOOM), images: [], createdAt: now, updatedAt: now,
  },
  {
    id: uuidv4(), name: 'Kids Travel Water Bottle 500ml (Poply)',
    ext: 'kids', cat: 'sip',
    desc: 'Bold and playful kids water bottle in the vibrant Poply collection. Spill-proof lid, built-in straw, and BPA-free polycarbonate for safe everyday use.',
    badges: ['Dual Speed Lid', 'BPA-Free', 'Built-in Straw', 'Leak-Proof', 'Rubber Grip'],
    srp: 249.75, packing: 24,
    colors: mkColors('QNH-KDTWBP500', POPLY), images: [], createdAt: now, updatedAt: now,
  },
  // ── PETS ──────────────────────────────────────────────────────────
  {
    id: uuidv4(), name: 'Insulated Pet Tumbler 550ml',
    ext: 'pets', cat: 'accessories',
    desc: 'Specially designed double-wall insulated pet tumbler. Keeps your pet\'s water cool and fresh for up to 18 hours cold and 8 hours hot. Portable, leak-proof — perfect for outdoor activities and travel.',
    badges: ['Double Wall', 'BPA-Free', 'Temp. Retention', '18/8 Stainless Steel', 'Powder Coated', '18h Cold', '8h Hot'],
    srp: 799.75, packing: 25,
    colors: mkColors('QNH-PT550', OG), images: [], createdAt: now, updatedAt: now,
  },
  // ── TECH ──────────────────────────────────────────────────────────
  {
    id: uuidv4(), name: 'Portable Desk Fan',
    ext: 'tech', cat: 'accessories',
    desc: 'Compact, lightweight portable desk fan. 2000mAh battery capacity, 8hrs operating time, 3hr charging time. USB-powered with compact charging port. Perfect for offices, bedrooms, and travel.',
    badges: ['2000mAh Battery', '8hr Operation', '3hr Charging', 'USB Port', 'Compact & Lightweight'],
    srp: 999.75, packing: 60,
    colors: mkColors('QNH-TPDF', OG), images: [], createdAt: now, updatedAt: now,
  },
]
