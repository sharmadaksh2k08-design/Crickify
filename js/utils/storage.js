/**
 * Storage Utility - Handle localStorage persistence for app data
 */
const StorageUtil = (() => {
    const STORAGE_PREFIX = 'crikify_';
    
    return {
        /**
         * Save data to localStorage
         */
        set: (key, data) => {
            try {
                const serialized = JSON.stringify(data);
                localStorage.setItem(STORAGE_PREFIX + key, serialized);
                return true;
            } catch (error) {
                console.error('Storage set error:', error);
                return false;
            }
        },
        
        /**
         * Get data from localStorage
         */
        get: (key, defaultValue = null) => {
            try {
                const item = localStorage.getItem(STORAGE_PREFIX + key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (error) {
                console.error('Storage get error:', error);
                return defaultValue;
            }
        },
        
        /**
         * Remove data from localStorage
         */
        remove: (key) => {
            try {
                localStorage.removeItem(STORAGE_PREFIX + key);
                return true;
            } catch (error) {
                console.error('Storage remove error:', error);
                return false;
            }
        },
        
        /**
         * Clear all Crikify data from localStorage
         */
        clear: () => {
            try {
                const keys = Object.keys(localStorage);
                keys.forEach(key => {
                    if (key.startsWith(STORAGE_PREFIX)) {
                        localStorage.removeItem(key);
                    }
                });
                return true;
            } catch (error) {
                console.error('Storage clear error:', error);
                return false;
            }
        },
        
        /**
         * Get all stored Crikify data
         */
        getAll: () => {
            try {
                const data = {};
                const keys = Object.keys(localStorage);
                keys.forEach(key => {
                    if (key.startsWith(STORAGE_PREFIX)) {
                        const cleanKey = key.replace(STORAGE_PREFIX, '');
                        data[cleanKey] = JSON.parse(localStorage.getItem(key));
                    }
                });
                return data;
            } catch (error) {
                console.error('Storage getAll error:', error);
                return {};
            }
        },
        
        /**
         * Check if key exists
         */
        has: (key) => {
            return localStorage.getItem(STORAGE_PREFIX + key) !== null;
        }
    };
})();
