/**
 * Dashboard Page
 * Main dashboard showing live match summary, queue, and top performers
 */
const DashboardPage = (() => {
    return {
        /**
         * Render dashboard
         */
        render: () => {
            return `
                <div class="dashboard-container">
                    <header class="dashboard-header">
                        <div class="container">
                            <h1>Crikify Dashboard</h1>
                            <p class="text-muted">Your cricket stats and match scoring hub</p>
                        </div>
                    </header>
                    
                    <main class="dashboard-main">
                        <div class="container">
                            <!-- Live Match Section -->
                            <section class="dashboard-section">
                                <h2>Live Matches</h2>
                                <div id="live-matches" class="grid grid-cols-1">
                                    <div class="card">
                                        <p class="text-muted text-center">No live matches</p>
                                    </div>
                                </div>
                            </section>
                            
                            <!-- Match Queue -->
                            <section class="dashboard-section">
                                <h2>Upcoming Matches</h2>
                                <div id="match-queue" class="grid grid-cols-1">
                                    <div class="card">
                                        <p class="text-muted text-center">No upcoming matches</p>
                                    </div>
                                </div>
                            </section>
                            
                            <!-- Top Performers -->
                            <section class="dashboard-section">
                                <h2>Top Performers</h2>
                                <div id="top-performers" class="grid grid-cols-3">
                                    <div class="card">
                                        <h4>Batsmen</h4>
                                        <div id="top-batsmen">
                                            <p class="text-muted">No data yet</p>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <h4>Bowlers</h4>
                                        <div id="top-bowlers">
                                            <p class="text-muted">No data yet</p>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <h4>Fielders</h4>
                                        <div id="top-fielders">
                                            <p class="text-muted">No data yet</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            
                            <!-- Quick Actions -->
                            <section class="dashboard-section">
                                <h2>Quick Actions</h2>
                                <div class="grid grid-cols-2">
                                    <button class="btn btn-primary btn-large" onclick="navigateTo('match-setup')">
                                        <span>+ New Match</span>
                                    </button>
                                    <button class="btn btn-secondary btn-large" onclick="navigateTo('teams')">
                                        <span>Manage Teams</span>
                                    </button>
                                    <button class="btn btn-accent btn-large" onclick="navigateTo('tournament')">
                                        <span>Tournament Center</span>
                                    </button>
                                    <button class="btn btn-outline btn-large" onclick="navigateTo('analytics')">
                                        <span>Analytics</span>
                                    </button>
                                </div>
                            </section>
                        </div>
                    </main>
                </div>
            `;
        },
        
        /**
         * Initialize dashboard
         */
        init: () => {
            // Load live matches
            DashboardPage.loadLiveMatches();
            // Load upcoming matches
            DashboardPage.loadMatchQueue();
            // Load top performers
            DashboardPage.loadTopPerformers();
        },
        
        /**
         * Load live matches
         */
        loadLiveMatches: () => {
            const liveMatches = StorageUtil.get('liveMatches', []);
            const container = document.getElementById('live-matches');
            
            if (liveMatches.length === 0) {
                container.innerHTML = '<div class="card"><p class="text-muted text-center">No live matches</p></div>';
                return;
            }
            
            container.innerHTML = liveMatches.map(match => `
                <div class="card">
                    <div class="flex justify-between align-items-center">
                        <div>
                            <h4>${match.team1} vs ${match.team2}</h4>
                            <p class="text-muted">${match.format} • ${match.venue}</p>
                        </div>
                        <button class="btn btn-primary btn-small" onclick="navigateTo('scorer', ${match.id})">
                            Continue
                        </button>
                    </div>
                </div>
            `).join('');
        },
        
        /**
         * Load match queue
         */
        loadMatchQueue: () => {
            const matches = StorageUtil.get('matches', []);
            const upcomingMatches = matches.filter(m => m.status === 'scheduled').slice(0, 3);
            const container = document.getElementById('match-queue');
            
            if (upcomingMatches.length === 0) {
                container.innerHTML = '<div class="card"><p class="text-muted text-center">No upcoming matches</p></div>';
                return;
            }
            
            container.innerHTML = upcomingMatches.map(match => `
                <div class="card">
                    <p class="font-semibold">${match.team1} vs ${match.team2}</p>
                    <p class="text-muted text-small">${new Date(match.date).toLocaleDateString()}</p>
                </div>
            `).join('');
        },
        
        /**
         * Load top performers
         */
        loadTopPerformers: () => {
            // Load stats and display top performers
            const stats = StorageUtil.get('playerStats', {});
            
            // This would be implemented with proper stats aggregation
            // For now, showing placeholder
        }
    };
})();
