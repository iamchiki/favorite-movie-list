// Movie Class

class Movie {
    constructor(name, director, year) {
        this.name = name;
        this.director = director;
        this.year = year;
    }

    addMovie() {

        const movieLIst = document.getElementById('movie-list');

        const movieDiv = document.createElement('div');
        movieDiv.className = 'movie-info';
        movieDiv.innerHTML = `<h4>${this.name}</h4>`;

        const movieDtlDiv = document.createElement('div');
        movieDtlDiv.className = 'movie-dtl';
        movieDtlDiv.innerHTML = `<p>Directed By : ${this.director} | Releasd in : ${this.year}</p>`;

        const trashIcon = document.createElement('i');
        trashIcon.className = 'fas fa-trash-alt';
        movieDtlDiv.append(trashIcon);
        movieDiv.append(movieDtlDiv);

        movieLIst.append(movieDiv);
        this.addToLocalStorage();

    }

    addToLocalStorage() {

        let movies = JSON.parse(localStorage.getItem('movies'));

        if (movies == null) {
            movies = [];
        }
        movies.push(this);
        localStorage.setItem('movies', JSON.stringify(movies));
    }

    static displayMovies(movieArr) {

        const movieLIst = document.getElementById('movie-list');

        movieArr.forEach((movie) => {
            const movieDiv = document.createElement('div');
            movieDiv.className = 'movie-info';
            movieDiv.innerHTML = `<h4>${movie.name}</h4>`;

            const movieDtlDiv = document.createElement('div');
            movieDtlDiv.className = 'movie-dtl';
            movieDtlDiv.innerHTML = `<p>Directed By : ${movie.director} | Releasd in : ${movie.year}</p>`;

            const trashIcon = document.createElement('i');
            trashIcon.className = 'fas fa-trash-alt';
            movieDtlDiv.append(trashIcon);
            movieDiv.append(movieDtlDiv);

            movieLIst.append(movieDiv);
        });
    }

    static deleteFromLocalStorage(elem) {

        let moviesArr = JSON.parse(localStorage.getItem('movies'));

        moviesArr.forEach((movie, index) => {
            if (movie.name == elem.firstElementChild.innerText) {
                moviesArr.splice(index, 1);
            }
        });
        localStorage.setItem('movies', JSON.stringify(moviesArr));
    }
}


// Event Listners

// add movie
const addMovieBtn = document.getElementById('add-movie');

addMovieBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // console.log('submit button');

    const name = document.getElementById('name').value;
    const director = document.getElementById('director').value;
    const year = document.getElementById('year').value;

    const movie = new Movie(name, director, year);
    movie.addMovie();

});


// delete movie
const movieListDiv = document.getElementById('movie-list')

movieListDiv.addEventListener('click', (e) => {

    if (e.target.tagName === 'I') {
        e.target.closest('.movie-info').remove();
        Movie.deleteFromLocalStorage(e.target.closest('.movie-info'));
    }
});


// display movie list
const displayBtn = document.getElementById('display-movie');

displayBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let moviList = JSON.parse(localStorage.getItem('movies'));
    Movie.displayMovies(moviList);
});