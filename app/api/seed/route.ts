import { NextResponse } from 'next/server'
import { redis, KEYS } from '@/lib/redis'

const SEED_SECRET = process.env.SEED_SECRET

type ProductExt = 'core' | 'kids' | 'pets' | 'tech'
type ProductCat = 'sip' | 'savor' | 'go' | 'accessories'

type PaletteColor = {
  n: string
  c: string
  h: string
}

type ProductColor = {
  name: string
  code: string
  hex: string
  sku: string
}

type ProductDimensions = {
  headers: string[]
  rows: string[][]
}

type Product = {
  id: string
  name: string
  ext: ProductExt
  cat: ProductCat
  desc: string
  badges: string[]
  srp: number
  packing: number
  colors: ProductColor[]
  images: string[]
  dimensions: ProductDimensions
  barcode: string
  barcodeImage: string
  qrCode: string
  qrImage: string
  youtube: string
  createdAt?: string
  updatedAt?: string
}

const OG: PaletteColor[] = [
  { n: 'Snow', c: 'WT', h: '#F5F5F0' },
  { n: 'Sand', c: 'TP', h: '#C8C5BE' },
  { n: 'Stone', c: 'GY', h: '#8A8780' },
  { n: 'Onyx', c: 'BK', h: '#2A2A28' },
]

const XP: PaletteColor[] = [
  ...OG,
  { n: 'Autumn Sunset', c: 'AS', h: '#D4894A' },
  { n: 'Forest Green', c: 'FG', h: '#3D6B4F' },
  { n: 'Twilight Teal', c: 'TT', h: '#2B8090' },
  { n: 'Coral Oasis', c: 'CO', h: '#E8524A' },
]

const BLOOM: PaletteColor[] = [
  { n: 'Sky', c: 'SK', h: '#88C4E8' },
  { n: 'Meadow', c: 'ME', h: '#C9E6A4' },
  { n: 'Coral', c: 'CO', h: '#FF9B70' },
  { n: 'Blossom', c: 'BL', h: '#F9B5C8' },
]

const POPLY: PaletteColor[] = [
  { n: 'Bubbly', c: 'BU', h: '#35BFE6' },
  { n: 'Minty', c: 'MI', h: '#45C8B8' },
  { n: 'Purpy', c: 'PU', h: '#B08AD8' },
  { n: 'Rosy', c: 'RO', h: '#F05A9D' },
]

const COOLER: PaletteColor[] = [
  { n: 'Sand', c: 'TP', h: '#C8C5BE' },
  { n: 'Stone', c: 'GY', h: '#8A8780' },
  { n: 'Onyx', c: 'BK', h: '#2A2A28' },
]

const PET_BOWL_940: PaletteColor[] = [
  { n: 'Snow', c: 'WT', h: '#F5F5F0' },
  { n: 'Stone', c: 'GY', h: '#8A8780' },
  { n: 'Onyx', c: 'BK', h: '#2A2A28' },
]

const ZODIAC: ProductColor[] = [
  { name: 'Aquarius', code: 'AQ', hex: '#111111', sku: 'QNH-NBMZOD-AQ' },
  { name: 'Pisces', code: 'PI', hex: '#111111', sku: 'QNH-NBMZOD-PI' },
  { name: 'Aries', code: 'AR', hex: '#111111', sku: 'QNH-NBMZOD-AR' },
  { name: 'Taurus', code: 'TA', hex: '#111111', sku: 'QNH-NBMZOD-TA' },
  { name: 'Gemini', code: 'GE', hex: '#111111', sku: 'QNH-NBMZOD-GE' },
  { name: 'Cancer', code: 'CA', hex: '#111111', sku: 'QNH-NBMZOD-CA' },
  { name: 'Leo', code: 'LE', hex: '#111111', sku: 'QNH-NBMZOD-LE' },
  { name: 'Virgo', code: 'VI', hex: '#111111', sku: 'QNH-NBMZOD-VI' },
  { name: 'Libra', code: 'LI', hex: '#111111', sku: 'QNH-NBMZOD-LI' },
  { name: 'Scorpio', code: 'SC', hex: '#111111', sku: 'QNH-NBMZOD-SC' },
  { name: 'Sagittarius', code: 'SA', hex: '#111111', sku: 'QNH-NBMZOD-SA' },
  { name: 'Capricorn', code: 'CP', hex: '#111111', sku: 'QNH-NBMZOD-CP' },
]

const SINGLE_REFILL: ProductColor[] = [
  { name: 'Refill Set', code: 'RF', hex: '#F5F5F0', sku: 'QNH-PLRR' },
]

function mk(base: string, pal: PaletteColor[]): ProductColor[] {
  return pal.map(c => ({ name: c.n, code: c.c, hex: c.h, sku: `${base}-${c.c}` }))
}

function product(
  id: string,
  name: string,
  ext: ProductExt,
  cat: ProductCat,
  desc: string,
  badges: string[],
  srp: number,
  packing: number,
  colors: ProductColor[],
): Product {
  return {
    id,
    name,
    ext,
    cat,
    desc,
    badges,
    srp,
    packing,
    colors,
    images: [],
    dimensions: { headers: [''], rows: [['']] },
    barcode: '',
    barcodeImage: '',
    qrCode: '',
    qrImage: '',
    youtube: '',
  }
}

const INSULATED_BADGES = ['Double Wall', 'BPA-Free', 'Temp. Retention', '18/8 Stainless Steel', 'Powder Coated']
const PLASTIC_BOTTLE_BADGES = ['BPA-Free', 'Polypropylene', 'Leak-Proof']
const TRAVEL_BOTTLE_BADGES = ['Dual Spout', 'BPA-Free', 'Built-in Straw', 'Leak-Proof', 'Rubberized Grip', 'Hot Temp.']
const LUNCH_STEEL_BADGES = ['20/10 Stainless Steel', 'BPA-Free', 'Air-Vent', 'Silicone Seal Ring', 'Hot Temp.']
const LUNCH_PP_BADGES = ['BPA-Free', 'Air-Vent', 'Silicone Seal Ring', 'Hot Temp.']
const FOOD_STORAGE_BADGES = ['BPA-Free', 'Leak-Proof', 'Silicone Seal Ring', 'Stackable Lid']
const NEW_BONE_BADGES = ['New Bone Porcelain', '100% Lead-Free', 'Strong & Durable', 'Hot Temp.']
const GLASS_BOTTLE_BADGES = ['Borosilicate', 'BPA-Free', 'Leak-Proof', 'Silicone Sleeve', 'Hot Temp.', 'Cold Temp.']
const BAG_BADGES = ['Oxford Fabric', 'BPA-Free', 'Temp. Retention', 'Water Proof']
const SILICONE_BADGES = ['BPA-Free', 'Thermal Silicone', 'Non-Slip']
const COOLER_BADGES = ['36h Maintains Cold Temp.', 'Heavy-Duty PP Body', 'Spacious & Efficient', 'Secure Tight-Seal Lid', 'Temp. Retention', 'BPA-Free']

const PRODUCTS_TO_ADD: Product[] = [
  product('qnh-dfit550', 'Dual Flow Insulated Tumbler 550ml', 'core', 'sip', 'Insulated tumbler with a 2-way spout lid for hot or cold drinks, designed for everyday hydration and temperature retention.', INSULATED_BADGES, 799.75, 25, mk('QNH-DFIT550', OG)),
  product('qnh-dfit900', 'Dual Flow Insulated Tumbler 900ml', 'core', 'sip', 'Larger 2-way spout insulated tumbler for all-day hydration with double-wall vacuum insulation.', INSULATED_BADGES, 999.75, 16, mk('QNH-DFIT900', OG)),
  product('qnh-it550', 'Insulated Tumbler 550ml with Silicone Boot', 'core', 'sip', 'Insulated tumbler with protective silicone boot for a non-slip grip and added everyday durability.', INSULATED_BADGES, 799.75, 16, mk('QNH-IT550', XP)),
  product('qnh-it1100', 'Insulated Tumbler 1100ml with Silicone Boot', 'core', 'sip', 'Extra-large insulated tumbler with silicone boot, ideal for gym, school, office, and long workdays.', INSULATED_BADGES, 999.75, 8, mk('QNH-IT1100', XP)),
  product('qnh-imt1100', 'Insulated Mug Tumbler 1100ml', 'core', 'sip', 'Large insulated mug tumbler with handle and straw lid for coffee, tea, and cold beverages.', INSULATED_BADGES, 799.75, 12, mk('QNH-IMT1100', XP)),
  product('qnh-icm400', 'Insulated Coffee Mug 400ml', 'core', 'sip', 'Insulated desk coffee mug with lid, designed for home and office use.', INSULATED_BADGES, 799.75, 16, mk('QNH-ICM400', OG)),
  product('qnh-ict600', 'Insulated Coffee Tumbler 600ml', 'core', 'sip', 'Portable insulated coffee tumbler for keeping drinks hot or cold while on the go.', INSULATED_BADGES, 799.75, 16, mk('QNH-ICT600', OG)),
  product('qnh-sit2200', 'Insulated Sports Water Tumbler 2200ml', 'core', 'sip', 'Large insulated sports water tumbler built for athletes, outdoor use, and long hydration needs.', INSULATED_BADGES, 1999.75, 8, mk('QNH-SIT2200', OG)),
  product('qnh-iwj2100', 'Insulated Water Jug 2100ml', 'core', 'sip', 'Heavy-duty insulated water jug with carry handle for outdoor activities, camping, and sports events.', INSULATED_BADGES, 1999.75, 6, mk('QNH-IWJ2100', OG)),
  product('qnh-iwj3800', 'Insulated Water Jug 3800ml', 'core', 'sip', 'Large-capacity insulated water jug made for extended outdoor, sports, and travel hydration.', INSULATED_BADGES, 2299.75, 6, mk('QNH-IWJ3800', OG)),
  product('qnh-wb500', 'Water Bottle 500ml', 'core', 'sip', 'Lightweight BPA-free plastic water bottle with secure lid for everyday hydration.', PLASTIC_BOTTLE_BADGES, 149.75, 24, mk('QNH-WB500', XP)),
  product('qnh-wb1100', 'Water Bottle 1100ml', 'core', 'sip', 'Large reusable BPA-free plastic water bottle for school, office, workouts, and daily use.', PLASTIC_BOTTLE_BADGES, 199.75, 24, mk('QNH-WB1100', XP)),
  product('qnh-twb680', 'Travel Water Bottle 680ml', 'core', 'sip', 'Travel plastic water bottle with dual spout, built-in straw, rubberized grip, and leak-proof design.', TRAVEL_BOTTLE_BADGES, 299.75, 24, mk('QNH-TWB680', XP)),
  product('qnh-ilb1300', 'Insulated Lunch Box 1300ml', 'core', 'savor', 'Two-layer insulated lunch box that separates food and helps maintain meal temperature while on the go.', LUNCH_STEEL_BADGES, 749.75, 36, mk('QNH-ILB1300', OG)),
  product('qnh-lb800', 'Lunch Box 800ml', 'core', 'savor', 'Lunch box with stainless steel detachable tray, designed for carrying meals safely and conveniently.', LUNCH_STEEL_BADGES, 549.75, 36, mk('QNH-LB800', XP)),
  product('qnh-lb1200', 'Lunch Box 1200ml', 'core', 'savor', 'Lightweight PP lunch box for meals on the go, made with durable plastic materials and convenient compartments.', LUNCH_PP_BADGES, 349.75, 48, mk('QNH-LB1200', XP)),
  product('qnh-lb1100', 'Lunch Box 1100ml', 'core', 'savor', 'Compact lunch box with secure lid and portion-friendly inner container for daily meals.', ['BPA-Free', 'Leak-Proof', 'Silicone Seal Ring', 'Hot Temp.'], 349.75, 48, mk('QNH-LB1100', OG)),
  product('qnh-pcs', 'Portable Cutlery Set', 'core', 'accessories', 'Compact portable cutlery set with spoon, fork, and case for meals at work, school, travel, and picnics.', ['304 Stainless Steel', 'BPA-Free'], 349.75, 72, mk('QNH-PCS', XP)),
  product('qnh-fscs230', 'Food Storage Container Set 230ml', 'core', 'savor', 'Stackable food storage container set for meal prep, snacks, and kitchen organization.', FOOD_STORAGE_BADGES, 399.75, 36, mk('QNH-FSCS230', XP)),
  product('qnh-fscs390', 'Food Storage Container Set 390ml', 'core', 'savor', 'Medium stackable food storage container set with silicone seal ring and secure snap-lock lid.', FOOD_STORAGE_BADGES, 399.75, 36, mk('QNH-FSCS390', XP)),
  product('qnh-adlb', 'Insulated Lunch Bag', 'core', 'go', 'Insulated lunch bag for keeping meals fresh and easy to carry for work, school, and weekend trips.', BAG_BADGES, 799.75, 12, mk('QNH-ADLB', OG)),
  product('qnh-gwb500', 'Glass Water Bottle 500ml', 'core', 'sip', 'Glass water bottle with borosilicate body, silicone sleeve, and leak-proof design for clean daily hydration.', GLASS_BOTTLE_BADGES, 399.75, 24, mk('QNH-GWB500', OG)),
  product('qnh-gwb350', 'Glass Water Bottle 350ml', 'core', 'sip', 'Compact borosilicate glass water bottle with silicone sleeve and leak-proof lid.', GLASS_BOTTLE_BADGES, 299.75, 36, mk('QNH-GWB350', OG)),
  product('qnh-gcc330', 'Glass Coffee Cup 330ml', 'core', 'sip', 'Glass coffee cup with sleeve and secure lid for coffee, tea, and everyday drinks.', ['Borosilicate', 'BPA-Free', 'Leak-Proof', 'Hot Temp.', 'Cold Temp.'], 229.75, 24, mk('QNH-GCC330', OG)),
  product('qnh-gct380', 'Glass Coffee Tumbler 380ml', 'core', 'sip', 'Reusable glass coffee tumbler with sleeve and lid for stylish on-the-go drinks.', ['Borosilicate', 'BPA-Free', 'Leak-Proof', 'Hot Temp.', 'Cold Temp.'], 229.75, 24, mk('QNH-GCT380', XP)),
  product('qnh-fcp350', 'French Coffee Press 350ml', 'core', 'sip', 'Compact French coffee press for brewing rich coffee at home, office, or travel.', ['Borosilicate', 'BPA-Free', '18/8 Stainless Steel', 'Silicone Sleeve'], 399.75, 30, mk('QNH-FCP350', OG)),
  product('qnh-cg150', 'Coffee Grinder 150g', 'core', 'accessories', 'Manual coffee grinder for freshly ground coffee with compact everyday-friendly design.', ['Manual Grinder', 'BPA-Free', 'Durable', 'Coffee Essential'], 599.75, 25, mk('QNH-CG150', OG)),
  product('qnh-nbmlin325', 'New Bone Porcelain Mug 325ml — Linear', 'core', 'savor', 'New Bone porcelain mug with linear design, made for elegant everyday coffee and tea moments.', NEW_BONE_BADGES, 129.75, 36, mk('QNH-NBMLIN', XP)),
  product('qnh-nbmdia325', 'New Bone Porcelain Mug 325ml — Diamond', 'core', 'savor', 'New Bone porcelain mug with diamond design, combining durability, elegance, and daily practicality.', NEW_BONE_BADGES, 129.75, 36, mk('QNH-NBMDIA', XP)),
  product('qnh-nbmzod325', 'New Bone Zodiac Mug 325ml', 'core', 'savor', 'Black New Bone porcelain zodiac mug with gold zodiac artwork designs.', NEW_BONE_BADGES, 179.75, 36, ZODIAC),
  product('qnh-kdlp', 'Kids Lunch Pack', 'kids', 'go', 'Kids lunch pack designed for carrying lunch essentials with playful colors and school-ready style.', ['BPA-Free', 'Kid-Friendly', 'Portable', 'Easy Carry'], 829.75, 16, mk('QNH-KDLP', BLOOM)),
  product('qnh-kdwb520', 'Kids Water Bottle 520ml — Bloom', 'kids', 'sip', 'Kids water bottle from the Bloom collection with playful colors and easy everyday hydration.', ['BPA-Free', 'Built-in Straw', 'Leak-Proof', 'Kid-Friendly'], 429.75, 24, mk('QNH-KDWB520', BLOOM)),
  product('qnh-kdtwb500-bloom', 'Kids Travel Water Bottle 500ml — Bloom', 'kids', 'sip', 'Spill-proof kids travel water bottle with built-in straw, rubber grip, and Bloom colorways.', ['Dual Speed Lid', 'BPA-Free', 'Built-in Straw', 'Leak-Proof', 'Rubber Grip'], 249.75, 24, mk('QNH-KDTWB500', BLOOM)),
  product('qnh-kfscs230', 'Kids Food Storage Container Set 230ml — Bloom', 'kids', 'savor', 'Kids food storage container set for snacks, sides, and school baon organization.', FOOD_STORAGE_BADGES, 399.75, 36, mk('QNH-KFSCS230', BLOOM)),
  product('qnh-kfscs390', 'Kids Food Storage Container Set 390ml — Bloom', 'kids', 'savor', 'Medium kids food storage container set with secure seal and stackable design.', FOOD_STORAGE_BADGES, 399.75, 36, mk('QNH-KFSCS390', BLOOM)),
  product('qnh-kdfit400-poply', 'Dual Flow Insulated Tumbler 400ml — Poply', 'kids', 'sip', 'Bright Poply insulated tumbler for kids with dual-flow drinking and temperature retention.', INSULATED_BADGES, 699.75, 25, mk('QNH-KDFIT400', POPLY)),
  product('qnh-kdwb650-poply', 'Kids Water Bottle 650ml — Poply', 'kids', 'sip', 'Playful Poply kids water bottle designed for school, outdoor activities, and everyday hydration.', ['BPA-Free', 'Built-in Straw', 'Leak-Proof', 'Kid-Friendly'], 249.75, 24, mk('QNH-KDWB650', POPLY)),
  product('qnh-kdlb1800-poply', 'Kids Lunch Box 1800ml — Poply', 'kids', 'savor', 'Spacious Poply kids lunch box for baon, snacks, and school meals.', ['BPA-Free', 'Air-Vent', 'Silicone Seal Ring', 'Kid-Friendly'], 799.75, 24, mk('QNH-KDLB1800', POPLY)),
  product('qnh-boots-poply', 'Silicone Boot — Poply', 'kids', 'accessories', 'Protective silicone boot in Poply colors for added grip and bottle protection.', SILICONE_BADGES, 129.75, 100, mk('QNH-BOOTS', POPLY)),
  product('qnh-boots-core', 'Silicone Boot 20oz', 'core', 'accessories', 'Protective silicone boot for tumblers, designed to reduce scratches and add a non-slip base.', SILICONE_BADGES, 129.75, 100, mk('QNH-BOOTS', XP)),
  product('qnh-bootl', 'Silicone Boot 37oz', 'core', 'accessories', 'Large protective silicone boot designed for compatible tumblers, helping prevent dents, scratches, and slips.', SILICONE_BADGES, 149.75, 100, mk('QNH-BOOTL', XP)),
  product('qnh-lid', 'Lid Cap', 'core', 'accessories', 'Replacement lid cap for compatible Quencha drinkware.', ['BPA-Free', 'Secure Fit', 'Leak-Proof', 'Replacement Part'], 199.75, 100, mk('QNH-LID', XP)),
  product('qnh-cord', 'Paracord Handle', 'core', 'accessories', 'Durable paracord handle accessory for compatible tumblers and bottles.', ['Paracord', 'Durable', 'Portable', 'Easy Carry'], 129.75, 100, mk('QNH-CORD', XP)),
  product('qnh-coaster', 'Silicone Coaster and Lid Set', 'core', 'accessories', 'Silicone coaster and lid set for added protection, grip, and daily drinkware convenience.', ['BPA-Free', 'Silicone', 'Non-Slip', 'Heat Resistant'], 199.75, 100, mk('QNH-COASTER', XP)),
  product('qnh-parkey', 'Paracord Keychain', 'core', 'accessories', 'Paracord keychain accessory in Quencha colors for bags, bottles, and daily carry.', ['Paracord', 'Durable', 'Portable'], 199.75, 100, mk('QNH-PARKEY', XP)),
  product('qnh-ittb', 'Insulated Tote Bag', 'core', 'go', 'Insulated tote bag with thermal lining for keeping meals fresh while on the go.', ['Non-Woven Fabric', 'Water Proof', '14L Capacity', 'Temp. Retention'], 299.75, 60, mk('QNH-ITTB', XP)),
  product('qnh-hssb', 'Hard-Shell Sling Bag', 'core', 'go', 'Hard-shell sling bag for organized carry and everyday protection of essentials.', ['Hard Shell', 'Water Proof', 'Durable', 'Easy Carry'], 499.75, 50, mk('QNH-HSSB', XP)),
  product('qnh-rutb', 'Rubber Tote Bag', 'core', 'go', 'Durable rubber tote bag for daily errands, travel, school, and casual carry.', ['Rubber', 'Water Proof', 'Durable', 'Easy Carry'], 999.75, 15, mk('QNH-RUTB', XP)),
  product('qnh-pb940', 'Pet Bowl 940ml', 'pets', 'accessories', 'Stainless steel pet bowl for clean, durable, and hygienic feeding.', ['Stainless Steel', 'Pet-Safe', 'Durable', 'Easy Clean'], 999.75, 28, mk('QNH-PB940', PET_BOWL_940)),
  product('qnh-pb1800', 'Pet Bowl 1800ml', 'pets', 'accessories', 'Large stainless steel pet bowl for feeding and water with durable pet-friendly construction.', ['Stainless Steel', 'Pet-Safe', 'Durable', 'Easy Clean'], 1199.75, 28, mk('QNH-PB1800', OG)),
  product('qnh-pt550', 'Insulated Pet Tumbler 550ml', 'pets', 'accessories', "Double-wall insulated pet tumbler designed to keep your pet's water fresh during walks and trips.", ['Double Wall', 'BPA-Free', '18/8 Stainless Steel', '18h Cold', '8h Hot'], 799.75, 25, mk('QNH-PT550', OG)),
  product('qnh-plr60', 'Pet Lint Roller 60 Sheets', 'pets', 'accessories', 'Pet lint roller for removing fur and lint from clothing, furniture, bags, and car seats.', ['Pet Care', 'Lint Removal', 'Portable', 'Easy Grip'], 199.75, 48, mk('QNH-PLR60', OG)),
  product('qnh-plrr', '2pc Lint Roller Refill Set', 'pets', 'accessories', 'Two-piece lint roller refill set for compatible Quencha pet lint roller.', ['Pet Care', 'Lint Removal', 'Refill Set'], 199.75, 48, SINGLE_REFILL),
  product('qnh-tpfwf', 'Portable Fan', 'tech', 'accessories', 'Portable fan with compact design for school, office, travel, and everyday cooling.', ['Portable', 'Rechargeable', 'USB Port', 'Compact'], 699.75, 50, mk('QNH-TPFWF', OG)),
  product('qnh-tcoolpf', 'Portable Fan with Stand', 'tech', 'accessories', 'Portable standing fan with rechargeable power and compact everyday cooling design.', ['Portable', 'Rechargeable', 'USB Port', 'Compact'], 999.75, 96, mk('QNH-TCOOLPF', OG)),
  product('qnh-tpdf', 'Portable Desk Fan', 'tech', 'accessories', 'Compact portable desk fan with rechargeable battery for offices, bedrooms, travel, and study spaces.', ['2000mAh Battery', '8hr Operation', '3hr Charging', 'USB Port', 'Compact'], 999.75, 60, mk('QNH-TPDF', OG)),
  product('qnh-cool12', 'Cooler Box 12L', 'core', 'go', 'Insulated cooler box designed to keep food and beverages fresh, cold, and ready for outdoor trips and everyday use.', COOLER_BADGES, 1799.75, 1, mk('QNH-COOL12', COOLER)),
  product('qnh-cool24', 'Cooler Box 24L', 'core', 'go', 'Large insulated cooler box for picnics, beach days, road trips, and everyday cooling needs.', COOLER_BADGES, 2999.75, 1, mk('QNH-COOL24', COOLER)),
]

function normalizeProduct(product: Product, index: number): Product {
  const now = new Date().toISOString()

  return {
    id: product.id || `p${Date.now()}-${index}`,
    name: product.name || '',
    ext: product.ext || 'core',
    cat: product.cat || 'sip',
    desc: product.desc || '',
    badges: product.badges || [],
    srp: Number(product.srp) || 0,
    packing: Number(product.packing) || 0,
    colors: product.colors || [],
    images: product.images || [],
    dimensions: product.dimensions || { headers: [''], rows: [['']] },
    barcode: product.barcode || '',
    barcodeImage: product.barcodeImage || '',
    qrCode: product.qrCode || '',
    qrImage: product.qrImage || '',
    youtube: product.youtube || '',
    createdAt: product.createdAt || now,
    updatedAt: now,
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const key = searchParams.get('key')
    const replace = searchParams.get('replace') === '1' || searchParams.get('replace') === 'true'

    if (SEED_SECRET && key !== SEED_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!PRODUCTS_TO_ADD.length) {
      return NextResponse.json({ message: 'No products in PRODUCTS_TO_ADD yet.', added: 0 })
    }

    if (replace) {
      await redis.del(KEYS.products)
    }

    const entries: Record<string, string> = {}

    PRODUCTS_TO_ADD.forEach((product, index) => {
      const normalized = normalizeProduct(product, index)
      entries[normalized.id] = JSON.stringify(normalized)
    })

    await redis.hset(KEYS.products, entries)

    return NextResponse.json({
      message: replace
        ? `Seed completed. Replaced catalog with ${PRODUCTS_TO_ADD.length} products.`
        : `Seed completed. Added/updated ${PRODUCTS_TO_ADD.length} products.`,
      replace,
      added: PRODUCTS_TO_ADD.length,
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to seed products' }, { status: 500 })
  }
}
