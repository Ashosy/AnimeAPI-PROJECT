const base_url = "https://api.jikan.moe/v3";
const animeContent = document.querySelector(".anime-details");

function searchAnime(event){

    event.preventDefault();

    const form = new FormData(this);
    const query = form.get("search");

    fetch(`${base_url}/search/anime?q=${query}&page=1`)
    .then(res=>res.json())
    .then(updateDom)
    .catch(err=>console.warn(err.message));
}

function updateDom(data){
    
   

    const searchResults = document.getElementById('search-results');

    const animeByCategories = data.results
        .reduce((acc, anime)=>{

            const {type} = anime;
            if(acc[type] === undefined) acc[type] = [];
            acc[type].push(anime);
            return acc;

        }, {});

        searchResults.innerHTML = Object.keys(animeByCategories).map(key=>{

            const animesHTML = animeByCategories[key]
            .sort((a,b)=>a.episodes-b.episodes)
            .map(anime=>{
                return `
                    <div class="card" style="width: 20rem;">
                        <img src="${anime.image_url}" class="card-img-top" alt="...">
                        
                        <div class="card-body">
                            <h5 class="card-title">${anime.title}</h5>
                           
                            <p>${anime.synopsis}</p>
                            <p class = "rate">Rating : ${anime.score}</p>
                           
                        </div>
                    </div>
                `
            }).join("");


            return `
                <section>
                    <h3>${key.toUpperCase()}</h3>
                    <div class="row">${animesHTML}</div>
                </section>
                <br>
            `
        }).join("");
}

// const form = new FormData(this);
// const query = form.get("search");


function getdetails(){
        // event.preventDefault();
        const form = new FormData();
        const query = form.get("search");

        // e.preventDefault();
        // let animeItem = e.target.parentElement.parentElement;
        fetch(`${base_url}/search/anime?q=${query}&page=1`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if(data.animesHTML){
                data.animesHTML.forEach(anime => {
                    html += `
                                    <div class = "anime-title" data-id = ${anime.title}>
                                        <button type = "button" class = "btn recipe-close-btn" id = "recipe-close-btn">
                                            <i class = "fas fa-times"></i>
                                        </button>
                                        <h2 class="title-det">Anime Title</h2>
                                        <h4 class="tit-det">Genre</h4><br>
                                        <p class="pip-det">Anime Description goes here</p>
                                    
                                    </div>
    `;});
         }
         animeContent.innerHTML = html;
            });
   
  
    // animeContent.parentElement.classList.add('showReviews');
}

function pageLoaded(){
    const form = document.getElementById('search_form');
    form.addEventListener("submit", searchAnime);
}


window.addEventListener("load", pageLoaded)