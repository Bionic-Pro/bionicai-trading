interface DisclaimerPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
}

export function DisclaimerPopup({ isOpen, onClose, onAccept }: DisclaimerPopupProps) {
  // Temporarily disable localStorage check for testing
  // const [hasSeenDisclaimer, setHasSeenDisclaimer] = useState(false);

  // useEffect(() => {
  //   const seen = localStorage.getItem('disclaimer_seen');
  //   if (seen) {
  //     setHasSeenDisclaimer(true);
  //   }
  // }, []);

  const handleAccept = () => {
    localStorage.setItem('disclaimer_seen', 'true');
    // setHasSeenDisclaimer(true);
    if (onAccept) {
      onAccept();
    } else {
      onClose();
    }
  };

  const handleDecline = () => {
    // Redirect away or close window
    window.location.href = 'https://www.google.com';
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-secondary-bg border-2 border-accent-red rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-accent-red text-black p-6 text-center">
          <h2 className="text-3xl font-bold font-heading mb-2">
            ⚠️ IMPORTANT DISCLAIMER
          </h2>
          <p className="text-lg font-semibold">
            READ CAREFULLY BEFORE PROCEEDING
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Main Disclaimer */}
          <div className="bg-tertiary-bg border-l-4 border-accent-red p-4 rounded">
            <h3 className="text-xl font-bold text-accent-red mb-3 font-heading">
              NOT FINANCIAL ADVICE
            </h3>
            <p className="text-text-secondary text-lg leading-relaxed">
              <span className="font-semibold text-accent-red">Trading involves high risk of loss.</span> 
              Past performance does not guarantee future results. Trade at your own risk.
            </p>
          </div>

          {/* Risk Management */}
          <div className="bg-tertiary-bg border-l-4 border-accent-yellow p-4 rounded">
            <h3 className="text-xl font-bold text-accent-yellow mb-3 font-heading">
              🛡️ RISK MANAGEMENT RULES
            </h3>
            <div className="space-y-3 text-text-secondary">
              <div className="flex items-start space-x-2">
                <span className="text-accent-red font-bold text-xl">1.</span>
                <p className="text-lg">
                  <span className="font-bold text-accent-red">NEVER COPY WITH FULL AMOUNT!</span>
                  Recommended max 50% of your capital.
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-accent-blue font-bold text-xl">2.</span>
                <p className="text-lg">
                  Leave the other 50% to add since we use <span className="font-bold text-accent-green">Smart DCA</span>
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-accent-green font-bold text-xl">3.</span>
                <p className="text-lg">
                  You can take profit along if pleased with your profit or leave it until I close
                </p>
              </div>
            </div>
          </div>

          {/* Capital Requirements */}
          <div className="bg-tertiary-bg border-l-4 border-accent-green p-4 rounded">
            <h3 className="text-xl font-bold text-accent-green mb-3 font-heading">
              💰 RECOMMENDED CAPITAL
            </h3>
            <div className="space-y-2 text-text-secondary">
              <p className="text-lg">
                <span className="font-bold text-accent-green">Recommended to copy with at least 1000 USDT</span>
              </p>
              <p className="text-lg">
                Have another 1000 USDT ready to double your position when needed
              </p>
              <p className="text-lg">
                <span className="font-bold text-accent-yellow">OR</span> just set at 50% if you don't have the other half at your disposal
              </p>
            </div>
          </div>

          {/* Warning Box */}
          <div className="bg-red-900 bg-opacity-20 border-2 border-accent-red p-4 rounded">
            <div className="flex items-center space-x-3">
              <span className="text-4xl">⚠️</span>
              <div>
                <h4 className="text-xl font-bold text-accent-red font-heading">
                  CRITICAL WARNING
                </h4>
                <p className="text-text-secondary">
                  Cryptocurrency trading can result in the loss of your entire investment. 
                  Only invest what you can afford to lose.
                </p>
              </div>
            </div>
          </div>

          {/* Agreement */}
          <div className="bg-tertiary-bg p-4 rounded">
            <p className="text-text-secondary text-center">
              By clicking "I UNDERSTAND AND ACCEPT", you acknowledge that you have read, 
              understood, and agree to be bound by this disclaimer and risk management rules.
              You will remain on this site to explore more features.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-border-color p-6 space-y-3">
          <button
            onClick={handleAccept}
            className="w-full btn-primary text-lg font-bold py-4"
          >
            I UNDERSTAND AND ACCEPT - CONTINUE ON SITE
          </button>
          <button
            onClick={handleDecline}
            className="w-full btn-secondary text-lg font-bold py-4"
          >
            I DO NOT ACCEPT - LEAVE
          </button>
        </div>
      </div>
    </div>
  );
}
