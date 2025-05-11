import { utilsObj } from "../utilsObj.js";
import { renderRecommendationCard } from "../components/recommendationCard.js";

export class RecommendationsModule {
    constructor(userData) {
        this.userData = userData;
    }
    
    async loadAndRender() {
        await this.fetchRecommendations();
        this.renderRecommendations();
    }
    
    async fetchRecommendations() {
        try {
            const response = await utilsObj.fetchWithAuth('/api/books/recommendations');
            if (!response) return;
            const recommendations = await response.json();
            this.userData.recommendations = recommendations;
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    }
    
    renderRecommendations() {
        const container = document.getElementById('recommendationsContainer');
        if (!container) return;
        
        container.innerHTML = this.userData.recommendations
            .map(book => renderRecommendationCard(book))
            .join('');
    }
}