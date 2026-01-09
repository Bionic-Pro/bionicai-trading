import { useState, useEffect } from 'react';

export function JourneyPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-primary text-text-primary">
      {/* Header */}
      <header className="bg-secondary-bg border-b border-border-color">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent-green rounded-lg flex items-center justify-center">
                <i className="fas fa-chart-line text-black text-xl"></i>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-accent-green font-heading mb-2">
                  MY JOURNEY AS A TRADER
                </h1>
                <p className="text-text-secondary text-lg">
                  From mining losses to disciplined BTC trading - the real story
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-text-secondary">Current Status</p>
                <p className="text-2xl font-bold text-accent-green">DISCIPLINED TRADER</p>
              </div>
              <button
                onClick={() => window.open('https://blofin.com/en/copy-trade/details/1908447789?module=futures', '_blank')}
                className="bg-accent-green text-black px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors"
              >
                START COPYING
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className={`space-y-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          
          {/* Timeline Section */}
          <div className="bg-secondary-bg border border-border-color rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-accent-green font-heading">TRADING TIMELINE</h3>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-tertiary-bg border border-border-color rounded text-sm text-text-secondary">2017</span>
                <div className="w-16 h-0.5 bg-accent-green"></div>
                <span className="px-3 py-1 bg-tertiary-bg border border-border-color rounded text-sm text-text-secondary">2023</span>
                <div className="w-16 h-0.5 bg-accent-green"></div>
                <span className="px-3 py-1 bg-tertiary-bg border border-border-color rounded text-sm text-text-secondary">2024</span>
                <div className="w-16 h-0.5 bg-accent-green"></div>
                <span className="px-3 py-1 bg-accent-green text-black rounded text-sm font-bold">NOW</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-red rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-black font-bold text-xl">2017</span>
                </div>
                <h4 className="font-bold text-accent-red">Mining Era</h4>
                <p className="text-sm text-text-secondary">ETH mining losses</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-yellow rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-black font-bold text-xl">2018</span>
                </div>
                <h4 className="font-bold text-accent-yellow">Gambling Phase</h4>
                <p className="text-sm text-text-secondary">Forex/crypto blowups</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-blue rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-black font-bold text-xl">2021</span>
                </div>
                <h4 className="font-bold text-accent-blue">Wakeup Call</h4>
                <p className="text-sm text-text-secondary">Discipline learned</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-green rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-black font-bold text-xl">NOW</span>
                </div>
                <h4 className="font-bold text-accent-green">Disciplined BTC</h4>
                <p className="text-sm text-text-secondary">Consistent wins</p>
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div className="bg-secondary-bg border border-border-color rounded-lg p-8 space-y-6">
            
            <section className="border-l-4 border-accent-red pl-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-accent-red rounded-full flex items-center justify-center mr-4">
                  <span className="text-black font-bold">2017</span>
                </div>
                <h2 className="text-2xl font-bold text-accent-red font-heading">THE BEGINNING - MINING LOSSES</h2>
              </div>
              <p className="text-text-primary leading-relaxed text-lg mb-4">
                I got into crypto during the 2017 bull run, like many others. I was mining Ethereum with a small rig I built myself, dreaming of passive income. The problem? I had no idea what I was doing.
              </p>
              <p className="text-text-primary leading-relaxed text-lg mb-4">
                Electricity costs were eating my profits. I was staying up until 3 AM tweaking overclock settings, reading forums about hashrates, and watching my mining rig like a hawk. When the 2018 crash hit, my dreams of "passive income" turned into active losses.
              </p>
              <div className="bg-tertiary-bg border-l-4 border-accent-red p-4 rounded my-6">
                <p className="text-accent-red font-bold text-lg">
                  "I lost 85% of my initial investment in mining equipment and ETH. It was devastating."
                </p>
              </div>
            </section>

            <section className="border-l-4 border-accent-yellow pl-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-accent-yellow rounded-full flex items-center justify-center mr-4">
                  <span className="text-black font-bold">2018</span>
                </div>
                <h2 className="text-2xl font-bold text-accent-yellow font-heading">THE GAMBLING PHASE</h2>
              </div>
              <p className="text-text-primary leading-relaxed text-lg mb-4">
                After mining failed, I thought trading was the answer. Spoiler: I was wrong. I was gambling.
              </p>
              <p className="text-text-primary leading-relaxed text-lg mb-4">
                I tried everything. Forex, crypto futures, options, you name it. I was chasing 100x returns, risking way too much on single trades, and blowing up accounts faster than I could fund them. The pattern was always the same: get lucky, get greedy, get wrecked.
              </p>
              <div className="bg-tertiary-bg border-l-4 border-accent-yellow p-4 rounded my-6">
                <p className="text-accent-yellow font-bold text-lg">
                  "At my lowest point, I had blown through $50,000 in savings and was trading with borrowed money. That's when I knew something had to change."
                </p>
              </div>
            </section>

            <section className="border-l-4 border-accent-blue pl-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-accent-blue rounded-full flex items-center justify-center mr-4">
                  <span className="text-black font-bold">2021</span>
                </div>
                <h2 className="text-2xl font-bold text-accent-blue font-heading">THE WAKEUP CALL</h2>
              </div>
              <p className="text-text-primary leading-relaxed text-lg mb-4">
                The 2021 bull run was different for me. I wasn't trying to get rich quick anymore. I was trying to survive.
              </p>
              <p className="text-text-primary leading-relaxed text-lg mb-4">
                I started studying actual trading psychology. I read every book I could find on risk management. I realized my problem wasn't strategy - it was discipline. I was treating trading like a casino instead of a business.
              </p>
              <div className="bg-tertiary-bg border-l-4 border-accent-blue p-4 rounded my-6">
                <p className="text-accent-blue font-bold text-lg">
                  "I made my first consistent profits not by being smarter, but by being more disciplined than everyone else."
                </p>
              </div>
            </section>

            <section className="border-l-4 border-accent-green pl-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-accent-green rounded-full flex items-center justify-center mr-4">
                  <span className="text-black font-bold">NOW</span>
                </div>
                <h2 className="text-2xl font-bold text-accent-green font-heading">DISCIPLINED BTC TRADING</h2>
              </div>
              <p className="text-text-primary leading-relaxed text-lg mb-4">
                Today, I'm not trying to get rich overnight. I'm trying to build wealth steadily through disciplined BTC trading.
              </p>
              <p className="text-text-primary leading-relaxed text-lg mb-4">
                I trade with a system, not emotions. I take profits when I should, cut losses when I must, and never risk more than I can afford to lose. Most importantly, I sleep at night.
              </p>
              <div className="bg-tertiary-bg border-l-4 border-accent-green p-4 rounded my-6">
                <p className="text-accent-green font-bold text-lg">
                  "I'm not a trading genius. I'm just someone who refused to quit, learned from mistakes, and developed the discipline to win consistently."
                </p>
              </div>
            </section>

          </div>

          {/* Call to Action */}
          <div className="bg-secondary-bg border border-border-color rounded-lg p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-green rounded-full mb-4">
                <i className="fas fa-rocket text-black text-2xl"></i>
              </div>
              <h3 className="text-3xl font-bold text-accent-green font-heading mb-4">
                IF THIS JOURNEY RESONATES WITH YOU
              </h3>
              <p className="text-text-primary text-lg mb-6 max-w-2xl mx-auto">
                If you want to follow a disciplined BTC trader who's been through the fire and come out stronger, 
                copy me on Blofin. No shortcuts, no guarantees - just consistent, risk-managed trading.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => window.open('https://blofin.com/en/copy-trade/details/1908447789?module=futures', '_blank')}
                  className="bg-accent-green text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-colors"
                >
                  <i className="fas fa-external-link-alt mr-2"></i>
                  START COPYING ON BLOFIN
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => window.open('https://t.me/yourchannel', '_blank')}
                    className="bg-tertiary-bg border border-border-color px-6 py-3 rounded-lg font-bold hover:bg-opacity-80 transition-colors"
                  >
                    <i className="fab fa-telegram mr-2"></i>
                    TELEGRAM
                  </button>
                  <button
                    onClick={() => window.open('https://discord.gg/yourserver', '_blank')}
                    className="bg-tertiary-bg border border-border-color px-6 py-3 rounded-lg font-bold hover:bg-opacity-80 transition-colors"
                  >
                    <i className="fab fa-discord mr-2"></i>
                    DISCORD
                  </button>
                </div>
              </div>
            </div>
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

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
