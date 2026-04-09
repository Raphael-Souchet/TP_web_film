class MovieApp {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.themoviedb.org/3';
        this.imgUrl = 'https://image.tmdb.org/t/p/w500';

        this.init();
    }

    init() {
        this.chargerSection('trending/movie/day', '#tendances .movie-grid');
        this.chargerSection('movie/popular', '#films .movie-grid');
        this.chargerSection('tv/popular', '#series .movie-grid');

        this.ecouterFiltres();
    }

    async chargerSection(endpoint, containerSelector) {
        try {
            const reponse = await fetch(`${this.baseUrl}/${endpoint}?api_key=${this.apiKey}&language=fr-FR`);
            const donnees = await reponse.json();

            const grille = document.querySelector(containerSelector);
            grille.innerHTML = '';

            const items = donnees.results.slice(0, 4);

            items.forEach(item => {
                const titre = item.title || item.name;
                const dateBrute = item.release_date || item.first_air_date;
                const date = dateBrute ? new Date(dateBrute).toLocaleDateString('fr-FR') : "Date inconnue";

                const image = item.poster_path
                    ? this.imgUrl + item.poster_path
                    : './assets/img/image_de_remplacement.png';

                const note = Math.round(item.vote_average * 10);

                const article = document.createElement('article');
                article.classList.add('movie-card');
                article.innerHTML = `
                <div class="poster-placeholder" style="background-image: url('${image}'); background-size: cover; background-position: center;">
                    <div class="rating">${note}%</div>
                </div>
                <h3>${titre}</h3>
                <p class="date">${date}</p>
            `;
                grille.appendChild(article);
            });
        } catch (erreur) {
            console.error(erreur);
        }
    }

    ecouterFiltres() {
        this.assignerFiltre('#tendances', (index) => index === 0 ? 'trending/movie/day' : 'trending/movie/week');
        this.assignerFiltre('#films', (index) => index === 0 ? 'movie/popular' : 'movie/top_rated');
        this.assignerFiltre('#series', (index) => index === 0 ? 'tv/popular' : 'tv/top_rated');
    }

    assignerFiltre(sectionId, endpointBuilder) {
        const boutons = document.querySelectorAll(`${sectionId} .filter-btn`);
        boutons.forEach((bouton, index) => {
            bouton.addEventListener('click', () => {
                document.querySelector(`${sectionId} .filter-btn.active`).classList.remove('active');
                bouton.classList.add('active');

                const nouvelEndpoint = endpointBuilder(index);
                this.chargerSection(nouvelEndpoint, `${sectionId} .movie-grid`);
            });
        });
    }
}

const monApp = new MovieApp('72c35ea3313374128a26f3528c1b14ec');