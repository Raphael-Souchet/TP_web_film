const API_KEY = '72c35ea3313374128a26f3528c1b14ec';

async function chargerTendances(periode) {
    const reponse = await fetch('https://api.themoviedb.org/3/trending/movie/' + periode + '?api_key=' + API_KEY + '&language=fr-FR');
    const donnees = await reponse.json();
    const grille = document.querySelector('#tendances .movie-grid');
    grille.innerHTML = '';

    const films = donnees.results.slice(0, 4);

    films.forEach(film => {
        const article = document.createElement('article');
        article.classList.add('movie-card');

        const image = 'https://image.tmdb.org/t/p/w500' + film.poster_path;
        const note = Math.round(film.vote_average * 10);
        const date = new Date(film.release_date).toLocaleDateString('fr-FR');

        article.innerHTML = `
            <div class="poster-placeholder" style="background-image: url('${image}'); background-size: cover; background-position: center;">
                <div class="rating">${note}%</div>
            </div>
            <h3>${film.title}</h3>
            <p class="date">${date}</p>
        `;
        grille.appendChild(article);
    });
}

const boutonAujourdhui = document.querySelectorAll('#tendances .filter-btn')[0];
const boutonSemaine = document.querySelectorAll('#tendances .filter-btn')[1];

boutonAujourdhui.addEventListener('click', () => {
    boutonAujourdhui.classList.add('active');
    boutonSemaine.classList.remove('active');
    chargerTendances('day');
});

boutonSemaine.addEventListener('click', () => {
    boutonSemaine.classList.add('active');
    boutonAujourdhui.classList.remove('active');
    chargerTendances('week');
});


async function chargerFilms(critere) {
    const reponse = await fetch('https://api.themoviedb.org/3/movie/' + critere + '?api_key=' + API_KEY + '&language=fr-FR');
    const donnees = await reponse.json();
    const grille = document.querySelector('#films .movie-grid');
    grille.innerHTML = '';

    const films = donnees.results.slice(0, 4);

    films.forEach(film => {
        const article = document.createElement('article');
        article.classList.add('movie-card');

        const image = 'https://image.tmdb.org/t/p/w500' + film.poster_path;
        const note = Math.round(film.vote_average * 10);
        const date = new Date(film.release_date).toLocaleDateString('fr-FR');

        article.innerHTML = `
            <div class="poster-placeholder" style="background-image: url('${image}'); background-size: cover; background-position: center;">
                <div class="rating">${note}%</div>
            </div>
            <h3>${film.title}</h3>
            <p class="date">${date}</p>
        `;
        grille.appendChild(article);
    });
}

const boutonFilmsPopulaires = document.querySelectorAll('#films .filter-btn')[0];
const boutonFilmsMieuxNotes = document.querySelectorAll('#films .filter-btn')[1];

boutonFilmsPopulaires.addEventListener('click', () => {
    boutonFilmsPopulaires.classList.add('active');
    boutonFilmsMieuxNotes.classList.remove('active');
    chargerFilms('popular');
});

boutonFilmsMieuxNotes.addEventListener('click', () => {
    boutonFilmsMieuxNotes.classList.add('active');
    boutonFilmsPopulaires.classList.remove('active');
    chargerFilms('top_rated');
});


async function chargerSeries(critere) {
    const reponse = await fetch('https://api.themoviedb.org/3/tv/' + critere + '?api_key=' + API_KEY + '&language=fr-FR');
    const donnees = await reponse.json();
    const grille = document.querySelector('#series .movie-grid');
    grille.innerHTML = '';

    const series = donnees.results.slice(0, 4);

    series.forEach(serie => {
        const article = document.createElement('article');
        article.classList.add('movie-card');

        const image = 'https://image.tmdb.org/t/p/w500' + serie.poster_path;
        const note = Math.round(serie.vote_average * 10);
        const date = new Date(serie.first_air_date).toLocaleDateString('fr-FR');

        article.innerHTML = `
            <div class="poster-placeholder" style="background-image: url('${image}'); background-size: cover; background-position: center;">
                <div class="rating">${note}%</div>
            </div>
            <h3>${serie.name}</h3>
            <p class="date">${date}</p>
        `;
        grille.appendChild(article);
    });
}

const boutonSeriesPopulaires = document.querySelectorAll('#series .filter-btn')[0];
const boutonSeriesMieuxNotees = document.querySelectorAll('#series .filter-btn')[1];

boutonSeriesPopulaires.addEventListener('click', () => {
    boutonSeriesPopulaires.classList.add('active');
    boutonSeriesMieuxNotees.classList.remove('active');
    chargerSeries('popular');
});

boutonSeriesMieuxNotees.addEventListener('click', () => {
    boutonSeriesMieuxNotees.classList.add('active');
    boutonSeriesPopulaires.classList.remove('active');
    chargerSeries('top_rated');
});


chargerTendances('day');
chargerFilms('popular');
chargerSeries('popular');