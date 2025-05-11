import { utilsObj } from "../utilsObj.js";
import { renderBookCard } from '../components/bookCard.js';

export class SearchModule {
    constructor(userData) {
        this.userData = userData;
    }
    
    async performSearch(searchTerm) {
        if (!searchTerm.trim()) {
            return;
        }

        try {
            const response = await utilsObj.fetchWithAuth(`/api/books/search?term=${encodeURIComponent(searchTerm)}`);
            if (!response) return;
            const results = await response.json();
            const newUrl = `${window.location.pathname}?search=${encodeURIComponent(searchTerm)}`;
            window.history.pushState({ path: newUrl }, '', newUrl);
            this.showSearchResults(results);
        } catch (error) {
            console.error('Search failed:', error);
        }
    }
    
    showSearchResults(results) {
        const contentScrollable = document.querySelector('.content-scrollable');
        const currentReading = document.querySelector('.current-reading');
        const library = document.querySelector('.library');
        
        const existingSearchResults = document.querySelector('.search-results');
        if (existingSearchResults) {
            existingSearchResults.remove();
        }
        
        const searchResults = document.createElement('div');
        searchResults.className = 'search-results';
        
        searchResults.innerHTML = `
            <div class="section-header">
                <div class="section-title">Search Results</div>
                <button class="back-to-library">Back to Library</button>
            </div>
            <div class="personal-results">
                <div class="section-header">
                    <div class="section-title">From Your Library</div>
                </div>
                <div class="books-grid">
                    ${results.personalResults.map(book => renderBookCard(book)).join('')}
                </div>
            </div>
            <div class="general-results">
                <div class="section-header">
                    <div class="section-title">More Books</div>
                </div>
                <div class="books-grid">
                    ${results.generalResults.map(book => renderBookCard(book)).join('')}
                </div>
            </div>
        `;
    
        currentReading.style.display = 'none';
        library.style.display = 'none';
        
        contentScrollable.appendChild(searchResults);
    
        this.setupLazyLoading(searchResults);

        searchResults.querySelector('.back-to-library').addEventListener('click', () => {
            searchResults.remove();
            currentReading.style.display = '';
            library.style.display = '';
        });
    }
    
    setupLazyLoading(container) {
        import('../views/libraryView.js').then(module => {
            const view = new module.MainLibraryView(this.userData);
            view.setupLazyLoading(container);
        });
    }
    
    setupEventListeners() {
        const searchInput = document.querySelector('.search-bar input');
        const searchButton = document.querySelector('.search-button');

        searchInput?.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                this.performSearch(searchInput.value);
            }
        });

        searchButton?.addEventListener('click', () => {
            this.performSearch(searchInput.value);
        });
    }
}