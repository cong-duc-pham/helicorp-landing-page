import { useEffect, useMemo, useState } from 'react'
import heroImg from './assets/aeroband-pulse.png'
import './App.css'

const features = [
  {
    title: 'Theo doi suc khoe 24/7',
    text: 'Cam bien nhip tim, SpO2, stress va giac ngu duoc gom thanh cac chi so de doc.',
    icon: 'pulse',
  },
  {
    title: 'Canh bao thong minh',
    text: 'Nhan thong bao khi co bat thuong ve van dong, nghi ngoi hoac muc phuc hoi trong ngay.',
    icon: 'bell',
  },
  {
    title: 'Pin 12 ngay',
    text: 'Chip tiet kiem nang luong va sac tu tinh giup san sang cho lich trinh day dac.',
    icon: 'battery',
  },
]

const specs = [
  ['Man hinh', 'AMOLED 1.42 inch, 466 x 466'],
  ['Cam bien', 'PPG 8 kenh, SpO2, gia toc 6 truc'],
  ['Chong nuoc', '5 ATM cho boi loi va mua lon'],
  ['Ket noi', 'Bluetooth 5.3, iOS va Android'],
  ['Trong luong', '28 g voi day silicone mem'],
  ['Bao hanh', '18 thang, doi moi 30 ngay'],
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
  const [chatMessages, setChatMessages] = useState([
    { from: 'bot', text: 'Xin chao, minh co the tu van pin, tinh nang hay uu dai dat truoc.' },
  ])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 420) {
        setNotice('Ban dang xem thong so chi tiet cua AeroBand Pulse.')
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const cartTotal = useMemo(() => cart.length, [cart])

  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
    setNotice('Da cap nhat danh sach san pham yeu thich.')
  }

  function addToCart(product) {
    setCart((current) => [...current, product.id])
    setRecent((current) => [product.name, ...current.filter((name) => name !== product.name)].slice(0, 3))
    setNotice(`${product.name} da duoc them vao gio hang.`)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)

    if (!form.name.trim() || !emailOk) {
      setFormState('error')
      setNotice('Vui long nhap ten va email hop le.')
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
      setNotice('Dang ky thanh cong. Chung toi se lien he ban som.')
      setForm({ name: '', email: '', interest: 'preorder' })
    } catch {
      setFormState('error')
      setNotice('Chua gui duoc webhook. Vui long thu lai sau.')
    }
  }

  function sendChat() {
    const answer =
      'AeroBand Pulse co pin toi da 12 ngay, chong nuoc 5 ATM va dong bo voi iOS/Android qua Bluetooth 5.3.'
    setChatMessages((current) => [
      ...current,
      { from: 'user', text: 'Tu van nhanh ve san pham' },
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
          <a href="#features">Tinh nang</a>
          <a href="#specs">Thong so</a>
          <a href="#shop">Dat truoc</a>
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
            Vong deo thong minh giup theo doi suc khoe, phuc hoi va van dong moi ngay voi giao dien
            sach, du lieu de hieu va pin ben bi.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#newsletter">Nhan thong tin</a>
            <a className="secondary-button" href="#specs">Xem thong so</a>
          </div>
          <div className="hero-metrics" aria-label="Product highlights">
            <span><strong>12 ngay</strong> pin</span>
            <span><strong>5 ATM</strong> chong nuoc</span>
            <span><strong>28 g</strong> sieu nhe</span>
          </div>
        </div>
        <div className="hero-visual" aria-label="AeroBand Pulse product preview">
          <img src={heroImg} alt="AeroBand Pulse smart band preview" width="900" height="900" />
          <div className="sensor-card">
            <span>Nhip tim</span>
            <strong>72 bpm</strong>
          </div>
        </div>
      </section>

      <section id="features" className="section">
        <div className="section-heading">
          <p className="eyebrow">Tinh nang noi bat</p>
          <h2>Du lieu suc khoe duoc bien thanh hanh dong ro rang</h2>
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
          <h2>Gon nhe nhung du suc cho lich trinh dai</h2>
          <p>
            Thiet ke toi uu cho nguoi tap luyen, nhan vien van phong va nguoi can mot thiet bi theo
            doi suc khoe khong gay phien.
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
          <h2>Chon phien ban phu hop</h2>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <button
                className={`heart ${favorites.includes(product.id) ? 'active' : ''}`}
                type="button"
                onClick={() => toggleFavorite(product.id)}
                aria-label={`Yeu thich ${product.name}`}
              >
                Fav
              </button>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <button type="button" onClick={() => addToCart(product)}>Them vao gio</button>
            </article>
          ))}
        </div>
        <div className="commerce-bar">
          <span>Yeu thich: {favorites.length}</span>
          <span>Gio hang: {cartTotal}</span>
          <span>Da xem: {recent.join(', ')}</span>
        </div>
      </section>

      <section id="newsletter" className="newsletter-section">
        <div>
          <p className="eyebrow">Dang ky nhan tin</p>
          <h2>Nhan uu dai dat truoc va lich mo ban</h2>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <label>
            Ho ten
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="Nguyen Van A"
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="ban@email.com"
            />
          </label>
          <label>
            Nhu cau
            <select value={form.interest} onChange={(event) => setForm({ ...form, interest: event.target.value })}>
              <option value="preorder">Dat truoc</option>
              <option value="business">Mua cho doanh nghiep</option>
              <option value="support">Can tu van</option>
            </select>
          </label>
          <button className="primary-button" type="submit" disabled={formState === 'loading'}>
            {formState === 'loading' ? 'Dang gui...' : 'Dang ky'}
          </button>
          {formState === 'success' && <p className="form-message">Cam on ban da dang ky.</p>}
          {formState === 'error' && <p className="form-message error">Kiem tra lai thong tin va thu lai.</p>}
        </form>
      </section>

      <footer>
        <p>AeroBand Pulse demo landing page for HELICORP round 2.</p>
        <a href="#top">Len dau trang</a>
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
            <button type="button" onClick={sendChat}>Hoi nhanh</button>
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
