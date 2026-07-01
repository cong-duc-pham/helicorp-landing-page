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
  { id: 'graphite', name: 'Graphite Core', price: '2.490.000d' },
  { id: 'mist', name: 'Mist Silver', price: '2.690.000d' },
  { id: 'terra', name: 'Terra Sport', price: '2.790.000d' },
]

function App() {
  const [theme, setTheme] = useState('light')
  const [favorites, setFavorites] = useState(['graphite'])
  const [cart, setCart] = useState([])
  const [recent, setRecent] = useState(['Graphite Core'])
  const [notice, setNotice] = useState('')
  const [form, setForm] = useState({ name: '', email: '', interest: 'preorder' })
  const [formState, setFormState] = useState('idle')
  const [chatOpen, setChatOpen] = useState(false)
  const scrollNoticeShown = useRef(false)
  const [chatMessages, setChatMessages] = useState([
    { from: 'bot', text: 'Hi, I can help with battery life, features, and preorder offers.' },
  ])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    const onScroll = () => {
      if (!scrollNoticeShown.current && window.scrollY > 420) {
        scrollNoticeShown.current = true
        setNotice('You are viewing the detailed AeroBand Pulse specifications.')
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!notice) {
      return undefined
    }

    const timer = window.setTimeout(() => setNotice(''), 2800)
    return () => window.clearTimeout(timer)
  }, [notice])

  const cartTotal = useMemo(() => cart.length, [cart])

  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
    setNotice('Your favorite products list has been updated.')
  }

  function addToCart(product) {
    setCart((current) => [...current, product.id])
    setRecent((current) => [product.name, ...current.filter((name) => name !== product.name)].slice(0, 3))
    setNotice(`${product.name} has been added to your cart.`)
  }

  function clearCart() {
    if (cart.length === 0) {
      setNotice('Your cart is already empty.')
      return
    }

    setCart([])
    setNotice('Cart cleared.')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)

    if (!form.name.trim() || !emailOk) {
      setFormState('error')
      setNotice('Please enter your name and a valid email address.')
      return
    }

    setFormState('loading')
    const webhook = import.meta.env.VITE_LEAD_WEBHOOK_URL

    try {
      if (webhook) {
        await fetch(webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, source: 'aeroband-landing' }),
        })
      }

      setFormState('success')
      setNotice('Subscription received. We will contact you soon.')
      setForm({ name: '', email: '', interest: 'preorder' })
    } catch {
      setFormState('error')
      setNotice('The webhook could not be reached. Please try again later.')
    }
  }

  function sendChat() {
    const answer =
      'AeroBand Pulse lasts up to 12 days, supports 5 ATM water resistance, and syncs with iOS/Android over Bluetooth 5.3.'
    setChatMessages((current) => [
      ...current,
      { from: 'user', text: 'Give me a quick product summary' },
      { from: 'bot', text: answer },
    ])
  }

  return (
    <main>
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="AeroBand Pulse">
          <span>A</span>AeroBand
        </a>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#specs">Specs</a>
          <a href="#shop">Preorder</a>
        </div>
        <button className="icon-button" type="button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </nav>

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
            <span>Heart rate</span>
            <strong>72 bpm</strong>
          </div>
        </div>
      </section>

      <section id="features" className="section">
        <div className="section-heading">
          <p className="eyebrow">Key features</p>
          <h2>Health data turned into clear daily action</h2>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <svg className="feature-icon" aria-hidden="true">
                <use href={`/icons.svg#${feature.icon}-icon`} />
              </svg>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

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
                Fav
              </button>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <button type="button" onClick={() => addToCart(product)}>Add to cart</button>
            </article>
          ))}
        </div>
        <div className="commerce-bar">
          <span>Favorites: {favorites.length}</span>
          <span>Cart: {cartTotal}</span>
          <span>Recently viewed: {recent.join(', ')}</span>
          <button type="button" onClick={clearCart} disabled={cartTotal === 0}>Clear cart</button>
        </div>
      </section>

      <section id="newsletter" className="newsletter-section">
        <div>
          <p className="eyebrow">Newsletter</p>
          <h2>Get preorder offers and launch updates</h2>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <label>
            Full name
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="Alex Morgan"
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="you@email.com"
            />
          </label>
          <label>
            Interest
            <select value={form.interest} onChange={(event) => setForm({ ...form, interest: event.target.value })}>
              <option value="preorder">Preorder</option>
              <option value="business">Business purchase</option>
              <option value="support">Product consultation</option>
            </select>
          </label>
          <button className="primary-button" type="submit" disabled={formState === 'loading'}>
            {formState === 'loading' ? 'Sending...' : 'Subscribe'}
          </button>
          {formState === 'success' && <p className="form-message">Thanks for subscribing.</p>}
          {formState === 'error' && <p className="form-message error">Check your details and try again.</p>}
        </form>
      </section>

      <footer>
        <p>AeroBand Pulse demo landing page for HELICORP round 2.</p>
        <a href="#top">Back to top</a>
      </footer>

      {notice && <div className="toast" role="status">{notice}</div>}

      <div className={`chat ${chatOpen ? 'open' : ''}`}>
        {chatOpen && (
          <div className="chat-panel">
            <div className="chat-log">
              {chatMessages.map((message, index) => (
                <p className={message.from} key={`${message.from}-${index}`}>{message.text}</p>
              ))}
            </div>
            <button type="button" onClick={sendChat}>Quick ask</button>
          </div>
        )}
        <button className="chat-toggle" type="button" onClick={() => setChatOpen((open) => !open)}>
          {chatOpen ? 'Close' : 'Chat'}
        </button>
      </div>
    </main>
  )
}

export default App
