export function renderCurrentReading(book) {
        return `
            <div class="current-reading-card" data-book-id="${book.book_id}">
                <div class="current-reading-cover">
                    <img src="${book.book_image}" alt="${book.book_title}">
                </div>
                <div class="current-reading-title">${book.book_title}</div>
                <div class="current-reading-author">${book.authors}</div>
            </div>
        `;
}