'use client'
import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
 
// ─── SEED DATA ───────────────────────────────────────────────────────────────
const now = new Date().toISOString()
 
const OG = [
  { n: 'Snow', c: 'WT', h: '#F5F5F0' },
  { n: 'Sand', c: 'TP', h: '#C8C5BE' },
  { n: 'Stone', c: 'GY', h: '#8A8780' },
  { n: 'Onyx', c: 'BK', h: '#2A2A28' },
]
 
const XP = [
  ...OG,
  { n: 'Autumn Sunset', c: 'AS', h: '#D4894A' },
  { n: 'Forest Green', c: 'FG', h: '#3D6B4F' },
  { n: 'Twilight Teal', c: 'TT', h: '#2B8090' },
  { n: 'Coral Oasis', c: 'CO', h: '#E8524A' },
]
 
const BLOOM = [
  { n: 'Sky', c: 'SK', h: '#88C4E8' },
  { n: 'Meadow', c: 'ME', h: '#5CBF7A' },
  { n: 'Coral', c: 'CO', h: '#FF7A5C' },
  { n: 'Blossom', c: 'BL', h: '#F9A8C4' },
]
 
const POPLY = [
  { n: 'Bubbly', c: 'BB', h: '#57C0E8' },
  { n: 'Minty', c: 'MT', h: '#48C8C0' },
  { n: 'Purpy', c: 'PP', h: '#B09AD8' },
  { n: 'Rosy', c: 'RO', h: '#F05A9D' },
]
 
const COOLER = [
  { n: 'Sand', c: 'TP', h: '#C8C5BE' },
  { n: 'Stone', c: 'GY', h: '#8A8780' },
  { n: 'Onyx', c: 'BK', h: '#2A2A28' },
]
 
const PET_BOWL_940 = [
  { n: 'Snow', c: 'WT', h: '#F5F5F0' },
  { n: 'Stone', c: 'GY', h: '#8A8780' },
  { n: 'Onyx', c: 'BK', h: '#2A2A28' },
]
 
const ZODIAC = [
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
 
const SINGLE_REFILL = [
  { name: 'Refill Set', code: 'RF', hex: '#F5F5F0', sku: 'QNH-PLRR' },
]
 
function mk(base, pal) {
  return pal.map(c => ({ name: c.n, code: c.c, hex: c.h, sku: `${base}-${c.c}` }))
}
 
function product(id, name, ext, cat, desc, badges, srp, packing, colors) {
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
    createdAt: now,
    updatedAt: now,
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
 
const SEED = [
  // ── SIP / DRINKWARE ───────────────────────────────────────────────
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
 
const EDIT_PASSWORD = 'quencha2026'
const EXT_LABELS = {core:'Quencha',kids:'Quencha Kids',pets:'Quencha Pets',tech:'Quencha Tech'}
const CAT_LABELS = {sip:'SIP — Drinkware',savor:'SAVOR — Lunch & Food',go:'GO — Bags & Carry',accessories:'Accessories'}
const EXT_ORDER = ['core','kids','pets','tech']
const CAT_ORDER = ['sip','savor','go','accessories']
const EXT_COLORS = {core:'#279989',kids:'#5891c4',pets:'#b06820',tech:'#2B4C5E'}
const CAT_ICONS = {sip:'',savor:'',go:'',accessories:''}
const DEFAULT_CATS = [
  {value:'sip',         label:'SIP — Drinkware',      icon:''},
  {value:'savor',       label:'SAVOR — Lunch & Food',  icon:''},
  {value:'go',          label:'GO — Bags & Carry',     icon:''},
  {value:'accessories', label:'Accessories',           icon:''},
]
const DEFAULT_EXTS = [
  {value:'core',  label:'Quencha',  color:'#279989'},
  {value:'kids',  label:'Quencha Kids',  color:'#5891c4'},
  {value:'pets',  label:'Quencha Pets',  color:'#b06820'},
  {value:'tech',  label:'Quencha Tech',  color:'#2B4C5E'},
]
 
// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400,300&display=swap');
:root{
  --sf:#B9DCD2;--sf4:rgba(185,220,210,0.4);--sf7:rgba(185,220,210,0.7);
  --cy:#2DCCD3;--cy2:#25b5bb;--tl:#279989;--tl2:#1e8070;
  --gr:#63666A;--wh:#FFFFFF;--bk:#3A3A3A;--bg:#F7FAF9;
  --fn:'Satoshi','Inter',-apple-system,sans-serif;
  --r:10px;--rl:16px;--tr:.2s ease;
  --nh:60px;--sw:260px;
  --sh:0 2px 12px rgba(39,153,137,.08);
  --shh:0 8px 32px rgba(39,153,137,.18);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:var(--fn);background:var(--bg);color:var(--bk);line-height:1.6;overflow-x:hidden;-webkit-font-smoothing:antialiased}
 
/* TOPBAR */
.qnh-topbar{position:fixed;top:0;left:0;right:0;z-index:200;height:var(--nh);background:var(--tl);display:flex;align-items:center;padding:0 20px;gap:12px;transition:background var(--tr)}
.qnh-topbar.edit-on{background:#92400e}
.tb-brand{display:flex;align-items:center;gap:8px;flex-shrink:0;text-decoration:none;cursor:pointer;min-width:0}
.tb-logo{height:28px;width:auto;max-width:120px;object-fit:contain;display:block;flex-shrink:0}
.tb-logo-placeholder{width:30px;height:30px;border-radius:8px;border:1px dashed rgba(255,255,255,.55);display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;font-weight:900;flex-shrink:0}
.tb-brand-edit{font-size:9px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;background:rgba(255,255,255,.18);color:#fff;border-radius:999px;padding:2px 7px;flex-shrink:0}
.tb-wm{font-size:20px;font-weight:900;letter-spacing:.08em;color:#fff;text-transform:uppercase;white-space:nowrap}
.tb-tg{font-size:11px;color:rgba(255,255,255,.55);letter-spacing:.06em;font-style:italic;white-space:nowrap}
.tb-menu-btn{display:none;width:34px;height:34px;border-radius:9px;border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.14);color:#fff;font-size:18px;font-weight:900;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0}
.tb-menu-btn:hover{background:rgba(255,255,255,.24)}
.tb-search-wrap{flex:1;max-width:420px;position:relative;margin:0 auto}
.tb-search-btn{position:absolute;right:8px;top:50%;transform:translateY(-50%);width:28px;height:28px;border:none;border-radius:50%;background:rgba(255,255,255,.16);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:var(--tr);padding:0}
.tb-search-btn:hover{background:rgba(255,255,255,.28);transform:translateY(-50%) scale(1.04)}
.tb-search-btn:active{transform:translateY(-50%) scale(.96)}
.tb-search{width:100%;background:rgba(255,255,255,.13);border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:8px 72px 8px 16px;font-family:var(--fn);font-size:13px;color:#fff;outline:none;transition:var(--tr)}
.tb-search::placeholder{color:rgba(255,255,255,.45)}
.tb-search:focus{background:rgba(255,255,255,.2);border-color:var(--cy)}
.tb-clear{position:absolute;right:42px;top:50%;transform:translateY(-50%);background:none;border:none;color:rgba(255,255,255,.55);cursor:pointer;font-size:13px;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:var(--tr)}
.tb-clear:hover{background:rgba(255,255,255,.14);color:#fff}
.tb-actions{display:flex;gap:8px;align-items:center;flex-shrink:0}
 
/* Edit mode indicator — subtle, secondary */
.tb-edit-btn{width:36px;height:36px;border-radius:50%;cursor:pointer;border:none;background:rgba(255,255,255,.18);color:#fff;transition:var(--tr);display:flex;align-items:center;justify-content:center;flex-shrink:0;position:relative}
.tb-edit-btn:hover{background:rgba(255,255,255,.3);transform:scale(1.05)}
.tb-edit-btn.on{background:#fff;color:var(--tl)}
.tb-edit-tooltip{position:absolute;top:calc(100% + 8px);right:0;background:rgba(28,25,23,.92);color:#fff;font-size:11px;font-weight:700;padding:4px 10px;border-radius:6px;white-space:nowrap;pointer-events:none;opacity:0;transition:var(--tr);font-family:var(--fn)}
.tb-edit-btn:hover .tb-edit-tooltip{opacity:1}
 
/* Bulk Inquiry — MAIN CTA */
.tb-inq{background:var(--cy);color:#fff;border:none;border-radius:8px;padding:9px 20px;font-family:var(--fn);font-size:13px;font-weight:700;cursor:pointer;transition:var(--tr);white-space:nowrap;letter-spacing:.02em}
.tb-inq:hover{background:var(--cy2);transform:translateY(-1px);box-shadow:0 4px 12px rgba(45,204,211,.4)}
 
.edit-dot{width:6px;height:6px;border-radius:50%;background:#fbbf24;animation:pulse 1.4s ease-in-out infinite;flex-shrink:0}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}
 
/* LAYOUT */
.qnh-layout{display:flex;margin-top:var(--nh);min-height:calc(100vh - var(--nh))}
.qnh-sidebar{width:var(--sw);background:#E6F4F1;position:fixed;top:var(--nh);bottom:0;left:0;overflow-y:auto;z-index:100;border-right:1px solid rgba(185,220,210,.75);box-shadow:2px 0 14px rgba(39,153,137,.06)}
.qnh-sidebar::-webkit-scrollbar{width:4px}
.qnh-sidebar::-webkit-scrollbar-thumb{background:rgba(39,153,137,.25);border-radius:2px}
.sb-hero{padding:20px 20px 16px;border-bottom:1px solid rgba(39,153,137,.12);background:rgba(255,255,255,.35)}
.sb-hl{font-size:9px;font-weight:700;letter-spacing:.14em;color:rgba(39,153,137,.55);text-transform:uppercase;margin-bottom:2px}
.sb-total{font-size:28px;font-weight:900;color:var(--tl);line-height:1}
.sb-sub{font-size:11px;color:rgba(39,153,137,.6)}
.sb-sec{padding:12px 12px 4px}
.sb-lbl{font-size:9px;font-weight:700;letter-spacing:.14em;color:rgba(39,153,137,.55);text-transform:uppercase;display:block;padding:4px 8px 8px}
.fb{display:flex;width:100%;align-items:center;gap:8px;padding:8px 10px;border-radius:6px;border:2px solid transparent;background:transparent;cursor:pointer;color:rgba(58,58,58,.62);font-family:var(--fn);font-size:12px;font-weight:500;transition:var(--tr);text-align:left;margin-bottom:1px}
.fb:hover{background:rgba(255,255,255,.55);color:var(--tl)}
.fb.on{background:rgba(255,255,255,.72);color:var(--tl);border-left-color:var(--tl)!important;box-shadow:0 2px 10px rgba(39,153,137,.08)}
.fb-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
.fb-ico{font-size:13px;flex-shrink:0}
.fb-lbl{flex:1}
.fb-cnt{font-size:10px;padding:1px 6px;border-radius:999px;background:rgba(39,153,137,.08);color:rgba(39,153,137,.65)}
.fb.on .fb-cnt{background:rgba(45,204,211,.18);color:var(--tl)}
.sb-div{border:none;border-top:1px solid rgba(39,153,137,.12);margin:6px 16px}
.pc-wrap{display:flex;flex-wrap:wrap;gap:6px;padding:4px 12px 10px}
.pc{font-size:11px;font-weight:600;padding:4px 10px;border-radius:999px;background:rgba(255,255,255,.48);border:1px solid rgba(39,153,137,.12);color:rgba(58,58,58,.62);cursor:pointer;transition:var(--tr);font-family:var(--fn)}
.pc:hover{border-color:var(--tl);color:var(--tl);background:#fff}
.pc.on{background:rgba(45,204,211,.15);border-color:var(--tl);color:var(--tl)}
.filter-pill-wrap{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;padding:4px 12px 10px}
.filter-pill{min-height:38px;border-radius:999px;border:1px solid rgba(39,153,137,.16);background:rgba(255,255,255,.62);color:rgba(58,58,58,.68);font-family:var(--fn);font-size:11px;font-weight:800;line-height:1.1;padding:7px 9px;cursor:pointer;transition:var(--tr);display:flex;align-items:center;justify-content:space-between;gap:7px;text-align:left;box-shadow:0 2px 8px rgba(39,153,137,.04)}
.filter-pill:hover{background:#fff;border-color:rgba(39,153,137,.34);color:var(--tl);transform:translateY(-1px)}
.filter-pill.on{background:rgba(45,204,211,.16);border-color:var(--tl);color:var(--tl);box-shadow:0 3px 12px rgba(39,153,137,.10)}
.filter-pill-l{display:flex;align-items:center;gap:6px;min-width:0;overflow:hidden}
.filter-pill-ico,.filter-pill-dot{flex-shrink:0}
.filter-pill-dot{width:8px;height:8px;border-radius:999px;box-shadow:0 0 0 3px rgba(255,255,255,.7)}
.filter-pill-label{display:block;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.filter-pill-count{font-size:10px;font-weight:900;color:var(--tl);background:rgba(39,153,137,.08);border:1px solid rgba(39,153,137,.10);border-radius:999px;padding:2px 7px;min-width:26px;text-align:center;flex-shrink:0}
.filter-pill.on .filter-pill-count{background:rgba(255,255,255,.76);border-color:rgba(39,153,137,.16)}
.filter-pill.full{grid-column:1/-1}
.manage-pill{grid-column:1/-1;justify-content:center;color:rgba(39,153,137,.72);background:rgba(255,255,255,.45);border-style:dashed}
@media(max-width:430px){.filter-pill-wrap{grid-template-columns:repeat(4,minmax(0,1fr));gap:7px;padding-left:10px;padding-right:10px}.filter-pill{font-size:10px;padding:7px 8px}.filter-pill-count{padding:2px 6px;min-width:24px}}
.clear-filters{display:block;margin:8px 16px 0;width:calc(100% - 32px);background:rgba(255,255,255,.42);border:1px solid rgba(39,153,137,.15);border-radius:6px;color:rgba(39,153,137,.62);font-family:var(--fn);font-size:11px;font-weight:700;padding:7px;cursor:pointer;transition:var(--tr)}
.clear-filters:hover{border-color:var(--tl);color:var(--tl);background:#fff}
 
/* MOBILE */
.mob-filter-btn{display:none;position:fixed;bottom:80px;left:16px;z-index:150;background:var(--tl);color:#fff;border:none;border-radius:999px;padding:10px 18px;font-family:var(--fn);font-size:13px;font-weight:700;cursor:pointer;box-shadow:0 4px 16px rgba(39,153,137,.4);align-items:center;gap:6px}
.mob-overlay{position:fixed;inset:0;z-index:400;background:rgba(0,0,0,.4);backdrop-filter:blur(2px)}
.mob-drawer{position:absolute;top:0;left:0;bottom:0;width:280px;background:#E6F4F1;overflow-y:auto;padding-top:44px}
.drawer-close{position:absolute;top:10px;right:10px;background:rgba(255,255,255,.65);border:none;border-radius:50%;width:32px;height:32px;color:var(--tl);font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center}
 
/* MAIN */
.qnh-main{margin-left:var(--sw);flex:1;padding:32px 36px 100px;min-width:0}
 
/* HERO */
.hero{background:var(--sf4);border-radius:var(--rl);padding:40px 48px;margin-bottom:32px;display:flex;align-items:center;gap:32px;position:relative;overflow:hidden}
.hero::after{content:'';position:absolute;right:-40px;bottom:-40px;width:220px;height:220px;background:radial-gradient(circle,rgba(45,204,211,.2) 0%,transparent 70%);pointer-events:none}
.h-text{flex:1;position:relative;z-index:1}
.h-ey{font-size:10px;font-weight:700;letter-spacing:.16em;color:var(--tl);text-transform:uppercase;margin-bottom:8px}
.h-ti{font-size:48px;font-weight:900;letter-spacing:-.02em;color:var(--tl);line-height:1.05;margin-bottom:10px}
.h-su{font-size:15px;color:var(--tl);opacity:.72;margin-bottom:20px;max-width:480px}
.h-chips{display:flex;gap:7px;flex-wrap:wrap}
.h-chip{font-size:10px;font-weight:700;letter-spacing:.06em;background:rgba(39,153,137,.12);color:var(--tl);padding:4px 11px;border-radius:999px;text-transform:uppercase}
.h-stat{flex-shrink:0;text-align:right;position:relative;z-index:1}
.h-num{font-size:52px;font-weight:900;color:var(--cy);line-height:1;letter-spacing:-.03em}
.h-nlab{font-size:11px;font-weight:700;letter-spacing:.1em;color:var(--tl);text-transform:uppercase;opacity:.65}
 
/* TOOLBAR */
.toolbar{display:flex;align-items:center;gap:8px;margin-bottom:24px;flex-wrap:wrap}
.res-label{flex:1;font-size:13px;color:var(--gr)}
.sort-sel{font-family:var(--fn);font-size:13px;font-weight:600;color:var(--bk);background:var(--wh);border:1px solid var(--sf7);border-radius:8px;padding:7px 10px;outline:none;cursor:pointer}
.vbtns{display:flex;gap:3px;background:var(--wh);border:1px solid var(--sf7);border-radius:8px;padding:3px}
.vbtn{min-width:32px;height:28px;border-radius:5px;border:none;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--gr);font-size:13px;font-weight:700;font-family:var(--fn);transition:var(--tr);padding:0 8px;white-space:nowrap}
.vbtn:hover{background:var(--sf4);color:var(--tl)}
.vbtn.on{background:var(--tl);color:#fff}
 
/* SECTION HEADER */
.cat-hdr{display:flex;align-items:center;gap:10px;margin:40px 0 16px;padding-bottom:12px;border-bottom:2px solid rgba(185,220,210,.35)}
.cat-line{flex:1;height:1px;background:rgba(185,220,210,.25)}
.cat-nm{font-size:12px;font-weight:700;letter-spacing:.1em;color:var(--tl);text-transform:uppercase;white-space:nowrap}
.ext-tag{font-size:10px;font-weight:700;letter-spacing:.06em;padding:2px 8px;border-radius:999px;text-transform:uppercase;color:#fff;white-space:nowrap}
.cat-cnt{font-size:10px;font-weight:700;background:var(--sf4);color:var(--tl);padding:2px 8px;border-radius:999px;white-space:nowrap}
 
/* PRODUCT GRID — 4 layouts */
.pgrid{display:grid;gap:18px;margin-bottom:8px}
.pgrid.col-4{grid-template-columns:repeat(4,1fr)}
.pgrid.col-2{grid-template-columns:repeat(2,1fr)!important}
.pgrid.col-1{grid-template-columns:1fr!important}
@media(max-width:900px){.pgrid.col-4{grid-template-columns:repeat(2,1fr)}}
@media(max-width:480px){.pgrid.col-4{grid-template-columns:1fr}}
 
/* PRODUCT CARD */
.pcard{background:var(--wh);border:1px solid rgba(185,220,210,.4);border-radius:var(--r);overflow:hidden;box-shadow:var(--sh);transition:var(--tr);cursor:pointer;display:flex;flex-direction:column;position:relative}
.pcard:not(.em):hover{transform:translateY(-3px);box-shadow:var(--shh);border-color:rgba(45,204,211,.3)}
.pcard.em{border:1.5px dashed rgba(245,158,11,.35)}
.pcard.em:hover{transform:none;box-shadow:var(--sh);border-color:rgba(245,158,11,.55)}
.pcard.dragging{opacity:.45;transform:scale(.98);box-shadow:none}
.c-drag-handle{position:absolute;top:10px;right:10px;z-index:4;font-size:10px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;background:rgba(255,255,255,.92);color:var(--tl);border:1px solid rgba(39,153,137,.2);border-radius:999px;padding:3px 8px;cursor:grab;box-shadow:0 2px 8px rgba(39,153,137,.12)}
.c-drag-handle:active{cursor:grabbing}
.reorder-hint{font-size:11px;font-weight:700;color:var(--tl);background:var(--sf4);border:1px solid rgba(185,220,210,.6);border-radius:999px;padding:5px 10px}
 
/* IMAGE WRAP — fixed: position:relative + proper img fill */
.c-img-wrap{position:relative;overflow:hidden;aspect-ratio:1/1;background:var(--sf4);flex-shrink:0;display:flex;align-items:center;justify-content:center}
.c-img-wrap img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;display:block;transition:transform .3s ease}
.pcard:not(.em):hover .c-img-wrap img{transform:scale(1.04)}
.c-img-ph{font-size:40px;opacity:.18;user-select:none;position:relative;z-index:0}
.c-etag{position:absolute;top:10px;left:10px;z-index:2;font-size:9px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:2px 8px;border-radius:999px;color:#fff}
 
 
.c-body{padding:14px 16px;display:flex;flex-direction:column;gap:7px;flex:1;min-width:0}
.c-name{font-size:14px;font-weight:700;color:var(--bk);line-height:1.3;padding-right:4px}
.c-desc{font-size:12px;color:var(--gr);line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.c-badges{display:flex;flex-wrap:wrap;gap:4px}
.c-badge{font-size:10px;font-weight:700;padding:2px 7px;border-radius:999px;background:rgba(185,220,210,.35);color:var(--tl)}
.c-colors{display:flex;align-items:center;gap:5px;flex-wrap:wrap}
.c-dot{width:14px;height:14px;border-radius:50%;border:2px solid rgba(255,255,255,.8);box-shadow:0 1px 3px rgba(0,0,0,.12);flex-shrink:0}
.c-more{font-size:10px;font-weight:700;color:var(--gr);background:var(--bg);border:1px solid rgba(185,220,210,.5);border-radius:999px;padding:1px 6px}
 
/* CARD FOOTER — SRP and Packing same size/weight */
.c-foot{display:flex;align-items:flex-end;justify-content:space-between;padding-top:10px;border-top:1px solid rgba(185,220,210,.3);margin-top:auto;gap:8px}
.c-stats{display:flex;gap:16px;align-items:flex-end}
.c-stat{display:flex;flex-direction:column;gap:1px}
.c-stat-val{font-size:16px;font-weight:900;color:var(--tl);line-height:1.1}
.c-stat-lbl{font-size:9px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--gr);opacity:.8}
.c-stat-divider{width:1px;height:28px;background:rgba(185,220,210,.5);align-self:flex-end;margin-bottom:2px}
.c-sku{display:inline-block;font-size:10px;font-weight:500;font-family:monospace;background:var(--bg);border:1px solid rgba(185,220,210,.5);border-radius:4px;padding:2px 6px;color:var(--gr);align-self:flex-start;width:fit-content}
 
/* EMPTY */
.empty{text-align:center;padding:80px 20px;color:var(--gr)}
.empty-ico{font-size:48px;margin-bottom:14px;opacity:.4}
 
/* MODAL SHARED */
.modal-bg{position:fixed;inset:0;z-index:500;background:rgba(39,153,137,.15);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:16px}
.modal{background:var(--wh);border-radius:var(--rl);width:100%;max-width:720px;max-height:92vh;display:flex;flex-direction:column;box-shadow:0 24px 80px rgba(39,153,137,.22)}
.m-hdr{padding:22px 28px;display:flex;align-items:flex-start;justify-content:space-between;gap:12px;border-radius:var(--rl) var(--rl) 0 0;flex-shrink:0}
.m-close{background:rgba(0,0,0,.07);border:none;border-radius:50%;width:34px;height:34px;cursor:pointer;font-size:14px;color:var(--gr);transition:var(--tr);flex-shrink:0;display:flex;align-items:center;justify-content:center}
.m-close:hover{background:rgba(0,0,0,.13)}
.m-body{overflow-y:auto;padding:24px 28px;display:flex;flex-direction:column;gap:14px;flex:1}
.m-body::-webkit-scrollbar{width:4px}
.m-body::-webkit-scrollbar-thumb{background:rgba(185,220,210,.6);border-radius:2px}
.m-footer{padding:14px 24px;border-top:1px solid rgba(185,220,210,.4);display:flex;align-items:center;gap:10px;background:var(--wh);border-radius:0 0 var(--rl) var(--rl);flex-shrink:0}
.m-footer-r{display:flex;gap:8px;margin-left:auto}
 
/* PASSWORD MODAL */
.pw-modal{background:var(--wh);border-radius:var(--rl);width:100%;max-width:380px;box-shadow:0 24px 80px rgba(39,153,137,.22);overflow:hidden}
.pw-hdr{background:var(--sf4);padding:28px;text-align:center}
.pw-icon{font-size:36px;margin-bottom:10px}
.pw-title{font-size:20px;font-weight:900;color:var(--tl)}
.pw-sub{font-size:13px;color:var(--tl);opacity:.7;margin-top:4px}
.pw-body{padding:24px 28px 28px}
.pw-lbl{font-size:11px;font-weight:700;letter-spacing:.06em;color:var(--tl);text-transform:uppercase;display:block;margin-bottom:8px}
.pw-wrap{position:relative;margin-bottom:6px}
.pw-in{width:100%;font-family:var(--fn);font-size:15px;color:var(--bk);background:var(--bg);border:2px solid var(--sf7);border-radius:8px;padding:11px 44px 11px 14px;outline:none;transition:var(--tr)}
.pw-in:focus{border-color:var(--tl);background:#fff}
.pw-in.err{border-color:#ef4444;background:rgba(239,68,68,.03)}
.pw-eye{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;font-size:16px;color:var(--gr);padding:2px}
.pw-err{font-size:12px;color:#b91c1c;min-height:18px;margin-bottom:12px;display:flex;align-items:center;gap:4px}
.pw-submit{width:100%;background:var(--tl);color:#fff;border:none;border-radius:8px;padding:12px;font-family:var(--fn);font-size:14px;font-weight:700;cursor:pointer;transition:var(--tr)}
.pw-submit:hover{background:var(--tl2)}
.pw-cancel{width:100%;background:none;color:var(--gr);border:none;padding:8px;font-family:var(--fn);font-size:13px;cursor:pointer;margin-top:4px;transition:var(--tr)}
.pw-cancel:hover{color:var(--bk)}
 
/* VIEW MODAL */
.vm-main-wrap{width:100%;aspect-ratio:1/1;border-radius:10px;overflow:hidden;background:var(--sf4);position:relative;display:flex;align-items:center;justify-content:center}
.vm-main-wrap img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;display:block}
.vm-main-ph{font-size:80px;opacity:.15}
.vm-thumbs{display:flex;gap:8px;overflow-x:auto;padding-bottom:2px;margin-top:8px}
.vm-thumb{width:54px;height:54px;border-radius:6px;overflow:hidden;border:2px solid transparent;cursor:pointer;transition:var(--tr);background:var(--sf4);flex-shrink:0;position:relative}
.vm-thumb.on{border-color:var(--cy)}
.vm-thumb img{width:100%;height:100%;object-fit:cover;object-position:center;display:block}
.vm-badges{display:flex;flex-wrap:wrap;gap:6px}
.vm-badge{font-size:11px;font-weight:700;padding:3px 10px;border-radius:999px;background:rgba(185,220,210,.4);color:var(--tl)}
.vm-desc{font-size:14px;color:var(--bk);line-height:1.65}
.vm-price-row{display:flex;gap:24px;align-items:flex-end}
.vm-price-row-under-desc{background:transparent;border:none;border-radius:0;padding:0;margin:2px 0 12px;align-items:flex-end;width:fit-content;max-width:100%}
.vm-plbl{font-size:10px;font-weight:700;letter-spacing:.1em;color:var(--gr);text-transform:uppercase;margin-bottom:2px}
.vm-pval{font-size:26px;font-weight:900;color:var(--tl);line-height:1.1}
.vm-pdiv{width:1px;height:36px;background:rgba(185,220,210,.5)}
.vm-tlbl{font-size:11px;font-weight:700;letter-spacing:.1em;color:var(--tl);text-transform:uppercase;margin-bottom:8px}
.vm-table-wrap{overflow-x:auto;border-radius:8px;border:1px solid rgba(185,220,210,.4)}
.vm-table{width:100%;border-collapse:collapse;font-size:13px}
.vm-table th{background:var(--tl);color:#fff;padding:8px 14px;text-align:left;font-size:10px;letter-spacing:.08em;font-weight:700}
.vm-table td{padding:8px 14px;border-bottom:1px solid rgba(185,220,210,.3);vertical-align:middle}
.vm-table tr:last-child td{border-bottom:none}
.vm-table tr:hover td{background:rgba(185,220,210,.08)}
 
/* COLOR SKU / BARCODE TABLE */
.vm-variant-table-card{background:var(--sf4);border:1px solid rgba(185,220,210,.48);border-radius:12px;padding:12px;overflow:hidden}
.vm-variant-table-wrap{overflow-x:auto;border-radius:8px;border:1px solid rgba(185,220,210,.45);background:#fff;-webkit-overflow-scrolling:touch}
.vm-variant-table{width:100%;border-collapse:collapse;min-width:420px;font-size:13px}
.vm-variant-table th{background:var(--tl);color:#fff;padding:8px 12px;text-align:left;font-size:10px;letter-spacing:.08em;font-weight:800;text-transform:uppercase;white-space:nowrap}
.vm-variant-table td{padding:9px 12px;border-bottom:1px solid rgba(185,220,210,.32);vertical-align:middle;font-size:13px;color:var(--gr)}
.vm-variant-table tr:last-child td{border-bottom:none}
.vm-variant-color{display:flex;align-items:center;gap:8px;font-weight:800;color:var(--bk);white-space:nowrap}
.vm-variant-swatch{width:14px;height:14px;border-radius:50%;border:1px solid rgba(0,0,0,.08);box-shadow:0 1px 3px rgba(0,0,0,.12);flex-shrink:0}
.vm-variant-sku{font-family:monospace;font-weight:500;color:var(--tl);letter-spacing:.02em;white-space:nowrap}
.vm-variant-barcode{display:flex;align-items:center;gap:8px;min-height:34px}
.vm-variant-barcode img{max-width:128px;max-height:38px;object-fit:contain;background:#fff;border-radius:4px;cursor:zoom-in}
.vm-variant-barcode code{font-family:monospace;font-size:11px;font-weight:800;color:var(--gr);white-space:nowrap}
@media(max-width:700px){.vm-variant-table-card{padding:10px;margin-top:2px}.vm-variant-table{min-width:390px;font-size:12px}.vm-variant-table th{padding:7px 10px;font-size:9px}.vm-variant-table td{padding:8px 10px;font-size:12px}.vm-variant-barcode img{max-width:110px;max-height:34px}.vm-variant-sku{font-size:11px}}
.vm-swatch{display:inline-block;width:10px;height:10px;border-radius:50%;vertical-align:middle;margin-right:7px;border:1px solid rgba(0,0,0,.1)}
.vm-code{font-family:monospace;font-size:11px;color:var(--tl)}
/* COLOR LIST */
.vm-color-sec-lbl{font-size:10px;font-weight:700;letter-spacing:.1em;color:var(--tl);text-transform:uppercase;margin-bottom:10px;display:block}
.vm-color-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.vm-color-item{display:flex;align-items:center;gap:8px;background:var(--bg);border:1px solid rgba(185,220,210,.5);border-radius:8px;padding:8px 10px;min-width:0}
.vm-color-swatch{width:28px;height:28px;border-radius:50%;flex-shrink:0;border:2px solid rgba(255,255,255,.8);box-shadow:0 1px 4px rgba(0,0,0,.15)}
.vm-color-info{display:flex;flex-direction:column;gap:2px;min-width:0}
.vm-color-name{font-size:12px;font-weight:700;color:var(--bk);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.vm-color-sku{font-family:monospace;font-size:10px;font-weight:500;color:var(--tl);letter-spacing:.04em;transition:color .15s}
.copyable{cursor:pointer;user-select:none}
.vm-color-item.copyable:hover{background:rgba(185,220,210,.5);border-color:var(--cy)}
.vm-color-item.sku-copied{background:rgba(45,204,211,.1);border-color:var(--cy)}
.vm-color-item.sku-copied .vm-color-sku{color:var(--cy)}
.vm-color-item.color-active{background:rgba(45,204,211,.12);border-color:var(--tl);box-shadow:0 0 0 2px rgba(39,153,137,.08)}
.c-sku.copyable:hover{background:var(--sf4);border-color:var(--cy);color:var(--tl)}
.vm-actions{display:flex;gap:10px;flex-wrap:wrap}
.vm-pencil-btn{width:44px;height:44px;border-radius:50%;border:none;background:rgba(39,153,137,.1);color:var(--tl);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:var(--tr);flex-shrink:0}
.vm-pencil-btn:hover{background:rgba(39,153,137,.2);transform:scale(1.08)}
.vm-inq-btn{flex:1;background:var(--tl);border:none;border-radius:8px;padding:11px 16px;font-family:var(--fn);font-size:13px;font-weight:700;color:#fff;cursor:pointer;transition:var(--tr)}
.vm-inq-btn:hover{background:var(--tl2)}
.vm-link-btn{flex:1;background:rgba(185,220,210,.35);border:1px solid rgba(39,153,137,.22);border-radius:8px;padding:11px 16px;font-family:var(--fn);font-size:13px;font-weight:800;color:var(--tl);cursor:pointer;transition:var(--tr)}
.vm-link-btn:hover{background:rgba(185,220,210,.6);border-color:var(--tl);transform:translateY(-1px)}
 
/* EDIT MODAL */
.edit-modal-inner{max-width:800px}
.em-hdr{background:rgba(245,158,11,.06);border-bottom:1px solid rgba(245,158,11,.18)}
.em-badge{font-size:10px;font-weight:700;letter-spacing:.1em;color:#92400e;text-transform:uppercase;margin-bottom:4px}
.em-title{font-size:20px;font-weight:900;color:var(--bk);line-height:1.2}
.em-tabs{display:flex;border-bottom:1px solid rgba(185,220,210,.4);padding:0 16px;background:var(--bg);flex-shrink:0}
.em-tab{font-family:var(--fn);font-size:13px;font-weight:600;padding:11px 14px;border:none;background:none;cursor:pointer;color:var(--gr);border-bottom:2px solid transparent;margin-bottom:-1px;transition:var(--tr)}
.em-tab:hover{color:var(--tl)}
.em-tab.on{color:var(--tl);border-bottom-color:var(--tl)}
.em-panel{padding:22px;display:flex;flex-direction:column;gap:14px;overflow-y:auto;flex:1}
.em-panel::-webkit-scrollbar{width:4px}
.em-panel::-webkit-scrollbar-thumb{background:rgba(185,220,210,.6);border-radius:2px}
.f-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.f-col{display:flex;flex-direction:column;gap:5px}
.f-lbl{font-size:11px;font-weight:700;letter-spacing:.06em;color:var(--tl);text-transform:uppercase}
.f-in,.f-sel,.f-ta{font-family:var(--fn);font-size:14px;color:var(--bk);background:var(--bg);border:1.5px solid var(--sf7);border-radius:8px;padding:9px 12px;outline:none;transition:var(--tr);width:100%}
.f-in:focus,.f-sel:focus,.f-ta:focus{border-color:var(--tl);background:#fff}
.f-ta{resize:vertical;min-height:80px;line-height:1.55}
.f-hint{font-size:12px;color:var(--gr);background:var(--sf4);border-radius:6px;padding:8px 12px}
.badge-list{display:flex;flex-wrap:wrap;gap:6px;min-height:28px}
.badge-tag{display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:700;padding:3px 8px 3px 10px;border-radius:999px;background:rgba(185,220,210,.4);color:var(--tl)}
.badge-tag button{background:none;border:none;cursor:pointer;color:var(--tl);font-size:10px;opacity:.6;line-height:1}
.badge-tag button:hover{opacity:1}
.add-row{display:flex;gap:8px}
.add-btn{background:var(--tl);color:#fff;border:none;border-radius:8px;padding:9px 14px;font-family:var(--fn);font-size:13px;font-weight:700;cursor:pointer;white-space:nowrap;transition:var(--tr);flex-shrink:0}
.add-btn:hover{background:var(--tl2)}
.color-collection-panel{background:linear-gradient(180deg,rgba(185,220,210,.5),rgba(255,255,255,.78));border:1px solid rgba(39,153,137,.18);border-radius:14px;padding:14px;margin-bottom:14px;overflow:visible;box-shadow:0 2px 12px rgba(39,153,137,.05)}
.collection-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px;padding-bottom:9px;border-bottom:1px solid rgba(39,153,137,.12)}
.collection-title{font-size:10px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:var(--tl)}
.collection-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
.collection-item{display:grid;grid-template-columns:34px minmax(0,1fr);align-items:start;gap:8px;background:#fff;border:1px solid rgba(185,220,210,.75);border-radius:12px;padding:10px;box-shadow:0 2px 8px rgba(39,153,137,.05);min-width:0}
.collection-item input[type=color]{width:34px;height:34px;border:none;background:none;padding:2px;cursor:pointer;flex-shrink:0;grid-row:1/3}
.collection-name{min-width:0;font-family:var(--fn);font-size:12px;font-weight:800;color:var(--bk);border:1px solid rgba(185,220,210,.75);border-radius:8px;padding:8px 10px;outline:none;background:var(--bg);width:100%;grid-column:2/3}
.collection-name:focus{border-color:var(--tl);background:#fff}
.collection-actions{grid-column:2/3;display:grid;grid-template-columns:74px minmax(0,1fr) 86px;gap:8px;width:100%;align-items:center}
.collection-set-count{width:74px;height:32px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:900;color:var(--tl);background:rgba(39,153,137,.08);border:1px solid rgba(39,153,137,.12);border-radius:999px;white-space:nowrap;text-align:center;line-height:1}
.collection-add-set,.collection-edit-set{border:none;border-radius:8px;padding:8px 10px;font-family:var(--fn);font-size:10px;font-weight:900;letter-spacing:.02em;cursor:pointer;transition:var(--tr);white-space:nowrap;min-height:32px;min-width:0}
.collection-add-set{background:var(--tl);color:#fff;overflow:hidden;text-overflow:ellipsis}
.collection-add-set:hover:not(:disabled){background:var(--tl2);transform:translateY(-1px)}
.collection-edit-set{background:rgba(255,255,255,.85);color:var(--tl);border:1px solid rgba(39,153,137,.18);width:86px;padding-left:6px;padding-right:6px}
.collection-edit-set:hover{background:#fff;border-color:var(--tl);color:var(--tl)}
.collection-add-set:disabled{opacity:.45;cursor:not-allowed;background:rgba(39,153,137,.35);transform:none}
 
.collection-set-preview{grid-column:2/3;display:flex;flex-wrap:wrap;gap:5px;margin-top:6px}
.collection-color-chip{display:inline-flex;align-items:center;gap:4px;border:1px solid rgba(185,220,210,.65);background:rgba(247,250,249,.86);border-radius:999px;padding:3px 7px;font-size:9px;font-weight:900;color:var(--gr);line-height:1}
.collection-color-chip i{width:10px;height:10px;border-radius:50%;display:inline-block;border:1px solid rgba(0,0,0,.08);box-shadow:0 1px 2px rgba(0,0,0,.08)}
.collection-set-editor{grid-column:1/-1;margin-top:12px;background:#fff;border:1px solid rgba(39,153,137,.18);border-radius:14px;padding:14px;box-shadow:0 5px 18px rgba(39,153,137,.08)}
.collection-set-editor-head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid rgba(185,220,210,.55)}
.collection-set-editor-kicker{display:block;font-size:9px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:rgba(39,153,137,.65);margin-bottom:2px}
.collection-set-editor-name{font-size:16px;font-weight:900;color:var(--tl)}
.collection-set-editor-close{border:none;border-radius:999px;background:rgba(185,220,210,.35);color:var(--tl);width:32px;height:32px;font-size:14px;font-weight:900;cursor:pointer}
.collection-set-editor-list{display:flex;flex-direction:column;gap:8px}
.collection-set-row{display:grid;grid-template-columns:54px 34px minmax(130px,1.2fr) 70px minmax(170px,1.3fr) 38px;gap:8px;align-items:center;background:var(--bg);border:1px solid rgba(185,220,210,.65);border-radius:12px;padding:10px}
.collection-set-row input[type=color]{width:34px;height:34px;border:none;background:none;padding:2px;cursor:pointer}
.collection-set-row input[type=text]{min-width:0;font-family:var(--fn);font-size:12px;border:1px solid rgba(185,220,210,.75);border-radius:8px;padding:8px 10px;background:#fff;outline:none}
.collection-set-row input[type=text]:focus{border-color:var(--tl)}
.collection-set-move{display:flex;gap:4px;align-items:center;justify-content:center}.collection-set-move button{width:24px;height:24px;border-radius:7px;border:1px solid rgba(39,153,137,.18);background:#fff;color:var(--tl);font-size:12px;font-weight:900;cursor:pointer}.collection-set-move button:disabled{opacity:.32;cursor:not-allowed}.collection-set-remove{width:32px;height:32px;border-radius:10px;border:1px solid rgba(239,68,68,.18);background:rgba(239,68,68,.08);color:#b91c1c;font-size:15px;font-weight:900;cursor:pointer;display:flex;align-items:center;justify-content:center}.collection-set-remove:hover{background:rgba(239,68,68,.16)}
.collection-set-add-inline{display:grid;grid-template-columns:34px minmax(130px,1.2fr) 70px minmax(170px,1.3fr) auto;gap:8px;align-items:center;margin-top:10px;background:rgba(185,220,210,.22);border:1px dashed rgba(39,153,137,.24);border-radius:12px;padding:10px}
.collection-set-add-inline input[type=color]{width:34px;height:34px;border:none;background:none;padding:2px;cursor:pointer}
.collection-set-add-inline input[type=text]{min-width:0;font-family:var(--fn);font-size:12px;border:1px solid rgba(185,220,210,.75);border-radius:8px;padding:8px 10px;background:#fff;outline:none}
.collection-set-add-inline button{background:var(--tl);color:#fff;border:none;border-radius:8px;padding:9px 12px;font-family:var(--fn);font-size:12px;font-weight:900;cursor:pointer;white-space:nowrap}
.collection-set-editor-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:12px}
.collection-set-cancel{background:#fff;color:var(--gr);border:1px solid rgba(185,220,210,.75);border-radius:8px;padding:9px 13px;font-family:var(--fn);font-size:12px;font-weight:900;cursor:pointer}
.collection-set-save{background:var(--tl);color:#fff;border:none;border-radius:8px;padding:9px 14px;font-family:var(--fn);font-size:12px;font-weight:900;cursor:pointer}
.collection-add-row{display:grid;grid-template-columns:38px minmax(0,1fr) auto;gap:8px;margin-top:12px;background:rgba(255,255,255,.65);border:1px dashed rgba(39,153,137,.24);border-radius:12px;padding:10px}
.collection-add-row input[type=color]{width:38px;height:38px;border:none;background:none;padding:2px;cursor:pointer}
.collection-add-row input[type=text]{min-width:0;font-family:var(--fn);font-size:12px;border:1px solid rgba(185,220,210,.75);border-radius:8px;padding:9px 11px;outline:none;background:#fff}
.collection-add-row input[type=text]:focus{border-color:var(--tl)}
.collection-add-row button{background:var(--tl);color:#fff;border:none;border-radius:8px;padding:9px 13px;font-family:var(--fn);font-size:12px;font-weight:900;cursor:pointer;white-space:nowrap}
.collection-add-row button:hover{background:var(--tl2)}
.color-table-head{display:grid;grid-template-columns:54px 180px 128px 1fr 72px 1.25fr 28px;gap:8px;font-size:10px;font-weight:700;letter-spacing:.08em;color:var(--gr);text-transform:uppercase;padding:0 4px 8px;border-bottom:1px solid rgba(185,220,210,.4);margin-bottom:8px}
.color-row{display:grid;grid-template-columns:54px 180px 128px 1fr 72px 1.25fr 28px;gap:8px;align-items:start;margin-bottom:8px;background:#fff;border:1px solid rgba(185,220,210,.45);border-radius:10px;padding:10px}
.color-move-controls{display:flex;gap:4px;align-items:center;justify-content:center;min-height:34px}
.move-btn{width:24px;height:28px;border-radius:6px;border:1px solid rgba(39,153,137,.18);background:rgba(185,220,210,.28);color:var(--tl);font-family:var(--fn);font-size:12px;font-weight:900;cursor:pointer;transition:var(--tr);line-height:1}
.move-btn:hover:not(:disabled){background:var(--tl);color:#fff;transform:translateY(-1px)}
.move-btn:disabled{opacity:.35;cursor:not-allowed}
.color-move-placeholder{font-size:10px;font-weight:900;letter-spacing:.06em;text-transform:uppercase;color:rgba(39,153,137,.6);background:rgba(185,220,210,.28);border:1px dashed rgba(39,153,137,.18);border-radius:8px;display:flex;align-items:center;justify-content:center;min-height:34px}
 
.cp{width:34px;height:34px;border:none;border-radius:6px;cursor:pointer;padding:2px;background:none}
.multi-swatch-edit{display:flex;flex-direction:column;align-items:stretch;gap:6px;min-height:34px}
.swatch-input-wrap{position:relative;display:grid;grid-template-columns:28px 1fr;align-items:center;gap:6px;background:var(--bg);border:1px solid rgba(185,220,210,.55);border-radius:8px;padding:4px 8px 4px 4px;min-width:0}
.swatch-input-wrap .cp{width:28px;height:28px}
.swatch-rm{position:absolute;right:-6px;top:-6px;width:16px;height:16px;border-radius:50%;border:none;background:#ef4444;color:#fff;font-size:10px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center}
.swatch-add{width:100%;height:30px;border-radius:8px;border:1.5px dashed rgba(39,153,137,.45);background:rgba(185,220,210,.35);color:var(--tl);font-size:12px;font-weight:900;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px;transition:var(--tr)}
.swatch-add::after{content:' color';font-size:11px;font-weight:800;letter-spacing:.02em}
.swatch-add:hover{background:rgba(45,204,211,.18);border-color:var(--tl)}
.hex-in{width:100%;min-width:0;border:none;background:transparent;font-family:monospace;font-size:11px;font-weight:800;color:var(--gr);outline:none;text-transform:uppercase;padding:3px 0}
.hex-in:focus{color:var(--tl)}
.collection-select{width:100%;font-family:var(--fn);font-size:12px;font-weight:700;color:var(--bk);background:var(--bg);border:1px solid rgba(185,220,210,.65);border-radius:6px;padding:7px 8px;outline:none}
.collection-select:focus{border-color:var(--tl);background:#fff}
@media(max-width:900px){.color-table-head{display:none}.color-row{grid-template-columns:1fr;gap:8px}.color-move-controls{justify-content:flex-start}.multi-swatch-edit{display:grid;grid-template-columns:1fr}.collection-grid{grid-template-columns:1fr}.collection-item{grid-template-columns:34px minmax(0,1fr)}.collection-actions{grid-template-columns:68px minmax(0,1fr) 78px}.collection-set-count{width:68px}.collection-edit-set{width:78px}.collection-add-row{grid-template-columns:38px minmax(0,1fr)}.collection-add-row button{grid-column:1/-1}.vm-color-grid{grid-template-columns:repeat(4,minmax(0,1fr))}}
@media(max-width:560px){.vm-color-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:7px}.vm-color-item{padding:8px 7px;gap:7px}.vm-color-swatch{width:36px;height:36px}.vm-color-name{font-size:12px}.vm-color-sku{font-size:10px}.collection-set-row{grid-template-columns:54px 34px 1fr 64px}.collection-set-row input:nth-of-type(4){grid-column:1/-1}.collection-set-remove{grid-column:1/-1;width:100%}.collection-set-add-inline{grid-template-columns:34px 1fr 64px}.collection-set-add-inline input:nth-of-type(4),.collection-set-add-inline button{grid-column:1/-1;width:100%}}
.in-sm{font-family:var(--fn);font-size:13px;color:var(--bk);background:var(--bg);border:1px solid var(--sf7);border-radius:6px;padding:6px 8px;outline:none;width:100%}
.in-sm:focus{border-color:var(--tl)}
.rm-btn{background:none;border:none;cursor:pointer;color:rgba(239,68,68,.5);font-size:16px;transition:var(--tr)}
.rm-btn:hover{color:#ef4444}
.add-color-form{background:var(--bg);border-radius:8px;padding:14px;border:1px dashed rgba(185,220,210,.6)}
.sub-hd{font-size:12px;font-weight:700;color:var(--tl);text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px}
.img-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:10px}
.img-thumb{aspect-ratio:1;border-radius:8px;overflow:hidden;position:relative;border:1.5px solid rgba(185,220,210,.5);background:var(--sf4)}
.img-thumb img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;display:block}
.img-thumb .img-actions{position:absolute;inset:0;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;gap:4px;opacity:0;transition:var(--tr);z-index:2}
.img-thumb:hover .img-actions{opacity:1}
.img-actions button{background:rgba(255,255,255,.88);border:none;border-radius:4px;padding:4px 7px;cursor:pointer;font-size:12px}
.img-rm-btn{background:rgba(239,68,68,.85)!important;color:#fff}
.main-tag{position:absolute;top:6px;left:6px;z-index:3;font-size:9px;font-weight:700;background:var(--tl);color:#fff;border-radius:999px;padding:2px 6px;text-transform:uppercase;letter-spacing:.06em}
.img-color-select{position:absolute;left:6px;right:6px;bottom:6px;z-index:4;font-family:var(--fn);font-size:10px;font-weight:800;color:var(--bk);background:rgba(255,255,255,.92);border:1px solid rgba(185,220,210,.72);border-radius:7px;padding:5px 7px;outline:none;box-shadow:0 2px 8px rgba(0,0,0,.08)}
.img-color-select:focus{border-color:var(--tl);background:#fff}
.color-image-panel{background:rgba(185,220,210,.22);border:1px solid rgba(39,153,137,.14);border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:12px}
.color-image-panel-head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}
.color-image-title{font-size:11px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;color:var(--tl)}
.color-image-sub{font-size:11px;color:var(--gr);line-height:1.45;margin-top:2px}
.color-image-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(275px,1fr));gap:14px}
.color-image-card{background:#fff;border:1px solid rgba(185,220,210,.62);border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:12px;box-shadow:0 2px 10px rgba(39,153,137,.05);overflow:visible}
.color-image-card-top{display:flex;align-items:center;gap:9px;min-width:0}
.color-image-swatch{width:28px;height:28px;border-radius:50%;border:2px solid rgba(255,255,255,.9);box-shadow:0 1px 4px rgba(0,0,0,.16);flex-shrink:0}
.color-image-name{font-size:12px;font-weight:900;color:var(--bk);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.color-image-sku{font-family:monospace;font-size:10px;font-weight:500;color:var(--tl);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.color-image-thumbs{display:grid;grid-template-columns:repeat(auto-fill,minmax(82px,1fr));gap:10px;overflow:visible;padding:2px 0 0;min-height:auto;align-items:start}
.color-image-thumb{width:100%;min-height:112px;border-radius:10px;background:var(--sf4);border:1px solid rgba(185,220,210,.7);flex-shrink:0;position:relative;padding:6px;display:flex;flex-direction:column;gap:6px;overflow:hidden;cursor:grab;transition:transform .16s ease, opacity .16s ease, border-color .16s ease, box-shadow .16s ease}
.color-image-thumb:active{cursor:grabbing}
.color-image-thumb.dragging{opacity:.42;transform:scale(.96);border-color:var(--tl);box-shadow:0 0 0 2px rgba(39,153,137,.16)}
.color-image-thumb.drop-before::before,.color-image-thumb.drop-after::after{content:'';position:absolute;top:6px;bottom:30px;width:4px;border-radius:999px;background:var(--cy);box-shadow:0 0 0 3px rgba(45,204,211,.18);z-index:5;pointer-events:none}
.color-image-thumb.drop-before::before{left:-2px}
.color-image-thumb.drop-after::after{right:-2px}
.color-image-thumb img{width:100%;aspect-ratio:1/1;height:auto;object-fit:cover;display:block;border-radius:8px;background:#fff}
.color-image-thumb.main-selected{border-color:var(--tl);box-shadow:0 0 0 2px rgba(39,153,137,.18);background:rgba(185,220,210,.32)}
.color-image-thumb button{position:absolute;right:5px;top:5px;width:20px;height:20px;border:none;border-radius:50%;background:rgba(239,68,68,.94);color:#fff;font-size:12px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:4;box-shadow:0 2px 6px rgba(0,0,0,.18)}
.color-main-check{position:static;z-index:3;display:flex;align-items:center;justify-content:center;gap:5px;background:rgba(255,255,255,.96);border:1px solid rgba(39,153,137,.22);border-radius:7px;padding:5px 6px;font-size:10px;font-weight:900;color:var(--tl);line-height:1;cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,.06);width:100%;min-height:24px;text-align:center}
.color-main-check input{width:13px;height:13px;margin:0;accent-color:var(--tl)}
.general-image-card{grid-column:1/-1;border-color:rgba(39,153,137,.24);background:rgba(255,255,255,.94)}
.general-image-swatch{width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,var(--tl),var(--cy));box-shadow:0 1px 4px rgba(39,153,137,.18);flex-shrink:0}
.color-image-empty{font-size:11px;font-weight:700;color:rgba(99,102,106,.58);background:rgba(255,255,255,.6);border:1px dashed rgba(185,220,210,.7);border-radius:8px;padding:10px;display:flex;align-items:center;justify-content:center;min-height:44px;text-align:center}
.color-upload-btn{position:relative;display:flex;align-items:center;justify-content:center;gap:6px;background:rgba(39,153,137,.1);border:1.5px dashed rgba(39,153,137,.35);border-radius:8px;color:var(--tl);font-family:var(--fn);font-size:11px;font-weight:900;padding:8px;cursor:pointer;transition:var(--tr);overflow:hidden}
.color-upload-btn:hover{background:rgba(45,204,211,.16);border-color:var(--tl)}
.color-upload-btn input{position:absolute;inset:0;opacity:0;cursor:pointer}
@media(max-width:700px){.edit-modal-inner{max-width:calc(100vw - 22px)}.color-image-grid{grid-template-columns:1fr}.color-image-card{padding:12px}.color-image-thumbs{grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.color-image-thumb{min-height:105px}}
.upload-zone{aspect-ratio:1;border-radius:8px;border:2px dashed rgba(185,220,210,.7);background:var(--bg);cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;transition:var(--tr);font-family:var(--fn)}
.upload-zone:hover{border-color:var(--tl);background:var(--sf4)}
.uz-ico{font-size:24px;color:var(--tl)}
.uz-lbl{font-size:11px;font-weight:700;color:var(--tl)}
.uz-sub{font-size:10px;color:var(--gr);margin-top:4px;line-height:1.5}
.f-error{background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.25);border-radius:6px;padding:10px 14px;font-size:13px;color:#b91c1c}
.del-btn{background:rgba(239,68,68,.07);border:1px solid rgba(239,68,68,.3);border-radius:8px;padding:9px 14px;font-family:var(--fn);font-size:13px;font-weight:700;color:#b91c1c;cursor:pointer;transition:var(--tr)}
.del-btn:hover{background:rgba(239,68,68,.14)}
.cancel-btn{background:var(--bg);border:1px solid var(--sf7);border-radius:8px;padding:9px 14px;font-family:var(--fn);font-size:13px;font-weight:700;color:var(--gr);cursor:pointer;transition:var(--tr)}
.cancel-btn:hover{border-color:var(--gr)}
.save-btn{background:var(--tl);border:none;border-radius:8px;padding:9px 20px;font-family:var(--fn);font-size:13px;font-weight:700;color:#fff;cursor:pointer;transition:var(--tr)}
.save-btn:hover:not(:disabled){background:var(--tl2)}
.save-btn:disabled{opacity:.5;cursor:not-allowed}
 
/* EDIT BAR */
.edit-bar{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:300;background:#1c1917;border-radius:999px;padding:10px 16px 10px 20px;display:flex;align-items:center;gap:20px;box-shadow:0 8px 32px rgba(0,0,0,.3);border:1px solid rgba(245,158,11,.3);white-space:nowrap}
.eb-lbl{font-size:13px;font-weight:700;color:#f59e0b}
.eb-cnt{font-size:11px;color:rgba(255,255,255,.4)}
.eb-add{background:var(--tl);border:none;border-radius:999px;padding:7px 16px;font-family:var(--fn);font-size:12px;font-weight:700;color:#fff;cursor:pointer;transition:var(--tr)}
.eb-add:hover{background:var(--tl2)}
.eb-exit{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:999px;padding:7px 14px;font-family:var(--fn);font-size:12px;font-weight:700;color:rgba(255,255,255,.6);cursor:pointer;transition:var(--tr)}
.eb-exit:hover{background:rgba(255,255,255,.14);color:#fff}
 
/* INQUIRY */
.inq-link{display:flex;align-items:center;gap:12px;padding:13px 16px;background:var(--sf4);border-radius:8px;text-decoration:none;color:var(--tl);font-weight:700;font-size:14px;transition:var(--tr)}
.inq-link:hover{background:var(--sf7)}
 
/* YOUTUBE PLAYER */
.vm-yt-wrap{position:relative;width:100%;aspect-ratio:16/9;border-radius:10px;overflow:hidden;background:#000;margin-bottom:4px}
/* META ROW (dimensions + barcode) */
.vm-meta-row{display:flex;gap:16px;flex-wrap:wrap}
.vm-meta-item{display:flex;flex-direction:column;gap:3px;flex:1;min-width:140px;background:var(--sf4);border-radius:8px;padding:10px 14px;align-items:flex-start}
.vm-meta-lbl{font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--tl);opacity:.7}
.vm-meta-val{font-size:14px;font-weight:600;color:var(--bk)}
.vm-meta-code{font-family:monospace;font-size:13px;font-weight:700;color:var(--tl);letter-spacing:.06em}
/* HERO CAROUSEL */
.hero-carousel{position:relative;width:100%;border-radius:var(--rl);overflow:hidden;background:var(--sf4);margin-bottom:32px}
.hero-carousel.ar-16-9{aspect-ratio:16/9}
.hero-carousel.ar-1-1{aspect-ratio:1/1}
.hero-carousel.ar-custom{aspect-ratio:unset}
.hero-slides{position:relative;width:100%;height:100%}
.hero-slide{position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity .5s ease;pointer-events:none}
.hero-slide.active{opacity:1;pointer-events:auto;position:relative;inset:auto}
.hero-carousel.ar-custom .hero-slide{position:relative;inset:auto}
.hero-carousel.ar-custom .hero-slide:not(.active){display:none}
.hero-slide img{width:100%;height:100%;object-fit:cover;object-position:center;display:block}
.hero-carousel.ar-custom .hero-slide img{width:100%;height:auto;display:block}
/* Fallback when no banners */
.hero-default{padding:40px 48px;display:flex;align-items:center;gap:32px;position:relative;min-height:200px}
.hero-default::after{content:'';position:absolute;right:-40px;bottom:-40px;width:220px;height:220px;background:radial-gradient(circle,rgba(45,204,211,.2) 0%,transparent 70%);pointer-events:none}
/* Arrows */
.hero-arrow{position:absolute;top:50%;transform:translateY(-50%);z-index:10;width:40px;height:40px;border-radius:50%;border:none;background:rgba(255,255,255,.85);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;color:var(--tl);box-shadow:0 2px 8px rgba(0,0,0,.15);transition:var(--tr)}
.hero-arrow:hover{background:#fff;transform:translateY(-50%) scale(1.08)}
.hero-arrow.prev{left:12px}
.hero-arrow.next{right:12px}
/* Dots */
.hero-dots{position:absolute;bottom:12px;left:50%;transform:translateX(-50%);display:flex;gap:6px;z-index:10}
.hero-dot{width:7px;height:7px;border-radius:50%;border:none;cursor:pointer;transition:var(--tr);background:rgba(255,255,255,.5)}
.hero-dot.on{background:#fff;width:20px;border-radius:4px}
/* Edit overlay button */
.hero-edit-btn{position:absolute;top:12px;right:12px;z-index:20;background:rgba(255,255,255,.9);border:none;border-radius:8px;padding:7px 12px;font-family:var(--fn);font-size:12px;font-weight:700;color:var(--tl);cursor:pointer;display:flex;align-items:center;gap:6px;box-shadow:var(--sh);transition:var(--tr)}
.hero-edit-btn:hover{background:#fff;transform:translateY(-1px)}
/* HERO TWO-COLUMN MEDIA */
.hero-media-grid{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(320px,.8fr);gap:16px;margin-bottom:32px;align-items:stretch}
.hero-media-grid.is-single{grid-template-columns:1fr}
.hero-media-card{background:var(--wh);border:1px solid rgba(185,220,210,.4);box-shadow:var(--sh);border-radius:var(--rl);overflow:hidden;min-width:0}
.hero-banner-card .hero-carousel{border-radius:0;margin-bottom:0;background:var(--sf4)}
.hero-media-caption{padding:12px 16px;border-top:1px solid rgba(185,220,210,.3);display:flex;align-items:center;justify-content:space-between;gap:12px;background:#fff}
.hero-media-title{font-family:var(--fn);font-size:14px;font-weight:800;color:var(--bk);line-height:1.25;margin-bottom:2px}
.hero-media-subtitle{font-family:var(--fn);font-size:12px;color:var(--gr);line-height:1.4}
.hero-media-action{background:var(--tl);color:#fff;border:none;border-radius:8px;padding:7px 14px;font-family:var(--fn);font-size:12px;font-weight:800;cursor:pointer;white-space:nowrap;flex-shrink:0;transition:var(--tr)}
.hero-media-action:hover{background:var(--tl2)}
.hero-video-card{display:flex;min-height:100%}
.hero-video-frame{position:relative;width:100%;aspect-ratio:16/9;background:var(--sf4);display:flex;align-items:center;justify-content:center;overflow:hidden}
.hero-video-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0;display:block;background:transparent}
.hero-video-thumb{position:absolute;inset:0;width:100%;height:100%;border:none;background:var(--sf4);cursor:pointer;padding:0;overflow:hidden;display:flex;align-items:center;justify-content:center}
.hero-video-thumb img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;display:block;filter:saturate(.96)}
.hero-video-thumb::after{content:none}
.hero-video-edit-btn{position:absolute;top:10px;right:10px;z-index:5;background:rgba(255,255,255,.92);border:1px solid rgba(39,153,137,.18);border-radius:999px;padding:6px 11px;font-family:var(--fn);font-size:11px;font-weight:900;color:var(--tl);cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.12);transition:var(--tr)}
.hero-video-edit-btn:hover{background:#fff;transform:translateY(-1px)}
.hero-video-empty{position:relative;z-index:2;color:#fff;font-size:13px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;opacity:.7}
.hero-empty-card{width:100%;aspect-ratio:16/9;min-height:0;border:none;background:var(--sf4);color:var(--tl);font-family:var(--fn);font-size:14px;font-weight:900;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:var(--tr)}
.hero-empty-card:hover{background:var(--sf7)}
@media(max-width:1000px){.hero-media-grid{grid-template-columns:1fr}.hero-video-card{min-height:auto}}
 
/* Banner edit modal */
.banner-modal{max-width:600px}
.aspect-btns{display:flex;gap:8px;flex-wrap:wrap}
.aspect-btn{font-family:var(--fn);font-size:12px;font-weight:700;padding:7px 16px;border-radius:8px;border:2px solid var(--sf7);background:var(--bg);color:var(--gr);cursor:pointer;transition:var(--tr)}
.aspect-btn:hover{border-color:var(--tl);color:var(--tl)}
.aspect-btn.on{border-color:var(--tl);background:var(--tl);color:#fff}
.banner-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px;margin-top:4px}
.banner-thumb{position:relative;border-radius:8px;overflow:hidden;border:1.5px solid rgba(185,220,210,.5);background:var(--sf4);aspect-ratio:16/9}
.banner-thumb img{width:100%;height:100%;object-fit:cover;display:block}
.banner-thumb .bt-actions{position:absolute;inset:0;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;gap:4px;opacity:0;transition:var(--tr)}
.banner-thumb:hover .bt-actions{opacity:1}
.bt-actions button{background:rgba(255,255,255,.88);border:none;border-radius:4px;padding:4px 7px;cursor:pointer;font-size:12px}
.bt-rm{background:rgba(239,68,68,.85)!important;color:#fff}
.banner-add-zone{aspect-ratio:16/9;border-radius:8px;border:2px dashed rgba(185,220,210,.7);background:var(--bg);cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;transition:var(--tr)}
.banner-add-zone:hover{border-color:var(--tl);background:var(--sf4)}
 
/* RESPONSIVE */
@media(max-width:1024px){
  .qnh-sidebar{display:none}
  .qnh-main{margin-left:0}
  .mob-filter-btn{display:none}
  .tb-menu-btn{display:flex}
}
@media(max-width:768px){
  .tb-tg{display:none}
  .hero{padding:28px 24px;flex-direction:column;gap:16px}
  .h-ti{font-size:36px}
  .h-stat{text-align:left}
  .f-row{grid-template-columns:1fr}
}
@media(max-width:480px){
  .qnh-topbar{padding:0 12px;gap:8px}
  .tb-wm{font-size:16px}
  .tb-tg{display:none}
  .tb-logo{height:24px;max-width:92px}
  .tb-brand-edit{display:none}
  .tb-edit-btn span:last-child{display:none}
  .qnh-main{padding:16px 14px 100px}
  .hero{padding:20px 16px}
  .h-ti{font-size:28px}
  .modal-bg{padding:0;align-items:flex-end}
  .modal{max-height:96vh;border-radius:var(--rl) var(--rl) 0 0}
  .edit-bar{bottom:12px;left:12px;right:12px;transform:none;border-radius:12px}
  .eb-cnt{display:none}
}
 
 
/* MOBILE EDIT MODE BAR — COMPACT SAFE DOCK */
@media (max-width: 640px) {
  .edit-bar {
    left: 12px !important;
    right: 12px !important;
    bottom: calc(14px + env(safe-area-inset-bottom, 0px)) !important;
    transform: none !important;
    width: auto !important;
    max-width: calc(100vw - 24px) !important;
    border-radius: 18px !important;
    padding: 10px !important;
    gap: 10px !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: stretch !important;
    white-space: normal !important;
    overflow: visible !important;
  }
 
  .edit-bar > div:first-child {
    width: 100% !important;
    justify-content: flex-start !important;
    padding: 0 4px !important;
  }
 
  .edit-bar > div:nth-child(2) {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 8px !important;
    width: 100% !important;
  }
 
  .edit-bar .eb-add,
  .edit-bar .eb-exit {
    width: 100% !important;
    min-width: 0 !important;
    height: 40px !important;
    padding: 0 10px !important;
    border-radius: 12px !important;
    font-size: 12px !important;
    line-height: 1.1 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    text-align: center !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }
 
  .edit-bar .eb-cnt {
    display: none !important;
  }
}
 
/* MOBILE PRODUCT MODAL — FULLSCREEN PAGE STYLE */
@media (max-width: 640px) {
  .modal-bg {
    padding: 0 !important;
    align-items: stretch !important;
    justify-content: stretch !important;
    background: var(--wh) !important;
    backdrop-filter: none !important;
  }
 
  .modal {
    width: 100vw !important;
    height: 100dvh !important;
    max-width: none !important;
    max-height: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    display: block !important;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch !important;
  }
 
  .m-hdr {
    position: relative !important;
    padding: 28px 52px 24px 24px !important;
    border-radius: 0 !important;
  }
 
  .m-close {
    position: absolute !important;
    top: 22px !important;
    right: 18px !important;
    width: 42px !important;
    height: 42px !important;
    font-size: 18px !important;
    z-index: 3 !important;
  }
 
  .m-body {
    overflow: visible !important;
    padding: 20px 18px 96px !important;
    max-height: none !important;
  }
 
  .m-footer {
    position: sticky !important;
    bottom: 0 !important;
    z-index: 5 !important;
    border-radius: 0 !important;
    padding: 12px 14px calc(12px + env(safe-area-inset-bottom)) !important;
    background: rgba(255,255,255,.96) !important;
    backdrop-filter: blur(10px) !important;
  }
 
  .vm-main-wrap {
    border-radius: 14px !important;
  }
 
  .vm-thumbs {
    padding-bottom: 8px !important;
  }
}
 
 
 
/* QUENCHABLES BUILDER */
.quench-hero{margin:28px 0 28px;background:linear-gradient(135deg,rgba(185,220,210,.55),rgba(255,255,255,.92));border:1px solid rgba(39,153,137,.16);border-radius:22px;padding:26px;display:grid;grid-template-columns:minmax(0,1.1fr) minmax(280px,.9fr);gap:24px;align-items:center;box-shadow:0 12px 34px rgba(39,153,137,.08);overflow:hidden;position:relative}
.quench-hero::after{content:'';position:absolute;right:-80px;top:-80px;width:220px;height:220px;background:radial-gradient(circle,rgba(45,204,211,.20),transparent 70%);pointer-events:none}
.quench-eyebrow{font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--tl);opacity:.82;margin-bottom:6px}
.quench-title{font-size:38px;line-height:1.05;font-weight:900;color:var(--tl);letter-spacing:-.025em;margin:0 0 10px}
.quench-sub{font-size:15px;color:rgba(58,58,58,.72);line-height:1.65;max-width:620px;margin:0 0 18px}
.quench-actions{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.quench-start,.quench-next,.quench-send,.quench-add{border:none;border-radius:12px;background:var(--tl);color:#fff;font-family:var(--fn);font-size:13px;font-weight:900;padding:12px 18px;cursor:pointer;transition:var(--tr);text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:42px;box-shadow:0 8px 20px rgba(39,153,137,.16)}
.quench-start:hover,.quench-next:hover,.quench-send:hover,.quench-add:hover{background:var(--tl2);transform:translateY(-1px)}
.quench-add:disabled{background:rgba(39,153,137,.18)!important;color:var(--tl)!important;cursor:not-allowed;transform:none!important;box-shadow:none!important;border:1px solid rgba(39,153,137,.18)}
.quench-selected-pill{display:inline-flex;align-items:center;gap:5px;width:max-content;font-size:10px;font-weight:900;letter-spacing:.04em;text-transform:uppercase;color:var(--tl);background:rgba(45,204,211,.13);border:1px solid rgba(39,153,137,.18);border-radius:999px;padding:4px 8px;margin-top:2px}
.quench-next:disabled{opacity:.45;cursor:not-allowed;transform:none;background:rgba(39,153,137,.45)}
.quench-mini-collections{display:flex;gap:7px;flex-wrap:wrap}
.quench-chip{border:1px solid rgba(39,153,137,.16);background:rgba(255,255,255,.78);color:var(--tl);border-radius:999px;padding:8px 11px;font-family:var(--fn);font-size:12px;font-weight:900;cursor:pointer;transition:var(--tr)}
.quench-chip:hover{background:#fff;border-color:var(--tl);transform:translateY(-1px)}
.quench-visual{position:relative;z-index:1;min-height:230px;border-radius:18px;background:linear-gradient(145deg,rgba(255,255,255,.72),rgba(185,220,210,.32));border:1px solid rgba(255,255,255,.7);display:flex;align-items:center;justify-content:center;padding:26px;overflow:hidden}
.quench-visual::before{content:'Quenchables';font-size:34px;font-weight:900;color:rgba(39,153,137,.16);letter-spacing:-.04em;position:absolute;top:22px;left:24px}
.quench-visual::after{content:'Sip · Savor · Go';position:absolute;bottom:22px;right:24px;font-size:11px;font-weight:900;letter-spacing:.14em;text-transform:uppercase;color:rgba(39,153,137,.34)}
.quench-visual-dot{width:54px;height:54px;border-radius:50%;border:4px solid rgba(255,255,255,.82);box-shadow:0 12px 28px rgba(0,0,0,.10);margin-left:-10px}
.quench-visual-dot:first-child{margin-left:0}
 
.quench-modal{max-width:1040px;width:min(1040px,calc(100vw - 28px));max-height:min(92vh,900px);overflow:hidden}
.quench-head{background:linear-gradient(135deg,rgba(185,220,210,.45),rgba(255,255,255,.96));border-bottom:1px solid rgba(39,153,137,.12)}
.quench-progress{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:12px}
.quench-step{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:800;color:rgba(58,58,58,.50);border:none;background:transparent;padding:0;font-family:var(--fn);cursor:pointer;transition:var(--tr)}
.quench-step::after{content:'';width:24px;height:1px;background:rgba(39,153,137,.18);margin-left:2px}
.quench-step:last-child::after{display:none}
.quench-step-dot{width:24px;height:24px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:rgba(39,153,137,.10);color:var(--tl);font-size:11px;font-weight:900}
.quench-step.on{color:var(--tl)}
.quench-step.on .quench-step-dot{background:var(--tl);color:#fff}
.quench-step:hover:not(:disabled){color:var(--tl)}
.quench-step:hover:not(:disabled) .quench-step-dot{background:rgba(39,153,137,.18)}
.quench-step:disabled{opacity:.42;cursor:not-allowed}
.quench-back{margin-top:10px;border:1px solid rgba(39,153,137,.20);background:#fff;color:var(--tl);border-radius:999px;padding:7px 12px;font-family:var(--fn);font-size:12px;font-weight:900;cursor:pointer;transition:var(--tr)}
.quench-back:hover{background:rgba(185,220,210,.35);border-color:var(--tl)}
.quench-body{display:grid;grid-template-columns:280px minmax(0,1fr);gap:18px;padding:22px;background:#fff;overflow:auto}
.quench-body.no-side{grid-template-columns:1fr}
.quench-body.no-side .quench-side{display:none}
.quench-side{display:flex;flex-direction:column;gap:14px;min-width:0}
.quench-side-title,.quench-set-title{font-size:12px;font-weight:900;letter-spacing:.10em;text-transform:uppercase;color:var(--tl)}
.quench-collection-list{display:flex;flex-direction:column;gap:8px;background:var(--bg);border:1px solid rgba(185,220,210,.55);border-radius:14px;padding:10px}
.quench-collection-btn{width:100%;border:1px solid transparent;background:#fff;border-radius:12px;padding:11px 12px;display:flex;align-items:center;gap:10px;text-align:left;cursor:pointer;font-family:var(--fn);transition:var(--tr)}
.quench-collection-btn:hover{border-color:rgba(39,153,137,.24);transform:translateY(-1px)}
.quench-collection-btn.on{background:rgba(185,220,210,.38);border-color:var(--tl);box-shadow:0 4px 14px rgba(39,153,137,.08)}
.quench-collection-dot{width:16px;height:16px;border-radius:50%;border:2px solid rgba(255,255,255,.75);box-shadow:0 1px 4px rgba(0,0,0,.12);flex-shrink:0}
.quench-collection-name{display:block;font-size:13px;font-weight:900;color:var(--bk);line-height:1.15}
.quench-collection-sub{display:block;font-size:11px;font-weight:700;color:rgba(58,58,58,.56);margin-top:2px}
.quench-set{background:var(--bg);border:1px solid rgba(185,220,210,.55);border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:10px}
.quench-set-item{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;background:#fff;border:1px solid rgba(185,220,210,.55);border-radius:12px;padding:10px}
.quench-set-name{font-size:13px;font-weight:900;color:var(--bk);line-height:1.25}
.quench-set-meta{font-size:11px;font-weight:700;color:rgba(58,58,58,.58);line-height:1.45;margin-top:2px}
.quench-empty{font-size:13px;color:rgba(58,58,58,.62);background:rgba(255,255,255,.70);border:1px dashed rgba(39,153,137,.18);border-radius:12px;padding:14px;line-height:1.5}
.quench-main{min-width:0;display:flex;flex-direction:column;gap:16px}
.quench-feature-card{border:1px solid rgba(185,220,210,.65);border-radius:16px;background:linear-gradient(135deg,rgba(185,220,210,.22),rgba(255,255,255,.95));padding:22px;min-height:280px;display:flex;flex-direction:column;justify-content:space-between;gap:18px;overflow:hidden;position:relative}
.quench-feature-title{font-size:24px;font-weight:900;color:var(--bk);letter-spacing:-.02em;line-height:1.15}
.quench-feature-sub{font-size:14px;color:rgba(58,58,58,.68);line-height:1.6;margin-top:5px;max-width:560px}
.quench-color-row{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-top:18px}
.quench-color-dot{width:44px;height:44px;border-radius:50%;border:4px solid rgba(255,255,255,.85);box-shadow:0 4px 14px rgba(0,0,0,.13)}
.quench-tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px}
.quench-tab{border:1px solid rgba(39,153,137,.18);background:#fff;color:var(--tl);border-radius:999px;padding:8px 12px;font-family:var(--fn);font-size:12px;font-weight:900;cursor:pointer;transition:var(--tr)}
.quench-tab:hover,.quench-tab.on{background:rgba(185,220,210,.45);border-color:var(--tl)}
.quench-product-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;max-height:470px;overflow:auto;padding-right:4px}
.quench-product{background:#fff;border:1px solid rgba(185,220,210,.62);border-radius:14px;padding:12px;display:flex;flex-direction:column;gap:10px;box-shadow:0 2px 12px rgba(39,153,137,.05)}
.quench-prod-top{display:grid;grid-template-columns:70px minmax(0,1fr);gap:10px;align-items:center}
.quench-prod-img{width:70px;height:70px;border-radius:10px;background:rgba(185,220,210,.38);object-fit:cover;display:block}
.quench-prod-name{font-size:13px;font-weight:900;color:var(--bk);line-height:1.25}
.quench-prod-meta{font-size:11px;font-weight:800;color:var(--tl);margin-top:4px}
.quench-form-row{display:grid;grid-template-columns:minmax(0,1.5fr) 76px;gap:8px;align-items:center}
.quench-select,.quench-input,.quench-note{font-family:var(--fn);font-size:13px;color:var(--bk);background:var(--bg);border:1px solid rgba(185,220,210,.75);border-radius:10px;padding:9px 10px;outline:none;width:100%}
.quench-select:focus,.quench-input:focus,.quench-note:focus{border-color:var(--tl);background:#fff}
.quench-note{min-height:130px;resize:vertical;line-height:1.55}
.quench-add{width:100%;box-shadow:none;padding:10px 12px;min-height:38px}
.quench-remove{border:none;background:rgba(239,68,68,.08);color:#b91c1c;border-radius:9px;padding:7px 9px;font-family:var(--fn);font-size:11px;font-weight:900;cursor:pointer;white-space:nowrap}
.quench-summary{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.quench-total{background:rgba(185,220,210,.26);border:1px solid rgba(185,220,210,.65);border-radius:14px;padding:14px;text-align:center}
.quench-total-val{font-size:24px;font-weight:900;color:var(--tl);line-height:1}
.quench-total-lbl{font-size:10px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;color:rgba(58,58,58,.58);margin-top:5px}
.quench-send{width:100%;margin-top:4px}
 
@media(max-width:900px){
  .quench-hero{grid-template-columns:1fr;padding:22px;margin:24px 0;gap:16px}
  .quench-visual{min-height:150px}
  .quench-title{font-size:34px}
  .quench-modal{width:100vw!important;max-width:none!important;height:100dvh!important;max-height:none!important;border-radius:0!important}
  .quench-body{grid-template-columns:1fr;gap:14px;padding:16px}
  .quench-side{order:2}
  .quench-main{order:1}
  .quench-product-grid{grid-template-columns:1fr;max-height:none;overflow:visible;padding-right:0}
  .quench-progress{gap:6px}
  .quench-step{font-size:11px}
  .quench-step::after{width:14px}
}
@media(max-width:640px){
  .quench-hero{border-radius:18px;padding:20px;margin:20px 0;background:linear-gradient(145deg,rgba(185,220,210,.50),rgba(255,255,255,.96))}
  .quench-title{font-size:30px}
  .quench-sub{font-size:14px}
  .quench-actions{display:block}
  .quench-start{width:100%;margin-bottom:12px}
  .quench-mini-collections{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}
  .quench-chip{font-size:11px;padding:8px 6px;text-align:center}
  .quench-visual{display:none}
  .quench-head{padding:22px 18px!important}
  .quench-head .quench-title{font-size:28px;margin-right:48px}
  .quench-progress{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin-top:14px}
  .quench-step{font-size:0;justify-content:center;gap:0}
  .quench-step::after{display:none}
  .quench-step-dot{width:28px;height:28px;font-size:12px}
  .quench-body{padding:14px;overflow-y:auto;-webkit-overflow-scrolling:touch}
  .quench-feature-card{min-height:auto;padding:18px;border-radius:14px}
  .quench-feature-title{font-size:20px}
  .quench-feature-sub{font-size:13px}
  .quench-color-dot{width:38px;height:38px}
  .quench-form-row{grid-template-columns:1fr 74px}
  .quench-summary{grid-template-columns:repeat(3,1fr);gap:7px}
  .quench-total{padding:11px 6px}
  .quench-total-val{font-size:20px}
  .quench-collection-list{display:grid;grid-template-columns:1fr;gap:7px}
  .quench-set{padding:12px}
}
 
 
/* ─── UI CONSISTENCY PASS — QUENCHA DESIGN SYSTEM ─────────────────────────────
   Unified typography, spacing, buttons, cards, modals, edit mode, and mobile UI
   across catalog, product modal, Quenchables, sidebar, and admin/edit forms.
*/
:root{
  --q-space-1:4px;--q-space-2:8px;--q-space-3:12px;--q-space-4:16px;--q-space-5:20px;--q-space-6:24px;--q-space-8:32px;
  --q-radius-sm:8px;--q-radius-md:12px;--q-radius-lg:18px;--q-radius-xl:24px;
  --q-border:1px solid rgba(39,153,137,.16);
  --q-border-strong:1.5px solid rgba(39,153,137,.28);
  --q-surface:#ffffff;
  --q-surface-mint:rgba(185,220,210,.28);
  --q-surface-mint-strong:rgba(185,220,210,.48);
  --q-text:#3A3A3A;
  --q-muted:rgba(58,58,58,.62);
  --q-muted-2:rgba(58,58,58,.45);
  --q-shadow-soft:0 8px 28px rgba(39,153,137,.10);
  --q-shadow-card:0 2px 14px rgba(39,153,137,.08);
  --q-shadow-float:0 18px 60px rgba(39,153,137,.20);
}
body{font-size:14px;color:var(--q-text);background:var(--bg)}
button,input,select,textarea{font-family:var(--fn)}
 
/* Shared type rhythm */
.h-ey,.sb-lbl,.cat-nm,.vm-tlbl,.f-lbl,.sub-hd,.collection-title,.qey,.q-step-label,.q-section-eyebrow{font-size:10px!important;font-weight:900!important;letter-spacing:.12em!important;text-transform:uppercase!important;color:var(--tl)!important}
.h-ti,.q-title{font-size:clamp(30px,4vw,48px)!important;line-height:1.05!important;letter-spacing:-.035em!important;font-weight:900!important;color:var(--tl)!important}
.h-su,.q-sub,.vm-desc,.f-hint{font-size:14px!important;line-height:1.65!important;color:var(--q-muted)!important}
.c-name,.vm-color-name,.q-card-title,.q-product-name{font-weight:900!important;letter-spacing:-.01em!important;color:var(--q-text)!important}
.c-desc,.q-card-copy,.q-product-meta,.q-helper{font-size:12.5px!important;line-height:1.55!important;color:var(--q-muted)!important}
 
/* Shared buttons */
button{touch-action:manipulation}
.add-btn,.save-btn,.pw-submit,.vm-inq-btn,.tb-inq,.q-primary,.q-next,.q-add-btn,.q-send-btn,.collection-add-set,.collection-add-row button{
  background:var(--tl)!important;color:#fff!important;border:1px solid var(--tl)!important;border-radius:var(--q-radius-md)!important;
  min-height:42px!important;padding:10px 16px!important;font-size:13px!important;font-weight:900!important;letter-spacing:.01em!important;
  box-shadow:0 8px 22px rgba(39,153,137,.16)!important;transition:transform .18s ease,box-shadow .18s ease,background .18s ease!important
}
.add-btn:hover,.save-btn:hover,.pw-submit:hover,.vm-inq-btn:hover,.tb-inq:hover,.q-primary:hover,.q-next:hover,.q-add-btn:hover,.q-send-btn:hover,.collection-add-set:hover,.collection-add-row button:hover{background:var(--tl2)!important;transform:translateY(-1px)!important;box-shadow:0 12px 28px rgba(39,153,137,.22)!important}
.cancel-btn,.q-secondary,.collection-save-set,.qb-back,.qb-ghost{
  background:#fff!important;color:var(--tl)!important;border:1.5px solid rgba(39,153,137,.22)!important;border-radius:var(--q-radius-md)!important;
  min-height:42px!important;padding:10px 16px!important;font-size:13px!important;font-weight:900!important;box-shadow:none!important
}
.del-btn,.q-danger{
  background:rgba(239,68,68,.08)!important;color:#b91c1c!important;border:1.5px solid rgba(239,68,68,.24)!important;border-radius:var(--q-radius-md)!important;
  min-height:42px!important;padding:10px 16px!important;font-size:13px!important;font-weight:900!important
}
 
/* Cards and surfaces */
.hero,.q-hero,.q-builder-card,.q-review-card,.q-inquiry-card,.pcard,.modal,.pw-modal,.vm-color-item,.color-collection-panel,.collection-item,.collection-set-editor,.color-row,.img-color-card,.img-general-card,.f-in,.f-sel,.f-ta,.in-sm,.sort-sel{
  border-radius:var(--q-radius-lg)!important;border:var(--q-border)!important
}
.pcard,.q-builder-card,.q-review-card,.q-inquiry-card,.collection-item,.color-row,.img-color-card,.img-general-card{box-shadow:var(--q-shadow-card)!important;background:var(--q-surface)!important}
.hero,.q-hero{background:linear-gradient(135deg,rgba(185,220,210,.42),rgba(247,250,249,.92))!important;border:var(--q-border)!important;box-shadow:var(--q-shadow-soft)!important}
 
/* Forms */
.f-in,.f-sel,.f-ta,.in-sm,.collection-name,.collection-add-row input[type=text],.hex-in,.collection-select,.sort-sel{
  background:#fff!important;border:1.5px solid rgba(39,153,137,.18)!important;border-radius:var(--q-radius-md)!important;color:var(--q-text)!important;font-size:13px!important;min-height:40px!important
}
.f-in:focus,.f-sel:focus,.f-ta:focus,.in-sm:focus,.collection-name:focus,.collection-add-row input[type=text]:focus,.collection-select:focus,.sort-sel:focus{border-color:var(--tl)!important;box-shadow:0 0 0 3px rgba(39,153,137,.08)!important;background:#fff!important}
 
/* Sidebar filters as clear controls */
.fb,.pc{border-radius:999px!important;background:rgba(255,255,255,.62)!important;border:1px solid rgba(39,153,137,.12)!important;min-height:36px!important}
.fb.on,.pc.on{background:#fff!important;border-color:var(--tl)!important;box-shadow:0 4px 14px rgba(39,153,137,.10)!important;color:var(--tl)!important}
.fb-cnt,.cat-cnt,.collection-set-count{min-width:32px;text-align:center;font-variant-numeric:tabular-nums}
 
/* Product cards */
.pcard{overflow:hidden!important;border-color:rgba(39,153,137,.14)!important}
.c-body{gap:8px!important;padding:16px!important}
.c-name{font-size:15px!important;line-height:1.25!important}
.c-badge,.vm-badge,.h-chip{font-size:10px!important;font-weight:900!important;border-radius:999px!important;background:rgba(185,220,210,.45)!important;color:var(--tl)!important}
.c-stat-val,.vm-pval{font-weight:900!important;color:var(--tl)!important;letter-spacing:-.03em!important}
 
/* Modal consistency */
.modal-bg{padding:18px!important;background:rgba(39,153,137,.16)!important;backdrop-filter:blur(7px)!important}
.modal{box-shadow:var(--q-shadow-float)!important;overflow:hidden!important}
.m-hdr{background:linear-gradient(135deg,rgba(185,220,210,.40),rgba(255,255,255,.96))!important;border-bottom:1px solid rgba(39,153,137,.12)!important;padding:24px 28px!important}
.m-body{padding:24px 28px!important;gap:18px!important}
.m-footer{padding:16px 24px!important;border-top:1px solid rgba(39,153,137,.12)!important;background:rgba(255,255,255,.94)!important}
.m-close{width:40px!important;height:40px!important;background:rgba(39,153,137,.08)!important;color:var(--q-text)!important;font-size:18px!important}
.m-close:hover{background:rgba(39,153,137,.14)!important;color:var(--tl)!important}
 
/* Product detail modal */
.vm-main-wrap{border-radius:var(--q-radius-lg)!important;background:var(--q-surface-mint)!important;border:var(--q-border)!important}
.vm-thumbs{gap:10px!important;padding:4px 2px 8px!important}
.vm-thumb{border-radius:var(--q-radius-md)!important;border:2px solid rgba(39,153,137,.12)!important}
.vm-thumb.on{border-color:var(--cy)!important;box-shadow:0 0 0 3px rgba(45,204,211,.12)!important}
.vm-color-grid{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:10px!important}
.vm-color-item{padding:10px 12px!important;border-radius:var(--q-radius-md)!important;background:#fff!important}
.vm-color-item:hover{border-color:var(--tl)!important;background:rgba(185,220,210,.14)!important}
.vm-color-swatch{width:34px!important;height:34px!important;box-shadow:0 3px 10px rgba(0,0,0,.12)!important}
 
/* Edit mode/admin consistency */
.edit-modal-inner{max-width:860px!important}
.em-hdr{background:linear-gradient(135deg,rgba(245,158,11,.07),rgba(255,255,255,.96))!important;border-bottom:1px solid rgba(245,158,11,.14)!important}
.em-title{font-size:20px!important;line-height:1.2!important;font-weight:900!important;color:var(--q-text)!important}
.em-tabs{gap:4px!important;background:#fff!important;border-bottom:1px solid rgba(39,153,137,.12)!important;padding:0 18px!important;overflow-x:auto!important}
.em-tab{min-height:44px!important;border-radius:10px 10px 0 0!important;padding:12px 14px!important;font-size:12px!important;font-weight:900!important;white-space:nowrap!important}
.em-tab.on{background:rgba(185,220,210,.28)!important;border-bottom-color:var(--tl)!important;color:var(--tl)!important}
.em-panel{padding:20px!important;gap:16px!important;background:linear-gradient(180deg,#fff,rgba(247,250,249,.88))!important}
.color-collection-panel{background:linear-gradient(180deg,rgba(185,220,210,.36),rgba(247,250,249,.86))!important;padding:18px!important}
.collection-grid{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:12px!important}
.collection-item{grid-template-columns:42px minmax(0,1fr)!important;padding:14px!important;align-items:start!important}
.collection-item input[type=color]{width:38px!important;height:38px!important;border-radius:50%!important;overflow:hidden!important}
.collection-actions{grid-column:1/-1!important;display:grid!important;grid-template-columns:auto 1fr auto!important;gap:10px!important;align-items:center!important;margin-top:10px!important}
.collection-add-set{min-width:120px!important}
.collection-save-set{min-width:86px!important}
.collection-set-editor{grid-column:1/-1!important;margin-top:12px!important;padding:14px!important;background:#fff!important;border:1.5px dashed rgba(39,153,137,.25)!important;box-shadow:inset 0 0 0 1px rgba(185,220,210,.20)!important}
.collection-color-edit-row{display:grid!important;grid-template-columns:42px 72px minmax(0,1fr) 72px 38px!important;gap:8px!important;align-items:center!important;padding:10px!important;border:1px solid rgba(39,153,137,.12)!important;border-radius:var(--q-radius-md)!important;background:rgba(247,250,249,.86)!important;margin-bottom:8px!important}
.collection-color-edit-row .remove-color,.collection-remove,.set-remove,.swatch-rm{background:#fff1f2!important;color:#dc2626!important;border:1px solid rgba(220,38,38,.20)!important;border-radius:999px!important;width:30px!important;height:30px!important;display:flex!important;align-items:center!important;justify-content:center!important;font-weight:900!important;font-size:14px!important}
.collection-color-edit-row .move-btn,.set-move-btn{background:#fff!important;color:var(--tl)!important;border:1px solid rgba(39,153,137,.18)!important;border-radius:9px!important;width:32px!important;height:32px!important;font-weight:900!important}
.color-row{grid-template-columns:170px 120px minmax(0,1fr) 70px minmax(0,1.1fr) 28px!important;padding:12px!important}
.rm-btn{background:#fff1f2!important;color:#dc2626!important;border:1px solid rgba(220,38,38,.18)!important;border-radius:999px!important;width:30px!important;height:30px!important;display:flex!important;align-items:center!important;justify-content:center!important}
 
/* Image upload UI */
.img-grid,.image-card-grid{gap:12px!important}
.img-thumb,.image-thumb-card{border-radius:var(--q-radius-md)!important;border:1px solid rgba(39,153,137,.16)!important;background:#fff!important;box-shadow:0 2px 10px rgba(39,153,137,.08)!important}
.upload-zone{border-radius:var(--q-radius-md)!important;border:1.5px dashed rgba(39,153,137,.30)!important;background:rgba(185,220,210,.18)!important;min-height:44px!important}
.upload-zone:hover{background:rgba(185,220,210,.32)!important;border-color:var(--tl)!important}
 
/* Quenchables */
.q-section,.quenchables-section{background:linear-gradient(135deg,rgba(185,220,210,.34),rgba(247,250,249,.96))!important;border:var(--q-border)!important;border-radius:var(--q-radius-xl)!important;box-shadow:var(--q-shadow-soft)!important;padding:clamp(22px,4vw,44px)!important;margin:28px 0!important}
.q-collections,.q-collection-list{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(118px,1fr))!important;gap:10px!important;margin-top:18px!important}
.q-collection-chip,.q-collection-card{background:#fff!important;border:1.5px solid rgba(39,153,137,.18)!important;border-radius:999px!important;min-height:44px!important;padding:10px 14px!important;font-weight:900!important;color:var(--tl)!important;text-align:center!important}
.q-collection-chip.on,.q-collection-card.on{background:var(--tl)!important;color:#fff!important;border-color:var(--tl)!important;box-shadow:0 8px 20px rgba(39,153,137,.18)!important}
.qb-modal,.q-modal{border-radius:var(--q-radius-xl)!important;box-shadow:var(--q-shadow-float)!important;background:#fff!important;overflow:hidden!important}
.qb-header,.q-modal-header{background:linear-gradient(135deg,rgba(185,220,210,.45),rgba(255,255,255,.98))!important;border-bottom:1px solid rgba(39,153,137,.12)!important;padding:24px!important}
.qb-steps,.q-steps{display:flex!important;align-items:center!important;gap:8px!important;flex-wrap:wrap!important;margin-top:16px!important}
.qb-step,.q-step{display:flex!important;align-items:center!important;gap:6px!important;border:1px solid rgba(39,153,137,.12)!important;background:rgba(255,255,255,.70)!important;border-radius:999px!important;padding:7px 10px!important;color:var(--q-muted)!important;font-weight:900!important;font-size:12px!important}
.qb-step.on,.q-step.on{background:var(--tl)!important;color:#fff!important;border-color:var(--tl)!important}
.qb-step:disabled,.q-step:disabled{opacity:.45!important;cursor:not-allowed!important}
.qb-step-num,.q-step-num{width:24px!important;height:24px!important;border-radius:50%!important;background:rgba(39,153,137,.10)!important;color:inherit!important;display:flex!important;align-items:center!important;justify-content:center!important;font-weight:900!important}
.qb-step.on .qb-step-num,.q-step.on .q-step-num{background:rgba(255,255,255,.22)!important;color:#fff!important}
.qb-body,.q-modal-body{padding:24px!important;background:linear-gradient(180deg,#fff,rgba(247,250,249,.84))!important}
.qb-product-grid,.q-product-grid{display:grid!important;grid-template-columns:repeat(auto-fill,minmax(190px,1fr))!important;gap:14px!important}
.qb-product-card,.q-product-card,.qb-set-item,.q-set-item{border:1px solid rgba(39,153,137,.15)!important;border-radius:var(--q-radius-lg)!important;background:#fff!important;box-shadow:var(--q-shadow-card)!important;padding:14px!important}
.qb-product-card.already,.q-product-card.already{background:rgba(185,220,210,.18)!important;border-color:var(--tl)!important}
.qb-footer,.q-modal-footer{padding:16px 24px!important;border-top:1px solid rgba(39,153,137,.12)!important;background:rgba(255,255,255,.96)!important;display:flex!important;gap:10px!important;justify-content:space-between!important;align-items:center!important}
 
/* Mobile consistency */
@media(max-width:640px){
  :root{--nh:58px}
  body{font-size:13px!important}
  .qnh-topbar{height:58px!important;padding:0 12px!important;gap:8px!important}
  .tb-menu-btn{display:flex!important;width:42px!important;height:42px!important;border-radius:14px!important}
  .tb-logo{max-width:142px!important;height:30px!important}
  .tb-wm{font-size:16px!important;max-width:126px!important;overflow:hidden!important;text-overflow:ellipsis!important}
  .tb-tg{display:none!important}
  .tb-search-wrap{max-width:none!important;min-width:0!important;flex:1!important;margin:0!important}
  .tb-search{height:42px!important;font-size:13px!important;padding:9px 44px 9px 14px!important}
  .tb-clear{display:none!important}
  .tb-search-btn{width:34px!important;height:34px!important;right:4px!important}
  .tb-edit-btn{width:42px!important;height:42px!important;border-radius:50%!important}
  .qnh-main{margin-left:0!important;padding:24px 16px 110px!important}
  .hero,.q-section,.quenchables-section{padding:22px!important;margin:18px 0!important;border-radius:22px!important}
  .h-ti,.q-title{font-size:34px!important;line-height:1.02!important}
  .h-su,.q-sub{font-size:14px!important;line-height:1.58!important}
  .toolbar{gap:10px!important;margin:18px 0 22px!important}
  .res-label{width:100%!important;flex:0 0 100%!important;font-size:13px!important}
  .sort-sel{flex:1!important;height:48px!important;font-size:14px!important}
  .vbtns{height:48px!important;border-radius:14px!important}
  .vbtn{min-width:48px!important;height:40px!important;border-radius:10px!important}
  .modal-bg{padding:0!important;align-items:stretch!important;justify-content:stretch!important}
  .modal{width:100%!important;max-width:none!important;height:100dvh!important;max-height:100dvh!important;border-radius:0!important;border:none!important;box-shadow:none!important}
  .m-hdr{padding:28px 20px 22px!important;border-radius:0!important}
  .m-body{padding:20px!important;gap:16px!important}
  .m-footer{border-radius:0!important;padding:14px 16px calc(14px + env(safe-area-inset-bottom))!important;position:sticky!important;bottom:0!important;z-index:3!important}
  .m-close{width:54px!important;height:54px!important;font-size:22px!important}
  .vm-color-grid{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:9px!important}
  .vm-color-item{display:grid!important;grid-template-columns:34px minmax(0,1fr)!important;padding:10px 8px!important;gap:8px!important}
  .vm-color-name{font-size:12px!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
  .vm-color-sku{font-size:9px!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
  .f-row{grid-template-columns:1fr!important}
  .edit-modal-inner{max-width:none!important}
  .collection-grid{grid-template-columns:1fr!important}
  .collection-item{grid-template-columns:46px minmax(0,1fr)!important;padding:14px!important}
  .collection-actions{grid-template-columns:1fr 1fr!important}
  .collection-set-count{grid-column:1/-1!important;width:max-content!important;min-width:86px!important}
  .collection-add-set,.collection-save-set{width:100%!important;min-width:0!important}
  .collection-color-edit-row{grid-template-columns:42px 70px minmax(0,1fr) 62px 34px!important;gap:7px!important;padding:9px!important}
  .collection-color-edit-row input{font-size:12px!important;min-width:0!important}
  .color-row{grid-template-columns:1fr!important;gap:10px!important}
  .qb-modal,.q-modal{width:100%!important;max-width:none!important;height:100dvh!important;max-height:100dvh!important;border-radius:0!important}
  .qb-header,.q-modal-header{padding:28px 20px 22px!important}
  .qb-body,.q-modal-body{padding:20px!important}
  .qb-footer,.q-modal-footer{padding:14px 16px calc(14px + env(safe-area-inset-bottom))!important;position:sticky!important;bottom:0!important;z-index:3!important;flex-direction:column!important;align-items:stretch!important}
  .qb-steps,.q-steps{display:grid!important;grid-template-columns:repeat(4,1fr)!important;gap:8px!important}
  .qb-step,.q-step{justify-content:center!important;padding:8px!important;font-size:0!important}
  .qb-step-num,.q-step-num{width:34px!important;height:34px!important;font-size:13px!important}
  .qb-product-grid,.q-product-grid{grid-template-columns:1fr!important}
  .q-collections,.q-collection-list{grid-template-columns:repeat(2,minmax(0,1fr))!important}
}
 
/* ──────────────────────────────────────────────────────────────
   UI CONSISTENCY FIX: MOBILE MODAL SCROLL + HERO/QUENCHABLES TYPE
   This override keeps all top feature sections on one visual system
   and fixes mobile product modal scrolling.
────────────────────────────────────────────────────────────── */
.hero,
.quench-hero{
  background:linear-gradient(135deg,rgba(185,220,210,.42),rgba(247,250,249,.92))!important;
  border:1px solid rgba(39,153,137,.13)!important;
  border-radius:var(--q-radius-xl)!important;
  box-shadow:var(--q-shadow-soft)!important;
}
 
.h-ey,
.quench-eyebrow{
  font-family:var(--fn)!important;
  font-size:clamp(10px,1.1vw,12px)!important;
  line-height:1.15!important;
  font-weight:900!important;
  letter-spacing:.14em!important;
  text-transform:uppercase!important;
  color:var(--tl)!important;
  opacity:.78!important;
  margin-bottom:8px!important;
}
 
.h-ti,
.quench-title{
  font-family:var(--fn)!important;
  font-size:clamp(32px,4vw,48px)!important;
  line-height:1.05!important;
  font-weight:900!important;
  letter-spacing:-.035em!important;
  color:var(--tl)!important;
  margin:0 0 10px!important;
}
 
.h-su,
.quench-sub{
  font-family:var(--fn)!important;
  font-size:clamp(14px,1.25vw,15px)!important;
  line-height:1.62!important;
  font-weight:400!important;
  color:rgba(39,153,137,.72)!important;
  margin:0 0 20px!important;
  max-width:620px!important;
}
 
.quench-start,
.q-primary,
.save-btn,
.vm-inq-btn{
  font-size:14px!important;
  font-weight:900!important;
  border-radius:14px!important;
}
 
@media (max-width:640px){
  /* Top feature sections: same spacing and typography on mobile */
  .hero,
  .quench-hero{
    padding:28px 24px!important;
    margin:18px 0 22px!important;
    border-radius:24px!important;
  }
 
  .h-ey,
  .quench-eyebrow{
    font-size:11px!important;
    letter-spacing:.15em!important;
    margin-bottom:10px!important;
  }
 
  .h-ti,
  .quench-title{
    font-size:34px!important;
    line-height:1.04!important;
    color:var(--tl)!important;
  }
 
  .h-su,
  .quench-sub{
    font-size:15px!important;
    line-height:1.62!important;
    color:rgba(39,153,137,.70)!important;
  }
 
  .quench-start{
    width:100%!important;
    min-height:52px!important;
    font-size:15px!important;
  }
 
  /* Mobile product/detail modal: fix stuck/non-scrolling behavior */
  .modal-bg{
    padding:0!important;
    align-items:stretch!important;
    justify-content:stretch!important;
    background:#fff!important;
    backdrop-filter:none!important;
    overflow:hidden!important;
  }
 
  .modal{
    width:100vw!important;
    height:100dvh!important;
    max-width:none!important;
    max-height:none!important;
    border-radius:0!important;
    box-shadow:none!important;
    display:flex!important;
    flex-direction:column!important;
    overflow:hidden!important;
  }
 
  .m-hdr{
    flex:0 0 auto!important;
    position:relative!important;
    padding:28px 64px 24px 24px!important;
    border-radius:0!important;
  }
 
  .m-body{
    flex:1 1 auto!important;
    min-height:0!important;
    overflow-y:auto!important;
    -webkit-overflow-scrolling:touch!important;
    overscroll-behavior:contain!important;
    padding:20px 18px 104px!important;
    max-height:none!important;
  }
 
  .m-footer{
    flex:0 0 auto!important;
    position:relative!important;
    bottom:auto!important;
    z-index:5!important;
    border-radius:0!important;
    padding:12px 14px calc(12px + env(safe-area-inset-bottom))!important;
    background:rgba(255,255,255,.98)!important;
    backdrop-filter:blur(10px)!important;
  }
 
  .m-close{
    position:absolute!important;
    top:18px!important;
    right:16px!important;
    width:48px!important;
    height:48px!important;
    font-size:20px!important;
    z-index:10!important;
  }
}
 
 
 
/* ──────────────────────────────────────────────────────────────
   FINAL FULL UI AUDIT LOCK — consistent type, sections, modals
   Applies to all public catalog, product modal, Quenchables, sidebar,
   edit/admin, inquiry, and mobile screens.
────────────────────────────────────────────────────────────── */
:root{
  --ui-label:11px;
  --ui-body:14px;
  --ui-helper:12px;
  --ui-btn:14px;
  --ui-radius-card:18px;
  --ui-radius-section:24px;
  --ui-line:1.55;
}
 
/* Typography hierarchy */
.h-ey,.quench-eyebrow,.sb-lbl,.cat-nm,.vm-tlbl,.f-lbl,.sub-hd,.collection-title,.qey,.q-step-label,.q-section-eyebrow,.em-badge,.pw-lbl{
  font-family:var(--fn)!important;
  font-size:var(--ui-label)!important;
  line-height:1.15!important;
  font-weight:900!important;
  letter-spacing:.14em!important;
  text-transform:uppercase!important;
  color:var(--tl)!important;
  opacity:.82!important;
}
.h-ti,.quench-title{
  font-family:var(--fn)!important;
  font-size:clamp(34px,4vw,46px)!important;
  line-height:1.06!important;
  font-weight:900!important;
  letter-spacing:-.035em!important;
  color:var(--tl)!important;
  margin:0 0 10px!important;
}
.h-su,.quench-sub,.vm-desc,.c-desc,.quench-feature-sub,.quench-set-meta,.f-hint,.uz-sub,.pw-sub{
  font-family:var(--fn)!important;
  font-size:var(--ui-body)!important;
  line-height:var(--ui-line)!important;
  font-weight:400!important;
  color:rgba(58,58,58,.64)!important;
}
.c-name,.vm-color-name,.quench-feature-title,.quench-set-name,.quench-prod-name,.em-title,.pw-title{
  font-family:var(--fn)!important;
  color:var(--q-text)!important;
  font-weight:900!important;
  letter-spacing:-.015em!important;
}
.c-sku,.vm-code,.vm-color-sku,.quench-code,.quench-prod-sku,.vm-variant-sku,.color-image-sku{
  font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace!important;
  font-size:10px!important;
  font-weight:500!important;
  letter-spacing:.025em!important;
  color:var(--tl)!important;
}
 
/* Section consistency: main intro and Quenchables use the same system */
.hero,.quench-hero{
  background:linear-gradient(135deg,rgba(185,220,210,.42),rgba(247,250,249,.96))!important;
  border:1px solid rgba(39,153,137,.14)!important;
  border-radius:var(--ui-radius-section)!important;
  box-shadow:0 8px 28px rgba(39,153,137,.08)!important;
  padding:clamp(24px,4vw,44px)!important;
  margin:0 0 28px!important;
}
.quench-hero{display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;gap:24px!important;align-items:center!important}
.h-text,.quench-hero>div:first-child{max-width:720px!important}
.h-su,.quench-sub{max-width:620px!important;color:rgba(39,153,137,.72)!important}
.quench-actions{display:flex!important;align-items:center!important;gap:12px!important;flex-wrap:wrap!important;margin-top:18px!important}
.quench-mini-collections{display:flex!important;gap:8px!important;flex-wrap:wrap!important}
.quench-chip,.pc,.fb{
  min-height:36px!important;
  border-radius:999px!important;
  border:1px solid rgba(39,153,137,.18)!important;
  background:#fff!important;
  color:var(--tl)!important;
  font-family:var(--fn)!important;
  font-size:12px!important;
  font-weight:900!important;
  padding:8px 14px!important;
}
 
/* Button consistency */
.quench-start,.quench-next,.quench-send,.quench-add,.add-btn,.save-btn,.vm-inq-btn,.pw-submit,.tb-inq,.collection-add-set,.collection-add-row button{
  min-height:44px!important;
  border-radius:14px!important;
  background:var(--tl)!important;
  color:#fff!important;
  border:1px solid var(--tl)!important;
  font-size:var(--ui-btn)!important;
  font-weight:900!important;
  padding:11px 18px!important;
  box-shadow:0 10px 24px rgba(39,153,137,.16)!important;
  text-decoration:none!important;
}
.cancel-btn,.collection-save-set,.qb-back,.quench-tab{
  min-height:42px!important;
  border-radius:14px!important;
  background:#fff!important;
  color:var(--tl)!important;
  border:1.5px solid rgba(39,153,137,.22)!important;
  font-size:13px!important;
  font-weight:900!important;
  padding:10px 16px!important;
}
.del-btn,.quench-remove,.rm-btn{
  border-radius:14px!important;
  background:rgba(239,68,68,.08)!important;
  color:#b91c1c!important;
  border:1.5px solid rgba(239,68,68,.22)!important;
  font-weight:900!important;
}
 
/* Card consistency */
.pcard,.vm-color-item,.quench-product,.quench-set,.quench-feature-card,.quench-total,.collection-item,.collection-set-editor,.color-row,.img-color-card,.img-general-card,.upload-zone,.f-in,.f-sel,.f-ta,.in-sm,.sort-sel{
  border-radius:var(--ui-radius-card)!important;
  border:1px solid rgba(39,153,137,.16)!important;
  box-shadow:0 2px 14px rgba(39,153,137,.06)!important;
}
.pcard,.quench-product,.quench-set,.quench-feature-card,.collection-item,.collection-set-editor,.color-row,.img-color-card,.img-general-card{background:#fff!important}
 
/* Modal consistency */
.modal-bg{background:rgba(39,153,137,.16)!important;backdrop-filter:blur(7px)!important}
.modal{border-radius:24px!important;border:1px solid rgba(39,153,137,.14)!important;box-shadow:0 22px 70px rgba(39,153,137,.20)!important}
.m-hdr{background:linear-gradient(135deg,rgba(185,220,210,.42),rgba(255,255,255,.96))!important;border-bottom:1px solid rgba(39,153,137,.12)!important}
.m-close{background:rgba(39,153,137,.08)!important;color:var(--q-text)!important}
 
/* Edit/admin inputs and collection set editor */
.em-panel{background:linear-gradient(180deg,#fff,rgba(247,250,249,.94))!important}
.collection-item{grid-template-columns:42px minmax(0,1fr) auto!important;align-items:center!important;gap:12px!important;padding:14px!important}
.collection-actions{grid-column:1/-1!important;display:grid!important;grid-template-columns:auto 1fr auto!important;gap:10px!important;align-items:center!important}
.collection-set-count{min-width:88px!important;text-align:center!important;white-space:nowrap!important}
.collection-set-editor{margin:12px 0 18px!important;padding:16px!important;background:rgba(255,255,255,.88)!important}
.collection-color-edit-row{display:grid!important;grid-template-columns:34px 70px minmax(0,1fr) 64px 36px!important;gap:8px!important;align-items:center!important;padding:10px!important}
.collection-color-edit-row input{min-height:38px!important;border-radius:12px!important;border:1px solid rgba(39,153,137,.18)!important;padding:8px 10px!important;font-size:13px!important}
.collection-color-remove{width:34px!important;height:34px!important;min-height:34px!important;border-radius:10px!important;display:flex!important;align-items:center!important;justify-content:center!important;background:rgba(239,68,68,.08)!important;color:#b91c1c!important;border:1px solid rgba(239,68,68,.20)!important;font-size:15px!important;line-height:1!important;padding:0!important}
.collection-move-btn{width:32px!important;height:32px!important;min-height:32px!important;border-radius:10px!important;background:#fff!important;color:var(--tl)!important;border:1px solid rgba(39,153,137,.18)!important;padding:0!important;font-weight:900!important}
 
/* Product modal color grid */
.vm-color-grid{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:10px!important}
.vm-color-item{min-height:66px!important;padding:10px!important;display:flex!important;align-items:center!important;gap:10px!important}
.vm-color-swatch{width:34px!important;height:34px!important;flex:0 0 34px!important}
 
/* Quenchables builder */
.quench-modal{background:#fff!important}
.quench-head{background:linear-gradient(135deg,rgba(185,220,210,.42),rgba(255,255,255,.96))!important;border-bottom:1px solid rgba(39,153,137,.12)!important}
.quench-layout{gap:18px!important}
.quench-step,.quench-step-dot{font-family:var(--fn)!important;font-weight:900!important}
.quench-step-dot{background:rgba(185,220,210,.45)!important;color:var(--tl)!important}
.quench-step.on .quench-step-dot{background:var(--tl)!important;color:#fff!important}
.quench-collection-btn{border-radius:18px!important;border:1px solid rgba(39,153,137,.16)!important;background:#fff!important;padding:14px!important;box-shadow:0 2px 14px rgba(39,153,137,.05)!important}
.quench-collection-btn.on{border-color:var(--tl)!important;background:rgba(185,220,210,.22)!important;box-shadow:0 8px 22px rgba(39,153,137,.10)!important}
.quench-product-grid{gap:12px!important}
.quench-prod-img{border-radius:14px!important;background:rgba(185,220,210,.26)!important}
.quench-input,.quench-select,.quench-note{border-radius:14px!important;border:1.5px solid rgba(39,153,137,.20)!important;background:#fff!important;font-family:var(--fn)!important;font-size:13px!important;color:var(--q-text)!important}
 
@media(max-width:700px){
  :root{--ui-body:14px;--ui-btn:14px}
  .qnh-main{padding:22px 16px 100px!important}
  .hero,.quench-hero{padding:28px 24px!important;margin:18px 0 24px!important;border-radius:24px!important}
  .quench-hero{display:block!important}
  .h-ti,.quench-title{font-size:34px!important;line-height:1.06!important;letter-spacing:-.035em!important}
  .h-su,.quench-sub{font-size:15px!important;line-height:1.62!important;color:rgba(39,153,137,.70)!important;margin-bottom:18px!important}
  .h-ey,.quench-eyebrow{font-size:11px!important;margin-bottom:10px!important}
  .quench-start{width:100%!important;min-height:52px!important;font-size:15px!important}
  .quench-mini-collections{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:8px!important;width:100%!important}
  .quench-chip{font-size:12px!important;min-height:44px!important;text-align:center!important;justify-content:center!important}
 
  /* Reliable mobile modal scrolling: overlay scrolls as full page */
  .modal-bg{padding:0!important;align-items:flex-start!important;justify-content:flex-start!important;overflow-y:auto!important;overflow-x:hidden!important;-webkit-overflow-scrolling:touch!important;background:#fff!important;backdrop-filter:none!important}
  .modal{width:100vw!important;max-width:none!important;min-height:100dvh!important;height:auto!important;max-height:none!important;border-radius:0!important;box-shadow:none!important;border:none!important;overflow:visible!important;display:block!important}
  .m-hdr{position:relative!important;border-radius:0!important;padding:28px 70px 24px 24px!important}
  .m-body{overflow:visible!important;max-height:none!important;padding:20px 18px 110px!important;display:flex!important;flex-direction:column!important;gap:18px!important}
  .m-footer{position:fixed!important;left:0!important;right:0!important;bottom:0!important;z-index:30!important;border-radius:0!important;background:rgba(255,255,255,.96)!important;backdrop-filter:blur(12px)!important;padding:12px 14px calc(12px + env(safe-area-inset-bottom))!important;box-shadow:0 -8px 24px rgba(39,153,137,.10)!important}
  .m-close{position:absolute!important;top:18px!important;right:16px!important;width:48px!important;height:48px!important;border-radius:50%!important;font-size:20px!important;z-index:10!important}
  .m-footer-r{width:100%!important;display:grid!important;grid-template-columns:1fr 1.5fr!important;gap:10px!important;margin-left:0!important}
 
  .vm-color-grid{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:8px!important}
  .vm-color-item{padding:10px 8px!important;gap:8px!important;min-height:74px!important}
  .vm-color-swatch{width:32px!important;height:32px!important;flex-basis:32px!important}
  .vm-color-name{font-size:12px!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
  .vm-color-sku{font-size:9.5px!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
 
  .collection-grid{grid-template-columns:1fr!important}
  .collection-item{grid-template-columns:40px minmax(0,1fr)!important;padding:14px!important}
  .collection-actions{grid-template-columns:1fr!important;gap:8px!important}
  .collection-set-count,.collection-add-set,.collection-save-set{width:100%!important;min-width:0!important}
  .collection-color-edit-row{grid-template-columns:34px 66px minmax(0,1fr) 58px 34px!important;gap:7px!important;padding:9px!important}
 
  .quench-modal{width:100vw!important;min-height:100dvh!important;height:auto!important;max-height:none!important;border-radius:0!important;overflow:visible!important}
  .quench-body{overflow:visible!important;max-height:none!important;padding:18px!important}
  .quench-layout{grid-template-columns:1fr!important}
  .quench-side{order:2!important}
  .quench-main{order:1!important}
  .quench-progress{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:8px!important}
  .quench-step{font-size:0!important;justify-content:center!important;padding:6px!important}
  .quench-step-dot{width:34px!important;height:34px!important;font-size:13px!important}
  .quench-product-grid{grid-template-columns:1fr!important}
  .quench-form-row{grid-template-columns:1fr 78px!important}
  .quench-summary{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:8px!important}
}
 
 
 
/* ─── MOBILE COLOR GRID RESTORE: 4 COLUMNS + SMOOTH EDIT SCROLL ───────────── */
@media (max-width:700px){
  .vm-color-sec-lbl{
    font-size:11px!important;
    margin-bottom:8px!important;
    letter-spacing:.12em!important;
  }
  .vm-color-grid{
    grid-template-columns:repeat(4,minmax(0,1fr))!important;
    gap:8px!important;
  }
  .vm-color-item{
    min-height:74px!important;
    padding:8px 5px!important;
    border-radius:14px!important;
    display:flex!important;
    flex-direction:column!important;
    align-items:center!important;
    justify-content:center!important;
    text-align:center!important;
    gap:5px!important;
    background:#fff!important;
  }
  .vm-color-swatch{
    width:30px!important;
    height:30px!important;
    flex:0 0 30px!important;
    box-shadow:0 2px 8px rgba(0,0,0,.12)!important;
  }
  .vm-color-info{
    width:100%!important;
    display:flex!important;
    align-items:center!important;
    justify-content:center!important;
    gap:0!important;
    min-width:0!important;
  }
  .vm-color-name{
    font-size:10.5px!important;
    line-height:1.12!important;
    max-width:100%!important;
    white-space:nowrap!important;
    overflow:hidden!important;
    text-overflow:ellipsis!important;
  }
  .vm-color-sku{
    display:none!important;
  }
  .vm-color-item.color-active{
    box-shadow:0 0 0 2px rgba(39,153,137,.22)!important;
    background:rgba(45,204,211,.08)!important;
  }
  .modal.edit-modal-inner{
    height:100dvh!important;
    max-height:100dvh!important;
    overflow:hidden!important;
    border-radius:0!important;
  }
  .edit-modal-inner .em-panel{
    overflow-y:auto!important;
    -webkit-overflow-scrolling:touch!important;
    overscroll-behavior:contain!important;
    touch-action:pan-y!important;
    padding-bottom:120px!important;
  }
  .edit-modal-inner .m-body{
    overflow-y:auto!important;
    -webkit-overflow-scrolling:touch!important;
    overscroll-behavior:contain!important;
  }
  .edit-modal-inner .m-footer{
    position:sticky!important;
    bottom:0!important;
    z-index:8!important;
    background:rgba(255,255,255,.96)!important;
    backdrop-filter:blur(10px)!important;
  }
  .color-image-thumb{
    touch-action:none!important;
    user-select:none!important;
    -webkit-user-select:none!important;
  }
  .color-image-thumb.dragging{
    opacity:.55!important;
    transform:scale(.96)!important;
  }
}
 
/* FORCE MOBILE PRODUCT MODAL COLOR SWATCHES TO 4 COLUMNS */
@media (max-width: 700px) {
  .modal .vm-color-grid,
  .modal-bg .vm-color-grid,
  .vm-color-grid {
    display: grid !important;
    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
    gap: 8px !important;
  }
  .modal .vm-color-item,
  .modal-bg .vm-color-item,
  .vm-color-item {
    min-height: 68px !important;
    padding: 7px 4px !important;
    border-radius: 14px !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    text-align: center !important;
    gap: 4px !important;
  }
  .modal .vm-color-swatch,
  .modal-bg .vm-color-swatch,
  .vm-color-swatch {
    width: 28px !important;
    height: 28px !important;
    flex: 0 0 28px !important;
  }
  .modal .vm-color-name,
  .modal-bg .vm-color-name,
  .vm-color-name {
    font-size: 10px !important;
    line-height: 1.1 !important;
    max-width: 100% !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }
  .modal .vm-color-sku,
  .modal-bg .vm-color-sku,
  .vm-color-sku {
    display: none !important;
  }
}
 
 
/* FINAL FIXES — EDIT SCROLL, SMALLER IMAGE THUMBS, SKU/BARCODE TABLE */
.vm-thumbs{gap:7px!important;padding:3px 2px 7px!important;scrollbar-width:thin!important}
.vm-thumb{width:54px!important;height:54px!important;border-radius:8px!important}
.vm-variant-table{min-width:420px!important}
.vm-variant-table th:nth-child(1){width:36%!important}
.vm-variant-table th:nth-child(2){width:34%!important}
.vm-variant-table th:nth-child(3){width:30%!important}
.vm-variant-barcode img{max-width:118px!important;max-height:42px!important;object-fit:contain!important}
 
.edit-modal-inner,
.modal.edit-modal-inner{
  display:flex!important;
  flex-direction:column!important;
  min-height:0!important;
}
.edit-modal-inner .em-panel{
  flex:1 1 auto!important;
  min-height:0!important;
  overflow-y:auto!important;
  -webkit-overflow-scrolling:touch!important;
  overscroll-behavior:contain!important;
  scroll-behavior:smooth!important;
  touch-action:pan-y!important;
}
.edit-modal-inner .m-footer{
  flex-shrink:0!important;
}
 
@media(max-width:700px){
  .vm-thumbs{gap:7px!important;padding:3px 2px 8px!important}
  .vm-thumb{width:48px!important;height:48px!important;border-radius:8px!important}
  .vm-variant-table-card{padding:10px!important}
  .vm-variant-table{min-width:360px!important}
  .vm-variant-table th{font-size:9px!important;padding:7px 8px!important}
  .vm-variant-table td{font-size:11px!important;padding:7px 8px!important}
  .vm-variant-color{gap:6px!important}
  .vm-variant-swatch{width:12px!important;height:12px!important}
  .vm-variant-sku{font-size:10px!important}
  .vm-variant-barcode img{max-width:96px!important;max-height:36px!important}
 
  .edit-modal-inner,
  .modal.edit-modal-inner{
    width:100vw!important;
    height:100dvh!important;
    max-height:100dvh!important;
    max-width:none!important;
    border-radius:0!important;
    overflow:hidden!important;
  }
  .edit-modal-inner .em-tabs{flex-shrink:0!important}
  .edit-modal-inner .em-panel{
    max-height:none!important;
    padding-bottom:calc(96px + env(safe-area-inset-bottom))!important;
  }
  .edit-modal-inner .m-footer{
    position:sticky!important;
    bottom:0!important;
    z-index:8!important;
    background:rgba(255,255,255,.96)!important;
    backdrop-filter:blur(10px)!important;
    padding:12px 14px calc(12px + env(safe-area-inset-bottom))!important;
  }
}
 

/* ─── FINAL MOBILE SIDEBAR COMPACT FILTER SYSTEM — CONSISTENT TYPE + NO CATEGORY ICONS ─── */
@media (max-width: 700px) {
  .mob-drawer{
    width:min(78vw,320px)!important;
    background:#E6F4F1!important;
    padding-top:44px!important;
  }

  .mob-drawer .sb-sec{
    padding:12px 12px 4px!important;
  }

  .mob-drawer .sb-lbl{
    display:block!important;
    padding:4px 8px 8px!important;
    font-size:10px!important;
    line-height:1.15!important;
    font-weight:900!important;
    letter-spacing:.14em!important;
    color:rgba(39,153,137,.62)!important;
  }

  .mob-drawer .filter-pill-wrap{
    display:grid!important;
    grid-template-columns:repeat(2,minmax(0,1fr))!important;
    gap:7px!important;
    padding:4px 12px 10px!important;
    width:100%!important;
  }

  .mob-drawer .filter-pill{
    width:100%!important;
    height:38px!important;
    min-height:38px!important;
    border-radius:999px!important;
    padding:7px 9px!important;
    display:flex!important;
    flex-direction:row!important;
    align-items:center!important;
    justify-content:space-between!important;
    gap:7px!important;
    text-align:left!important;
    background:rgba(255,255,255,.62)!important;
    border:1px solid rgba(39,153,137,.16)!important;
    box-shadow:0 2px 8px rgba(39,153,137,.04)!important;
    color:rgba(58,58,58,.68)!important;
    overflow:hidden!important;
    transform:none!important;
  }

  .mob-drawer .filter-pill:hover,
  .mob-drawer .filter-pill.on{
    background:rgba(255,255,255,.72)!important;
    border-color:var(--tl)!important;
    color:var(--tl)!important;
    box-shadow:0 2px 10px rgba(39,153,137,.08)!important;
    transform:none!important;
  }

  .mob-drawer .filter-pill.full{
    grid-column:1/-1!important;
    height:42px!important;
    min-height:42px!important;
    padding:8px 12px!important;
  }

  .mob-drawer .filter-pill-l,
  .mob-drawer .filter-pill.full .filter-pill-l{
    width:auto!important;
    min-width:0!important;
    display:flex!important;
    flex-direction:row!important;
    align-items:center!important;
    justify-content:flex-start!important;
    gap:7px!important;
    overflow:hidden!important;
  }

  .mob-drawer .filter-pill-ico{
    display:none!important;
  }

  .mob-drawer .filter-pill-dot{
    width:10px!important;
    height:10px!important;
    flex:0 0 10px!important;
    border-radius:999px!important;
    border:2px solid rgba(255,255,255,.8)!important;
    box-shadow:0 1px 3px rgba(0,0,0,.12)!important;
  }

  .mob-drawer .filter-pill-label,
  .mob-drawer .filter-pill.full .filter-pill-label{
    display:block!important;
    width:auto!important;
    max-width:100%!important;
    color:inherit!important;
    font-size:11px!important;
    line-height:1.1!important;
    font-weight:900!important;
    letter-spacing:-.01em!important;
    white-space:nowrap!important;
    overflow:hidden!important;
    text-overflow:ellipsis!important;
  }

  .mob-drawer .filter-pill-count{
    min-width:28px!important;
    height:22px!important;
    padding:1px 7px!important;
    border-radius:999px!important;
    display:flex!important;
    align-items:center!important;
    justify-content:center!important;
    background:rgba(39,153,137,.08)!important;
    border:1px solid rgba(39,153,137,.10)!important;
    color:var(--tl)!important;
    font-size:11px!important;
    font-weight:900!important;
    line-height:1!important;
    flex-shrink:0!important;
  }

  .mob-drawer .filter-pill.on .filter-pill-count{
    background:rgba(45,204,211,.18)!important;
    border-color:rgba(39,153,137,.10)!important;
  }

  .mob-drawer .manage-pill{
    grid-column:1/-1!important;
    height:38px!important;
    min-height:38px!important;
    justify-content:center!important;
    border-style:dashed!important;
  }

  .mob-drawer .sb-div{
    margin:8px 16px!important;
    border-top-color:rgba(39,153,137,.12)!important;
  }
}

/* ─── FINAL FIX: MOBILE SIDEBAR FILTER SELECTION NAMES SAME FONT SIZE ─── */
@media (max-width: 700px) {
  .mob-drawer .fb,
  .mob-drawer .filter-pill,
  .mob-drawer .pc{
    font-family:var(--fn)!important;
    font-size:12px!important;
    line-height:1.1!important;
    font-weight:900!important;
    letter-spacing:-.01em!important;
    color:rgba(58,58,58,.68)!important;
  }

  .mob-drawer .fb.on,
  .mob-drawer .filter-pill.on,
  .mob-drawer .pc.on{
    color:var(--tl)!important;
  }

  .mob-drawer .fb-lbl,
  .mob-drawer .filter-pill-label,
  .mob-drawer .filter-pill.full .filter-pill-label,
  .mob-drawer .pc{
    font-family:var(--fn)!important;
    font-size:12px!important;
    line-height:1.1!important;
    font-weight:900!important;
    letter-spacing:-.01em!important;
    text-transform:none!important;
  }

  .mob-drawer .fb-cnt,
  .mob-drawer .filter-pill-count{
    font-family:var(--fn)!important;
    font-size:12px!important;
    line-height:1!important;
    font-weight:900!important;
    min-width:30px!important;
    height:22px!important;
    padding:1px 8px!important;
  }

  .mob-drawer .pc-wrap{
    display:grid!important;
    grid-template-columns:repeat(2,minmax(0,1fr))!important;
    gap:7px!important;
    padding:4px 12px 10px!important;
  }

  .mob-drawer .pc{
    width:100%!important;
    height:38px!important;
    min-height:38px!important;
    display:flex!important;
    align-items:center!important;
    justify-content:center!important;
    padding:7px 9px!important;
    border-radius:999px!important;
    background:rgba(255,255,255,.62)!important;
    border:1px solid rgba(39,153,137,.16)!important;
    box-shadow:0 2px 8px rgba(39,153,137,.04)!important;
    text-align:center!important;
    white-space:nowrap!important;
    overflow:hidden!important;
    text-overflow:ellipsis!important;
  }

  .mob-drawer .pc.on{
    background:rgba(255,255,255,.72)!important;
    border-color:var(--tl)!important;
    box-shadow:0 2px 10px rgba(39,153,137,.08)!important;
  }
}


/* ─── FINAL FIX: EXTENSION BUTTONS + COUNT BADGES MATCH FILTER SYSTEM ─── */
@media (max-width: 700px) {
  .mob-drawer .sb-sec{
    padding-left:12px!important;
    padding-right:12px!important;
  }

  .mob-drawer .fb{
    width:100%!important;
    min-height:42px!important;
    height:42px!important;
    padding:8px 12px!important;
    margin:0 0 7px!important;
    border-radius:14px!important;
    display:flex!important;
    align-items:center!important;
    justify-content:space-between!important;
    gap:8px!important;
    background:rgba(255,255,255,.62)!important;
    border:1px solid rgba(39,153,137,.16)!important;
    box-shadow:0 2px 8px rgba(39,153,137,.04)!important;
    color:rgba(58,58,58,.68)!important;
    transform:none!important;
  }

  .mob-drawer .fb:hover,
  .mob-drawer .fb.on{
    background:rgba(255,255,255,.72)!important;
    border-color:var(--tl)!important;
    color:var(--tl)!important;
    box-shadow:0 2px 10px rgba(39,153,137,.08)!important;
    transform:none!important;
  }

  .mob-drawer .fb-dot{
    width:10px!important;
    height:10px!important;
    flex:0 0 10px!important;
    border-radius:999px!important;
    box-shadow:0 1px 3px rgba(0,0,0,.12)!important;
  }

  .mob-drawer .fb-lbl{
    flex:1 1 auto!important;
    min-width:0!important;
    font-family:var(--fn)!important;
    font-size:12px!important;
    line-height:1.1!important;
    font-weight:900!important;
    letter-spacing:-.01em!important;
    white-space:nowrap!important;
    overflow:hidden!important;
    text-overflow:ellipsis!important;
  }

  .mob-drawer .fb-cnt{
    min-width:30px!important;
    height:22px!important;
    padding:1px 8px!important;
    border-radius:999px!important;
    display:flex!important;
    align-items:center!important;
    justify-content:center!important;
    background:rgba(39,153,137,.08)!important;
    border:1px solid rgba(39,153,137,.10)!important;
    color:var(--tl)!important;
    font-family:var(--fn)!important;
    font-size:12px!important;
    font-weight:900!important;
    line-height:1!important;
    font-variant-numeric:tabular-nums!important;
    flex-shrink:0!important;
  }

  .mob-drawer .fb.on .fb-cnt{
    background:rgba(45,204,211,.18)!important;
    border-color:rgba(39,153,137,.10)!important;
  }
}


/* ─── FINAL FIX: MOBILE SIDEBAR SMOOTH SCROLL + NO SCROLL JUMP ─── */
@media (max-width: 700px) {
  .mob-overlay{
    position:fixed!important;
    inset:0!important;
    overflow:hidden!important;
    overscroll-behavior:none!important;
    touch-action:none!important;
  }

  .mob-drawer{
    position:fixed!important;
    top:0!important;
    left:0!important;
    bottom:auto!important;
    height:100dvh!important;
    max-height:100dvh!important;
    overflow-y:auto!important;
    overflow-x:hidden!important;
    -webkit-overflow-scrolling:touch!important;
    overscroll-behavior-y:contain!important;
    touch-action:pan-y!important;
    scroll-behavior:smooth!important;
    padding-bottom:calc(140px + env(safe-area-inset-bottom))!important;
  }

  .mob-drawer .sb-hero{
    flex-shrink:0!important;
  }

  .mob-drawer .sb-sec:last-of-type{
    padding-bottom:calc(90px + env(safe-area-inset-bottom))!important;
  }
}


/* FINAL FIX: SKU CODE FONT CONSISTENCY */
.vm-code,
.vm-color-sku,
.vm-variant-sku,
.color-image-sku,
.quench-code,
.quench-prod-sku{
  font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace!important;
  font-size:10px!important;
  font-weight:500!important;
  letter-spacing:.02em!important;
}

/* FINAL FIX: product card SKU copied from full product page SKU style */
.c-sku{
  font-family:monospace!important;
  font-size:11px!important;
  font-weight:700!important;
  letter-spacing:.04em!important;
  line-height:1.2!important;
  color:var(--tl)!important;
  background:rgba(39,153,137,.1)!important;
  border:0!important;
  border-radius:4px!important;
  padding:2px 8px!important;
  margin-top:5px!important;
  display:inline-block!important;
  align-self:flex-start!important;
  width:fit-content!important;
}

/* FINAL FIX: compact color buttons + consistent rounded tables + shorter link label */
.vm-color-grid{
  grid-template-columns:repeat(4,minmax(0,1fr))!important;
  gap:8px!important;
}
.vm-color-item{
  min-height:52px!important;
  padding:8px 6px!important;
  border-radius:16px!important;
  display:flex!important;
  flex-direction:column!important;
  align-items:center!important;
  justify-content:center!important;
  gap:5px!important;
  background:#fff!important;
}
.vm-color-swatch{
  width:28px!important;
  height:28px!important;
  flex:0 0 28px!important;
  border-width:2px!important;
  box-shadow:0 3px 9px rgba(0,0,0,.10)!important;
}
.vm-color-info{
  width:100%!important;
  display:block!important;
  min-width:0!important;
  text-align:center!important;
}
.vm-color-name{
  font-size:11px!important;
  font-weight:800!important;
  line-height:1.15!important;
  white-space:normal!important;
  overflow:hidden!important;
  text-overflow:ellipsis!important;
  display:-webkit-box!important;
  -webkit-line-clamp:2!important;
  -webkit-box-orient:vertical!important;
}
.vm-color-sku{
  display:none!important;
}
.vm-color-item.color-active{
  border-color:var(--tl)!important;
  box-shadow:0 0 0 1px var(--tl)!important;
}
.vm-color-sec-lbl{
  margin-bottom:8px!important;
}

.vm-variant-table-card,
.dimensions-card,
.vm-dim-card,
.vm-table-card{
  border-radius:18px!important;
  overflow:hidden!important;
}
.vm-variant-table-wrap,
.vm-table-wrap{
  border-radius:14px!important;
  overflow:hidden!important;
}
.vm-variant-table th:first-child,
.vm-table th:first-child{
  border-top-left-radius:14px!important;
}
.vm-variant-table th:last-child,
.vm-table th:last-child{
  border-top-right-radius:14px!important;
}

@media(max-width:700px){
  .vm-color-grid{gap:8px!important;}
  .vm-color-item{min-height:50px!important;padding:7px 5px!important;border-radius:15px!important;gap:4px!important;}
  .vm-color-swatch{width:26px!important;height:26px!important;flex-basis:26px!important;}
  .vm-color-name{font-size:10px!important;line-height:1.12!important;}
}


/* FINAL FIX: product detail table corners match Product Link button */
.vm-variant-table-card,
.vm-dimensions-card{
  border-radius:14px!important;
  overflow:hidden!important;
}
.vm-variant-table-wrap,
.vm-dim-table-wrap{
  border-radius:14px!important;
  overflow:auto!important;
  background:#fff!important;
  border:1px solid rgba(185,220,210,.45)!important;
  -webkit-overflow-scrolling:touch!important;
}
.vm-variant-table,
.vm-dim-table{
  width:100%!important;
  border-collapse:separate!important;
  border-spacing:0!important;
  font-size:13px!important;
  overflow:hidden!important;
}
.vm-dim-table th{
  background:var(--tl)!important;
  color:#fff!important;
  padding:8px 12px!important;
  text-align:left!important;
  font-size:10px!important;
  letter-spacing:.08em!important;
  font-weight:800!important;
  white-space:nowrap!important;
}
.vm-dim-table td{
  padding:9px 12px!important;
  border-bottom:1px solid rgba(185,220,210,.32)!important;
  font-size:13px!important;
  font-weight:400!important;
  color:var(--gr)!important;
  background:#fff!important;
}
.vm-dim-table tr:nth-child(even) td{
  background:var(--bg)!important;
}
.vm-dim-table tr:last-child td{
  border-bottom:none!important;
}
.vm-dim-primary{
  font-weight:800!important;
  color:var(--bk)!important;
}
.vm-variant-table th:first-child,
.vm-dim-table th:first-child{
  border-top-left-radius:14px!important;
}
.vm-variant-table th:last-child,
.vm-dim-table th:last-child{
  border-top-right-radius:14px!important;
}
.vm-variant-table tbody tr:last-child td:first-child,
.vm-dim-table tbody tr:last-child td:first-child{
  border-bottom-left-radius:14px!important;
}
.vm-variant-table tbody tr:last-child td:last-child,
.vm-dim-table tbody tr:last-child td:last-child{
  border-bottom-right-radius:14px!important;
}


/* FINAL FIX: use Product Link button radius for all non-circular product detail rounded corners */
:root{--qnh-link-radius:8px;}
.vm-link-btn,
.vm-inq-btn,
.vm-main-wrap,
.vm-thumb,
.vm-color-item,
.vm-variant-table-card,
.vm-dimensions-card,
.vm-dim-card,
.dimensions-card,
.vm-table-card,
.vm-variant-table-wrap,
.vm-table-wrap,
.vm-dim-table-wrap{
  border-radius:var(--qnh-link-radius)!important;
  overflow:hidden!important;
}
.vm-variant-table,
.vm-table,
.vm-dim-table{
  border-collapse:separate!important;
  border-spacing:0!important;
  overflow:hidden!important;
}
.vm-variant-table th:first-child,
.vm-table th:first-child,
.vm-dim-table th:first-child{
  border-top-left-radius:var(--qnh-link-radius)!important;
}
.vm-variant-table th:last-child,
.vm-table th:last-child,
.vm-dim-table th:last-child{
  border-top-right-radius:var(--qnh-link-radius)!important;
}
.vm-variant-table tbody tr:last-child td:first-child,
.vm-table tbody tr:last-child td:first-child,
.vm-dim-table tbody tr:last-child td:first-child{
  border-bottom-left-radius:var(--qnh-link-radius)!important;
}
.vm-variant-table tbody tr:last-child td:last-child,
.vm-table tbody tr:last-child td:last-child,
.vm-dim-table tbody tr:last-child td:last-child{
  border-bottom-right-radius:var(--qnh-link-radius)!important;
}
@media(max-width:700px){
  .vm-color-item{border-radius:var(--qnh-link-radius)!important;}
}

`
 
 
// ─── COLOR COLLECTION MAP ─────────────────────────────────────────────────────
const COLOR_COLLECTION_MAP = {
  'Snow': 'OG', 'Sand': 'OG', 'Taupe': 'OG', 'Stone': 'OG', 'Onyx': 'OG', 'Black': 'OG',
  'Autumn Sunset': 'XPRESS', 'Forest Green': 'XPRESS', 'Twilight Teal': 'XPRESS', 'Coral Oasis': 'XPRESS',
  'Rose Clay': 'Horizon', 'Forge Slate': 'Horizon', 'Sage Ash': 'Horizon', 'Warm Dune': 'Horizon',
  'Sky': 'Bloom', 'Meadow': 'Bloom', 'Coral': 'Bloom', 'Blossom': 'Bloom',
  'Bubbly': 'Poply', 'Minty': 'Poply', 'Purpy': 'Poply', 'Rosy': 'Poply',
}
const DEFAULT_COLOR_COLLECTIONS = [
  { value:'OG',      label:'OG',      color:'#63666A' },
  { value:'XPRESS',  label:'XPRESS',  color:'#279989' },
  { value:'Horizon', label:'Horizon', color:'#9B7EA8' },
  { value:'Bloom',   label:'Bloom',   color:'#5CB8A0' },
  { value:'Poply',   label:'Poply',   color:'#E070A0' },
]
 
const COLOR_COLLECTION_SETS_KEY = 'qnh-color-collection-sets'
const DEFAULT_COLOR_COLLECTION_SETS = {
  OG: [
    { name:'Snow', code:'WT', hex:'#F5F5F0', hexes:['#F5F5F0'], collection:'OG' },
    { name:'Sand', code:'TP', hex:'#C8C5BE', hexes:['#C8C5BE'], collection:'OG' },
    { name:'Stone', code:'GY', hex:'#8A8780', hexes:['#8A8780'], collection:'OG' },
    { name:'Onyx', code:'BK', hex:'#2A2A28', hexes:['#2A2A28'], collection:'OG' },
  ],
  XPRESS: [
    { name:'Autumn Sunset', code:'AS', hex:'#D4894A', hexes:['#D4894A'], collection:'XPRESS' },
    { name:'Forest Green', code:'FG', hex:'#3D6B4F', hexes:['#3D6B4F'], collection:'XPRESS' },
    { name:'Twilight Teal', code:'TT', hex:'#2B8090', hexes:['#2B8090'], collection:'XPRESS' },
    { name:'Coral Oasis', code:'CO', hex:'#E8524A', hexes:['#E8524A'], collection:'XPRESS' },
  ],
  Horizon: [
    { name:'Rose Clay', code:'RC', hex:'#DCB8BC', hexes:['#DCB8BC','#946D72'], collection:'Horizon' },
    { name:'Forge Slate', code:'FS', hex:'#A2AAAD', hexes:['#A2AAAD','#5A6770'], collection:'Horizon' },
    { name:'Sage Ash', code:'SA', hex:'#A9ACA1', hexes:['#A9ACA1','#65665E'], collection:'Horizon' },
    { name:'Warm Dune', code:'WD', hex:'#C6BFB7', hexes:['#C6BFB7','#8C837A'], collection:'Horizon' },
  ],
  Bloom: [
    { name:'Sky', code:'SK', hex:'#88C4E8', hexes:['#88C4E8'], collection:'Bloom' },
    { name:'Meadow', code:'ME', hex:'#5CBF7A', hexes:['#5CBF7A'], collection:'Bloom' },
    { name:'Coral', code:'CO', hex:'#FF7A5C', hexes:['#FF7A5C'], collection:'Bloom' },
    { name:'Blossom', code:'BL', hex:'#F9A8C4', hexes:['#F9A8C4'], collection:'Bloom' },
  ],
  Poply: [
    { name:'Bubbly', code:'BB', hex:'#57C0E8', hexes:['#57C0E8'], collection:'Poply' },
    { name:'Minty', code:'MT', hex:'#48C8C0', hexes:['#48C8C0'], collection:'Poply' },
    { name:'Purpy', code:'PP', hex:'#B09AD8', hexes:['#B09AD8'], collection:'Poply' },
    { name:'Rosy', code:'RO', hex:'#F070A0', hexes:['#F070A0'], collection:'Poply' },
  ],
}
 
function normalizeCollectionSetMap(map) {
  const source = map && typeof map === 'object' ? map : {}
  const normalized = {}
  Object.entries(source).forEach(([key, list]) => {
    if (!Array.isArray(list)) return
    const cleanedList = key === 'XPRESS'
      ? list.filter(item => ['AS','FG','TT','CO'].includes(String(item.code || '').toUpperCase()))
      : list
    normalized[key] = cleanedList
      .map(item => normalizeColorVariant({ ...item, collection: item.collection || key }))
      .filter(item => item.name && item.code)
  })
  return normalized
}
 
function getSavedColorCollectionSets() {
  if (typeof window === 'undefined') return DEFAULT_COLOR_COLLECTION_SETS
  try {
    const stored = JSON.parse(localStorage.getItem(COLOR_COLLECTION_SETS_KEY) || 'null')
    return { ...DEFAULT_COLOR_COLLECTION_SETS, ...normalizeCollectionSetMap(stored) }
  } catch {
    return DEFAULT_COLOR_COLLECTION_SETS
  }
}
 
function defaultColorCollection(color) {
  return color?.collection || COLOR_COLLECTION_MAP[color?.name] || 'Other'
}
 
function groupColorsByCollection(colors, collections = DEFAULT_COLOR_COLLECTIONS) {
  const groups = {}
  ;(colors || []).forEach(clr => {
    const col = defaultColorCollection(clr)
    if (!groups[col]) groups[col] = []
    groups[col].push(clr)
  })
  const ordered = []
  const knownValues = collections.map(c=>c.value)
  collections.forEach(col => {
    if (groups[col.value]) ordered.push({ name: col.label, value: col.value, color: col.color, colors: groups[col.value] })
  })
  Object.keys(groups).forEach(key => {
    if (!knownValues.includes(key)) ordered.push({ name: key, value: key, color: '#B9DCD2', colors: groups[key] })
  })
  return ordered
}
 
function normalizeHexValue(value, fallback = '') {
  if (!value) return fallback
  let v = String(value).trim().replace(/[^0-9a-fA-F#]/g, '')
  if (!v) return fallback
  if (!v.startsWith('#')) v = `#${v}`
  if (/^#[0-9a-fA-F]{3}$/.test(v)) {
    v = `#${v[1]}${v[1]}${v[2]}${v[2]}${v[3]}${v[3]}`
  }
  return /^#[0-9a-fA-F]{6}$/.test(v) ? v.toUpperCase() : fallback
}
 
function extractHexValues(value) {
  const matches = String(value || '').match(/#?[0-9a-fA-F]{6}|#?[0-9a-fA-F]{3}/g) || []
  return matches.map(v => normalizeHexValue(v)).filter(Boolean)
}
 
function getColorHexes(color) {
  const hexes = Array.isArray(color?.hexes) ? color.hexes.map(h => normalizeHexValue(h)).filter(Boolean) : []
  if (hexes.length) return hexes
  return [normalizeHexValue(color?.hex, '#B9DCD2')]
}
 
function normalizeColorVariant(color) {
  const hexes = getColorHexes(color)
  return { ...color, hex: hexes[0] || '#B9DCD2', hexes, collection: defaultColorCollection(color) }
}
 
function swatchBackground(color) {
  const hexes = getColorHexes(color)
  if (hexes.length <= 1) return hexes[0] || '#B9DCD2'
  const step = 100 / hexes.length
  const stops = hexes.map((hex, i) => `${hex} ${i * step}% ${(i + 1) * step}%`).join(', ')
  return `linear-gradient(90deg, ${stops})`
}
 
function getImageSrc(image) {
  if (!image) return ''
  if (typeof image === 'string') return image
  return image.src || image.url || image.image || ''
}
 
function normalizeImageItem(image) {
  if (!image) return { src: '', colorSku: '', colorCode: '', colorName: '' }
  if (typeof image === 'string') return { src: image, colorSku: '', colorCode: '', colorName: '' }
  return {
    ...image,
    src: getImageSrc(image),
    colorSku: image.colorSku || image.sku || '',
    colorCode: image.colorCode || image.code || '',
    colorName: image.colorName || '',
  }
}
 
function normalizeProductImages(images) {
  if (!Array.isArray(images)) return []
  return images.map(normalizeImageItem).filter(img => !!img.src)
}
 
function getColorKey(color) {
  return String(color?.sku || color?.code || color?.name || '').trim().toUpperCase()
}
 
function imageMatchesColor(image, color) {
  const img = normalizeImageItem(image)
  if (!img.src || !color) return false
  const imageKeys = [img.colorSku, img.colorCode, img.colorName].map(v => String(v || '').trim().toUpperCase()).filter(Boolean)
  if (!imageKeys.length) return false
  const colorKeys = [color.sku, color.code, color.name].map(v => String(v || '').trim().toUpperCase()).filter(Boolean)
  return imageKeys.some(key => colorKeys.includes(key))
}
 
function isGeneralImage(image) {
  const img = normalizeImageItem(image)
  return !!img.src && !String(img.colorSku || '').trim() && !String(img.colorCode || '').trim() && !String(img.colorName || '').trim()
}
 
function findImageIndexForColor(product, color) {
  const images = normalizeProductImages(product?.images || [])
  return images.findIndex(img => imageMatchesColor(img, color))
}
 
function findImageIndexesForColor(product, color) {
  const images = normalizeProductImages(product?.images || [])
  return images
    .map((img, index) => imageMatchesColor(img, color) ? index : -1)
    .filter(index => index >= 0)
}
 
function hasImageForColor(product, color) {
  return findImageIndexForColor(product, color) >= 0
}
 
function getProductSkuBase(product = null) {
  const firstSku = product?.colors?.[0]?.sku || ''
  const firstCode = product?.colors?.[0]?.code || ''
  if (!firstSku) return ''
  if (firstCode && firstSku.toUpperCase().endsWith(`-${String(firstCode).toUpperCase()}`)) {
    return firstSku.slice(0, -(String(firstCode).length + 1)) || firstSku
  }
  const parts = firstSku.split('-')
  return parts.length > 2 ? parts.slice(0, -1).join('-') : firstSku
}
 
function productMatchesSku(product, skuParam) {
  const target = String(skuParam || '').trim().toUpperCase()
  if (!target || !product) return false
 
  const values = new Set()
  if (product.id) values.add(String(product.id).trim().toUpperCase())
 
  const base = getProductSkuBase(product)
  if (base) values.add(String(base).trim().toUpperCase())
 
  ;(product.colors || []).forEach(color => {
    if (!color?.sku) return
    const sku = String(color.sku).trim()
    const code = String(color.code || '').trim()
    values.add(sku.toUpperCase())
    if (code && sku.toUpperCase().endsWith(`-${code.toUpperCase()}`)) {
      values.add(sku.slice(0, -(code.length + 1)).toUpperCase())
    }
  })
 
  return values.has(target)
}
 
// ─── YOUTUBE HELPER ──────────────────────────────────────────────────────────
function getYouTubeId(url) {
  if (!url) return null
  const patterns = [
    /youtube\.com\/watch\?v=([^&\s]+)/,
    /youtu\.be\/([^?\s]+)/,
    /youtube\.com\/embed\/([^?\s]+)/,
    /youtube\.com\/shorts\/([^?\s]+)/,
  ]
  for (const p of patterns) {
    const m = url.match(p)
    if (m) return m[1]
  }
  return null
}
 
// ─── COPY TO CLIPBOARD ───────────────────────────────────────────────────────
function useCopy() {
  const [copied, setCopied] = useState(null) // holds the text that was just copied
  const copy = useCallback((text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(text)
      setTimeout(() => setCopied(null), 1800)
    }).catch(() => {
      // fallback
      const el = document.createElement('textarea')
      el.value = text; el.style.position = 'fixed'; el.style.opacity = '0'
      document.body.appendChild(el); el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(text)
      setTimeout(() => setCopied(null), 1800)
    })
  }, [])
  return { copy, copied }
}
 
// ─── PENCIL SVG ───────────────────────────────────────────────────────────────
const PencilIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
)
 
// ─── HERO CAROUSEL + VIDEO COMPONENT ─────────────────────────────────────────
function HeroCarousel({ banners = [], aspect, interval, editMode, onEditClick, heroTitle, heroSub, onTitleChange, onSubChange, onBannerClick, heroVideoUrl, heroVideoThumbnail, mediaOrder='banner-video' }) {
  banners = Array.isArray(banners) ? banners : []
  const [slide, setSlide] = useState(0)
  const timerRef = useRef(null)
  const touchStartX = useRef(null)
  const touchStartY = useRef(null)
  const arClass = aspect === '16:9' ? 'ar-16-9' : aspect === '1:1' ? 'ar-1-1' : 'ar-custom'
  const ytId = getYouTubeId(heroVideoUrl)
  const videoThumb = heroVideoThumbnail || (ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : '')
  const hasVideo = !!ytId
  const showVideoCard = hasVideo || editMode
  const showBannerCard = banners.length > 0 || editMode
  const isTwoColumn = showBannerCard && showVideoCard
  const bannerFirst = mediaOrder !== 'video-banner'
 
  const startTimer = useCallback(() => {
    clearInterval(timerRef.current)
    if (banners.length > 1 && interval > 0) {
      timerRef.current = setInterval(() => setSlide(s => (s + 1) % banners.length), interval * 1000)
    }
  }, [banners.length, interval])
 
  useEffect(() => { startTimer(); return () => clearInterval(timerRef.current) }, [startTimer])
  const go = (dir) => { if (!banners.length) return; setSlide(s => (s + dir + banners.length) % banners.length); startTimer() }
 
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      go(dx < 0 ? 1 : -1)
    }
    touchStartX.current = null
  }
 
  const currentBanner = banners[slide]
 
  return (
    <>
      {/* ── HEADLINE + SUBHEADLINE ── */}
      <div style={{background:'var(--sf4)',borderRadius:'var(--rl)',padding:'20px 28px',marginBottom:12,position:'relative'}}>
        {editMode && (
          <button className="hero-edit-btn" onClick={onEditClick} style={{position:'absolute',top:14,right:14}}>
            <PencilIcon/> Edit Hero
          </button>
        )}
        {editMode ? (
          <div style={{display:'flex',flexDirection:'column',gap:10,maxWidth:680}}>
            <input
              value={heroTitle}
              onChange={e=>onTitleChange(e.target.value)}
              style={{fontFamily:'var(--fn)',fontSize:26,fontWeight:900,letterSpacing:'-.01em',color:'var(--tl)',background:'transparent',border:'none',borderBottom:'2px dashed rgba(39,153,137,.35)',outline:'none',width:'100%',padding:'3px 0',lineHeight:1.15}}
              placeholder="Headline…"
            />
            <textarea
              value={heroSub}
              onChange={e=>onSubChange(e.target.value)}
              rows={2}
              style={{fontFamily:'var(--fn)',fontSize:13,color:'var(--tl)',opacity:.7,background:'transparent',border:'none',borderBottom:'2px dashed rgba(39,153,137,.25)',outline:'none',resize:'none',width:'100%',padding:'3px 0',lineHeight:1.55}}
              placeholder="Subheadline…"
            />
          </div>
        ) : (
          <div style={{maxWidth:680}}>
            {heroTitle && <div style={{fontFamily:'var(--fn)',fontSize:26,fontWeight:900,letterSpacing:'-.01em',color:'var(--tl)',lineHeight:1.15,marginBottom:6}}>{heroTitle}</div>}
            {heroSub && <div style={{fontFamily:'var(--fn)',fontSize:13,color:'var(--tl)',opacity:.65,lineHeight:1.55}}>{heroSub}</div>}
          </div>
        )}
      </div>
 
      {/* ── TWO-COLUMN MEDIA AREA: banner + YouTube video ── */}
      {(showBannerCard || showVideoCard) && (
        <div className={`hero-media-grid ${isTwoColumn ? '' : 'is-single'}`}>
          {showBannerCard && (
            <div className="hero-media-card hero-banner-card" style={{order: bannerFirst ? 1 : 2}}>
              {banners.length > 0 ? (
                <>
                  <div style={{position:'relative'}}>
                    <div className={`hero-carousel ${arClass}`} style={{borderRadius:0,marginBottom:0}}>
                      <div className="hero-slides" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={{userSelect:'none'}}>
                        {banners.map((b,i) => (
                          <div
                            key={b.id}
                            className={`hero-slide ${i===slide?'active':''}`}
                            onClick={()=>b.link&&onBannerClick(b.link)}
                            style={{cursor:b.link?'pointer':'default'}}
                          >
                            <img src={b.image} alt={b.alt||`Banner ${i+1}`}/>
                          </div>
                        ))}
                      </div>
                      {banners.length > 1 && (
                        <div className="hero-dots">
                          {banners.map((_,i)=>(
                            <button key={i} className={`hero-dot ${i===slide?'on':''}`} onClick={e=>{e.stopPropagation();setSlide(i);startTimer()}}/>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
 
                  {(currentBanner?.title || currentBanner?.subtitle || currentBanner?.link) && (
                    <div className="hero-media-caption">
                      <div>
                        {currentBanner.title && <div className="hero-media-title">{currentBanner.title}</div>}
                        {currentBanner.subtitle && <div className="hero-media-subtitle">{currentBanner.subtitle}</div>}
                      </div>
                      {currentBanner.link && (
                        <button onClick={()=>onBannerClick(currentBanner.link)} className="hero-media-action">View →</button>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <button className="hero-empty-card" onClick={onEditClick}>+ Add sliding banner</button>
              )}
            </div>
          )}
 
          {showVideoCard && (
            <div className="hero-media-card hero-video-card" style={{order: bannerFirst ? 2 : 1}}>
              {editMode && hasVideo && (
                <button
                  className="hero-video-edit-btn"
                  onClick={(e)=>{ e.stopPropagation(); onEditClick() }}
                  title="Edit or replace video"
                >
                  ✏️ Edit Video
                </button>
              )}
              {hasVideo ? (
                <div className="hero-video-frame">
                  <iframe
                    src={`https://www.youtube.com/embed/${ytId}?controls=0&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3&fs=0&disablekb=1`}
                    title="Quencha video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : editMode ? (
                <button className="hero-empty-card" onClick={onEditClick}>+ Add YouTube video</button>
              ) : null}
            </div>
          )}
        </div>
      )}
    </>
  )
}
 
 
// ─── YOUTUBE BLOCK COMPONENT ─────────────────────────────────────────────────
function YouTubeBlock({ ytUrl }) {
  if (!ytUrl) return null
  const ytId = getYouTubeId(ytUrl)
  if (!ytId) return null
  const watchUrl = `https://www.youtube.com/watch?v=${ytId}`
  return (
    <a
      href={watchUrl}
      target="_blank"
      rel="noreferrer"
      style={{display:'flex',alignItems:'center',gap:16,padding:'16px 20px',background:'#111',borderRadius:10,border:'1px solid rgba(185,220,210,.2)',textDecoration:'none',cursor:'pointer'}}
    >
      <div style={{width:52,height:52,borderRadius:'50%',background:'#FF0000',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,boxShadow:'0 2px 12px rgba(255,0,0,.4)'}}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><polygon points="6,3 20,12 6,21"/></svg>
      </div>
      <div>
        <div style={{color:'#fff',fontSize:13,fontWeight:700,letterSpacing:'.02em',marginBottom:3}}>Watch Product Video</div>
        <div style={{color:'rgba(255,255,255,.45)',fontSize:11,fontFamily:'monospace'}}>youtube.com/watch?v={ytId}</div>
      </div>
      <div style={{marginLeft:'auto',color:'rgba(255,255,255,.3)',fontSize:18}}>↗</div>
    </a>
  )
}
 
// ─── CODE IMAGE LIGHTBOX ─────────────────────────────────────────────────────
function CodeLightbox({ src, label, onClose }) {
  const download = () => {
    const a = document.createElement('a')
    a.href = src
    a.download = `${label.replace(/\s+/g,'-').toLowerCase()}.png`
    a.click()
  }
 
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
 
  return (
    <div
      onClick={onClose}
      style={{position:'fixed',inset:0,zIndex:900,background:'rgba(0,0,0,.92)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:24}}
    >
      {/* Image */}
      <div onClick={e=>e.stopPropagation()} style={{position:'relative',maxWidth:'90vw',maxHeight:'75vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <img
          src={src}
          alt={label}
          style={{maxWidth:'90vw',maxHeight:'72vh',objectFit:'contain',borderRadius:12,background:'#fff',padding:16,boxShadow:'0 8px 40px rgba(0,0,0,.5)'}}
        />
      </div>
      {/* Label */}
      <div style={{color:'rgba(255,255,255,.6)',fontSize:12,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',marginTop:20,fontFamily:'var(--fn)'}}>{label}</div>
      {/* Buttons */}
      <div style={{display:'flex',gap:12,marginTop:16}}>
        <button
          onClick={e=>{e.stopPropagation();download()}}
          style={{background:'var(--tl)',color:'#fff',border:'none',borderRadius:10,padding:'11px 28px',fontFamily:'var(--fn)',fontSize:13,fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',gap:8,transition:'var(--tr)'}}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download
        </button>
        <button
          onClick={e=>{e.stopPropagation();onClose()}}
          style={{background:'rgba(255,255,255,.1)',color:'#fff',border:'2px solid rgba(255,255,255,.2)',borderRadius:10,padding:'11px 24px',fontFamily:'var(--fn)',fontSize:13,fontWeight:700,cursor:'pointer',transition:'var(--tr)'}}
        >
          ✕ Close
        </button>
      </div>
      <div style={{color:'rgba(255,255,255,.3)',fontSize:11,marginTop:12,fontFamily:'var(--fn)'}}>Press Esc to close</div>
    </div>
  )
}
 
 
// ─── CLIENT IMAGE COMPRESSION ────────────────────────────────────────────────
// Compress product images before uploading so /api/upload receives a smaller file.
// We output JPEG instead of WebP because some upload routes reject image/webp.
// GIF and SVG are kept as-is because canvas conversion can remove animation/vector data.
function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Could not read image for compression'))
    }
    img.src = url
  })
}
 
function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (!blob) reject(new Error('Image compression failed'))
      else resolve(blob)
    }, type, quality)
  })
}
 
async function compressImageFile(file, options = {}) {
  const {
    maxWidth = 1600,
    maxHeight = 1600,
    targetBytes = 900 * 1024,
    minQuality = 0.55,
    outputType = 'image/jpeg',
  } = options
 
  if (!file || !file.type?.startsWith('image/')) return file
  if (file.type === 'image/gif' || file.type === 'image/svg+xml') return file
 
  try {
    const img = await loadImageFromFile(file)
    const width = img.naturalWidth || img.width
    const height = img.naturalHeight || img.height
    if (!width || !height) return file
 
    const ratio = Math.min(1, maxWidth / width, maxHeight / height)
    const outWidth = Math.max(1, Math.round(width * ratio))
    const outHeight = Math.max(1, Math.round(height * ratio))
 
    const canvas = document.createElement('canvas')
    canvas.width = outWidth
    canvas.height = outHeight
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return file
 
    // JPEG does not support transparency, so use a white background.
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, outWidth, outHeight)
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(img, 0, 0, outWidth, outHeight)
 
    let quality = 0.82
    let blob = await canvasToBlob(canvas, outputType, quality)
 
    while (blob.size > targetBytes && quality > minQuality) {
      quality = Math.max(minQuality, quality - 0.07)
      blob = await canvasToBlob(canvas, outputType, quality)
    }
 
    const baseName = String(file.name || 'image').replace(/\.[^.]+$/, '') || 'image'
    const compressed = new File([blob], `${baseName}-compressed.jpg`, {
      type: outputType,
      lastModified: Date.now(),
    })
 
    return compressed.size < file.size ? compressed : file
  } catch (err) {
    console.warn('Image compression skipped:', err)
    return file
  }
}
 
// ─── CODE IMAGE UPLOAD (barcode / QR) ────────────────────────────────────────
function CodeImageUpload({ label, value, onChange, onClear, onUpload }) {
  const ref = useRef(null)
  const [uploading, setUploading] = useState(false)
 
  const handleFile = async (e) => {
    const file = e.target.files[0]; if (!file) return
    if (!['image/jpeg','image/png','image/webp','image/gif'].includes(file.type)) return
    if (onUpload) {
      setUploading(true)
      try {
        const url = await onUpload(file)
        onChange(url)
      } catch (err) {
        console.error('Code image upload failed:', err)
        alert('Upload failed. Please try again. Barcode and QR images must be uploaded as files, not saved as Base64.')
      } finally { setUploading(false) }
    } else {
      alert('Image upload is not configured. Please check /api/upload before adding barcode or QR images.')
    }
    e.target.value = ''
  }
 
  if (value) {
    return (
      <div style={{position:'relative',display:'inline-flex',alignItems:'flex-start',gap:8,background:'var(--bg)',border:'1px solid var(--sf7)',borderRadius:8,padding:8}}>
        <img src={value} alt={label} style={{height:52,maxWidth:120,objectFit:'contain',borderRadius:4,display:'block'}}/>
        <button
          onClick={onClear}
          style={{position:'absolute',top:4,right:4,background:'rgba(239,68,68,.85)',border:'none',borderRadius:'50%',width:18,height:18,color:'#fff',fontSize:10,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',lineHeight:1}}
        >✕</button>
      </div>
    )
  }
 
  return (
    <>
      <button
        onClick={()=>!uploading&&ref.current?.click()}
        disabled={uploading}
        style={{display:'flex',alignItems:'center',gap:6,background:'var(--bg)',border:'1.5px dashed rgba(185,220,210,.8)',borderRadius:8,padding:'8px 12px',fontFamily:'var(--fn)',fontSize:12,fontWeight:600,color:'var(--tl)',cursor:uploading?'not-allowed':'pointer',transition:'var(--tr)',width:'100%',opacity:uploading?.6:1}}
      >
        <span style={{fontSize:15}}>{uploading?'⏳':'📎'}</span> {uploading?'Uploading…':`Upload ${label}`}
      </button>
      <input ref={ref} type="file" accept="image/*" style={{display:'none'}} onChange={handleFile}/>
    </>
  )
}
 
// ─── DIMENSIONS TABLE EDITOR ─────────────────────────────────────────────────
function DimensionsEditor({ value, onChange }) {
  const tbl = value && typeof value === 'object' ? value : { headers: [''], rows: [['']] }
  const cols = tbl.headers.length
 
  const setHeader = (ci, val) => {
    const h = [...tbl.headers]; h[ci] = val
    onChange({ ...tbl, headers: h })
  }
  const setCell = (ri, ci, val) => {
    const rows = tbl.rows.map((r, i) => i === ri ? r.map((c, j) => j === ci ? val : c) : [...r])
    onChange({ ...tbl, rows })
  }
  const addCol = () => {
    onChange({ headers: [...tbl.headers, ''], rows: tbl.rows.map(r => [...r, '']) })
  }
  const removeCol = (ci) => {
    if (cols <= 1) return
    onChange({ headers: tbl.headers.filter((_,i)=>i!==ci), rows: tbl.rows.map(r=>r.filter((_,i)=>i!==ci)) })
  }
  const addRow = () => {
    onChange({ ...tbl, rows: [...tbl.rows, Array(cols).fill('')] })
  }
  const removeRow = (ri) => {
    if (tbl.rows.length <= 1) return
    onChange({ ...tbl, rows: tbl.rows.filter((_,i)=>i!==ri) })
  }
 
  const cellStyle = { fontFamily:'var(--fn)',fontSize:13,border:'1px solid var(--sf7)',borderRadius:5,padding:'6px 8px',outline:'none',width:'100%',background:'#fff' }
  const headStyle = { ...cellStyle, fontWeight:700,color:'var(--tl)',background:'var(--sf4)' }
  const btnStyle = { background:'none',border:'none',cursor:'pointer',color:'rgba(239,68,68,.5)',fontSize:14,padding:'0 4px',lineHeight:1 }
  const addBtnStyle = { background:'var(--sf4)',border:'1px dashed rgba(185,220,210,.8)',borderRadius:6,padding:'5px 10px',fontFamily:'var(--fn)',fontSize:11,fontWeight:700,color:'var(--tl)',cursor:'pointer',transition:'var(--tr)' }
 
  return (
    <div style={{display:'flex',flexDirection:'column',gap:8}}>
      <div style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:13,minWidth:200}}>
          <thead>
            <tr>
              {tbl.headers.map((h,ci)=>(
                <th key={ci} style={{padding:'4px 4px 4px 0',verticalAlign:'bottom',width:`${90/cols}%`}}>
                  <div style={{display:'flex',alignItems:'center',gap:3}}>
                    <input value={h} onChange={e=>setHeader(ci,e.target.value)} style={headStyle} placeholder={ci===0?'Label':'Value'}/>
                    {cols>1 && <button style={btnStyle} onClick={()=>removeCol(ci)}>✕</button>}
                  </div>
                </th>
              ))}
              <th style={{width:32}}/>
            </tr>
          </thead>
          <tbody>
            {tbl.rows.map((row,ri)=>(
              <tr key={ri}>
                {row.map((cell,ci)=>(
                  <td key={ci} style={{padding:'3px 4px 3px 0'}}>
                    <input value={cell} onChange={e=>setCell(ri,ci,e.target.value)} style={cellStyle} placeholder="—"/>
                  </td>
                ))}
                <td style={{padding:'3px 0',verticalAlign:'middle'}}>
                  {tbl.rows.length>1 && <button style={btnStyle} onClick={()=>removeRow(ri)}>✕</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{display:'flex',gap:8}}>
        <button style={addBtnStyle} onClick={addRow}>+ Row</button>
        <button style={addBtnStyle} onClick={addCol}>+ Column</button>
      </div>
    </div>
  )
}
 
// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
 
 
// ─── CATALOG PREFERENCES AUTOSAVE ─────────────────────────────────────────────
const CATALOG_PREFS_KEY = 'qnh-catalog-preferences'
function getSavedCatalogPrefs() {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(CATALOG_PREFS_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}
function savedNumberOrNull(value) {
  if (value === null || value === undefined || value === '') return null
  const num = Number(value)
  return Number.isFinite(num) ? num : null
}


// ─── EMBEDDED IMAGE CLEANUP ──────────────────────────────────────────────────
// Base64/data URL images make /api/products and /api/settings very heavy because
// they are stored inside JSON and cannot be cached like normal image files.
// Keep only CDN/Blob/static URLs in saved catalog data.
const isEmbeddedDataImage = (value) => typeof value === 'string' && /^data:image\//i.test(value.trim())

function stripEmbeddedDataImagesFromProduct(product = {}) {
  const cleanImages = Array.isArray(product.images)
    ? product.images.filter(img => {
        const src = typeof img === 'string' ? img : img?.src
        return !isEmbeddedDataImage(src)
      })
    : []

  const cleanColors = Array.isArray(product.colors)
    ? product.colors.map(color => {
        const next = { ...color }
        if (isEmbeddedDataImage(next.barcodeImage)) next.barcodeImage = ''
        if (isEmbeddedDataImage(next.qrImage)) next.qrImage = ''
        if (isEmbeddedDataImage(next.barcodeUrl)) next.barcodeUrl = ''
        if (isEmbeddedDataImage(next.qrUrl)) next.qrUrl = ''
        return next
      })
    : []

  return {
    ...product,
    images: cleanImages,
    colors: cleanColors,
    barcodeImage: isEmbeddedDataImage(product.barcodeImage) ? '' : (product.barcodeImage || ''),
    qrImage: isEmbeddedDataImage(product.qrImage) ? '' : (product.qrImage || ''),
  }
}

function stripEmbeddedDataImagesFromSettings(settings = {}) {
  const cleanBanners = Array.isArray(settings.banners)
    ? settings.banners.filter(banner => !isEmbeddedDataImage(banner?.image))
    : settings.banners

  return {
    ...settings,
    banners: cleanBanners,
    brandLogo: isEmbeddedDataImage(settings.brandLogo) ? '' : (settings.brandLogo || ''),
    heroVideoThumbnail: isEmbeddedDataImage(settings.heroVideoThumbnail) ? '' : (settings.heroVideoThumbnail || ''),
  }
}

function hasEmbeddedDataImages(value) {
  try { return JSON.stringify(value).includes('data:image/') }
  catch { return false }
}
 
export default function QuenchaCatalog() {
  useEffect(() => {
    const id = 'qnh-styles'
    if (!document.getElementById(id)) {
      const s = document.createElement('style'); s.id = id; s.textContent = CSS
      document.head.appendChild(s)
    }
  }, [])
 
  // ── DATA ──
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [colorCollections, setColorCollections] = useState(DEFAULT_COLOR_COLLECTIONS)
  const [colorCollectionSets, setColorCollectionSets] = useState(getSavedColorCollectionSets)
  const [newCollection, setNewCollection] = useState({ label:'', color:'#279989' })
  const [editingCollectionSet, setEditingCollectionSet] = useState('')
  const [collectionSetDraft, setCollectionSetDraft] = useState([])
  const [newCollectionSetColor, setNewCollectionSetColor] = useState({ name:'', code:'', hex:'#B9DCD2' })
 
  // Load saved catalog preferences once so filter/sort state can initialize safely.
  const savedCatalogPrefsRef = useRef(getSavedCatalogPrefs())
  const [catalogPrefsHydrated, setCatalogPrefsHydrated] = useState(false)
 
  // Fetch all data on mount — Redis is now the source of truth.
  // Important: this no longer auto-seeds missing products from the local SEED list,
  // so products you delete manually in Upstash will stay deleted.
  useEffect(() => {
    Promise.all([
      fetch('/api/products').then(r=>r.json()),
      fetch('/api/settings').then(r=>r.json()),
    ]).then(([prods, settings]) => {
      const existingProducts = Array.isArray(prods) ? prods : []
      const cleanedProducts = existingProducts.map(p => stripEmbeddedDataImagesFromProduct({ youtube: '', ...p }))
      const cleanedSettings = stripEmbeddedDataImagesFromSettings(settings || {})

      setProducts(cleanedProducts)

      // One-time cleanup: if old Base64 images are already saved in Redis, remove
      // them after the first load so future visits no longer download them in JSON.
      existingProducts.forEach((product, index) => {
        if (hasEmbeddedDataImages(product) && product?.id) {
          fetch('/api/products/' + product.id, {
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({ ...product, ...cleanedProducts[index], updatedAt:new Date().toISOString() })
          }).catch(console.error)
        }
      })
      if (hasEmbeddedDataImages(settings || {})) {
        fetch('/api/settings', {
          method:'PUT',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(cleanedSettings)
        }).catch(console.error)
      }
 
      if (Array.isArray(cleanedSettings.banners))          setBanners(cleanedSettings.banners)
      if (cleanedSettings.bannerAspect)                 setBannerAspect(cleanedSettings.bannerAspect)
      if (cleanedSettings.bannerInterval !== undefined) setBannerIntervalVal(cleanedSettings.bannerInterval)
      if (cleanedSettings.heroVideoUrl !== undefined)       setHeroVideoUrl(cleanedSettings.heroVideoUrl || '')
      if (cleanedSettings.heroVideoThumbnail !== undefined) setHeroVideoThumbnail(cleanedSettings.heroVideoThumbnail || '')
      if (cleanedSettings.heroMediaOrder)                  setHeroMediaOrder(cleanedSettings.heroMediaOrder)
      if (cleanedSettings.heroTitle !== undefined)           setHeroTitle(cleanedSettings.heroTitle || '')
      if (cleanedSettings.heroSub !== undefined)             setHeroSub(cleanedSettings.heroSub || '')
      if (cleanedSettings.brandLogo !== undefined)           setBrandLogo(cleanedSettings.brandLogo || '')
      if (cleanedSettings.brandName !== undefined)           setBrandName(cleanedSettings.brandName || '')
      if (cleanedSettings.brandTagline !== undefined)        setBrandTagline(cleanedSettings.brandTagline || '')
      if (Array.isArray(cleanedSettings.colorCollections)) {
        setColorCollections(cleanedSettings.colorCollections)
      } else if (typeof window !== 'undefined') {
        try {
          const storedCollections = JSON.parse(localStorage.getItem('qnh-color-collections') || 'null')
          if (Array.isArray(storedCollections)) setColorCollections(storedCollections)
        } catch {}
      }
      if (cleanedSettings.colorCollectionSets && typeof cleanedSettings.colorCollectionSets === 'object') {
        setColorCollectionSets(prev => ({ ...prev, ...normalizeCollectionSetMap(cleanedSettings.colorCollectionSets) }))
      }
 
      // Shared catalog preferences from /api/settings keep desktop and mobile in sync.
      // Local storage is only a fallback while settings are loading.
      if (cleanedSettings.catalogPrefs && typeof cleanedSettings.catalogPrefs === 'object') {
        const prefs = cleanedSettings.catalogPrefs
        if (prefs.filterExt !== undefined) setFilterExt(prefs.filterExt || 'all')
        if (prefs.filterCat !== undefined) setFilterCat(prefs.filterCat || null)
        if (prefs.filterColorCollection !== undefined) setFilterColorCollection(prefs.filterColorCollection || 'all')
        if (prefs.filterPMin !== undefined) setFilterPMin(savedNumberOrNull(prefs.filterPMin))
        if (prefs.filterPMax !== undefined) setFilterPMax(savedNumberOrNull(prefs.filterPMax))
        if (prefs.sort !== undefined) setSort(prefs.sort || 'default')
        if (prefs.view !== undefined) setView(prefs.view || (typeof window !== 'undefined' && window.innerWidth <= 768 ? 'col-2' : 'col-4'))
        if (typeof window !== 'undefined') {
          localStorage.setItem(CATALOG_PREFS_KEY, JSON.stringify({
            filterExt: prefs.filterExt || 'all',
            filterCat: prefs.filterCat || null,
            filterColorCollection: prefs.filterColorCollection || 'all',
            filterPMin: prefs.filterPMin ?? null,
            filterPMax: prefs.filterPMax ?? null,
            sort: prefs.sort || 'default',
            view: prefs.view || (window.innerWidth <= 768 ? 'col-2' : 'col-4'),
          }))
        }
      }
 
      setCatalogPrefsHydrated(true)
      setLoading(false)
    }).catch(() => { setProducts([]); setCatalogPrefsHydrated(true); setLoading(false) })
  }, [])
 
  // ── FILTERS ──
  const [filterExt, setFilterExt] = useState(() => savedCatalogPrefsRef.current.filterExt || 'all')
  const [filterCat, setFilterCat] = useState(() => savedCatalogPrefsRef.current.filterCat || null)
  const [filterColorCollection, setFilterColorCollection] = useState(() => savedCatalogPrefsRef.current.filterColorCollection || 'all')
  const [cats, setCats] = useState(DEFAULT_CATS)
  const [catMgrOpen, setCatMgrOpen] = useState(false)
  const [newCat, setNewCat] = useState({value:'',label:'',icon:'🏷️'})
  const [exts, setExts] = useState(DEFAULT_EXTS)
  const [extMgrOpen, setExtMgrOpen] = useState(false)
  const [newExt, setNewExt] = useState({value:'',label:'',color:'#279989'})
  const [filterPMin, setFilterPMin] = useState(() => savedNumberOrNull(savedCatalogPrefsRef.current.filterPMin))
  const [filterPMax, setFilterPMax] = useState(() => savedNumberOrNull(savedCatalogPrefsRef.current.filterPMax))
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState(() => savedCatalogPrefsRef.current.sort || 'default')
  const [dragProductId, setDragProductId] = useState(null)
  const [view, setView] = useState(() => savedCatalogPrefsRef.current.view || (typeof window !== 'undefined' && window.innerWidth <= 768 ? 'col-2' : 'col-4'))
  const [showMobileFilter, setShowMobileFilter] = useState(false)
  const searchInputRef = useRef(null)
  const resultsRef = useRef(null)
  const productCardRefs = useRef({})
  const vmImageRef = useRef(null)
  const touchImageDragIndexRef = useRef(null)
 
  // Catalog preferences are autosaved to /api/settings after syncSettings is defined below.
  // Search text is intentionally not saved so users do not return to a hidden/filtered search state.
 
  // ── AUTH — once unlocked, stays for session ──
  const [isAuthed, setIsAuthed] = useState(false)
  const [editMode, setEditMode] = useState(false)
 
  // Password modal
  const [pwOpen, setPwOpen] = useState(false)
  const [pwValue, setPwValue] = useState('')
  const [pwError, setPwError] = useState('')
  const [pwShow, setPwShow] = useState(false)
  const [pwIntent, setPwIntent] = useState(null) // 'topbar' | product object
  const pwRef = useRef(null)
 
  // Modals
  const [viewProduct, setViewProduct] = useState(null)
  const [vmImg, setVmImg] = useState(0)
  const [vmColorKey, setVmColorKey] = useState('')
  const [ytPlaying, setYtPlaying] = useState(false)
  const [banners, setBanners] = useState([])
  const [bannerAspect, setBannerAspect] = useState('custom')
  const [bannerEditOpen, setBannerEditOpen] = useState(false)
  const [heroVideoUrl, setHeroVideoUrl] = useState('')
  const [heroVideoThumbnail, setHeroVideoThumbnail] = useState('')
  const [heroMediaOrder, setHeroMediaOrder] = useState('banner-video')
  const [brandLogo, setBrandLogo] = useState('')
  const [brandName, setBrandName] = useState('')
  const [brandTagline, setBrandTagline] = useState('')
  const [brandEditOpen, setBrandEditOpen] = useState(false)
  const [brandUploadErr, setBrandUploadErr] = useState('')
 
  // Quenchables builder
  const [quenchOpen, setQuenchOpen] = useState(false)
  const [quenchStep, setQuenchStep] = useState('collection')
  const [quenchCollection, setQuenchCollection] = useState('Horizon')
  const [quenchCat, setQuenchCat] = useState('sip')
  const [quenchItems, setQuenchItems] = useState([])
  const [quenchQty, setQuenchQty] = useState({})
  const [quenchColor, setQuenchColor] = useState({})
  const [quenchMessage, setQuenchMessage] = useState('')
 
 
  const syncSettings = useCallback((patch) => {
    fetch('/api/settings', { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(patch) }).catch(console.error)
  }, [])
 
  const focusSearchResults = useCallback(() => {
    window.requestAnimationFrame(() => {
      const target = resultsRef.current
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  }, [])
 
  const runSearch = useCallback(() => {
    if (!search.trim()) {
      searchInputRef.current?.focus()
      return
    }
    focusSearchResults()
  }, [search, focusSearchResults])
 
  const saveCatalogView = useCallback((nextView) => {
    setView(nextView)
    if (!catalogPrefsHydrated) return
    const catalogPrefs = {
      filterExt,
      filterCat,
      filterColorCollection,
      filterPMin,
      filterPMax,
      sort,
      view: nextView,
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(CATALOG_PREFS_KEY, JSON.stringify(catalogPrefs))
    }
    syncSettings({ catalogPrefs })
  }, [catalogPrefsHydrated, filterExt, filterCat, filterColorCollection, filterPMin, filterPMax, sort, syncSettings])
 
  const saveCatalogSort = useCallback((nextSort) => {
    setSort(nextSort)
    if (!catalogPrefsHydrated) return
    const catalogPrefs = {
      filterExt,
      filterCat,
      filterColorCollection,
      filterPMin,
      filterPMax,
      sort: nextSort,
      view,
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(CATALOG_PREFS_KEY, JSON.stringify(catalogPrefs))
    }
    syncSettings({ catalogPrefs })
  }, [catalogPrefsHydrated, filterExt, filterCat, filterColorCollection, filterPMin, filterPMax, view, syncSettings])
 
  // Autosave selected filters, sort, and view layout to shared settings so desktop/mobile stay in sync.
  useEffect(() => {
    if (!catalogPrefsHydrated) return
    const catalogPrefs = {
      filterExt,
      filterCat,
      filterColorCollection,
      filterPMin,
      filterPMax,
      sort,
      view,
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(CATALOG_PREFS_KEY, JSON.stringify(catalogPrefs))
    }
    syncSettings({ catalogPrefs })
  }, [catalogPrefsHydrated, filterExt, filterCat, filterColorCollection, filterPMin, filterPMax, sort, view, syncSettings])
 
  const saveBanners = useCallback((b) => { setBanners(b); syncSettings({ banners: b }) }, [syncSettings])
  const saveAspect = useCallback((a) => { setBannerAspect(a); syncSettings({ bannerAspect: a }) }, [syncSettings])
  const [bannerInterval, setBannerIntervalVal] = useState(4.5)
  const saveBannerInterval = useCallback((v) => { setBannerIntervalVal(v); syncSettings({ bannerInterval: v }) }, [syncSettings])
  const saveHeroVideoUrl = useCallback((v) => { setHeroVideoUrl(v); syncSettings({ heroVideoUrl: v }) }, [syncSettings])
  const saveHeroVideoThumbnail = useCallback((v) => { setHeroVideoThumbnail(v); syncSettings({ heroVideoThumbnail: v }) }, [syncSettings])
  const saveHeroMediaOrder = useCallback((v) => { setHeroMediaOrder(v); syncSettings({ heroMediaOrder: v }) }, [syncSettings])
  const saveBrandLogo = useCallback((v) => { setBrandLogo(v); syncSettings({ brandLogo: v }) }, [syncSettings])
  const saveBrandName = useCallback((v) => { setBrandName(v); syncSettings({ brandName: v }) }, [syncSettings])
  const saveBrandTagline = useCallback((v) => { setBrandTagline(v); syncSettings({ brandTagline: v }) }, [syncSettings])
  const saveColorCollections = useCallback((next) => {
    setColorCollections(next)
    if (typeof window !== 'undefined') localStorage.setItem('qnh-color-collections', JSON.stringify(next))
    syncSettings({ colorCollections: next })
  }, [syncSettings])
 
  const saveColorCollectionSets = useCallback((next) => {
    setColorCollectionSets(next)
    if (typeof window !== 'undefined') localStorage.setItem(COLOR_COLLECTION_SETS_KEY, JSON.stringify(next))
    syncSettings({ colorCollectionSets: next })
  }, [syncSettings])
 
  const [heroTitle, setHeroTitle] = useState('Sip, Savor & Go.')
  const [heroSub, setHeroSub] = useState('Complete product lineup — drinkware, lunch essentials, bags, accessories, kids, pets & tech.')
  const saveHeroTitle = useCallback((v) => { setHeroTitle(v); syncSettings({ heroTitle: v }) }, [syncSettings])
  const saveHeroSub = useCallback((v) => { setHeroSub(v); syncSettings({ heroSub: v }) }, [syncSettings])
  const { copy, copied } = useCopy()
 
  const getFirstSku = useCallback((product = null) => product?.colors?.[0]?.sku || '', [])
 
  const getSkuBase = useCallback((product = null) => getProductSkuBase(product), [])
 
  const openProductModal = useCallback((product, options = {}) => {
    if (!product) return
    const { updateUrl = true } = options
    setViewProduct(product)
    setVmImg(0)
    setVmColorKey('')
    setYtPlaying(false)
 
    if (updateUrl && typeof window !== 'undefined') {
      const skuBase = getProductSkuBase(product)
      if (skuBase) {
        const url = new URL(window.location.href)
        url.searchParams.set('sku', skuBase)
        window.history.pushState({ productSku: skuBase }, '', url.toString())
      }
    }
  }, [])
 
  const closeProductModal = useCallback(() => {
    setViewProduct(null)
    setVmColorKey('')
    setYtPlaying(false)
 
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      if (url.searchParams.has('sku')) {
        url.searchParams.delete('sku')
        window.history.pushState({}, '', url.toString())
      }
    }
  }, [])
 
  const copyProductLink = useCallback((product) => {
    if (typeof window === 'undefined' || !product) return
    const skuBase = getProductSkuBase(product)
    if (!skuBase) return
    const link = `${window.location.origin}${window.location.pathname}?sku=${encodeURIComponent(skuBase)}`
    copy(link)
  }, [copy])
 
  useEffect(() => {
    if (!products.length || typeof window === 'undefined') return
 
    const openFromUrl = () => {
      const skuParam = new URL(window.location.href).searchParams.get('sku')
      if (!skuParam) return
      const match = products.find(product => productMatchesSku(product, skuParam))
      if (!match) return
 
      openProductModal(match, { updateUrl: false })
      window.requestAnimationFrame(() => {
        productCardRefs.current[match.id]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      })
    }
 
    openFromUrl()
    window.addEventListener('popstate', openFromUrl)
    return () => window.removeEventListener('popstate', openFromUrl)
  }, [products, openProductModal])
 
  const buildInquiryText = useCallback((product, lines, message) => {
    const packing = parseInt(product?.packing, 10) || 0
    const safeLines = Array.isArray(lines) ? lines : []
    const requestedLines = safeLines
      .map((line) => {
        const packs = parseInt(line?.packs, 10) || 0
        const color = product?.colors?.find(c => c.code === line?.colorCode) || product?.colors?.[0] || null
        const units = packs && packing ? packs * packing : 0
        return { color, packs, units }
      })
      .filter(line => line.packs > 0)
 
    const skuBase = getSkuBase(product)
    const totalPacks = requestedLines.reduce((sum, line) => sum + line.packs, 0)
    const totalUnits = requestedLines.reduce((sum, line) => sum + line.units, 0)
    const requestSummary = requestedLines.length
      ? requestedLines.map((line, index) => {
          const colorLabel = line.color ? `${line.color.name} (${line.color.code})` : 'Color'
          const skuLabel = line.color?.sku ? ` | SKU: ${line.color.sku}` : ''
          const unitsLabel = line.units ? ` | Estimated Units: ${line.units} pcs` : ''
          return `${index + 1}. ${colorLabel}${skuLabel} | Packs/Cartons: ${line.packs}${unitsLabel}`
        }).join('\n')
      : '1. Color / SKU: | Packs/Cartons:'
 
    return [
      'Hi Quencha Team,',
      '',
      'I would like to inquire about bulk orders / corporate gifting / UV printing.',
      '',
      product ? `Product: ${product.name}` : 'Product / SKU:',
      skuBase ? `SKU Base: ${skuBase}` : '',
      product?.srp ? `SRP: ₱${Number(product.srp).toLocaleString('en-PH', { minimumFractionDigits: 2 })}` : '',
      packing ? `Packing: ${packing} pcs per pack/carton` : 'Packing:',
      '',
      'Requested Colors / Quantities:',
      requestSummary,
      '',
      totalPacks ? `Total Packs/Cartons: ${totalPacks}` : '',
      totalUnits ? `Estimated Total Units: ${totalUnits} pcs` : '',
      '',
      'Company / Name:',
      'Contact Number:',
      'Delivery Area:',
      '',
      message?.trim() ? `Message / Notes:
${message.trim()}` : 'Message / Notes:',
      '',
      'Thank you.'
    ].filter(line => line !== '').join('\n')
  }, [getSkuBase])
 
  const buildInquiryHref = useCallback((product, lines, message) => {
    const email = 'design@sunbeamsimpexinc.com'
    const subject = product ? `Quencha Bulk Inquiry - ${product.name}` : 'Quencha Bulk Inquiry'
    const body = buildInquiryText(product, lines, message)
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }, [buildInquiryText])
 
  // ── API HELPERS ──
  const apiCreateProduct = useCallback(async (product) => {
    const res = await fetch('/api/products', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(product) })
    if (!res.ok) throw new Error('Create product failed')
    return res.json().catch(() => product)
  }, [])
 
  const apiSaveProduct = useCallback(async (id, data) => {
    const res = await fetch('/api/products/' + id, { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) })
    if (!res.ok) throw new Error('Save product failed')
    return res.json().catch(() => data)
  }, [])
 
  // ── IMAGE UPLOAD via Vercel Blob ──
  const uploadImageToBlob = useCallback(async (file, options = {}) => {
    const shouldCompress = options.compress !== false
    const uploadFile = shouldCompress ? await compressImageFile(file) : file
 
    const fd = new FormData()
    fd.append('file', uploadFile)
 
    const res = await fetch('/api/upload', { method:'POST', body: fd })
    if (!res.ok) {
      let message = `Upload failed (${res.status})`
      try {
        const payload = await res.json()
        message = payload?.error || payload?.message || message
      } catch {}
      const mb = (uploadFile.size / 1024 / 1024).toFixed(2)
      throw new Error(`${message} — ${uploadFile.type || 'unknown type'}, ${mb}MB`)
    }
    const { url } = await res.json()
    if (!url) throw new Error('Upload completed but no URL was returned')
    return url
  }, [])
 
  const handleBrandLogoUpload = useCallback(async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const allowed = ['image/png','image/jpeg','image/webp','image/svg+xml']
    if (!allowed.includes(file.type)) {
      setBrandUploadErr('Please upload a PNG, JPG, WebP, or SVG logo.')
      e.target.value = ''
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setBrandUploadErr('Logo file is too large. Please keep it under 5MB.')
      e.target.value = ''
      return
    }
    setBrandUploadErr('Uploading logo...')
    try {
      const url = await uploadImageToBlob(file, { compress: file.type !== 'image/svg+xml' })
      saveBrandLogo(url)
      setBrandUploadErr('')
    } catch (err) {
      console.error(err)
      setBrandUploadErr(err?.message || 'Logo upload failed. Please try again.')
    }
    e.target.value = ''
  }, [saveBrandLogo, uploadImageToBlob])
  const [editOpen, setEditOpen] = useState(false)
  const [editTarget, setEditTarget] = useState(null) // null = new
  const [inqOpen, setInqOpen] = useState(false)
  const [inqProduct, setInqProduct] = useState(null)
  const [inqLines, setInqLines] = useState([])
  const [inqMessage, setInqMessage] = useState('')
  const [codeLightbox, setCodeLightbox] = useState(null) // {src, label}
 
  const openInquiry = useCallback((product = null) => {
    const firstColorCode = product?.colors?.[0]?.code || ''
    setInqProduct(product)
    setInqLines([{ colorCode: firstColorCode, packs: '1' }])
    setInqMessage('')
    setInqOpen(true)
  }, [])
 
  // Edit form
  const [ef, setEf] = useState({ name:'',ext:'core',cat:'sip',srp:'',packing:'',desc:'',badges:[],colors:[],images:[] })
  const [editTab, setEditTab] = useState('details')
  const [badgeInput, setBadgeInput] = useState('')
  const [newColor, setNewColor] = useState({ name:'',code:'',hex:'#B9DCD2',hexes:['#B9DCD2'],collection:'OG',sku:'' })
  const [uploadErr, setUploadErr] = useState('')
  const [dragImageIndex, setDragImageIndex] = useState(null)
  const [dragOverImageIndex, setDragOverImageIndex] = useState(null)
  const [dragOverImagePosition, setDragOverImagePosition] = useState('before')
  const [addingNewExt, setAddingNewExt] = useState(false)
  const [inlineNewExt, setInlineNewExt] = useState({label:'',color:'#279989'})
  const [addingNewCat, setAddingNewCat] = useState(false)
  const [inlineNewCat, setInlineNewCat] = useState({label:'',icon:'🏷️'})
  const fileRef = useRef(null)
 
  // ── PASSWORD FLOW ──
  const requestAuth = useCallback((intent) => {
    // intent = 'topbar' | 'newProduct' | product-object
    if (isAuthed) { handleAuthSuccess(intent); return }
    setPwIntent(intent); setPwValue(''); setPwError(''); setPwShow(false); setPwOpen(true)
    setTimeout(() => pwRef.current?.focus(), 100)
  }, [isAuthed]) // eslint-disable-line
 
  const handleAuthSuccess = useCallback((intent) => {
    setIsAuthed(true)
    if (intent === 'topbar') { setEditMode(true) }
    else if (intent === 'newProduct') { openNewProduct() }
    else if (intent && typeof intent === 'object') { openEdit(intent) }
  }, []) // eslint-disable-line
 
  const submitPassword = () => {
    if (pwValue === EDIT_PASSWORD) {
      setPwOpen(false)
      handleAuthSuccess(pwIntent)
    } else {
      setPwError('Incorrect password. Try again.')
      setPwValue('')
      setTimeout(() => pwRef.current?.focus(), 50)
    }
  }
 
  const exitEdit = () => { setEditMode(false) }
 
  // ── EDIT HELPERS ──
  const openEdit = (p) => {
    setEditTarget(p)
    setEf({ name:p.name,ext:p.ext,cat:p.cat,srp:p.srp,packing:p.packing,desc:p.desc,badges:[...p.badges],colors:p.colors.map(c=>normalizeColorVariant(c)),images:normalizeProductImages(p.images||[]),dimensions:p.dimensions&&typeof p.dimensions==='object'?{headers:[...p.dimensions.headers],rows:p.dimensions.rows.map(r=>[...r])}:{headers:[''],rows:[['']],},barcode:p.barcode||'',barcodeImage:p.barcodeImage||'',qrCode:p.qrCode||'',qrImage:p.qrImage||'',youtube:p.youtube||'' })
    setEditTab('details'); setBadgeInput(''); setNewColor({name:'',code:'',hex:'#B9DCD2',hexes:['#B9DCD2'],collection:'OG',sku:''}); setUploadErr(''); setAddingNewExt(false); setAddingNewCat(false)
    setEditOpen(true)
  }
  const openNewProduct = () => {
    setEditTarget(null)
    setEf({ name:'',ext:'core',cat:'sip',srp:'',packing:'',desc:'',badges:[],colors:[],images:[],dimensions:{headers:[''],rows:[['']],},barcode:'',barcodeImage:'',qrCode:'',qrImage:'',youtube:'' })
    setEditTab('details'); setBadgeInput(''); setNewColor({name:'',code:'',hex:'#B9DCD2',hexes:['#B9DCD2'],collection:'OG',sku:''}); setUploadErr(''); setAddingNewExt(false); setAddingNewCat(false)
    setEditOpen(true)
  }
 
  const saveProduct = async () => {
    if (!ef.name.trim()) { alert('Product name is required.'); return }
    const srp = parseFloat(ef.srp)
    if (!srp || srp <= 0) { alert('Valid price is required.'); return }
 
    const normalizedColors = (ef.colors || []).map(c => normalizeColorVariant(c))
    const normalizedImages = normalizeProductImages(ef.images || [])
    const temporaryImages = normalizedImages.filter(img => String(img?.src || '').startsWith('data:'))
    const cleanedImages = normalizedImages.filter(img => !String(img?.src || '').startsWith('data:'))
 
    if (temporaryImages.length) {
      setUploadErr(`${temporaryImages.length} failed preview image${temporaryImages.length === 1 ? '' : 's'} removed before saving. Please re-upload those images after saving.`)
      setEf(f => ({ ...f, images: cleanedImages }))
    }
 
    const data = stripEmbeddedDataImagesFromProduct({
      ...ef,
      colors: normalizedColors,
      images: cleanedImages,
      srp,
      packing: parseInt(ef.packing) || 0,
      dimensions: ef.dimensions,
      barcode: ef.barcode||'',
      barcodeImage: ef.barcodeImage||'',
      qrCode: ef.qrCode||'',
      qrImage: ef.qrImage||'',
      youtube: ef.youtube||''
    })
 
    try {
      if (editTarget) {
        const saved = { ...editTarget, ...data, updatedAt: new Date().toISOString() }
        const updated = products.map(p => p.id === editTarget.id ? saved : p)
        setProducts(updated)
        await apiSaveProduct(editTarget.id, saved)
        setEditOpen(false)
        setViewProduct(saved)
        setVmImg(0)
        setVmColorKey('')
        setYtPlaying(false)
      } else {
        const saved = { ...data, id: 'p' + Date.now(), sortOrder: products.length, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
        setProducts([...products, saved])
        await apiCreateProduct(saved)
        setEditOpen(false)
      }
    } catch (err) {
      console.error(err)
      alert('Could not save this product. Please check the API route or internet connection, then try again.')
    }
  }
 
  const deleteProduct = async (id) => {
    if (!confirm('Delete this product? This cannot be undone.')) return
    setProducts(products.filter(p => p.id !== id))
    setEditOpen(false); setViewProduct(null)
    await fetch('/api/products/' + id, { method: 'DELETE' }).catch(console.error)
  }
 
  const moveProductOrder = useCallback((fromId, toId) => {
    if (!editMode || sort !== 'default' || !fromId || !toId || fromId === toId) return
    setProducts(prev => {
      const fromIndex = prev.findIndex(p => p.id === fromId)
      const toIndex = prev.findIndex(p => p.id === toId)
      if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return prev
 
      const next = [...prev]
      const [moved] = next.splice(fromIndex, 1)
      next.splice(toIndex, 0, moved)
 
      const reordered = next.map((p, index) => ({
        ...p,
        sortOrder: index,
        updatedAt: new Date().toISOString()
      }))
 
      // Persist the manual order so it stays after refresh/redeploy.
      reordered.forEach(p => apiSaveProduct(p.id, p))
      return reordered
    })
  }, [editMode, sort, apiSaveProduct])
 
  // Badges
  const addBadge = () => { const b = badgeInput.trim(); if (b && !ef.badges.includes(b)) { setEf(f=>({...f,badges:[...f.badges,b]})); setBadgeInput('') } }
  const removeBadge = (b) => setEf(f=>({...f,badges:f.badges.filter(x=>x!==b)}))
 
  // Colors
  const addColor = () => {
    const { name, code, sku } = newColor
    const hexes = getColorHexes(newColor)
    if (!name || !code || !sku) { alert('Name, code, and SKU required.'); return }
    setEf(f=>({...f,colors:[...f.colors,normalizeColorVariant({name,code:code.toUpperCase(),hex:hexes[0]||'#B9DCD2',hexes,collection:newColor.collection||'OG',sku:sku.toUpperCase()})]}))
    setNewColor({ name:'',code:'',hex:'#B9DCD2',hexes:['#B9DCD2'],collection:'OG',sku:'' })
  }
  const removeColor = (i) => setEf(f=>({...f,colors:f.colors.filter((_,j)=>j!==i)}))
  const moveColor = (from, to) => setEf(f=>{
    if (to < 0 || to >= f.colors.length || from === to) return f
    const colors = [...f.colors]
    const [moved] = colors.splice(from, 1)
    colors.splice(to, 0, moved)
    return {...f, colors}
  })
  const updateColor = (i,k,v) => setEf(f=>({...f,colors:f.colors.map((c,j)=>j===i?normalizeColorVariant({...c,[k]:k==='sku'||k==='code'?v.toUpperCase():v}):c)}))
  const updateColorHex = (i, hexIndex, value) => setEf(f=>({...f,colors:f.colors.map((c,j)=>{
    if (j !== i) return c
    const hexValue = normalizeHexValue(value, getColorHexes(c)[hexIndex] || '#B9DCD2')
    const hexes = getColorHexes(c).map((h,idx)=>idx===hexIndex?hexValue:h)
    return normalizeColorVariant({...c,hex:hexes[0],hexes})
  })}))
  const pasteColorHex = (i, hexIndex, value) => {
    const parsed = extractHexValues(value)
    if (!parsed.length) return
    setEf(f=>({...f,colors:f.colors.map((c,j)=>{
      if (j !== i) return c
      const current = getColorHexes(c)
      const hexes = parsed.length > 1 ? parsed : current.map((h,idx)=>idx===hexIndex?parsed[0]:h)
      return normalizeColorVariant({...c,hex:hexes[0],hexes})
    })}))
  }
  const addColorHex = (i) => setEf(f=>({...f,colors:f.colors.map((c,j)=>{
    if (j !== i) return c
    const hexes = [...getColorHexes(c), '#B9DCD2']
    return normalizeColorVariant({...c,hex:hexes[0],hexes})
  })}))
  const removeColorHex = (i, hexIndex) => setEf(f=>({...f,colors:f.colors.map((c,j)=>{
    if (j !== i) return c
    const hexes = getColorHexes(c).filter((_,idx)=>idx!==hexIndex)
    return normalizeColorVariant({...c,hex:hexes[0]||'#B9DCD2',hexes:hexes.length?hexes:['#B9DCD2']})
  })}))
  const updateNewColorHex = (hexIndex, value) => setNewColor(n=>{
    const hexValue = normalizeHexValue(value, getColorHexes(n)[hexIndex] || '#B9DCD2')
    const hexes = getColorHexes(n).map((h,idx)=>idx===hexIndex?hexValue:h)
    return normalizeColorVariant({...n,hex:hexes[0],hexes})
  })
  const pasteNewColorHex = (hexIndex, value) => {
    const parsed = extractHexValues(value)
    if (!parsed.length) return
    setNewColor(n=>{
      const current = getColorHexes(n)
      const hexes = parsed.length > 1 ? parsed : current.map((h,idx)=>idx===hexIndex?parsed[0]:h)
      return normalizeColorVariant({...n,hex:hexes[0],hexes})
    })
  }
  const addNewColorHex = () => setNewColor(n=>{
    const hexes = [...getColorHexes(n), '#B9DCD2']
    return normalizeColorVariant({...n,hex:hexes[0],hexes})
  })
  const removeNewColorHex = (hexIndex) => setNewColor(n=>{
    const hexes = getColorHexes(n).filter((_,idx)=>idx!==hexIndex)
    return normalizeColorVariant({...n,hex:hexes[0]||'#B9DCD2',hexes:hexes.length?hexes:['#B9DCD2']})
  })
 
  const updateCollection = (value, patch) => {
    const next = colorCollections.map(c=>c.value===value?{...c,...patch}:c)
    saveColorCollections(next)
  }
  const addCollection = () => {
    const label = newCollection.label.trim()
    if (!label) return
    const value = label.replace(/\s+/g,' ').trim()
    if (colorCollections.some(c=>c.value.toLowerCase()===value.toLowerCase())) return
    saveColorCollections([...colorCollections,{value,label,color:newCollection.color||'#279989'}])
    setNewCollection({label:'',color:'#279989'})
  }
 
  const collectionSetCount = (value) => (colorCollectionSets[value] || []).length
 
  const colorWithCurrentSkuBase = (color, skuBase) => {
    const code = String(color.code || '').toUpperCase().replace(/\s+/g, '')
    const hexes = getColorHexes(color)
    return normalizeColorVariant({
      ...color,
      code,
      hex: hexes[0] || color.hex || '#B9DCD2',
      hexes,
      sku: skuBase && code ? `${skuBase}-${code}` : String(color.sku || '').toUpperCase(),
      collection: color.collection || 'Other'
    })
  }
 
  const addCollectionSetToProduct = (collectionValue) => {
    const set = colorCollectionSets[collectionValue] || []
    if (!set.length) {
      alert('No saved colors yet for this collection. Add colors to a product, assign them to this collection, then click Save Set.')
      return
    }
    const skuBase = getEditableSkuBase()
    if (!skuBase) {
      alert('Please add or edit the SKU Base in the Details tab first, then try again.')
      return
    }
    setEf(f => {
      const existing = new Set((f.colors || []).map(c => String(c.code || '').toUpperCase()))
      const additions = set
        .map(c => colorWithCurrentSkuBase({ ...c, collection: collectionValue }, skuBase))
        .filter(c => c.code && !existing.has(c.code))
      if (!additions.length) return f
      return { ...f, colors: [...f.colors, ...additions] }
    })
  }
 
  const saveCollectionSetFromCurrentProduct = (collectionValue) => {
    const variants = (ef.colors || [])
      .filter(c => (c.collection || defaultColorCollection(c)) === collectionValue)
      .map(c => {
        const hexes = getColorHexes(c)
        return normalizeColorVariant({
          name: c.name,
          code: String(c.code || '').toUpperCase(),
          hex: hexes[0] || '#B9DCD2',
          hexes,
          collection: collectionValue
        })
      })
      .filter(c => c.name && c.code)
 
    if (!variants.length) {
      alert('No color variants are assigned to this collection yet.')
      return
    }
    saveColorCollectionSets({ ...colorCollectionSets, [collectionValue]: variants })
    alert('Color collection set saved. You can now quick-add it to other products.')
  }
 
 
  const openCollectionSetEditor = (collectionValue) => {
    const saved = colorCollectionSets[collectionValue] || DEFAULT_COLOR_COLLECTION_SETS[collectionValue] || []
    setEditingCollectionSet(collectionValue)
    setCollectionSetDraft(saved.map(c => normalizeColorVariant({ ...c, collection: collectionValue })))
    setNewCollectionSetColor({ name:'', code:'', hex:'#B9DCD2' })
  }
 
  const closeCollectionSetEditor = () => {
    setEditingCollectionSet('')
    setCollectionSetDraft([])
    setNewCollectionSetColor({ name:'', code:'', hex:'#B9DCD2' })
  }
 
  const updateCollectionSetDraft = (index, patch) => {
    setCollectionSetDraft(list => list.map((item, idx) => {
      if (idx !== index) return item
      const next = { ...item, ...patch }
      if (patch.hexes) next.hex = patch.hexes[0] || next.hex || '#B9DCD2'
      if (patch.hex) next.hexes = [patch.hex]
      return normalizeColorVariant({ ...next, collection: editingCollectionSet })
    }))
  }
 
  const updateCollectionSetDraftHexes = (index, value) => {
    const hexes = extractHexValues(value)
    updateCollectionSetDraft(index, { hexes: hexes.length ? hexes : ['#B9DCD2'] })
  }
 
  const removeCollectionSetDraftColor = (index) => {
    setCollectionSetDraft(list => list.filter((_, idx) => idx !== index))
  }
 
  const moveCollectionSetDraftColor = (fromIndex, toIndex) => {
    setCollectionSetDraft(list => {
      if (toIndex < 0 || toIndex >= list.length || fromIndex === toIndex) return list
      const next = [...list]
      const [moved] = next.splice(fromIndex, 1)
      next.splice(toIndex, 0, moved)
      return next
    })
  }
 
  const addCollectionSetDraftColor = () => {
    const name = newCollectionSetColor.name.trim()
    const code = newCollectionSetColor.code.trim().toUpperCase()
    const hexes = extractHexValues(newCollectionSetColor.hex)
    if (!name || !code) return
    setCollectionSetDraft(list => [
      ...list,
      normalizeColorVariant({ name, code, hex: hexes[0] || '#B9DCD2', hexes: hexes.length ? hexes : ['#B9DCD2'], collection: editingCollectionSet })
    ])
    setNewCollectionSetColor({ name:'', code:'', hex:'#B9DCD2' })
  }
 
  const saveCollectionSetDraft = () => {
    if (!editingCollectionSet) return
    const cleaned = collectionSetDraft
      .map(c => normalizeColorVariant({ ...c, code: String(c.code || '').toUpperCase(), collection: editingCollectionSet }))
      .filter(c => c.name && c.code)
    if (!cleaned.length) {
      alert('Please add at least one color before saving this collection set.')
      return
    }
    saveColorCollectionSets({ ...colorCollectionSets, [editingCollectionSet]: cleaned })
    closeCollectionSetEditor()
  }
 
  // SKU Base — bulk-edit all color variant SKUs from Details tab
  const getEditableSkuBase = () => {
    const first = ef.colors?.[0]
    if (!first?.sku) return ''
    const sku = String(first.sku).toUpperCase()
    const code = String(first.code || '').toUpperCase()
    if (code && sku.endsWith(`-${code}`)) return sku.slice(0, -(code.length + 1))
    return sku.split('-').slice(0, -1).join('-') || sku
  }
 
  const updateAllColorSkusFromBase = (base) => {
    const cleaned = base.toUpperCase().replace(/\s+/g, '')
    setEf(f => ({
      ...f,
      colors: f.colors.map(c => {
        const code = String(c.code || '').toUpperCase().replace(/\s+/g, '')
        return { ...c, code, sku: code ? `${cleaned}-${code}` : cleaned }
      })
    }))
  }
 
  // Images
  const handleImgUpload = async (e) => {
    const file = e.target.files[0]; if (!file) return
    if (!['image/jpeg','image/png','image/webp','image/gif'].includes(file.type)) { setUploadErr('Invalid file type. Use JPG, PNG, WebP, or GIF.'); e.target.value = ''; return }
    if (file.size > 25*1024*1024) { setUploadErr('File too large. Max 25MB before compression.'); e.target.value = ''; return }
    setUploadErr('Compressing and uploading image...')
    try {
      const url = await uploadImageToBlob(file)
      setEf(f=>({...f,images:[...normalizeProductImages(f.images),{src:url,colorSku:'',colorCode:'',colorName:''}]}))
      setUploadErr('')
    } catch (err) {
      console.error(err)
      setUploadErr(err?.message || 'Upload failed. Please try again.')
    }
    e.target.value = ''
  }
 
  const uploadFilesForColor = async (fileList, color) => {
    const files = Array.from(fileList || [])
    if (!files.length || !color) return
 
    const allowed = ['image/jpeg','image/png','image/webp','image/gif']
    const validFiles = files.filter(file => allowed.includes(file.type) && file.size <= 25*1024*1024)
 
    if (!validFiles.length) {
      setUploadErr('Invalid file type or file too large. Use JPG, PNG, WebP, or GIF up to 25MB each. JPG/PNG/WebP will be compressed to JPG before upload.')
      return
    }
 
    let skipped = files.length - validFiles.length
    let failed = 0
    const uploaded = []
 
    setUploadErr(`Compressing and uploading ${validFiles.length} image${validFiles.length === 1 ? '' : 's'}...`)
 
    // Upload sequentially. This is more reliable than firing many /api/upload requests at once.
    for (const file of validFiles) {
      try {
        const url = await uploadImageToBlob(file)
        uploaded.push({ src: url, colorSku: color.sku || '', colorCode: color.code || '', colorName: color.name || '' })
      } catch (err) {
        failed += 1
        console.error('Color image upload failed:', err)
      }
    }
 
    if (uploaded.length) {
      setEf(f => ({ ...f, images: [...normalizeProductImages(f.images), ...uploaded] }))
    }
 
    if (failed || skipped) {
      setUploadErr(`${uploaded.length} image${uploaded.length === 1 ? '' : 's'} uploaded. ${failed ? `${failed} failed. ` : ''}${skipped ? `${skipped} skipped due to file type/size. ` : ''}Please try failed images again.`)
    } else {
      setUploadErr('')
    }
  }
 
  const uploadFilesGeneral = async (fileList) => {
    const files = Array.from(fileList || [])
    if (!files.length) return
 
    const allowed = ['image/jpeg','image/png','image/webp','image/gif']
    const validFiles = files.filter(file => allowed.includes(file.type) && file.size <= 25*1024*1024)
 
    if (!validFiles.length) {
      setUploadErr('Invalid file type or file too large. Use JPG, PNG, WebP, or GIF up to 25MB each. JPG/PNG/WebP will be compressed to JPG before upload.')
      return
    }
 
    let skipped = files.length - validFiles.length
    let failed = 0
    const uploaded = []
 
    setUploadErr(`Compressing and uploading ${validFiles.length} general image${validFiles.length === 1 ? '' : 's'}...`)
 
    for (const file of validFiles) {
      try {
        const url = await uploadImageToBlob(file)
        uploaded.push({ src: url, colorSku: '', colorCode: '', colorName: '' })
      } catch (err) {
        failed += 1
        console.error('General image upload failed:', err)
      }
    }
 
    if (uploaded.length) {
      setEf(f => ({ ...f, images: [...normalizeProductImages(f.images), ...uploaded] }))
    }
 
    if (failed || skipped) {
      setUploadErr(`${uploaded.length} general image${uploaded.length === 1 ? '' : 's'} uploaded. ${failed ? `${failed} failed. ` : ''}${skipped ? `${skipped} skipped due to file type/size. ` : ''}Please try failed images again.`)
    } else {
      setUploadErr('')
    }
  }
 
  const setMainImage = (index) => {
    setEf(f => {
      const imgs = [...normalizeProductImages(f.images)]
      if (index <= 0 || index >= imgs.length) return { ...f, images: imgs }
      const [item] = imgs.splice(index, 1)
      imgs.unshift(item)
      return { ...f, images: imgs }
    })
  }
 
  const getTemporaryImageCount = useCallback(() => {
    return normalizeProductImages(ef.images || []).filter(img => String(img?.src || '').startsWith('data:')).length
  }, [ef.images])
 
  const removeTemporaryImages = useCallback(() => {
    const current = normalizeProductImages(ef.images || [])
    const cleaned = current.filter(img => !String(img?.src || '').startsWith('data:'))
    const removed = current.length - cleaned.length
    setEf(f => ({ ...f, images: cleaned }))
    setUploadErr(removed ? `Removed ${removed} failed preview image${removed === 1 ? '' : 's'}. You can now re-upload them.` : '')
  }, [ef.images])
 
  const removeImg = (i) => setEf(f=>({...f,images:normalizeProductImages(f.images).filter((_,j)=>j!==i)}))
  const moveImg = (from, to, position = 'before') => {
    setEf(f => {
      const imgs = [...normalizeProductImages(f.images)]
      if (from < 0 || to < 0 || from >= imgs.length || to >= imgs.length) return { ...f, images: imgs }
      let insertIndex = position === 'after' ? to + 1 : to
      if (from < insertIndex) insertIndex -= 1
      if (from === insertIndex) return { ...f, images: imgs }
      const [item] = imgs.splice(from, 1)
      imgs.splice(insertIndex, 0, item)
      return { ...f, images: imgs }
    })
  }
 
  const clearImageDropGuide = () => {
    setDragOverImageIndex(null)
    setDragOverImagePosition('before')
  }
 
  const handleImageDragStart = (e, index) => {
    setDragImageIndex(index)
    clearImageDropGuide()
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', String(index))
  }
 
  const handleImageDragOver = (e, index) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    if (dragImageIndex === null || dragImageIndex === index) {
      clearImageDropGuide()
      return
    }
    const rect = e.currentTarget.getBoundingClientRect()
    const position = e.clientX > rect.left + rect.width / 2 ? 'after' : 'before'
    setDragOverImageIndex(index)
    setDragOverImagePosition(position)
  }
 
  const handleImageDrop = (e, toIndex) => {
    e.preventDefault()
    const fromRaw = dragImageIndex ?? Number(e.dataTransfer.getData('text/plain'))
    const fromIndex = Number(fromRaw)
    if (Number.isFinite(fromIndex)) moveImg(fromIndex, toIndex, dragOverImagePosition)
    setDragImageIndex(null)
    touchImageDragIndexRef.current = null
    clearImageDropGuide()
  }
 
  const findImageThumbFromPoint = (x, y) => {
    if (typeof document === 'undefined') return null
    const el = document.elementFromPoint(x, y)?.closest?.('[data-img-index]')
    return el || null
  }
 
  const handleImageTouchStart = (e, index) => {
    if (e.target?.closest?.('button,label,input,select')) return
    touchImageDragIndexRef.current = index
    setDragImageIndex(index)
    clearImageDropGuide()
  }
 
  const handleImageTouchMove = (e) => {
    const fromIndex = touchImageDragIndexRef.current
    if (fromIndex === null || fromIndex === undefined) return
    const touch = e.touches?.[0]
    if (!touch) return
    const target = findImageThumbFromPoint(touch.clientX, touch.clientY)
    if (!target) return
    const toIndex = Number(target.dataset.imgIndex)
    if (!Number.isFinite(toIndex) || toIndex === fromIndex) {
      clearImageDropGuide()
      return
    }
    e.preventDefault()
    const rect = target.getBoundingClientRect()
    const position = touch.clientX > rect.left + rect.width / 2 ? 'after' : 'before'
    setDragOverImageIndex(toIndex)
    setDragOverImagePosition(position)
  }
 
  const handleImageTouchEnd = () => {
    const fromIndex = touchImageDragIndexRef.current
    if (fromIndex !== null && fromIndex !== undefined && dragOverImageIndex !== null && Number.isFinite(Number(dragOverImageIndex))) {
      moveImg(Number(fromIndex), Number(dragOverImageIndex), dragOverImagePosition)
    }
    touchImageDragIndexRef.current = null
    setDragImageIndex(null)
    clearImageDropGuide()
  }
 
  const assignImageColor = (index, colorSku) => {
    setEf(f => {
      const selectedColor = (f.colors || []).find(c => c.sku === colorSku)
      const nextImages = normalizeProductImages(f.images).map((img, i) => {
        if (i !== index) return img
        return {
          ...img,
          colorSku: selectedColor?.sku || '',
          colorCode: selectedColor?.code || '',
          colorName: selectedColor?.name || '',
        }
      })
      return { ...f, images: nextImages }
    })
  }
 
 
 
  // ── QUENCHABLES BUILDER ──
  const quenchCollectionMeta = useMemo(() => {
    return colorCollections.find(c => c.value === quenchCollection) || DEFAULT_COLOR_COLLECTIONS.find(c => c.value === quenchCollection) || { value: quenchCollection, label: quenchCollection, color: 'var(--tl)' }
  }, [colorCollections, quenchCollection])
 
  const getQuenchColors = useCallback((product, collection = quenchCollection) => {
    return (product?.colors || []).filter(color => defaultColorCollection(color) === collection)
  }, [quenchCollection])
 
  const quenchAvailableColors = useMemo(() => {
    return colorCollectionSets?.[quenchCollection] || []
  }, [colorCollectionSets, quenchCollection])
 
  const quenchProducts = useMemo(() => {
    return products.filter(product => getQuenchColors(product).length > 0)
  }, [products, getQuenchColors])
 
  const quenchProductsByCat = useMemo(() => {
    return quenchProducts.filter(product => product.cat === quenchCat)
  }, [quenchProducts, quenchCat])
 
  const quenchTotals = useMemo(() => {
    const totalPacks = quenchItems.reduce((sum, item) => sum + Number(item.packs || 0), 0)
    const totalUnits = quenchItems.reduce((sum, item) => sum + Number(item.units || 0), 0)
    const totalSrp = quenchItems.reduce((sum, item) => sum + (Number(item.srp || 0) * Number(item.units || 0)), 0)
    return { totalPacks, totalUnits, totalSrp }
  }, [quenchItems])
 
  const selectedQuenchSkuSet = useMemo(() => {
    return new Set(quenchItems.map(item => item.sku).filter(Boolean))
  }, [quenchItems])
 
  const startQuenchables = useCallback((collection = quenchCollection) => {
    setQuenchCollection(collection)
    setQuenchStep('collection')
    setQuenchOpen(true)
  }, [quenchCollection])
 
  const addQuenchItem = useCallback((product) => {
    const colors = getQuenchColors(product)
    if (!colors.length) return
    const selectedSku = quenchColor[product.id] || colors[0].sku
    const selectedColor = colors.find(c => c.sku === selectedSku) || colors[0]
    const packs = Math.max(1, Number(quenchQty[product.id] || 1))
    const packing = Number(product.packing || 1)
    const units = packs * packing
 
    setQuenchItems(items => {
      const alreadySelected = items.some(item => item.sku === selectedColor.sku)
      if (alreadySelected) return items
      return [
        ...items,
        {
          id: `${product.id}-${selectedColor.sku}-${Date.now()}`,
          productId: product.id,
          productName: product.name,
          colorName: selectedColor.name,
          colorCode: selectedColor.code,
          sku: selectedColor.sku,
          packs,
          packing,
          units,
          srp: Number(product.srp || 0),
        }
      ]
    })
    setQuenchStep('review')
  }, [getQuenchColors, quenchColor, quenchQty])
 
  const removeQuenchItem = useCallback((id) => {
    setQuenchItems(items => items.filter(item => item.id !== id))
  }, [])
 
  const buildQuenchablesHref = useCallback(() => {
    const collectionLabel = quenchCollectionMeta.label || quenchCollection
    const subject = `Quenchables Inquiry - ${collectionLabel} Set`
    const lines = [
      'Hi Quencha Team,',
      '',
      'I would like to inquire about this Quenchables set:',
      '',
      `Collection: ${collectionLabel}`,
      '',
      'Items:',
      ...quenchItems.flatMap((item, index) => [
        `${index + 1}. ${item.productName}`,
        `   Color: ${item.colorName}`,
        `   SKU: ${item.sku}`,
        `   Packs/Cartons: ${item.packs}`,
        `   Packing: ${item.packing} pcs/carton`,
        `   Estimated Units: ${item.units} pcs`,
        `   SRP: ₱${Number(item.srp || 0).toLocaleString('en-PH', { minimumFractionDigits: 2 })}`,
        '',
      ]),
      `Total Packs/Cartons: ${quenchTotals.totalPacks}`,
      `Estimated Total Units: ${quenchTotals.totalUnits} pcs`,
      `Estimated SRP Total: ₱${quenchTotals.totalSrp.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`,
      '',
      quenchMessage ? `Notes: ${quenchMessage}` : 'Notes:',
      '',
      'Thank you.'
    ]
    return `mailto:design@sunbeamsimpexinc.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
  }, [quenchCollection, quenchCollectionMeta, quenchItems, quenchMessage, quenchTotals])
 
  // ── FILTERED ──
  const filtered = useMemo(() => {
    let list = products.map((p, index) => ({
      ...p,
      __manualIndex: Number.isFinite(Number(p.sortOrder)) ? Number(p.sortOrder) : index
    }))
    if (filterExt !== 'all') list = list.filter(p => p.ext === filterExt)
    if (filterCat) list = list.filter(p => p.cat === filterCat)
    if (filterColorCollection !== 'all') {
      list = list.filter(p => (p.colors || []).some(c => defaultColorCollection(c) === filterColorCollection))
    }
    if (filterPMin !== null) list = list.filter(p => p.srp >= filterPMin)
    if (filterPMax !== null) list = list.filter(p => p.srp <= filterPMax)
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.colors.some(c => c.sku.toLowerCase().includes(q)))
    }
    if (sort === 'default') list.sort((a,b) => a.__manualIndex - b.__manualIndex)
    if (sort === 'price-asc') list.sort((a,b) => a.srp - b.srp)
    if (sort === 'price-desc') list.sort((a,b) => b.srp - a.srp)
    if (sort === 'name-asc') list.sort((a,b) => a.name.localeCompare(b.name))
    if (sort === 'sku-asc') list.sort((a,b) => getFirstSku(a).localeCompare(getFirstSku(b)))
    if (sort === 'sku-desc') list.sort((a,b) => getFirstSku(b).localeCompare(getFirstSku(a)))
    return list
  }, [products, filterExt, filterCat, filterColorCollection, filterPMin, filterPMax, search, sort, getFirstSku])
 
  const counts = useMemo(() => {
    const ext = { all: products.length }, cat = {}, collection = { all: products.length }
    products.forEach(p => {
      ext[p.ext] = (ext[p.ext]||0)+1
      cat[p.cat] = (cat[p.cat]||0)+1
 
      const productCollections = new Set((p.colors || []).map(c => defaultColorCollection(c)).filter(Boolean))
      productCollections.forEach(col => {
        collection[col] = (collection[col] || 0) + 1
      })
    })
    return { ext, cat, collection }
  }, [products])
 
  const grouped = useMemo(() => {
    const g = {}
    filtered.forEach(p => { if(!g[p.ext])g[p.ext]={}; if(!g[p.ext][p.cat])g[p.ext][p.cat]=[]; g[p.ext][p.cat].push(p) })
    return g
  }, [filtered])
 
  // ── SIDEBAR ──
  const SidebarContent = ({ closeOnSelect = false } = {}) => {
    const closeMobileSidebar = () => {
      if (!closeOnSelect) return
      setShowMobileFilter(false)
      window.setTimeout(() => {
        focusSearchResults()
      }, 180)
    }
    return (
    <>
      <div className="sb-hero">
        <div className="sb-hl">Catalog</div>
        <div className="sb-total">{products.length}</div>
        <div className="sb-sub">products</div>
      </div>
      <div className="sb-sec">
        <span className="sb-lbl">Extension</span>
        <button className={`fb ${filterExt==='all'?'on':''}`} style={{borderLeftColor:filterExt==='all'?'var(--cy)':'transparent'}} onClick={()=>{setFilterExt('all'); closeMobileSidebar()}}>
          <span className="fb-dot" style={{background:'var(--cy)'}}/><span className="fb-lbl">All Products</span><span className="fb-cnt">{counts.ext['all']||0}</span>
        </button>
        {exts.map(o=>(
          <button key={o.value} className={`fb ${filterExt===o.value?'on':''}`} style={{borderLeftColor:filterExt===o.value?o.color:'transparent'}} onClick={()=>{setFilterExt(o.value); closeMobileSidebar()}}>
            <span className="fb-dot" style={{background:o.color}}/><span className="fb-lbl">{o.label}</span><span className="fb-cnt">{counts.ext[o.value]||0}</span>
          </button>
        ))}
        {editMode && <button className="fb" style={{borderLeftColor:'transparent',opacity:.7}} onClick={()=>{setExtMgrOpen(true); closeMobileSidebar()}}><span className="fb-ico">⚙️</span><span className="fb-lbl">Manage Extensions</span></button>}
      </div>
      <hr className="sb-div"/>
      <div className="sb-sec">
        <span className="sb-lbl">Category Filter</span>
        <div className="filter-pill-wrap">
          <button className={`filter-pill full ${!filterCat?'on':''}`} onClick={()=>{setFilterCat(null); closeMobileSidebar()}}>
            <span className="filter-pill-l"><span className="filter-pill-label">All Categories</span></span>
            <span className="filter-pill-count">{products.length}</span>
          </button>
          {cats.filter(c=>['sip','savor','go'].includes(c.value)).map(c=>(
            <button key={c.value} className={`filter-pill ${filterCat===c.value?'on':''}`} onClick={()=>{setFilterCat(filterCat===c.value?null:c.value); closeMobileSidebar()}}>
              <span className="filter-pill-l"><span className="filter-pill-label">{{sip:'SIP',savor:'SAVOR',go:'GO'}[c.value] || c.label}</span></span>
              <span className="filter-pill-count">{counts.cat[c.value]||0}</span>
            </button>
          ))}
          {editMode && <button className="filter-pill manage-pill" onClick={()=>{setCatMgrOpen(true); closeMobileSidebar()}}><span>Manage Categories</span></button>}
        </div>
      </div>
      <hr className="sb-div"/>
      <div className="sb-sec">
        <span className="sb-lbl">Color Collection Filter</span>
        <div className="filter-pill-wrap">
          <button className={`filter-pill full ${filterColorCollection==='all'?'on':''}`} onClick={()=>{setFilterColorCollection('all'); closeMobileSidebar()}}>
            <span className="filter-pill-l"><span className="filter-pill-dot" style={{background:'var(--cy)'}}/><span className="filter-pill-label">All Collections</span></span>
            <span className="filter-pill-count">{counts.collection?.all||0}</span>
          </button>
          {colorCollections.map(col=>(
            <button key={col.value} className={`filter-pill ${filterColorCollection===col.value?'on':''}`} onClick={()=>{setFilterColorCollection(filterColorCollection===col.value?'all':col.value); closeMobileSidebar()}}>
              <span className="filter-pill-l"><span className="filter-pill-dot" style={{background:col.color||'var(--tl)'}}/><span className="filter-pill-label">{col.label}</span></span>
              <span className="filter-pill-count">{counts.collection?.[col.value]||0}</span>
            </button>
          ))}
        </div>
      </div>
      <hr className="sb-div"/>
      <div className="sb-sec">
        <span className="sb-lbl">Price Range</span>
        <div className="pc-wrap">
          {[{l:'Under ₱299',mn:0,mx:299},{l:'₱300–799',mn:300,mx:799},{l:'₱800–1,299',mn:800,mx:1299},{l:'₱1,300+',mn:1300,mx:99999}].map(o=>{
            const on = filterPMin===o.mn && filterPMax===o.mx
            return <button key={o.l} className={`pc ${on?'on':''}`} onClick={()=>{ if(on){setFilterPMin(null);setFilterPMax(null)}else{setFilterPMin(o.mn);setFilterPMax(o.mx)} closeMobileSidebar() }}>{o.l}</button>
          })}
        </div>
      </div>
      {(filterExt!=='all'||filterCat||filterColorCollection!=='all'||filterPMin!==null) && (
        <button className="clear-filters" onClick={()=>{setFilterExt('all');setFilterCat(null);setFilterColorCollection('all');setFilterPMin(null);setFilterPMax(null); closeMobileSidebar()}}>✕ Clear filters</button>
      )}
    </>
    )
  }
 
  // ── PRODUCT CARD ──
  const Card = ({ p }) => {
    const mainImg = getImageSrc(p.images?.[0])
    const colors = p.colors.slice(0, 6)
    const extra = p.colors.length > 6 ? p.colors.length - 6 : 0
    const extEntry = exts.find(x=>x.value===p.ext)
    const extColor = extEntry?.color || EXT_COLORS[p.ext] || 'var(--gr)'
    const showExtTag = !!p.ext && p.ext !== 'core'
    return (
      <div
        ref={el => { if (el) productCardRefs.current[p.id] = el; else delete productCardRefs.current[p.id] }}
        className={`pcard ${editMode?'em':''} ${dragProductId===p.id?'dragging':''}`}
        draggable={editMode && sort === 'default'}
        onDragStart={editMode && sort === 'default' ? (e) => {
          setDragProductId(p.id)
          e.dataTransfer.effectAllowed = 'move'
          e.dataTransfer.setData('text/plain', p.id)
        } : undefined}
        onDragOver={editMode && sort === 'default' ? (e) => {
          e.preventDefault()
          e.dataTransfer.dropEffect = 'move'
        } : undefined}
        onDrop={editMode && sort === 'default' ? (e) => {
          e.preventDefault()
          const fromId = e.dataTransfer.getData('text/plain') || dragProductId
          moveProductOrder(fromId, p.id)
          setDragProductId(null)
        } : undefined}
        onDragEnd={() => setDragProductId(null)}
        onClick={editMode ? undefined : () => openProductModal(p)}
      >
        {editMode && sort === 'default' && <span className="c-drag-handle" title="Drag to rearrange">↕ Drag</span>}
 
        <div className="c-img-wrap">
          {showExtTag && <span className="c-etag" style={{background:extColor}}>{extEntry?.label||p.ext}</span>}
          {mainImg ? <img src={mainImg} alt={p.name}/> : <span className="c-img-ph">📦</span>}
        </div>
 
        <div className="c-body">
          <div className="c-name">{p.name}</div>
          {getSkuBase(p) && (
            <span className="c-sku copyable" onClick={e=>{e.stopPropagation();copy(getSkuBase(p))}} title="Click to copy SKU">
              {copied===getSkuBase(p) ? '✓ Copied!' : getSkuBase(p)}
            </span>
          )}
          <div className="c-desc">{p.desc}</div>
          <div className="c-badges">{p.badges.slice(0,3).map(b=><span key={b} className="c-badge">{b}</span>)}</div>
          <div className="c-colors">
            {colors.map(c=><span key={c.code} className="c-dot" style={{background:swatchBackground(c)}} title={getColorHexes(c).length > 1 ? `${c.name} (${getColorHexes(c).length} colors)` : c.name}/>) }
            {extra > 0 && <span className="c-more">+{extra}</span>}
          </div>
          {/* Footer: SRP and Packing same font/size */}
          <div className="c-foot">
            <div className="c-stats">
              <div className="c-stat">
                <div className="c-stat-val">₱{p.srp.toLocaleString('en-PH',{minimumFractionDigits:2})}</div>
                <div className="c-stat-lbl">SRP</div>
              </div>
              <div className="c-stat-divider"/>
              <div className="c-stat">
                <div className="c-stat-val">{p.packing}</div>
                <div className="c-stat-lbl">Pack</div>
              </div>
            </div>
          </div>
 
        </div>
      </div>
    )
  }
 
  // ── RENDER ──
  const vp = viewProduct ? { youtube: '', ...(products.find(p => p.id === viewProduct.id) || viewProduct) } : null
  const vpImages = vp ? normalizeProductImages(vp.images || []) : []
  const generalVmImages = vpImages.filter(isGeneralImage)
  const activeVmColor = vp && vmColorKey
    ? (vp.colors || []).find(color => getColorKey(color) === vmColorKey)
    : null
  const activeVmColorKey = activeVmColor ? getColorKey(activeVmColor) : ''
  const filteredVmImages = activeVmColor ? vpImages.filter(img => imageMatchesColor(img, activeVmColor)) : []
  const visibleVmImages = activeVmColor ? filteredVmImages : generalVmImages
  const safeVmImg = visibleVmImages.length ? Math.min(vmImg, visibleVmImages.length - 1) : 0
  return (
    <div>
      {/* TOPBAR */}
      <header className={`qnh-topbar ${editMode?'edit-on':''}`}>
        <button className="tb-menu-btn" onClick={()=>setShowMobileFilter(true)} title="Open filters">☰</button>
        <a
          className="tb-brand"
          href="#"
          onClick={(e)=>{ if(editMode){ e.preventDefault(); setBrandEditOpen(true) } }}
          title={editMode ? 'Edit brand logo and topbar text' : (brandName || brandTagline || 'Brand')}
        >
          {brandLogo ? <img className="tb-logo" src={brandLogo} alt={brandName || 'Brand logo'}/> : (editMode ? <span className="tb-logo-placeholder">+</span> : null)}
          {brandName?.trim() && <span className="tb-wm">{brandName}</span>}
          {brandTagline?.trim() && <span className="tb-tg">{brandTagline}</span>}
          {editMode && <span className="tb-brand-edit">Edit</span>}
        </a>
        <div className="tb-search-wrap">
          <input
            ref={searchInputRef}
            className="tb-search"
            value={search}
            onChange={e=>setSearch(e.target.value)}
            onKeyDown={e=>{ if(e.key==='Enter') runSearch() }}
            placeholder="Search products, SKUs…"
          />
          {search && <button className="tb-clear" onClick={()=>{setSearch(''); searchInputRef.current?.focus()}} title="Clear search">✕</button>}
          <button className="tb-search-btn" onClick={runSearch} title="Search and go to results" aria-label="Search and go to results">
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.4"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </button>
        </div>
        <div className="tb-actions">
          {/* Edit mode — secondary, subtle */}
          <button className={`tb-edit-btn ${editMode?'on':''}`} onClick={editMode ? exitEdit : ()=>requestAuth('topbar')} title={editMode ? 'Save & Exit' : 'Edit Mode'}>
            {editMode ? <span style={{fontSize:14,fontWeight:900,lineHeight:1}}>✕</span> : <PencilIcon/>}
            <span className="tb-edit-tooltip">{editMode ? 'Save & Exit' : 'Edit Mode'}</span>
          </button>
        </div>
      </header>
 
      {/* LAYOUT */}
      <div className="qnh-layout">
        <aside className="qnh-sidebar"><SidebarContent/></aside>
        <main className="qnh-main">
 
          {/* Hero Carousel */}
          <HeroCarousel
            banners={banners}
            aspect={bannerAspect}
            interval={bannerInterval}
            editMode={editMode}
            onEditClick={()=>setBannerEditOpen(true)}
            heroTitle={heroTitle}
            heroSub={heroSub}
            onTitleChange={saveHeroTitle}
            onSubChange={saveHeroSub}
            heroVideoUrl={heroVideoUrl}
            heroVideoThumbnail={heroVideoThumbnail}
            mediaOrder={heroMediaOrder}
            onBannerClick={(link)=>{
              if(!link) return
              if(link.startsWith('http')){window.open(link,'_blank');return}
              // internal: #sip, #savor, #go, #accessories, or product id
              const el=document.getElementById(link.replace('#',''))
              if(el){el.scrollIntoView({behavior:'smooth'})}
              else{
                const cat=link.replace('#','')
                const cats=['sip','savor','go','accessories']
                if(cats.some(c=>c.value===cat)){setFilterCat(cat)}
              }
            }}
          />
 
 
 
          {/* Quenchables Builder Entry */}
          <section className="quench-hero">
            <div>
              <div className="quench-eyebrow">Shop the Set</div>
              <h2 className="quench-title">Build Your Quenchables</h2>
              <p className="quench-sub">Mix, match, and create your Quencha combo by collection. Choose your tumbler, lunch essentials, bags, and accessories in one set.</p>
              <div className="quench-actions">
                <button className="quench-start" onClick={()=>startQuenchables('Horizon')}>Start Building →</button>
                <div className="quench-mini-collections">
                  {colorCollections.map(col => (
                    <button key={col.value} className="quench-chip" onClick={()=>startQuenchables(col.value)}>{col.label}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="quench-visual" aria-hidden="true">
              {(colorCollectionSets?.Horizon || DEFAULT_COLOR_COLLECTION_SETS.Horizon).slice(0,4).map(c => (
                <span key={c.code} className="quench-visual-dot" style={{background:swatchBackground(c)}} />
              ))}
            </div>
          </section>
 
          {/* Toolbar */}
          <div className="toolbar" ref={resultsRef}>
            <span className="res-label">Showing <strong>{filtered.length}</strong>{filtered.length!==products.length?` of ${products.length}`:''} products</span>
            <select className="sort-sel" value={sort} onChange={e=>saveCatalogSort(e.target.value)}>
              <option value="default">Sort: Manual Order</option>
              <option value="sku-asc">SKU: A → Z</option>
              <option value="sku-desc">SKU: Z → A</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="name-asc">Name: A → Z</option>
            </select>
            {editMode && sort === 'default' && <span className="reorder-hint">Drag products to rearrange</span>}
            <div className="vbtns">
              <button className={`vbtn ${view==='col-4'?'on':''}`} onClick={()=>saveCatalogView('col-4')} title="4 columns">⊞</button>
              <button className={`vbtn ${view==='col-2'?'on':''}`} onClick={()=>saveCatalogView('col-2')} title="2 columns">⊟</button>
              <button className={`vbtn ${view==='col-1'?'on':''}`} onClick={()=>saveCatalogView('col-1')} title="1 column">▬</button>
            </div>
          </div>
 
          {/* Products */}
          {(() => {
            // Build render order: no-ext bucket first, then known exts, then any unknown ext keys
            const knownExtVals = exts.map(x=>x.value)
            const allExtKeys = Object.keys(grouped)
            const noExtProds = grouped[''] || {}
            const unknownExtKeys = allExtKeys.filter(k => k !== '' && !knownExtVals.includes(k))
            const orderedExtKeys = [...knownExtVals, ...unknownExtKeys]
 
            // All cat values to iterate (known cats + '' for no-cat + any unknown cat keys)
            const knownCatVals = cats.map(c=>c.value)
            const allCatKeysInGrouped = [...new Set(Object.values(grouped).flatMap(g=>Object.keys(g)))]
            const unknownCatKeys = allCatKeysInGrouped.filter(k => k !== '' && !knownCatVals.includes(k))
            const orderedCatKeys = ['', ...knownCatVals, ...unknownCatKeys]
 
            const renderSection = (ext, cat, prods) => {
              if (!prods?.length) return null
              const catLabel = cat === '' ? null : (cats.find(c=>c.value===cat)?.label || cat)
              const extEntry = exts.find(x=>x.value===ext)
              const extLabel = ext === '' ? null : (extEntry?.label || ext)
              const extColor = extEntry?.color || EXT_COLORS[ext] || 'var(--gr)'
              return (
                <div key={`${ext||'none'}-${cat||'none'}`}>
                  <div className="cat-hdr">
                    <div className="cat-line"/>
                    {catLabel && <span className="cat-nm">{catLabel}</span>}
                    {extLabel && <span className="ext-tag" style={{background:extColor}}>{extLabel}</span>}
                    <span className="cat-cnt">{prods.length} item{prods.length>1?'s':''}</span>
                    <div className="cat-line"/>
                  </div>
                  <div className={`pgrid ${view}`}>
                    {prods.map(p => <Card key={p.id} p={p}/>)}
                  </div>
                </div>
              )
            }
 
            return (
              <>
                {/* No-ext products first */}
                {orderedCatKeys.map(cat => renderSection('', cat, noExtProds[cat]))}
                {/* Known + unknown ext products */}
                {orderedExtKeys.map(ext => !grouped[ext] ? null :
                  orderedCatKeys.map(cat => renderSection(ext, cat, grouped[ext][cat]))
                )}
              </>
            )
          })()}
        </main>
      </div>
 
      {/* MOBILE FILTER */}
      <button className="mob-filter-btn" onClick={()=>setShowMobileFilter(true)}>☰ Filters</button>
      {showMobileFilter && (
        <div className="mob-overlay" onClick={()=>setShowMobileFilter(false)}>
          <div className="mob-drawer" onClick={e=>e.stopPropagation()}>
            <button className="drawer-close" onClick={()=>setShowMobileFilter(false)}>✕</button>
            <SidebarContent closeOnSelect/>
          </div>
        </div>
      )}
 
 
 
      {/* QUENCHABLES BUILDER MODAL */}
      {quenchOpen && (
        <div className="modal-bg" onClick={e=>{if(e.target===e.currentTarget)setQuenchOpen(false)}}>
          <div className="modal quench-modal">
            <div className="m-hdr quench-head">
              <div>
                <div className="quench-eyebrow">Quenchables</div>
                <div style={{fontSize:22,fontWeight:900,color:'var(--tl)',lineHeight:1.15}}>Build Your Quencha Combo</div>
                <div className="quench-progress">
                  {[['collection','Collection'],['products','Products'],['review','Review'],['inquiry','Inquiry']].map(([key,label], index)=>{
                    const disabled = key === 'inquiry' && !quenchItems.length
                    return (
                      <button type="button" key={key} disabled={disabled} onClick={()=>{ if(!disabled) setQuenchStep(key) }} className={`quench-step ${quenchStep===key?'on':''}`} aria-label={`Go to ${label} step`}>
                        <span className="quench-step-dot">{index+1}</span>{label}
                      </button>
                    )
                  })}
                </div>
                {quenchStep !== 'collection' && (
                  <button type="button" className="quench-back" onClick={()=>setQuenchStep(quenchStep==='inquiry'?'review':quenchStep==='review'?'products':'collection')}>← Back</button>
                )}
              </div>
              <button className="m-close" onClick={()=>setQuenchOpen(false)}>✕</button>
            </div>
            <div className="m-body">
              <div className={`quench-body ${['review','inquiry'].includes(quenchStep) ? 'no-side' : ''}`}>
                <aside className="quench-side">
                  <div className="quench-side-title">Choose Collection</div>
                  {colorCollections.map(col => {
                    const setCount = (colorCollectionSets?.[col.value] || []).length
                    return (
                      <button key={col.value} className={`quench-collection-btn ${quenchCollection===col.value?'on':''}`} onClick={()=>{setQuenchCollection(col.value);setQuenchStep('collection')}}>
                        <span className="quench-collection-dot" style={{background:col.color}} />
                        <span>
                          <span className="quench-collection-name">{col.label}</span>
                          <span className="quench-collection-sub">{setCount} color{setCount===1?'':'s'} available</span>
                        </span>
                      </button>
                    )
                  })}
                  <div className="quench-set">
                    <div className="quench-set-title">Your Set</div>
                    {quenchItems.length ? quenchItems.slice(0,3).map(item=>(
                      <div key={item.id} className="quench-set-item">
                        <div>
                          <div className="quench-set-name">{item.productName}</div>
                          <div className="quench-set-meta">{item.colorName} · {item.packs} pack{item.packs===1?'':'s'} · {item.units} pcs</div>
                        </div>
                      </div>
                    )) : <div className="quench-empty">No items added yet.</div>}
                    {quenchItems.length > 3 && <div className="quench-set-meta">+ {quenchItems.length - 3} more item{quenchItems.length - 3 === 1 ? '' : 's'}</div>}
                  </div>
                </aside>
                <div className="quench-main">
                  {quenchStep === 'collection' && (
                    <>
                      <div className="quench-feature-card">
                        <div>
                          <div className="quench-feature-title">{quenchCollectionMeta.label} Collection</div>
                          <div className="quench-feature-sub">Start with a collection vibe, then build a matching set across drinkware, lunch, bags, and accessories.</div>
                          <div className="quench-color-row">
                            {quenchAvailableColors.map(color=><span key={color.code} className="quench-color-dot" title={color.name} style={{background:swatchBackground(color)}} />)}
                          </div>
                        </div>
                        <button className="quench-next" onClick={()=>setQuenchStep('products')}>Next: Choose Products →</button>
                      </div>
                    </>
                  )}
                  {quenchStep === 'products' && (
                    <>
                      <div className="quench-tabs">
                        {cats.map(cat=>(
                          <button key={cat.value} className={`quench-tab ${quenchCat===cat.value?'on':''}`} onClick={()=>setQuenchCat(cat.value)}>{cat.icon} {cat.label}</button>
                        ))}
                      </div>
                      {quenchProductsByCat.length ? (
                        <div className="quench-product-grid">
                          {quenchProductsByCat.map(product => {
                            const colors = getQuenchColors(product)
                            const selectedSku = quenchColor[product.id] || colors[0]?.sku || ''
                            const selectedColor = colors.find(c=>c.sku===selectedSku) || colors[0]
                            const qty = Math.max(1, Number(quenchQty[product.id] || 1))
                            const mainImg = getImageSrc(normalizeProductImages(product.images || [])[0])
                            const alreadyInSet = selectedQuenchSkuSet.has(selectedSku)
                            return (
                              <div key={product.id} className={`quench-product ${alreadyInSet ? 'already-selected' : ''}`}>
                                <div className="quench-prod-top">
                                  {mainImg ? <img className="quench-prod-img" src={mainImg} alt=""/> : <div className="quench-prod-img"/>}
                                  <div>
                                    <div className="quench-prod-name">{product.name}</div>
                                    <div className="quench-prod-meta">₱{Number(product.srp || 0).toLocaleString('en-PH',{minimumFractionDigits:2})} · {product.packing} pcs/pack</div>
                                  </div>
                                </div>
                                <div className="quench-form-row">
                                  <select className="quench-select" value={selectedSku} onChange={e=>setQuenchColor(prev=>({...prev,[product.id]:e.target.value}))}>
                                    {colors.map(color=><option key={color.sku} value={color.sku}>{color.name} · {color.sku}</option>)}
                                  </select>
                                  <input className="quench-input" type="number" min="1" value={qty} onChange={e=>setQuenchQty(prev=>({...prev,[product.id]:e.target.value}))} />
                                </div>
                                <div className="quench-set-meta">Selected: {selectedColor?.name} · Estimated units: {qty * Number(product.packing || 1)} pcs</div>
                                {alreadyInSet && <div className="quench-selected-pill">✓ Already in set</div>}
                                <button className="quench-add" disabled={alreadyInSet} onClick={()=>addQuenchItem(product)}>{alreadyInSet ? 'Already Selected' : 'Add to Quenchables'}</button>
                              </div>
                            )
                          })}
                        </div>
                      ) : <div className="quench-empty">No products in this category have {quenchCollectionMeta.label} colors yet.</div>}
                      <button className="quench-next" onClick={()=>setQuenchStep('review')}>Review Set →</button>
                    </>
                  )}
                  {quenchStep === 'review' && (
                    <>
                      <div className="quench-set">
                        <div className="quench-set-title">Your Quenchables Set</div>
                        {quenchItems.length ? quenchItems.map(item=>(
                          <div key={item.id} className="quench-set-item">
                            <div>
                              <div className="quench-set-name">{item.productName}</div>
                              <div className="quench-set-meta">Color: {item.colorName}<br/>SKU: {item.sku}<br/>Packs/Cartons: {item.packs} · Packing: {item.packing} pcs · Units: {item.units} pcs</div>
                            </div>
                            <button className="quench-remove" onClick={()=>removeQuenchItem(item.id)}>Remove</button>
                          </div>
                        )) : <div className="quench-empty">Add products first to build your Quenchables set.</div>}
                      </div>
                      <div className="quench-summary">
                        <div className="quench-total"><div className="quench-total-val">{quenchItems.length}</div><div className="quench-total-lbl">Items</div></div>
                        <div className="quench-total"><div className="quench-total-val">{quenchTotals.totalPacks}</div><div className="quench-total-lbl">Packs</div></div>
                        <div className="quench-total"><div className="quench-total-val">{quenchTotals.totalUnits}</div><div className="quench-total-lbl">Units</div></div>
                      </div>
                      <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                        <button className="quench-tab" onClick={()=>setQuenchStep('products')}>+ Add More Products</button>
                        <button className="quench-next" disabled={!quenchItems.length} onClick={()=>setQuenchStep('inquiry')}>Continue to Inquiry →</button>
                      </div>
                    </>
                  )}
                  {quenchStep === 'inquiry' && (
                    <>
                      <div className="quench-feature-card">
                        <div>
                          <div className="quench-feature-title">Send Quenchables Inquiry</div>
                          <div className="quench-feature-sub">Your email app will open with your selected Quenchables set, SKUs, quantities, packing, and notes.</div>
                        </div>
                      </div>
                      <textarea className="quench-note" value={quenchMessage} onChange={e=>setQuenchMessage(e.target.value)} placeholder="Add notes, target colors, delivery questions, or customer details…" />
                      <a className="quench-send" href={buildQuenchablesHref()} onClick={e=>{ if(!quenchItems.length) e.preventDefault() }}>📩 Send Quenchables Inquiry</a>
                      <button className="quench-tab" onClick={()=>setQuenchStep('review')}>← Back to Review</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
 
      {/* PASSWORD MODAL */}
      {pwOpen && (
        <div className="modal-bg" onClick={e=>{if(e.target===e.currentTarget)setPwOpen(false)}}>
          <div className="pw-modal">
            <div className="pw-hdr">
              <div className="pw-icon">🔐</div>
              <div className="pw-title">Edit Access</div>
              <div className="pw-sub">Enter password to unlock editing</div>
            </div>
            <div className="pw-body">
              <label className="pw-lbl">Password</label>
              <div className="pw-wrap">
                <input
                  ref={pwRef}
                  type={pwShow ? 'text' : 'password'}
                  className={`pw-in ${pwError ? 'err' : ''}`}
                  value={pwValue}
                  onChange={e => { setPwValue(e.target.value); setPwError('') }}
                  onKeyDown={e => e.key === 'Enter' && submitPassword()}
                  placeholder="Enter password…"
                  autoComplete="off"
                />
                <button className="pw-eye" onClick={()=>setPwShow(s=>!s)}>{pwShow ? '🙈' : '👁'}</button>
              </div>
              <div className="pw-err">{pwError && <><span>⚠️</span>{pwError}</>}</div>
              <button className="pw-submit" onClick={submitPassword}>Unlock Editing</button>
              <button className="pw-cancel" onClick={()=>setPwOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
 
      {/* VIEW MODAL */}
      {vp && (
        <div className="modal-bg" onClick={e=>{if(e.target===e.currentTarget)closeProductModal()}}>
          <div className="modal">
            <div className="m-hdr" style={{background:'var(--sf4)'}}>
              <div>
                {(() => {
                  const extLabel = exts.find(x=>x.value===vp.ext)?.label || vp.ext || ''
                  const catLabel = cats.find(c=>c.value===vp.cat)?.label || vp.cat || ''
                  const parts = [extLabel, catLabel].filter(Boolean)
                  return parts.length > 0 ? (
                    <div style={{fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'var(--tl)',textTransform:'uppercase',marginBottom:4,opacity:.7}}>{parts.join(' · ')}</div>
                  ) : null
                })()}
                <div style={{fontSize:22,fontWeight:900,color:'var(--tl)',lineHeight:1.2}}>{vp.name}</div>
                {getSkuBase(vp) && (
                  <code
                    onClick={()=>copy(getSkuBase(vp))}
                    style={{fontSize:11,fontWeight:700,fontFamily:'monospace',background:'rgba(39,153,137,.1)',color:'var(--tl)',borderRadius:4,padding:'2px 8px',marginTop:5,display:'inline-block',letterSpacing:'.04em',cursor:'pointer',transition:'background .15s'}}
                    title="Click to copy SKU"
                  >
                    {copied===getSkuBase(vp) ? '✓ Copied!' : getSkuBase(vp)}
                  </code>
                )}
              </div>
              <button className="m-close" onClick={closeProductModal}>✕</button>
            </div>
            <div className="m-body">
              <div>
                <div className="vm-main-wrap" ref={vmImageRef}>
                  {visibleVmImages.length > 0 ? <img src={getImageSrc(visibleVmImages[safeVmImg])} alt={vp.name}/> : <span className="vm-main-ph">📦</span>}
                </div>
                {visibleVmImages.length > 1 && (
                  <div className="vm-thumbs">
                    {visibleVmImages.map((img,i) => (
                      <div key={`${getImageSrc(img)}-${i}`} className={`vm-thumb ${i===safeVmImg?'on':''}`} onClick={()=>setVmImg(i)}>
                        <img src={getImageSrc(img)} alt=""/>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Color swatches + SKUs */}
              {vp.colors.length > 0 && (
                <div>
                  <span className="vm-color-sec-lbl">Colors</span>
                  {groupColorsByCollection(vp.colors, colorCollections).map(group=>(
                    <div key={group.name} style={{marginBottom:10}}>
                      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:7}}>
                        <span style={{fontSize:9,fontWeight:800,letterSpacing:'.14em',textTransform:'uppercase',color:group.color||'var(--gr)',background:`${group.color||'#63666A'}18`,border:`1px solid ${group.color||'#63666A'}33`,padding:'2px 8px',borderRadius:999}}>{group.name}</span>
                        <div style={{flex:1,height:1,background:'rgba(185,220,210,.3)'}}/>
                      </div>
                      <div className="vm-color-grid">
                        {group.colors.map(clr=>{
                          const linkedImageIndexes = findImageIndexesForColor(vp, clr)
                          const hasLinkedImage = linkedImageIndexes.length > 0
                          const colorKey = getColorKey(clr)
                          const isActive = activeVmColorKey === colorKey
                          return (
                            <div
                              key={clr.sku}
                              className={`vm-color-item ${isActive?'color-active':''} ${copied===clr.sku?'sku-copied':''}`}
                              onClick={()=>{
                                if (!hasLinkedImage) return
                                setVmColorKey(isActive ? '' : colorKey)
                                setVmImg(0)
                                if (typeof window !== 'undefined' && window.innerWidth <= 700) {
                                  setTimeout(() => vmImageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40)
                                }
                              }}
                              title={hasLinkedImage ? `Show images for ${clr.name}` : clr.name}
                            >
                              <span className="vm-color-swatch" style={{background:swatchBackground(clr)}}/>
                              <div className="vm-color-info">
                                <span className="vm-color-name">{clr.name}</span>
                                <span className="vm-color-sku copyable" onClick={(e)=>{e.stopPropagation();copy(clr.sku)}}>{copied===clr.sku ? '✓ Copied!' : clr.sku}</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {vp.youtube && getYouTubeId(vp.youtube) && (
                <YouTubeBlock ytUrl={vp.youtube}/>
              )}
              <div className="vm-badges">{vp.badges.map(b=><span key={b} className="vm-badge">{b}</span>)}</div>
              <p className="vm-desc">{vp.desc}</p>
              <div className="vm-price-row vm-price-row-under-desc">
                <div><div className="vm-plbl">SRP</div><div className="vm-pval">₱{vp.srp.toLocaleString('en-PH',{minimumFractionDigits:2})}</div></div>
                <div className="vm-pdiv"/>
                <div><div className="vm-plbl">Packing</div><div className="vm-pval">{vp.packing} pcs</div></div>
              </div>
              {vp.colors?.length > 0 && (
                <div className="vm-variant-table-card">
                  <span className="vm-meta-lbl" style={{marginBottom:8,display:'block'}}>Color SKU / Barcode</span>
                  <div className="vm-variant-table-wrap">
                    <table className="vm-variant-table">
                      <thead>
                        <tr>
                          <th>Color</th>
                          <th>Product Code</th>
                          <th>Barcode</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vp.colors.map((clr, idx) => {
                          const variantBarcode = clr.barcode || clr.barcodeValue || vp.barcode || ''
                          const variantBarcodeImage = clr.barcodeImage || clr.barcodeUrl || vp.barcodeImage || ''
                          return (
                            <tr key={`${clr.sku || clr.code || clr.name}-${idx}`}>
                              <td>
                                <div className="vm-variant-color">
                                  <span className="vm-variant-swatch" style={{background:swatchBackground(clr)}}/>
                                  <span>{clr.name || clr.code || 'Color'}</span>
                                </div>
                              </td>
                              <td>
                                <code className="vm-variant-sku copyable" onClick={()=>copy(clr.sku || '')}>
                                  {copied===(clr.sku || '') ? '✓ Copied!' : (clr.sku || '—')}
                                </code>
                              </td>
                              <td>
                                <div className="vm-variant-barcode">
                                  {variantBarcodeImage ? (
                                    <img
                                      src={variantBarcodeImage}
                                      alt={`${clr.name || 'Color'} barcode`}
                                      onClick={()=>setCodeLightbox({src:variantBarcodeImage,label:`${clr.name || 'Color'} Barcode`})}
                                      title="Click to enlarge"
                                    />
                                  ) : variantBarcode ? (
                                    <code>{variantBarcode}</code>
                                  ) : (
                                    <span style={{color:'rgba(99,102,106,.55)',fontWeight:700}}>—</span>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {(vp.dimensions || vp.barcode) && (
                <div className="vm-meta-row">
                  {vp.dimensions && typeof vp.dimensions==='object' &&
                    vp.dimensions.rows?.some(r=>r.some(c=>c.trim())) && (
                    <div className="vm-meta-item vm-dimensions-card" style={{flex:'1 1 100%'}}>
                      <span className="vm-meta-lbl" style={{marginBottom:8,display:'block'}}>Dimensions</span>
                      <div className="vm-dim-table-wrap">
                        <table className="vm-dim-table">
                          {vp.dimensions.headers.some(h=>h.trim()) && (
                            <thead>
                              <tr>
                                {vp.dimensions.headers.map((h,i)=>(
                                  <th key={i}>{h||'—'}</th>
                                ))}
                              </tr>
                            </thead>
                          )}
                          <tbody>
                            {vp.dimensions.rows.filter(r=>r.some(c=>c.trim())).map((row,ri)=>(
                              <tr key={ri} style={{background:ri%2===0?'#fff':'var(--bg)'}}>
                                {row.map((cell,ci)=>(
                                  <td key={ci} className={ci===0?'vm-dim-primary':''}>{cell||'—'}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {(vp.barcode || vp.barcodeImage) && (
                    <div className="vm-meta-item">
                      <span className="vm-meta-lbl">Barcode</span>
                      {vp.barcodeImage ? (
                        <img
                          src={vp.barcodeImage}
                          alt="Barcode"
                          onClick={()=>setCodeLightbox({src:vp.barcodeImage,label:'Barcode'})}
                          style={{maxWidth:'100%',maxHeight:60,objectFit:'contain',marginTop:4,borderRadius:4,cursor:'zoom-in'}}
                          title="Click to enlarge"
                        />
                      ) : (
                        <code className="vm-meta-code">{vp.barcode}</code>
                      )}
                      {vp.barcode && vp.barcodeImage && (
                        <code className="vm-meta-code" style={{marginTop:4,display:'block'}}>{vp.barcode}</code>
                      )}
                    </div>
                  )}
                  {(vp.qrCode || vp.qrImage) && (
                    <div className="vm-meta-item">
                      <span className="vm-meta-lbl">QR Code</span>
                      {vp.qrImage && (
                        <img
                          src={vp.qrImage}
                          alt="QR Code"
                          onClick={()=>setCodeLightbox({src:vp.qrImage,label:'QR Code'})}
                          style={{width:72,height:72,objectFit:'contain',marginTop:4,borderRadius:4,border:'1px solid rgba(185,220,210,.4)',padding:4,background:'#fff',cursor:'zoom-in'}}
                          title="Click to enlarge"
                        />
                      )}
                      {vp.qrCode && (
                        <code className="vm-meta-code" style={{marginTop:4,display:'block',wordBreak:'break-all',fontSize:10}}>{vp.qrCode}</code>
                      )}
                    </div>
                  )}
                </div>
              )}
              <div className="vm-actions">
                <button className="vm-pencil-btn" onClick={()=>{ closeProductModal(); requestAuth(viewProduct) }} title="Edit product">
                  <PencilIcon/>
                </button>
                <button className="vm-link-btn" onClick={()=>copyProductLink(vp)}>
                  {copied===`${typeof window !== 'undefined' ? window.location.origin : ''}${typeof window !== 'undefined' ? window.location.pathname : ''}?sku=${encodeURIComponent(getSkuBase(vp))}` ? '✓ Link Copied' : '🔗 Product Link'}
                </button>
                <button className="vm-inq-btn" onClick={()=>{ const product = vp; closeProductModal(); openInquiry(product) }}>📩 Bulk Inquiry</button>
              </div>
            </div>
          </div>
        </div>
      )}
 
      {/* EDIT MODAL */}
      {editOpen && (
        <div className="modal-bg" onClick={e=>{if(e.target===e.currentTarget)setEditOpen(false)}}>
          <div className="modal edit-modal-inner">
            <div className="m-hdr em-hdr">
              <div>
                <div className="em-badge">{editTarget ? '✏️ Editing' : '+ New Product'}</div>
                <div className="em-title">{ef.name || (editTarget ? 'Edit Product' : 'New Product')}</div>
              </div>
              <button className="m-close" onClick={()=>setEditOpen(false)}>✕</button>
            </div>
            <div className="em-tabs">
              {[['details','📋 Details'],['colors',`🎨 Colors (${ef.colors.length})`],['images',`🖼 Images (${ef.images.length})`]].map(([t,l])=>(
                <button key={t} className={`em-tab ${editTab===t?'on':''}`} onClick={()=>setEditTab(t)}>{l}</button>
              ))}
            </div>
            {editTab === 'details' && (
              <div className="em-panel">
                <div className="f-col">
                  <label className="f-lbl">Product Name *</label>
                  <input className="f-in" value={ef.name} onChange={e=>setEf(f=>({...f,name:e.target.value}))} placeholder="e.g. Insulated Tumbler 550ml"/>
                </div>
                <div className="f-row">
                  <div className="f-col">
                    <label className="f-lbl">Extension</label>
                    {addingNewExt ? (
                      <div style={{display:'flex',flexDirection:'column',gap:6,background:'var(--sf4)',border:'1.5px solid rgba(39,153,137,.3)',borderRadius:8,padding:'10px 12px'}}>
                        <div style={{fontSize:10,fontWeight:700,letterSpacing:'.08em',color:'var(--tl)',textTransform:'uppercase'}}>New Extension</div>
                        <div style={{display:'flex',gap:6,alignItems:'center'}}>
                          <input type="color" value={inlineNewExt.color} onChange={e=>setInlineNewExt(n=>({...n,color:e.target.value}))} style={{width:32,height:32,border:'none',borderRadius:4,padding:2,cursor:'pointer',background:'none'}}/>
                          <input value={inlineNewExt.label} onChange={e=>setInlineNewExt(n=>({...n,label:e.target.value}))} placeholder="Extension name…" style={{flex:1,fontFamily:'var(--fn)',fontSize:12,border:'1px solid rgba(185,220,210,.6)',borderRadius:6,padding:'7px 10px',outline:'none',background:'#fff'}}/>
                        </div>
                        <div style={{display:'flex',gap:6}}>
                          <button onClick={()=>{
                            const val = inlineNewExt.label.trim().toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')
                            if(!inlineNewExt.label.trim()||exts.some(x=>x.value===val)) return
                            const newEntry = {value:val,label:inlineNewExt.label.trim(),color:inlineNewExt.color}
                            setExts(prev=>[...prev,newEntry])
                            setEf(f=>({...f,ext:val}))
                            setInlineNewExt({label:'',color:'#279989'})
                            setAddingNewExt(false)
                          }} style={{flex:1,background:'var(--tl)',color:'#fff',border:'none',borderRadius:6,padding:'7px 10px',fontFamily:'var(--fn)',fontSize:12,fontWeight:700,cursor:'pointer'}}>+ Add & Select</button>
                          <button onClick={()=>{setAddingNewExt(false);setInlineNewExt({label:'',color:'#279989'})}} style={{padding:'7px 10px',background:'var(--bg)',border:'1px solid rgba(185,220,210,.6)',borderRadius:6,fontFamily:'var(--fn)',fontSize:12,fontWeight:700,color:'var(--gr)',cursor:'pointer'}}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <select className="f-sel" value={ef.ext} onChange={e=>{
                        if(e.target.value==='__add_new__'){setAddingNewExt(true)}
                        else{setEf(f=>({...f,ext:e.target.value}))}
                      }}>
                        <option value="">— No Extension —</option>
                        {exts.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
                        <option value="__add_new__">+ Add new extension…</option>
                      </select>
                    )}
                  </div>
                  <div className="f-col">
                    <label className="f-lbl">Category <span style={{fontWeight:400,color:'var(--gr)'}}>— optional</span></label>
                    {addingNewCat ? (
                      <div style={{display:'flex',flexDirection:'column',gap:6,background:'var(--sf4)',border:'1.5px solid rgba(39,153,137,.3)',borderRadius:8,padding:'10px 12px'}}>
                        <div style={{fontSize:10,fontWeight:700,letterSpacing:'.08em',color:'var(--tl)',textTransform:'uppercase'}}>New Category</div>
                        <div style={{display:'flex',gap:6,alignItems:'center'}}>
                          <input value={inlineNewCat.icon} onChange={e=>setInlineNewCat(n=>({...n,icon:e.target.value}))} placeholder="🏷️" style={{width:36,textAlign:'center',fontSize:18,border:'1px solid rgba(185,220,210,.5)',borderRadius:6,padding:'6px 0',background:'#fff',outline:'none'}}/>
                          <input value={inlineNewCat.label} onChange={e=>setInlineNewCat(n=>({...n,label:e.target.value}))} placeholder="Category name…" style={{flex:1,fontFamily:'var(--fn)',fontSize:12,border:'1px solid rgba(185,220,210,.6)',borderRadius:6,padding:'7px 10px',outline:'none',background:'#fff'}}/>
                        </div>
                        <div style={{display:'flex',gap:6}}>
                          <button onClick={()=>{
                            const val = inlineNewCat.label.trim().toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')
                            if(!inlineNewCat.label.trim()||cats.some(c=>c.value===val)) return
                            const newEntry = {value:val,label:inlineNewCat.label.trim(),icon:inlineNewCat.icon||'🏷️'}
                            setCats(prev=>[...prev,newEntry])
                            setEf(f=>({...f,cat:val}))
                            setInlineNewCat({label:'',icon:'🏷️'})
                            setAddingNewCat(false)
                          }} style={{flex:1,background:'var(--tl)',color:'#fff',border:'none',borderRadius:6,padding:'7px 10px',fontFamily:'var(--fn)',fontSize:12,fontWeight:700,cursor:'pointer'}}>+ Add & Select</button>
                          <button onClick={()=>{setAddingNewCat(false);setInlineNewCat({label:'',icon:'🏷️'})}} style={{padding:'7px 10px',background:'var(--bg)',border:'1px solid rgba(185,220,210,.6)',borderRadius:6,fontFamily:'var(--fn)',fontSize:12,fontWeight:700,color:'var(--gr)',cursor:'pointer'}}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div style={{display:'flex',gap:6}}>
                        <select className="f-sel" style={{flex:1}} value={ef.cat} onChange={e=>{
                          if(e.target.value==='__add_new__'){setAddingNewCat(true)}
                          else{setEf(f=>({...f,cat:e.target.value}))}
                        }}>
                          <option value="">— No Category —</option>
                          {cats.map(c=><option key={c.value} value={c.value}>{c.label}</option>)}
                          <option value="__add_new__">+ Add new category…</option>
                        </select>
                        {editMode && <button type="button" onClick={()=>setCatMgrOpen(true)} style={{flexShrink:0,padding:'0 10px',background:'var(--sf)',border:'1px solid rgba(185,220,210,.6)',borderRadius:6,fontSize:11,fontWeight:700,color:'var(--tl)',cursor:'pointer',whiteSpace:'nowrap'}}>⚙ Manage</button>}
                      </div>
                    )}
                  </div>
                </div>
                <div className="f-col">
                  <label className="f-lbl">SKU Base <span style={{fontWeight:400,textTransform:'none',letterSpacing:0,color:'var(--gr)'}}>— optional</span></label>
                  <input
                    className="f-in"
                    value={getEditableSkuBase()}
                    onChange={e=>updateAllColorSkusFromBase(e.target.value)}
                    placeholder="e.g. QNH-TWB680"
                    disabled={!ef.colors?.length}
                  />
                  <div className="f-hint" style={{marginTop:6}}>Editing this updates all color SKUs using the color codes. You can still edit each full SKU in the Colors tab.</div>
                </div>
                <div className="f-row">
                  <div className="f-col">
                    <label className="f-lbl">SRP (₱) *</label>
                    <input className="f-in" type="number" step="0.01" min="0" value={ef.srp} onChange={e=>setEf(f=>({...f,srp:e.target.value}))} placeholder="799.75"/>
                  </div>
                  <div className="f-col">
                    <label className="f-lbl">Packing Qty</label>
                    <input className="f-in" type="number" min="1" value={ef.packing} onChange={e=>setEf(f=>({...f,packing:e.target.value}))} placeholder="16"/>
                  </div>
                </div>
                <div className="f-col">
                  <label className="f-lbl">Description</label>
                  <textarea className="f-ta" rows={4} value={ef.desc} onChange={e=>setEf(f=>({...f,desc:e.target.value}))} placeholder="Describe the product…"/>
                </div>
                <div className="f-col">
                  <label className="f-lbl">Dimensions <span style={{fontWeight:400,textTransform:'none',letterSpacing:0,color:'var(--gr)'}}>— optional</span></label>
                  <DimensionsEditor value={ef.dimensions} onChange={val=>setEf(f=>({...f,dimensions:val}))}/>
                </div>
                <div className="f-row">
                  {/* BARCODE */}
                  <div className="f-col">
                    <label className="f-lbl">Barcode <span style={{fontWeight:400,textTransform:'none',letterSpacing:0,color:'var(--gr)'}}>— optional</span></label>
                    <input className="f-in" value={ef.barcode} onChange={e=>setEf(f=>({...f,barcode:e.target.value}))} placeholder="e.g. 9780201350395" style={{marginBottom:6}}/>
                    <CodeImageUpload
                      label="Barcode Image"
                      value={ef.barcodeImage}
                      onChange={img=>setEf(f=>({...f,barcodeImage:img}))}
                      onUpload={(file)=>uploadImageToBlob(file,{compress:false})}
                      onClear={()=>setEf(f=>({...f,barcodeImage:''}))}
                    />
                  </div>
                  {/* QR CODE */}
                  <div className="f-col">
                    <label className="f-lbl">QR Code <span style={{fontWeight:400,textTransform:'none',letterSpacing:0,color:'var(--gr)'}}>— optional</span></label>
                    <input className="f-in" value={ef.qrCode} onChange={e=>setEf(f=>({...f,qrCode:e.target.value}))} placeholder="e.g. https://…" style={{marginBottom:6}}/>
                    <CodeImageUpload
                      label="QR Code Image"
                      value={ef.qrImage}
                      onChange={img=>setEf(f=>({...f,qrImage:img}))}
                      onUpload={(file)=>uploadImageToBlob(file,{compress:false})}
                      onClear={()=>setEf(f=>({...f,qrImage:''}))}
                    />
                  </div>
                </div>
                <div className="f-col">
                  <label className="f-lbl">YouTube Video <span style={{fontWeight:400,textTransform:'none',letterSpacing:0,color:'var(--gr)'}}>— optional</span></label>
                  <input className="f-in" value={ef.youtube} onChange={e=>setEf(f=>({...f,youtube:e.target.value}))} placeholder="https://youtube.com/watch?v=… or https://youtu.be/…"/>
                  {ef.youtube && getYouTubeId(ef.youtube) && (
                    <div style={{marginTop:6,fontSize:11,color:'var(--tl)',display:'flex',alignItems:'center',gap:4}}>
                      ✓ Valid YouTube link detected
                    </div>
                  )}
                </div>
                <div className="f-col">
                  <label className="f-lbl">Feature Badges</label>
                  <div className="badge-list">{ef.badges.map(b=><span key={b} className="badge-tag">{b}<button onClick={()=>removeBadge(b)}>✕</button></span>)}</div>
                  <div className="add-row" style={{marginTop:8}}>
                    <input className="f-in" value={badgeInput} onChange={e=>setBadgeInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();addBadge()}}} placeholder="e.g. BPA-Free, Double Wall…"/>
                    <button className="add-btn" onClick={addBadge}>Add</button>
                  </div>
                </div>
              </div>
            )}
            {editTab === 'colors' && (
              <div className="em-panel">
                <div className="f-hint">Each color variant gets its own SKU. Use + Add to apply a saved collection set to this product. Use Edit Set to manage the reusable colors for OG, XPRESS, Horizon, Bloom, Poply, or your custom collection groups. Saved collection sets are stored in site settings so they will not reset when you add new products.</div>
                <div className="color-collection-panel">
                  <div className="collection-head">
                    <span className="collection-title">Color collections / group titles</span>
                  </div>
                  <div className="collection-grid">
                    {colorCollections.map(col=>{
                      const savedCount = collectionSetCount(col.value)
                      const isEditingThisSet = editingCollectionSet === col.value
                      return (
                        <div key={col.value} className={`collection-item ${isEditingThisSet ? 'editing-set' : ''}`}>
                          <input type="color" value={col.color || '#279989'} onChange={e=>updateCollection(col.value,{color:e.target.value})}/>
                          <input className="collection-name" value={col.label} onChange={e=>updateCollection(col.value,{label:e.target.value})} placeholder="Collection name"/>
                          <div className="collection-actions">
                            <span className="collection-set-count">{savedCount} colors</span>
                            <button type="button" className="collection-add-set" disabled={!savedCount} onClick={()=>addCollectionSetToProduct(col.value)}>+ Add {col.label}</button>
                            <button type="button" className="collection-edit-set" onClick={()=>isEditingThisSet ? closeCollectionSetEditor() : openCollectionSetEditor(col.value)}>{isEditingThisSet ? 'Close' : 'Edit Set'}</button>
                          </div>
                          <div className="collection-set-preview">
                            {(colorCollectionSets[col.value] || []).map(item=>(
                              <span key={`${col.value}-${item.code}`} className="collection-color-chip" title={`${item.name} (${item.code})`}>
                                <i style={{background:swatchBackground(item)}}/>{item.name}
                              </span>
                            ))}
                          </div>
                          {isEditingThisSet && (() => {
                            const activeCollection = col
                            return (
                              <div className="collection-set-editor">
                                <div className="collection-set-editor-head">
                                  <div>
                                    <span className="collection-set-editor-kicker">Editing saved colors</span>
                                    <div className="collection-set-editor-name">{activeCollection.label} Collection Set</div>
                                  </div>
                                  <button type="button" className="collection-set-editor-close" onClick={closeCollectionSetEditor}>×</button>
                                </div>
                                <div className="collection-set-editor-list">
                                  {collectionSetDraft.map((item, idx) => (
                                    <div key={`${editingCollectionSet}-${idx}`} className="collection-set-row">
                                      <div className="collection-set-move" aria-label={`Reorder ${item.name || 'color'}`}>
                                        <button type="button" disabled={idx===0} onClick={()=>moveCollectionSetDraftColor(idx, idx-1)} title="Move color up">↑</button>
                                        <button type="button" disabled={idx===collectionSetDraft.length-1} onClick={()=>moveCollectionSetDraftColor(idx, idx+1)} title="Move color down">↓</button>
                                      </div>
                                      <input type="color" value={getColorHexes(item)[0] || '#B9DCD2'} onChange={e=>updateCollectionSetDraft(idx,{ hex:e.target.value })}/>
                                      <input type="text" value={item.name || ''} onChange={e=>updateCollectionSetDraft(idx,{ name:e.target.value })} placeholder="Color name"/>
                                      <input type="text" value={item.code || ''} onChange={e=>updateCollectionSetDraft(idx,{ code:e.target.value.toUpperCase() })} placeholder="Code"/>
                                      <input type="text" value={getColorHexes(item).join(', ')} onChange={e=>updateCollectionSetDraftHexes(idx,e.target.value)} placeholder="#HEX or #HEX, #HEX"/>
                                      <button type="button" className="collection-set-remove" onClick={()=>removeCollectionSetDraftColor(idx)} title="Remove color">×</button>
                                    </div>
                                  ))}
                                </div>
                                <div className="collection-set-add-inline">
                                  <input type="color" value={normalizeHexValue(newCollectionSetColor.hex, '#B9DCD2')} onChange={e=>setNewCollectionSetColor(v=>({...v,hex:e.target.value}))}/>
                                  <input type="text" value={newCollectionSetColor.name} onChange={e=>setNewCollectionSetColor(v=>({...v,name:e.target.value}))} placeholder="New color name"/>
                                  <input type="text" value={newCollectionSetColor.code} onChange={e=>setNewCollectionSetColor(v=>({...v,code:e.target.value.toUpperCase()}))} placeholder="Code"/>
                                  <input type="text" value={newCollectionSetColor.hex} onChange={e=>setNewCollectionSetColor(v=>({...v,hex:e.target.value}))} placeholder="#HEX or #HEX, #HEX"/>
                                  <button type="button" onClick={addCollectionSetDraftColor}>+ Add Color</button>
                                </div>
                                <div className="collection-set-editor-actions">
                                  <button type="button" className="collection-set-cancel" onClick={closeCollectionSetEditor}>Cancel</button>
                                  <button type="button" className="collection-set-save" onClick={saveCollectionSetDraft}>Save Collection Set</button>
                                </div>
                              </div>
                            )
                          })()}
                        </div>
                      )
                    })}
                  </div>
                  <div className="collection-add-row">
                    <input type="color" value={newCollection.color} onChange={e=>setNewCollection(n=>({...n,color:e.target.value}))}/>
                    <input type="text" value={newCollection.label} onChange={e=>setNewCollection(n=>({...n,label:e.target.value}))} placeholder="Add group title, e.g. Seasonal, Pastel, Male, Female" onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();addCollection()}}}/>
                    <button type="button" onClick={addCollection}>+ Add Group</button>
                  </div>
                </div>
                <div style={{background:'var(--bg)',borderRadius:10,padding:12}}>
                  <div className="color-table-head"><span>Order</span><span>HEX colors</span><span>Collection</span><span>Name</span><span>Code</span><span>SKU</span><span/></div>
                  {ef.colors.length === 0
                    ? <p style={{fontSize:12,color:'var(--gr)',padding:'4px 0'}}>No colors yet. Add one below.</p>
                    : ef.colors.map((c,i)=>(
                      <div key={i} className="color-row">
                        <div className="color-move-controls" aria-label={`Reorder ${c.name || 'color'}`}>
                          <button type="button" className="move-btn" disabled={i===0} onClick={()=>moveColor(i,i-1)} title="Move color up">↑</button>
                          <button type="button" className="move-btn" disabled={i===ef.colors.length-1} onClick={()=>moveColor(i,i+1)} title="Move color down">↓</button>
                        </div>
                        <div className="multi-swatch-edit">
                          {getColorHexes(c).map((hex, hi)=>(
                            <span key={hi} className="swatch-input-wrap" title={hi===0?'Main color':'Additional color'}>
                              <input type="color" className="cp" value={hex} onChange={e=>updateColorHex(i,hi,e.target.value)}/>
                              <input
                                className="hex-in"
                                value={hex}
                                onChange={e=>pasteColorHex(i,hi,e.target.value)}
                                onPaste={e=>{e.preventDefault(); pasteColorHex(i,hi,e.clipboardData.getData('text'))}}
                                placeholder="#HEX"
                                spellCheck={false}
                              />
                              {getColorHexes(c).length > 1 && <button type="button" className="swatch-rm" onClick={()=>removeColorHex(i,hi)}>×</button>}
                            </span>
                          ))}
                          <button type="button" className="swatch-add" title="Add another HEX color to this variant" onClick={()=>addColorHex(i)}>+</button>
                        </div>
                        <select className="collection-select" value={c.collection || defaultColorCollection(c)} onChange={e=>updateColor(i,'collection',e.target.value)}>
                          {colorCollections.map(col=><option key={col.value} value={col.value}>{col.label}</option>)}
                          <option value="Other">Other</option>
                        </select>
                        <input className="in-sm" value={c.name} onChange={e=>updateColor(i,'name',e.target.value)} placeholder="Name"/>
                        <input className="in-sm" value={c.code} onChange={e=>updateColor(i,'code',e.target.value)} placeholder="Code" maxLength={4}/>
                        <input className="in-sm" value={c.sku} onChange={e=>updateColor(i,'sku',e.target.value)} placeholder="SKU"/>
                        <button className="rm-btn" onClick={()=>removeColor(i)}>✕</button>
                      </div>
                    ))
                  }
                </div>
                <div className="add-color-form">
                  <div className="sub-hd">Add Color Variant</div>
                  <div className="color-table-head"><span>Order</span><span>HEX colors</span><span>Collection</span><span>Name</span><span>Code</span><span>SKU</span><span/></div>
                  <div className="color-row new-color-row">
                    <div className="color-move-placeholder">New</div>
                    <div className="multi-swatch-edit">
                      {getColorHexes(newColor).map((hex, hi)=>(
                        <span key={hi} className="swatch-input-wrap" title={hi===0?'Main color':'Additional color'}>
                          <input type="color" className="cp" value={hex} onChange={e=>updateNewColorHex(hi,e.target.value)}/>
                          <input
                            className="hex-in"
                            value={hex}
                            onChange={e=>pasteNewColorHex(hi,e.target.value)}
                            onPaste={e=>{e.preventDefault(); pasteNewColorHex(hi,e.clipboardData.getData('text'))}}
                            placeholder="#HEX"
                            spellCheck={false}
                          />
                          {getColorHexes(newColor).length > 1 && <button type="button" className="swatch-rm" onClick={()=>removeNewColorHex(hi)}>×</button>}
                        </span>
                      ))}
                      <button type="button" className="swatch-add" title="Add another HEX color to this variant" onClick={addNewColorHex}>+</button>
                    </div>
                    <select className="collection-select" value={newColor.collection || 'OG'} onChange={e=>setNewColor(n=>({...n,collection:e.target.value}))}>
                      {colorCollections.map(col=><option key={col.value} value={col.value}>{col.label}</option>)}
                      <option value="Other">Other</option>
                    </select>
                    <input className="in-sm" value={newColor.name} onChange={e=>setNewColor(n=>({...n,name:e.target.value}))} placeholder="Name"/>
                    <input className="in-sm" value={newColor.code} onChange={e=>setNewColor(n=>({...n,code:e.target.value.toUpperCase()}))} placeholder="Code" maxLength={4}/>
                    <input className="in-sm" value={newColor.sku} onChange={e=>setNewColor(n=>({...n,sku:e.target.value.toUpperCase()}))} placeholder="Full SKU"/>
                    <button className="add-btn" style={{borderRadius:6,padding:'6px 10px',fontSize:12}} onClick={addColor}>+</button>
                  </div>
                </div>
              </div>
            )}
            {editTab === 'images' && (
              <div className="em-panel">
                <div className="f-hint">Upload product images. General images have their own section, and each color has its own upload area. Drag thumbnails to rearrange their order. Tick Main on any image to make it the product card/main image.</div>
                <div className="color-image-panel">
                  <div className="color-image-panel-head">
                    <div>
                      <div className="color-image-title">General product images</div>
                      <div className="color-image-sub">Upload main lifestyle, infographics, packaging, or any product photos not tied to a specific color.</div>
                    </div>
                  </div>
                  <div className="color-image-grid">
                    {(() => {
                      const generalAssigned = normalizeProductImages(ef.images).map((img, index) => ({ img, index })).filter(item => isGeneralImage(item.img))
                      return (
                        <div className="color-image-card general-image-card">
                          <div className="color-image-card-top">
                            <span className="general-image-swatch"/>
                            <div style={{minWidth:0,flex:1}}>
                              <div className="color-image-name">General Images</div>
                              <div className="color-image-sku">Main gallery / no color assignment</div>
                            </div>
                          </div>
                          {generalAssigned.length > 0 ? (
                            <div className="color-image-thumbs">
                              {generalAssigned.map(({img, index}) => (
                                <span
                                  className={`color-image-thumb ${index===0 ? 'main-selected' : ''} ${dragImageIndex===index ? 'dragging' : ''} ${dragOverImageIndex===index && dragImageIndex!==index ? (dragOverImagePosition==='after' ? 'drop-after' : 'drop-before') : ''}`}
                                  key={`general-${index}`}
                                  data-img-index={index}
                                  draggable
                                  onTouchStart={(e)=>handleImageTouchStart(e,index)}
                                  onTouchMove={handleImageTouchMove}
                                  onTouchEnd={handleImageTouchEnd}
                                  onTouchCancel={handleImageTouchEnd}
                                  onDragStart={(e)=>handleImageDragStart(e,index)}
                                  onDragOver={(e)=>handleImageDragOver(e,index)}
                                  onDrop={(e)=>handleImageDrop(e,index)}
                                  onDragEnd={()=>{setDragImageIndex(null);clearImageDropGuide()}}
                                  title="Drag to rearrange thumbnail order"
                                >
                                  {index===0 && <span className="main-tag">Main</span>}
                                  <img src={getImageSrc(img)} alt=""/>
                                  <button type="button" onMouseDown={e=>e.stopPropagation()} onClick={()=>removeImg(index)} title="Remove image">×</button>
                                  <label className="color-main-check" title="Set as main product image" onClick={e=>e.stopPropagation()}>
                                    <input type="checkbox" checked={index===0} onChange={()=>setMainImage(index)} /> Main
                                  </label>
                                </span>
                              ))}
                            </div>
                          ) : (
                            <div className="color-image-empty">No general photos yet</div>
                          )}
                          <label className="color-upload-btn">
                            + Upload general product photos
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={e=>{
                                uploadFilesGeneral(e.target.files)
                                e.target.value = ''
                              }}
                            />
                          </label>
                        </div>
                      )
                    })()}
                  </div>
                </div>
 
                <div className="color-image-panel">
                  <div className="color-image-panel-head">
                    <div>
                      <div className="color-image-title">Images per color</div>
                      <div className="color-image-sub">Upload multiple product photos for each color. When customers click a color, the first assigned image will show.</div>
                    </div>
                  </div>
                  <div className="color-image-grid">
                    {(ef.colors || []).map(color => {
                      const assigned = normalizeProductImages(ef.images).map((img, index) => ({ img, index })).filter(item => imageMatchesColor(item.img, color))
                      return (
                        <div className="color-image-card" key={color.sku || color.code || color.name}>
                          <div className="color-image-card-top">
                            <span className="color-image-swatch" style={{background:swatchBackground(color)}}/>
                            <div style={{minWidth:0,flex:1}}>
                              <div className="color-image-name">{color.name}</div>
                              <div className="color-image-sku">{color.sku}</div>
                            </div>
                          </div>
                          {assigned.length > 0 ? (
                            <div className="color-image-thumbs">
                              {assigned.map(({img, index}) => (
                                <span
                                  className={`color-image-thumb ${index===0 ? 'main-selected' : ''} ${dragImageIndex===index ? 'dragging' : ''} ${dragOverImageIndex===index && dragImageIndex!==index ? (dragOverImagePosition==='after' ? 'drop-after' : 'drop-before') : ''}`}
                                  key={`${color.sku || color.code}-${index}`}
                                  data-img-index={index}
                                  draggable
                                  onTouchStart={(e)=>handleImageTouchStart(e,index)}
                                  onTouchMove={handleImageTouchMove}
                                  onTouchEnd={handleImageTouchEnd}
                                  onTouchCancel={handleImageTouchEnd}
                                  onDragStart={(e)=>handleImageDragStart(e,index)}
                                  onDragOver={(e)=>handleImageDragOver(e,index)}
                                  onDrop={(e)=>handleImageDrop(e,index)}
                                  onDragEnd={()=>{setDragImageIndex(null);clearImageDropGuide()}}
                                  title="Drag to rearrange thumbnail order"
                                >
                                  {index===0 && <span className="main-tag">Main</span>}
                                  <img src={getImageSrc(img)} alt=""/>
                                  <button type="button" onMouseDown={e=>e.stopPropagation()} onClick={()=>removeImg(index)} title="Remove image">×</button>
                                  <label className="color-main-check" title="Set as main product image" onClick={e=>e.stopPropagation()}>
                                    <input type="checkbox" checked={index===0} onChange={()=>setMainImage(index)} /> Main
                                  </label>
                                </span>
                              ))}
                            </div>
                          ) : (
                            <div className="color-image-empty">No uploaded photos yet</div>
                          )}
                          <label className="color-upload-btn">
                            + Upload photos for {color.name}
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={e=>{
                                uploadFilesForColor(e.target.files, color)
                                e.target.value = ''
                              }}
                            />
                          </label>
                        </div>
                      )
                    })}
                  </div>
                </div>
                {getTemporaryImageCount() > 0 && (
                  <button type="button" className="cancel-btn" style={{width:'100%',justifyContent:'center'}} onClick={removeTemporaryImages}>
                    Remove failed preview images ({getTemporaryImageCount()})
                  </button>
                )}
                {uploadErr && <div className="f-error">{uploadErr}</div>}
                <input ref={fileRef} type="file" accept="image/*" style={{display:'none'}} onChange={handleImgUpload}/>
              </div>
            )}
            <div className="m-footer">
              {editTarget && <button className="del-btn" onClick={()=>deleteProduct(editTarget.id)}>🗑 Delete</button>}
              <div className="m-footer-r">
                <button className="cancel-btn" onClick={()=>setEditOpen(false)}>Cancel</button>
                <button className="save-btn" onClick={saveProduct}>{editTarget ? '✓ Save Changes' : '+ Add Product'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
 
      {/* BRAND LOGO + TOPBAR TEXT MODAL */}
      {brandEditOpen && (
        <div className="modal-bg" onClick={e=>{if(e.target===e.currentTarget)setBrandEditOpen(false)}}>
          <div className="modal" style={{maxWidth:560}}>
            <div className="m-hdr" style={{background:'var(--sf4)'}}>
              <div>
                <div style={{fontSize:10,fontWeight:900,letterSpacing:'.12em',color:'var(--tl)',textTransform:'uppercase',marginBottom:4}}>Top Bar Branding</div>
                <div style={{fontSize:22,fontWeight:900,color:'var(--tl)',lineHeight:1.1}}>Brand Logo & Text</div>
              </div>
              <button className="m-close" onClick={()=>setBrandEditOpen(false)}>✕</button>
            </div>
            <div className="m-body">
              <div className="f-col">
                <label className="f-lbl">Brand Logo</label>
                <div style={{display:'flex',gap:14,alignItems:'center',background:'var(--bg)',border:'1px solid var(--sf7)',borderRadius:10,padding:14}}>
                  <div style={{width:120,height:58,borderRadius:8,background:'var(--tl)',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',color:'#fff',fontSize:12,fontWeight:900,letterSpacing:'.06em',flexShrink:0}}>
                    {brandLogo ? <img src={brandLogo} alt="Brand logo preview" style={{width:'100%',height:'100%',objectFit:'contain',padding:8,background:'rgba(255,255,255,.08)'}}/> : 'NO LOGO'}
                  </div>
                  <div style={{display:'flex',flexDirection:'column',gap:8,flex:1}}>
                    <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                      <label className="add-btn" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',padding:'9px 14px',cursor:'pointer'}}>
                        Upload Logo
                        <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" style={{display:'none'}} onChange={handleBrandLogoUpload}/>
                      </label>
                      {brandLogo && <button className="cancel-btn" onClick={()=>{saveBrandLogo('');setBrandUploadErr('')}}>Remove</button>}
                    </div>
                    <div style={{fontSize:11,color:'var(--gr)',lineHeight:1.45}}>Best format: transparent PNG or SVG under 2MB. Leave text fields blank if you want to show logo only.</div>
                  </div>
                </div>
                {brandUploadErr && <div className="f-error">{brandUploadErr}</div>}
              </div>
 
              <div className="f-row">
                <div className="f-col">
                  <label className="f-lbl">Brand Name</label>
                  <input className="f-in" value={brandName} onChange={e=>saveBrandName(e.target.value)} placeholder="Leave blank to hide brand name"/>
                </div>
                <div className="f-col">
                  <label className="f-lbl">Text Beside Brand Name</label>
                  <input className="f-in" value={brandTagline} onChange={e=>saveBrandTagline(e.target.value)} placeholder="Leave blank to hide tagline"/>
                </div>
              </div>
 
              <div className="f-col">
                <label className="f-lbl">Preview</label>
                <div style={{background:'var(--tl)',borderRadius:8,padding:'12px 16px',display:'flex',alignItems:'center',gap:8,minHeight:58}}>
                  {brandLogo && <img src={brandLogo} alt="Brand logo preview" style={{height:30,width:'auto',maxWidth:140,objectFit:'contain'}}/>}
                  {brandName?.trim() && <span className="tb-wm">{brandName}</span>}
                  {brandTagline?.trim() && <span className="tb-tg">{brandTagline}</span>}
                  {!brandLogo && !brandName?.trim() && !brandTagline?.trim() && <span style={{color:'rgba(255,255,255,.65)',fontSize:12}}>Nothing will show in the brand area.</span>}
                </div>
              </div>
            </div>
            <div className="m-footer">
              <span style={{fontSize:12,color:'var(--gr)'}}>Changes autosave to site settings.</span>
              <div className="m-footer-r"><button className="save-btn" onClick={()=>setBrandEditOpen(false)}>Done</button></div>
            </div>
          </div>
        </div>
      )}
 
      {/* CODE LIGHTBOX */}
      {codeLightbox && (
        <CodeLightbox
          src={codeLightbox.src}
          label={codeLightbox.label}
          onClose={()=>setCodeLightbox(null)}
        />
      )}
 
      {/* LOADING */}
      {loading && (
        <div style={{position:'fixed',inset:0,zIndex:999,background:'var(--sf4)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:16}}>
          <div style={{fontSize:24,fontWeight:900,color:'var(--tl)',letterSpacing:'-.01em',fontFamily:'var(--fn)',textAlign:'center'}}>QUENCHA</div>
          <div style={{width:40,height:40,border:'3px solid rgba(39,153,137,.2)',borderTop:'3px solid var(--tl)',borderRadius:'50%',animation:'spin 0.8s linear infinite',margin:'0 auto'}}/>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      )}
 
      {/* BANNER EDIT MODAL */}
      {bannerEditOpen && (
        <BannerEditModal
          banners={banners}
          aspect={bannerAspect}
          interval={bannerInterval}
          onIntervalChange={saveBannerInterval}
          heroVideoUrl={heroVideoUrl}
          heroVideoThumbnail={heroVideoThumbnail}
          heroMediaOrder={heroMediaOrder}
          onHeroVideoUrlChange={saveHeroVideoUrl}
          onHeroVideoThumbnailChange={saveHeroVideoThumbnail}
          onHeroMediaOrderChange={saveHeroMediaOrder}
          onAspectChange={saveAspect}
          onAdd={b=>saveBanners([...banners,b])}
          onRemove={id=>saveBanners(banners.filter(b=>b.id!==id))}
          onMove={(from,to)=>{const b=[...banners];const[item]=b.splice(from,1);b.splice(to,0,item);saveBanners(b)}}
          onUpdateBanner={(id,field,val)=>saveBanners(banners.map(b=>b.id===id?{...b,[field]:val}:b))}
          onClose={()=>setBannerEditOpen(false)}
          onUpload={uploadImageToBlob}
        />
      )}
 
      {/* INQUIRY MODAL */}
      {inqOpen && (() => {
        const colors = inqProduct?.colors || []
        const packingNum = parseInt(inqProduct?.packing, 10) || 0
        const activeLines = inqLines?.length ? inqLines : [{ colorCode: colors[0]?.code || '', packs: '1' }]
        const enrichedLines = activeLines.map((line) => {
          const selectedColor = colors.find(c => c.code === line.colorCode) || colors[0] || null
          const packsNum = parseInt(line.packs, 10) || 0
          const units = packsNum && packingNum ? packsNum * packingNum : 0
          return { ...line, selectedColor, packsNum, units }
        })
        const totalPacks = enrichedLines.reduce((sum, line) => sum + line.packsNum, 0)
        const totalUnits = enrichedLines.reduce((sum, line) => sum + line.units, 0)
        const inquiryHref = buildInquiryHref(inqProduct, activeLines, inqMessage)
        const updateLine = (index, patch) => setInqLines(lines => {
          const base = lines?.length ? lines : activeLines
          return base.map((line, i) => i === index ? { ...line, ...patch } : line)
        })
        const addLine = () => setInqLines(lines => {
          const base = lines?.length ? lines : activeLines
          return [...base, { colorCode: colors[0]?.code || '', packs: '1' }]
        })
        const removeLine = (index) => setInqLines(lines => {
          const base = lines?.length ? lines : activeLines
          return base.length > 1 ? base.filter((_, i) => i !== index) : base
        })
 
        return (
          <div className="modal-bg" onClick={e=>{if(e.target===e.currentTarget)setInqOpen(false)}}>
            <div className="modal" style={{maxWidth:640}}>
              <div className="m-hdr" style={{background:'var(--sf4)'}}>
                <div>
                  <div style={{fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'var(--tl)',textTransform:'uppercase',marginBottom:4}}>Corporate & Wholesale</div>
                  <div style={{fontSize:20,fontWeight:900,color:'var(--tl)'}}>Bulk Inquiry</div>
                </div>
                <button className="m-close" onClick={()=>setInqOpen(false)}>✕</button>
              </div>
              <div className="m-body" style={{gap:14}}>
                <p style={{fontSize:14,color:'var(--gr)'}}>Select the preferred color/s and quantity first, then send the inquiry through email.</p>
 
                <div style={{background:'var(--sf4)',border:'1px solid rgba(185,220,210,.6)',borderRadius:10,padding:14,display:'flex',flexDirection:'column',gap:8}}>
                  <div style={{fontSize:11,fontWeight:800,letterSpacing:'.1em',color:'var(--tl)',textTransform:'uppercase'}}>Inquiry Item</div>
                  <div style={{fontSize:16,fontWeight:900,color:'var(--bk)',lineHeight:1.25}}>{inqProduct?.name || 'General Quencha bulk inquiry'}</div>
                  {inqProduct?.colors?.[0]?.sku && <div style={{fontSize:12,color:'var(--gr)'}}>SKU Base: <strong style={{color:'var(--tl)'}}>{getSkuBase(inqProduct)}</strong></div>}
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginTop:4}}>
                    <div style={{background:'#fff',border:'1px solid rgba(185,220,210,.55)',borderRadius:8,padding:'10px 12px'}}>
                      <div style={{fontSize:10,fontWeight:800,letterSpacing:'.08em',color:'var(--gr)',textTransform:'uppercase'}}>Packing</div>
                      <div style={{fontSize:20,fontWeight:900,color:'var(--tl)'}}>{packingNum ? `${packingNum} pcs` : 'TBC'}</div>
                    </div>
                    <div style={{background:'#fff',border:'1px solid rgba(185,220,210,.55)',borderRadius:8,padding:'10px 12px'}}>
                      <div style={{fontSize:10,fontWeight:800,letterSpacing:'.08em',color:'var(--gr)',textTransform:'uppercase'}}>Total Packs</div>
                      <div style={{fontSize:20,fontWeight:900,color:'var(--tl)'}}>{totalPacks || '—'}</div>
                    </div>
                    <div style={{background:'#fff',border:'1px solid rgba(185,220,210,.55)',borderRadius:8,padding:'10px 12px'}}>
                      <div style={{fontSize:10,fontWeight:800,letterSpacing:'.08em',color:'var(--gr)',textTransform:'uppercase'}}>Total Units</div>
                      <div style={{fontSize:20,fontWeight:900,color:'var(--tl)'}}>{totalUnits ? `${totalUnits} pcs` : '—'}</div>
                    </div>
                  </div>
                </div>
 
                <div className="f-col">
                  <label className="f-lbl">Color & Quantity</label>
                  <div style={{display:'flex',flexDirection:'column',gap:8}}>
                    {enrichedLines.map((line, index) => (
                      <div key={index} style={{background:'var(--bg)',border:'1px solid rgba(185,220,210,.55)',borderRadius:10,padding:10,display:'flex',flexDirection:'column',gap:8}}>
                        <div style={{display:'grid',gridTemplateColumns:'1fr 120px 34px',gap:8,alignItems:'center'}}>
                          <select
                            className="f-sel"
                            value={line.colorCode || ''}
                            onChange={e=>updateLine(index, { colorCode: e.target.value })}
                            disabled={!colors.length}
                          >
                            {colors.length ? colors.map(color => (
                              <option key={color.sku || color.code} value={color.code}>{color.name} — {color.code}</option>
                            )) : <option value="">Select color</option>}
                          </select>
                          <input
                            className="f-in"
                            type="number"
                            min="1"
                            value={line.packs}
                            onChange={e=>updateLine(index, { packs: e.target.value })}
                            placeholder="Packs"
                          />
                          <button
                            type="button"
                            className="rm-btn"
                            onClick={()=>removeLine(index)}
                            disabled={enrichedLines.length <= 1}
                            style={{height:38,border:'1px solid rgba(239,68,68,.2)',borderRadius:8,background:'rgba(239,68,68,.04)',opacity:enrichedLines.length <= 1 ? .35 : 1}}
                            title="Remove color"
                          >
                            ×
                          </button>
                        </div>
                        <div style={{display:'flex',flexWrap:'wrap',gap:8,fontSize:11,color:'var(--gr)'}}>
                          {line.selectedColor?.hex && <span style={{width:12,height:12,borderRadius:'50%',background:line.selectedColor.hex,border:'1px solid rgba(0,0,0,.1)',display:'inline-block',marginTop:2}}/>}
                          {line.selectedColor?.sku && <span>SKU: <strong style={{color:'var(--tl)'}}>{line.selectedColor.sku}</strong></span>}
                          {packingNum > 0 && line.packsNum > 0 && <span>{line.packsNum} pack{line.packsNum > 1 ? 's' : ''} × {packingNum} pcs = <strong>{line.units} pcs</strong></span>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="add-btn"
                    onClick={addLine}
                    style={{alignSelf:'flex-start',background:'rgba(39,153,137,.12)',color:'var(--tl)',border:'1px solid rgba(39,153,137,.25)',marginTop:2}}
                  >
                    + Add another color
                  </button>
                  {packingNum > 0 && <div className="f-hint">Example: 5 packs × {packingNum} pcs = {5 * packingNum} pcs total per color.</div>}
                </div>
 
                <div className="f-col">
                  <label className="f-lbl">Note / Message</label>
                  <textarea
                    className="f-ta"
                    rows={4}
                    value={inqMessage}
                    onChange={e=>setInqMessage(e.target.value)}
                    placeholder="Add UV printing details, delivery area, deadline, or other notes…"
                  />
                </div>
 
                <a
                  className="inq-link"
                  href={inquiryHref}
                  target="_blank"
                  rel="noreferrer"
                  style={{width:'100%',justifyContent:'center'}}
                >
                  📩 Send Inquiry via Email
                </a>
              </div>
            </div>
          </div>
        )
      })()}
 
      {/* CATEGORY MANAGER MODAL */}
      {catMgrOpen && (
        <div className="modal-bg" onClick={e=>{if(e.target===e.currentTarget)setCatMgrOpen(false)}}>
          <div className="modal" style={{maxWidth:480}}>
            <div className="m-hdr" style={{background:'var(--sf4)'}}>
              <div>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'var(--tl)',textTransform:'uppercase',marginBottom:4}}>Edit Mode</div>
                <div style={{fontSize:20,fontWeight:900,color:'var(--tl)'}}>Manage Categories</div>
              </div>
              <button className="m-close" onClick={()=>setCatMgrOpen(false)}>✕</button>
            </div>
            <div className="m-body" style={{gap:10}}>
              {/* Existing categories */}
              {cats.map((c,i)=>(
                <div key={c.value} style={{display:'grid',gridTemplateColumns:'44px 1fr 1fr 36px',gap:8,alignItems:'center',background:'var(--bg)',borderRadius:8,padding:'8px 10px',border:'1px solid rgba(185,220,210,.5)'}}>
                  <input value={c.icon} onChange={e=>setCats(cats.map((x,j)=>j===i?{...x,icon:e.target.value}:x))} style={{width:44,textAlign:'center',fontSize:18,border:'1px solid rgba(185,220,210,.5)',borderRadius:6,padding:'4px 0',background:'#fff',outline:'none'}}/>
                  <input value={c.label} onChange={e=>setCats(cats.map((x,j)=>j===i?{...x,label:e.target.value}:x))} placeholder="Label" style={{border:'1px solid rgba(185,220,210,.5)',borderRadius:6,padding:'6px 10px',fontSize:12,fontWeight:600,background:'#fff',outline:'none',width:'100%'}}/>
                  <input value={c.value} onChange={e=>setCats(cats.map((x,j)=>j===i?{...x,value:e.target.value}:x))} placeholder="value (no spaces)" style={{border:'1px solid rgba(185,220,210,.5)',borderRadius:6,padding:'6px 10px',fontSize:11,color:'var(--gr)',background:'#fff',outline:'none',width:'100%'}}/>
                  <button onClick={()=>setCats(cats.filter((_,j)=>j!==i))} style={{width:32,height:32,border:'1px solid #fca5a5',borderRadius:6,background:'#fff',color:'#dc2626',cursor:'pointer',fontSize:13,display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
                </div>
              ))}
              {/* Add new category */}
              <div style={{borderTop:'1px solid rgba(185,220,210,.4)',paddingTop:12,marginTop:4}}>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'var(--tl)',textTransform:'uppercase',marginBottom:8}}>Add New Category</div>
                <div style={{display:'grid',gridTemplateColumns:'44px 1fr 1fr auto',gap:8,alignItems:'center'}}>
                  <input value={newCat.icon} onChange={e=>setNewCat(n=>({...n,icon:e.target.value}))} placeholder="🏷️" style={{width:44,textAlign:'center',fontSize:18,border:'1px solid rgba(185,220,210,.5)',borderRadius:6,padding:'6px 0',background:'#fff',outline:'none'}}/>
                  <input value={newCat.label} onChange={e=>setNewCat(n=>({...n,label:e.target.value}))} placeholder="Label" style={{border:'1px solid rgba(185,220,210,.5)',borderRadius:6,padding:'7px 10px',fontSize:12,background:'#fff',outline:'none',width:'100%'}}/>
                  <input value={newCat.value} onChange={e=>setNewCat(n=>({...n,value:e.target.value.toLowerCase().replace(/\s+/g,'-')}))} placeholder="key (auto)" style={{border:'1px solid rgba(185,220,210,.5)',borderRadius:6,padding:'7px 10px',fontSize:11,color:'var(--gr)',background:'#fff',outline:'none',width:'100%'}}/>
                  <button onClick={()=>{
                    const val = newCat.value || newCat.label.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')
                    if(!newCat.label.trim()||cats.some(c=>c.value===val)) return
                    setCats([...cats,{value:val,label:newCat.label,icon:newCat.icon||'🏷️'}])
                    setNewCat({value:'',label:'',icon:'🏷️'})
                  }} style={{whiteSpace:'nowrap',padding:'7px 14px',background:'var(--tl)',color:'#fff',border:'none',borderRadius:6,fontSize:12,fontWeight:700,cursor:'pointer'}}>+ Add</button>
                </div>
              </div>
            </div>
            <div className="m-footer">
              <div/>
              <div className="m-footer-r">
                <button className="cancel-btn" onClick={()=>setCatMgrOpen(false)}>Cancel</button>
                <button className="save-btn" onClick={()=>setCatMgrOpen(false)}>✓ Done</button>
              </div>
            </div>
          </div>
        </div>
      )}
 
      {/* EXTENSION MANAGER MODAL */}
      {extMgrOpen && (
        <div className="modal-bg" onClick={e=>{if(e.target===e.currentTarget)setExtMgrOpen(false)}}>
          <div className="modal" style={{maxWidth:480}}>
            <div className="m-hdr" style={{background:'var(--sf4)'}}>
              <div>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'var(--tl)',textTransform:'uppercase',marginBottom:4}}>Edit Mode</div>
                <div style={{fontSize:20,fontWeight:900,color:'var(--tl)'}}>Manage Extensions</div>
              </div>
              <button className="m-close" onClick={()=>setExtMgrOpen(false)}>✕</button>
            </div>
            <div className="m-body" style={{gap:10}}>
              {exts.map((x,i)=>(
                <div key={x.value} style={{display:'grid',gridTemplateColumns:'36px 1fr 1fr 36px',gap:8,alignItems:'center',background:'var(--bg)',borderRadius:8,padding:'8px 10px',border:'1px solid rgba(185,220,210,.5)'}}>
                  <input type="color" value={x.color} onChange={e=>setExts(exts.map((o,j)=>j===i?{...o,color:e.target.value}:o))} style={{width:32,height:32,border:'none',borderRadius:4,padding:2,cursor:'pointer',background:'none'}}/>
                  <input value={x.label} onChange={e=>setExts(exts.map((o,j)=>j===i?{...o,label:e.target.value}:o))} placeholder="Label" style={{border:'1px solid rgba(185,220,210,.5)',borderRadius:6,padding:'6px 10px',fontSize:12,fontWeight:600,background:'#fff',outline:'none',width:'100%'}}/>
                  <input value={x.value} onChange={e=>setExts(exts.map((o,j)=>j===i?{...o,value:e.target.value}:o))} placeholder="key" style={{border:'1px solid rgba(185,220,210,.5)',borderRadius:6,padding:'6px 10px',fontSize:11,color:'var(--gr)',background:'#fff',outline:'none',width:'100%'}}/>
                  <button onClick={()=>setExts(exts.filter((_,j)=>j!==i))} style={{width:32,height:32,border:'1px solid #fca5a5',borderRadius:6,background:'#fff',color:'#dc2626',cursor:'pointer',fontSize:13,display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
                </div>
              ))}
              <div style={{borderTop:'1px solid rgba(185,220,210,.4)',paddingTop:12,marginTop:4}}>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'var(--tl)',textTransform:'uppercase',marginBottom:8}}>Add New Extension</div>
                <div style={{display:'grid',gridTemplateColumns:'36px 1fr 1fr auto',gap:8,alignItems:'center'}}>
                  <input type="color" value={newExt.color} onChange={e=>setNewExt(n=>({...n,color:e.target.value}))} style={{width:32,height:32,border:'none',borderRadius:4,padding:2,cursor:'pointer',background:'none'}}/>
                  <input value={newExt.label} onChange={e=>setNewExt(n=>({...n,label:e.target.value}))} placeholder="Label" style={{border:'1px solid rgba(185,220,210,.5)',borderRadius:6,padding:'7px 10px',fontSize:12,background:'#fff',outline:'none',width:'100%'}}/>
                  <input value={newExt.value} onChange={e=>setNewExt(n=>({...n,value:e.target.value.toLowerCase().replace(/\s+/g,'-')}))} placeholder="key (auto)" style={{border:'1px solid rgba(185,220,210,.5)',borderRadius:6,padding:'7px 10px',fontSize:11,color:'var(--gr)',background:'#fff',outline:'none',width:'100%'}}/>
                  <button onClick={()=>{
                    const val = newExt.value || newExt.label.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')
                    if(!newExt.label.trim()||exts.some(x=>x.value===val)) return
                    setExts([...exts,{value:val,label:newExt.label.trim(),color:newExt.color}])
                    setNewExt({value:'',label:'',color:'#279989'})
                  }} style={{whiteSpace:'nowrap',padding:'7px 14px',background:'var(--tl)',color:'#fff',border:'none',borderRadius:6,fontSize:12,fontWeight:700,cursor:'pointer'}}>+ Add</button>
                </div>
              </div>
            </div>
            <div className="m-footer">
              <div/>
              <div className="m-footer-r">
                <button className="cancel-btn" onClick={()=>setExtMgrOpen(false)}>Cancel</button>
                <button className="save-btn" onClick={()=>setExtMgrOpen(false)}>✓ Done</button>
              </div>
            </div>
          </div>
        </div>
      )}
 
      {/* EDIT BAR */}
      {editMode && (
        <div className="edit-bar">
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <span className="edit-dot"/>
            <span className="eb-lbl">Edit Mode</span>
            <span className="eb-cnt">{products.length} products</span>
          </div>
          <div style={{display:'flex',gap:8}}>
            <button className="eb-add" onClick={()=>setExtMgrOpen(true)} style={{background:'rgba(255,255,255,.12)',border:'1px solid rgba(255,255,255,.2)'}}>⚙ Extensions</button>
            <button className="eb-add" onClick={()=>setCatMgrOpen(true)} style={{background:'rgba(255,255,255,.12)',border:'1px solid rgba(255,255,255,.2)'}}>⚙ Categories</button>
            <button className="eb-add" onClick={()=>requestAuth('newProduct')}>+ Add Product</button>
            <button className="eb-exit" onClick={exitEdit}>✓ Save & Exit</button>
          </div>
        </div>
      )}
    </div>
  )
}
function BannerEditModal({ banners, aspect, interval, onIntervalChange, onAspectChange, heroVideoUrl, heroVideoThumbnail, heroMediaOrder, onHeroVideoUrlChange, onHeroVideoThumbnailChange, onHeroMediaOrderChange, onAdd, onRemove, onMove, onUpdateBanner, onClose, onUpload }) {
  const fileRef = useRef(null)
  const [editingBanner, setEditingBanner] = useState(null) // id of banner being edited
  const [bannerUploadErr, setBannerUploadErr] = useState('')
 
  const handleFile = async (e) => {
    const file = e.target.files[0]; if (!file) return
    if (!['image/jpeg','image/png','image/webp','image/gif'].includes(file.type)) { e.target.value = ''; return }
    setBannerUploadErr('Uploading banner...')
    try {
      if (!onUpload) throw new Error('Upload route is not configured.')
      const url = await onUpload(file)
      onAdd({ id: 'b' + Date.now(), image: url, alt: file.name.split('.')[0], title:'', subtitle:'', link:'' })
      setBannerUploadErr('')
    } catch (err) {
      console.error(err)
      setBannerUploadErr(err?.message || 'Banner upload failed. Please try again.')
    }
    e.target.value = ''
  }
 
  const editingData = banners.find(b=>b.id===editingBanner)
 
  return (
    <div style={{position:'fixed',inset:0,zIndex:600,background:'rgba(39,153,137,.15)',backdropFilter:'blur(4px)',display:'flex',alignItems:'center',justifyContent:'center',padding:16}} onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <div style={{background:'#fff',borderRadius:16,width:'100%',maxWidth:600,maxHeight:'90vh',display:'flex',flexDirection:'column',boxShadow:'0 24px 80px rgba(39,153,137,.22)'}}>
        <div style={{background:'var(--sf4)',padding:'20px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,borderRadius:'16px 16px 0 0',flexShrink:0}}>
          <div>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'var(--tl)',textTransform:'uppercase',marginBottom:4}}>Hero Section</div>
            <div style={{fontSize:20,fontWeight:900,color:'var(--tl)'}}>Banner Manager</div>
          </div>
          <button onClick={onClose} style={{background:'rgba(0,0,0,.07)',border:'none',borderRadius:'50%',width:34,height:34,cursor:'pointer',fontSize:14,color:'var(--gr)',display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
        </div>
        {bannerUploadErr && <div style={{padding:'9px 24px',background:'rgba(245,158,11,.08)',borderBottom:'1px solid rgba(245,158,11,.16)',fontSize:12,fontWeight:700,color:'#92400e'}}>{bannerUploadErr}</div>}
 
        <div style={{overflow:'auto',padding:24,display:'flex',flexDirection:'column',gap:18,flex:1}}>
          {/* Media layout */}
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:'.06em',color:'var(--tl)',textTransform:'uppercase',marginBottom:10}}>Hero Layout</div>
            <div className="aspect-btns" style={{flexWrap:'wrap',gap:8}}>
              <button className={`aspect-btn ${heroMediaOrder!=='video-banner'?'on':''}`} onClick={()=>onHeroMediaOrderChange('banner-video')}>Banner Left · Video Right</button>
              <button className={`aspect-btn ${heroMediaOrder==='video-banner'?'on':''}`} onClick={()=>onHeroMediaOrderChange('video-banner')}>Video Left · Banner Right</button>
            </div>
            <div style={{fontSize:11,color:'var(--gr)',marginTop:6}}>Controls the two-column arrangement below the headline.</div>
          </div>
 
          {/* YouTube video */}
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:'.06em',color:'var(--tl)',textTransform:'uppercase',marginBottom:10}}>YouTube Video</div>
            <div style={{display:'flex',flexDirection:'column',gap:8,background:'var(--bg)',border:'1px solid var(--sf7)',borderRadius:10,padding:12}}>
              <div>
                <div style={{fontSize:9,fontWeight:700,letterSpacing:'.08em',color:'var(--tl)',textTransform:'uppercase',marginBottom:3}}>YouTube Link</div>
                <input value={heroVideoUrl||''} onChange={e=>onHeroVideoUrlChange(e.target.value)} style={{width:'100%',fontFamily:'var(--fn)',fontSize:12,border:'1px solid var(--sf7)',borderRadius:6,padding:'8px 10px',outline:'none',background:'#fff'}} placeholder="https://www.youtube.com/watch?v=..."/>
              </div>
              <div>
                <div style={{fontSize:9,fontWeight:700,letterSpacing:'.08em',color:'var(--tl)',textTransform:'uppercase',marginBottom:3}}>Custom Thumbnail URL (optional)</div>
                <input value={heroVideoThumbnail||''} onChange={e=>onHeroVideoThumbnailChange(e.target.value)} style={{width:'100%',fontFamily:'var(--fn)',fontSize:12,border:'1px solid var(--sf7)',borderRadius:6,padding:'8px 10px',outline:'none',background:'#fff'}} placeholder="Leave blank to use YouTube thumbnail automatically"/>
              </div>
              {getYouTubeId(heroVideoUrl) && (
                <div style={{border:'1px solid rgba(185,220,210,.65)',borderRadius:8,overflow:'hidden',background:'#111'}}>
                  <div style={{position:'relative',width:'100%',aspectRatio:'16 / 9',overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <img
                      src={heroVideoThumbnail || `https://img.youtube.com/vi/${getYouTubeId(heroVideoUrl)}/hqdefault.jpg`}
                      alt="Video thumbnail preview"
                      style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',objectPosition:'center',display:'block'}}
                    />
                    <span style={{position:'relative',zIndex:1,width:42,height:42,borderRadius:'50%',background:'rgba(255,255,255,.9)',color:'var(--tl)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,paddingLeft:3}}>▶</span>
                  </div>
                </div>
              )}
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                <button
                  type="button"
                  onClick={()=>{ onHeroVideoUrlChange(''); onHeroVideoThumbnailChange('') }}
                  style={{border:'1px solid rgba(239,68,68,.25)',background:'rgba(239,68,68,.06)',color:'#b91c1c',borderRadius:7,padding:'7px 10px',fontFamily:'var(--fn)',fontSize:11,fontWeight:800,cursor:'pointer'}}
                >
                  Remove Video
                </button>
                <button
                  type="button"
                  onClick={()=>onHeroVideoThumbnailChange('')}
                  style={{border:'1px solid var(--sf7)',background:'#fff',color:'var(--tl)',borderRadius:7,padding:'7px 10px',fontFamily:'var(--fn)',fontSize:11,fontWeight:800,cursor:'pointer'}}
                >
                  Use Auto Thumbnail
                </button>
              </div>
              <div style={{fontSize:10,color:'var(--gr)'}}>Paste or replace the YouTube link anytime. Thumbnail preview is locked to a 16:9 frame and will crop neatly if needed.</div>
            </div>
          </div>
 
          {/* Aspect ratio */}
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:'.06em',color:'var(--tl)',textTransform:'uppercase',marginBottom:10}}>Aspect Ratio</div>
            <div className="aspect-btns">
              {[['custom','Custom'],['16:9','16 : 9'],['1:1','1 : 1']].map(([v,l])=>(
                <button key={v} className={`aspect-btn ${aspect===v?'on':''}`} onClick={()=>onAspectChange(v)}>{l}</button>
              ))}
            </div>
            <div style={{fontSize:11,color:'var(--gr)',marginTop:6}}>
              {aspect==='custom' && 'Height follows the first banner image uploaded.'}
              {aspect==='16:9' && 'Fixed widescreen ratio — good for landscape product photos.'}
              {aspect==='1:1' && 'Square format — good for product-focused imagery.'}
            </div>
          </div>
 
          {/* Auto-advance interval */}
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:'.06em',color:'var(--tl)',textTransform:'uppercase',marginBottom:10}}>Slide Transition</div>
            <div className="aspect-btns" style={{flexWrap:'wrap',gap:8}}>
              {[[0,'Manual'],[3,'3s'],[4.5,'4.5s'],[6,'6s'],[8,'8s'],[10,'10s']].map(([v,l])=>(
                <button
                  key={v}
                  className={`aspect-btn ${interval===v?'on':''}`}
                  onClick={()=>onIntervalChange(v)}
                  style={{minWidth:56}}
                >{l}</button>
              ))}
            </div>
            <div style={{fontSize:11,color:'var(--gr)',marginTop:6}}>
              {interval===0 ? 'Banners only advance on manual swipe.' : `Banners auto-advance every ${interval}s. Swipe anytime to override.`}
            </div>
          </div>
 
          {/* Banner list */}
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:'.06em',color:'var(--tl)',textTransform:'uppercase',marginBottom:10}}>Banners ({banners.length})</div>
            <div className="banner-grid">
              {banners.map((b,i)=>(
                <div key={b.id} style={{display:'flex',flexDirection:'column',gap:4}}>
                  <div className="banner-thumb" style={{cursor:'pointer',outline:editingBanner===b.id?'2px solid var(--cy)':'none'}}>
                    <img src={b.image} alt={b.alt}/>
                    <div className="bt-actions">
                      {i>0 && <button onClick={()=>onMove(i,i-1)}>←</button>}
                      {i<banners.length-1 && <button onClick={()=>onMove(i,i+1)}>→</button>}
                      <button onClick={()=>setEditingBanner(editingBanner===b.id?null:b.id)} style={{background:'rgba(45,204,211,.9)',color:'#fff',border:'none',borderRadius:4,padding:'3px 6px',cursor:'pointer',fontSize:11}}>✏️</button>
                      <button className="bt-rm" onClick={()=>{onRemove(b.id);if(editingBanner===b.id)setEditingBanner(null)}}>✕</button>
                    </div>
                  </div>
                  {/* Inline editor for this banner */}
                  {editingBanner===b.id && (
                    <div style={{background:'var(--bg)',borderRadius:8,padding:10,border:'1px solid var(--sf7)',display:'flex',flexDirection:'column',gap:7}}>
                      <div>
                        <div style={{fontSize:9,fontWeight:700,letterSpacing:'.08em',color:'var(--tl)',textTransform:'uppercase',marginBottom:3}}>Banner Title</div>
                        <input value={b.title||''} onChange={e=>onUpdateBanner(b.id,'title',e.target.value)} style={{width:'100%',fontFamily:'var(--fn)',fontSize:12,border:'1px solid var(--sf7)',borderRadius:5,padding:'5px 8px',outline:'none',background:'#fff'}} placeholder="e.g. New Arrivals"/>
                      </div>
                      <div>
                        <div style={{fontSize:9,fontWeight:700,letterSpacing:'.08em',color:'var(--tl)',textTransform:'uppercase',marginBottom:3}}>Subtitle</div>
                        <input value={b.subtitle||''} onChange={e=>onUpdateBanner(b.id,'subtitle',e.target.value)} style={{width:'100%',fontFamily:'var(--fn)',fontSize:12,border:'1px solid var(--sf7)',borderRadius:5,padding:'5px 8px',outline:'none',background:'#fff'}} placeholder="e.g. Shop the latest collection"/>
                      </div>
                      <div>
                        <div style={{fontSize:9,fontWeight:700,letterSpacing:'.08em',color:'var(--tl)',textTransform:'uppercase',marginBottom:3}}>Link (on click)</div>
                        <input value={b.link||''} onChange={e=>onUpdateBanner(b.id,'link',e.target.value)} style={{width:'100%',fontFamily:'var(--fn)',fontSize:12,border:'1px solid var(--sf7)',borderRadius:5,padding:'5px 8px',outline:'none',background:'#fff'}} placeholder="#sip · #savor · #go · #accessories · or https://…"/>
                        <div style={{fontSize:10,color:'var(--gr)',marginTop:3}}>Use #sip, #savor, #go, #accessories to filter by category</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div className="banner-add-zone" onClick={()=>fileRef.current?.click()}>
                <span style={{fontSize:22,color:'var(--tl)'}}>+</span>
                <span style={{fontSize:11,fontWeight:700,color:'var(--tl)'}}>Add Banner</span>
                <span style={{fontSize:10,color:'var(--gr)'}}>JPG, PNG, WebP</span>
              </div>
            </div>
          </div>
        </div>
        <input ref={fileRef} type="file" accept="image/*" style={{display:'none'}} onChange={handleFile}/>
        <div style={{padding:'14px 24px',borderTop:'1px solid rgba(185,220,210,.4)',background:'#fff',borderRadius:'0 0 16px 16px',flexShrink:0}}>
          <button onClick={onClose} style={{background:'var(--tl)',color:'#fff',border:'none',borderRadius:8,padding:'10px 24px',fontFamily:'var(--fn)',fontSize:13,fontWeight:700,cursor:'pointer',width:'100%'}}>Done</button>
        </div>
      </div>
    </div>
  )
}
