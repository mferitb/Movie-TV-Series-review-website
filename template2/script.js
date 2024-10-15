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
    { title: "Breaking Bad", rating: 4.9, image: "/images.jpg?height=100&width=100" },
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

const movieGrid = document.querySelector(".movie-grid");
const tvShowGrid = document.querySelector(".tvshow-grid");
const loginLink = document.getElementById("login-link");
const registerLink = document.getElementById("register-link");
const moviesLink = document.getElementById("movies-link");
const tvShowsLink = document.getElementById("tvshows-link");
const reviewPage = document.getElementById("review-page");
const loginPage = document.getElementById("login-page");
const registerPage = document.getElementById("register-page");
const reviewTitle = document.getElementById("review-title");
const reviewRating = document.getElementById("review-rating");

function displayMovies() {
    movieGrid.innerHTML = "";
    movies.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <p class="movie-rating">Rating: ${movie.rating}</p>
            </div>
        `;
        movieCard.addEventListener("click", () => openReviewPage(movie.title, movie.rating));
        movieGrid.appendChild(movieCard);
    });
}

function displayTVShows() {
    tvShowGrid.innerHTML = "";
    tvShows.forEach((tvShow) => {
        const tvShowCard = document.createElement("div");
        tvShowCard.classList.add("tvshow-card");
        tvShowCard.innerHTML = `
            <img src="${tvShow.image}" alt="${tvShow.title}">
            <div class="tvshow-info">
                <h3 class="tvshow-title">${tvShow.title}</h3>
                <p class="tvshow-rating">Rating: ${tvShow.rating}</p>
            </div>
        `;
        tvShowCard.addEventListener("click", () => openReviewPage(tvShow.title, tvShow.rating));
        tvShowGrid.appendChild(tvShowCard);
    });
}

function openReviewPage(title, rating) {
    reviewTitle.textContent = title;
    reviewRating.innerHTML = `Current Rating: ${rating}`;
    reviewPage.style.display = "block";
}

function closeModals() {
    reviewPage.style.display = "none";
    loginPage.style.display = "none";
    registerPage.style.display = "none";
}

loginLink.addEventListener("click", () => loginPage.style.display = "block");
registerLink.addEventListener("click", () => registerPage.style.display = "block");
document.querySelectorAll(".close-button").forEach(button => button.addEventListener("click", closeModals));
moviesLink.addEventListener("click", () => {
    movieGrid.style.display = "grid";
    tvShowGrid.style.display = "none";
    displayMovies();
});
tvShowsLink.addEventListener("click", () => {
    movieGrid.style.display = "none";
    tvShowGrid.style.display = "grid";
    displayTVShows();
});

// Initial Load
displayMovies();
// Add or modify these functions in your existing script.js file

function initializeDetailPage() {
    const selectedItem = JSON.parse(localStorage.getItem('selectedItem'));
    if (selectedItem) {
        document.getElementById('detail-img').src = selectedItem.image;
        document.getElementById('detail-title').textContent = selectedItem.title;
        document.getElementById('detail-rating').textContent = `Rating: ${selectedItem.rating}`;

        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            star.addEventListener('click', () => {
                const rating = star.getAttribute('data-rating');
                updateRating(selectedItem, rating);
            });
        });

        document.getElementById('comment-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const commentText = document.getElementById('comment-text').value;
            addComment(selectedItem, commentText);
        });

        displayComments(selectedItem);
    }
}

function updateRating(item, rating) {
    item.rating = (parseFloat(item.rating) + parseFloat(rating)) / 2;
    document.getElementById('detail-rating').textContent = `Rating: ${item.rating.toFixed(1)}`;
    localStorage.setItem('selectedItem', JSON.stringify(item));
    updateStars(item.rating);
}

function updateStars(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < Math.floor(rating)) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function addComment(item, comment) {
    if (!item.comments) {
        item.comments = [];
    }
    item.comments.push(comment);
    localStorage.setItem('selectedItem', JSON.stringify(item));
    displayComments(item);
    document.getElementById('comment-text').value = '';
}

function displayComments(item) {
    const commentsSection = document.getElementById('comments-section');
    commentsSection.innerHTML = '';
    if (item.comments && item.comments.length > 0) {
        item.comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.textContent = comment;
            commentsSection.appendChild(commentElement);
        });
    } else {
        commentsSection.innerHTML = '<p>No comments yet. Be the first to comment!</p>';
    }
}

// Check if we're on the detail page and initialize it
if (window.location.pathname.includes('detail.html')) {
    initializeDetailPage();
}
