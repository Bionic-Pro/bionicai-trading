// Strategy page JavaScript
class StrategyPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupFAQ();
        this.setupEventListeners();
        this.initializeTooltips();
    }

    setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Close other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
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

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Add hover effects to strategy items
        const strategyItems = document.querySelectorAll('.strategy-item');
        strategyItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateX(5px)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateX(0)';
            });
        });
    }

    initializeTooltips() {
        // Add tooltips for trading terms
        const tooltipTerms = {
            'BTC/USDT': 'Bitcoin to US Dollar trading pair - most liquid crypto pair',
            'DCA': 'Dollar-Cost Averaging - buying more at lower prices',
            'x10 Leverage': '10x exposure with 1x capital - amplifies both gains and losses',
            'Stop-Loss': 'Automatic order to close position at specific price to limit losses',
            'Take Profit': 'Automatic order to close profitable position at target price'
        };

        // Find elements with these terms and add tooltips
        Object.keys(tooltipTerms).forEach(term => {
            const elements = document.querySelectorAll(`*:contains("${term}")`);
            elements.forEach(element => {
                if (element.children.length === 0) { // Only text nodes
                    element.style.position = 'relative';
                    element.style.cursor = 'help';
                    element.title = tooltipTerms[term];
                }
            });
        });
    }

    // Add interactive glossary
    createGlossaryPopup() {
        const popup = document.createElement('div');
        popup.id = 'glossaryPopup';
        popup.innerHTML = `
            <div class="glossary-content">
                <h3>Trading Glossary</h3>
                <div class="glossary-terms">
                    <div class="glossary-term">
                        <strong>Long:</strong> Buying position, profit when price goes up
                    </div>
                    <div class="glossary-term">
                        <strong>Short:</strong> Selling position, profit when price goes down
                    </div>
                    <div class="glossary-term">
                        <strong>Bull Market:</strong> Rising prices, optimistic sentiment
                    </div>
                    <div class="glossary-term">
                        <strong>Bear Market:</strong> Falling prices, pessimistic sentiment
                    </div>
                    <div class="glossary-term">
                        <strong>Whale:</strong> Large holder who can move markets
                    </div>
                </div>
                <button onclick="closeGlossary()">Close</button>
            </div>
        `;
        
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--secondary-bg);
            border: 2px solid var(--accent-green);
            border-radius: 12px;
            padding: 2rem;
            z-index: 3000;
            max-width: 500px;
            display: none;
        `;
        
        document.body.appendChild(popup);
    }
}

// Helper function to check if element contains text
function containsText(selector, text) {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).filter(el => el.textContent.includes(text));
}

// Global function for glossary
function closeGlossary() {
    const popup = document.getElementById('glossaryPopup');
    if (popup) {
        popup.style.display = 'none';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new StrategyPage();
});

// Add CSS for FAQ animations
const faqStyles = document.createElement('style');
faqStyles.textContent = `
    .faq-answer {
        transition: all 0.3s ease;
        overflow: hidden;
    }
    
    .faq-question::after {
        transition: transform 0.3s ease;
    }
    
    .strategy-item {
        transition: all 0.3s ease;
    }
    
    .glossary-content h3 {
        color: var(--accent-green);
        margin-bottom: 1rem;
    }
    
    .glossary-terms {
        margin-bottom: 1.5rem;
    }
    
    .glossary-term {
        margin-bottom: 0.75rem;
        padding: 0.5rem;
        background: var(--tertiary-bg);
        border-radius: 6px;
    }
`;
document.head.appendChild(faqStyles);
