import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface Update {
  id: number;
  type: 'daily' | 'weekly' | 'alert';
  title: string;
  content: string;
  timestamp: Date;
  published: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
  status: 'online' | 'offline';
  tradesCopied: number;
  lastActive: Date;
  joinDate: Date;
}

interface Activity {
  id: number;
  type: 'user_join' | 'trade_copied' | 'update_published' | 'profit_taken' | 'system_sync';
  message: string;
  timestamp: Date;
  icon: string;
}

export function AdminPage() {
  const { user, isAdmin } = useAuth();
  const [updates, setUpdates] = useState<Update[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (!isAdmin()) {
      window.location.href = '/login';
      return;
    }
    loadData();
    const interval = setInterval(loadData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadData = () => {
    // Mock data
    const mockUpdates: Update[] = [
      {
        id: 1,
        type: 'daily',
        title: 'Daily BTC Scoop',
        content: 'Bulls charging? Watch for $65k breakout level. Volume increasing steadily.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        published: true,
      },
      {
        id: 2,
        type: 'weekly',
        title: 'Weekly Swing Setup',
        content: 'Holding Long positions, DCA ready if dip to $63k. Target 5-7% gains this week.',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        published: true,
      },
    ];

    const mockUsers: User[] = [
      {
        id: 1,
        name: 'CryptoTrader92',
        email: 'trader92@example.com',
        status: 'online',
        tradesCopied: 47,
        lastActive: new Date(Date.now() - 30 * 60 * 1000),
        joinDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
      {
        id: 2,
        name: 'BTCWhale',
        email: 'whale@example.com',
        status: 'offline',
        tradesCopied: 23,
        lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
        joinDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      },
    ];

    const mockActivities: Activity[] = [
      {
        id: 1,
        type: 'user_join',
        message: 'New user CryptoTrader92 joined',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        icon: '👤',
      },
      {
        id: 2,
        type: 'trade_copied',
        message: '47 users copied BTC Long trade',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        icon: '📋',
      },
      {
        id: 3,
        type: 'update_published',
        message: 'Daily market update published',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        icon: '📰',
      },
    ];

    setUpdates(mockUpdates);
    setUsers(mockUsers);
    setActivities(mockActivities);
    setLoading(false);
  };

  const handlePublishUpdate = (id: number) => {
    setUpdates(updates.map(update => 
      update.id === id ? { ...update, published: !update.published } : update
    ));
  };

  const handleDeleteUpdate = (id: number) => {
    setUpdates(updates.filter(update => update.id !== id));
  };

  const getUpdateTypeColor = (type: string) => {
    switch (type) {
      case 'daily': return 'text-accent-blue';
      case 'weekly': return 'text-accent-green';
      case 'alert': return 'text-accent-red';
      default: return 'text-text-secondary';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-quaternary to-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-accent-green font-heading">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-quaternary to-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-accent-red mb-4">Access Denied</h1>
          <p className="text-text-secondary mb-8">You don't have permission to access this page.</p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-accent-green text-black rounded-lg font-bold hover:shadow-glow-green transition-all duration-300"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-quaternary to-primary text-text-primary pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-heading bg-gradient-to-r from-accent-green to-accent-blue bg-clip-text text-transparent mb-2">
            Admin Panel
          </h1>
          <p className="text-text-secondary">
            Welcome back, <span className="text-accent-green font-bold">{user?.email}</span>
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-border-color">
          {['dashboard', 'updates', 'users', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'text-accent-green border-b-2 border-accent-green'
                  : 'text-text-secondary hover:text-accent-green'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-card border border-border-color rounded-xl p-6 hover:shadow-card-hover transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-text-secondary text-sm">Total Users</span>
                  <div className="w-8 h-8 bg-accent-green rounded-lg flex items-center justify-center">
                    <span className="text-black text-sm">👥</span>
                  </div>
                </div>
                <p className="text-3xl font-bold text-accent-green">{users.length}</p>
                <p className="text-xs text-text-muted mt-2">Registered users</p>
              </div>

              <div className="bg-gradient-card border border-border-color rounded-xl p-6 hover:shadow-card-hover transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-text-secondary text-sm">Online Now</span>
                  <div className="w-8 h-8 bg-accent-blue rounded-lg flex items-center justify-center">
                    <span className="text-black text-sm">🟢</span>
                  </div>
                </div>
                <p className="text-3xl font-bold text-accent-blue">{users.filter(u => u.status === 'online').length}</p>
                <p className="text-xs text-text-muted mt-2">Active users</p>
              </div>

              <div className="bg-gradient-card border border-border-color rounded-xl p-6 hover:shadow-card-hover transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-text-secondary text-sm">Total Trades</span>
                  <div className="w-8 h-8 bg-accent-purple rounded-lg flex items-center justify-center">
                    <span className="text-black text-sm">📊</span>
                  </div>
                </div>
                <p className="text-3xl font-bold text-accent-purple">{users.reduce((sum, u) => sum + u.tradesCopied, 0)}</p>
                <p className="text-xs text-text-muted mt-2">Copied trades</p>
              </div>

              <div className="bg-gradient-card border border-border-color rounded-xl p-6 hover:shadow-card-hover transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-text-secondary text-sm">Updates</span>
                  <div className="w-8 h-8 bg-accent-green rounded-lg flex items-center justify-center">
                    <span className="text-black text-sm">📰</span>
                  </div>
                </div>
                <p className="text-3xl font-bold text-accent-green">{updates.length}</p>
                <p className="text-xs text-text-muted mt-2">Market updates</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gradient-card border border-border-color rounded-xl p-6">
              <h3 className="text-xl font-bold text-accent-green font-heading mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-tertiary rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-accent-green rounded-full flex items-center justify-center">
                        <span className="text-black">{activity.icon}</span>
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{activity.message}</p>
                        <p className="text-sm text-text-muted">{activity.timestamp.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Updates Management */}
        {activeTab === 'updates' && (
          <div className="bg-gradient-card border border-border-color rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-accent-green font-heading">
                Market Updates
              </h2>
              <button className="px-4 py-2 bg-accent-green text-black rounded-lg font-bold hover:shadow-glow-green transition-all duration-300">
                <span className="flex items-center space-x-2">
                  <span>➕</span>
                  <span>New Update</span>
                </span>
              </button>
            </div>

            <div className="space-y-4">
              {updates.map((update) => (
                <div key={update.id} className="bg-tertiary rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`capitalize ${getUpdateTypeColor(update.type)}`}>
                          {update.type}
                        </span>
                        <h3 className="font-bold text-accent-green">{update.title}</h3>
                        <span className="text-sm text-text-secondary">
                          {update.timestamp.toLocaleString()}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded ${
                          update.published 
                            ? 'bg-accent-green text-black' 
                            : 'bg-tertiary border border-border-color text-text-secondary'
                        }`}>
                          {update.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <p className="text-text-secondary">{update.content}</p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handlePublishUpdate(update.id)}
                        className="px-3 py-1 bg-tertiary border border-border-color rounded text-sm hover:bg-quaternary transition-colors"
                      >
                        {update.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        onClick={() => handleDeleteUpdate(update.id)}
                        className="px-3 py-1 bg-tertiary border border-border-color rounded text-sm text-accent-red hover:bg-quaternary transition-colors"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Management */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-card border border-border-color rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-accent-green mb-2">
                  {users.length}
                </div>
                <div className="text-text-secondary">Total Users</div>
              </div>
              <div className="bg-gradient-card border border-border-color rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-accent-green mb-2">
                  {users.filter(u => u.status === 'online').length}
                </div>
                <div className="text-text-secondary">Online Now</div>
              </div>
              <div className="bg-gradient-card border border-border-color rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-accent-green mb-2">
                  {users.reduce((sum, u) => sum + u.tradesCopied, 0)}
                </div>
                <div className="text-text-secondary">Total Trades Copied</div>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-gradient-card border border-border-color rounded-xl p-6">
              <h3 className="text-xl font-bold text-accent-green font-heading mb-4">User Management</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border-color">
                      <th className="text-left py-3 px-4 text-text-secondary">User</th>
                      <th className="text-left py-3 px-4 text-text-secondary">Status</th>
                      <th className="text-left py-3 px-4 text-text-secondary">Trades Copied</th>
                      <th className="text-left py-3 px-4 text-text-secondary">Last Active</th>
                      <th className="text-left py-3 px-4 text-text-secondary">Join Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-border-color">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-semibold">{user.name}</div>
                            <div className="text-text-secondary text-xs">{user.email}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs rounded ${
                            user.status === 'online' 
                              ? 'bg-accent-green text-black' 
                              : 'bg-tertiary border border-border-color text-text-secondary'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">{user.tradesCopied}</td>
                        <td className="py-3 px-4 text-text-muted">{user.lastActive.toLocaleString()}</td>
                        <td className="py-3 px-4 text-text-muted">{user.joinDate.toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="bg-gradient-card border border-border-color rounded-xl p-6">
            <h3 className="text-xl font-bold text-accent-green font-heading mb-4">Analytics & Activity</h3>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="bg-tertiary rounded-lg p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-accent-green rounded-full flex items-center justify-center">
                      <span className="text-black">{activity.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-text-secondary">{activity.message}</p>
                      <p className="text-xs text-text-muted mt-1">
                        {activity.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
