// BionicAI Trading - Main JavaScript Application

class BionicAITrading {
    constructor() {
        this.currentWizardStep = 1;
        this.btcPrice = 0;
        this.priceHistory = [];
        this.chart = null;
        this.positions = [];
        this.isConnected = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeChart();
        this.startPriceUpdates();
        this.loadMockPositions();
        this.checkFirstVisit();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => this.handleNavigation(e));
        });

        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.addEventListener('click', (e) => this.handleNavigation(e));
        });

        // Mobile menu
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Modal checkboxes
        const acceptTerms = document.getElementById('acceptTerms');
        const ageVerify = document.getElementById('ageVerify');
        const startCopyBtn = document.getElementById('startCopyBtn');

        if (acceptTerms && ageVerify && startCopyBtn) {
            [acceptTerms, ageVerify].forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    startCopyBtn.disabled = !(acceptTerms.checked && ageVerify.checked);
                });
            });
        }

        // Close modals on outside click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });

        // Form validation
        document.querySelectorAll('input[type="password"], input[type="number"], select').forEach(input => {
            input.addEventListener('input', () => this.validateForm());
        });
    }

    handleNavigation(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            
            // Update active states
            document.querySelectorAll('.nav-link, .sidebar-link').forEach(link => {
                link.classList.remove('active');
            });
            
            document.querySelectorAll(`[href="#${targetId}"]`).forEach(link => {
                link.classList.add('active');
            });
        }
    }

    toggleMobileMenu() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('active');
    }

    initializeChart() {
        const ctx = document.getElementById('btcChart');
        if (!ctx) return;

        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'BTC/USDT',
                    data: [],
                    borderColor: '#00ff00',
                    backgroundColor: 'rgba(0, 255, 0, 0.1)',
                    borderWidth: 2,
                    tension: 0.1,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: '#333333'
                        },
                        ticks: {
                            color: '#b0b0b0'
                        }
                    },
                    y: {
                        grid: {
                            color: '#333333'
                        },
                        ticks: {
                            color: '#b0b0b0',
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    async startPriceUpdates() {
        // Initial price fetch
        await this.fetchBTCPrice();
        
        // Update every 5 seconds
        setInterval(() => this.fetchBTCPrice(), 5000);
    }

    async fetchBTCPrice() {
        try {
            // Using CoinGecko API for real BTC price
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true');
            const data = await response.json();
            
            const newPrice = data.bitcoin.usd;
            const change = data.bitcoin.usd_24h_change;
            
            this.updatePriceDisplay(newPrice, change);
            this.updateChart(newPrice);
            
        } catch (error) {
            console.error('Error fetching BTC price:', error);
            // Fallback to mock data
            this.updateMockPrice();
        }
    }

    updatePriceDisplay(price, change) {
        const priceElement = document.getElementById('btcPrice');
        const changeElement = document.getElementById('btcChange');
        
        if (priceElement) {
            priceElement.querySelector('.price').textContent = `$${price.toLocaleString()}`;
        }
        
        if (changeElement) {
            const changeValue = change.toFixed(2);
            changeElement.textContent = `${changeValue > 0 ? '+' : ''}${changeValue}%`;
            changeElement.className = `change ${changeValue > 0 ? 'positive' : 'negative'}`;
        }
        
        this.btcPrice = price;
    }

    updateChart(price) {
        if (!this.chart) return;
        
        const now = new Date();
        const timeLabel = now.toLocaleTimeString();
        
        // Keep only last 20 data points
        if (this.chart.data.labels.length > 20) {
            this.chart.data.labels.shift();
            this.chart.data.datasets[0].data.shift();
        }
        
        this.chart.data.labels.push(timeLabel);
        this.chart.data.datasets[0].data.push(price);
        this.chart.update();
    }

    updateMockPrice() {
        // Generate realistic mock price data
        const basePrice = 65000;
        const variation = (Math.random() - 0.5) * 2000;
        const mockPrice = basePrice + variation;
        const mockChange = ((Math.random() - 0.5) * 10);
        
        this.updatePriceDisplay(mockPrice, mockChange);
        this.updateChart(mockPrice);
    }

    loadMockPositions() {
        // Mock current positions
        this.positions = [
            {
                id: 1,
                type: 'long',
                pair: 'BTC/USDT',
                entry: 64250,
                current: 65120,
                size: 0.2,
                leverage: 10,
                pnl: 1740,
                pnlPercent: 2.7,
                status: 'active'
            },
            {
                id: 2,
                type: 'short',
                pair: 'BTC/USDT',
                entry: 65800,
                current: 65120,
                size: 0.2,
                leverage: 10,
                pnl: 1360,
                pnlPercent: 2.1,
                status: 'active'
            },
            {
                id: 3,
                type: 'long',
                pair: 'BTC/USDT',
                entry: 63500,
                current: 65120,
                size: 0.2,
                leverage: 10,
                pnl: 3240,
                pnlPercent: 5.1,
                status: 'tp_hit' // Take profit hit
            }
        ];
        
        this.renderPositions();
    }

    renderPositions() {
        const positionsGrid = document.getElementById('positionsGrid');
        if (!positionsGrid) return;
        
        positionsGrid.innerHTML = '';
        
        this.positions.forEach(position => {
            const card = document.createElement('div');
            card.className = 'position-card';
            card.innerHTML = `
                <div class="position-header">
                    <div class="position-type ${position.type}">
                        <i class="fas fa-arrow-${position.type === 'long' ? 'up' : 'down'}"></i>
                        ${position.type.toUpperCase()}
                    </div>
                    <div class="position-status ${position.status}">
                        ${position.status === 'tp_hit' ? 'TP Hit' : 'Active'}
                    </div>
                </div>
                <div class="position-details">
                    <div class="position-detail">
                        <span class="position-label">Entry</span>
                        <span class="position-value">$${position.entry.toLocaleString()}</span>
                    </div>
                    <div class="position-detail">
                        <span class="position-label">Current</span>
                        <span class="position-value">$${position.current.toLocaleString()}</span>
                    </div>
                    <div class="position-detail">
                        <span class="position-label">Size</span>
                        <span class="position-value">${position.size} BTC</span>
                    </div>
                    <div class="position-detail">
                        <span class="position-label">Leverage</span>
                        <span class="position-value">x${position.leverage}</span>
                    </div>
                    <div class="position-detail">
                        <span class="position-label">P&L</span>
                        <span class="position-value ${position.pnl > 0 ? 'positive' : 'negative'}">
                            $${position.pnl.toLocaleString()} (${position.pnlPercent > 0 ? '+' : ''}${position.pnlPercent}%)
                        </span>
                    </div>
                </div>
            `;
            
            positionsGrid.appendChild(card);
        });
    }

    checkFirstVisit() {
        const hasVisited = localStorage.getItem('bionicai_visited');
        if (!hasVisited) {
            setTimeout(() => {
                this.showModal('termsModal');
                localStorage.setItem('bionicai_visited', 'true');
            }, 2000);
        }
    }

    validateForm() {
        // Basic form validation
        const apiKey = document.getElementById('apiKey')?.value;
        const secretKey = document.getElementById('secretKey')?.value;
        const positionSize = document.getElementById('positionSize')?.value;
        
        const isValid = apiKey && secretKey && positionSize && parseFloat(positionSize) > 0;
        
        // Enable/disable next button based on validation
        const nextBtn = document.querySelector('.wizard-next');
        if (nextBtn) {
            nextBtn.disabled = !isValid;
        }
        
        return isValid;
    }

    // Modal management
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Wizard navigation
    nextWizardStep() {
        if (this.currentWizardStep < 3) {
            if (this.validateForm() || this.currentWizardStep === 1) {
                this.currentWizardStep++;
                this.updateWizardDisplay();
            }
        }
    }

    prevWizardStep() {
        if (this.currentWizardStep > 1) {
            this.currentWizardStep--;
            this.updateWizardDisplay();
        }
    }

    updateWizardDisplay() {
        // Update step indicators
        document.querySelectorAll('.step').forEach(step => {
            const stepNum = parseInt(step.dataset.step);
            step.classList.remove('active', 'completed');
            
            if (stepNum === this.currentWizardStep) {
                step.classList.add('active');
            } else if (stepNum < this.currentWizardStep) {
                step.classList.add('completed');
            }
        });

        // Update step content
        document.querySelectorAll('.wizard-step-content').forEach(content => {
            content.classList.remove('active');
        });
        
        const activeContent = document.querySelector(`.wizard-step-content[data-step="${this.currentWizardStep}"]`);
        if (activeContent) {
            activeContent.classList.add('active');
        }
    }

    // Copy trading setup
    async startCopying() {
        const acceptTerms = document.getElementById('acceptTerms')?.checked;
        const ageVerify = document.getElementById('ageVerify')?.checked;
        
        if (!acceptTerms || !ageVerify) {
            alert('Please accept terms and verify your age');
            return;
        }

        try {
            // Show loading state
            const startBtn = document.getElementById('startCopyBtn');
            const originalText = startBtn.innerHTML;
            startBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> CONNECTING...';
            startBtn.disabled = true;

            // Simulate API connection
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Success
            this.isConnected = true;
            this.closeModal('copySetupModal');
            this.showSuccessMessage('Successfully connected! You are now copying trades.');
            
            // Reset button
            startBtn.innerHTML = originalText;
            startBtn.disabled = false;
            
            // Update UI to show connected state
            this.updateConnectionStatus();
            
        } catch (error) {
            console.error('Connection error:', error);
            this.showErrorMessage('Failed to connect. Please check your API keys and try again.');
            
            // Reset button
            const startBtn = document.getElementById('startCopyBtn');
            startBtn.innerHTML = originalText;
            startBtn.disabled = false;
        }
    }

    updateConnectionStatus() {
        // Update UI to show user is connected
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton && this.isConnected) {
            ctaButton.innerHTML = '<i class="fas fa-check"></i> COPYING ACTIVE';
            ctaButton.style.background = 'linear-gradient(135deg, #00ff00, #00cc00)';
        }
    }

    showSuccessMessage(message) {
        this.showToast(message, 'success');
    }

    showErrorMessage(message) {
        this.showToast(message, 'error');
    }

    showToast(message, type = 'info') {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: ${type === 'success' ? '#00ff00' : '#ff0000'};
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
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Market updates simulation
    async fetchMarketUpdates() {
        try {
            // This would integrate with a news API in production
            const updates = [
                {
                    title: "Daily BTC Scoop",
                    content: "Bulls charging? Watch for $65k breakout level. Volume increasing steadily.",
                    type: "daily",
                    timestamp: new Date()
                },
                {
                    title: "Weekly Swing Setup",
                    content: "Holding Long positions, DCA ready if dip to $63k. Target 5-7% gains.",
                    type: "weekly", 
                    timestamp: new Date()
                }
            ];
            
            return updates;
        } catch (error) {
            console.error('Error fetching market updates:', error);
            return [];
        }
    }

    // Performance tracking
    getPerformanceStats() {
        return {
            winRate: 72,
            totalTrades: 524,
            profitTrades: 378,
            lossTrades: 146,
            avgROI: 4.2,
            totalROI: 2204,
            sharpeRatio: 1.8,
            maxDrawdown: 12.3
        };
    }

    // Initialize tooltips for trading slang
    initializeTooltips() {
        const tooltips = {
            'Leverage': 'x10 – Amp up your position size for bigger wins (but watch the risks!)',
            'DCA': 'Dollar-Cost Averaging – Add to position to lower average cost',
            'Swing Trade': 'Hold for days/weeks to ride the wave',
            'TP': 'Take Profit – Lock in gains at target price',
            'Long': 'Go Long – Buy position, profit when price goes up',
            'Short': 'Short It – Sell position, profit when price goes down'
        };

        // Add tooltips to elements with data-tooltip attribute
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            const term = element.dataset.tooltip;
            if (tooltips[term]) {
                element.title = tooltips[term];
            }
        });
    }
}

// Global functions for HTML onclick handlers
function showCopySetup() {
    window.bionicAI.showModal('copySetupModal');
}

function closeModal(modalId) {
    window.bionicAI.closeModal(modalId);
}

function nextWizardStep() {
    window.bionicAI.nextWizardStep();
}

function prevWizardStep() {
    window.bionicAI.prevWizardStep();
}

function startCopying() {
    window.bionicAI.startCopying();
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.bionicAI = new BionicAITrading();
    
    // Add CSS animations for toasts
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .toast {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }
    `;
    document.head.appendChild(style);
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause updates when page is hidden
        console.log('Page hidden - pausing updates');
    } else {
        // Resume updates when page is visible
        console.log('Page visible - resuming updates');
        if (window.bionicAI) {
            window.bionicAI.fetchBTCPrice();
        }
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
});

// Service Worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    });
}
