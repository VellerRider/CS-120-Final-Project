
import { renderBookCard } from '../components/bookCard.js';
import { renderCurrentReading } from '../components/currentReading.js'
import { renderInfoItem } from '../components/infoItem.js';
export class MainLibraryView {
    constructor(userData) {
        this.userData = userData;
        this.imageObserver = null;
    }
    renderCurrentReadings() {
        const container = document.getElementById('currentReadingContainer');
        if (!container) return;
        
        const currentReading = this.userData.library.filter(book => book.book_status === 'In Progress');
        container.innerHTML = currentReading
            .map(book => renderCurrentReading(book))
            .join('');
        
        this.setupLazyLoading(container);
    }
    
    renderLibrary() {
        const container = document.getElementById('libraryContainer');
        if (!container) return;
        
        container.innerHTML = this.userData.library
            .map(book => renderBookCard(book))
            .join('');
        this.setupLazyLoading(container);
    }

    
    renderInfo() {
        const container = document.getElementById('infoContainer');
        if (!container) return;
        
        container.innerHTML = this.userData.info
            .map(info => renderInfoItem(info))
            .join('');
    }
    
    showAllLibrary = () => {
        const currentReading = document.querySelector('.current-reading');
        const library = document.querySelector('.library');
        const viewAllBtn = library.querySelector('.view-all');
        currentReading.style.display = 'none';

        viewAllBtn.textContent = 'BACK';
        viewAllBtn.classList.add('back-button');
        
        viewAllBtn.removeEventListener('click', this.showAllLibrary);
        viewAllBtn.addEventListener('click', () => {
            currentReading.style.display = '';
            viewAllBtn.textContent = 'VIEW ALL';
            viewAllBtn.classList.remove('back-button');
            viewAllBtn.addEventListener('click', this.showAllLibrary);
        });
    }
    
    setupLazyLoading(container = document) {
        if ('IntersectionObserver' in window) {
            if (!this.imageObserver) {
                this.imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            this.imageObserver.unobserve(img);
                        }
                    });
                });
            }
            
            container.querySelectorAll('img[data-src]').forEach(img => {
                this.imageObserver.observe(img);
            });
        } else {
            container.querySelectorAll('img[data-src]').forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }
    
    setupEventListeners() {
        // route to book details
        document.addEventListener('click', (e) => {
            const bookCard = e.target.closest('.book-card, .current-reading-card, .recommendation-card');
            if (bookCard) {
                const bookId = bookCard.dataset.bookId;
                const searchParam = new URLSearchParams(window.location.search).get('search');
                const url = `/book.html?id=${bookId}${searchParam ? `&from_search=${searchParam}` : ''}`;
                window.location.href = url;
            }
        });


        const libraryViewAll = document.querySelector('.library .view-all');
        libraryViewAll?.addEventListener('click', this.showAllLibrary);
    }
}