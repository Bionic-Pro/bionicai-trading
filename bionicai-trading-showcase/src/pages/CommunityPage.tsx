import { useState } from 'react';

export function CommunityPage() {
  const [activeTab, setActiveTab] = useState('join');

  const communityLinks = {
    telegram: 'https://t.me/bionicai-trading',
    discord: 'https://discord.gg/bionicai',
    twitter: 'https://twitter.com/bionicai_trading',
  };

  const testimonials = [
    {
      name: 'CryptoTrader92',
      message: 'Been copying for 3 months, already up 45%! The strategy is solid.',
      profit: '+45%',
      duration: '3 months',
    },
    {
      name: 'BTCWhale',
      message: 'Risk management is on point. Never felt more confident in my trading.',
      profit: '+28%',
      duration: '2 months',
    },
    {
      name: 'SwingKing',
      message: 'The DCA strategy saved me during the dip. Great community support too!',
      profit: '+67%',
      duration: '4 months',
    },
  ];

  const faqs = [
    {
      question: 'How much BTC do I need to start?',
      answer: 'Minimum 0.2 BTC per position with x10 leverage (2 BTC total margin recommended).',
    },
    {
      question: 'Can I customize the copy settings?',
      answer: 'Yes, you can adjust position size, leverage, and profit targets when setting up copy trading.',
    },
    {
      question: 'What happens during market volatility?',
      answer: 'We reduce position size and use tighter stops. Sometimes we pause copying temporarily.',
    },
    {
      question: 'How often are trades executed?',
      answer: 'We focus on quality over quantity. Typically 1-3 swing trades per week.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold font-heading mb-8 text-accent-green">
        Join Our Community
      </h1>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-8 border-b border-border-color">
        {['join', 'testimonials', 'faq'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-semibold capitalize transition-colors ${
              activeTab === tab
                ? 'text-accent-green border-b-2 border-accent-green'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab === 'faq' ? 'FAQ' : tab}
          </button>
        ))}
      </div>

      {/* Join Community */}
      {activeTab === 'join' && (
        <div>
          <div className="card mb-8">
            <h2 className="text-2xl font-bold font-heading mb-6 text-accent-green">
              Connect With Us
            </h2>
            <p className="text-text-secondary mb-8">
              Join our thriving community of traders. Get real-time updates, ask questions, and share your success stories.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-tertiary-bg rounded-lg hover:border-accent-blue transition-colors cursor-pointer">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="font-bold mb-2 text-accent-blue">Telegram</h3>
                <p className="text-text-secondary text-sm mb-4">
                  Real-time trade alerts and community chat
                </p>
                <button 
                  onClick={() => window.open(communityLinks.telegram, '_blank')}
                  className="btn-secondary w-full"
                >
                  <i className="fab fa-telegram mr-2"></i>
                  Join Telegram
                </button>
              </div>

              <div className="text-center p-6 bg-tertiary-bg rounded-lg hover:border-accent-blue transition-colors cursor-pointer">
                <div className="text-4xl mb-4">🎮</div>
                <h3 className="font-bold mb-2 text-accent-blue">Discord</h3>
                <p className="text-text-secondary text-sm mb-4">
                  Voice chat, analysis, and strategy discussions
                </p>
                <button 
                  onClick={() => window.open(communityLinks.discord, '_blank')}
                  className="btn-secondary w-full"
                >
                  <i className="fab fa-discord mr-2"></i>
                  Join Discord
                </button>
              </div>

              <div className="text-center p-6 bg-tertiary-bg rounded-lg hover:border-accent-blue transition-colors cursor-pointer">
                <div className="text-4xl mb-4">🐦</div>
                <h3 className="font-bold mb-2 text-accent-blue">Twitter</h3>
                <p className="text-text-secondary text-sm mb-4">
                  Market updates and performance highlights
                </p>
                <button 
                  onClick={() => window.open(communityLinks.twitter, '_blank')}
                  className="btn-secondary w-full"
                >
                  <i className="fab fa-twitter mr-2"></i>
                  Follow Twitter
                </button>
              </div>
            </div>
          </div>

          {/* Community Stats */}
          <div className="card">
            <h2 className="text-2xl font-bold font-heading mb-6 text-accent-green">
              Community Stats
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-green mb-2">1,247</div>
                <div className="text-text-secondary">Active Traders</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-green mb-2">89%</div>
                <div className="text-text-secondary">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-green mb-2">24/7</div>
                <div className="text-text-secondary">Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-green mb-2">150+</div>
                <div className="text-text-secondary">Countries</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials */}
      {activeTab === 'testimonials' && (
        <div>
          <div className="card">
            <h2 className="text-2xl font-bold font-heading mb-6 text-accent-green">
              Success Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="p-6 bg-tertiary-bg rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-accent-green rounded-full flex items-center justify-center text-black font-bold mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold">{testimonial.name}</h3>
                      <p className="text-text-secondary text-sm">{testimonial.duration}</p>
                    </div>
                  </div>
                  <p className="text-text-secondary mb-4 italic">
                    "{testimonial.message}"
                  </p>
                  <div className="text-accent-green font-bold text-lg">
                    {testimonial.profit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FAQ */}
      {activeTab === 'faq' && (
        <div>
          <div className="card">
            <h2 className="text-2xl font-bold font-heading mb-6 text-accent-green">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 bg-tertiary-bg rounded-lg">
                  <h3 className="font-bold mb-2 text-accent-blue">{faq.question}</h3>
                  <p className="text-text-secondary">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="card mt-8">
            <h2 className="text-2xl font-bold font-heading mb-6 text-accent-green">
              Need More Help?
            </h2>
            <p className="text-text-secondary mb-6">
              Our support team is here to help you succeed. Reach out through any of our community channels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => window.open(communityLinks.telegram, '_blank')}
                className="btn-primary"
              >
                <i className="fab fa-telegram mr-2"></i>
                Contact Support
              </button>
              <button 
                onClick={() => window.open('mailto:support@bionicai-trading.com', '_blank')}
                className="btn-secondary"
              >
                <i className="fas fa-envelope mr-2"></i>
                Email Support
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
