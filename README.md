# 🚀 Crypto Dashboard

A modern, responsive cryptocurrency dashboard built with Next.js 15, TypeScript, and Tailwind CSS. Track the top 20 cryptocurrencies by market cap, search for specific coins, and view detailed price charts with 7-day history.

![Crypto Dashboard](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss)
![React Query](https://img.shields.io/badge/React%20Query-5.0-FF4154?style=for-the-badge&logo=reactquery)

## ✨ Features

### Core Features
- 📊 **Dashboard**: View top 20 cryptocurrencies by market cap
- 🔍 **Search**: Find specific cryptocurrencies by name or symbol
- 📈 **Price Charts**: Interactive 7-day price history charts using Recharts
- 📱 **Responsive Design**: Mobile-first design that works on all devices
- 🌙 **Dark/Light Theme**: Toggle between dark and light modes
- ⚡ **Real-time Data**: Live cryptocurrency data from CoinGecko API

### Technical Features
- 🚀 **Next.js 15**: App Router, Server & Client Components, Image Optimization
- 📦 **React Query v5**: Advanced caching, background updates, error handling
- 🎨 **Tailwind CSS**: Custom design system with CSS variables for theming
- 🧪 **Testing**: Unit tests (Jest) and E2E tests (Playwright)
- 🐳 **Docker**: Production-ready containerization
- ♿ **Accessibility**: WCAG 2.1 AA compliance with semantic HTML
- 🔒 **Error Boundaries**: Graceful error handling and recovery

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 3.4 with custom design system
- **Data Fetching**: React Query v5 (TanStack Query)
- **Charts**: Recharts for price visualization
- **API**: CoinGecko API for cryptocurrency data
- **Theme**: next-themes for dark/light mode
- **Icons**: Lucide React
- **Testing**: Jest + Testing Library + Playwright
- **Deployment**: Vercel + Docker support

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0+ 
- npm or yarn or pnpm

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd crypto-dashboard
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Start development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

### Unit Tests
```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test -- --coverage
```

### E2E Tests
```bash
# Install Playwright browsers
npx playwright install

# Run E2E tests
npm run test:e2e

# Run E2E tests in UI mode
npx playwright test --ui
```

## 🐳 Docker

### Build Docker Image
```bash
docker build -t crypto-dashboard .
```

### Run Docker Container
```bash
docker run -p 3000:3000 crypto-dashboard
```

## 📚 API Reference

### CoinGecko API Integration

The app uses the CoinGecko API v3 for cryptocurrency data:

- **Top Coins**: `/coins/markets` - Get top cryptocurrencies by market cap
- **Search**: `/search` - Search for cryptocurrencies by name/symbol  
- **Coin Details**: `/coins/{id}` - Get detailed information about a specific coin
- **Price History**: `/coins/{id}/market_chart` - Get historical price data

### Rate Limits
- CoinGecko API: 10-50 requests/minute (free tier)
- The app implements intelligent caching to minimize API calls

## 🏗️ Project Structure

```
crypto-dashboard/
├── app/                    # Next.js App Router
│   ├── coin/[id]/         # Dynamic coin detail pages
│   ├── search/            # Search page
│   ├── globals.css        # Global styles & CSS variables
│   ├── layout.tsx         # Root layout with providers
│   ├── loading.tsx        # Global loading UI
│   ├── not-found.tsx      # 404 page
│   └── page.tsx           # Home page (dashboard)
├── components/
│   ├── charts/            # Chart components
│   ├── features/          # Feature-specific components
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/
│   ├── api/              # API integration layer
│   ├── providers/        # React providers
│   ├── types/            # TypeScript definitions
│   └── utils/            # Utility functions
├── __tests__/            # Unit tests
├── e2e/                  # E2E tests
└── public/               # Static assets
```

## 🎨 Design System

### Colors
The app uses a comprehensive color system with CSS variables for seamless theme switching:

```css
/* Light theme */
--background: 0 0% 100%;
--foreground: 240 10% 3.9%;
--primary: 240 9% 83%;
--success: 142 76% 36%;
--destructive: 0 84.2% 60.2%;

/* Dark theme */
--background: 240 10% 3.9%;
--foreground: 0 0% 98%;
--primary: 0 0% 98%;
--success: 142 71% 45%;
--destructive: 0 62.8% 30.6%;
```

### Typography
- **Font Family**: Inter (system font fallback)
- **Scale**: Tailwind's default type scale
- **Weight**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Spacing
- **Base Unit**: 4px (0.25rem)
- **Scale**: Tailwind's spacing scale (4px, 8px, 12px, 16px, 24px, 32px...)

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 768px
- **Desktop**: 768px - 1024px
- **Large**: 1024px - 1280px
- **XL**: > 1280px

## ♿ Accessibility

### Features
- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Screen Readers**: Semantic HTML with proper ARIA labels
- **Color Contrast**: WCAG 2.1 AA compliant contrast ratios (4.5:1 minimum)
- **Reduced Motion**: Respects `prefers-reduced-motion` for animations
- **Focus Management**: Proper focus restoration and skip links

### Testing
```bash
# Run accessibility tests
npm run test:a11y
```

## 🔧 Configuration

### Environment Variables
```bash
# Optional: CoinGecko API key for higher rate limits
NEXT_PUBLIC_COINGECKO_API_KEY=your_api_key_here
```

### Customization
- **Theme Colors**: Modify `app/globals.css` CSS variables
- **API Endpoints**: Update `lib/api/coingecko.ts`
- **Cache Duration**: Configure React Query settings in `lib/providers/query-provider.tsx`

## 📈 Performance

### Optimization Features
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting with Next.js
- **Caching**: Intelligent API response caching with React Query
- **Bundle Analysis**: Built-in bundle analyzer support

### Performance Metrics
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub/GitLab
2. Connect repository to Vercel
3. Deploy automatically

### Docker
```bash
# Build and run
docker build -t crypto-dashboard .
docker run -p 3000:3000 crypto-dashboard
```

### Manual Deployment
```bash
# Build production version
npm run build

# Start production server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Commit changes (`git commit -m 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [CoinGecko](https://www.coingecko.com/api) for providing free cryptocurrency API
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React Query](https://tanstack.com/query) for powerful data fetching
- [Recharts](https://recharts.org/) for beautiful charts

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](issues) page
2. Create a new issue with detailed information
3. Provide steps to reproduce the problem

---

Made with by Vitor Pouza ❤️ using Next.js, TypeScript, and Tailwind CSS