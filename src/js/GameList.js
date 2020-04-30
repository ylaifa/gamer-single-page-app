const GameList = (argument = "") => {

    document.getElementById("select-box").hidden = true;
    const preparePage = () => {

        let cleanedArgument = argument.replace(/\s+/g, "-");
        let articles = "";

        const fetchList = (url, argument) => {
            let finalURL = url;
            if (argument) {
                finalURL = url + "?search=" + argument + "&page_size=9";
            }

            fetch(`${finalURL}`)
                .then((response) => response.json())
                .then((response) => {
                    console.log(response);
                    return response;
                })
                .then((response) => {
                    console.log(finalURL);
                    response.results.forEach((article) => {
                        articles += `
                  
                  <!-- Card Dark -->
                    <div class="card">

                        <!-- Card image -->
                         
                        <img class="card-img-top" src='${article.background_image}'width="130" height="150" />      
                  

                        <!-- Card content -->
                        <div class="card-body">

                            
                            <!-- Title -->
                            <h4 class="card-title">${article.name}</h4>
    
                            <!-- Link -->
                            <a href="#gamedetail/${article.id}" class=" d-flex justify-content-center">
                            <h5>Read more <i class="fas fa-angle-double-right"></i></h5>
                            </a>

                        </div>

                    </div>
                    <!-- Card Dark -->
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
    window.location.href = `#gamelist/?search=${inputGame}`;
};

document.getElementById("submit-search").addEventListener("click", requestGame);


export default GameList;