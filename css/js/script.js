class TMDBApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.themoviedb.org/3';
    }

    async fetchEndpoint(endpoint) {
        try {
            const reponse = await fetch(`${this.baseUrl}/${endpoint}?api_key=${this.apiKey}&language=fr-FR`);
            if (!reponse.ok) throw new Error(`Erreur API: ${reponse.status}`);
            return await reponse.json();
        } catch (erreur) {
            console.error(erreur);
            return null;
        }
    }
}

class UI {
    constructor() {
        this.imgUrl = 'https://image.tmdb.org/t/p/w500';
        this.defaultImage = './assets/img/image_de_remplacement.png';
    }

    formaterDate(dateString) {
        return dateString ? new Date(dateString).toLocaleDateString('fr-FR') : "Date inconnue";
    }

    afficherCartes(donneesItems, containerSelector) {
        const grille = document.querySelector(containerSelector);
        if (!grille) return;

        grille.innerHTML = '';

        const items = donneesItems.slice(0, 4);

        items.forEach(item => {
            const titre = item.title || item.name;
            const date = this.formaterDate(item.release_date || item.first_air_date);
            const image = item.poster_path ? this.imgUrl + item.poster_path : this.defaultImage;
            const note = Math.round(item.vote_average * 10);
            const type = item.title ? 'movie' : 'tv';

            const article = document.createElement('article');
            article.classList.add('movie-card');
            article.innerHTML = `
            <a href="details.html?id=${item.id}&type=${type}" style="text-decoration: none; color: inherit;">
                <div class="poster-placeholder" style="background-image: url('${image}'); background-size: cover; background-position: center;">
                    <div class="rating">${note}%</div>
                </div>
                <h3>${titre}</h3>
                <p class="date">${date}</p>
            </a>
            `;
            grille.appendChild(article);
        });
    }
}

class MovieApp {
    constructor(apiKey) {
        this.api = new TMDBApi(apiKey);
        this.ui = new UI();

        this.init();
    }

    init() {
        this.chargerSection('trending/movie/day', '#tendances .movie-grid');
        this.chargerSection('movie/popular', '#films .movie-grid');
        this.chargerSection('tv/popular', '#series .movie-grid');

        this.ecouterFiltres();
        this.ecouterRecherche();
    }

    async chargerSection(endpoint, containerSelector) {
        const donnees = await this.api.fetchEndpoint(endpoint);
        if (donnees && donnees.results) {
            this.ui.afficherCartes(donnees.results, containerSelector);
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

    ecouterRecherche() {
        const searchBtn = document.getElementById('search-btn');
        const searchInput = document.getElementById('search-input');

        const executerRecherche = () => {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `index.html?search=${encodeURIComponent(query)}`;
            }
        };

        searchBtn.addEventListener('click', executerRecherche);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') executerRecherche();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const monApp = new MovieApp('72c35ea3313374128a26f3528c1b14ec');
});