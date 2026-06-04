'use client'
import { useState, useEffect, useMemo, useRef, useCallback } from 'react'

// ─── SEED DATA ───────────────────────────────────────────────────────────────
const OG=[{n:'Snow',c:'WT',h:'#F5F5F0'},{n:'Sand',c:'TP',h:'#C8C5BE'},{n:'Stone',c:'GY',h:'#8A8780'},{n:'Onyx',c:'BK',h:'#2A2A28'}]
const XP=[...OG,{n:'Autumn Sunset',c:'AS',h:'#D4894A'},{n:'Forest Green',c:'FG',h:'#3D6B4F'},{n:'Twilight Teal',c:'TT',h:'#2B8090'},{n:'Coral Oasis',c:'CO',h:'#E8524A'}]
const BL=[{n:'Sky',c:'SK',h:'#88C4E8'},{n:'Meadow',c:'ME',h:'#5CBF7A'},{n:'Coral',c:'CO',h:'#FF7A5C'},{n:'Blossom',c:'BL',h:'#F9A8C4'}]
const PP=[{n:'Bubbly',c:'BB',h:'#57C0E8'},{n:'Minty',c:'MT',h:'#48C8C0'},{n:'Purpy',c:'PP',h:'#B09AD8'},{n:'Rosy',c:'RO',h:'#F070A0'}]
const mk=(base,pal)=>pal.map(c=>({name:c.n,code:c.c,hex:c.h,sku:`${base}-${c.c}`}))

const SEED=[
  {id:'p1',name:'Dual Flow Insulated Tumbler 550ml',ext:'core',cat:'sip',desc:'A 2-way spout insulated tumbler designed to keep beverages at the desired temperature. Double wall vacuum insulation keeps drinks cold 24h and hot 12h.',badges:['Double Wall','BPA-Free','Temp. Retention','18/8 Stainless Steel','Powder Coated'],srp:799.75,packing:25,colors:mk('QNH-DFIT550',OG),images:[],dimensions:{headers:[''],rows:[['']],},barcode:'',barcodeImage:'',qrCode:'',qrImage:'',youtube:''},
  {id:'p2',name:'Dual Flow Insulated Tumbler 900ml',ext:'core',cat:'sip',desc:'Larger 2-way spout insulated tumbler for all-day hydration. Same dual flow technology in a bigger 900ml capacity.',badges:['Double Wall','BPA-Free','Temp. Retention','18/8 Stainless Steel','Powder Coated'],srp:999.75,packing:16,colors:mk('QNH-DFIT900',OG),images:[],dimensions:{headers:[''],rows:[['']],},barcode:'',barcodeImage:'',qrCode:'',qrImage:'',youtube:''},
  {id:'p3',name:'Insulated Tumbler 550ml with Silicone Boot',ext:'core',cat:'sip',desc:'Insulated tumbler with protective silicone boot for a non-slip grip. BPA-free, keeps drinks cold or hot all day.',badges:['Double Wall','BPA-Free','Temp. Retention','18/8 Stainless Steel','Powder Coated'],srp:799.75,packing:16,colors:mk('QNH-IT550',XP),images:[],dimensions:{headers:[''],rows:[['']],},barcode:'',barcodeImage:'',qrCode:'',qrImage:'',youtube:''},
  {id:'p4',name:'Insulated Tumbler 1100ml with Silicone Boot',ext:'core',cat:'sip',desc:'Extra-large insulated tumbler with silicone boot. Perfect for athletes, gym sessions, and long workdays.',badges:['Double Wall','BPA-Free','Temp. Retention','18/8 Stainless Steel','Powder Coated'],srp:999.75,packing:8,colors:mk('QNH-IT1100',XP),images:[],dimensions:{headers:[''],rows:[['']],},barcode:'',barcodeImage:'',qrCode:'',qrImage:'',youtube:''},
  {id:'p5',name:'Insulated Sports Water Tumbler 2200ml',ext:'core',cat:'sip',desc:'Massive insulated sports jug for athletes and outdoor enthusiasts. Double wall vacuum insulation maintains temperature for extended periods.',badges:['Double Wall','BPA-Free','Temp. Retention','18/8 Stainless Steel','Powder Coated'],srp:1999.75,packing:8,colors:mk('QNH-SIT2200',OG),images:[],dimensions:{headers:[''],rows:[['']],},barcode:'',barcodeImage:'',qrCode:'',qrImage:'',youtube:''},
  {id:'p6',name:'Insulated Mug Tumbler 1100ml',ext:'core',cat:'sip',desc:'Insulated coffee mug tumbler with handle and straw lid. Keeps coffee at the perfect temperature all day long.',badges:['Double Wall','BPA-Free','Temp. Retention','18/8 Stainless Steel','Powder Coated'],srp:799.75,packing:12,colors:mk('QNH-IMT1100',XP),images:[],dimensions:{headers:[''],rows:[['']],},barcode:'',barcodeImage:'',qrCode:'',qrImage:'',youtube:''},
  {id:'p7',name:'Insulated Coffee Mug 400ml',ext:'core',cat:'sip',desc:'Insulated desk coffee mug with flip lid for home or office use. Keeps coffee at the perfect temperature while you work.',badges:['Double Wall','BPA-Free','Temp. Retention','18/8 Stainless Steel','Powder Coated'],srp:799.75,packing:16,colors:mk('QNH-ICM400',OG),images:[],dimensions:{headers:[''],rows:[['']],},barcode:'',barcodeImage:'',qrCode:'',qrImage:'',youtube:''},
  {id:'p8',name:'Insulated Water Jug 2100ml',ext:'core',cat:'sip',desc:'Heavy-duty insulated water jug with carry handle. Ideal for outdoor activities, camping, and sports events.',badges:['Double Wall','BPA-Free','Temp. Retention','18/8 Stainless Steel','Powder Coated'],srp:1999.75,packing:6,colors:mk('QNH-IWJ2100',OG),images:[],dimensions:{headers:[''],rows:[['']],},barcode:'',barcodeImage:'',qrCode:'',qrImage:'',youtube:''},
  {id:'p9',name:'Water Bottle 1100ml',ext:'core',cat:'sip',desc:'BPA-free polypropylene water bottle with leak-proof lid. Lightweight and perfect for everyday hydration.',badges:['BPA-Free','Polypropylene','Leak-Proof'],srp:199.75,packing:24,colors:mk('QNH-WB1100',XP),images:[],dimensions:{headers:[''],rows:[['']],},barcode:'',barcodeImage:'',qrCode:'',qrImage:'',youtube:''},
  {id:'p10',name:'Insulated Lunch Box 1300ml',ext:'core',cat:'savor',desc:'2-layer insulated lunch box that keeps meals warm or cold. Dual layers separate different food types in one compact container.',badges:['20/10 Stainless Steel','BPA-Free','Air-Vent','Silicone Seal Ring','Hot Temp.'],srp:749.75,packing:36,colors:mk('QNH-ILB1300',OG),images:[],dimensions:{headers:[''],rows:[['']],},barcode:'',barcodeImage:'',qrCode:'',qrImage:'',youtube:''},
  {id:'p11',name:'Food Storage Container Set 230ml',ext:'core',cat:'savor',desc:'Stackable BPA-free food storage containers with silicone seal ring and snap-lock lid. Perfect for meal prep.',badges:['BPA-Free','Leak-Proof','Silicone Seal Ring','Stackable Lid'],srp:399.75,packing:36,colors:mk('QNH-FSCS230',XP),images:[],dimensions:{headers:[''],rows:[['']],},barcode:'',barcodeImage:'',qrCode:'',qrImage:'',youtube:''},
  {id:'p12',name:'Food Storage Container Set 390ml',ext:'core',cat:'savor',desc:'Medium stackable BPA-free food storage containers. Larger capacity for bigger meals with the same secure seal.',badges:['BPA-Free','Leak-Proof','Silicone Seal Ring','Stackable Lid'],srp:399.75,packing:36,colors:mk('QNH-FSCS390',XP),images:[],dimensions:{headers:[''],rows:[['']],},barcode:'',barcodeImage:'',qrCode:'',qrImage:'',youtube:''},
  {id:'p13',name:'New Bone Porcelain Mug 325ml',ext:'core',cat:'savor',desc:'Exquisite New Bone China mugs. 100% lead-free with a perfect balance of elegance and practicality.',badges:['New Bone Porcelain','100% Lead-Free','Strong & Durable','Hot Temp.'],srp:129.75,packing:36,colors:mk('QNH-NBMDIA',XP),images:[],dimensions:{headers:[''],rows:[['']],},barcode:'',barcodeImage:'',qrCode:'',qrImage:'',youtube:''},
  {id:'p14',name:'Insulated Tote Bag',ext:'core',cat:'go',desc:'Thermal tote bag with high-quality insulated lining. 14L capacity, water-proof non-woven fabric. Keeps meals fresh on the go.',badges:['Non-Woven Fabric','Water Proof','14L Capacity','Temp. Retention'],srp:299.75,packing:60,colors:mk('QNH-ITTB',XP),images:[],dimensions:{headers:[''],rows:[['']],},barcode:'',barcodeImage:'',qrCode:'',qrImage:'',youtube:''},
  {id:'p15',name:'Silicone Boot 37oz',ext:'core',cat:'accessories',desc:'Protective silicone boot designed to fit snugly around the bottom of your tumbler. Non-slip grip prevents dents, scratches, and spills.',badges:['Non-Slip','BPA-Free','Thermal Silicone'],srp:149.75,packing:100,colors:mk('QNH-BOOTL',XP),images:[],dimensions:{headers:[''],rows:[['']],},barcode:'',barcodeImage:'',qrCode:'',qrImage:'',youtube:''},
  {id:'p16',name:'Kids Travel Water Bottle 500ml — Bloom',ext:'kids',cat:'sip',desc:'Spill-proof kids water bottle with built-in straw and vibrant Bloom designs. BPA-free polycarbonate. Perfect for school, sports, and outdoor adventures.',badges:['Dual Speed Lid','BPA-Free','Built-in Straw','Leak-Proof','Rubber Grip'],srp:249.75,packing:24,colors:mk('QNH-KDTWB500',BL),images:[],dimensions:{headers:[''],rows:[['']],},barcode:'',barcodeImage:'',qrCode:'',qrImage:'',youtube:''},
  {id:'p17',name:'Kids Travel Water Bottle 500ml — Poply',ext:'kids',cat:'sip',desc:'Bold and playful kids water bottle in the vibrant Poply collection. Spill-proof lid, built-in straw, and BPA-free polycarbonate.',badges:['Dual Speed Lid','BPA-Free','Built-in Straw','Leak-Proof','Rubber Grip'],srp:249.75,packing:24,colors:mk('QNH-KDTWBP500',PP),images:[],dimensions:{headers:[''],rows:[['']],},barcode:'',barcodeImage:'',qrCode:'',qrImage:'',youtube:''},
  {id:'p18',name:'Insulated Pet Tumbler 550ml',ext:'pets',cat:'accessories',desc:"Double-wall insulated pet tumbler. Keeps your pet's water cool and fresh for up to 18h cold and 8h hot. Portable and leak-proof.",badges:['Double Wall','BPA-Free','18/8 Stainless Steel','18h Cold','8h Hot'],srp:799.75,packing:25,colors:mk('QNH-PT550',OG),images:[],dimensions:{headers:[''],rows:[['']],},barcode:'',barcodeImage:'',qrCode:'',qrImage:'',youtube:''},
  {id:'p19',name:'Portable Desk Fan',ext:'tech',cat:'accessories',desc:'Compact, lightweight portable desk fan. 2000mAh battery, 8hrs operating time, 3hr charging. Perfect for offices, bedrooms, and travel.',badges:['2000mAh Battery','8hr Operation','3hr Charging','USB Port','Compact'],srp:999.75,packing:60,colors:mk('QNH-TPDF',OG),images:[],dimensions:{headers:[''],rows:[['']],},barcode:'',barcodeImage:'',qrCode:'',qrImage:'',youtube:''},
]

const EDIT_PASSWORD = 'quencha2026'
const EXT_LABELS = {core:'Quencha Core',kids:'Quencha Kids',pets:'Quencha Pets',tech:'Quencha Tech'}
const CAT_LABELS = {sip:'SIP — Drinkware',savor:'SAVOR — Lunch & Food',go:'GO — Bags & Carry',accessories:'Accessories'}
const EXT_ORDER = ['core','kids','pets','tech']
const CAT_ORDER = ['sip','savor','go','accessories']
const EXT_COLORS = {core:'#279989',kids:'#5891c4',pets:'#b06820',tech:'#2B4C5E'}
const CAT_ICONS = {sip:'💧',savor:'🍱',go:'👜',accessories:'⚙️'}

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
.tb-brand{display:flex;align-items:baseline;gap:8px;flex-shrink:0;text-decoration:none;cursor:pointer}
.tb-wm{font-size:20px;font-weight:900;letter-spacing:.08em;color:#fff;text-transform:uppercase}
.tb-tg{font-size:11px;color:rgba(255,255,255,.55);letter-spacing:.06em;font-style:italic}
.tb-search-wrap{flex:1;max-width:420px;position:relative;margin:0 auto}
.tb-search-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);opacity:.55;pointer-events:none;color:#fff}
.tb-search{width:100%;background:rgba(255,255,255,.13);border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:8px 36px;font-family:var(--fn);font-size:13px;color:#fff;outline:none;transition:var(--tr)}
.tb-search::placeholder{color:rgba(255,255,255,.45)}
.tb-search:focus{background:rgba(255,255,255,.2);border-color:var(--cy)}
.tb-clear{position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;color:rgba(255,255,255,.5);cursor:pointer;font-size:13px}
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
.qnh-sidebar{width:var(--sw);background:var(--bk);position:fixed;top:var(--nh);bottom:0;left:0;overflow-y:auto;z-index:100}
.qnh-sidebar::-webkit-scrollbar{width:4px}
.qnh-sidebar::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:2px}
.sb-hero{padding:20px 20px 16px;border-bottom:1px solid rgba(255,255,255,.07)}
.sb-hl{font-size:9px;font-weight:700;letter-spacing:.14em;color:rgba(255,255,255,.25);text-transform:uppercase;margin-bottom:2px}
.sb-total{font-size:28px;font-weight:900;color:var(--cy);line-height:1}
.sb-sub{font-size:11px;color:rgba(255,255,255,.3)}
.sb-sec{padding:12px 12px 4px}
.sb-lbl{font-size:9px;font-weight:700;letter-spacing:.14em;color:rgba(255,255,255,.2);text-transform:uppercase;display:block;padding:4px 8px 8px}
.fb{display:flex;width:100%;align-items:center;gap:8px;padding:8px 10px;border-radius:6px;border:2px solid transparent;background:transparent;cursor:pointer;color:rgba(255,255,255,.45);font-family:var(--fn);font-size:12px;font-weight:500;transition:var(--tr);text-align:left;margin-bottom:1px}
.fb:hover{background:rgba(255,255,255,.05);color:rgba(255,255,255,.8)}
.fb.on{background:rgba(45,204,211,.1);color:var(--cy);border-left-color:var(--cy)!important}
.fb-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
.fb-ico{font-size:13px;flex-shrink:0}
.fb-lbl{flex:1}
.fb-cnt{font-size:10px;padding:1px 6px;border-radius:999px;background:rgba(255,255,255,.07);color:rgba(255,255,255,.3)}
.fb.on .fb-cnt{background:rgba(45,204,211,.18);color:var(--cy)}
.sb-div{border:none;border-top:1px solid rgba(255,255,255,.06);margin:6px 16px}
.pc-wrap{display:flex;flex-wrap:wrap;gap:6px;padding:4px 12px 10px}
.pc{font-size:11px;font-weight:600;padding:4px 10px;border-radius:999px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.4);cursor:pointer;transition:var(--tr);font-family:var(--fn)}
.pc:hover{border-color:var(--cy);color:var(--cy)}
.pc.on{background:rgba(45,204,211,.15);border-color:var(--cy);color:var(--cy)}
.clear-filters{display:block;margin:8px 16px 0;width:calc(100% - 32px);background:none;border:1px solid rgba(255,255,255,.1);border-radius:6px;color:rgba(255,255,255,.35);font-family:var(--fn);font-size:11px;font-weight:700;padding:7px;cursor:pointer;transition:var(--tr)}
.clear-filters:hover{border-color:rgba(255,255,255,.3);color:rgba(255,255,255,.7)}

/* MOBILE */
.mob-filter-btn{display:none;position:fixed;bottom:80px;left:16px;z-index:150;background:var(--tl);color:#fff;border:none;border-radius:999px;padding:10px 18px;font-family:var(--fn);font-size:13px;font-weight:700;cursor:pointer;box-shadow:0 4px 16px rgba(39,153,137,.4);align-items:center;gap:6px}
.mob-overlay{position:fixed;inset:0;z-index:400;background:rgba(0,0,0,.4);backdrop-filter:blur(2px)}
.mob-drawer{position:absolute;top:0;left:0;bottom:0;width:280px;background:var(--bk);overflow-y:auto;padding-top:44px}
.drawer-close{position:absolute;top:10px;right:10px;background:rgba(255,255,255,.08);border:none;border-radius:50%;width:32px;height:32px;color:rgba(255,255,255,.6);font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center}

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
.pgrid.col-2{grid-template-columns:repeat(2,1fr)!important}
.pgrid.col-1{grid-template-columns:1fr!important}

/* PRODUCT CARD */
.pcard{background:var(--wh);border:1px solid rgba(185,220,210,.4);border-radius:var(--r);overflow:hidden;box-shadow:var(--sh);transition:var(--tr);cursor:pointer;display:flex;flex-direction:column;position:relative}
.pcard:not(.em):hover{transform:translateY(-3px);box-shadow:var(--shh);border-color:rgba(45,204,211,.3)}
.pcard.em{border:1.5px dashed rgba(245,158,11,.35)}
.pcard.em:hover{transform:none;box-shadow:var(--sh);border-color:rgba(245,158,11,.55)}

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
.c-sku{display:inline-block;font-size:10px;font-weight:700;font-family:monospace;background:var(--bg);border:1px solid rgba(185,220,210,.5);border-radius:4px;padding:2px 6px;color:var(--gr);align-self:flex-start;width:fit-content}

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
.vm-thumb{width:64px;height:64px;border-radius:6px;overflow:hidden;border:2px solid transparent;cursor:pointer;transition:var(--tr);background:var(--sf4);flex-shrink:0;position:relative}
.vm-thumb.on{border-color:var(--cy)}
.vm-thumb img{width:100%;height:100%;object-fit:cover;object-position:center;display:block}
.vm-badges{display:flex;flex-wrap:wrap;gap:6px}
.vm-badge{font-size:11px;font-weight:700;padding:3px 10px;border-radius:999px;background:rgba(185,220,210,.4);color:var(--tl)}
.vm-desc{font-size:14px;color:var(--bk);line-height:1.65}
.vm-price-row{display:flex;gap:24px;align-items:flex-end}
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
.vm-swatch{display:inline-block;width:10px;height:10px;border-radius:50%;vertical-align:middle;margin-right:7px;border:1px solid rgba(0,0,0,.1)}
.vm-code{font-family:monospace;font-size:11px;color:var(--tl)}
/* COLOR LIST */
.vm-color-sec-lbl{font-size:10px;font-weight:700;letter-spacing:.1em;color:var(--tl);text-transform:uppercase;margin-bottom:10px;display:block}
.vm-color-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px}
.vm-color-item{display:flex;align-items:center;gap:10px;background:var(--bg);border:1px solid rgba(185,220,210,.5);border-radius:8px;padding:8px 12px}
.vm-color-swatch{width:28px;height:28px;border-radius:50%;flex-shrink:0;border:2px solid rgba(255,255,255,.8);box-shadow:0 1px 4px rgba(0,0,0,.15)}
.vm-color-info{display:flex;flex-direction:column;gap:2px;min-width:0}
.vm-color-name{font-size:12px;font-weight:700;color:var(--bk);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.vm-color-sku{font-family:monospace;font-size:10px;font-weight:700;color:var(--tl);letter-spacing:.04em;transition:color .15s}
.copyable{cursor:pointer;user-select:none}
.vm-color-item.copyable:hover{background:rgba(185,220,210,.5);border-color:var(--cy)}
.vm-color-item.sku-copied{background:rgba(45,204,211,.1);border-color:var(--cy)}
.vm-color-item.sku-copied .vm-color-sku{color:var(--cy)}
.c-sku.copyable:hover{background:var(--sf4);border-color:var(--cy);color:var(--tl)}
.vm-actions{display:flex;gap:10px;flex-wrap:wrap}
.vm-pencil-btn{width:44px;height:44px;border-radius:50%;border:none;background:rgba(39,153,137,.1);color:var(--tl);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:var(--tr);flex-shrink:0}
.vm-pencil-btn:hover{background:rgba(39,153,137,.2);transform:scale(1.08)}
.vm-inq-btn{flex:1;background:var(--tl);border:none;border-radius:8px;padding:11px 16px;font-family:var(--fn);font-size:13px;font-weight:700;color:#fff;cursor:pointer;transition:var(--tr)}
.vm-inq-btn:hover{background:var(--tl2)}

/* EDIT MODAL */
.edit-modal-inner{max-width:680px}
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
.color-table-head{display:grid;grid-template-columns:38px 1fr 68px 1fr 28px;gap:8px;font-size:10px;font-weight:700;letter-spacing:.08em;color:var(--gr);text-transform:uppercase;padding:0 4px 6px;border-bottom:1px solid rgba(185,220,210,.4);margin-bottom:4px}
.color-row{display:grid;grid-template-columns:38px 1fr 68px 1fr 28px;gap:8px;align-items:center;margin-bottom:6px}
.cp{width:34px;height:34px;border:none;border-radius:6px;cursor:pointer;padding:2px;background:none}
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
  .mob-filter-btn{display:flex}
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
  .tb-edit-btn span:last-child{display:none}
  .qnh-main{padding:16px 14px 100px}
  .hero{padding:20px 16px}
  .h-ti{font-size:28px}
  .modal-bg{padding:0;align-items:flex-end}
  .modal{max-height:96vh;border-radius:var(--rl) var(--rl) 0 0}
  .edit-bar{bottom:12px;left:12px;right:12px;transform:none;border-radius:12px}
  .eb-cnt{display:none}
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
const COLLECTION_ORDER = ['OG', 'XPRESS', 'Horizon', 'Bloom', 'Poply']
const COLLECTION_COLORS = {
  OG: 'var(--gr)',
  XPRESS: 'var(--tl)',
  Horizon: '#9B7EA8',
  Bloom: '#5CB8A0',
  Poply: '#E070A0',
}

function groupColorsByCollection(colors) {
  const groups = {}
  colors.forEach(clr => {
    const col = COLOR_COLLECTION_MAP[clr.name] || 'Other'
    if (!groups[col]) groups[col] = []
    groups[col].push(clr)
  })
  // Return in defined order, then any "Other"
  const ordered = []
  COLLECTION_ORDER.forEach(name => { if (groups[name]) ordered.push({ name, colors: groups[name] }) })
  if (groups['Other']) ordered.push({ name: 'Other', colors: groups['Other'] })
  return ordered
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

// ─── HERO CAROUSEL COMPONENT ─────────────────────────────────────────────────
function HeroCarousel({ banners, aspect, interval, editMode, onEditClick, heroTitle, heroSub, onTitleChange, onSubChange, onBannerClick }) {
  const [slide, setSlide] = useState(0)
  const timerRef = useRef(null)
  const touchStartX = useRef(null)
  const touchStartY = useRef(null)
  const arClass = aspect === '16:9' ? 'ar-16-9' : aspect === '1:1' ? 'ar-1-1' : 'ar-custom'

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current)
    if (banners.length > 1 && interval > 0) {
      timerRef.current = setInterval(() => setSlide(s => (s + 1) % banners.length), interval * 1000)
    }
  }, [banners.length, interval])

  useEffect(() => { startTimer(); return () => clearInterval(timerRef.current) }, [startTimer])
  const go = (dir) => { setSlide(s => (s + dir + banners.length) % banners.length); startTimer() }

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
      {/* ── HEADLINE + SUBHEADLINE — completely separate from carousel ── */}
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

      {/* ── CAROUSEL — completely separate block, only if banners exist ── */}
      {banners.length > 0 && (
        <div style={{borderRadius:'var(--rl)',overflow:'hidden',marginBottom:32,background:'var(--wh)',border:'1px solid rgba(185,220,210,.4)',boxShadow:'var(--sh)'}}>
          {/* Image area */}
          <div style={{position:'relative'}}>
            <div className={`hero-carousel ${arClass}`} style={{borderRadius:0,marginBottom:0}}>
              <div className="hero-slides" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={{userSelect:"none"}}>
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

          {/* ── PER-BANNER TEXT — below the image, not overlay ── */}
          {(currentBanner?.title || currentBanner?.subtitle || currentBanner?.link) && (
            <div style={{padding:'16px 20px',borderTop:'1px solid rgba(185,220,210,.3)',display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
              <div>
                {currentBanner.title && <div style={{fontFamily:'var(--fn)',fontSize:15,fontWeight:700,color:'var(--bk)',lineHeight:1.3,marginBottom:3}}>{currentBanner.title}</div>}
                {currentBanner.subtitle && <div style={{fontFamily:'var(--fn)',fontSize:13,color:'var(--gr)',lineHeight:1.5}}>{currentBanner.subtitle}</div>}
              </div>
              {currentBanner.link && (
                <button
                  onClick={()=>onBannerClick(currentBanner.link)}
                  style={{background:'var(--tl)',color:'#fff',border:'none',borderRadius:8,padding:'8px 16px',fontFamily:'var(--fn)',fontSize:12,fontWeight:700,cursor:'pointer',whiteSpace:'nowrap',flexShrink:0,transition:'var(--tr)'}}
                >
                  View →
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </>
  )
}


// ─── YOUTUBE BLOCK COMPONENT ─────────────────────────────────────────────────
function YouTubeBlock({ ytUrl, ytPlaying, setYtPlaying }) {
  if (!ytUrl) return null
  const ytId = getYouTubeId(ytUrl)
  if (!ytId) return null
  const watchUrl = `https://www.youtube.com/watch?v=${ytId}`
  return (
    <div style={{borderRadius:10,overflow:'hidden',border:'1px solid rgba(185,220,210,.4)',background:'#000'}}>
      {ytPlaying ? (
        <div style={{position:'relative',width:'100%',paddingBottom:'56.25%'}}>
          <iframe
            style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',border:'none'}}
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`}
            title="Product video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : (
        <div
          onClick={()=>setYtPlaying(true)}
          style={{position:'relative',width:'100%',paddingBottom:'56.25%',cursor:'pointer',background:'#111'}}
        >
          <img
            src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
            alt="Product video"
            style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',objectFit:'cover',opacity:.85}}
            onError={e=>{e.target.style.opacity=0}}
          />
          <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{width:68,height:68,borderRadius:'50%',background:'#FF0000',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 4px 24px rgba(0,0,0,.5)'}}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><polygon points="6,3 20,12 6,21"/></svg>
            </div>
          </div>
          <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'24px 14px 10px',background:'linear-gradient(to bottom,transparent,rgba(0,0,0,.72))'}}>
            <div style={{color:'#fff',fontSize:12,fontWeight:700,letterSpacing:'.04em'}}>▶ WATCH PRODUCT VIDEO</div>
          </div>
        </div>
      )}
      <a
        href={watchUrl}
        target="_blank"
        rel="noreferrer"
        style={{display:'flex',alignItems:'center',gap:8,padding:'10px 14px',background:'rgba(255,255,255,.05)',color:'rgba(255,255,255,.65)',fontSize:12,fontWeight:600,textDecoration:'none',borderTop:'1px solid rgba(255,255,255,.1)'}}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#FF0000"><path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.2 2.8 12 2.8 12 2.8s-4.2 0-6.8.2c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.2v1.9C.7 15.2 1 17.3 1 17.3s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.6 21.5 12 21.5 12 21.5s4.2 0 6.8-.3c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.2v-1.9C23.3 9.1 23 7 23 7zM9.7 15.5V8.4l8.1 3.6-8.1 3.5z"/></svg>
        Open on YouTube →
      </a>
    </div>
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

// ─── CODE IMAGE UPLOAD (barcode / QR) ────────────────────────────────────────
function CodeImageUpload({ label, value, onChange, onClear, onUpload }) {
  const ref = useRef(null)
  const [uploading, setUploading] = useState(false)

  const handleFile = async (e) => {
    const file = e.target.files[0]; if (!file) return
    if (!['image/jpeg','image/png','image/webp','image/gif'].includes(file.type)) return
    if (onUpload) {
      setUploading(true)
      try { const url = await onUpload(file); onChange(url) }
      catch { /* fallback to base64 */
        const reader = new FileReader()
        reader.onload = ev => onChange(ev.target.result)
        reader.readAsDataURL(file)
      } finally { setUploading(false) }
    } else {
      const reader = new FileReader()
      reader.onload = ev => onChange(ev.target.result)
      reader.readAsDataURL(file)
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

  // Fetch all data on mount — auto-seed if empty
  useEffect(() => {
    Promise.all([
      fetch('/api/products').then(r=>r.json()),
      fetch('/api/settings').then(r=>r.json()),
    ]).then(async ([prods, settings]) => {
      // Auto-seed products if Redis is empty
      if (!Array.isArray(prods) || prods.length === 0) {
        await Promise.all(SEED.map(p =>
          fetch('/api/products', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(p) })
        ))
        setProducts(SEED)
      } else {
        setProducts(prods)
      }
      if (settings.banners)                      setBanners(settings.banners)
      if (settings.bannerAspect)                 setBannerAspect(settings.bannerAspect)
      if (settings.bannerInterval !== undefined) setBannerIntervalVal(settings.bannerInterval)
      if (settings.heroTitle)                    setHeroTitle(settings.heroTitle)
      if (settings.heroSub)                      setHeroSub(settings.heroSub)
      setLoading(false)
    }).catch(() => { setProducts(SEED); setLoading(false) })
  }, [])

  // ── FILTERS ──
  const [filterExt, setFilterExt] = useState('all')
  const [filterCat, setFilterCat] = useState(null)
  const [filterPMin, setFilterPMin] = useState(null)
  const [filterPMax, setFilterPMax] = useState(null)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')
  const [view, setView] = useState('col-2')
  const [showMobileFilter, setShowMobileFilter] = useState(false)

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
  const [ytPlaying, setYtPlaying] = useState(false)
  const [banners, setBanners] = useState([])
  const [bannerAspect, setBannerAspect] = useState('custom')
  const [bannerEditOpen, setBannerEditOpen] = useState(false)


  const syncSettings = useCallback((patch) => {
    fetch('/api/settings', { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(patch) }).catch(console.error)
  }, [])

  const saveBanners = useCallback((b) => { setBanners(b); syncSettings({ banners: b }) }, [syncSettings])
  const saveAspect = useCallback((a) => { setBannerAspect(a); syncSettings({ bannerAspect: a }) }, [syncSettings])
  const [bannerInterval, setBannerIntervalVal] = useState(4.5)
  const saveBannerInterval = useCallback((v) => { setBannerIntervalVal(v); syncSettings({ bannerInterval: v }) }, [syncSettings])

  const [heroTitle, setHeroTitle] = useState('Sip, Savor & Go.')
  const [heroSub, setHeroSub] = useState('Complete product lineup — drinkware, lunch essentials, bags, accessories, kids, pets & tech.')
  const saveHeroTitle = useCallback((v) => { setHeroTitle(v); syncSettings({ heroTitle: v }) }, [syncSettings])
  const saveHeroSub = useCallback((v) => { setHeroSub(v); syncSettings({ heroSub: v }) }, [syncSettings])
  const { copy, copied } = useCopy()

  // ── API HELPERS ──
  const apiCreateProduct = useCallback(async (product) => {
    await fetch('/api/products', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(product) }).catch(console.error)
  }, [])

  const apiSaveProduct = useCallback(async (id, data) => {
    await fetch('/api/products/' + id, { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) }).catch(console.error)
  }, [])

  // ── IMAGE UPLOAD via Vercel Blob ──
  const uploadImageToBlob = useCallback(async (file) => {
    const fd = new FormData(); fd.append('file', file)
    const res = await fetch('/api/upload', { method:'POST', body: fd })
    if (!res.ok) throw new Error('Upload failed')
    const { url } = await res.json()
    return url
  }, [])
  const [editOpen, setEditOpen] = useState(false)
  const [editTarget, setEditTarget] = useState(null) // null = new
  const [inqOpen, setInqOpen] = useState(false)
  const [codeLightbox, setCodeLightbox] = useState(null) // {src, label}

  // Edit form
  const [ef, setEf] = useState({ name:'',ext:'core',cat:'sip',srp:'',packing:'',desc:'',badges:[],colors:[],images:[] })
  const [editTab, setEditTab] = useState('details')
  const [badgeInput, setBadgeInput] = useState('')
  const [newColor, setNewColor] = useState({ name:'',code:'',hex:'#B9DCD2',sku:'' })
  const [uploadErr, setUploadErr] = useState('')
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
    setEf({ name:p.name,ext:p.ext,cat:p.cat,srp:p.srp,packing:p.packing,desc:p.desc,badges:[...p.badges],colors:p.colors.map(c=>({...c})),images:[...(p.images||[])],dimensions:p.dimensions&&typeof p.dimensions==='object'?{headers:[...p.dimensions.headers],rows:p.dimensions.rows.map(r=>[...r])}:{headers:[''],rows:[['']],},barcode:p.barcode||'',barcodeImage:p.barcodeImage||'',qrCode:p.qrCode||'',qrImage:p.qrImage||'',youtube:p.youtube||'' })
    setEditTab('details'); setBadgeInput(''); setNewColor({name:'',code:'',hex:'#B9DCD2',sku:''}); setUploadErr('')
    setEditOpen(true)
  }
  const openNewProduct = () => {
    setEditTarget(null)
    setEf({ name:'',ext:'core',cat:'sip',srp:'',packing:'',desc:'',badges:[],colors:[],images:[],dimensions:{headers:[''],rows:[['']],},barcode:'',barcodeImage:'',qrCode:'',qrImage:'',youtube:'' })
    setEditTab('details'); setBadgeInput(''); setNewColor({name:'',code:'',hex:'#B9DCD2',sku:''}); setUploadErr('')
    setEditOpen(true)
  }

  const saveProduct = () => {
    if (!ef.name.trim()) { alert('Product name is required.'); return }
    const srp = parseFloat(ef.srp)
    if (!srp || srp <= 0) { alert('Valid price is required.'); return }
    const data = { ...ef, srp, packing: parseInt(ef.packing) || 0, dimensions: ef.dimensions, barcode: ef.barcode||'', barcodeImage: ef.barcodeImage||'', qrCode: ef.qrCode||'', qrImage: ef.qrImage||'', youtube: ef.youtube||'' }
    if (editTarget) {
      const saved = { ...editTarget, ...data }
      const updated = products.map(p => p.id === editTarget.id ? saved : p)
      setProducts(updated)
      apiSaveProduct(editTarget.id, saved)
      setEditOpen(false)
      setViewProduct(saved)
      setVmImg(0)
    } else {
      const saved = { ...data, id: 'p' + Date.now() }
      setProducts([...products, saved])
      apiCreateProduct(saved)
      setEditOpen(false)
    }
  }

  const deleteProduct = async (id) => {
    if (!confirm('Delete this product? This cannot be undone.')) return
    setProducts(products.filter(p => p.id !== id))
    setEditOpen(false); setViewProduct(null)
    await fetch('/api/products/' + id, { method: 'DELETE' }).catch(console.error)
  }

  // Badges
  const addBadge = () => { const b = badgeInput.trim(); if (b && !ef.badges.includes(b)) { setEf(f=>({...f,badges:[...f.badges,b]})); setBadgeInput('') } }
  const removeBadge = (b) => setEf(f=>({...f,badges:f.badges.filter(x=>x!==b)}))

  // Colors
  const addColor = () => {
    const { name, code, hex, sku } = newColor
    if (!name || !code || !sku) { alert('Name, code, and SKU required.'); return }
    setEf(f=>({...f,colors:[...f.colors,{name,code:code.toUpperCase(),hex,sku:sku.toUpperCase()}]}))
    setNewColor({ name:'',code:'',hex:'#B9DCD2',sku:'' })
  }
  const removeColor = (i) => setEf(f=>({...f,colors:f.colors.filter((_,j)=>j!==i)}))
  const updateColor = (i,k,v) => setEf(f=>({...f,colors:f.colors.map((c,j)=>j===i?{...c,[k]:k==='sku'||k==='code'?v.toUpperCase():v}:c)}))

  // Images
  const handleImgUpload = async (e) => {
    const file = e.target.files[0]; if (!file) return
    if (!['image/jpeg','image/png','image/webp','image/gif'].includes(file.type)) { setUploadErr('Invalid file type. Use JPG, PNG, or WebP.'); return }
    if (file.size > 8*1024*1024) { setUploadErr('File too large. Max 8MB.'); return }
    setUploadErr('')
    try {
      const url = await uploadImageToBlob(file)
      setEf(f=>({...f,images:[...f.images,url]}))
    } catch {
      const reader = new FileReader()
      reader.onload = ev => setEf(f=>({...f,images:[...f.images,ev.target.result]}))
      reader.readAsDataURL(file)
    }
    e.target.value = ''
  }
  const removeImg = (i) => setEf(f=>({...f,images:f.images.filter((_,j)=>j!==i)}))
  const moveImg = (from,to) => {
    const imgs = [...ef.images]; const [item] = imgs.splice(from,1); imgs.splice(to,0,item)
    setEf(f=>({...f,images:imgs}))
  }

  // ── FILTERED ──
  const filtered = useMemo(() => {
    let list = [...products]
    if (filterExt !== 'all') list = list.filter(p => p.ext === filterExt)
    if (filterCat) list = list.filter(p => p.cat === filterCat)
    if (filterPMin !== null) list = list.filter(p => p.srp >= filterPMin)
    if (filterPMax !== null) list = list.filter(p => p.srp <= filterPMax)
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.colors.some(c => c.sku.toLowerCase().includes(q)))
    }
    if (sort === 'price-asc') list.sort((a,b) => a.srp - b.srp)
    if (sort === 'price-desc') list.sort((a,b) => b.srp - a.srp)
    if (sort === 'name-asc') list.sort((a,b) => a.name.localeCompare(b.name))
    return list
  }, [products, filterExt, filterCat, filterPMin, filterPMax, search, sort])

  const counts = useMemo(() => {
    const ext = { all: products.length }, cat = {}
    products.forEach(p => { ext[p.ext] = (ext[p.ext]||0)+1; cat[p.cat] = (cat[p.cat]||0)+1 })
    return { ext, cat }
  }, [products])

  const grouped = useMemo(() => {
    const g = {}
    filtered.forEach(p => { if(!g[p.ext])g[p.ext]={}; if(!g[p.ext][p.cat])g[p.ext][p.cat]=[]; g[p.ext][p.cat].push(p) })
    return g
  }, [filtered])

  // ── SIDEBAR ──
  const SidebarContent = () => (
    <>
      <div className="sb-hero">
        <div className="sb-hl">Catalog</div>
        <div className="sb-total">{products.length}</div>
        <div className="sb-sub">products</div>
      </div>
      <div className="sb-sec">
        <span className="sb-lbl">Extension</span>
        {[{v:'all',l:'All Products',d:'var(--cy)'},{v:'core',l:'Quencha Core',d:'var(--tl)'},{v:'kids',l:'Quencha Kids',d:'#88C4E8'},{v:'pets',l:'Quencha Pets',d:'#D4894A'},{v:'tech',l:'Quencha Tech',d:'#2B4C5E'}].map(o=>(
          <button key={o.v} className={`fb ${filterExt===o.v?'on':''}`} style={{borderLeftColor:filterExt===o.v?o.d:'transparent'}} onClick={()=>setFilterExt(o.v)}>
            <span className="fb-dot" style={{background:o.d}}/><span className="fb-lbl">{o.l}</span><span className="fb-cnt">{counts.ext[o.v]||0}</span>
          </button>
        ))}
      </div>
      <hr className="sb-div"/>
      <div className="sb-sec">
        <span className="sb-lbl">Category</span>
        {Object.entries(CAT_ICONS).map(([v,ico])=>(
          <button key={v} className={`fb ${filterCat===v?'on':''}`} style={{borderLeftColor:filterCat===v?'var(--cy)':'transparent'}} onClick={()=>setFilterCat(filterCat===v?null:v)}>
            <span className="fb-ico">{ico}</span><span className="fb-lbl">{CAT_LABELS[v]}</span><span className="fb-cnt">{counts.cat[v]||0}</span>
          </button>
        ))}
      </div>
      <hr className="sb-div"/>
      <div className="sb-sec">
        <span className="sb-lbl">Price Range</span>
        <div className="pc-wrap">
          {[{l:'Under ₱299',mn:0,mx:299},{l:'₱300–799',mn:300,mx:799},{l:'₱800–1,299',mn:800,mx:1299},{l:'₱1,300+',mn:1300,mx:99999}].map(o=>{
            const on = filterPMin===o.mn && filterPMax===o.mx
            return <button key={o.l} className={`pc ${on?'on':''}`} onClick={()=>{ if(on){setFilterPMin(null);setFilterPMax(null)}else{setFilterPMin(o.mn);setFilterPMax(o.mx)} }}>{o.l}</button>
          })}
        </div>
      </div>
      {(filterExt!=='all'||filterCat||filterPMin!==null) && (
        <button className="clear-filters" onClick={()=>{setFilterExt('all');setFilterCat(null);setFilterPMin(null);setFilterPMax(null)}}>✕ Clear filters</button>
      )}
    </>
  )

  // ── PRODUCT CARD ──
  const Card = ({ p }) => {
    const mainImg = p.images?.[0]
    const colors = p.colors.slice(0, 6)
    const extra = p.colors.length > 6 ? p.colors.length - 6 : 0
    const extColor = EXT_COLORS[p.ext]
    const extClass = {kids:'kids',pets:'pets',tech:'tech'}[p.ext]
    return (
      <div className={`pcard ${editMode?'em':''}`}
        onClick={editMode ? undefined : () => { setViewProduct(p); setVmImg(0); setYtPlaying(false) }}>

        <div className="c-img-wrap">
          {extClass && <span className="c-etag" style={{background:extColor}}>{p.ext.charAt(0).toUpperCase()+p.ext.slice(1)}</span>}
          {mainImg ? <img src={mainImg} alt={p.name}/> : <span className="c-img-ph">📦</span>}
        </div>

        <div className="c-body">
          <div className="c-name">{p.name}</div>
          <span className="c-sku copyable" onClick={e=>{e.stopPropagation();copy(p.colors[0]?.sku.split('-').slice(0,2).join('-'))}} title="Click to copy SKU">
            {copied===p.colors[0]?.sku.split('-').slice(0,2).join('-') ? '✓ Copied!' : p.colors[0]?.sku.split('-').slice(0,2).join('-')}
          </span>
          <div className="c-desc">{p.desc}</div>
          <div className="c-badges">{p.badges.slice(0,3).map(b=><span key={b} className="c-badge">{b}</span>)}</div>
          <div className="c-colors">
            {colors.map(c=><span key={c.code} className="c-dot" style={{background:c.hex}} title={c.name}/>)}
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
  return (
    <div>
      {/* TOPBAR */}
      <header className={`qnh-topbar ${editMode?'edit-on':''}`}>
        <a className="tb-brand" href="#"><span className="tb-wm">Quencha</span><span className="tb-tg">Sip · Savor · Go</span></a>
        <div className="tb-search-wrap">
          <svg className="tb-search-icon" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input className="tb-search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products, SKUs…"/>
          {search && <button className="tb-clear" onClick={()=>setSearch('')}>✕</button>}
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
            onBannerClick={(link)=>{
              if(!link) return
              if(link.startsWith('http')){window.open(link,'_blank');return}
              // internal: #sip, #savor, #go, #accessories, or product id
              const el=document.getElementById(link.replace('#',''))
              if(el){el.scrollIntoView({behavior:'smooth'})}
              else{
                const cat=link.replace('#','')
                const cats=['sip','savor','go','accessories']
                if(cats.includes(cat)){setFilterCat(cat)}
              }
            }}
          />

          {/* Toolbar */}
          <div className="toolbar">
            <span className="res-label">Showing <strong>{filtered.length}</strong>{filtered.length!==products.length?` of ${products.length}`:''} products</span>
            <select className="sort-sel" value={sort} onChange={e=>setSort(e.target.value)}>
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="name-asc">Name: A → Z</option>
            </select>
            <div className="vbtns">
              <button className={`vbtn ${view==='col-2'?'on':''}`} onClick={()=>setView('col-2')} title="2 columns">⊟ 2</button>
              <button className={`vbtn ${view==='col-1'?'on':''}`} onClick={()=>setView('col-1')} title="1 column">▬ 1</button>
            </div>
          </div>

          {/* Products */}
          {filtered.length === 0 ? (
            <div className="empty">
              <div className="empty-ico">🔍</div>
              <h3 style={{fontSize:18,fontWeight:700,color:'var(--bk)',marginBottom:6}}>No products found</h3>
              <p>Try a different filter or search term.</p>
            </div>
          ) : EXT_ORDER.map(ext => !grouped[ext] ? null : CAT_ORDER.map(cat => {
            const prods = grouped[ext]?.[cat]; if (!prods?.length) return null
            return (
              <div key={`${ext}-${cat}`}>
                <div className="cat-hdr">
                  <div className="cat-line"/>
                  <span className="cat-nm">{CAT_LABELS[cat]}</span>
                  {ext !== 'core' && <span className="ext-tag" style={{background:EXT_COLORS[ext]}}>{EXT_LABELS[ext]}</span>}
                  <span className="cat-cnt">{prods.length} item{prods.length>1?'s':''}</span>
                  <div className="cat-line"/>
                </div>
                <div className={`pgrid ${view}`}>
                  {prods.map(p => <Card key={p.id} p={p}/>)}
                </div>
              </div>
            )
          }))}
        </main>
      </div>

      {/* MOBILE FILTER */}
      <button className="mob-filter-btn" onClick={()=>setShowMobileFilter(true)}>☰ Filters</button>
      {showMobileFilter && (
        <div className="mob-overlay" onClick={()=>setShowMobileFilter(false)}>
          <div className="mob-drawer" onClick={e=>e.stopPropagation()}>
            <button className="drawer-close" onClick={()=>setShowMobileFilter(false)}>✕</button>
            <SidebarContent/>
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
      {viewProduct && (
        <div className="modal-bg" onClick={e=>{if(e.target===e.currentTarget){setViewProduct(null);setYtPlaying(false)}}}>
          <div className="modal">
            <div className="m-hdr" style={{background:'var(--sf4)'}}>
              <div>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'var(--tl)',textTransform:'uppercase',marginBottom:4,opacity:.7}}>{EXT_LABELS[viewProduct.ext]} · {CAT_LABELS[viewProduct.cat]}</div>
                <div style={{fontSize:22,fontWeight:900,color:'var(--tl)',lineHeight:1.2}}>{viewProduct.name}</div>
                {viewProduct.colors[0]?.sku && (
                  <code
                    onClick={()=>copy(viewProduct.colors[0].sku.split('-').slice(0,2).join('-'))}
                    style={{fontSize:11,fontWeight:700,fontFamily:'monospace',background:'rgba(39,153,137,.1)',color:'var(--tl)',borderRadius:4,padding:'2px 8px',marginTop:5,display:'inline-block',letterSpacing:'.04em',cursor:'pointer',transition:'background .15s'}}
                    title="Click to copy"
                  >
                    {copied===viewProduct.colors[0].sku.split('-').slice(0,2).join('-') ? '✓ Copied!' : viewProduct.colors[0].sku.split('-').slice(0,2).join('-')}
                  </code>
                )}
              </div>
              <button className="m-close" onClick={()=>{setViewProduct(null);setYtPlaying(false)}}>✕</button>
            </div>
            <div className="m-body">
              <div>
                <div className="vm-main-wrap">
                  {viewProduct.images?.length > 0 ? <img src={viewProduct.images[vmImg]} alt={viewProduct.name}/> : <span className="vm-main-ph">📦</span>}
                </div>
                {viewProduct.images?.length > 1 && (
                  <div className="vm-thumbs">
                    {viewProduct.images.map((u,i) => (
                      <div key={i} className={`vm-thumb ${i===vmImg?'on':''}`} onClick={()=>setVmImg(i)}>
                        <img src={u} alt=""/>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* YouTube Video — rendered via sub-component to avoid IIFE */}
              <YouTubeBlock ytUrl={viewProduct.youtube} ytPlaying={ytPlaying} setYtPlaying={setYtPlaying} />
              <div className="vm-badges">{viewProduct.badges.map(b=><span key={b} className="vm-badge">{b}</span>)}</div>
              <p className="vm-desc">{viewProduct.desc}</p>
              {/* Dimensions + Barcode — only if filled */}
              {(viewProduct.dimensions || viewProduct.barcode) && (
                <div className="vm-meta-row">
                  {viewProduct.dimensions && typeof viewProduct.dimensions==='object' &&
                    viewProduct.dimensions.rows?.some(r=>r.some(c=>c.trim())) && (
                    <div className="vm-meta-item" style={{flex:'1 1 100%'}}>
                      <span className="vm-meta-lbl" style={{marginBottom:8,display:'block'}}>Dimensions</span>
                      <div style={{overflowX:'auto'}}>
                        <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
                          {viewProduct.dimensions.headers.some(h=>h.trim()) && (
                            <thead>
                              <tr>
                                {viewProduct.dimensions.headers.map((h,i)=>(
                                  <th key={i} style={{background:'var(--tl)',color:'#fff',padding:'6px 12px',textAlign:'left',fontSize:10,letterSpacing:'.08em',fontWeight:700,whiteSpace:'nowrap'}}>{h||'—'}</th>
                                ))}
                              </tr>
                            </thead>
                          )}
                          <tbody>
                            {viewProduct.dimensions.rows.filter(r=>r.some(c=>c.trim())).map((row,ri)=>(
                              <tr key={ri} style={{background:ri%2===0?'#fff':'var(--bg)'}}>
                                {row.map((cell,ci)=>(
                                  <td key={ci} style={{padding:'7px 12px',borderBottom:'1px solid rgba(185,220,210,.3)',fontSize:13,fontWeight:ci===0?600:400,color:ci===0?'var(--bk)':'var(--gr)'}}>{cell||'—'}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {(viewProduct.barcode || viewProduct.barcodeImage) && (
                    <div className="vm-meta-item">
                      <span className="vm-meta-lbl">Barcode</span>
                      {viewProduct.barcodeImage ? (
                        <img
                          src={viewProduct.barcodeImage}
                          alt="Barcode"
                          onClick={()=>setCodeLightbox({src:viewProduct.barcodeImage,label:'Barcode'})}
                          style={{maxWidth:'100%',maxHeight:60,objectFit:'contain',marginTop:4,borderRadius:4,cursor:'zoom-in'}}
                          title="Click to enlarge"
                        />
                      ) : (
                        <code className="vm-meta-code">{viewProduct.barcode}</code>
                      )}
                      {viewProduct.barcode && viewProduct.barcodeImage && (
                        <code className="vm-meta-code" style={{marginTop:4,display:'block'}}>{viewProduct.barcode}</code>
                      )}
                    </div>
                  )}
                  {(viewProduct.qrCode || viewProduct.qrImage) && (
                    <div className="vm-meta-item">
                      <span className="vm-meta-lbl">QR Code</span>
                      {viewProduct.qrImage && (
                        <img
                          src={viewProduct.qrImage}
                          alt="QR Code"
                          onClick={()=>setCodeLightbox({src:viewProduct.qrImage,label:'QR Code'})}
                          style={{width:72,height:72,objectFit:'contain',marginTop:4,borderRadius:4,border:'1px solid rgba(185,220,210,.4)',padding:4,background:'#fff',cursor:'zoom-in'}}
                          title="Click to enlarge"
                        />
                      )}
                      {viewProduct.qrCode && (
                        <code className="vm-meta-code" style={{marginTop:4,display:'block',wordBreak:'break-all',fontSize:10}}>{viewProduct.qrCode}</code>
                      )}
                    </div>
                  )}
                </div>
              )}
              <div className="vm-price-row">
                <div><div className="vm-plbl">SRP</div><div className="vm-pval">₱{viewProduct.srp.toLocaleString('en-PH',{minimumFractionDigits:2})}</div></div>
                <div className="vm-pdiv"/>
                <div><div className="vm-plbl">Packing</div><div className="vm-pval">{viewProduct.packing} pcs</div></div>
              </div>
              {/* Color swatches + SKUs */}
              {viewProduct.colors.length > 0 && (
                <div>
                  <span className="vm-color-sec-lbl">Colors</span>
                  {groupColorsByCollection(viewProduct.colors).map(group=>(
                    <div key={group.name} style={{marginBottom:10}}>
                      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:7}}>
                        <span style={{fontSize:9,fontWeight:800,letterSpacing:'.14em',textTransform:'uppercase',color:COLLECTION_COLORS[group.name]||'var(--gr)',background:`${COLLECTION_COLORS[group.name]||'var(--gr)'}18`,border:`1px solid ${COLLECTION_COLORS[group.name]||'var(--gr)'}33`,padding:'2px 8px',borderRadius:999}}>{group.name}</span>
                        <div style={{flex:1,height:1,background:'rgba(185,220,210,.3)'}}/>
                      </div>
                      <div className="vm-color-grid">
                        {group.colors.map(clr=>(
                          <div key={clr.sku} className={`vm-color-item copyable ${copied===clr.sku?'sku-copied':''}`} onClick={()=>copy(clr.sku)} title={`Copy ${clr.sku}`}>
                            <span className="vm-color-swatch" style={{background:clr.hex}}/>
                            <div className="vm-color-info">
                              <span className="vm-color-name">{clr.name}</span>
                              <span className="vm-color-sku">{copied===clr.sku ? '✓ Copied!' : clr.sku}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="vm-actions">
                <button className="vm-pencil-btn" onClick={()=>{ setViewProduct(null); requestAuth(viewProduct) }} title="Edit product">
                  <PencilIcon/>
                </button>
                <button className="vm-inq-btn" onClick={()=>{ setViewProduct(null); setInqOpen(true) }}>📩 Bulk Inquiry</button>
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
                    <select className="f-sel" value={ef.ext} onChange={e=>setEf(f=>({...f,ext:e.target.value}))}>
                      {['core','kids','pets','tech'].map(o=><option key={o} value={o}>{o.charAt(0).toUpperCase()+o.slice(1)}</option>)}
                    </select>
                  </div>
                  <div className="f-col">
                    <label className="f-lbl">Category</label>
                    <select className="f-sel" value={ef.cat} onChange={e=>setEf(f=>({...f,cat:e.target.value}))}>
                      {[['sip','SIP — Drinkware'],['savor','SAVOR — Lunch'],['go','GO — Bags'],['accessories','Accessories']].map(([v,l])=><option key={v} value={v}>{l}</option>)}
                    </select>
                  </div>
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
                      onUpload={uploadImageToBlob}
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
                      onUpload={uploadImageToBlob}
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
                <div className="f-hint">Each color variant gets its own SKU. Format: BASE-COLORCODE (e.g. QNH-IT550-WT)</div>
                <div style={{background:'var(--bg)',borderRadius:8,padding:12}}>
                  <div className="color-table-head"><span>Swatch</span><span>Name</span><span>Code</span><span>SKU</span><span/></div>
                  {ef.colors.length === 0
                    ? <p style={{fontSize:12,color:'var(--gr)',padding:'4px 0'}}>No colors yet. Add one below.</p>
                    : ef.colors.map((c,i)=>(
                      <div key={i} className="color-row">
                        <input type="color" className="cp" value={c.hex} onChange={e=>updateColor(i,'hex',e.target.value)}/>
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
                  <div className="color-row">
                    <input type="color" className="cp" value={newColor.hex} onChange={e=>setNewColor(n=>({...n,hex:e.target.value}))}/>
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
                <div className="f-hint">Upload product images. First image = main card photo. Click arrows to reorder.</div>
                <div className="img-grid">
                  {ef.images.map((src,i)=>(
                    <div key={i} className="img-thumb">
                      {i===0 && <span className="main-tag">Main</span>}
                      <img src={src} alt={`Product ${i+1}`}/>
                      <div className="img-actions">
                        {i>0 && <button onClick={()=>moveImg(i,i-1)}>←</button>}
                        {i<ef.images.length-1 && <button onClick={()=>moveImg(i,i+1)}>→</button>}
                        <button className="img-rm-btn" onClick={()=>removeImg(i)}>✕</button>
                      </div>
                    </div>
                  ))}
                  <div className="upload-zone" onClick={()=>fileRef.current?.click()}>
                    <span className="uz-ico">+</span>
                    <span className="uz-lbl">Upload Image</span>
                    <span className="uz-sub">JPG, PNG, WebP · 8MB max</span>
                  </div>
                </div>
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
          <div style={{fontSize:24,fontWeight:900,color:'var(--tl)',letterSpacing:'-.01em',fontFamily:'var(--fn)'}}>QUENCHA</div>
          <div style={{width:40,height:40,border:'3px solid rgba(39,153,137,.2)',borderTop:'3px solid var(--tl)',borderRadius:'50%',animation:'spin 0.8s linear infinite'}}/>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      )}

      {/* BANNER EDIT MODAL */}
      {bannerEditOpen && (
        <BannerEditModal
          banners={banners}
          aspect={bannerAspect}
          onAspectChange={saveAspect}
          onAdd={b=>saveBanners([...banners,b])}
          onRemove={id=>saveBanners(banners.filter(b=>b.id!==id))}
          onMove={(from,to)=>{const b=[...banners];const[item]=b.splice(from,1);b.splice(to,0,item);saveBanners(b)}}
          onUpdateBanner={(id,field,val)=>saveBanners(banners.map(b=>b.id===id?{...b,[field]:val}:b))}
          onClose={()=>setBannerEditOpen(false)}
        />
      )}

      {/* INQUIRY MODAL */}
      {inqOpen && (
        <div className="modal-bg" onClick={e=>{if(e.target===e.currentTarget)setInqOpen(false)}}>
          <div className="modal" style={{maxWidth:500}}>
            <div className="m-hdr" style={{background:'var(--sf4)'}}>
              <div>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'var(--tl)',textTransform:'uppercase',marginBottom:4}}>Corporate & Wholesale</div>
                <div style={{fontSize:20,fontWeight:900,color:'var(--tl)'}}>Bulk Inquiry</div>
              </div>
              <button className="m-close" onClick={()=>setInqOpen(false)}>✕</button>
            </div>
            <div className="m-body" style={{gap:10}}>
              <p style={{fontSize:14,color:'var(--gr)'}}>For bulk orders, UV printing, and corporate gifting, reach out through any of these channels.</p>
              {[['🛍','Shopee','shopee.ph/quenchaph','https://shopee.ph/quenchaph'],['🛒','Lazada','lazada.com.ph/shop/quencha','https://lazada.com.ph/shop/quencha'],['📱','TikTok Shop','@quenchaph','#'],['🌐','Corporate','sunbeamsimpexinc.com','https://sunbeamsimpexinc.com']].map(([ico,n,l,href])=>(
                <a key={n} className="inq-link" href={href} target="_blank" rel="noreferrer">{ico} {n} — {l}</a>
              ))}
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
            <button className="eb-add" onClick={()=>requestAuth('newProduct')}>+ Add Product</button>
            <button className="eb-exit" onClick={exitEdit}>✓ Save & Exit</button>
          </div>
        </div>
      )}
    </div>
  )
}function BannerEditModal({ banners, aspect, interval, onIntervalChange, onAspectChange, onAdd, onRemove, onMove, onUpdateBanner, onClose }) {
  const fileRef = useRef(null)
  const [editingBanner, setEditingBanner] = useState(null) // id of banner being edited

  const handleFile = (e) => {
    const file = e.target.files[0]; if (!file) return
    if (!['image/jpeg','image/png','image/webp','image/gif'].includes(file.type)) return
    const reader = new FileReader()
    reader.onload = ev => { onAdd({ id: 'b' + Date.now(), image: ev.target.result, alt: file.name.split('.')[0], title:'', subtitle:'', link:'' }) }
    reader.readAsDataURL(file)
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

        <div style={{overflow:'auto',padding:24,display:'flex',flexDirection:'column',gap:18,flex:1}}>
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
