const movies = [
    { title: "Forrest Gump", rating: 4.5, image: "/placeholder.svg?height=300&width=200" },
    { title: "Harry Potter", rating: 4.3, image: "/placeholder.svg?height=300&width=200" },
    { title: "Justice League", rating: 3.8, image: "/placeholder.svg?height=300&width=200" },
    { title: "The Tomorrow War", rating: 3.5, image: "/placeholder.svg?height=300&width=200" },
    { title: "Luca", rating: 4.2, image: "/placeholder.svg?height=300&width=200" },
    { title: "Cruella", rating: 4.0, image: "/placeholder.svg?height=300&width=200" },
    { title: "Inception", rating: 4.8, image: "/placeholder.svg?height=300&width=200" },
    { title: "The Shawshank Redemption", rating: 4.9, image: "/placeholder.svg?height=300&width=200" },
    { title: "The Dark Knight", rating: 4.7, image: "/placeholder.svg?height=300&width=200" },
    { title: "Pulp Fiction", rating: 4.6, image: "/placeholder.svg?height=300&width=200" },
    { title: "The Matrix", rating: 4.5, image: "/placeholder.svg?height=300&width=200" },
    { title: "Goodfellas", rating: 4.7, image: "/placeholder.svg?height=300&width=200" },
    { title: "The Silence of the Lambs", rating: 4.6, image: "/placeholder.svg?height=300&width=200" },
    { title: "Schindler's List", rating: 4.9, image: "/placeholder.svg?height=300&width=200" },
    { title: "The Lord of the Rings", rating: 4.8, image: "/placeholder.svg?height=300&width=200" },
];

const tvShows = [
    { title: "Breaking Bad", rating: 4.9, image: "/placeholder.svg?height=300&width=200" },
    { title: "Game of Thrones", rating: 4.7, image: "/placeholder.svg?height=300&width=200" },
    { title: "Stranger Things", rating: 4.5, image: "/placeholder.svg?height=300&width=200" },
    { title: "The Crown", rating: 4.4, image: "/placeholder.svg?height=300&width=200" },
    { title: "The Mandalorian", rating: 4.6, image: "/placeholder.svg?height=300&width=200" },
    { title: "Friends", rating: 4.8, image: "/placeholder.svg?height=300&width=200" },
    { title: "The Office", rating: 4.7, image: "/placeholder.svg?height=300&width=200" },
    { title: "Chernobyl", rating: 4.9, image: "/placeholder.svg?height=300&width=200" },
    { title: "The Witcher", rating: 4.3, image: "/placeholder.svg?height=300&width=200" },
    { title: "Westworld", rating: 4.4, image: "/placeholder.svg?height=300&width=200" },
    { title: "Black Mirror", rating: 4.5, image: "/placeholder.svg?height=300&width=200" },
    { title: "The Boys", rating: 4.6, image: "/placeholder.svg?height=300&width=200" },
    { title: "Peaky Blinders", rating: 4.7, image: "/placeholder.svg?height=300&width=200" },
    { title: "Sherlock", rating: 4.8, image: "/placeholder.svg?height=300&width=200" },
    { title: "Narcos", rating: 4.5, image: "/placeholder.svg?height=300&width=200" },
];

const movieGrid = document.querySelector('.movie-grid');
const tvShowGrid = document.querySelector('.tvshow-grid');
const reviewPage = document.getElementById('review-page');
const closeButton = document.querySelector('.close-button');
const reviewTitle = document.getElementById('review-title');
const reviewRating = document.getElementById('review-rating');
const reviewForm = document.querySelector('.review-form');
const starRating = document.querySelector('.star-rating');
let currentRating = 0;

function createCard(item, type) {
    const card = document.createElement('div');
    card.className = type === 'movie' ? 'movie-card' : 'tvshow-card';
    card.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="${type}-info">
            <div class="${type}-title">${item.title}</div>
            <div class="${type}-rating">★ ${item.rating.toFixed(1)}</div>
        </div>
    `;
    card.addEventListener('click', () => openReviewPage(item));
    return card;
}

function renderCards(items, grid, type) {
    grid.innerHTML = '';
    items.forEach(item => {
        const card = createCard(item, type);
        grid.appendChild(card);
    });
}

renderCards(movies, movieGrid, 'movie');
renderCards(tvShows, tvShowGrid, 'tvshow');

document.getElementById('movies-link').addEventListener('click', (e) => {
    e.preventDefault();
    movieGrid.style.display = 'grid';
    tvShowGrid.style.display = 'none';
});

document.getElementById('tvshows-link').addEventListener('click', (e) => {
    e.preventDefault();
    movieGrid.style.display = 'none';
    tvShowGrid.style.display = 'grid';
});

function openReviewPage(item) {
    reviewTitle.textContent = item.title;
    reviewRating.textContent = `Current Rating: ★ ${item.rating.toFixed(1)}`;
    reviewPage.style.display = 'block';
    resetStarRating();
}

closeButton.addEventListener('click', () => {
    reviewPage.style.display = 'none';
});

starRating.addEventListener('click', (e) => {
    if (e.target.classList.contains('star')) {
        currentRating = parseInt(e.target.dataset.rating);
        updateStarRating();
    }
});

function updateStarRating() {
    const stars = starRating.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < currentRating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function resetStarRating() {
    currentRating = 0;
    updateStarRating();
}

starRating.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('star')) {
        const hoverRating = parseInt(e.target.dataset.rating);
        highlightStars(hoverRating);
    }
});

starRating.addEventListener('mouseout', () => {
    highlightStars(currentRating);
});

function highlightStars(rating) {
    const stars = starRating.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const review = document.getElementById('review-text').value;
    if (currentRating && review) {
        alert(`Thank you for your review! You rated this title ${currentRating} stars.`);
        reviewPage.style.display = 'none';
    } else {
        alert('Please select a rating and write a review before submitting.');
    }
});
