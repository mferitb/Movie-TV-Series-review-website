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

const movieGrid = document.querySelector('.movie-grid');
const reviewPage = document.getElementById('review-page');
const closeButton = document.querySelector('.close-button');
const reviewMovieTitle = document.getElementById('review-movie-title');
const reviewMovieRating = document.getElementById('review-movie-rating');
const reviewForm = document.querySelector('.review-form');
const starRating = document.querySelector('.star-rating');
let currentRating = 0;

movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    movieCard.innerHTML = `
        <img src="${movie.image}" alt="${movie.title}">
        <div class="movie-info">
            <div class="movie-title">${movie.title}</div>
            <div class="movie-rating">★ ${movie.rating.toFixed(1)}</div>
        </div>
    `;
    movieCard.addEventListener('click', () => openReviewPage(movie));
    movieGrid.appendChild(movieCard);
});

function openReviewPage(movie) {
    reviewMovieTitle.textContent = movie.title;
    reviewMovieRating.textContent = `Current Rating: ★ ${movie.rating.toFixed(1)}`;
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
        alert(`Thank you for your review! You rated this movie ${currentRating} stars.`);
        reviewPage.style.display = 'none';
    } else {
        alert('Please select a rating and write a review before submitting.');
    }
});