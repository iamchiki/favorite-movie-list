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
    }
}


// Event Listners

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

const movieListDiv = document.getElementById('movie-list')

movieListDiv.addEventListener('click', (e) => {
    console.log(e.target);
});

const displayBtn = document.getElementById('display-movie');

displayBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('display button');
});