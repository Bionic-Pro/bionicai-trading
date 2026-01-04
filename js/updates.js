// Market Updates page JavaScript
class MarketUpdates {
    constructor() {
        this.newsData = [];
        this.btcData = {};
        this.init();
    }

    async init() {
        await this.fetchBTCData();
        await this.fetchNewsData();
        this.updateUI();
        this.setupEventListeners();
        this.startAutoUpdates();
    }

    async fetchBTCData() {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true');
            const data = await response.json();
            
            this.btcData = {
                price: data.bitcoin.usd,
                change24h: data.bitcoin.usd_24h_change,
                volume24h: data.bitcoin.usd_24h_vol,
                marketCap: data.bitcoin.usd_market_cap
            };
        } catch (error) {
            console.error('Error fetching BTC data:', error);
            this.btcData = this.getMockBTCData();
        }
    }

    getMockBTCData() {
        return {
            price: 65120,
            change24h: 2.4,
            volume24h: 28500000000,
            marketCap: 1275000000000
        };
    }

    async fetchNewsData() {
        try {
            // Using a mock news API since we don't have access to real news APIs
            // In production, this would integrate with CoinGecko news, CryptoPanic, or similar
            this.newsData = this.getMockNewsData();
        } catch (error) {
            console.error('Error fetching news:', error);
            this.newsData = this.getMockNewsData();
        }
    }

    getMockNewsData() {
        return [
            {
                title: "Bitcoin ETF Inflows Surge to Record Levels",
                source: "CoinDesk",
                url: "#",
                time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
                sentiment: "positive"
            },
            {
                title: "Federal Reserve Signals Potential Rate Cuts",
                source: "Reuters",
                url: "#",
                time: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
                sentiment: "positive"
            },
            {
                title: "Major Exchange Announces New BTC Trading Pairs",
                source: "CoinTelegraph",
                url: "#",
                time: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
                sentiment: "neutral"
            },
            {
                title: "Bitcoin Mining Difficulty Adjusts Upward",
                source: "The Block",
                url: "#",
                time: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
                sentiment: "neutral"
            },
            {
                title: "Institutional Interest in Bitcoin Remains Strong",
                source: "Bloomberg",
                url: "#",
                time: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
                sentiment: "positive"
            },
            {
                title: "Crypto Market Cap Surpasses $2.5 Trillion",
                source: "CNBC",
                url: "#",
                time: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
                sentiment: "positive"
            }
        ];
    }

    updateUI() {
        this.updateBTCOverview();
        this.renderNews();
        this.updateSentiment();
    }

    updateBTCOverview() {
        const elements = {
            currentPrice: document.getElementById('currentPrice'),
            priceChange: document.getElementById('priceChange'),
            volume: document.getElementById('volume'),
            volumeChange: document.getElementById('volumeChange'),
            marketCap: document.getElementById('marketCap'),
            capChange: document.getElementById('capChange')
        };

        if (elements.currentPrice) {
            elements.currentPrice.textContent = `$${this.btcData.price.toLocaleString()}`;
        }

        if (elements.priceChange) {
            const change = this.btcData.change24h;
            elements.priceChange.textContent = `${change > 0 ? '+' : ''}${change.toFixed(2)}%`;
            elements.priceChange.className = `overview-change ${change > 0 ? 'positive' : 'negative'}`;
        }

        if (elements.volume) {
            elements.volume.textContent = `$${(this.btcData.volume24h / 1000000000).toFixed(1)}B`;
        }

        if (elements.marketCap) {
            elements.marketCap.textContent = `$${(this.btcData.marketCap / 1000000000).toFixed(0)}B`;
        }
    }

    renderNews() {
        const container = document.getElementById('newsContainer');
        if (!container) return;

        container.innerHTML = '';

        this.newsData.forEach(news => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            
            const timeAgo = this.getTimeAgo(news.time);
            
            newsItem.innerHTML = `
                <div class="news-title">${news.title}</div>
                <div class="news-source">${news.source}</div>
                <div class="news-time">${timeAgo}</div>
            `;
            
            newsItem.addEventListener('click', () => {
                // In a real app, this would open the news article
                console.log('News clicked:', news.title);
            });
            
            container.appendChild(newsItem);
        });
    }

    getTimeAgo(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);

        if (diffDays > 0) {
            return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        } else if (diffHours > 0) {
            return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        } else {
            return 'Just now';
        }
    }

    updateSentiment() {
        const sentimentElement = document.getElementById('sentiment');
        const sentimentBar = document.getElementById('sentimentBar');
        
        if (!sentimentElement || !sentimentBar) return;

        // Calculate sentiment based on price change and news
        const priceSentiment = this.btcData.change24h > 0 ? 0.7 : 0.3;
        const newsSentiment = this.calculateNewsSentiment();
        const overallSentiment = (priceSentiment + newsSentiment) / 2;

        // Update sentiment text
        let sentimentText = 'Neutral';
        if (overallSentiment > 0.6) sentimentText = 'Bullish';
        else if (overallSentiment < 0.4) sentimentText = 'Bearish';

        sentimentElement.textContent = sentimentText;
        sentimentBar.style.width = `${overallSentiment * 100}%`;
    }

    calculateNewsSentiment() {
        if (this.newsData.length === 0) return 0.5;

        const sentimentScores = {
            positive: 0.8,
            neutral: 0.5,
            negative: 0.2
        };

        const totalScore = this.newsData.reduce((sum, news) => {
            return sum + (sentimentScores[news.sentiment] || 0.5);
        }, 0);

        return totalScore / this.newsData.length;
    }

    setupEventListeners() {
        // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                const navMenu = document.querySelector('.nav-menu');
                navMenu.classList.toggle('active');
            });
        }

        // Add click handlers for update cards
        const updateCards = document.querySelectorAll('.update-card');
        updateCards.forEach(card => {
            card.addEventListener('click', () => {
                // Expand/collapse update details
                card.classList.toggle('expanded');
            });
        });

        // Add refresh button functionality
        this.addRefreshButton();
    }

    addRefreshButton() {
        const header = document.querySelector('.updates-header');
        if (!header) return;

        const refreshBtn = document.createElement('button');
        refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
        refreshBtn.className = 'cta-button';
        refreshBtn.style.cssText = `
            margin-left: 1rem;
            padding: 0.5rem 1rem;
            font-size: 14px;
        `;

        refreshBtn.addEventListener('click', () => {
            this.refreshData();
        });

        header.appendChild(refreshBtn);
    }

    async refreshData() {
        const refreshBtn = document.querySelector('.fa-sync-alt');
        if (refreshBtn) {
            refreshBtn.style.animation = 'spin 1s linear';
        }

        await this.fetchBTCData();
        await this.fetchNewsData();
        this.updateUI();

        if (refreshBtn) {
            setTimeout(() => {
                refreshBtn.style.animation = '';
            }, 1000);
        }
    }

    startAutoUpdates() {
        // Update BTC price every 30 seconds
        setInterval(() => {
            this.fetchBTCData().then(() => {
                this.updateBTCOverview();
                this.updateSentiment();
            });
        }, 30000);

        // Update news every 5 minutes
        setInterval(() => {
            this.fetchNewsData().then(() => {
                this.renderNews();
                this.updateSentiment();
            });
        }, 300000);
    }

    // Add real-time price alerts
    setupPriceAlerts() {
        const alertThreshold = 5; // 5% move triggers alert
        
        if (Math.abs(this.btcData.change24h) > alertThreshold) {
            this.showPriceAlert();
        }
    }

    showPriceAlert() {
        const message = `BTC moved ${this.btcData.change24h.toFixed(2)}% in 24h!`;
        this.showToast(message, 'alert');
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'alert' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: ${type === 'alert' ? '#ffff00' : '#00aaff'};
            color: #000000;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 600;
            z-index: 3000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MarketUpdates();
});

// Add CSS for animations
const styles = document.createElement('style');
styles.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .update-card.expanded {
        border-color: var(--accent-green);
    }
    
    .update-card {
        cursor: pointer;
    }
`;
document.head.appendChild(styles);
