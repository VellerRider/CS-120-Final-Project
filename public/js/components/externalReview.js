export function renderExternalReview(book) {
        if (!book.reviews || book.reviews.length === 0) {
            return `<div class="center-button-container"><p>No external reviews available.</p></div>`;
        }
    
        return `
            <div class="review-item">
                <div class="review-header">
                    <h2>External Book Review</h2>
                </div>
                <div class="review-content">${book.reviews[0]}</div>
                ${book.reviews.length > 1 ? 
                    `<button id="viewAllReviews">View All Reviews (${book.reviews.length})</button>` 
                    : ''
                }
            </div>
        `;
}