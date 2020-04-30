import moment from "moment";

let pageSizeNumber = 9;

const Home = (platform = "") => {
    document.getElementById("select-box").hidden = false;
    console.log(platform)
    let time = moment().format().slice(0, 10);
    let future_time = moment().add(1, 'years').format().slice(0, 10);

    const preparePage = () => {
        let articles = "";

        const fetchList = (url) => {
            let finalURL = url;
            if (platform != "") {
                finalURL = url + "&platforms=" + platform;
            }

            fetch(`${finalURL}`)
                .then((response) => response.json())
                .then((response) => {
                    return response;
                })
                .then((response) => {
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

        fetchList(`https://api.rawg.io/api/games?dates=${time},${future_time}&ordering=-added&page_size=${pageSizeNumber}`);
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

// Select Platform
document.querySelector("select").addEventListener('change', (event) => {
    let platform = document.querySelector("select").value;
    Home(platform);
});

// See More Page Size

const pageSize = () => {
    if (pageSizeNumber < 18) {
        pageSizeNumber += 9;
        Home();
    } else {
        pageSizeNumber += 9;
        document.getElementById('see-more-button').hidden = true;
        Home();
    }
}

document.getElementById('see-more-button').addEventListener('click', pageSize)


export default Home;