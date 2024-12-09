export const utilsObj = {
    baseUrl: window.location.origin,
    
    async fetchWithAuth(endpoint, options = {}) {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            window.location.href = '/login.html';
            return;
        }

        const fullUrl = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`;
        
        try {
            const response = await fetch(fullUrl, {
                ...options,
                headers: {
                    ...options.headers,
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.status === 401) {
                window.location.href = '/login.html';
                return;
            }
            
            return response;
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    }
};