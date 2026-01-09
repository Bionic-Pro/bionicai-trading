import { useState, useEffect } from 'react';

interface Update {
  id: number;
  type: 'daily' | 'weekly' | 'alert';
  title: string;
  content: string;
  timestamp: Date;
  published: boolean;
}

interface Comment {
  id: number;
  updateId: number;
  author: string;
  content: string;
  timestamp: Date;
}

export function UpdatesPage() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    loadUpdates();
    loadComments();
  }, []);

  const loadUpdates = () => {
    // Mock updates data
    const mockUpdates: Update[] = [
      {
        id: 1,
        type: 'daily',
        title: 'Daily BTC Scoop',
        content: 'Bulls charging? Watch for $65k breakout level. Volume increasing steadily. Market sentiment shifting bullish.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        published: true,
      },
      {
        id: 2,
        type: 'weekly',
        title: 'Weekly Swing Setup',
        content: 'Holding Long positions, DCA ready if dip to $63k. Target 5-7% gains this week. Risk management tightened.',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        published: true,
      },
      {
        id: 3,
        type: 'alert',
        title: 'Market Alert: Volatility Spike',
        content: 'Unusual volatility detected. Reduced position size temporarily. Wait for confirmation before new entries.',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        published: true,
      },
      {
        id: 4,
        type: 'daily',
        title: 'Technical Analysis Update',
        content: 'BTC forming ascending triangle pattern. RSI showing bullish divergence on 4H timeframe. Key resistance at $68,500.',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        published: true,
      },
    ];
    
    setUpdates(mockUpdates);
    setLoading(false);
  };

  const loadComments = () => {
    // Mock comments data
    const mockComments: Comment[] = [
      {
        id: 1,
        updateId: 1,
        author: 'CryptoTrader92',
        content: 'Great analysis! Already positioned for the breakout.',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      },
      {
        id: 2,
        updateId: 1,
        author: 'BTCWhale',
        content: 'Do you think we\'ll see a retest of $62k first?',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
      },
      {
        id: 3,
        updateId: 2,
        author: 'SwingKing',
        content: 'Weekly targets look solid. Thanks for the detailed analysis!',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    ];
    
    setComments(mockComments);
  };

  const handleCommentSubmit = (updateId: number) => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      updateId,
      author: 'CurrentUser',
      content: newComment,
      timestamp: new Date(),
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  const getUpdateTypeColor = (type: string) => {
    switch (type) {
      case 'daily': return 'text-accent-blue';
      case 'weekly': return 'text-accent-green';
      case 'alert': return 'text-accent-red';
      default: return 'text-text-secondary';
    }
  };

  const getUpdateTypeIcon = (type: string) => {
    switch (type) {
      case 'daily': return 'fa-calendar-day';
      case 'weekly': return 'fa-calendar-week';
      case 'alert': return 'fa-exclamation-triangle';
      default: return 'fa-info-circle';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            <div className="h-32 bg-gray-800 rounded-xl"></div>
            <div className="h-32 bg-gray-800 rounded-xl"></div>
            <div className="h-32 bg-gray-800 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold font-heading mb-8 text-accent-green">
        Market Updates
      </h1>

      {/* Updates List */}
      <div className="space-y-6">
        {updates.map((update) => (
          <div key={update.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <i className={`fas ${getUpdateTypeIcon(update.type)} ${getUpdateTypeColor(update.type)}`}></i>
                <div>
                  <h3 className="text-xl font-bold text-accent-green">{update.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <span className={`capitalize ${getUpdateTypeColor(update.type)}`}>
                      {update.type}
                    </span>
                    <span>•</span>
                    <span>{update.timestamp.toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{update.timestamp.toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-text-secondary mb-6 leading-relaxed">
              {update.content}
            </p>

            {/* Comments Section */}
            <div className="border-t border-border-color pt-4">
              <h4 className="font-bold mb-4 text-accent-blue">
                Comments ({comments.filter(c => c.updateId === update.id).length})
              </h4>

              {/* Add Comment */}
              <div className="mb-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 px-3 py-2 bg-tertiary-bg border border-border-color rounded-lg focus:outline-none focus:border-accent-green"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleCommentSubmit(update.id);
                      }
                    }}
                  />
                  <button
                    onClick={() => handleCommentSubmit(update.id)}
                    className="btn-secondary"
                  >
                    Post
                  </button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-3">
                {comments
                  .filter(comment => comment.updateId === update.id)
                  .map((comment) => (
                    <div key={comment.id} className="p-3 bg-tertiary-bg rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-accent-blue">{comment.author}</span>
                        <span className="text-xs text-text-secondary">
                          {comment.timestamp.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-text-secondary text-sm">{comment.content}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Notification Settings */}
      <div className="card mt-8">
        <h2 className="text-2xl font-bold font-heading mb-4 text-accent-green">
          Notification Settings
        </h2>
        <p className="text-text-secondary mb-6">
          Get notified when new market updates are published
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="btn-secondary">
            <i className="fas fa-bell mr-2"></i>
            Enable Browser Notifications
          </button>
          <button className="btn-secondary">
            <i className="fas fa-envelope mr-2"></i>
            Email Updates
          </button>
          <button className="btn-secondary">
            <i className="fab fa-telegram mr-2"></i>
            Telegram Alerts
          </button>
        </div>
      </div>
    </div>
  );
}
