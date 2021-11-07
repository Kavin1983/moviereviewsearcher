const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const main = document.querySelector("main");

/*
byline: "A.O. SCOTT"
critics_pick: 0
date_updated: "2019-05-23 16:44:02"
display_title: "Avengers: Endgame"
headline: "‘Avengers: Endgame’ Review: The Real Heroes Were the Friends We Made Along the Way"
link: {type: 'article', url: 'https://www.nytimes.com/2019/04/23/movies/avengers-endgame-review.html', suggested_link_text: 'Read the New York Times Review of Avengers: Endgame'}
mpaa_rating: "PG-13"
multimedia:
height: 140
src: "https://static01.nyt.com/images/2019/04/23/arts/23avengers-hp-promo/23avengers-hp-promo-mediumThreeByTwo210-v5.jpg"
type: "mediumThreeByTwo210"
width: 210
[[Prototype]]: Object
opening_date: "2019-04-26"
publication_date: "2019-04-23"
summary_short: "Iron Man, Thor, the Hulk, Captain America and other stars settle scores, tie up loose ends and take a long victory lap in the final chapter of this cycle."

*/

const search = async function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  const input = await searchInput.value;
  const data = await fetch(
    `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${input}&api-key=KpgGE3OtrlIgjsgjNkmdte3GYHp6OL0s`
  )
    .then((res) => res.json())
    .then((res) => res.results);
  const lengthString = input
    ? `<span class="total-results">Total results: ${data.length}</span>`
    : "";
  const markup = data
    .map((e) => {
      const image = e?.multimedia?.src
        ? e?.multimedia?.src
        : "questionmark.png";
      return `
      <div class="movie">
          <div class="movie-info">
          <a class="title-link" target="_blank" href="${
            e.link.url
          }"><h2 class="movie-title">${e.display_title}</h2></a>
          <span class="movie-pub">${e.publication_date}</span>
          <h3 class="movie-headline">${e.headline}</h3>
          <p class="movie-summary-short">${e.summary_short}...</p>
          </div>
          <a href="${e.link.url}" class="movie-link" target="_blank">
              <img class="movie-img" src="${image}" alt="${
        e.display_title + "-image"
      }"/>
          </a>
      </div>
        `;
    })
    .join("");

  searchInput.value = "";
  searchInput.setAttribute("placeholder", input ? input : "Enter movie name");
  main.innerHTML = "";
  main.insertAdjacentHTML("afterbegin", lengthString);
  main.insertAdjacentHTML("beforeend", markup);
};

searchBtn.addEventListener("click", function (e) {
  search(e);
});

window.addEventListener("load", function (e) {
  search(e);
});
