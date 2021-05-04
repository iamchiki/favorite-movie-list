// Movie Class

class Movie {
    constructor(name, director, year) {
        this.name = name;
        this.director = director;
        this.year = year;
    }

    addMovie() {

        const movieLIst = document.getElementById('movie-list');
        Movie.creatMovieInfo(movieLIst, this);
        this.addToLocalStorage();
    }

    addToLocalStorage() {

        let movies = Movie.getMovieList();
        if (movies == null) {
            movies = [];
        }
        movies.push(this);
        localStorage.setItem('movies', JSON.stringify(movies));
    }

    static getMovieList() {
        return JSON.parse(localStorage.getItem('movies'));
    }

    // create div element to display movie info
    static creatMovieInfo(elem, movie) {

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

        elem.append(movieDiv);
    }

    static displayMovies(movieArr) {

        const movieLIst = document.getElementById('movie-list');
        movieLIst.innerHTML = '';
        movieArr.forEach((movie) => {
            Movie.creatMovieInfo(movieLIst, movie);
        });
    }

    static deleteFromLocalStorage(elem) {

        let moviesArr = Movie.getMovieList();
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

    let moviList = Movie.getMovieList();
    Movie.displayMovies(moviList);
});