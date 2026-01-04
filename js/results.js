// Trading Results Page JavaScript
class TradingResults {
    constructor() {
        this.blofinData = [];
        this.profitShares = this.loadProfitShares();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderBlofinResults();
        this.renderGallery();
        this.loadMockData();
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

        // File upload
        const fileInput = document.getElementById('fileInput');
        const uploadArea = document.getElementById('uploadArea');

        if (fileInput && uploadArea) {
            fileInput.addEventListener('change', (e) => this.handleFileUpload(e));

            // Drag and drop
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('dragover');
            });

            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('dragover');
            });

            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
                this.handleFileUpload(e);
            });
        }
    }

    async fetchBlofinResults() {
        const apiKey = document.getElementById('apiKey').value.trim();
        
        if (!apiKey) {
            this.showToast('Please enter your Blofin API key', 'error');
            return;
        }

        // Show loading state
        const button = event.target;
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Fetching...';
        button.disabled = true;

        try {
            // Simulate API call (replace with actual Blofin API)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Mock Blofin data
            this.blofinData = this.generateMockBlofinData();
            this.renderBlofinResults();
            this.updateStats();
            
            this.showToast('Results fetched successfully!', 'success');
        } catch (error) {
            console.error('Error fetching Blofin results:', error);
            this.showToast('Failed to fetch results. Please check your API key.', 'error');
        } finally {
            button.innerHTML = originalText;
            button.disabled = false;
        }
    }

    generateMockBlofinData() {
        const trades = [];
        const now = new Date();
        
        for (let i = 0; i < 20; i++) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            
            const isWin = Math.random() > 0.27; // 73% win rate
            const type = Math.random() > 0.5 ? 'long' : 'short';
            const entry = 60000 + Math.random() * 15000;
            const profitPercent = (Math.random() * 15 + 2) * (isWin ? 1 : -1);
            const exit = entry * (1 + profitPercent / 100);
            const profit = (exit - entry) * 0.2; // 0.2 BTC position
            
            trades.push({
                date: date,
                type: type,
                entry: entry,
                exit: exit,
                profit: profit,
                profitPercent: profitPercent,
                isWin: isWin
            });
        }
        
        return trades.sort((a, b) => b.date - a.date);
    }

    renderBlofinResults() {
        const tbody = document.getElementById('blofinResults');
        if (!tbody) return;

        tbody.innerHTML = '';

        this.blofinData.forEach(trade => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${trade.date.toLocaleDateString()}</td>
                <td><span class="trade-type ${trade.type}">${trade.type}</span></td>
                <td>$${trade.entry.toLocaleString(undefined, {maximumFractionDigits: 0})}</td>
                <td>$${trade.exit.toLocaleString(undefined, {maximumFractionDigits: 0})}</td>
                <td class="${trade.isWin ? 'trade-profit' : 'trade-loss'}">
                    ${trade.isWin ? '+' : ''}$${Math.abs(trade.profit).toLocaleString(undefined, {maximumFractionDigits: 2})}
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    updateStats() {
        const totalProfit = this.blofinData.reduce((sum, trade) => sum + trade.profit, 0);
        const winRate = (this.blofinData.filter(trade => trade.isWin).length / this.blofinData.length * 100);
        const avgProfit = totalProfit / this.blofinData.length;

        document.getElementById('totalProfit').textContent = `+$${Math.abs(totalProfit).toLocaleString(undefined, {maximumFractionDigits: 2})}`;
        document.getElementById('winRate').textContent = `${winRate.toFixed(0)}%`;
        document.getElementById('totalTrades').textContent = this.blofinData.length;
        document.getElementById('avgProfit').textContent = `+$${Math.abs(avgProfit).toLocaleString(undefined, {maximumFractionDigits: 2})}`;
    }

    handleFileUpload(event) {
        const files = event.target.files || event.dataTransfer.files;
        
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                
                reader.onload = (e) => {
                    const imageItem = {
                        id: Date.now() + Math.random(),
                        src: e.target.result,
                        title: this.generateTradeTitle(),
                        profit: this.generateRandomProfit(),
                        date: new Date()
                    };
                    
                    this.profitShares.unshift(imageItem);
                    this.saveProfitShares();
                    this.renderGallery();
                };
                
                reader.readAsDataURL(file);
            }
        });
    }

    generateTradeTitle() {
        const titles = [
            'BTC Swing Long - 5.2% Profit',
            'BTC Short Scalp - 3.1% Win',
            'DCA Long Position - 7.8% Gain',
            'Momentum Trade - 4.5% Profit',
            'Swing Short - 6.3% Win',
            'Breakout Trade - 8.1% Profit',
            'Support Bounce - 5.7% Gain',
            'Resistance Short - 4.9% Win'
        ];
        
        return titles[Math.floor(Math.random() * titles.length)];
    }

    generateRandomProfit() {
        const profit = (Math.random() * 10 + 2).toFixed(1);
        return `+$${profit}`;
    }

    renderGallery() {
        const galleryGrid = document.getElementById('galleryGrid');
        if (!galleryGrid) return;

        galleryGrid.innerHTML = '';

        this.profitShares.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            galleryItem.innerHTML = `
                <div class="gallery-actions">
                    <button class="gallery-btn" onclick="viewImage('${item.id}')" title="View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="gallery-btn" onclick="deleteImage('${item.id}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <img src="${item.src}" alt="${item.title}" class="gallery-image" onclick="viewImage('${item.id}')">
                <div class="gallery-info">
                    <div class="gallery-title">${item.title}</div>
                    <div class="gallery-meta">
                        <span class="gallery-profit">${item.profit}</span>
                        <span>${this.formatDate(item.date)}</span>
                    </div>
                </div>
            `;
            
            galleryGrid.appendChild(galleryItem);
        });
    }

    viewImage(id) {
        const item = this.profitShares.find(img => img.id == id);
        if (!item) return;

        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        
        modalImage.src = item.src;
        modalImage.alt = item.title;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    deleteImage(id) {
        if (!confirm('Are you sure you want to delete this image?')) {
            return;
        }

        this.profitShares = this.profitShares.filter(item => item.id != id);
        this.saveProfitShares();
        this.renderGallery();
        
        this.showToast('Image deleted successfully', 'info');
    }

    saveProfitShares() {
        // Save to localStorage (in production, save to server)
        try {
            const dataToSave = this.profitShares.map(item => ({
                ...item,
                src: item.src.length > 100000 ? 'data:image/...base64...' : item.src // Limit storage
            }));
            localStorage.setItem('bionicai_profit_shares', JSON.stringify(dataToSave));
        } catch (error) {
            console.error('Error saving profit shares:', error);
            // Clear some data if storage is full
            if (error.name === 'QuotaExceededError') {
                this.profitShares = this.profitShares.slice(0, 10);
                this.saveProfitShares();
            }
        }
    }

    loadProfitShares() {
        try {
            const saved = localStorage.getItem('bionicai_profit_shares');
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (error) {
            console.error('Error loading profit shares:', error);
        }
        
        // Return mock data if no saved data
        return this.generateMockProfitShares();
    }

    generateMockProfitShares() {
        return [
            {
                id: 1,
                src: 'https://via.placeholder.com/400x300/00ff00/000000?text=BTC+Long+Win',
                title: 'BTC Swing Long - 5.2% Profit',
                profit: '+$5.2',
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
            },
            {
                id: 2,
                src: 'https://via.placeholder.com/400x300/ff0000/000000?text=BTC+Short+Win',
                title: 'BTC Short Scalp - 3.1% Win',
                profit: '+$3.1',
                date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
            },
            {
                id: 3,
                src: 'https://via.placeholder.com/400x300/00aaff/000000?text=DCA+Position',
                title: 'DCA Long Position - 7.8% Gain',
                profit: '+$7.8',
                date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
            }
        ];
    }

    formatDate(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString();
    }

    loadMockData() {
        // Load initial mock data for demonstration
        this.blofinData = this.generateMockBlofinData();
        this.renderBlofinResults();
        this.updateStats();
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: ${type === 'success' ? '#00ff00' : type === 'error' ? '#ff0000' : '#00aaff'};
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
        }, 3000);
    }
}

// Global functions for HTML onclick handlers
function fetchBlofinResults() {
    window.tradingResults.fetchBlofinResults();
}

function viewImage(id) {
    window.tradingResults.viewImage(id);
}

function deleteImage(id) {
    window.tradingResults.deleteImage(id);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.tradingResults = new TradingResults();
});

// Add CSS animations
const styles = document.createElement('style');
styles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(styles);
