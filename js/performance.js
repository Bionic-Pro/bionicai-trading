// Performance page JavaScript
class PerformanceTracker {
    constructor() {
        this.trades = this.generateMockTrades();
        this.init();
    }

    init() {
        this.initializeProfitChart();
        this.initializeWinLossChart();
        this.populateTradesTable();
        this.setupEventListeners();
    }

    generateMockTrades() {
        const trades = [];
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 6); // 6 months of data

        for (let i = 0; i < 50; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + Math.floor(i * 3.5)); // Trade every ~3.5 days
            
            const entryPrice = 60000 + Math.random() * 15000;
            const isWin = Math.random() > 0.28; // 72% win rate
            const priceChange = (Math.random() * 8 + 2) * (isWin ? 1 : -1);
            const exitPrice = entryPrice * (1 + priceChange / 100);
            
            trades.push({
                date: date,
                type: Math.random() > 0.5 ? 'long' : 'short',
                entry: entryPrice,
                exit: exitPrice,
                size: 0.2,
                leverage: 10,
                pnl: isWin ? Math.abs(priceChange * 2) : -Math.abs(priceChange * 2),
                roi: priceChange,
                isWin: isWin
            });
        }
        
        return trades.sort((a, b) => b.date - a.date).slice(0, 20); // Show last 20 trades
    }

    initializeProfitChart() {
        const ctx = document.getElementById('profitChart');
        if (!ctx) return;

        // Calculate cumulative profit
        let cumulativeProfit = 0;
        const profitData = this.trades.slice().reverse().map(trade => {
            cumulativeProfit += trade.pnl;
            return cumulativeProfit;
        });

        const labels = this.trades.slice().reverse().map(trade => 
            trade.date.toLocaleDateString()
        );

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Cumulative Profit (%)',
                    data: profitData,
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
                            color: '#b0b0b0',
                            maxTicksLimit: 8
                        }
                    },
                    y: {
                        grid: {
                            color: '#333333'
                        },
                        ticks: {
                            color: '#b0b0b0',
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    initializeWinLossChart() {
        const ctx = document.getElementById('winLossChart');
        if (!ctx) return;

        const wins = this.trades.filter(trade => trade.isWin).length;
        const losses = this.trades.filter(trade => !trade.isWin).length;

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Wins', 'Losses'],
                datasets: [{
                    data: [wins, losses],
                    backgroundColor: ['#00ff00', '#ff0000'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#b0b0b0',
                            padding: 20
                        }
                    }
                }
            }
        });
    }

    populateTradesTable() {
        const tbody = document.getElementById('tradesTableBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        this.trades.forEach(trade => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${trade.date.toLocaleDateString()}</td>
                <td><span class="trade-type ${trade.type}">${trade.type}</span></td>
                <td>$${trade.entry.toLocaleString(undefined, {maximumFractionDigits: 0})}</td>
                <td>$${trade.exit.toLocaleString(undefined, {maximumFractionDigits: 0})}</td>
                <td>${trade.size}</td>
                <td>x${trade.leverage}</td>
                <td class="${trade.isWin ? 'trade-profit' : 'trade-loss'}">
                    ${trade.isWin ? '+' : ''}${trade.pnl.toFixed(1)}%
                </td>
                <td class="${trade.isWin ? 'trade-profit' : 'trade-loss'}">
                    ${trade.isWin ? '+' : ''}${trade.roi.toFixed(1)}%
                </td>
            `;
            tbody.appendChild(row);
        });
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
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PerformanceTracker();
});
