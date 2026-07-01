# AeroBand Pulse Landing Page

Demo landing page for the HELICORP round 2 website development test, built with Vite, React, JavaScript, and CSS3.

## Features

- Hero section for a smart wearable product.
- Key features, technical specifications, and newsletter signup form.
- Responsive desktop/mobile layout, dark mode, micro-interactions, and lightweight animation.
- Mini commerce: favorites, cart, and recently viewed products.
- Chatbot demo in the bottom corner.
- Validated lead form with optional webhook integration through an environment variable.
- SEO technical: title, description, Open Graph, and theme color.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Webhook Configuration

Create `.env.local` if you want to send leads to an external webhook:

```bash
VITE_LEAD_WEBHOOK_URL=https://your-webhook-url.example
```

If this variable is not set, the form still validates and shows a success message without making a network request.

## Deploy Vercel

- Framework preset: `Vite`.
- Build command: `npm run build`.
- Output directory: `dist`.
- Add `VITE_LEAD_WEBHOOK_URL` to Environment Variables if you use a webhook.
