import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { BlofinServiceSimple } from '../services/BlofinServiceSimple';
import { useAuth } from '../contexts/AuthContext';
import { DisclaimerPopup } from '../components/DisclaimerPopup';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export function HomePage() {
  const { user, isAdmin } = useAuth();
  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const [performance, setPerformance] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      const priceResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_24hr_high=true&include_24hr_low=true');
      const priceData = await priceResponse.json();
      
      const currentPrice = priceData.bitcoin.usd;
      const change = priceData.bitcoin.usd_24hr_change || 0;
      
      setBtcPrice(currentPrice);

      const perf = await new BlofinServiceSimple().getPerformance();
      setPerformance(perf);

    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartCopying = () => {
    setShowDisclaimer(true);
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const handleDisclaimerAccept = () => {
    setShowDisclaimer(false);
    window.open('https://blofin.com/en/copy-trade/details/1908447789?module=futures', '_blank');
  };

  const chartData = {
    labels: Array.from({ length: 50 }, (_, i) => `${i}`),
    datasets: [
      {
        label: 'BTC/USDT',
        data: Array.from({ length: 50 }, (_, i) => {
          const basePrice = btcPrice || 65000;
          const variation = Math.sin(i * 0.2) * (basePrice * 0.02) + (Math.random() - 0.5) * (basePrice * 0.01);
          return basePrice + variation;
        }),
        borderColor: change >= 0 ? '#00FF41' : '#FF3366',
        backgroundColor: change >= 0 ? 'rgba(0, 255, 65, 0.1)' : 'rgba(255, 51, 102, 0.1)',
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: change >= 0 ? '#00FF41' : '#FF3366',
        pointBorderColor: '#000',
        pointBorderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: change >= 0 ? '#00FF41' : '#FF3366',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context: any) => `$${context.parsed.y.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        },
      },
    },
    scales: {
      x: {
        display: false,
        grid: { display: false },
      },
      y: {
        position: 'right' as const,
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)',
          font: { size: 10 },
          callback: (value: any) => `$${value.toLocaleString()}`,
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-blue-500 border-b-transparent rounded-full animate-spin animation-delay-150"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-purple-500 border-l-transparent rounded-full animate-spin animation-delay-300"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary text-text-primary overflow-x-hidden">
      {/* Disclaimer Popup */}
      <DisclaimerPopup isOpen={showDisclaimer} onClose={() => setShowDisclaimer(false)} onAccept={handleDisclaimerAccept} />
      
      {/* Hero Section - Full Viewport Trading Terminal */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background with Grid Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary">
          <div className="absolute inset-0 opacity-20">
            <div className="grid-background"></div>
          </div>
          
          {/* Floating Trading Particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 30 }, (_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                  background: i % 3 === 0 ? 'var(--color-accent-green)' : 
                               i % 3 === 1 ? 'var(--color-accent-blue)' : 'var(--color-accent-purple)',
                  boxShadow: i % 3 === 0 ? 'var(--shadow-glow-green)' : 
                                 i % 3 === 1 ? 'var(--shadow-glow-blue)' : 'var(--shadow-glow-purple)',
                }}
              />
            ))}
          </div>
          
          {/* Animated BTC Price Wave */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-32 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
                <path
                  d="M0,50 Q300,20 600,50 T900,50 Q1050,80 1200,50"
                  stroke="var(--color-accent-green)"
                  strokeWidth="2"
                  fill="none"
                  className="animate-pulse"
                  style={{
                    filter: 'drop-shadow(0 0 10px var(--color-accent-green))',
                    animation: 'wave 8s ease-in-out infinite',
                  }}
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-6xl mx-auto"
          >
            {/* Logo with Enhanced Glow */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="mb-8 inline-block"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-accent-green to-accent-blue rounded-2xl flex items-center justify-center shadow-glow-green transform hover:scale-110 transition-transform duration-300">
                <span className="text-black font-bold text-4xl">⚡</span>
              </div>
            </motion.div>

            {/* Main Title with Gradient Text */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-bold font-heading mb-6 bg-gradient-to-r from-accent-green via-accent-blue to-accent-purple bg-clip-text text-transparent leading-tight"
            >
              BIONICAI TRADING
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-4xl font-heading mb-8 text-text-secondary"
            >
              Professional BTC Copy Trading Terminal
            </motion.h2>

            {/* Enhanced Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
            >
              <div className="glass-intense p-6 text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-accent-green mb-2">{performance?.winRate}%</div>
                <div className="text-sm text-text-secondary">Win Rate</div>
                <div className="mt-2 h-1 bg-gradient-to-r from-transparent via-accent-green to-transparent opacity-50"></div>
              </div>
              
              <div className="glass-intense p-6 text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-accent-blue mb-2">+{performance?.totalROI}%</div>
                <div className="text-sm text-text-secondary">Total ROI</div>
                <div className="mt-2 h-1 bg-gradient-to-r from-transparent via-accent-blue to-transparent opacity-50"></div>
              </div>
              
              <div className="glass-intense p-6 text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-accent-purple mb-2">{performance?.totalTrades}</div>
                <div className="text-sm text-text-secondary">Total Trades</div>
                <div className="mt-2 h-1 bg-gradient-to-r from-transparent via-accent-purple to-transparent opacity-50"></div>
              </div>
            </motion.div>

            {/* Live Price Ticker with Enhanced Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-12 inline-flex items-center space-x-6 glass-intense px-8 py-4 rounded-2xl"
            >
              <div className="text-left">
                <div className="text-sm text-text-secondary mb-1">BTC/USDT LIVE</div>
                <div className="flex items-center space-x-3">
                  <motion.p 
                    className={`text-3xl font-bold font-mono ${priceChange >= 0 ? 'text-accent-green' : 'text-accent-red'}`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    ${btcPrice?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </motion.p>
                  <motion.div 
                    className={`px-3 py-1 rounded-full text-sm font-bold ${priceChange >= 0 ? 'bg-accent-green/20 text-accent-green border border-accent-green/50' : 'bg-accent-red/20 text-accent-red border border-accent-red/50'}`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Enhanced CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 255, 133, 0.8)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartCopying}
                className="neon-button px-8 py-4 text-lg font-bold relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <span>🚀</span>
                  <span>START COPYING ON BLOFIN</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-green via-accent-blue to-accent-purple opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </motion.button>
              
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('https://t.me/yourchannel', '_blank')}
                  className="glass-intense px-6 py-3 font-bold hover:bg-accent-green/10 transition-all duration-300"
                >
                  <span className="flex items-center space-x-2">
                    <span>📱</span>
                    <span>TELEGRAM</span>
                  </span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('https://discord.gg/yourserver', '_blank')}
                  className="glass-intense px-6 py-3 font-bold hover:bg-accent-blue/10 transition-all duration-300"
                >
                  <span className="flex items-center space-x-2">
                    <span>🎮</span>
                    <span>DISCORD</span>
                  </span>
                </motion.button>
              </div>
            </motion.div>

            {/* Teaser Cards for Other Pages */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                className="glass-intense p-6 rounded-2xl cursor-pointer group"
                onClick={() => window.location.href = '/journey'}
              >
                <div className="text-3xl mb-3 text-accent-green">📈</div>
                <h3 className="text-xl font-bold font-heading mb-2 text-text-primary group-hover:text-accent-green transition-colors">My Journey</h3>
                <p className="text-text-secondary text-sm">Follow my evolution from novice to pro trader</p>
                <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-accent-green to-transparent opacity-30"></div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                className="glass-intense p-6 rounded-2xl cursor-pointer group"
                onClick={() => window.location.href = '/strategy'}
              >
                <div className="text-3xl mb-3 text-accent-blue">🎯</div>
                <h3 className="text-xl font-bold font-heading mb-2 text-text-primary group-hover:text-accent-blue transition-colors">Trading Strategy</h3>
                <p className="text-text-secondary text-sm">Learn my proven BTC copy trading approach</p>
                <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-accent-blue to-transparent opacity-30"></div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                className="glass-intense p-6 rounded-2xl cursor-pointer group"
                onClick={() => window.location.href = '/performance'}
              >
                <div className="text-3xl mb-3 text-accent-purple">📊</div>
                <h3 className="text-xl font-bold font-heading mb-2 text-text-primary group-hover:text-accent-purple transition-colors">Performance</h3>
                <p className="text-text-secondary text-sm">Detailed analytics and track record</p>
                <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-accent-purple to-transparent opacity-30"></div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-accent-green rounded-full flex justify-center">
              <div className="w-1 h-3 bg-accent-green rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
