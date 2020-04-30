import moment from "moment";

const Home = (argument = "") => {
    document.getElementById("select-box").hidden = false;
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

        fetchList(`https://api.rawg.io/api/games?dates=${time},${future_time}&ordering=-added&page_size=9`);
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

var x, i, j, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < selElmnt.length; j++) {
        /* For each option in the original select element,
        create a new DIV that will act as an option item: */
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function (e) {
            /* When an item is clicked, update the original select box,
            and the selected item: */
            var y, i, k, s, h;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            h = this.parentNode.previousSibling;
            for (i = 0; i < s.length; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    for (k = 0; k < y.length; k++) {
                        y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }
            h.click();
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
        /* When the select box is clicked, close any other select boxes,
        and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}

function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < x.length; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);

export default Home;