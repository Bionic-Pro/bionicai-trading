# BionicAI Trading - Leader Copy Trading Showcase

A secure, presentational web application that fetches and displays real-time and historical data from your Blofin copy leader account to attract users. The app showcases your trading strategy, performance (trade history, wins/losses, ROI, drawdown, win rate), and redirects to Blofin for copying via "Start Copying" button.

## 🚀 Quick Start

### Step 1: Create Blofin API Key
1. Log into Blofin dashboard
2. Go to **Account > API Management**
3. Create API key with **READ permission** (for balance/positions/orders)
4. Note: API Key, Secret, Passphrase
5. Bind IP if needed (up to 20 IPs)

### Step 2: Get Your Leader ID
From Blofin dashboard, find your copy leader ID for the redirect URL:
```
https://blofin.com/en/copy-trade/details/YOUR_LEADER_ID?module=futures
```

### Step 3: Set Up Environment
Create `.env.local` in app root:
```env
# Blofin API Configuration
REACT_APP_BLOFIN_API_KEY=your_api_key
REACT_APP_BLOFIN_API_SECRET=your_secret
REACT_APP_BLOFIN_API_PASSPHRASE=your_passphrase
REACT_APP_BLOFIN_LEADER_ID=your_leader_id
REACT_APP_BLOFIN_BASE_URL=https://openapi.blofin.com
REACT_APP_INST_ID=BTC-USDT

# Firebase Configuration
REACT_APP_FIREBASE_CONFIG=your_firebase_json

# Notification Webhooks (Optional)
REACT_APP_TELEGRAM_BOT_TOKEN=your_bot_token
REACT_APP_TELEGRAM_CHAT_ID=your_chat_id
REACT_APP_DISCORD_WEBHOOK_URL=your_webhook_url
```

### Step 4: Configure Firebase
1. Create Firebase project
2. Enable Auth (email/Google)
3. Enable Firestore
4. Enable Cloud Functions
5. Deploy proxy function (see Firebase Functions section)
6. Add environment variables to Functions config

### Step 5: Run Application
```bash
npm install
npm start
```

The app will automatically fetch data on load/refresh and poll every 5-10 minutes for updates.

## 📊 Features

- **Real-time Blofin API Integration**: Live trading data via secure proxy
- **Performance Analytics**: ROI, drawdown, win rate calculations
- **Professional Trading UI**: Dark theme with green/red accents
- **PWA Ready**: Installable on Android/desktop
- **Secure Authentication**: Firebase Auth with email/password & Google OAuth
- **Community Integration**: Telegram/Discord join buttons and webhooks
- **Mobile Responsive**: Optimized for all devices

## 🔧 Technical Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + custom components
- **Authentication**: Firebase Auth
- **Backend**: Firebase Cloud Functions (API proxy)
- **Database**: Firestore (for caching/user data)
- **Charts**: Chart.js for performance visualization
- **PWA**: Service Worker + Manifest

## 🔒 Security Features

- **API Key Protection**: Never exposed client-side (proxy via Firebase Functions)
- **HMAC-SHA256 Signing**: Secure Blofin API authentication
- **Rate Limiting**: 30 requests/minute per IP
- **Input Sanitization**: XSS protection with DOMPurify
- **CSRF Protection**: Token validation
- **HTTPS Only**: Secure connections enforced

## 📈 Blofin API Integration

### Available Endpoints
- `/copytrading/account/balance` - Account balance
- `/copytrading/account/positions-by-order` - Current positions
- `/copytrading/trade/orders-history` - Order history
- `/trade/fills-history` - Trade fills

### Performance Calculations
- **ROI**: `((realizedPnL + unrealizedPnL) / equity) * 100`
- **Drawdown**: `max((peak - current) / peak * 100)` - tracked via Firestore
- **Win Rate**: `winning trades / total trades * 100`

### Real-time Updates
- WebSocket connection to `wss://openapi.blofin.com/ws/copytrading/private`
- Subscribe to `copytrading-positions/orders/account` for live updates

## 🔌 Firebase Functions Setup

### Deploy Proxy Function
```bash
cd functions
npm install
firebase deploy --only functions
```

### Environment Variables for Functions
Set in Firebase Console > Functions > Configuration:
- `BLOFIN_API_KEY`
- `BLOFIN_API_SECRET`
- `BLOFIN_API_PASSPHRASE`
- `TELEGRAM_BOT_TOKEN`
- `DISCORD_WEBHOOK_URL`

## 📱 PWA Features

- **Service Worker**: Offline support with cached data
- **Manifest**: Installable as native app
- **Background Sync**: Data synchronization when online
- **Push Notifications**: Optional trade alerts

## 🎯 Trading Strategy Display

### Strategy Parameters
- **Position Size**: 0.2 BTC per position
- **Leverage**: x10 leverage
- **Profit Target**: 5%+ scaling up
- **DCA**: 1-2 times on dips
- **Style**: Swing & momentum trading
- **Focus**: 99% BTC/USDT

### Risk Management
- **Stop Loss**: 2-3%
- **Max Drawdown**: 15%
- **Position Limit**: 3 concurrent positions
- **Risk Per Trade**: 2% of portfolio

## 📊 Performance Metrics

### Real-time Calculations
- **Equity Curve**: Cumulative P&L over time
- **Win/Loss Distribution**: Monthly breakdown
- **Sharpe Ratio**: Risk-adjusted returns
- **Profit Factor**: Total profit / total loss

### Historical Data
- **Trade History**: Last 180 days of trades
- **Performance Trends**: Monthly/weekly analysis
- **Risk Metrics**: Drawdown periods and recovery

## 🔔 Notifications

### Telegram Integration
```env
REACT_APP_TELEGRAM_BOT_TOKEN=your_bot_token
REACT_APP_TELEGRAM_CHAT_ID=your_chat_id
```

### Discord Integration
```env
REACT_APP_DISCORD_WEBHOOK_URL=your_webhook_url
```

### Alert Types
- New trade opened/closed
- Significant profit/loss
- Risk limit breaches
- Daily performance summaries

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel**: Recommended for performance
- **Netlify**: Easy static hosting
- **Firebase Hosting**: Integrated with Firebase services

### Environment Variables
Set in hosting platform dashboard:
- All `REACT_APP_*` variables
- Firebase configuration
- Webhook URLs

## 📱 Mobile App

### PWA Installation
1. Open app in mobile browser
2. Tap "Add to Home Screen"
3. Install as native app
4. Full-screen experience

### Mobile Features
- Touch-optimized interface
- Swipe navigation
- Mobile charts
- Push notifications

## 🛠️ Development

### Local Development
```bash
npm install
npm start
```

### Firebase Functions Local Testing
```bash
cd functions
npm run serve
```

### Environment Files
- `.env.local` - Local development (not committed)
- `.env.example` - Template file

## 📊 Analytics & Monitoring

### Firebase Analytics
- Page views and user interactions
- Performance metrics
- Error tracking
- User engagement

### Custom Events
- Trade copying attempts
- Page navigation patterns
- Feature usage statistics

## 🔍 Testing

### Stress Tests
- **API Failures**: Graceful degradation to mock data
- **Rate Limits**: Automatic throttling
- **Network Issues**: Offline functionality
- **Security**: XSS/CSRF protection testing

### Test Scenarios
- **First-time User**: Easy onboarding flow
- **Power User**: Real-time data refresh
- **Security-conscious**: Key protection verification

## 📋 Troubleshooting

### Common Issues
1. **API Rate Limits**: Reduce polling frequency
2. **WebSocket Disconnection**: Auto-reconnect implemented
3. **Authentication**: Check Firebase configuration
4. **CORS Issues**: Verify proxy deployment

### Debug Mode
```bash
# Enable debug logging
REACT_APP_DEBUG=true npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Implement changes
4. Add tests
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details

## ⚠️ Disclaimer

**Not financial advice. Trading involves high risk of loss. Past performance does not guarantee future results. Trade at your own risk.**

## 📞 Support

For support:
- Join our Telegram channel
- Join our Discord server
- Check FAQ section
- Review troubleshooting guide

---

**🚀 Ready to showcase your trading success? Deploy now and start attracting copy traders to your Blofin account!**
