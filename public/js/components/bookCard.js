export function renderBookCard(book) {
        return `
            <div class="book-card" data-book-id="${book.book_id}">
                <div class="book-cover">
                   <img src="images/placeholder.svg" data-src="${book.book_image}" alt="${book.book_title}">
                </div>
                <div class="book-info">
                    <div class="book-title">${book.book_title}</div>
                    <div class="book-author">${book.authors}</div>
                </div>
            </div>
        `;
}