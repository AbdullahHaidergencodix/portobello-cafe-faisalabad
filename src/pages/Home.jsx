import logoImg from "../assets/images/logo.png";
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft, ChevronRight, MessageCircle,
  Phone, MapPin, Clock, Star,
  Calendar, Users, Wine, Instagram, ArrowRight
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

const SLIDES = [
  { img:h1, label:'Rustic · Brick · Dark Wood',   h:'Continental Dining,',        em:'Faisalabad\'s Finest.' },
  { img:h2, label:'Sunday Brunch · 11 AM – 2 PM', h:'The Brunch That Became',     em:'A Tradition.' },
  { img:h3, label:'Evening Dining',               h:'Warm Walls. Bold Flavours.', em:'Every Night.' },
  { img:h4, label:'Artisan Drinks & Hi-Tea',      h:'From First Coffee',          em:'To Last Bite.' },
]

const MENU = {
  'Sunday Brunch': [
    { name:'Eggs Benedict',          desc:'Poached eggs, Canadian bacon, hollandaise sauce on toasted brioche',       img:d5, price:'PKR 1,450', tag:"Chef's Pick" },
    { name:'Portobello Full Brunch', desc:'Eggs your way, smoked sausage, baked beans, grilled tomato, sourdough',    img:d8, price:'PKR 1,850', tag:'Best Seller' },
    { name:'French Toast Stack',     desc:'Thick-cut brioche, whipped mascarpone, berry compote, warm maple syrup',   img:d4, price:'PKR 1,250' },
    { name:'Smashed Avocado Toast',  desc:'Sourdough, smashed avo, chilli flakes, poached egg, feta crumble',         img:d7, price:'PKR 1,350' },
  ],
  'Gourmet Burgers': [
    { name:'Portobello Classic Burger',  desc:'200g beef patty, cheddar, caramelised onion, pickles, brioche bun, fries', img:d1, price:'PKR 1,650', tag:'Most Ordered' },
    { name:'Mushroom & Swiss Burger',    desc:'Beef patty, sautéed portobello mushrooms, Swiss cheese, truffle aioli',    img:d1, price:'PKR 1,750', tag:'Signature' },
    { name:'Crispy Chicken Burger',      desc:'Southern-fried chicken thigh, slaw, chipotle mayo, pickle, brioche bun',   img:d1, price:'PKR 1,550' },
  ],
  'Steaks & Mains': [
    { name:'Ribeye Steak',           desc:'300g grain-fed ribeye, roasted garlic butter, seasonal veg, fries',        img:d2, price:'PKR 3,800', tag:'Signature' },
    { name:'Sirloin & Mushroom Jus', desc:'200g sirloin, sautéed portobello mushrooms, red wine reduction, greens',   img:d2, price:'PKR 3,200', tag:'Most Ordered' },
    { name:'Atlantic Salmon Fillet', desc:'Pan-seared, lemon beurre blanc, asparagus, crushed potatoes',              img:d7, price:'PKR 2,800' },
    { name:'Truffle Mushroom Pasta', desc:'Fresh tagliatelle, black truffle cream, wild mushrooms, aged parmesan',    img:d6, price:'PKR 1,950' },
  ],
  'Hi-Tea': [
    { name:'Portobello Hi-Tea for 2', desc:'Finger sandwiches, scones, macarons, mini pastries, pot of tea or coffee', img:d4, price:'PKR 3,200', tag:'Weekend Special' },
    { name:'High Tea Deluxe for 4',   desc:'Extended spread with additional savouries, desserts, and bottomless tea',  img:d4, price:'PKR 5,800', tag:'Best Value' },
  ],
  'Desserts': [
    { name:'Molten Lava Cake',       desc:'Warm dark chocolate fondant, vanilla bean ice cream, chocolate drizzle',   img:d3, price:'PKR 850',   tag:'Must Try' },
    { name:'Portobello Tiramisu',    desc:'House-made, espresso-soaked ladyfingers, mascarpone cream, cocoa dust',    img:c2, price:'PKR 850',   tag:'Signature' },
    { name:'Crème Brûlée',           desc:'Classic vanilla custard, torched caramel crust, fresh berry garnish',      img:c1, price:'PKR 800' },
  ],
}

const HOURS = [
  { day:'Monday – Thursday', time:'12:00 PM – 11:00 PM' },
  { day:'Friday',             time:'12:00 PM – 12:00 AM' },
  { day:'Saturday',           time:'11:00 AM – 12:00 AM' },
  { day:'Sunday Brunch',      time:'11:00 AM – 2:00 PM',  hi:true },
  { day:'Sunday Dinner',      time:'6:00 PM – 11:00 PM' },
]

const REVIEWS = [
  { name:'Sana K.',       r:5, text:'The Molten Lava Cake alone is worth the visit. Warm, gooey, perfect. But honestly everything here is 10/10 — the ambiance, the service, the food.' },
  { name:'Ahmad R.',      r:5, text:'Best steak in Faisalabad — no contest. The Ribeye is cooked perfectly every time. Dark wood, brick walls, candle light — feels like a completely different city.' },
  { name:'Maryam T.',     r:5, text:'Came for Hi-Tea with my girls and it was stunning. The spread was generous, the setting was beautiful, and the macarons were divine.' },
  { name:'Usman & Hira',  r:5, text:'Our anniversary dinner here was flawless. The Mushroom & Swiss Burger is secretly the best thing on the menu. Will be back every month.' },
  { name:'Fatima A.',     r:5, text:'Sunday Brunch is a ritual now. Eggs Benedict every week. The coffee is always perfect and the staff remembers your order. Rare in this city.' },
]

const NAV_SECTIONS = ['menu','brunch','hitea','events','reserve']
const fade  = (d=0) => ({ initial:{opacity:0,y:32}, whileInView:{opacity:1,y:0}, viewport:{once:true,margin:'-80px'}, transition:{duration:1,delay:d,ease:[0.22,1,0.36,1]} })
const fadeL = (d=0) => ({ initial:{opacity:0,x:-32}, whileInView:{opacity:1,x:0}, viewport:{once:true,margin:'-80px'}, transition:{duration:1,delay:d,ease:[0.22,1,0.36,1]} })

function LazyImg({ src, alt, className, style }) {
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.src = src; obs.disconnect() }
    }, { rootMargin: '200px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [src])
  return (
    <img ref={ref} alt={alt||''} className={className}
      style={{...style, transition:'opacity 0.4s', opacity:loaded?1:0}}
      onLoad={() => setLoaded(true)}/>
  )
}

function Nav({ scrolled, activeSection }) {
  const [open, setOpen] = useState(false)
  const links = [
    { label:'Menu',    href:'#menu'    },
    { label:'Brunch',  href:'#brunch'  },
    { label:'Hi-Tea',  href:'#hitea'   },
    { label:'Events',  href:'#events'  },
    { label:'Reserve', href:'#reserve' },
  ]
  return (
    <>
      <nav className={`nav${scrolled?' scrolled':''}`}>
        <a href="#" onClick={e=>{e.preventDefault();window.scrollTo({top:0,behavior:"smooth"})}} style={{textDecoration:"none",cursor:"pointer"}}><img src={logoImg} alt="Portobello" style={{height:"38px",width:"auto"}}/></a>
        <ul className="nav-links">
          {links.map(l=>(
            <li key={l.label}>
              <a href={l.href} style={{
                borderBottom: activeSection===l.href.replace('#','') ? '1px solid var(--gold)' : '1px solid transparent',
                paddingBottom:'2px',
                color: activeSection===l.href.replace('#','') ? 'var(--gold)' : '',
                transition:'all 0.3s'
              }}>{l.label}</a>
            </li>
          ))}
        </ul>
        <a href="#reserve" className="nav-cta">Reserve</a>
        <button className="mob-toggle" aria-label="Toggle menu" onClick={()=>setOpen(o=>!o)}>
          {open?'✕':'☰'}
        </button>
      </nav>
      <AnimatePresence>
        {open&&(
          <motion.div
            initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}
            style={{position:'fixed',top:68,left:0,right:0,zIndex:99,
              background:'rgba(10,8,5,0.97)',backdropFilter:'blur(24px)',
              padding:'32px clamp(24px,5vw,80px)',
              borderBottom:'1px solid rgba(212,175,55,0.1)',
              display:'flex',flexDirection:'column',gap:'22px'}}>
            {links.map(l=>(
              <a key={l.label} href={l.href} onClick={()=>setOpen(false)}
                style={{fontFamily:'var(--sans)',fontSize:'13px',letterSpacing:'0.18em',
                  textTransform:'uppercase',
                  color:activeSection===l.href.replace('#','') ? 'var(--gold)' : 'rgba(255,255,255,0.5)',
                  fontWeight:500}}>
                {l.label}
              </a>
            ))}
            <a href="tel:+92418555583"
              style={{fontFamily:'var(--sans)',fontSize:'13px',color:'var(--gold)',display:'flex',alignItems:'center',gap:'6px'}}>
              <Phone size={12}/> 041-8555583
            </a>
            <a href="tel:+92418555584"
              style={{fontFamily:'var(--sans)',fontSize:'13px',color:'rgba(212,175,55,0.6)',display:'flex',alignItems:'center',gap:'6px'}}>
              <Phone size={12}/> 041-8555584
            </a>
            <a href="https://wa.me/923154674321" target="_blank" rel="noopener noreferrer"
              style={{fontFamily:'var(--sans)',fontSize:'13px',color:'rgba(212,175,55,0.6)',display:'flex',alignItems:'center',gap:'6px'}}>
              <MessageCircle size={12}/> WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Hero() {
  const [slide, setSlide] = useState(0)
  const s = SLIDES[slide]
  useEffect(()=>{
    const t = setInterval(()=>setSlide(i=>(i+1)%SLIDES.length), 6000)
    return ()=>clearInterval(t)
  },[])
  return (
    <section className="hero">
      {SLIDES.map((sl,i)=>(
        <img key={i} src={sl.img} alt="" className="hero-img"
          style={{opacity:i===slide?1:0,zIndex:i===slide?1:0}}/>
      ))}
      <div className="hero-overlay" style={{zIndex:2}}/>
      <div className="hero-content" style={{zIndex:3}}>
        <motion.div className="hero-eyebrow"
          initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{duration:0.9,delay:0.3}}>
          <div className="hero-eyebrow-line"/>
          <AnimatePresence mode="wait">
            <motion.span key={slide} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              transition={{duration:0.5}} className="t-label">{s.label}</motion.span>
          </AnimatePresence>
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.h1 key={slide} className="hero-h1"
            initial={{opacity:0,y:36}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-24}}
            transition={{duration:0.95,ease:[0.22,1,0.36,1]}}>
            {s.h}<em>{s.em}</em>
          </motion.h1>
        </AnimatePresence>
        <motion.p className="hero-sub"
          initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.9,delay:0.5}}>
          Brick walls. Dark wood. Gourmet burgers, hand-cut steaks, legendary brunch,
          and a Molten Lava Cake you'll dream about. Do Burj Plaza, Faisalabad.
        </motion.p>
        <motion.div className="hero-actions"
          initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.9,delay:0.65}}>
          <a href="#reserve" className="btn-primary"><Calendar size={13}/> Book a Table</a>
          <a href="#menu" className="btn-ghost">See the Menu <ArrowRight size={13}/></a>
        </motion.div>
      </div>
      <div className="slide-dots" style={{zIndex:3}}>
        {SLIDES.map((_,i)=>(
          <button key={i} onClick={()=>setSlide(i)} className={`slide-dot${i===slide?' active':''}`}/>
        ))}
      </div>
      <div className="hero-scroll" style={{zIndex:3}}>
        <div className="hero-scroll-line"/>
        <span>Scroll</span>
      </div>
    </section>
  )
}

function Marquee() {
  const items = ['Gourmet Burgers','Sunday Brunch','Molten Lava Cake','Hi-Tea','Brick & Dark Wood','Do Burj Plaza','Hand-Cut Steaks','Artisan Coffee','Est. 2015','Faisalabad']
  const doubled = [...items,...items]
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {doubled.map((t,i)=>(
          <span key={i} className="marquee-item">{t}<span className="marquee-dot"/></span>
        ))}
      </div>
    </div>
  )
}

function Editorial({ flip, imgSrc, num, label, h, em, body, cta, ctaHref }) {
  return (
    <section className={`editorial${flip?' flip':''}`}>
      <div className="editorial-img"><LazyImg src={imgSrc} alt={h}/></div>
      <motion.div {...fade(0)} className="editorial-copy">
        <span className="editorial-num">{num}</span>
        <p className="t-label" style={{marginBottom:'16px'}}>{label}</p>
        <h2 className="editorial-h2">{h}<em>{em}</em></h2>
        <div className="editorial-divider"/>
        <p className="t-body" style={{marginBottom:'36px',maxWidth:'380px'}}>{body}</p>
        {cta&&(
          <a href={ctaHref} className="btn-ghost" style={{color:'var(--gold)',borderColor:'rgba(212,175,55,0.28)'}}>
            {cta} <ArrowRight size={13}/>
          </a>
        )}
      </motion.div>
    </section>
  )
}

function FullBleed({ src, caption }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const offset = rect.top * 0.4
      el.querySelector('img').style.transform = `translateY(${offset}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div ref={ref} className="fullbleed" style={{overflow:'hidden'}}>
      <div className="fullbleed-overlay"/>
      <LazyImg src={src} alt={caption||''} style={{width:'100%',height:'120%',objectFit:'cover',willChange:'transform'}}/>
      {caption&&<p className="fullbleed-caption">{caption}</p>}
    </div>
  )
}

function MenuSection() {
  const [active, setActive] = useState('Sunday Brunch')
  const tabs = Object.keys(MENU)
  return (
    <section id="menu" className="menu-section">
      <motion.div {...fade(0)} className="menu-header">
        <div className="menu-header-inner">
          <div>
            <p className="t-label" style={{color:'var(--mocha)',marginBottom:'12px'}}>Curated For You</p>
            <h2 className="menu-h2">Our <em>Menu</em></h2>
          </div>
          <div className="menu-tabs">
            {tabs.map(t=>(
              <button key={t} onClick={()=>setActive(t)} className={`menu-tab${active===t?' active':''}`}>{t}</button>
            ))}
          </div>
        </div>
        <div style={{width:'100%',height:'1px',background:'rgba(107,79,58,0.1)',marginTop:'44px'}}/>
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.ul key={active}
          initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
          transition={{duration:0.5}} className="menu-list">
          {MENU[active].map((item,i)=>(
            <motion.li key={item.name} {...fade(i*0.07)} className="menu-item">
              <div className="menu-item-left">
                <div className="menu-item-img"><LazyImg src={item.img} alt={item.name}/></div>
                <div>
                  <p className="menu-item-name">{item.name}</p>
                  <p className="menu-item-desc">{item.desc}</p>
                  {item.tag&&<span className="menu-item-tag">{item.tag}</span>}
                </div>
              </div>
              <p className="menu-item-price">{item.price}</p>
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>
      <motion.div {...fade(0.2)} style={{textAlign:'center',marginTop:'52px'}}>
        <a href="https://wa.me/923154674321?text=Hi%2C+I%27d+like+the+full+menu+for+Portobello+Caf%C3%A9"
          target="_blank" rel="noopener noreferrer" className="btn-ghost"
          style={{color:'var(--mocha)',borderColor:'rgba(107,79,58,0.22)',fontSize:'10px',letterSpacing:'0.2em'}}>
          <MessageCircle size={13}/> Get Full Menu on WhatsApp <ArrowRight size={13}/>
        </a>
      </motion.div>
    </section>
  )
}

function Brunch() {
  return (
    <section id="brunch" className="brunch-section">
      <div className="brunch-grid">
        <motion.div {...fadeL(0)} className="brunch-img-stack">
          <div className="main-img"><LazyImg src={f2} alt="Sunday Brunch spread"/></div>
          <div className="sm-img"><LazyImg src={d5} alt="Eggs Benedict"/></div>
          <div className="sm-img"><LazyImg src={c1} alt="Artisan coffee"/></div>
        </motion.div>
        <motion.div {...fade(0.15)}>
          <p className="t-label" style={{color:'var(--mocha)',marginBottom:'14px'}}>Every Sunday</p>
          <h2 className="brunch-h2">The Sunday<em>Brunch.</em></h2>
          <p className="t-body" style={{color:'rgba(26,18,8,0.5)',maxWidth:'400px'}}>
            Faisalabad's most talked-about weekend ritual. A curated continental spread,
            perfectly poured coffee, and the kind of unhurried morning that makes Sunday
            the best day of the week.
          </p>
          <div className="brunch-meta">
            {[{l:'Time',v:'11 AM – 2 PM'},{l:'Day',v:'Every Sunday'},{l:'Booking',v:'Recommended'}].map(m=>(
              <div key={m.l}>
                <p className="brunch-meta-label">{m.l}</p>
                <p className="brunch-meta-val">{m.v}</p>
              </div>
            ))}
          </div>
          <a href="#reserve" className="btn-primary"
            style={{background:'var(--mocha)',boxShadow:'0 8px 32px rgba(107,79,58,0.22)'}}>
            <Calendar size={13}/> Reserve Your Sunday Table
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function HiTea() {
  const cards = [
    { img:d4, title:'Hi-Tea for Two',       sub:'Finger sandwiches, scones, macarons, mini pastries & bottomless tea' },
    { img:d3, title:'Molten Lava Cake',     sub:'The dessert Faisalabad talks about. Warm chocolate fondant, vanilla ice cream' },
    { img:c2, title:'Portobello Tiramisu',  sub:'House-made, espresso-soaked, mascarpone cream. A signature since day one' },
  ]
  return (
    <section id="hitea" className="hitea-strip">
      <div style={{maxWidth:'1200px',margin:'0 auto'}}>
        <motion.div {...fade(0)} style={{marginBottom:'clamp(40px,5vh,64px)'}}>
          <p className="t-label" style={{marginBottom:'14px'}}>Weekend Ritual</p>
          <h2 className="t-display" style={{fontSize:'clamp(40px,5vw,72px)',color:'var(--white)'}}>
            Hi-Tea & <em style={{fontStyle:'italic',color:'var(--gold)'}}>Sweet Things</em>
          </h2>
          <p className="t-body" style={{maxWidth:'460px',marginTop:'16px'}}>
            From afternoon Hi-Tea spreads to the city's most iconic Molten Lava Cake —
            Portobello does dessert like nowhere else in Faisalabad.
          </p>
        </motion.div>
        <div className="hitea-inner">
          {cards.map((c,i)=>(
            <motion.div key={c.title} {...fade(i*0.1)} className="hitea-card">
              <LazyImg src={c.img} alt={c.title}/>
              <div className="hitea-card-overlay"/>
              <div className="hitea-gold-line"/>
              <div className="hitea-card-copy">
                <p className="hitea-card-title">{c.title}</p>
                <p className="hitea-card-sub">{c.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div {...fade(0.3)} style={{textAlign:'center',marginTop:'44px'}}>
          <a href="#reserve" className="btn-primary"><Calendar size={13}/> Book Hi-Tea</a>
        </motion.div>
      </div>
    </section>
  )
}

function Reviews() {
  const [start, setStart] = useState(0)
  const perPage = typeof window!=='undefined'&&window.innerWidth<960 ? 1 : 3
  const max = REVIEWS.length - perPage
  const prev = ()=>setStart(s=>Math.max(0,s-1))
  const next = ()=>setStart(s=>Math.min(max,s+1))
  useEffect(()=>{
    const t = setInterval(()=>setStart(s=>(s>=max?0:s+1)), 5000)
    return ()=>clearInterval(t)
  },[max])
  return (
    <section className="reviews-section">
      <div style={{maxWidth:'1200px',margin:'0 auto'}}>
        <motion.div {...fade(0)} style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',flexWrap:'wrap',gap:'24px',marginBottom:'48px'}}>
          <div>
            <p className="t-label" style={{marginBottom:'14px'}}>Guest Reviews</p>
            <h2 className="t-display" style={{fontSize:'clamp(38px,5vw,68px)',color:'var(--white)'}}>
              What Our <em style={{fontStyle:'italic',color:'var(--gold)'}}>Guests Say</em>
            </h2>
          </div>
          <div className="review-nav">
            <button onClick={prev} className="review-nav-btn"><ChevronLeft size={18}/></button>
            <button onClick={next} className="review-nav-btn"><ChevronRight size={18}/></button>
          </div>
        </motion.div>
        <div className="review-track-wrap">
          <div className="review-track"
            style={{transform:`translateX(calc(-${start*(100/perPage)}% - ${start*20/perPage}px))`}}>
            {REVIEWS.map((r,i)=>(
              <motion.div key={r.name} {...fade(i*0.08)} className="review-card">
                <div className="review-stars">
                  {Array(r.r).fill(0).map((_,j)=><Star key={j} size={14} fill="#d4af37" color="#d4af37"/>)}
                </div>
                <p className="review-quote">"{r.text}"</p>
                <p className="review-author">— {r.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Events() {
  return (
    <section id="events" className="events-section">
      <div style={{maxWidth:'1200px',margin:'0 auto'}}>
        <motion.div {...fade(0)}>
          <p className="t-label" style={{marginBottom:'14px'}}>Private & Corporate</p>
          <h2 className="t-display" style={{fontSize:'clamp(40px,5vw,72px)',color:'var(--white)'}}>
            Host Your <em style={{fontStyle:'italic',color:'var(--gold)'}}>Event</em>
          </h2>
          <p className="t-body" style={{maxWidth:'460px',marginTop:'18px'}}>
            From intimate birthday dinners to corporate events for 80+, Portobello Café
            offers a venue at Do Burj Plaza that speaks for itself.
          </p>
        </motion.div>
        <div className="events-grid">
          {[
            { img:f5, icon:Wine,  title:'Private Celebrations', desc:'Birthdays, anniversaries, family gatherings. Custom menus. A setting that feels personal and special.' },
            { img:f6, icon:Users, title:'Corporate Dinners',    desc:'Impress your clients in a venue that reflects your standards. AV support, custom menus, seamless service.' },
          ].map((e,i)=>(
            <motion.div key={e.title} {...fade(i*0.12)} className="event-card">
              <LazyImg src={e.img} alt={e.title}/>
              <div className="event-overlay"/>
              <div className="event-top-line"/>
              <div className="event-copy">
                <e.icon size={26} className="event-icon"/>
                <h3 className="event-title">{e.title}</h3>
                <p className="event-desc">{e.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Reserve() {
  const [form, setForm] = useState({name:'',phone:'',email:'',date:'',time:'',guests:'2',type:'Dinner',notes:''})
  const [sent, setSent] = useState(false)
  const handle = e => setForm(f=>({...f,[e.target.name]:e.target.value}))
  const submit = e => {
    e.preventDefault()
    const msg = encodeURIComponent(
      `*Portobello Café — Reservation*\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email||'N/A'}\nDate: ${form.date}\nTime: ${form.time}\nGuests: ${form.guests}\nOccasion: ${form.type}\nNotes: ${form.notes||'None'}`
    )
    window.open(`https://wa.me/923154674321?text=${msg}`,'_blank')
    setSent(true); setTimeout(()=>setSent(false),5000)
  }
  return (
    <section id="reserve" className="reserve-section">
      <div style={{maxWidth:'1200px',margin:'0 auto'}}>
        <motion.div {...fade(0)}>
          <p className="t-label" style={{color:'var(--mocha)',marginBottom:'14px'}}>Secure Your Seat</p>
          <h2 style={{fontFamily:'var(--serif)',fontSize:'clamp(40px,5vw,72px)',fontWeight:400,lineHeight:0.92,color:'var(--ink)'}}>
            Book a <em style={{fontStyle:'italic',color:'var(--mocha)'}}>Table</em>
          </h2>
          <p style={{fontFamily:'var(--sans)',fontSize:'13px',fontWeight:300,color:'rgba(26,18,8,0.42)',marginTop:'14px'}}>
            Confirmed via WhatsApp within 30 minutes.
          </p>
        </motion.div>
        <div className="reserve-grid">
          <motion.div {...fadeL(0.1)}>
            <div className="reserve-info-block">
              <h3 className="reserve-info-h3">Opening Hours</h3>
              {HOURS.map(h=>(
                <div key={h.day} className={`hours-row${h.hi?' hi':''}`}>
                  <span className="day">{h.day}</span>
                  <span className="time">{h.time}</span>
                </div>
              ))}
            </div>
            <div className="reserve-info-block">
              <h3 className="reserve-info-h3">Contact</h3>
              {[
                { icon:Phone,         lines:[{text:'041-8555583',href:'tel:+92418555583'},{text:'041-8555584',href:'tel:+92418555584'}] },
                { icon:MessageCircle, lines:[{text:'+92 315 4674321 (WhatsApp)',href:'https://wa.me/923154674321'}] },
                { icon:MapPin,        lines:[{text:'Do Burj Plaza, Faisalabad',href:'https://maps.google.com/?q=Do+Burj+Plaza+Faisalabad'}] },
                { icon:Clock,         lines:[{text:'Sunday Brunch: 11 AM – 2 PM',href:null}] },
              ].map((c,i)=>(
                <div key={i} className="contact-row">
                  <c.icon size={14} className="contact-icon"/>
                  <div>
                    {c.lines.map(l=>
                      l.href
                        ? <a key={l.text} href={l.href}
                            target={l.href.startsWith('http')?'_blank':undefined}
                            rel={l.href.startsWith('http')?'noopener noreferrer':undefined}
                            style={{fontSize:'13px',fontWeight:300,color:'rgba(247,243,238,0.42)',lineHeight:'1.65',display:'block',textDecoration:'none',transition:'color 0.2s'}}
                            onMouseEnter={e=>e.currentTarget.style.color='var(--gold)'}
                            onMouseLeave={e=>e.currentTarget.style.color='rgba(247,243,238,0.42)'}>
                            {l.text}
                          </a>
                        : <p key={l.text} style={{fontSize:'13px',fontWeight:300,color:'rgba(247,243,238,0.42)',lineHeight:'1.65'}}>{l.text}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div {...fade(0.15)}>
            <form onSubmit={submit} className="pb-form">
              <div className="form-row">
                <div>
                  <label className="form-label">Full Name *</label>
                  <input name="name" required value={form.name} onChange={handle} placeholder="Your name" className="pb-input"/>
                </div>
                <div>
                  <label className="form-label">Phone *</label>
                  <input name="phone" required value={form.phone} onChange={handle} placeholder="03xx xxxxxxx" className="pb-input"/>
                </div>
              </div>
              <div className="form-row-1">
                <label className="form-label">Email (Optional)</label>
                <input name="email" type="email" value={form.email} onChange={handle} placeholder="your@email.com" className="pb-input"/>
              </div>
              <div className="form-row-3">
                <div>
                  <label className="form-label">Date *</label>
                  <input name="date" type="date" required value={form.date} onChange={handle} className="pb-input"/>
                </div>
                <div>
                  <label className="form-label">Time *</label>
                  <input name="time" type="time" required value={form.time} onChange={handle} className="pb-input"/>
                </div>
                <div>
                  <label className="form-label">Guests *</label>
                  <select name="guests" value={form.guests} onChange={handle} className="pb-input">
                    {['1','2','3','4','5','6','7','8','10','12','15','20+'].map(n=><option key={n}>{n}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row-1">
                <label className="form-label">Occasion</label>
                <select name="type" value={form.type} onChange={handle} className="pb-input">
                  {['Dinner','Sunday Brunch','Hi-Tea','Birthday','Anniversary','Corporate Dinner','Private Event','Other'].map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-row-1">
                <label className="form-label">Special Requests</label>
                <textarea name="notes" value={form.notes} onChange={handle} rows={3}
                  placeholder="Dietary requirements, seating preferences, occasion details..."
                  className="pb-input" style={{resize:'vertical'}}/>
              </div>
              <button type="submit" className="form-submit">
                <MessageCircle size={14}/>
                {sent?'Opening WhatsApp…':'Confirm Reservation via WhatsApp'}
              </button>
              <p style={{fontSize:'11px',fontWeight:300,color:'rgba(107,79,58,0.32)',textAlign:'center',marginTop:'13px'}}>
                Or call: <a href="tel:+92418555583" style={{color:'rgba(107,79,58,0.5)',textDecoration:'none'}}>041-8555583</a>
                {' · '}
                <a href="tel:+92418555584" style={{color:'rgba(107,79,58,0.5)',textDecoration:'none'}}>041-8555584</a>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function MapSection() {
  return (
    <div className="map-section">
      <div className="map-badge">
        <p className="t-label" style={{marginBottom:'6px'}}>Find Us</p>
        <p style={{fontFamily:'var(--serif)',fontSize:'22px',color:'var(--white)',fontWeight:400}}>Do Burj Plaza</p>
        <p style={{fontSize:'12px',fontWeight:300,color:'rgba(255,255,255,0.32)',marginTop:'4px'}}>Faisalabad, Pakistan</p>
      </div>
      <iframe title="Portobello Café" loading="lazy" allowFullScreen
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.0!2d73.0851!3d31.4504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391813cd6d3a6d2f%3A0x475c7c63e61d4b52!2sDo%20Burj%20Plaza%2C%20Faisalabad!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"/>
    </div>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div style={{maxWidth:'1200px',margin:'0 auto'}}>
        <div className="footer-top">
          <div>
            <p className="footer-brand-name">Portobello</p>
            <p className="footer-brand-sub">Café · Continental Dining · Faisalabad</p>
            <p style={{fontSize:'12px',fontWeight:300,color:'rgba(255,255,255,0.28)',lineHeight:'1.85',maxWidth:'240px'}}>
              Brick walls, dark wood, gourmet burgers, hand-cut steaks, and the city's most iconic Molten Lava Cake.
            </p>
            <a href="https://www.facebook.com/PortobelloPK/" target="_blank" rel="noopener noreferrer"
              style={{display:'inline-flex',alignItems:'center',justifyContent:'center',
                width:'36px',height:'36px',border:'1px solid rgba(212,175,55,0.15)',
                color:'rgba(212,175,55,0.45)',marginTop:'20px',transition:'all 0.3s'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--gold)';e.currentTarget.style.color='var(--gold)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(212,175,55,0.15)';e.currentTarget.style.color='rgba(212,175,55,0.45)'}}>
              <Instagram size={15}/>
            </a>
          </div>
          <div>
            <p className="footer-col-title">Navigate</p>
            {['Menu','Sunday Brunch','Hi-Tea','Events','Reserve a Table'].map(l=>(
              <a key={l} href={`#${l.toLowerCase().replace(/\s+/g,'-')}`} className="footer-link">{l}</a>
            ))}
          </div>
          <div>
            <p className="footer-col-title">Hours</p>
            {HOURS.map(h=>(
              <div key={h.day} style={{marginBottom:'10px'}}>
                <p style={{fontSize:'11px',fontWeight:300,color:'rgba(255,255,255,0.18)',marginBottom:'2px'}}>{h.day}</p>
                <p style={{fontSize:'12px',fontWeight:h.hi?500:300,color:h.hi?'var(--gold)':'rgba(255,255,255,0.35)'}}>{h.time}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="footer-col-title">Contact</p>
            {[
              { icon:Phone,         text:'041-8555583',              href:'tel:+92418555583' },
              { icon:Phone,         text:'041-8555584',              href:'tel:+92418555584' },
              { icon:MessageCircle, text:'+92 315 4674321',          href:'https://wa.me/923154674321' },
              { icon:MapPin,        text:'Do Burj Plaza, Faisalabad',href:'https://maps.google.com/?q=Do+Burj+Plaza+Faisalabad' },
              { icon:Instagram,     text:'facebook.com/PortobelloPK',href:'https://www.facebook.com/PortobelloPK/' },
            ].map((c,i)=>(
              <div key={i} style={{display:'flex',gap:'10px',marginBottom:'13px',alignItems:'flex-start'}}>
                <c.icon size={13} style={{color:'rgba(212,175,55,0.32)',flexShrink:0,marginTop:'2px'}}/>
                <a href={c.href}
                  target={c.href.startsWith('http')?'_blank':undefined}
                  rel={c.href.startsWith('http')?'noopener noreferrer':undefined}
                  style={{fontSize:'12px',fontWeight:300,color:'rgba(255,255,255,0.25)',lineHeight:'1.65',textDecoration:'none',transition:'color 0.2s'}}
                  onMouseEnter={e=>e.currentTarget.style.color='var(--gold)'}
                  onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.25)'}>
                  {c.text}
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© 2025 Portobello Café, Faisalabad. All rights reserved.</p>
          <p className="footer-copy">Do Burj Plaza · Gourmet Burgers · Steaks · Sunday Brunch</p>
        </div>
      </div>
    </footer>
  )
}

function WAFloat() {
  const [show, setShow] = useState(false)
  useEffect(()=>{ const t=setTimeout(()=>setShow(true),2500); return ()=>clearTimeout(t) },[])
  return (
    <AnimatePresence>
      {show&&(
        <motion.a
          initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}
          exit={{scale:0,opacity:0}} transition={{type:'spring',stiffness:260,damping:20}}
          href="https://wa.me/923154674321?text=Hi%2C+I%27d+like+to+make+a+reservation+at+Portobello+Caf%C3%A9"
          target="_blank" rel="noopener noreferrer"
          className="wa-float" title="Chat on WhatsApp">
          <MessageCircle size={24} color="#fff"/>
        </motion.a>
      )}
    </AnimatePresence>
  )
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  useEffect(()=>{
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      let current = ''
      for (const id of NAV_SECTIONS) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) current = id
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive:true })
    return () => window.removeEventListener('scroll', onScroll)
  },[])
  return (
    <>
      <Nav scrolled={scrolled} activeSection={activeSection}/>
      <Hero/>
      <Marquee/>
      <Editorial imgSrc={f3} num="01" flip={false} label="Our Story"
        h="A Café That Feels Like" em="Coming Home."
        body="Born from a love of unhurried meals and honest cooking, Portobello Café has been Faisalabad's quiet landmark since 2015. Brick walls, dark wood, warm lighting — a space where the city slows down and food does the talking."
        cta="Reserve a Table" ctaHref="#reserve"/>
      <FullBleed src={f4} caption="Every detail, considered."/>
      <MenuSection/>
      <Editorial imgSrc={f1} num="02" flip={true} label="Sunday Ritual"
        h="The Brunch That Became" em="A Tradition."
        body="What started as a weekend special became Faisalabad's most anticipated Sunday morning. Eggs Benedict, French Toast, bottomless coffee. Arrive at 11. Linger until 2. You've earned it."
        cta="See the Brunch Menu" ctaHref="#brunch"/>
      <Brunch/>
      <HiTea/>
      <FullBleed src={f2} caption="Rustic warmth. Continental soul."/>
      <Reviews/>
      <Events/>
      <Reserve/>
      <MapSection/>
      <Footer/>
      <WAFloat/>
    </>
  )
}
