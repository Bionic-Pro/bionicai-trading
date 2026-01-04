// Community page JavaScript
class CommunityPage {
    constructor() {
        this.qaData = this.loadMockQA();
        this.tutorials = this.loadTutorials();
        this.init();
    }

    init() {
        this.renderQA();
        this.setupEventListeners();
        this.loadFromLocalStorage();
    }

    loadMockQA() {
        return [
            {
                id: 1,
                question: "What's the minimum BTC needed to start copy trading?",
                author: "CryptoNewbie",
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
                answer: "Technically you can start with 0.2 BTC + margin for x10 leverage (around 2 BTC total). However, I recommend having at least 5 BTC for proper risk management across multiple positions.",
                answered: true,
                answeredBy: "Lead Trader"
            },
            {
                id: 2,
                question: "How do you handle sideways markets?",
                author: "SwingTrader99",
                timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
                answer: "Great question! During choppy/sideways periods, I reduce position size and frequency. Sometimes it's better to sit in cash and wait for clear trends. Patience beats overtrading every time.",
                answered: true,
                answeredBy: "Lead Trader"
            },
            {
                id: 3,
                question: "Can I customize the copy trading settings?",
                author: "RiskManager",
                timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
                answer: "Yes! You can adjust position size, leverage, and profit targets when setting up copy trading. Just understand the risk-reward implications of any changes you make.",
                answered: true,
                answeredBy: "Lead Trader"
            },
            {
                id: 4,
                question: "What happens during extreme volatility?",
                author: "VolatilityKing",
                timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
                answer: "During extreme volatility, I reduce position size and use tighter stops. Sometimes I'll pause copying temporarily until markets stabilize. Safety first!",
                answered: true,
                answeredBy: "Lead Trader"
            },
            {
                id: 5,
                question: "How do you decide between long and short positions?",
                author: "DirectionTrader",
                timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
                answer: "I use a combination of technical analysis, market structure, and sentiment. Key levels, trend lines, and volume patterns help determine direction. Always have a plan for both scenarios!",
                answered: true,
                answeredBy: "Lead Trader"
            }
        ];
    }

    loadTutorials() {
        return {
            dca: {
                title: "What's DCA? Dollar-Cost Averaging Explained",
                content: `
                    <h3>Understanding Dollar-Cost Averaging (DCA)</h3>
                    
                    <p><strong>DCA</strong> is a strategy where you invest a fixed amount at regular intervals, regardless of the asset's price. In trading, we use it to lower our average entry cost.</p>
                    
                    <h4>How It Works in Trading</h4>
                    <ul>
                        <li>Enter initial position at current price</li>
                        <li>If price drops 10-15%, add more (DCA step 1)</li>
                        <li>If price drops another 10-15%, add final amount (DCA step 2)</li>
                        <li>Your average entry cost is now lower than initial entry</li>
                    </ul>
                    
                    <h4>Example with BTC</h4>
                    <ul>
                        <li>Initial: 0.2 BTC at $65,000 = $13,000</li>
                        <li>DCA 1: 0.2 BTC at $58,500 = $11,700</li>
                        <li>DCA 2: 0.2 BTC at $52,650 = $10,530</li>
                        <li>Total: 0.6 BTC average cost $58,717</li>
                        <li>Breakeven at $58,717 (vs $65,000 initial)</li>
                    </ul>
                    
                    <h4>Why Use DCA?</h4>
                    <ul>
                        <li>Lowers average entry cost</li>
                        <li>Reduces emotional decision-making</li>
                        <li>Takes advantage of market dips</li>
                        <li>Improves risk/reward ratio</li>
                    </ul>
                    
                    <h4>Risks to Consider</h4>
                    <ul>
                        <li>Requires more capital</li>
                        <li>Can tie up funds in losing positions</li>
                        <li>Market may keep dropping</li>
                        <li>Set clear DCA limits (we use max 2 steps)</li>
                    </ul>
                    
                    <p><strong>Pro Tip:</strong> Always have a stop-loss even when DCA'ing. DCA improves entries but doesn't eliminate risk!</p>
                `
            },
            leverage: {
                title: "Understanding Leverage - x10 Explained",
                content: `
                    <h3>Leverage: The Double-Edged Sword</h3>
                    
                    <p><strong>Leverage</strong> lets you control a larger position with less capital. x10 leverage means $1,000 controls $10,000 worth of BTC.</p>
                    
                    <h4>How x10 Leverage Works</h4>
                    <ul>
                        <li>Your capital: 0.2 BTC (~$13,000)</li>
                        <li>With x10 leverage: Control 2 BTC (~$130,000)</li>
                        <li>1% price move = 10% profit/loss on your capital</li>
                        <li>10% price move = 100% profit/loss on your capital</li>
                    </ul>
                    
                    <h4>Profit Example (Long Position)</h4>
                    <ul>
                        <li>Entry: $65,000 with 0.2 BTC + x10 leverage</li>
                        <li>Price moves to $68,150 (+5%)</li>
                        <li>Position value: $136,300 (profit $6,300)</li>
                        <li>Your ROI: 48.5% on 0.2 BTC capital</li>
                    </ul>
                    
                    <h4>Risk Example (Same Position)</h4>
                    <ul>
                        <li>Entry: $65,000 with 0.2 BTC + x10 leverage</li>
                        <li>Price drops to $61,750 (-5%)</li>
                        <li>Position value: $123,500 (loss $6,500)</li>
                        <li>Your loss: 50% of 0.2 BTC capital</li>
                    </ul>
                    
                    <h4>Leverage Rules We Follow</h4>
                    <ul>
                        <li>Never use more than x10 (our standard)</li>
                        <li>Always use stop-losses (3-4% from entry)</li>
                        <li>Position size: 0.2 BTC max per trade</li>
                        <li>Max 5 concurrent positions</li>
                    </ul>
                    
                    <h4>Margin Calls & Liquidation</h4>
                    <p>With x10 leverage, ~10% adverse move = liquidation. This is why we use tight stops and never risk more than 2% per trade.</p>
                    
                    <p><strong>Golden Rule:</strong> Leverage amplifies BOTH profits AND losses. Respect the risk!</p>
                `
            },
            swing: {
                title: "Swing Trading Basics - Riding the Waves",
                content: `
                    <h3>Swing Trading: Medium-Term Trend Following</h3>
                    
                    <p><strong>Swing trading</strong> means holding positions for days to weeks to capture medium-term price movements or "swings."</p>
                    
                    <h4>What Makes a Swing Trade</h4>
                    <ul>
                        <li>Hold time: 2 days to 4 weeks (typical)</li>
                        <li>Target: 5-15% moves (sometimes more)</li>
                        <li>Basis: Technical analysis + market structure</li>
                        <li>Focus: Trend following, not prediction</li>
                    </ul>
                    
                    <h4>Our Swing Trading Strategy</h4>
                    <ul>
                        <li>Identify major support/resistance levels</li>
                        <li>Wait for confirmation (breakout or rejection)</li>
                        <li>Enter with 0.2 BTC position size</li>
                        <li>Set stop-loss 3-4% away</li>
                        <li>Target 5% minimum, scale up to 10-15%</li>
                        <li>Use DCA on pullbacks (max 2 steps)</li>
                    </ul>
                    
                    <h4>Swing Trade Example</h4>
                    <ul>
                        <li>BTC breaks above $65,000 resistance</li>
                        <li>Enter long at $65,200 with 0.2 BTC</li>
                        <li>Stop-loss at $62,500 (3.9% risk)</li>
                        <li>Target 1: $68,500 (5% profit)</li>
                        <li>Target 2: $72,000 (10% profit)</li>
                        <li>Hold for 8 days, exit at $70,000 (7.4% profit)</li>
                    </ul>
                    
                    <h4>Swing vs Day Trading</h4>
                    <ul>
                        <li><strong>Day Trading:</strong> Minutes to hours, high frequency</li>
                        <li><strong>Swing Trading:</strong> Days to weeks, medium frequency</li>
                        <li><strong>Position Trading:</strong> Weeks to months, low frequency</li>
                    </ul>
                    
                    <h4>Why We Prefer Swing Trading</h4>
                    <ul>
                        <li>Less stressful than day trading</li>
                        <li>Captures more meaningful price moves</li>
                        <li>Fits with our DCA strategy</li>
                        <li>Allows for proper risk management</li>
                        <li>Works well with x10 leverage</li>
                    </ul>
                    
                    <p><strong>Key Mindset:</strong> Swing trading requires patience. Let the trade play out, don't rush exits!</p>
                `
            },
            risk: {
                title: "Risk Management 101 - Protect Your Capital",
                content: `
                    <h3>Risk Management: The Most Important Skill</h3>
                    
                    <p><strong>Risk management</strong> is what separates profitable traders from gamblers. It's about surviving the bad trades to profit from the good ones.</p>
                    
                    <h4>Our Core Risk Rules</h4>
                    <ul>
                        <li><strong>2% Max Risk Per Trade:</strong> Never risk more than 2% of total capital</li>
                        <li><strong>Stop-Loss Always:</strong> Every trade has a defined exit point</li>
                        <li><strong>Position Sizing:</strong> 0.2 BTC maximum per position</li>
                        <li><strong>Max 5 Positions:</strong> Never over-leverage the portfolio</li>
                        <li><strong>DCA Limits:</strong> Maximum 2 DCA steps per position</li>
                    </ul>
                    
                    <h4>Stop-Loss Strategy</h4>
                    <ul>
                        <li><strong>Long Positions:</strong> Stop 3-4% below entry</li>
                        <li><strong>Short Positions:</strong> Stop 3-4% above entry</li>
                        <li><strong>Trailing Stops:</strong> Move up as trade becomes profitable</li>
                        <li><strong>Never Move Stops Away:</strong> Only tighten, never loosen</li>
                    </ul>
                    
                    <h4>Position Sizing Formula</h4>
                    <p>Position Size = (Total Capital × Risk %) ÷ (Entry Price - Stop Loss)</p>
                    <ul>
                        <li>Example: $50,000 capital, 2% risk = $1,000 max loss</li>
                        <li>Entry $65,000, stop $62,500 = $2,500 risk per BTC</li>
                        <li>Position size = $1,000 ÷ $2,500 = 0.4 BTC</li>
                        <li>We use 0.2 BTC for extra safety margin</li>
                    </ul>
                    
                    <h4>Portfolio Risk Management</h4>
                    <ul>
                        <li><strong>Correlation:</strong> Don't have all positions in same direction</li>
                        <li><strong>Diversification:</strong> Mix longs and shorts based on analysis</li>
                        <li><strong>Market Conditions:</strong> Reduce size during high volatility</li>
                        <li><strong>Drawdown Limits:</strong> Stop trading if down 10% in a week</li>
                    </ul>
                    
                    <h4>Psychological Risk Management</h4>
                    <ul>
                        <li><strong>No Revenge Trading:</strong> Don't chase losses</li>
                        <li><strong>Set Daily Limits:</strong> Max losses per day/week</li>
                        <li><strong>Take Breaks:</strong> Step away after big wins/losses</li>
                        <li><strong>Stick to Plan:</strong> Never improvise during trades</li>
                    </ul>
                    
                    <p><strong>Remember:</strong> Good risk management means you can survive 10 losing trades and still be in business!</p>
                `
            },
            technical: {
                title: "Technical Analysis - Reading the Charts",
                content: `
                    <h3>Technical Analysis: The Language of Charts</h3>
                    
                    <p><strong>Technical analysis</strong> is studying price patterns and indicators to predict future movements. It's about probabilities, not certainties.</p>
                    
                    <h4>Key Concepts We Use</h4>
                    
                    <h5>Support & Resistance</h5>
                    <ul>
                        <li><strong>Support:</strong> Price floor where buying pressure exceeds selling</li>
                        <li><strong>Resistance:</strong> Price ceiling where selling exceeds buying</li>
                        <li><strong>Flip:</strong> Support becomes resistance (and vice versa)</li>
                        <li><strong>Levels:</strong> Round numbers, previous highs/lows, moving averages</li>
                    </ul>
                    
                    <h5>Trend Analysis</h5>
                    <ul>
                        <li><strong>Uptrend:</strong> Higher highs, higher lows</li>
                        <li><strong>Downtrend:</strong> Lower highs, lower lows</li>
                        <li><strong>Sideways:</strong> Range-bound between support/resistance</li>
                        <li><strong>Trendlines:</strong> Connect swing lows (support) or highs (resistance)</li>
                    </ul>
                    
                    <h4>Essential Indicators</h4>
                    
                    <h5>RSI (Relative Strength Index)</h5>
                    <ul>
                        <li>Momentum oscillator (0-100)</li>
                        <li>Overbought: >70 (potential reversal down)</li>
                        <li>Oversold: <30 (potential reversal up)</li>
                        <li>Divergence: Price vs RSI moving in opposite directions</li>
                    </ul>
                    
                    <h5>Volume Analysis</h5>
                    <ul>
                        <li>Volume confirms price moves</li>
                        <li>High volume + breakout = strong signal</li>
                        <li>Low volume + breakout = weak signal</li>
                        <li>Volume drying up = trend ending</li>
                    </ul>
                    
                    <h5>Moving Averages</h5>
                    <ul>
                        <li><strong>20 MA:</strong> Short-term trend</li>
                        <li><strong>50 MA:</strong> Medium-term trend</li>
                        <li><strong>200 MA:</strong> Long-term trend</li>
                        <li>Crossovers signal potential trend changes</li>
                    </ul>
                    
                    <h4>Chart Patterns We Watch</h4>
                    
                    <h5>Continuation Patterns</h5>
                    <ul>
                        <li><strong>Flags/Pennants:</strong> Brief consolidation before continuation</li>
                        <li><strong>Triangles:</strong> Coiling before breakout</li>
                        <li><strong>Rectangles:</strong> Range-bound before direction</li>
                    </ul>
                    
                    <h5>Reversal Patterns</h5>
                    <ul>
                        <li><strong>Double Top/Bottom:</strong> Two failed attempts at new high/low</li>
                        <li><strong>Head & Shoulders:</strong> Three peaks with middle highest</li>
                        <li><strong>Wedges:</strong> Conging trendlines, often reverse</li>
                    </ul>
                    
                    <h4>Our Analysis Process</h4>
                    <ol>
                        <li>Identify major support/resistance levels</li>
                        <li>Determine overall trend (higher timeframe)</li>
                        <li>Look for entry patterns on shorter timeframe</li>
                        <li>Confirm with volume and indicators</li>
                        <li>Set stop-loss and profit targets</li>
                        <li>Execute and manage the trade</li>
                    </ol>
                    
                    <p><strong>Key Principle:</strong> Multiple signals confirming the same direction = higher probability trade!</p>
                `
            },
            psychology: {
                title: "Trading Psychology - Master Your Mind",
                content: `
                    <h3>Trading Psychology: The Mental Game</h3>
                    
                    <p><strong>Trading psychology</strong> is about controlling emotions and making rational decisions under pressure. It's often the difference between success and failure.</p>
                    
                    <h4>Common Psychological Traps</h4>
                    
                    <h5>Fear</h5>
                    <ul>
                        <li><strong>Fear of Missing Out (FOMO):</strong> Chasing moves that have already happened</li>
                        <li><strong>Fear of Loss:</strong> Closing winners too early, holding losers too long</li>
                        <li><strong>Fear of Being Wrong:</strong> Refusing to admit mistakes</li>
                    </ul>
                    
                    <h5>Greed</h5>
                    <ul>
                        <li><strong>Overtrading:</strong> Taking too many positions</li>
                        <li><strong>Position Size:</strong> Risking too much on one trade</li>
                        <li><strong>Profit Targets:</strong> Ignoring targets hoping for more</li>
                    </ul>
                    
                    <h5>Hope & Denial</h5>
                    <ul>
                        <li><strong>Hoping:</strong> "It will come back" (it often doesn't)</li>
                        <li><strong>Denial:</strong> Ignoring clear warning signs</li>
                        <li><strong>Revenge Trading:</strong> Trying to win back losses immediately</li>
                    </ul>
                    
                    <h4>Developing Trading Discipline</h4>
                    
                    <h5>Pre-Trade Routine</h5>
                    <ul>
                        <li>Review your trading plan</li>
                        <li>Check market conditions</li>
                        <li>Know your entry, stop, and target BEFORE trading</li>
                        <li>Accept the risk (mentally prepare to lose)</li>
                    </ul>
                    
                    <h5>During Trade</h5>
                    <ul>
                        <li>Stick to your plan</li>
                        <li>Don't watch every tick (stressful)</li>
                        <li>Let stop-losses do their job</li>
                        <li>Avoid impulsive decisions</li>
                    </ul>
                    
                    <h5>Post-Trade Review</h5>
                    <ul>
                        <li>Analyze winners AND losers</li>
                        <li>Focus on process, not just results</li>
                        <li>Learn from mistakes without guilt</li>
                        <li>Keep a trading journal</li>
                    </ul>
                    
                    <h4>Emotional Management Techniques</h4>
                    
                    <h5>When Stressed</h5>
                    <ul>
                        <li>Step away from screens</li>
                        <li>Deep breathing exercises</li>
                        <li>Physical activity (walk, workout)</li>
                        <li>Talk to another trader</li>
                    </ul>
                    
                    <h5>When Overconfident</h5>
                    <ul>
                        <li>Review past losing trades</li>
                        <li>Remind yourself of risks</li>
                        <li>Reduce position size temporarily</li>
                        <li>Stick to your rules more strictly</li>
                    </ul>
                    
                    <h4>Professional Trader Mindset</h4>
                    <ul>
                        <li><strong>Probabilistic Thinking:</strong> Every trade has uncertainty</li>
                        <li><strong>Process Over Outcome:</strong> Good process wins long-term</li>
                        <li><strong>Risk Acceptance:</strong> Losses are part of the business</li>
                        <li><strong>Continuous Learning:</strong> Always improving</li>
                        <li><strong>Emotional Detachment:</strong> Money is just a score</li>
                    </ul>
                    
                    <h4>Red Flags to Watch For</h4>
                    <ul>
                        <li>Breaking your own rules</li>
                        <li>Trading when angry or emotional</li>
                        <li>Increasing size after losses</li>
                        <li>Ignoring stop-losses</li>
                        <li>Blaming the market</li>
                    </ul>
                    
                    <p><strong>Remember:</strong> The best traders aren't psychic - they're disciplined!</p>
                `
            }
        };
    }

    renderQA() {
        const qaList = document.getElementById('qaList');
        if (!qaList) return;

        qaList.innerHTML = '';

        this.qaData.forEach(qa => {
            const qaItem = document.createElement('div');
            qaItem.className = 'qa-item';
            
            qaItem.innerHTML = `
                <div class="qa-question-header">
                    <div>
                        <div class="qa-question">${qa.question}</div>
                        <div class="qa-meta">
                            <span><i class="fas fa-user"></i> ${qa.author}</span>
                            <span><i class="fas fa-clock"></i> ${this.getTimeAgo(qa.timestamp)}</span>
                        </div>
                    </div>
                    ${qa.answered ? '<span style="color: var(--accent-green);"><i class="fas fa-check-circle"></i> Answered</span>' : ''}
                </div>
                ${qa.answered ? `
                    <div class="qa-answer">
                        <div class="qa-answer-header">
                            <i class="fas fa-reply"></i> ${qa.answeredBy}
                        </div>
                        ${qa.answer}
                    </div>
                ` : ''}
            `;
            
            qaList.appendChild(qaItem);
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

    loadFromLocalStorage() {
        // Load any saved Q&A from localStorage
        const savedQA = localStorage.getItem('bionicai_qa');
        if (savedQA) {
            try {
                const parsedQA = JSON.parse(savedQA);
                this.qaData = [...parsedQA, ...this.qaData];
                this.renderQA();
            } catch (error) {
                console.error('Error loading saved Q&A:', error);
            }
        }
    }

    saveToLocalStorage() {
        // Save Q&A to localStorage
        localStorage.setItem('bionicai_qa', JSON.stringify(this.qaData));
    }
}

// Global functions for HTML onclick handlers
function toggleQAForm() {
    const form = document.getElementById('qaForm');
    form.classList.toggle('active');
    
    if (form.classList.contains('active')) {
        document.getElementById('questionText').focus();
    }
}

function submitQuestion() {
    const name = document.getElementById('questionName').value.trim();
    const question = document.getElementById('questionText').value.trim();
    
    if (!question) {
        alert('Please enter a question');
        return;
    }
    
    // Add new question to the list
    const newQA = {
        id: Date.now(),
        question: question,
        author: name || 'Anonymous',
        timestamp: new Date(),
        answer: null,
        answered: false,
        answeredBy: null
    };
    
    window.communityPage.qaData.unshift(newQA);
    window.communityPage.renderQA();
    window.communityPage.saveToLocalStorage();
    
    // Clear form and close
    document.getElementById('questionName').value = '';
    document.getElementById('questionText').value = '';
    toggleQAForm();
    
    // Show success message
    window.communityPage.showToast('Question submitted successfully!', 'success');
}

function openTutorial(topic) {
    const modal = document.getElementById('tutorialModal');
    const title = document.getElementById('tutorialTitle');
    const content = document.getElementById('tutorialContent');
    
    const tutorial = window.communityPage.tutorials[topic];
    if (tutorial) {
        title.textContent = tutorial.title;
        content.innerHTML = tutorial.content;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Add toast method to CommunityPage
CommunityPage.prototype.showToast = function(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${type === 'success' ? '#00ff00' : '#00aaff'};
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
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.communityPage = new CommunityPage();
});
