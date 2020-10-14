const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backDrop = document.getElementById('backdrop');
const cancelAddMovieModalButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieModalButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const movies = [];
const entryText = document.getElementById('entry-text');
const movieList = document.getElementById('movie-list');
const deleteMovieModal = document.getElementById('delete-modal');
const cancelDeleteMovieButton = deleteMovieModal.querySelector('.btn--passive');

const toggleBackDrop = () => {
    backDrop.classList.toggle('visible');
};

const showMovieModal = () => {
    addMovieModal.classList.add('visible');
    toggleBackDrop();
};

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
};

const cancelAddMovie = () => {
    closeMovieModal();
    toggleBackDrop();
    clearUserInputs();
};

const backDropHandler = () => {
    closeMovieModal();
    clearUserInputs();
    closeDeleteMovieModal();
    toggleBackDrop();
};

const clearUserInputs = () => {
    for (const input of userInputs) {
        input.value = '';
    }
};

const updateUI = () => {
    if (movies.length === 0) {
        entryText.style.display = 'block';
    } else {
        entryText.style.display = 'none';
    }
};

const showDeleteMovieModal = () => {
    deleteMovieModal.classList.add('visible');
};

const closeDeleteMovieModal = () => {
    deleteMovieModal.classList.remove('visible');
};

const deleteMovie = (movieId) => {
    showDeleteMovieModal();
    toggleBackDrop();
    let confirmDeletemovieButton = deleteMovieModal.querySelector(
        '.btn--danger'
    );
    confirmDeletemovieButton.replaceWith(
        confirmDeletemovieButton.cloneNode(true)
    );
    confirmDeletemovieButton = deleteMovieModal.querySelector('.btn--danger');
    confirmDeletemovieButton.addEventListener('click', () => {
        if (movieId !== null) confirmDeleteMovie(movieId);
        closeDeleteMovieModal();
        toggleBackDrop();
    });
};

const confirmDeleteMovie = (movieId) => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    if (movieList.children[movieIndex] !== null)
        movieList.children[movieIndex].remove();
    updateUI();
};
const renderMovieList = (movie) => {
    const newElement = document.createElement('li');
    newElement.className = 'movie-element';
    newElement.innerHTML = `
        <div class = "movie-element__image">
            <img src = ${movie['image']} alt = ${movie['title']}>
        </div>
        <div class = "movie-element__info">
            <h2>${movie['title']}</h2>
            <p>${movie['rating']}/5 Stars</p>
        </div>
    `;
    movieList.append(newElement);
    newElement.addEventListener('click', deleteMovie.bind(null, movie['id']));
};

const confirmAddMovie = () => {
    const titleValue = userInputs[0].value;
    const urlImageValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (titleValue.trim() === '') {
        alert('Please enter valid title!');
        return;
    } else if (urlImageValue.trim() === '') {
        alert('Please enter vald image url');
        return;
    } else if (parseInt(ratingValue) > 5 || parseInt(ratingValue) < 0) {
        alert('Please enter rating between 0 to 5');
        return;
    }
    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: urlImageValue,
        rating: ratingValue,
    };

    movies.push(newMovie);
    updateUI();
    closeMovieModal();
    toggleBackDrop();
    clearUserInputs();
    renderMovieList(newMovie);
};

const cancelDeleteMovie = () => {
    closeDeleteMovieModal();
    toggleBackDrop();
};
startAddMovieButton.addEventListener('click', showMovieModal);
backDrop.addEventListener('click', backDropHandler);
cancelAddMovieModalButton.addEventListener('click', cancelAddMovie);
confirmAddMovieButton.addEventListener('click', confirmAddMovie);
cancelDeleteMovieButton.addEventListener('click', cancelDeleteMovie);
