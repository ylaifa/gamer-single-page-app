let pageSizeNumber = 9;

const GameList = (argument = "") => {

    document.getElementById("select-box").hidden = true;
    const preparePage = () => {

        let cleanedArgument = argument.replace(/\s+/g, "-");
        let articles = "";

        const fetchList = (url, argument) => {
            let finalURL = url;
            if (argument) {
                finalURL = url + "?search=" + argument + "&page_size=$" + pageSizeNumber;
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
    let inputGame = document.getElementsByTagName("input")[0].value;
    window.location.href = `#gamelist/?search=${inputGame}`;
};

document.getElementById("submit-search").addEventListener("click", requestGame);

// See More Page Size

const pageSize = () => {
    let inputGame = document.getElementsByTagName("input")[0].value;
    console.log(inputGame)
    if (pageSizeNumber < 18) {
        pageSizeNumber += 9;
        GameList(inputGame);
    } else {
        pageSizeNumber += 9;
        document.getElementById('see-more-button').hidden = true;
        GameList(inputGame);
    }
}

document.getElementById('see-more-button').addEventListener('click', pageSize)


export default GameList;