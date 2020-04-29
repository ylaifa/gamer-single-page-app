import moment from "moment";

const Home = (argument = "") => {

    let time = moment().format().slice(0, 10);
    let future_time = moment().add(1, 'years').format().slice(0, 10);

    const preparePage = () => {
        let articles = "";

        const fetchList = (url) => {
            let finalURL = url;

            console.log(finalURL);

            fetch(`${finalURL}`)
                .then((response) => response.json())
                .then((response) => {
                    console.log(response);
                    return response;
                })
                .then((response) => {
                    response.results.forEach((article) => {
                        articles += `
                  <div class="cardGame">
                    <h1>${article.name}</h1>
                    <h2>${article.released}</h2>
                    <a href = "#gamedetail/${article.id}">${article.id}</a>
                    <img src='${article.background_image}' alt=''width="130" height="150" />
                  </div>
                `;
                    });
                    document.querySelector(".page-list .articles").innerHTML = articles;
                });
        };

        fetchList(`https://api.rawg.io/api/games?dates=${time},${future_time}&ordering=-added`);
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


export default Home;