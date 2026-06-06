/**
 * Live Scorer Component
 * Handles all scoring operations: runs, wickets, extras, etc.
 */
const ScorerComponent = (() => {
    let currentMatch = null;
    let currentInnings = null;
    let currentBatter = null;
    let currentBowler = null;
    let undoStack = [];
    
    return {
        /**
         * Initialize scorer with match data
         */
        init: (match, innings) => {
            currentMatch = match;
            currentInnings = innings;
            currentBatter = innings.batter;
            currentBowler = innings.bowler;
            undoStack = [];
        },
        
        /**
         * Record runs
         */
        recordRuns: (runsScored, runnersRan = 2) => {
            if (!currentInnings) return false;
            
            const action = {
                type: 'runs',
                runsScored,
                runnersRan,
                timestamp: Date.now()
            };
            
            undoStack.push(action);
            currentInnings.runs += runsScored;
            currentInnings.balls += 1;
            
            return true;
        },
        
        /**
         * Record wicket
         */
        recordWicket: (wicketType, dismissedBy = null, fielder = null) => {
            if (!currentInnings) return false;
            
            const action = {
                type: 'wicket',
                wicketType,
                dismissedBy,
                fielder,
                timestamp: Date.now()
            };
            
            undoStack.push(action);
            currentInnings.wickets += 1;
            currentInnings.balls += 1;
            
            return true;
        },
        
        /**
         * Record extras (wides, no-balls, byes, leg-byes)
         */
        recordExtra: (extraType, runsScored = 1) => {
            if (!currentInnings) return false;
            
            const action = {
                type: 'extra',
                extraType,
                runsScored,
                timestamp: Date.now()
            };
            
            undoStack.push(action);
            currentInnings.runs += runsScored;
            if (extraType !== 'bye' && extraType !== 'legBye') {
                currentInnings.balls += 1;
            }
            
            return true;
        },
        
        /**
         * Swap strike between batters
         */
        swapStrike: () => {
            if (!currentInnings) return false;
            
            const action = {
                type: 'strikeSwap',
                timestamp: Date.now()
            };
            
            undoStack.push(action);
            // Implementation depends on innings structure
            return true;
        },
        
        /**
         * Complete over
         */
        completeOver: () => {
            if (!currentInnings) return false;
            
            const action = {
                type: 'overComplete',
                timestamp: Date.now()
            };
            
            undoStack.push(action);
            currentInnings.overs += 1;
            
            return true;
        },
        
        /**
         * Undo last action
         */
        undo: () => {
            if (undoStack.length === 0) return false;
            
            const lastAction = undoStack.pop();
            
            switch (lastAction.type) {
                case 'runs':
                    currentInnings.runs -= lastAction.runsScored;
                    currentInnings.balls -= 1;
                    break;
                case 'wicket':
                    currentInnings.wickets -= 1;
                    currentInnings.balls -= 1;
                    break;
                case 'extra':
                    currentInnings.runs -= lastAction.runsScored;
                    if (lastAction.extraType !== 'bye' && lastAction.extraType !== 'legBye') {
                        currentInnings.balls -= 1;
                    }
                    break;
                case 'overComplete':
                    currentInnings.overs -= 1;
                    break;
            }
            
            return true;
        },
        
        /**
         * Get current match state
         */
        getMatchState: () => ({
            match: currentMatch,
            innings: currentInnings,
            batter: currentBatter,
            bowler: currentBowler,
            canUndo: undoStack.length > 0
        }),
        
        /**
         * Get undo stack size
         */
        getUndoCount: () => undoStack.length
    };
})();
