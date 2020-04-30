const GameDetail = (argument) => {
    document.getElementById("welcome-container").hidden = true;
    document.getElementById("select-box").hidden = true;
    document.getElementById('see-more-button').hidden = true;

    const preparePage = () => {
        let cleanedArgument = argument.replace(/\s+/g, "-");
        let articleContent = "";

        const fetchGame = (url, argument) => {
            let finalURL = url + argument;

            fetch(`${finalURL}`)
                .then((response) => response.json())
                .then((response) => {
                    let {
                        name,
                        released,
                        description
                    } = response;

                    let articleDOM = document.querySelector(".page-detail .article");

                    articleDOM.querySelector("h1.title").innerHTML = name;
                    articleDOM.querySelector("p.release-date span").innerHTML = released;
                    articleDOM.querySelector("p.description").innerHTML = description;
                });
        };

        fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
    };

    const render = () => {
        gameContent.innerHTML = `
        <section class="page-detail">
            <div class="article">
                <img class="main-img img-fluid mt-5 rounded" />
                <h1 class="title display-1 mt-5"></h1>
                <p class="font-weight-bold rating"><span class="ratings badge badge-danger p-2"></span><span
                        class="font-weight-normal"></span></p>
                <p class="font-weight-bold release-date mt-4">Release date: <span class="font-weight-normal"></span></p>
                <h1 class="mt-5 mb-3 text-danger">Description</h1>
                <p class="description mb-5 mt-4"></p>
                <h1 class="mt-5 mb-3 text-danger">Characteristics</h1>
                <p class="font-weight-bold developers">Developers: <span class="font-weight-normal"></span> </p>
                <p class="font-weight-bold tags">Tags: <span class="font-weight-normal"></span></p>
                <p class="font-weight-bold genres">Genres: <span class="font-weight-normal"></span></p>
                <p class="font-weight-bold publishers">Publishers: <span class="font-weight-normal"></span></p>
                <p class="font-weight-bold platforms-details">Platforms: <span class="font-weight-normal"></span></p>
                <h1 class="mt-5 text-danger">Website</h1>
                <p class="link mt-4"><a class="link-name"></a></p>
                <h1 class="mt-5 mb-3 text-danger">Buy</h1>
                <p class="link-stores mt-4 font-weight-bold"></p>
                <h1 class="mt-5 mb-3 text-danger">Trailer</h1>
                <video controls width="100%"></video>
                <h1 class="mt-5 mb-3 text-danger">Previews</h1>
                <div class="row screenshots"></div>
                <h1 class="mt-5 mb-3 text-danger">Similar Games</h1>
                <div class="row suggestions"></div>
                <h1 class="mt-5 mb-3 text-danger">Youtube</h1>
                <div class="youtube row"></div>
            </div>
        </section>
      `;

        preparePage();
    };

    render();
};

export default GameDetail;