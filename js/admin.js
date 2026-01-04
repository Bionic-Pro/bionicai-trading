// Admin Panel JavaScript
class AdminPanel {
    constructor() {
        this.updates = this.loadMockUpdates();
        this.users = this.loadMockUsers();
        this.activities = this.loadMockActivities();
        this.init();
    }

    init() {
        this.renderUpdates();
        this.renderUsers();
        this.renderActivities();
        this.setupEventListeners();
        this.startRealTimeUpdates();
    }

    loadMockUpdates() {
        return [
            {
                id: 1,
                type: 'daily',
                title: 'Daily BTC Scoop',
                content: 'Bulls charging? Watch for $65k breakout level. Volume increasing steadily.',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
                published: true
            },
            {
                id: 2,
                type: 'weekly',
                title: 'Weekly Swing Setup',
                content: 'Holding Long positions, DCA ready if dip to $63k. Target 5-7% gains this week.',
                timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                published: true
            },
            {
                id: 3,
                type: 'alert',
                title: 'Market Alert: Volatility Spike',
                content: 'Unusual volatility detected. Reduced position size temporarily.',
                timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                published: true
            }
        ];
    }

    loadMockUsers() {
        const names = ['CryptoTrader', 'BTCWhale', 'SwingKing', 'RiskManager', 'ProfitHunter', 'DCA Master', 'LeverageLord', 'TrendFollower'];
        return names.map((name, index) => ({
            id: index + 1,
            name: name,
            status: Math.random() > 0.3 ? 'online' : 'offline',
            tradesCopied: Math.floor(Math.random() * 50) + 10,
            lastActive: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
            joinDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000)
        }));
    }

    loadMockActivities() {
        return [
            {
                id: 1,
                type: 'user_join',
                message: 'New user CryptoTrader joined',
                timestamp: new Date(Date.now() - 30 * 60 * 1000),
                icon: 'fa-user-plus'
            },
            {
                id: 2,
                type: 'trade_copied',
                message: '47 users copied BTC Long trade',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
                icon: 'fa-copy'
            },
            {
                id: 3,
                type: 'update_published',
                message: 'Daily market update published',
                timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
                icon: 'fa-newspaper'
            },
            {
                id: 4,
                type: 'profit_taken',
                message: 'Swing Long closed at +6.2% profit',
                timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
                icon: 'fa-chart-line'
            },
            {
                id: 5,
                type: 'system_sync',
                message: 'System sync completed successfully',
                timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
                icon: 'fa-sync'
            }
        ];
    }

    renderUpdates() {
        const updateList = document.getElementById('updateList');
        if (!updateList) return;

        updateList.innerHTML = '';

        this.updates.forEach(update => {
            const updateItem = document.createElement('div');
            updateItem.className = 'update-item';
            
            updateItem.innerHTML = `
                <div class="update-content">
                    <div class="update-title">${update.title}</div>
                    <div class="update-meta">
                        <span class="update-type ${update.type}">${update.type.toUpperCase()}</span>
                        <span>${this.formatTime(update.timestamp)}</span>
                    </div>
                </div>
                <div class="update-actions">
                    <button class="btn-icon" onclick="editUpdate(${update.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon delete" onclick="deleteUpdate(${update.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            updateList.appendChild(updateItem);
        });
    }

    renderUsers() {
        const userList = document.getElementById('userList');
        if (!userList) return;

        userList.innerHTML = '';

        // Show only active users
        const activeUsers = this.users.filter(user => user.status === 'online').slice(0, 5);

        activeUsers.forEach(user => {
            const userItem = document.createElement('div');
            userItem.className = 'user-item';
            
            userItem.innerHTML = `
                <div class="user-info">
                    <div class="user-avatar">${user.name.charAt(0)}</div>
                    <div class="user-details">
                        <div class="user-name">${user.name}</div>
                        <div class="user-status">Active ${this.getTimeAgo(user.lastActive)}</div>
                    </div>
                </div>
                <div class="user-stats">
                    <i class="fas fa-copy"></i> ${user.tradesCopied}
                </div>
            `;
            
            userList.appendChild(userItem);
        });
    }

    renderActivities() {
        const activityLog = document.getElementById('activityLog');
        if (!activityLog) return;

        activityLog.innerHTML = '';

        this.activities.forEach(activity => {
            const logItem = document.createElement('div');
            logItem.className = 'log-item';
            
            logItem.innerHTML = `
                <div class="log-icon">
                    <i class="fas ${activity.icon}"></i>
                </div>
                <div class="log-content">
                    <div class="log-message">${activity.message}</div>
                    <div class="log-time">${this.formatTime(activity.timestamp)}</div>
                </div>
            `;
            
            activityLog.appendChild(logItem);
        });
    }

    setupEventListeners() {
        // Update form submission
        const updateForm = document.getElementById('updateForm');
        if (updateForm) {
            updateForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.publishUpdate();
            });
        }

        // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                const navMenu = document.querySelector('.nav-menu');
                navMenu.classList.toggle('active');
            });
        }
    }

    publishUpdate() {
        const type = document.getElementById('updateType').value;
        const title = document.getElementById('updateTitle').value.trim();
        const content = document.getElementById('updateContent').value.trim();

        if (!title || !content) {
            this.showToast('Please fill in all fields', 'error');
            return;
        }

        const newUpdate = {
            id: Date.now(),
            type: type,
            title: title,
            content: content,
            timestamp: new Date(),
            published: true
        };

        this.updates.unshift(newUpdate);
        this.renderUpdates();
        
        // Add activity log
        this.addActivity('update_published', `${type} update "${title}" published`);
        
        // Clear form
        clearUpdateForm();
        
        // Show success message
        this.showToast('Update published successfully!', 'success');
        
        // Save to localStorage
        this.saveToLocalStorage();
    }

    deleteUpdate(id) {
        if (!confirm('Are you sure you want to delete this update?')) {
            return;
        }

        this.updates = this.updates.filter(update => update.id !== id);
        this.renderUpdates();
        
        this.addActivity('update_deleted', 'Market update deleted');
        this.showToast('Update deleted', 'info');
        
        this.saveToLocalStorage();
    }

    editUpdate(id) {
        const update = this.updates.find(u => u.id === id);
        if (!update) return;

        // Populate form with update data
        document.getElementById('updateType').value = update.type;
        document.getElementById('updateTitle').value = update.title;
        document.getElementById('updateContent').value = update.content;

        // Delete the old update (will be replaced with new one)
        this.deleteUpdate(id);

        // Scroll to form
        document.getElementById('updateForm').scrollIntoView({ behavior: 'smooth' });
    }

    addActivity(type, message) {
        const icons = {
            'user_join': 'fa-user-plus',
            'trade_copied': 'fa-copy',
            'update_published': 'fa-newspaper',
            'update_deleted': 'fa-trash',
            'profit_taken': 'fa-chart-line',
            'system_sync': 'fa-sync'
        };

        const newActivity = {
            id: Date.now(),
            type: type,
            message: message,
            timestamp: new Date(),
            icon: icons[type] || 'fa-info-circle'
        };

        this.activities.unshift(newActivity);
        
        // Keep only last 20 activities
        this.activities = this.activities.slice(0, 20);
        
        this.renderActivities();
    }

    startRealTimeUpdates() {
        // Update user stats every 30 seconds
        setInterval(() => {
            this.updateUserStats();
        }, 30000);

        // Add random activities every 2 minutes
        setInterval(() => {
            this.addRandomActivity();
        }, 120000);

        // Update system status
        setInterval(() => {
            this.updateSystemStatus();
        }, 60000);
    }

    updateUserStats() {
        // Simulate user count changes
        const totalUsers = document.getElementById('totalUsers');
        const activeUsers = document.getElementById('activeUsers');
        const newUsers = document.getElementById('newUsers');
        const totalCopied = document.getElementById('totalCopied');

        if (totalUsers) {
            const current = parseInt(totalUsers.textContent);
            const change = Math.random() > 0.7 ? 1 : 0;
            totalUsers.textContent = current + change;
        }

        if (activeUsers) {
            const current = parseInt(activeUsers.textContent);
            const change = Math.floor(Math.random() * 10) - 5;
            activeUsers.textContent = Math.max(150, current + change);
        }
    }

    addRandomActivity() {
        const activities = [
            { type: 'trade_copied', message: `${Math.floor(Math.random() * 50) + 10} users copied BTC trade` },
            { type: 'user_join', message: 'New user joined the platform' },
            { type: 'profit_taken', message: `Trade closed at +${(Math.random() * 10 + 2).toFixed(1)}% profit` },
            { type: 'system_sync', message: 'System sync completed' }
        ];

        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        this.addActivity(randomActivity.type, randomActivity.message);
    }

    updateSystemStatus() {
        // Update last sync time
        const statusElements = document.querySelectorAll('.admin-status span:last-child');
        statusElements.forEach(element => {
            element.textContent = 'Last sync: Just now';
        });
    }

    formatTime(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);

        if (diffDays > 0) {
            return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        } else if (diffHours > 0) {
            return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        } else {
            const diffMinutes = Math.floor(diffMs / (1000 * 60));
            return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
        }
    }

    getTimeAgo(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffMinutes = Math.floor(diffMs / (1000 * 60));

        if (diffMinutes < 60) {
            return `${diffMinutes}m ago`;
        } else if (diffMinutes < 1440) {
            const hours = Math.floor(diffMinutes / 60);
            return `${hours}h ago`;
        } else {
            const days = Math.floor(diffMinutes / 1440);
            return `${days}d ago`;
        }
    }

    saveToLocalStorage() {
        localStorage.setItem('bionicai_admin_updates', JSON.stringify(this.updates));
        localStorage.setItem('bionicai_admin_activities', JSON.stringify(this.activities));
    }

    loadFromLocalStorage() {
        const savedUpdates = localStorage.getItem('bionicai_admin_updates');
        const savedActivities = localStorage.getItem('bionicai_admin_activities');

        if (savedUpdates) {
            try {
                this.updates = JSON.parse(savedUpdates);
            } catch (error) {
                console.error('Error loading saved updates:', error);
            }
        }

        if (savedActivities) {
            try {
                this.activities = JSON.parse(savedActivities);
            } catch (error) {
                console.error('Error loading saved activities:', error);
            }
        }
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: ${type === 'success' ? '#00ff00' : type === 'error' ? '#ff0000' : '#00aaff'};
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
    }
}

// Global functions for HTML onclick handlers
function clearUpdateForm() {
    document.getElementById('updateForm').reset();
}

function editUpdate(id) {
    window.adminPanel.editUpdate(id);
}

function deleteUpdate(id) {
    window.adminPanel.deleteUpdate(id);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.adminPanel = new AdminPanel();
    window.adminPanel.loadFromLocalStorage();
});
