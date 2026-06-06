/**
 * Tournament Center Page
 * Tournament management, points table, and knockout bracket
 */
const TournamentPage = (() => {
    return {
        /**
         * Render tournament center
         */
        render: () => {
            return `
                <div class="tournament-container">
                    <header class="tournament-header">
                        <div class="container">
                            <h1>Tournament Center</h1>
                            <p class="text-muted">Manage tournaments, points tables, and brackets</p>
                        </div>
                    </header>
                    
                    <main class="tournament-main">
                        <div class="container">
                            <!-- Tournament Tabs -->
                            <div class="tournament-tabs">
                                <button class="tab-btn active" onclick="switchTab('points-table')">
                                    Points Table
                                </button>
                                <button class="tab-btn" onclick="switchTab('knockout')">
                                    Knockout Bracket
                                </button>
                                <button class="tab-btn" onclick="switchTab('all-tournaments')">
                                    All Tournaments
                                </button>
                            </div>
                            
                            <!-- Points Table Tab -->
                            <div id="tab-points-table" class="tab-content active">
                                <div class="card">
                                    <h3>League Points Table</h3>
                                    <table class="points-table">
                                        <thead>
                                            <tr>
                                                <th>Rank</th>
                                                <th>Team</th>
                                                <th>Played</th>
                                                <th>Won</th>
                                                <th>Lost</th>
                                                <th>NR</th>
                                                <th>Points</th>
                                                <th>NRR</th>
                                            </tr>
                                        </thead>
                                        <tbody id="points-table-body">
                                            <tr>
                                                <td colspan="8" class="text-center text-muted">
                                                    No tournament data yet
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                            <!-- Knockout Tab -->
                            <div id="tab-knockout" class="tab-content hidden">
                                <div class="card">
                                    <h3>Knockout Bracket</h3>
                                    <div id="knockout-bracket">
                                        <p class="text-muted text-center">
                                            No knockout bracket data
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- All Tournaments Tab -->
                            <div id="tab-all-tournaments" class="tab-content hidden">
                                <div class="grid grid-cols-1">
                                    <div class="card">
                                        <div class="flex justify-between align-items-center">
                                            <div>
                                                <h4>Create New Tournament</h4>
                                                <p class="text-muted text-small">
                                                    Start organizing a new tournament
                                                </p>
                                            </div>
                                            <button class="btn btn-primary" 
                                                    onclick="navigateTo('create-tournament')">
                                                Create
                                            </button>
                                        </div>
                                    </div>
                                    <div id="tournaments-list">
                                        <!-- Tournaments will be loaded here -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            `;
        },
        
        /**
         * Initialize tournament page
         */
        init: () => {
            TournamentPage.loadPointsTable();
            TournamentPage.loadKnockoutBracket();
            TournamentPage.loadTournaments();
        },
        
        /**
         * Load points table
         */
        loadPointsTable: () => {
            const tournaments = StorageUtil.get('tournaments', []);
            const tbody = document.getElementById('points-table-body');
            
            if (tournaments.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="8" class="text-center text-muted">
                            No tournament data yet
                        </td>
                    </tr>
                `;
                return;
            }
            
            // Load current/selected tournament's points table
            const currentTournament = tournaments[0]; // First tournament
            const teams = currentTournament.teams || [];
            
            tbody.innerHTML = teams.map((team, idx) => `
                <tr>
                    <td>${idx + 1}</td>
                    <td>${team.name}</td>
                    <td>${team.played || 0}</td>
                    <td>${team.won || 0}</td>
                    <td>${team.lost || 0}</td>
                    <td>${team.noResult || 0}</td>
                    <td class="font-semibold">${team.points || 0}</td>
                    <td>${(team.nrr || 0).toFixed(2)}</td>
                </tr>
            `).join('');
        },
        
        /**
         * Load knockout bracket
         */
        loadKnockoutBracket: () => {
            const bracket = document.getElementById('knockout-bracket');
            // Placeholder for knockout bracket rendering
            // This would typically use a bracket visualization library
        },
        
        /**
         * Load all tournaments
         */
        loadTournaments: () => {
            const tournaments = StorageUtil.get('tournaments', []);
            const container = document.getElementById('tournaments-list');
            
            if (tournaments.length === 0) {
                container.innerHTML = '<p class="text-muted">No tournaments created yet</p>';
                return;
            }
            
            container.innerHTML = tournaments.map(tournament => `
                <div class="card">
                    <div class="flex justify-between align-items-center">
                        <div>
                            <h4>${tournament.name}</h4>
                            <p class="text-muted">${tournament.teams?.length || 0} teams</p>
                        </div>
                        <button class="btn btn-primary btn-small" 
                                onclick="navigateTo('tournament-detail', '${tournament.id}')">
                            View
                        </button>
                    </div>
                </div>
            `).join('');
        }
    };
})();

/**
 * Switch tab visibility
 */
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('hidden');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    const tabElement = document.getElementById('tab-' + tabName);
    if (tabElement) {
        tabElement.classList.remove('hidden');
    }
    
    // Mark button as active
    event.target.classList.add('active');
}
