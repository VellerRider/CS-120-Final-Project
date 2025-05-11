export function renderRecommendationCard(book) {
        return `
            <div class="recommendation-card" data-book-id="${book.book_id}">
                <div class="recommendation-cover">
                    <img src="${book.book_image}" alt="${book.book_title}" loading="lazy">
                </div>
                <div class="recommendation-info">
                    <div class="recommendation-title">${book.book_title}</div>
                    <div class="recommendation-author">${book.authors}</div>
                </div>
            </div>
        `;
}