/**
 * Main Application File
 * Handles routing, state management, and core app functionality
 */

const App = (() => {
    let currentPage = 'dashboard';
    let isDarkMode = false;
    
    return {
        /**
         * Initialize the application
         */
        init: () => {
            // Check for saved dark mode preference
            isDarkMode = StorageUtil.get('darkMode', false);
            if (isDarkMode) {
                document.body.classList.add('dark-theme');
            }
            
            // Set up event listeners
            App.setupEventListeners();
            
            // Load initial page
            App.loadPage('dashboard');
        },
        
        /**
         * Setup global event listeners
         */
        setupEventListeners: () => {
            // Handle navigation
            window.navigateTo = (page, id = null) => {
                App.loadPage(page, id);
            };
            
            // Handle theme toggle
            window.toggleTheme = () => {
                isDarkMode = !isDarkMode;
                StorageUtil.set('darkMode', isDarkMode);
                
                if (isDarkMode) {
                    document.body.classList.add('dark-theme');
                } else {
                    document.body.classList.remove('dark-theme');
                }
            };
        },
        
        /**
         * Load a page
         */
        loadPage: (page, id = null) => {
            currentPage = page;
            const container = document.getElementById('app-container');
            
            let content = '';
            
            switch (page) {
                case 'dashboard':
                    content = DashboardPage.render();
                    break;
                case 'tournament':
                    content = TournamentPage.render();
                    break;
                case 'scorer':
                    content = App.renderScorerPage(id);
                    break;
                case 'teams':
                    content = App.renderTeamsPage();
                    break;
                case 'match-setup':
                    content = App.renderMatchSetupPage();
                    break;
                default:
                    content = DashboardPage.render();
            }
            
            container.innerHTML = content;
            window.scrollTo(0, 0);
            
            // Initialize page-specific functionality
            if (page === 'dashboard') {
                DashboardPage.init();
            } else if (page === 'tournament') {
                TournamentPage.init();
            }
        },
        
        /**
         * Render scorer page
         */
        renderScorerPage: (matchId = null) => {
            return `
                <div class="scorer-container">
                    <header class="scorer-header">
                        <div class="container">
                            <button class="btn btn-outline" onclick="navigateTo('dashboard')">
                                ← Back
                            </button>
                            <h1>Live Scorer</h1>
                        </div>
                    </header>
                    
                    <main class="scorer-main">
                        <div class="container">
                            <!-- Match Info -->
                            <div class="card mb-3">
                                <div class="flex justify-between align-items-center">
                                    <div>
                                        <h3 id="match-title">Team A vs Team B</h3>
                                        <p class="text-muted" id="match-status">Over 0.0</p>
                                    </div>
                                    <div class="text-right">
                                        <p class="font-semibold" id="runs-display">0/0</p>
                                        <p class="text-muted">Runs/Wickets</p>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Scorer Controls -->
                            <div class="card mb-3">
                                <h4>Record Run</h4>
                                <div class="grid grid-cols-6 gap-1">
                                    <button class="btn btn-primary" onclick="recordRun(0)">0</button>
                                    <button class="btn btn-primary" onclick="recordRun(1)">1</button>
                                    <button class="btn btn-primary" onclick="recordRun(2)">2</button>
                                    <button class="btn btn-primary" onclick="recordRun(3)">3</button>
                                    <button class="btn btn-primary" onclick="recordRun(4)">4</button>
                                    <button class="btn btn-primary" onclick="recordRun(6)">6</button>
                                </div>
                                
                                <h4 style="margin-top: 1rem;">Extras</h4>
                                <div class="grid grid-cols-4 gap-1">
                                    <button class="btn btn-secondary" onclick="recordExtra('wide')">Wide</button>
                                    <button class="btn btn-secondary" onclick="recordExtra('noBall')">No Ball</button>
                                    <button class="btn btn-secondary" onclick="recordExtra('bye')">Bye</button>
                                    <button class="btn btn-secondary" onclick="recordExtra('legBye')">Leg Bye</button>
                                </div>
                                
                                <h4 style="margin-top: 1rem;">Other</h4>
                                <div class="grid grid-cols-4 gap-1">
                                    <button class="btn btn-danger" onclick="recordWicket()">Wicket</button>
                                    <button class="btn btn-accent" onclick="swapStrike()">Swap Strike</button>
                                    <button class="btn btn-outline" onclick="undoAction()">Undo</button>
                                    <button class="btn btn-outline" onclick="completeOver()">Over ✓</button>
                                </div>
                            </div>
                            
                            <!-- Scorecard Preview -->
                            <div class="card">
                                <h4>Commentary Feed</h4>
                                <div id="commentary-feed" style="max-height: 300px; overflow-y: auto;">
                                    <p class="text-muted">Match started...</p>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            `;
        },
        
        /**
         * Render teams page
         */
        renderTeamsPage: () => {
            return `
                <div class="teams-container">
                    <header class="teams-header">
                        <div class="container">
                            <button class="btn btn-outline" onclick="navigateTo('dashboard')">
                                ← Back
                            </button>
                            <h1>Team Management</h1>
                        </div>
                    </header>
                    
                    <main class="teams-main">
                        <div class="container">
                            <div class="card mb-3">
                                <h3>Create New Team</h3>
                                <form id="create-team-form">
                                    <div class="form-group">
                                        <label>Team Name</label>
                                        <input type="text" placeholder="Enter team name" id="team-name">
                                    </div>
                                    <button type="submit" class="btn btn-primary">Create Team</button>
                                </form>
                            </div>
                            
                            <div id="teams-list">
                                <p class="text-muted">No teams created yet</p>
                            </div>
                        </div>
                    </main>
                </div>
            `;
        },
        
        /**
         * Render match setup page
         */
        renderMatchSetupPage: () => {
            return `
                <div class="match-setup-container">
                    <header class="match-setup-header">
                        <div class="container">
                            <button class="btn btn-outline" onclick="navigateTo('dashboard')">
                                ← Back
                            </button>
                            <h1>Create New Match</h1>
                        </div>
                    </header>
                    
                    <main class="match-setup-main">
                        <div class="container">
                            <div class="card">
                                <h3>Match Setup Wizard</h3>
                                
                                <!-- Step 1: Format -->
                                <div class="form-group">
                                    <label>Match Format</label>
                                    <select id="match-format">
                                        <option>T20</option>
                                        <option>ODI</option>
                                        <option>Test</option>
                                        <option>Custom Overs</option>
                                    </select>
                                </div>
                                
                                <!-- Step 2: Teams -->
                                <div class="form-group">
                                    <label>Team 1</label>
                                    <select id="team-1"></select>
                                </div>
                                
                                <div class="form-group">
                                    <label>Team 2</label>
                                    <select id="team-2"></select>
                                </div>
                                
                                <!-- Step 3: Toss -->
                                <div class="form-group">
                                    <label>Toss Winner</label>
                                    <select id="toss-winner"></select>
                                </div>
                                
                                <div class="form-group">
                                    <label>Toss Decision</label>
                                    <select id="toss-decision">
                                        <option value="bat">Bat</option>
                                        <option value="bowl">Bowl</option>
                                    </select>
                                </div>
                                
                                <button class="btn btn-primary btn-large" onclick="createMatch()">
                                    Start Match
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            `;
        },
        
        /**
         * Get current page
         */
        getCurrentPage: () => currentPage
    };
})();

/**
 * Global helper functions
 */

function recordRun(runs) {
    ScorerComponent.recordRuns(runs);
    App.updateScorerUI();
}

function recordExtra(extraType) {
    ScorerComponent.recordExtra(extraType);
    App.updateScorerUI();
}

function recordWicket() {
    ScorerComponent.recordWicket('bowled');
    App.updateScorerUI();
}

function swapStrike() {
    ScorerComponent.swapStrike();
    App.updateScorerUI();
}

function undoAction() {
    ScorerComponent.undo();
    App.updateScorerUI();
}

function completeOver() {
    ScorerComponent.completeOver();
    App.updateScorerUI();
}

function createMatch() {
    const format = document.getElementById('match-format').value;
    const team1 = document.getElementById('team-1').value;
    const team2 = document.getElementById('team-2').value;
    const tossWinner = document.getElementById('toss-winner').value;
    const tossDecision = document.getElementById('toss-decision').value;
    
    const match = {
        id: Date.now(),
        format,
        team1,
        team2,
        tossWinner,
        tossDecision,
        status: 'live',
        createdAt: new Date().toISOString()
    };
    
    const liveMatches = StorageUtil.get('liveMatches', []);
    liveMatches.push(match);
    StorageUtil.set('liveMatches', liveMatches);
    
    navigateTo('scorer', match.id);
}

App.updateScorerUI = () => {
    const state = ScorerComponent.getMatchState();
    if (state.innings) {
        document.getElementById('runs-display').textContent = 
            `${state.innings.runs}/${state.innings.wickets}`;
        document.getElementById('match-status').textContent = 
            `Over ${Math.floor(state.innings.overs)}.${state.innings.balls % 6}`;
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
