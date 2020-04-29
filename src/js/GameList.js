const GameList = (argument = "") => {
    document.getElementById("select-box").hidden = true;
    const preparePage = () => {
        let cleanedArgument = argument.replace(/\s+/g, "-");
        let articles = "";

        const fetchList = (url, argument) => {
            let finalURL = url;
            if (argument) {
                finalURL = url + "?search=" + argument;
            }

            fetch(`${finalURL}`)
                .then((response) => response.json())
                .then((response) => {
                    response.results.forEach((article) => {
                        articles += `
                    <div class="cardGame">
                      <h1>${article.name}</h1>
                      <h2>${article.released}</h2>
                      <img src='${article.background_image}' alt=''width="130" height="150" />
                      <a href = "#gamedetail/${article.id}">${article.id}</a>
                    </div>
                  `;
                    });
                    document.querySelector(".page-list .articles").innerHTML = articles;
                });
        };

        fetchList("https://api.rawg.io/api/games", cleanedArgument);

    };

    const render = () => {
        gameContent.innerHTML = `
        <section class="page-list">
          <div class="articles">...loading</div>
        </section>
      `;

        preparePage();
    };

    render();
};

// Game Request By User

const requestGame = (e) => {
    const inputGame = document.getElementsByTagName("input")[0].value;
    GameList(inputGame);
    e.preventDefault();
};

document.getElementById("submit-search").addEventListener("click", requestGame);


export default GameList;