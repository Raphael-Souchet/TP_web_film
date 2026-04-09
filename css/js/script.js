const API_KEY = '72c35ea3313374128a26f3528c1b14ec';

async function chargerTendances() {
    const reponse = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY + '&language=fr-FR');
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

async function chargerFilms() {
    const reponse = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=' + API_KEY + '&language=fr-FR');
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

async function chargerSeries() {
    const reponse = await fetch('https://api.themoviedb.org/3/tv/popular?api_key=' + API_KEY + '&language=fr-FR');
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

chargerTendances();
chargerFilms();
chargerSeries();