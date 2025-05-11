import { utilsObj } from "../utilsObj.js";
import { userData } from '../data.js';
import { MainLibraryView } from './libraryView.js';
import { SearchModule } from './search.js';
import { RecommendationsModule } from './recommendations.js';

export class App {
    constructor() {
        this.accessToken = localStorage.getItem('accessToken');
        this.refreshToken = localStorage.getItem('refreshToken');
        this.mainLibraryView = new MainLibraryView(userData);
        this.searchModule = new SearchModule(userData);
        this.init();
    }

    async init() {
        if (!this.accessToken) {
            window.location.href = '/login.html';
            return;
        }

        try {
            // load all
            await Promise.all([
                this.fetchUserLibrary(),
                this.fetchInfo()
            ]);
            
            const urlParams = new URLSearchParams(window.location.search);
            const searchTerm = urlParams.get('search');
            
            if (searchTerm) {
                // search
                const searchInput = document.querySelector('.search-bar input');
                if (searchInput) {
                    searchInput.value = searchTerm;
                    await this.searchModule.performSearch(searchTerm);
                }
            } else {   
                // show all users stuff
                this.mainLibraryView.renderLibrary();
                this.mainLibraryView.renderCurrentReadings();
            }
            
            this.mainLibraryView.renderInfo();
            
            // load recommendations
            this.loadRecommendations();
            
            this.setupEventListeners();
        } catch (error) {
            console.error('Initialization error:', error);
            if (error.status === 401) {
                window.location.href = '/login.html';
            }
        }
    }
    
    async loadRecommendations() {
        try {
        const recModule = new RecommendationsModule(userData);
        await recModule.loadAndRender();
        } catch (error) {
        console.error('Error loading recommendations:', error);
        }
    }

    async fetchUserLibrary() {
        try {
            const response = await utilsObj.fetchWithAuth('/api/books/library');
            if (!response) return;
            const books = await response.json();
            
            if (!Array.isArray(books)) {
                console.error('Expected books to be an array but got:', typeof books);
                return;
            }
            
            userData.library = books;    
        } catch (error) {
            console.error('Error fetching library:', error);
        }
    }

    async fetchInfo() {
        try {
            const response = await fetch('/api/info');
            if (!response.ok) {
                throw new Error('Failed to fetch info');
            }
            const info = await response.json();
            userData.info = info;
        } catch (error) {
            console.error('Error fetching info:', error);
        }
    }
    
    setupEventListeners() {
        // setup event listeners
        const menuToggle = document.querySelector('.menu-button');
        const columnRight = document.querySelector('.column-right');
        document.getElementById('logoutButton')?.addEventListener('click', this.logout.bind(this));
        
        menuToggle?.addEventListener('click', () => {
            const overlay = document.getElementById('overlay');
            columnRight.classList.toggle('active');
            overlay.classList.toggle('active');
            if (window.innerWidth <= 768) {
                document.body.style.overflow = columnRight.classList.contains('active') ? 'hidden' : 'auto';
            }
        });

        // dispatch
        this.searchModule.setupEventListeners();
        this.mainLibraryView.setupEventListeners();
        this.mainLibraryView.setupLazyLoading();
    }
    
    async logout() {
        try {
            const response = await utilsObj.fetchWithAuth('/api/user/logout', {
                method: 'POST',
                body: JSON.stringify({ refreshToken: this.refreshToken })
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '../login.html';
        } catch (error) {
            console.error('Error during logout:', error);
            alert('Logout failed. Please try again.');
        }
    }
}