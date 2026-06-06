/**
 * Form Validation Utility
 */
const ValidationUtil = (() => {
    return {
        /**
         * Check for duplicate teams
         */
        isDuplicateTeam: (teamName, existingTeams = []) => {
            return existingTeams.some(team => 
                team.name.toLowerCase() === teamName.toLowerCase()
            );
        },
        
        /**
         * Check for duplicate players in a team
         */
        isDuplicatePlayer: (playerName, existingPlayers = []) => {
            return existingPlayers.some(player => 
                player.name.toLowerCase() === playerName.toLowerCase()
            );
        },
        
        /**
         * Validate over format (e.g., "0.1" to "19.6")
         */
        isValidOver: (over) => {
            const regex = /^\d+\.\d$/;
            if (!regex.test(over)) return false;
            
            const [overs, balls] = over.split('.').map(Number);
            return balls >= 0 && balls <= 5;
        },
        
        /**
         * Validate player name
         */
        isValidPlayerName: (name) => {
            return name && name.trim().length > 0 && name.length <= 50;
        },
        
        /**
         * Validate team name
         */
        isValidTeamName: (name) => {
            return name && name.trim().length > 0 && name.length <= 50;
        },
        
        /**
         * Validate email
         */
        isValidEmail: (email) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        },
        
        /**
         * Validate number
         */
        isValidNumber: (num, min = 0, max = Infinity) => {
            const n = Number(num);
            return !isNaN(n) && n >= min && n <= max;
        },
        
        /**
         * Validate date
         */
        isValidDate: (date) => {
            return date instanceof Date && !isNaN(date);
        },
        
        /**
         * Validate URL
         */
        isValidUrl: (url) => {
            try {
                new URL(url);
                return true;
            } catch {
                return false;
            }
        },
        
        /**
         * Get validation error message
         */
        getErrorMessage: (field, rule) => {
            const messages = {
                required: `${field} is required`,
                duplicate: `${field} already exists`,
                invalid: `${field} is invalid`,
                minLength: `${field} must be at least {min} characters`,
                maxLength: `${field} must not exceed {max} characters`,
                email: `${field} must be a valid email`,
                number: `${field} must be a valid number`,
                date: `${field} must be a valid date`,
                url: `${field} must be a valid URL`
            };
            return messages[rule] || `${field} is invalid`;
        }
    };
})();
