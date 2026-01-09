import { useState, useEffect } from 'react';

export function StrategyPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-primary text-text-primary">
      {/* Header */}
      <header className="bg-secondary-bg border-b border-border-color">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl md:text-5xl font-bold text-accent-green font-heading mb-2">
            MY COPY TRADING STRATEGY ON BLOFIN
          </h1>
          <p className="text-text-secondary text-lg">
            Disciplined BTC swing trading with smart risk management
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className={`space-y-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          
          {/* Strategy Overview */}
          <div className="bg-secondary-bg border border-border-color rounded-lg p-8">
            <h2 className="text-3xl font-bold text-accent-green font-heading mb-6">STRATEGY OVERVIEW</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-tertiary-bg rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-accent-green rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-coins text-black text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-accent-green">Position Size</h3>
                    <p className="text-text-secondary">0.2 BTC per position</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-tertiary-bg rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-accent-green rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-rocket text-black text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-accent-green">Leverage</h3>
                    <p className="text-text-secondary">x10 leverage</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-tertiary-bg rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-accent-green rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-bullseye text-black text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-accent-green">Profit Target</h3>
                    <p className="text-text-secondary">5%+ scaling up</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-tertiary-bg rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-accent-green rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-chart-line text-black text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-accent-green">Focus</h3>
                    <p className="text-text-secondary">99% BTC/USDT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Strategy */}
          <div className="bg-secondary-bg border border-border-color rounded-lg p-8 space-y-6">
            
            <section>
              <h2 className="text-2xl font-bold text-accent-green font-heading mb-4">THE CORE STRATEGY</h2>
              <p className="text-text-primary leading-relaxed text-lg mb-4">
                I'm a BTC swing trader. I don't day trade, I don't scalp, I don't chase pumps. I identify key support and resistance levels 
                and take calculated swings in the direction of the dominant trend.
              </p>
              <p className="text-text-primary leading-relaxed text-lg mb-4">
                My approach is simple: find high-probability setups, enter with small positions, manage risk aggressively, and let winners run. 
                I'm not trying to catch every move - just the ones with the highest probability of success.
              </p>
              <div className="bg-tertiary-bg border-l-4 border-accent-green p-4 rounded my-6">
                <p className="text-accent-green font-bold text-lg">
                  "I'd rather miss 10 good trades than take 1 bad one. Discipline beats regret every time."
                </p>
              </div>
            </section>

            <div className="border-l-2 border-accent-green h-8 mx-4"></div>

            <section>
              <h2 className="text-2xl font-bold text-accent-green font-heading mb-4">POSITION SIZING & LEVERAGE</h2>
              <p className="text-text-primary leading-relaxed text-lg mb-4">
                <strong>Position Size:</strong> 0.2 BTC per position. Always. No exceptions. This limits my maximum loss to a manageable amount 
                regardless of leverage.
              </p>
              <p className="text-text-primary leading-relaxed text-lg mb-4">
                <strong>Leverage:</strong> x10 maximum. I use leverage to amplify gains, not to increase position size beyond my risk tolerance. 
                With 0.2 BTC at x10 leverage, I'm controlling 2 BTC but my maximum loss is still limited.
              </p>
              <p className="text-text-primary leading-relaxed text-lg mb-4">
                <strong>Why this works:</strong> Small positions mean I can survive drawdowns. Leverage amplifies winners without amplifying my risk 
                beyond what I can handle emotionally and financially.
              </p>
            </section>

            <div className="border-l-2 border-accent-green h-8 mx-4"></div>

            <section>
              <h2 className="text-2xl font-bold text-accent-green font-heading mb-4">SMART DCA STRATEGY</h2>
              <p className="text-text-primary leading-relaxed text-lg mb-4">
                I use Dollar Cost Averaging, but not randomly. I DCA only at specific technical levels:
              </p>
              <ul className="text-text-primary leading-relaxed text-lg space-y-2 mb-4">
                <li>• <strong>Support Levels:</strong> Key historical support zones where BTC has bounced multiple times</li>
                <li>• <strong>Demand Zones:</strong> Areas of heavy buying interest on the order book</li>
                <li>• <strong>Fibonacci Levels:</strong> 0.5, 0.618, and 0.786 retracements during corrections</li>
                <li>• <strong>Maximum 2-3 DCA entries:</strong> I never average down more than twice per position</li>
              </ul>
              <p className="text-text-primary leading-relaxed text-lg mb-4">
                This isn't "buying the dip" randomly. It's systematic accumulation at proven levels of buyer interest.
              </p>
              <div className="bg-tertiary-bg border-l-4 border-accent-blue p-4 rounded my-6">
                <p className="text-accent-blue font-bold text-lg">
                  "My DCA entries are planned before I enter the trade. Emotion has no place in the decision."
                </p>
              </div>
            </section>

            <div className="border-l-2 border-accent-green h-8 mx-4"></div>

            <section>
              <h2 className="text-2xl font-bold text-accent-green font-heading mb-4">RISK MANAGEMENT RULES</h2>
              <div className="space-y-4">
                <div className="bg-tertiary-bg rounded p-4">
                  <h3 className="text-accent-green font-bold mb-2">🛡️ Maximum Risk Per Trade</h3>
                  <p className="text-text-primary">Never risk more than 2% of total capital on any single trade, including all DCA entries.</p>
                </div>
                
                <div className="bg-tertiary-bg rounded p-4">
                  <h3 className="text-accent-green font-bold mb-2">🛡️ Stop Loss Rules</h3>
                  <p className="text-text-primary">2-3% stop loss from entry price. No moving stops. No "it'll come back" mentality.</p>
                </div>
                
                <div className="bg-tertiary-bg rounded p-4">
                  <h3 className="text-accent-green font-bold mb-2">🛡️ Position Limits</h3>
                  <p className="text-text-primary">Maximum 3 concurrent positions. Never over-leverage the account.</p>
                </div>
                
                <div className="bg-tertiary-bg rounded p-4">
                  <h3 className="text-accent-green font-bold mb-2">🛡️ Backup Capital</h3>
                  <p className="text-text-primary">Always keep 50% of trading capital in reserve for opportunities and DCA.</p>
                </div>
              </div>
            </section>

            <div className="border-l-2 border-accent-green h-8 mx-4"></div>

            <section>
              <h2 className="text-2xl font-bold text-accent-green font-heading mb-4">PROFIT TAKING STRATEGY</h2>
              <p className="text-text-primary leading-relaxed text-lg mb-4">
                I scale out of positions, don't close them all at once:
              </p>
              <ul className="text-text-primary leading-relaxed text-lg space-y-2 mb-4">
                <li>• <strong>First Target:</strong> 3-5% - Close 25% of position</li>
                <li>• <strong>Second Target:</strong> 5-8% - Close another 25%</li>
                <li>• <strong>Third Target:</strong> 10%+ - Close remaining 50% or let run</li>
              </ul>
              <p className="text-text-primary leading-relaxed text-lg mb-4">
                This approach locks in profits while leaving room for bigger wins. I'm not greedy - I'm systematic.
              </p>
            </section>

            <div className="border-l-2 border-accent-green h-8 mx-4"></div>

            <section>
              <h2 className="text-2xl font-bold text-accent-green font-heading mb-4">COPY TRADING SPECIFICS</h2>
              <p className="text-text-primary leading-relaxed text-lg mb-4">
                <strong>Recommended Copy Size:</strong> Start with 50% of your intended capital. Keep the other 50% for DCA opportunities.
              </p>
              <p className="text-text-primary leading-relaxed text-lg mb-4">
                <strong>Minimum Capital:</strong> 1000 USDT recommended (with another 1000 USDT available for DCA if needed).
              </p>
              <p className="text-text-primary leading-relaxed text-lg mb-4">
                <strong>What You Get:</strong> All my trades automatically copied with the same position sizing, DCA entries, and risk management.
              </p>
              <p className="text-text-primary leading-relaxed text-lg mb-4">
                <strong>What You Don't Get:</strong> My emotional mistakes. The system executes the strategy without hesitation or fear.
              </p>
            </section>

          </div>

          {/* BIG DISCLAIMER */}
          <div className="bg-red-900 bg-opacity-20 border-2 border-accent-red rounded-lg p-8">
            <h2 className="text-3xl font-bold text-accent-red font-heading mb-4">
              ⚠️ THIS IS NOT FINANCIAL ADVICE
            </h2>
            <div className="space-y-4 text-text-primary">
              <p className="text-lg leading-relaxed">
                <strong>TRADING CARRIES SUBSTANTIAL RISK OF LOSS.</strong> Past performance is not indicative of future results. 
                My strategy works for me based on my risk tolerance, capital, and psychological makeup.
              </p>
              <p className="text-lg leading-relaxed">
                <strong>NEVER COPY WITH MORE THAN YOU CAN AFFORD TO LOSE.</strong> Never use rent money, emergency funds, or borrowed capital for trading.
              </p>
              <p className="text-lg leading-relaxed">
                <strong>CRYPTO MARKETS ARE EXTREMELY VOLATILE.</strong> BTC can drop 50% in weeks. My strategy accounts for this, but extreme market conditions can break any system.
              </p>
              <p className="text-lg leading-relaxed">
                <strong>YOU ARE RESPONSIBLE FOR YOUR OWN DECISIONS.</strong> Copy trading is convenient, but you're still taking the risk. 
                Monitor your positions, understand the strategy, and be prepared to stop copying if it's not working for you.
              </p>
              <p className="text-lg leading-relaxed">
                <strong>I'M NOT A FINANCIAL ADVISOR.</strong> I'm a trader sharing my personal approach. 
                Do your own research, understand the risks, and make informed decisions.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-secondary-bg border border-border-color rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-accent-green font-heading mb-4">
              READY FOR STEADY, RISK-MANAGED BTC SWINGS?
            </h3>
            <p className="text-text-primary text-lg mb-6">
              Join my copiers on Blofin. No guarantees, no shortcuts - just disciplined trading with proven risk management.
            </p>
            <button
              onClick={() => window.open('https://blofin.com/en/copy-trade/details/1908447789?module=futures', '_blank')}
              className="bg-accent-green text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-colors"
            >
              <i className="fas fa-rocket mr-2"></i>
              JOIN MY COPERS ON BLOFIN
            </button>
          </div>

        </div>
      </main>

      {/* Footer Disclaimer */}
      <footer className="bg-tertiary-bg border-t border-border-color py-4 px-4">
        <div className="container mx-auto text-center">
          <p className="text-text-secondary text-sm">
            This is my personal story and strategy. Past performance is not indicative of future results. 
            Crypto trading carries high risk.
          </p>
        </div>
      </footer>
    </div>
  );
}
