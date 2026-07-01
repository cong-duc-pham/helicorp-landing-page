# AeroBand Pulse Landing Page

Landing page demo cho bai test HELICORP vong 2, xay dung bang Vite, React, JavaScript va CSS3.

## Tinh nang

- Hero section gioi thieu san pham thiet bi deo thong minh.
- Section tinh nang noi bat, thong so ky thuat va form dang ky nhan tin.
- Responsive desktop/mobile, dark mode, micro-interactions va animation nhe.
- Mini commerce: san pham yeu thich, gio hang va danh sach da xem.
- Chatbot demo o goc man hinh.
- Form co validation va ho tro gui du lieu ve webhook qua bien moi truong.
- SEO technical: title, description, Open Graph va theme color.

## Chay local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Cau hinh webhook

Tao file `.env.local` neu can gui lead ra ben ngoai:

```bash
VITE_LEAD_WEBHOOK_URL=https://your-webhook-url.example
```

Neu khong co bien nay, form van validation va hien thong bao thanh cong ma khong goi network.

## Deploy Vercel

- Framework preset: `Vite`.
- Build command: `npm run build`.
- Output directory: `dist`.
- Them `VITE_LEAD_WEBHOOK_URL` trong Environment Variables neu dung webhook.
