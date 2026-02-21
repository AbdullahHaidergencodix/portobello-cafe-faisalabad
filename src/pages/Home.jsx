import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import {
  ChevronLeft, ChevronRight, MessageCircle,
  Phone, MapPin, Clock, Star, ArrowRight,
  Calendar, Users, Wine, Instagram
} from 'lucide-react'

import h1 from '../assets/images/hero-1.jpg'
import h2 from '../assets/images/hero-2.jpg'
import h3 from '../assets/images/hero-3.jpg'
import h4 from '../assets/images/hero-4.jpg'
import f1 from '../assets/images/full-1.jpg'
import f2 from '../assets/images/full-2.jpg'
import f3 from '../assets/images/full-3.jpg'
import f4 from '../assets/images/full-4.jpg'
import f5 from '../assets/images/full-5.jpg'
import f6 from '../assets/images/full-6.jpg'
import d1 from '../assets/images/dish-1.jpg'
import d2 from '../assets/images/dish-2.jpg'
import d3 from '../assets/images/dish-3.jpg'
import d4 from '../assets/images/dish-4.jpg'
import d5 from '../assets/images/dish-5.jpg'
import d6 from '../assets/images/dish-6.jpg'
import d7 from '../assets/images/dish-7.jpg'
import d8 from '../assets/images/dish-8.jpg'
import c1 from '../assets/images/coffee-1.jpg'
import c2 from '../assets/images/coffee-2.jpg'

/* ── DATA ─────────────────────────────────── */
const SLIDES = [
  { img:h1, tag:'Rustic · Brick · Dark Wood',   h:'Continental\nDining,',    em:'Faisalabad\'s Finest.' },
  { img:h2, tag:'Sunday Brunch · 11 AM – 2 PM', h:'The Brunch\nThat Became', em:'A Tradition.' },
  { img:h3, tag:'Evening Dining',               h:'Warm Walls.\nBold',       em:'Flavours.' },
  { img:h4, tag:'Hi-Tea & Sweet Things',        h:'From First\nCoffee',      em:'To Last Bite.' },
]

const MENU = {
  'Sunday Brunch': [
    { name:'Eggs Benedict',          desc:'Poached eggs, Canadian bacon, hollandaise on toasted brioche',       img:d5, price:'PKR 1,450', tag:"Chef's Pick" },
    { name:'Portobello Full Brunch', desc:'Eggs your way, smoked sausage, baked beans, grilled tomato, sourdough', img:d8, price:'PKR 1,850', tag:'Best Seller' },
    { name:'French Toast Stack',     desc:'Thick brioche, whipped mascarpone, berry compote, maple syrup',      img:d4, price:'PKR 1,250' },
    { name:'Smashed Avocado Toast',  desc:'Sourdough, smashed avo, chilli flakes, poached egg, feta crumble',   img:d7, price:'PKR 1,350' },
  ],
  'Gourmet Burgers': [
    { name:'Portobello Classic',     desc:'200g beef patty, aged cheddar, caramelised onion, pickles, brioche', img:d1, price:'PKR 1,650', tag:'Most Ordered' },
    { name:'Mushroom & Swiss',       desc:'Beef patty, sautéed portobello mushrooms, Swiss cheese, truffle aioli', img:d1, price:'PKR 1,750', tag:'Signature' },
    { name:'Crispy Chicken Burger',  desc:'Southern-fried thigh, slaw, chipotle mayo, pickle, brioche bun',     img:d1, price:'PKR 1,550' },
  ],
  'Steaks & Mains': [
    { name:'Ribeye Steak',           desc:'300g grain-fed ribeye, roasted garlic butter, seasonal veg, fries',  img:d2, price:'PKR 3,800', tag:'Signature' },
    { name:'Sirloin & Mushroom Jus', desc:'200g sirloin, portobello mushrooms, red wine reduction, greens',     img:d2, price:'PKR 3,200', tag:'Most Ordered' },
    { name:'Atlantic Salmon',        desc:'Pan-seared fillet, lemon beurre blanc, asparagus, crushed potatoes', img:d7, price:'PKR 2,800' },
    { name:'Truffle Mushroom Pasta', desc:'Fresh tagliatelle, black truffle cream, wild mushrooms, parmesan',   img:d6, price:'PKR 1,950' },
  ],
  'Hi-Tea': [
    { name:'Hi-Tea for Two',         desc:'Finger sandwiches, scones, macarons, mini pastries, bottomless tea', img:d4, price:'PKR 3,200', tag:'Weekend Special' },
    { name:'High Tea Deluxe for 4',  desc:'Extended spread — savouries, desserts, and bottomless tea',          img:d4, price:'PKR 5,800', tag:'Best Value' },
  ],
  'Desserts': [
    { name:'Molten Lava Cake',       desc:'Warm dark chocolate fondant, vanilla bean ice cream, chocolate drizzle', img:d3, price:'PKR 850', tag:'Must Try' },
    { name:'Portobello Tiramisu',    desc:'House-made, espresso-soaked ladyfingers, mascarpone cream',          img:c2, price:'PKR 850', tag:'Signature' },
    { name:'Crème Brûlée',           desc:'Classic vanilla custard, torched caramel crust, fresh berry garnish', img:c1, price:'PKR 800' },
  ],
}

const HOURS = [
  { d:'Monday – Thursday', t:'12:00 PM – 11:00 PM' },
  { d:'Friday',             t:'12:00 PM – 12:00 AM' },
  { d:'Saturday',           t:'11:00 AM – 12:00 AM' },
  { d:'Sunday Brunch',      t:'11:00 AM – 2:00 PM', hi:true },
  { d:'Sunday Dinner',      t:'6:00 PM – 11:00 PM' },
]

const REVIEWS = [
  { name:'Sana K.',      r:5, q:'The Molten Lava Cake alone is worth the visit. Warm, gooey, perfect. But honestly everything here is 10/10 — the ambiance, the service, the food.' },
  { name:'Ahmad R.',     r:5, q:'Best steak in Faisalabad — no contest. The Ribeye is cooked perfectly every time. Dark wood, brick walls, candle light — feels like a completely different city.' },
  { name:'Maryam T.',    r:5, q:'Came for Hi-Tea with my girls and it was stunning. The spread was generous, the setting was beautiful, and the macarons were divine.' },
  { name:'Usman & Hira', r:5, q:'Our anniversary dinner here was flawless. The Mushroom & Swiss Burger is secretly the best thing on the menu. Will be back every month.' },
  { name:'Fatima A.',    r:5, q:'Sunday Brunch is a ritual now. Eggs Benedict every week. The coffee is always perfect and the staff remembers your order. Rare in this city.' },
]

const SPECIALS = [
  { img:d3, label:'Signature Dessert', name:'Molten Lava Cake',   desc:'Warm dark chocolate fondant, vanilla ice cream',      price:'PKR 850' },
  { img:d1, label:'Gourmet Burger',    name:'Portobello Classic', desc:'200g beef patty, aged cheddar, caramelised onion',    price:'PKR 1,650' },
  { img:d2, label:'Premium Cut',       name:'Ribeye Steak',       desc:'300g grain-fed ribeye, roasted garlic butter',        price:'PKR 3,800' },
]

/* ── ANIMATION PRESETS ── */
const inUp  = (d=0) => ({ initial:{opacity:0,y:48}, whileInView:{opacity:1,y:0}, viewport:{once:true,margin:'-100px'}, transition:{duration:1.1,delay:d,ease:[0.22,1,0.36,1]} })
const inL   = (d=0) => ({ initial:{opacity:0,x:-48}, whileInView:{opacity:1,x:0}, viewport:{once:true,margin:'-100px'}, transition:{duration:1.1,delay:d,ease:[0.22,1,0.36,1]} })
const inFade= (d=0) => ({ initial:{opacity:0}, whileInView:{opacity:1}, viewport:{once:true,margin:'-100px'}, transition:{duration:1.2,delay:d} })

/* ════════════════════════════════════════════
   CUSTOM CURSOR
════════════════════════════════════════════ */

/* ════════════════════════════════════════════
   NAV
════════════════════════════════════════════ */
function Nav({ scrolled }) {
  const [open, setOpen] = useState(false)
  const links = [
    {l:'Menu',    h:'#menu'},
    {l:'Brunch',  h:'#brunch'},
    {l:'Events',  h:'#events'},
    {l:'Reserve', h:'#reserve'},
  ]
  return (
    <>
      <nav className={`nav${scrolled?' scrolled':''}`}>
        <div className="nav-logo">
          PORTOBELLO
          <span className="nav-logo-sub">Café · Faisalabad</span>
        </div>
        <ul className="nav-links">
          {links.map(x=><li key={x.l}><a href={x.h}>{x.l}</a></li>)}
        </ul>
        <a href="#reserve" className="nav-reserve">
          <Calendar size={12}/> Reserve
        </a>
        <button className="mob-menu-btn" onClick={()=>setOpen(o=>!o)}>
          {open?'✕':'☰'}
        </button>
      </nav>
      <AnimatePresence>
        {open&&(
          <motion.div className="mob-drawer"
            initial={{opacity:0,x:'100%'}} animate={{opacity:1,x:0}} exit={{opacity:0,x:'100%'}}
            transition={{duration:0.5,ease:[0.22,1,0.36,1]}}>
            {links.map((x,i)=>(
              <motion.a key={x.l} href={x.h} onClick={()=>setOpen(false)}
                initial={{opacity:0,y:24}} animate={{opacity:1,y:0}}
                transition={{delay:i*0.08+0.1}}>
                {x.l}
              </motion.a>
            ))}
            <p className="mob-drawer-tel">041-8555583 · 041-8555584</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ════════════════════════════════════════════
   HERO
════════════════════════════════════════════ */
function Hero() {
  const [slide, setSlide] = useState(0)
  const s = SLIDES[slide]
  useEffect(()=>{
    const t = setInterval(()=>setSlide(i=>(i+1)%SLIDES.length),6500)
    return ()=>clearInterval(t)
  },[])
  return (
    <section className="hero">
      <div className="hero-bg">
        {SLIDES.map((sl,i)=>(
          <img key={i} src={sl.img} alt=""
            style={{opacity:i===slide?1:0,transition:'opacity 2s ease',zIndex:i===slide?1:0}}/>
        ))}
        <div className="hero-bg-overlay"/>
      </div>

      <div className="hero-body">
        <div className="hero-left">
          <motion.div style={{display:'flex',alignItems:'center',gap:16,marginBottom:24}}
            initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{duration:0.9,delay:0.3}}>
            <div className="hero-kicker-line"/>
            <AnimatePresence mode="wait">
              <motion.span key={slide} className="hero-kicker-label"
                initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.5}}>
                {s.tag}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.h1 key={slide} className="hero-h1"
              initial={{opacity:0,y:60}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-40}}
              transition={{duration:1,ease:[0.22,1,0.36,1]}}>
              {s.h.split('\n').map((line,i)=><span key={i} style={{display:'block'}}>{line}</span>)}
              <em>{s.em}</em>
            </motion.h1>
          </AnimatePresence>
        </div>

        <motion.div className="hero-right"
          initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.9,delay:0.55}}>
          <p className="hero-sub">
            Brick walls. Dark wood.<br/>
            Gourmet burgers, hand-cut steaks,<br/>
            legendary brunch & the city's most<br/>
            iconic Molten Lava Cake.<br/>
            Do Burj Plaza, Faisalabad.
          </p>
          <a href="#reserve" className="hero-cta">
            <Calendar size={13}/> Book a Table
          </a>
          <a href="#menu" style={{
            fontSize:'9.5px',fontWeight:500,letterSpacing:'0.2em',textTransform:'uppercase',
            color:'rgba(255,255,255,0.35)',display:'inline-flex',alignItems:'center',gap:8,
            borderBottom:'1px solid rgba(255,255,255,0.12)',paddingBottom:3,transition:'all 0.3s'
          }}>
            See the Menu <ArrowRight size={12}/>
          </a>
        </motion.div>
      </div>

      <div className="hero-slide-nav">
        {SLIDES.map((_,i)=>(
          <button key={i} onClick={()=>setSlide(i)}
            className={`hero-dot${i===slide?' on':''}`}/>
        ))}
      </div>
      <div className="hero-scroll-hint">
        <div className="hero-scroll-line"/>
        <span>Scroll</span>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════
   TICKER
════════════════════════════════════════════ */
function Ticker() {
  const items = ['Gourmet Burgers','Sunday Brunch','Molten Lava Cake','Hi-Tea','Brick & Dark Wood','Do Burj Plaza','Hand-Cut Steaks','Artisan Coffee','Est. 2015','Faisalabad']
  const d = [...items,...items]
  return (
    <div className="ticker">
      <div className="ticker-track">
        {d.map((t,i)=>(
          <span key={i} className="ticker-item">
            {t}<span className="ticker-sep"/>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════
   PANEL — TEXT + IMAGE
════════════════════════════════════════════ */
function PanelTextImg({ flip, img, num, label, h, em, body, cta, ctaHref }) {
  return (
    <section className={`panel-text-img${flip?' flip':''}`}>
      <motion.div {...inL(0)} className="panel-copy-wrap">
        <span className="panel-num">{num}</span>
        <p className="panel-label">{label}</p>
        <h2 className="panel-h2">{h}<em>{em}</em></h2>
        <div className="panel-rule"/>
        <p className="panel-body">{body}</p>
        {cta&&<a href={ctaHref} className="panel-link">{cta} <ArrowRight size={13}/></a>}
      </motion.div>
      <motion.div {...inFade(0)} className="panel-img-wrap">
        <img src={img} alt={h}/>
      </motion.div>
    </section>
  )
}

/* ════════════════════════════════════════════
   PANEL — COVER (text over full image)
════════════════════════════════════════════ */
function PanelCover({ img, h, em, body, cta, ctaHref }) {
  return (
    <section className="panel-cover">
      <div className="panel-cover-img"><img src={img} alt={h}/></div>
      <div className="panel-cover-grad"/>
      <div className="panel-cover-body">
        <motion.h2 {...inUp(0)} className="panel-cover-h">
          {h}<em>{em}</em>
        </motion.h2>
        <motion.div {...inUp(0.15)} className="panel-cover-right">
          <p style={{fontSize:13,fontWeight:300,lineHeight:1.9,color:'rgba(245,240,232,0.42)',maxWidth:280}}>{body}</p>
          {cta&&(
            <a href={ctaHref} className="panel-link" style={{color:'var(--gold)',borderColor:'rgba(212,175,55,0.28)'}}>
              {cta} <ArrowRight size={13}/>
            </a>
          )}
        </motion.div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════
   MENU
════════════════════════════════════════════ */
function Menu() {
  const [tab, setTab] = useState('Sunday Brunch')
  return (
    <section id="menu" className="menu-section">
      <motion.div {...inUp(0)} className="menu-top">
        <div>
          <p style={{fontSize:9.5,fontWeight:500,letterSpacing:'0.28em',textTransform:'uppercase',color:'var(--mocha)',marginBottom:14}}>Curated For You</p>
          <h2 className="menu-big-h">Our <em>Menu</em></h2>
        </div>
        <div className="menu-tabs">
          {Object.keys(MENU).map(t=>(
            <button key={t} onClick={()=>setTab(t)} className={`menu-tab${tab===t?' on':''}`}>{t}</button>
          ))}
        </div>
      </motion.div>
      <div className="menu-divider"/>
      <AnimatePresence mode="wait">
        <motion.ul key={tab} className="menu-rows"
          initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}}
          transition={{duration:0.55}}>
          {MENU[tab].map((item,i)=>(
            <motion.li key={item.name} {...inUp(i*0.07)} className="menu-row">
              <div className="menu-row-left">
                <div className="menu-row-thumb"><img src={item.img} alt={item.name}/></div>
                <div>
                  <p className="menu-row-name">{item.name}</p>
                  <p className="menu-row-desc">{item.desc}</p>
                  {item.tag&&<span className="menu-row-tag">{item.tag}</span>}
                </div>
              </div>
              <p className="menu-row-price">{item.price}</p>
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>
      <motion.div {...inUp(0.2)} style={{textAlign:'center',marginTop:56}}>
        <a href="https://wa.me/923154674321?text=Hi%2C+I%27d+like+the+full+menu+for+Portobello+Caf%C3%A9"
          target="_blank" rel="noopener noreferrer" className="panel-link"
          style={{color:'var(--mocha)',borderColor:'rgba(107,79,58,0.22)'}}>
          <MessageCircle size={13}/> Get Full Menu on WhatsApp <ArrowRight size={13}/>
        </a>
      </motion.div>
    </section>
  )
}

/* ════════════════════════════════════════════
   BRUNCH
════════════════════════════════════════════ */
function Brunch() {
  return (
    <section id="brunch" className="brunch-section">
      <div className="brunch-inner">
        <motion.div {...inL(0)} className="brunch-mosaic">
          <div className="b-main"><img src={f2} alt="Sunday Brunch"/></div>
          <div className="b-sm"><img src={d5} alt="Eggs Benedict"/></div>
          <div className="b-sm"><img src={c1} alt="Coffee"/></div>
        </motion.div>
        <motion.div {...inUp(0.15)}>
          <p style={{fontSize:9.5,fontWeight:500,letterSpacing:'0.28em',textTransform:'uppercase',color:'var(--mocha)',marginBottom:16}}>Every Sunday</p>
          <h2 className="brunch-big">The Sunday<em>Brunch.</em></h2>
          <p className="brunch-body">
            Faisalabad's most talked-about weekend ritual. A curated continental spread,
            bottomless coffee, and the kind of unhurried morning that makes Sunday
            something to genuinely look forward to.
          </p>
          <div className="brunch-facts">
            {[{l:'Time',v:'11 AM – 2 PM'},{l:'Day',v:'Every Sunday'},{l:'Booking',v:'Recommended'}].map(m=>(
              <div key={m.l}>
                <p className="brunch-fact-l">{m.l}</p>
                <p className="brunch-fact-v">{m.v}</p>
              </div>
            ))}
          </div>
          <a href="#reserve" className="hero-cta" style={{background:'var(--mocha)',display:'inline-flex',alignItems:'center',gap:10}}>
            <Calendar size={13}/> Reserve Your Sunday Table
          </a>
        </motion.div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════
   SPECIALS GRID
════════════════════════════════════════════ */
function Specials() {
  return (
    <section className="specials">
      <motion.div {...inUp(0)} className="specials-head">
        <p style={{fontSize:9.5,fontWeight:500,letterSpacing:'0.28em',textTransform:'uppercase',color:'var(--gold)',opacity:0.65,marginBottom:16}}>Can't Miss</p>
        <h2 className="specials-big">House <em>Signatures</em></h2>
      </motion.div>
      <div className="specials-grid">
        {SPECIALS.map((s,i)=>(
          <motion.div key={s.name} {...inUp(i*0.1)} className="spec-card">
            <img src={s.img} alt={s.name}/>
            <div className="spec-card-overlay"/>
            <div className="spec-card-top-line"/>
            <div className="spec-card-body">
              <p className="spec-card-label">{s.label}</p>
              <p className="spec-card-name">{s.name}</p>
              <p className="spec-card-desc">{s.desc}</p>
              <p className="spec-card-price">{s.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════
   REVIEWS
════════════════════════════════════════════ */
function Reviews() {
  const [start, setStart] = useState(0)
  const perPage = typeof window!=='undefined'&&window.innerWidth<1024?1:3
  const max = REVIEWS.length-perPage
  useEffect(()=>{
    const t=setInterval(()=>setStart(s=>s>=max?0:s+1),5200)
    return ()=>clearInterval(t)
  },[max])
  return (
    <section className="reviews">
      <div className="reviews-head">
        <motion.div {...inUp(0)}>
          <p style={{fontSize:9.5,fontWeight:500,letterSpacing:'0.28em',textTransform:'uppercase',color:'var(--gold)',opacity:0.65,marginBottom:16}}>Guest Reviews</p>
          <h2 className="reviews-big">What Our <em>Guests Say</em></h2>
        </motion.div>
        <div className="rev-nav">
          <button onClick={()=>setStart(s=>Math.max(0,s-1))} className="rev-btn"><ChevronLeft size={18}/></button>
          <button onClick={()=>setStart(s=>Math.min(max,s+1))} className="rev-btn"><ChevronRight size={18}/></button>
        </div>
      </div>
      <div className="rev-slider">
        <div className="rev-track"
          style={{transform:`translateX(calc(-${start*(100/perPage)}% - ${start*20/perPage}px))`}}>
          {REVIEWS.map((r,i)=>(
            <motion.div key={r.name} {...inFade(i*0.08)} className="rev-card">
              <div className="rev-stars">
                {Array(r.r).fill(0).map((_,j)=><Star key={j} size={14} fill="#d4af37" color="#d4af37"/>)}
              </div>
              <p className="rev-quote">"{r.q}"</p>
              <p className="rev-name">— {r.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════
   EVENTS
════════════════════════════════════════════ */
function Events() {
  return (
    <section id="events" className="events">
      <motion.div {...inUp(0)}>
        <p style={{fontSize:9.5,fontWeight:500,letterSpacing:'0.28em',textTransform:'uppercase',color:'var(--gold)',opacity:0.65,marginBottom:16}}>Private & Corporate</p>
        <h2 className="events-big">Host Your <em>Event</em></h2>
      </motion.div>
      <div className="events-duo">
        {[
          {img:f5,icon:Wine,  title:'Private Celebrations',desc:'Birthdays, anniversaries, family gatherings. Custom menus. A setting that feels entirely personal.'},
          {img:f6,icon:Users, title:'Corporate Dinners',   desc:'Impress your clients. AV support, custom menus, flawless service for up to 80 guests.'},
        ].map((e,i)=>(
          <motion.div key={e.title} {...inUp(i*0.12)} className="ev-card">
            <img src={e.img} alt={e.title}/>
            <div className="ev-card-grad"/>
            <div className="ev-card-line"/>
            <div className="ev-card-body">
              <e.icon size={26} className="ev-icon"/>
              <h3 className="ev-title">{e.title}</h3>
              <p className="ev-desc">{e.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════
   RESERVE
════════════════════════════════════════════ */
function Reserve() {
  const [form,setForm]=useState({name:'',phone:'',email:'',date:'',time:'',guests:'2',type:'Dinner',notes:''})
  const [sent,setSent]=useState(false)
  const h=e=>setForm(f=>({...f,[e.target.name]:e.target.value}))
  const sub=e=>{
    e.preventDefault()
    const m=encodeURIComponent(`*Portobello Café — Reservation*\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email||'N/A'}\nDate: ${form.date}\nTime: ${form.time}\nGuests: ${form.guests}\nOccasion: ${form.type}\nNotes: ${form.notes||'None'}`)
    window.open(`https://wa.me/923154674321?text=${m}`,'_blank')
    setSent(true); setTimeout(()=>setSent(false),5000)
  }
  return (
    <section id="reserve" className="reserve">
      <div className="reserve-inner">
        <motion.div {...inL(0)}>
          <h2 className="reserve-big">Book a <em>Table</em></h2>
          <div className="info-block">
            <p className="info-block-h">Opening Hours</p>
            {HOURS.map(x=>(
              <div key={x.d} className={`hour-row${x.hi?' hl':''}`}>
                <span className="d">{x.d}</span>
                <span className="t">{x.t}</span>
              </div>
            ))}
          </div>
          <div className="info-block">
            <p className="info-block-h">Contact</p>
            {[
              {icon:Phone,         lines:['041-8555583','041-8555584']},
              {icon:MessageCircle, lines:['+92 315 4674321 (WhatsApp)']},
              {icon:MapPin,        lines:['Do Burj Plaza, Faisalabad']},
              {icon:Clock,         lines:['Sunday Brunch: 11 AM – 2 PM']},
            ].map((c,i)=>(
              <div key={i} className="contact-item">
                <c.icon size={14} className="ci-icon"/>
                <div>{c.lines.map(l=><p key={l} className="ci-text">{l}</p>)}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...inUp(0.15)}>
          <form onSubmit={sub} className="form-box">
            <div className="f-row">
              <div>
                <label className="f-label">Full Name *</label>
                <input name="name" required value={form.name} onChange={h} placeholder="Your name" className="f-input"/>
              </div>
              <div>
                <label className="f-label">Phone *</label>
                <input name="phone" required value={form.phone} onChange={h} placeholder="03xx xxxxxxx" className="f-input"/>
              </div>
            </div>
            <div className="f-row1">
              <label className="f-label">Email (Optional)</label>
              <input name="email" type="email" value={form.email} onChange={h} placeholder="your@email.com" className="f-input"/>
            </div>
            <div className="f-row3">
              <div>
                <label className="f-label">Date *</label>
                <input name="date" type="date" required value={form.date} onChange={h} className="f-input"/>
              </div>
              <div>
                <label className="f-label">Time *</label>
                <input name="time" type="time" required value={form.time} onChange={h} className="f-input"/>
              </div>
              <div>
                <label className="f-label">Guests *</label>
                <select name="guests" value={form.guests} onChange={h} className="f-input">
                  {['1','2','3','4','5','6','7','8','10','12','15','20+'].map(n=><option key={n}>{n}</option>)}
                </select>
              </div>
            </div>
            <div className="f-row1">
              <label className="f-label">Occasion</label>
              <select name="type" value={form.type} onChange={h} className="f-input">
                {['Dinner','Sunday Brunch','Hi-Tea','Birthday','Anniversary','Corporate Dinner','Private Event','Other'].map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="f-row1">
              <label className="f-label">Special Requests</label>
              <textarea name="notes" value={form.notes} onChange={h} rows={3}
                placeholder="Dietary requirements, seating preferences, occasion details..."
                className="f-input" style={{resize:'vertical'}}/>
            </div>
            <button type="submit" className="f-submit">
              <MessageCircle size={14}/>
              {sent?'Opening WhatsApp…':'Confirm via WhatsApp'}
            </button>
            <p style={{fontSize:11,fontWeight:300,color:'rgba(107,79,58,0.3)',textAlign:'center',marginTop:13}}>
              Or call: 041-8555583 · 041-8555584
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════
   MAP
════════════════════════════════════════════ */
function MapSection() {
  return (
    <div className="map-wrap">
      <div className="map-badge">
        <p style={{fontSize:9.5,fontWeight:500,letterSpacing:'0.28em',textTransform:'uppercase',color:'var(--gold)',opacity:0.65,marginBottom:5}}>Find Us</p>
        <p className="map-badge-main">Do Burj Plaza</p>
        <p style={{fontSize:12,fontWeight:300,color:'rgba(255,255,255,0.3)',marginTop:3}}>Faisalabad, Pakistan</p>
      </div>
      <iframe title="Portobello Café" loading="lazy" allowFullScreen
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.0!2d73.0851!3d31.4504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391813cd6d3a6d2f%3A0x475c7c63e61d4b52!2sDo%20Burj%20Plaza%2C%20Faisalabad!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"/>
    </div>
  )
}

/* ════════════════════════════════════════════
   FOOTER
════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <p className="footer-brand">Portobello</p>
          <p className="footer-tagline">Café · Continental Dining · Faisalabad</p>
          <p className="footer-about">Brick walls, dark wood, gourmet burgers, hand-cut steaks, and the city's most iconic Molten Lava Cake. Do Burj Plaza, Faisalabad.</p>
        </div>
        <div>
          <p className="footer-col-h">Navigate</p>
          {['Menu','Sunday Brunch','Hi-Tea','Events','Reserve a Table'].map(l=>(
            <a key={l} href={`#${l.toLowerCase().replace(/\s+/g,'-')}`} className="footer-a">{l}</a>
          ))}
        </div>
        <div>
          <p className="footer-col-h">Hours</p>
          {HOURS.map(x=>(
            <div key={x.d} style={{marginBottom:10}}>
              <p style={{fontSize:11,fontWeight:300,color:'rgba(255,255,255,0.18)',marginBottom:2}}>{x.d}</p>
              <p style={{fontSize:12,fontWeight:x.hi?500:300,color:x.hi?'var(--gold)':'rgba(255,255,255,0.32)'}}>{x.t}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="footer-col-h">Contact</p>
          {[
            {icon:Phone,         t:'041-8555583\n041-8555584'},
            {icon:MessageCircle, t:'+92 315 4674321'},
            {icon:MapPin,        t:'Do Burj Plaza\nFaisalabad'},
            {icon:Instagram,     t:'facebook.com/PortobelloPK'},
          ].map((c,i)=>(
            <div key={i} style={{display:'flex',gap:10,marginBottom:13,alignItems:'flex-start'}}>
              <c.icon size={13} style={{color:'rgba(212,175,55,0.3)',flexShrink:0,marginTop:2}}/>
              <p style={{fontSize:12,fontWeight:300,color:'rgba(255,255,255,0.24)',lineHeight:1.65,whiteSpace:'pre-line'}}>{c.t}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">© 2025 Portobello Café, Faisalabad. All rights reserved.</p>
        <p className="footer-copy">Do Burj Plaza · Gourmet Burgers · Steaks · Sunday Brunch</p>
      </div>
    </footer>
  )
}

/* ════════════════════════════════════════════
   WA FLOAT
════════════════════════════════════════════ */
function WA() {
  const [show,setShow]=useState(false)
  useEffect(()=>{ const t=setTimeout(()=>setShow(true),2800); return ()=>clearTimeout(t) },[])
  return (
    <AnimatePresence>
      {show&&(
        <motion.a initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}
          exit={{scale:0}} transition={{type:'spring',stiffness:260,damping:20}}
          href="https://wa.me/923154674321?text=Hi%2C+I%27d+like+to+make+a+reservation+at+Portobello+Caf%C3%A9"
          target="_blank" rel="noopener noreferrer" className="wa">
          <MessageCircle size={24} color="#fff"/>
        </motion.a>
      )}
    </AnimatePresence>
  )
}

/* ════════════════════════════════════════════
   PAGE ROOT
════════════════════════════════════════════ */
export default function Home() {
  const [scrolled,setScrolled]=useState(false)

  /* Lenis smooth scroll */
  useEffect(()=>{
    const lenis = new Lenis({ lerp:0.08, smoothWheel:true })
    const raf = time=>{ lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return ()=>lenis.destroy()
  },[])

  useEffect(()=>{
    const h=()=>setScrolled(window.scrollY>60)
    window.addEventListener('scroll',h)
    return ()=>window.removeEventListener('scroll',h)
  },[])

  return (
    <>
      
      <Nav scrolled={scrolled}/>

      <Hero/>
      <Ticker/>

      {/* Story panel — text left, image right */}
      <PanelTextImg
        img={f3} num="01" flip={false}
        label="Our Story"
        h="A Café That Feels Like"
        em="Coming Home."
        body="Born from a love of unhurried meals and honest cooking, Portobello Café has been Faisalabad's quiet landmark since 2015. Brick walls, dark wood, warm lighting — a space where the city slows down and food does the talking."
        cta="Reserve a Table" ctaHref="#reserve"
      />

      {/* Full-bleed cover panel */}
      <PanelCover
        img={f4}
        h="Every Detail,"
        em="Considered."
        body="From the pendant lights to the plating — nothing at Portobello is accidental."
        cta="See the Menu" ctaHref="#menu"
      />

      <Menu/>

      {/* Brunch editorial panel */}
      <PanelTextImg
        img={f1} num="02" flip={true}
        label="Sunday Ritual"
        h="The Brunch That Became"
        em="A Tradition."
        body="What started as a weekend special became Faisalabad's most anticipated Sunday morning. Eggs Benedict, French Toast, bottomless coffee. Arrive at 11. Linger until 2."
        cta="See Brunch Menu" ctaHref="#brunch"
      />

      <Brunch/>

      {/* Second cover panel */}
      <PanelCover
        img={f2}
        h="Rustic Warmth."
        em="Continental Soul."
        body="The kind of place you bring people you want to impress — and people you want to relax with."
        cta="Book Hi-Tea" ctaHref="#reserve"
      />

      <Specials/>
      <Reviews/>
      <Events/>
      <Reserve/>
      <MapSection/>
      <Footer/>
      <WA/>
    </>
  )
}
