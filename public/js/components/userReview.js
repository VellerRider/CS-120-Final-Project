export function renderUserReview(book) {
        return `
            <div class="review-item">
                <div class="review-header">
                    <h2>My Review</h2>
                </div>
                <div class="review-content-user">
                ${book.review || 'You haven\'t written a review yet.'}
                    <div class="center-button-container">
                    <button id="editReviewBtn">EDIT MY REVIEW</button>
                    </div>
                </div>
            </div>
        `
}