import { useEffect, useMemo, useRef, useState } from 'react'
import heroImg from './assets/smartwatch-hero.webp'
import './App.css'

const features = [
  {
    title: '24/7 health tracking',
    text: 'Heart rate, SpO2, stress, and sleep sensors turn daily signals into clear wellness insights.',
    icon: 'pulse',
  },
  {
    title: 'Smart alerts',
    text: 'Get timely prompts when movement, rest, or recovery patterns need your attention.',
    icon: 'bell',
  },
  {
    title: '12-day battery',
    text: 'Efficient hardware and magnetic charging keep AeroBand ready for packed schedules.',
    icon: 'battery',
  },
]

const specs = [
  ['Display', '1.42-inch AMOLED, 466 x 466'],
  ['Sensors', '8-channel PPG, SpO2, 6-axis motion'],
  ['Water resistance', '5 ATM for swimming and heavy rain'],
  ['Connectivity', 'Bluetooth 5.3, iOS and Android'],
  ['Weight', '28 g with a soft silicone strap'],
  ['Warranty', '18 months, 30-day replacement'],
]

const products = [
  { id: 'graphite', name: 'Graphite Core', price: '2.490.000đ', icon: 'watch' },
  { id: 'mist', name: 'Mist Silver', price: '2.690.000đ', icon: 'watch' },
  { id: 'terra', name: 'Terra Sport', price: '2.790.000đ', icon: 'watch' },
]

// 1. Premium Inline SVG Icon Helper Component
function Icon({ name, className = '' }) {
  switch (name) {
    case 'pulse':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      )
    case 'bell':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      )
    case 'battery':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
          <line x1="22" y1="11" x2="22" y2="13" />
        </svg>
      )
    case 'heart':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      )
    case 'cart':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      )
    case 'trash':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      )
    case 'chat':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      )
    case 'send':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      )
    case 'x':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      )
    case 'sun':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      )
    case 'moon':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )
    case 'watch':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Watch Straps */}
          <path d="M9 5V1.5h6V5M9 19v3.5h6V19" strokeWidth="1.5" opacity="0.5" stroke="currentColor" />
          <line x1="11" y1="2" x2="11" y2="4.5" stroke="currentColor" opacity="0.3" strokeWidth="1" />
          <line x1="13" y1="2" x2="13" y2="4.5" stroke="currentColor" opacity="0.3" strokeWidth="1" />
          <line x1="11" y1="19.5" x2="11" y2="22" stroke="currentColor" opacity="0.3" strokeWidth="1" />
          <line x1="13" y1="19.5" x2="13" y2="22" stroke="currentColor" opacity="0.3" strokeWidth="1" />
          
          {/* Watch Bezel / Case */}
          <rect x="5.5" y="4.5" width="13" height="15" rx="3" fill="var(--surface)" stroke="currentColor" strokeWidth="1.8" />
          
          {/* Watch Screen Border */}
          <rect x="7" y="6" width="10" height="12" rx="1.5" fill="var(--panel)" stroke="currentColor" opacity="0.75" strokeWidth="1" />
          
          {/* Watch Crown (side button) */}
          <rect x="18.5" y="10.5" width="1" height="3" rx="0.5" fill="currentColor" />
          
          {/* Screen Dial & Details */}
          <circle cx="12" cy="12" r="3.5" stroke="var(--primary)" strokeWidth="1" fill="var(--surface)" />
          {/* Analog Hands */}
          <line x1="12" y1="12" x2="12" y2="10" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="12" y1="12" x2="14" y2="12" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" />
          {/* Screen status dots */}
          <circle cx="9" cy="8" r="0.6" fill="var(--primary)" />
          <circle cx="15" cy="8" r="0.6" fill="var(--primary)" />
        </svg>
      )
    default:
      return null
  }
}

function App() {
  const [theme, setTheme] = useState('light')
  const [favorites, setFavorites] = useState(['graphite'])
  const [cart, setCart] = useState([])
  const [recent, setRecent] = useState(['Graphite Core'])
  const [notice, setNotice] = useState('')
  const [form, setForm] = useState({ name: '', email: '', interest: 'preorder' })
  const [formState, setFormState] = useState('idle')
  const [chatOpen, setChatOpen] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [chatTyping, setChatTyping] = useState(false)
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false)
  const scrollNoticeShown = useRef(false)
  
  const [chatMessages, setChatMessages] = useState([
    { from: 'bot', text: 'Hi! I can help you with AeroBand Pulse battery life, features, pricing, and preorder offers. Ask me anything!' },
  ])

  const chatEndRef = useRef(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  // Behavioral tracking: Scroll past 420px toast notification
  useEffect(() => {
    const onScroll = () => {
      if (!scrollNoticeShown.current && window.scrollY > 420) {
        scrollNoticeShown.current = true
        setNotice('User behavior: Viewing detailed AeroBand Pulse technical specifications.')
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Auto-clear toast notice after 3 seconds
  useEffect(() => {
    if (!notice) {
      return undefined
    }

    const timer = window.setTimeout(() => setNotice(''), 3000)
    return () => window.clearTimeout(timer)
  }, [notice])

  // Scroll chatbot to bottom when new messages arrive
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatMessages, chatTyping])

  // Computed totals for cart items
  const cartTotalCount = useMemo(() => cart.length, [cart])

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, itemId) => {
      const product = products.find((p) => p.id === itemId)
      if (!product) return sum
      const priceVal = parseInt(product.price.replace(/\./g, '').replace('đ', ''))
      return sum + priceVal
    }, 0)
  }, [cart])

  const formattedSubtotal = useMemo(() => {
    return new Intl.NumberFormat('vi-VN').format(cartSubtotal) + 'đ'
  }, [cartSubtotal])

  const cartItemsDetailed = useMemo(() => {
    return cart.map((itemId, index) => {
      const product = products.find((p) => p.id === itemId)
      return { ...product, uniqueCartIndex: index }
    })
  }, [cart])

  // Handlers
  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
    const product = products.find((p) => p.id === id)
    setNotice(`Updated favorites: ${product?.name} has been ${favorites.includes(id) ? 'removed from' : 'added to'} your wishlist.`)
  }

  function addToCart(product) {
    setCart((current) => [...current, product.id])
    setRecent((current) => [product.name, ...current.filter((name) => name !== product.name)].slice(0, 3))
    setNotice(`Success: ${product.name} added to cart.`)
  }

  function removeItemFromCart(uniqueIndex) {
    setCart((current) => current.filter((_, idx) => idx !== uniqueIndex))
    setNotice('Removed 1 item from cart.')
  }

  function clearCart() {
    if (cart.length === 0) {
      setNotice('Your cart is already empty.')
      return
    }
    setCart([])
    setNotice('Cart cleared.')
  }

  // Newsletter Form Submit with Skeleton loader simulation
  async function handleSubmit(event) {
    event.preventDefault()
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)

    if (!form.name.trim() || !emailOk) {
      setFormState('error')
      setNotice('Validation Error: Please fill in your name and a valid email.')
      return
    }

    setFormState('loading')
    const webhook = import.meta.env.VITE_LEAD_WEBHOOK_URL

    // Simulated network delay to demonstrate Skeleton loader (1.2s)
    await new Promise((resolve) => setTimeout(resolve, 1200))

    try {
      if (webhook) {
        await fetch(webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, source: 'aeroband-landing' }),
        })
      }

      setFormState('success')
      setNotice('Success: Lead registered successfully!')
      setForm({ name: '', email: '', interest: 'preorder' })
    } catch {
      setFormState('error')
      setNotice('Network Error: Webhook could not be reached. Saved locally instead.')
    }
  }

  // Dual-mode Smart Chatbot Logic
  async function handleSendChat(textToSend = chatInput) {
    const query = textToSend.trim()
    if (!query) return

    // Add user message
    setChatMessages((current) => [...current, { from: 'user', text: query }])
    if (textToSend === chatInput) {
      setChatInput('')
    }
    
    setChatTyping(true)

    // Simulate bot thinking delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY
    let botResponse = ''

    if (geminiKey) {
      // MODE A: Real Gemini API Call if configured
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `You are a helpful, enthusiastic AI shopping assistant for the "AeroBand Pulse" smart wellness band.
Our product specs:
- Display: 1.42-inch AMOLED, 466 x 466
- Battery: 12 days battery life, magnetic charging
- Water resistance: 5 ATM
- Sensors: 8-channel PPG, SpO2, 6-axis motion sensor
- Weight: 28g with silicone strap
- Connectivity: Bluetooth 5.3, iOS & Android compatible
- Price: Graphite Core (2.490.000đ), Mist Silver (2.690.000đ), Terra Sport (2.790.000đ)
- Warranty: 18 months

Answer this user query concisely in the same language as their query: "${query}"`
                    }
                  ]
                }
              ]
            })
          }
        )
        const data = await response.json()
        botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
      } catch (err) {
        console.error('Gemini request failed, falling back to local assistant rules.', err)
      }
    }

    // MODE B: Local Smart Keyword-based Assistant (Fallback / Default)
    if (!botResponse) {
      const lower = query.toLowerCase()
      if (lower.includes('pin') || lower.includes('battery') || lower.includes('sạc') || lower.includes('charging')) {
        botResponse = '🔋 AeroBand Pulse offers an impressive 12-day battery life on a single magnetic charge. Perfect for tracking workouts and sleep without daily charging worries!'
      } else if (lower.includes('giá') || lower.includes('price') || lower.includes('cost') || lower.includes('mua') || lower.includes('buy') || lower.includes('tiền')) {
        botResponse = '🛍️ We have three editions: Graphite Core (2.490.000đ), Mist Silver (2.690.000đ), and Terra Sport (2.790.000đ). You can preorder them in the shop section above.'
      } else if (lower.includes('nước') || lower.includes('water') || lower.includes('mưa') || lower.includes('tắm') || lower.includes('swim')) {
        botResponse = '💧 It has 5 ATM water resistance. This means it is water-resistant up to 50 meters, making it safe for swimming, heavy sweat, showers, and rain.'
      } else if (lower.includes('spec') || lower.includes('thông số') || lower.includes('cấu hình') || lower.includes('màn hình') || lower.includes('sensor')) {
        botResponse = '📊 Specs: 1.42-inch HD AMOLED display (466x466 px), 8-channel PPG heart rate tracker, SpO2 sensor, 6-axis acceleration, and Bluetooth 5.3 connection (iOS & Android).'
      } else if (lower.includes('chào') || lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
        botResponse = '👋 Hello! I am your AeroBand assistant. Ask me about battery life, technical specs, pricing, or water resistance!'
      } else {
        botResponse = '✨ AeroBand Pulse is a premium smart health band with 24/7 heart rate/SpO2 sensors, 12-day battery life, and 5 ATM water resistance. Let me know if you have specific questions about specs or pricing!'
      }
    }

    setChatMessages((current) => [...current, { from: 'bot', text: botResponse }])
    setChatTyping(false)
  }

  function handleCheckout() {
    if (cart.length === 0) return
    setNotice('Checking out: Order simulated successfully! Thank you for purchasing.')
    setCart([])
    setCartDrawerOpen(false)
  }

  return (
    <main>
      {/* 2. Glassmorphic Sticky Header */}
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="AeroBand Pulse">
          <span>A</span>AeroBand
        </a>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#specs">Specs</a>
          <a href="#shop">Preorder</a>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {/* Cart Icon trigger for Drawer */}
          <button 
            className="icon-button" 
            type="button" 
            onClick={() => setCartDrawerOpen(true)}
            aria-label="Open shopping cart"
          >
            <Icon name="cart" />
            <span>Cart ({cartTotalCount})</span>
          </button>
          
          <button 
            className="icon-button" 
            type="button" 
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle dark mode"
          >
            <Icon name={theme === 'light' ? 'moon' : 'sun'} />
            <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
          </button>
        </div>
      </nav>

      {/* 3. Hero Section with Glow Aura */}
      <section id="top" className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Smart wellness band</p>
          <h1>AeroBand Pulse</h1>
          <p className="lead">
            A smart wellness band that tracks health, recovery, and movement every day with clean
            insights, simple controls, and long-lasting battery life.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#newsletter">Get updates</a>
            <a className="secondary-button" href="#specs">View specs</a>
          </div>
          <div className="hero-metrics" aria-label="Product highlights">
            <span><strong>12 days</strong> battery</span>
            <span><strong>5 ATM</strong> water resistant</span>
            <span><strong>28 g</strong> lightweight</span>
          </div>
        </div>
        <div className="hero-visual" aria-label="AeroBand Pulse product preview">
          <img src={heroImg} alt="AeroBand Pulse smartwatch preview" width="505" height="589" />
          <div className="sensor-card">
            <div className="pulse-circle"></div>
            <span>Heart rate</span>
            <strong>72 bpm</strong>
          </div>
        </div>
      </section>

      {/* 4. Features Section */}
      <section id="features" className="section">
        <div className="section-heading">
          <p className="eyebrow">Key features</p>
          <h2>Health data turned into clear daily action</h2>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <div className="feature-icon-wrapper" aria-hidden="true">
                <Icon name={feature.icon} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Specs Section */}
      <section id="specs" className="spec-section">
        <div>
          <p className="eyebrow">Technical specs</p>
          <h2>Lightweight hardware for long, demanding days</h2>
          <p>
            Designed for active users, busy professionals, and anyone who wants health tracking that
            stays useful without getting in the way.
          </p>
        </div>
        <dl className="spec-list">
          {specs.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 6. Mini E-Commerce Section */}
      <section id="shop" className="section">
        <div className="section-heading">
          <p className="eyebrow">Mini commerce</p>
          <h2>Choose the edition that fits your routine</h2>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <button
                className={`heart ${favorites.includes(product.id) ? 'active' : ''}`}
                type="button"
                onClick={() => toggleFavorite(product.id)}
                aria-label={`Save ${product.name} to favorites`}
              >
                <Icon name="heart" />
              </button>
              
              {/* Simulated Image Box for Premium Feel */}
              <div className="product-card-image-box">
                <Icon name={product.icon} />
              </div>
              
              <h3>{product.name}</h3>
              <p className="product-price">{product.price}</p>
              
              <div className="product-card-actions">
                <button type="button" onClick={() => addToCart(product)}>
                  <Icon name="cart" /> Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>
        
        {/* Dashboard Bar under products */}
        <div className="commerce-bar">
          <span>Favorites list: {favorites.length} items saved</span>
          <span>Recently viewed: {recent.join(', ')}</span>
          <button type="button" onClick={() => setCartDrawerOpen(true)}>
            <Icon name="cart" /> View Cart ({cartTotalCount})
          </button>
        </div>
      </section>

      {/* 7. Newsletter Section with Skeleton Overlay */}
      <section id="newsletter" className="newsletter-section">
        <div>
          <p className="eyebrow">Newsletter</p>
          <h2>Get preorder offers and launch updates</h2>
          <p style={{ color: 'var(--text)' }}>
            Be the first to know when shipments start and unlock early bird preorder benefits.
          </p>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          {/* Skeleton Overlay during Loading simulation */}
          {formState === 'loading' && (
            <div className="skeleton-overlay" aria-label="Loading registration form">
              <div className="skeleton-item skeleton-title"></div>
              <div className="skeleton-item skeleton-field"></div>
              <div className="skeleton-item skeleton-title"></div>
              <div className="skeleton-item skeleton-field"></div>
              <div className="skeleton-item skeleton-btn"></div>
            </div>
          )}

          <label>
            Full name
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="Alex Morgan"
              disabled={formState === 'loading'}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="you@email.com"
              disabled={formState === 'loading'}
            />
          </label>
          <label>
            Interest
            <select 
              value={form.interest} 
              onChange={(event) => setForm({ ...form, interest: event.target.value })}
              disabled={formState === 'loading'}
            >
              <option value="preorder">Preorder</option>
              <option value="business">Business purchase</option>
              <option value="support">Product consultation</option>
            </select>
          </label>
          
          <button className="primary-button" type="submit" disabled={formState === 'loading'}>
            Subscribe
          </button>
          
          {formState === 'success' && <p className="form-message">Thanks for subscribing.</p>}
          {formState === 'error' && <p className="form-message error">Check your details and try again.</p>}
        </form>
      </section>

      {/* 8. Footer */}
      <footer>
        <p>© 2026 AeroBand Pulse. All rights reserved.</p>
        <a href="#top">Back to top</a>
      </footer>

      {/* 9. Toast Notification Alert */}
      {notice && <div className="toast" role="status">{notice}</div>}

      {/* 10. Sliding Cart Drawer */}
      <div 
        className={`cart-drawer-backdrop ${cartDrawerOpen ? 'open' : ''}`} 
        onClick={() => setCartDrawerOpen(false)}
      ></div>
      <div className={`cart-drawer ${cartDrawerOpen ? 'open' : ''}`} role="dialog" aria-modal="true">
        <div className="cart-drawer-header">
          <h3>Shopping Cart</h3>
          <button 
            className="close-drawer-btn" 
            onClick={() => setCartDrawerOpen(false)}
            aria-label="Close cart drawer"
          >
            <Icon name="x" />
          </button>
        </div>
        <div className="cart-drawer-content">
          {cartItemsDetailed.length === 0 ? (
            <p className="cart-empty">Your cart is currently empty.</p>
          ) : (
            cartItemsDetailed.map((item, idx) => (
              <div className="cart-item" key={`${item.id}-${idx}`}>
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>{item.price}</p>
                </div>
                <button 
                  className="remove-item-btn" 
                  onClick={() => removeItemFromCart(item.uniqueCartIndex)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <Icon name="trash" />
                </button>
              </div>
            ))
          )}
        </div>
        <div className="cart-drawer-footer">
          <div className="cart-drawer-footer-row">
            <span>Subtotal:</span>
            <span>{formattedSubtotal}</span>
          </div>
          <div className="cart-drawer-actions">
            <button 
              className="cart-clear-btn" 
              onClick={clearCart} 
              disabled={cart.length === 0}
            >
              Clear Cart
            </button>
            <button 
              className="cart-checkout-btn" 
              onClick={handleCheckout} 
              disabled={cart.length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* 11. Conversational Chatbot Widget */}
      <div className={`chat ${chatOpen ? 'open' : ''}`}>
        {chatOpen && (
          <div className="chat-panel">
            <div className="chat-panel-header">
              <Icon name="chat" />
              <h4>AeroBand Assistant</h4>
              <button 
                style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer' }}
                onClick={() => setChatOpen(false)}
                aria-label="Close chat window"
              >
                <Icon name="x" />
              </button>
            </div>
            
            <div className="chat-log">
              {chatMessages.map((message, index) => (
                <p className={message.from} key={`${message.from}-${index}`}>{message.text}</p>
              ))}
              {chatTyping && (
                <p className="bot" style={{ opacity: 0.6, fontStyle: 'italic' }}>Thinking...</p>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick action query buttons inside chatbot */}
            <div className="chat-suggestions">
              <button type="button" onClick={() => handleSendChat('Battery life?')}>Battery?</button>
              <button type="button" onClick={() => handleSendChat('What is the price?')}>Prices?</button>
              <button type="button" onClick={() => handleSendChat('Is it water resistant?')}>Waterproof?</button>
              <button type="button" onClick={() => handleSendChat('Show specifications')}>Specs?</button>
            </div>

            <div className="chat-input-bar">
              <input 
                type="text" 
                placeholder="Ask about AeroBand..." 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
              />
              <button type="button" onClick={() => handleSendChat()} aria-label="Send message">
                <Icon name="send" />
              </button>
            </div>
          </div>
        )}
        <button 
          className="chat-toggle" 
          type="button" 
          onClick={() => setChatOpen((open) => !open)}
          aria-label="Toggle chat widget"
        >
          {chatOpen ? <Icon name="x" /> : <Icon name="chat" />}
        </button>
      </div>
    </main>
  )
}

export default App
