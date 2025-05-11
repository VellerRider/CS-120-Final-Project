export function renderPageBook(book){
        return `
            <div class="pagebook-card" data-book-id="${book.book_id}">
                <div class="pagebook-cover">
                   <img src="${book.book_image}" alt="${book.book_title}">
                </div>
                <div class="pagebook-title">${book.book_title}</div>
                <div class="pagebook-author">${book.authors}</div>
                <div class="pagebook-description">Summary: ${book.description || 'No description available.'}</div>
            </div>
        `
}