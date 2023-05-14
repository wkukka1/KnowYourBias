const BASE = "http://127.0.0.1:5000/";

function toggleArticleType(toggleType) {
  let inputDiv = document.getElementById("input");

  if (toggleType == "link") {
    inputDiv.innerHTML = `
    <div id="article-type">
      <h2>Paste Article Here:</h2>
      <button id="paste-article" onClick="toggleArticleType('article')">
        Article
      </button>
      <button class="selected-article" id="paste-link" onClick="toggleArticleType('link')">
        Link
      </button>
    </div>
      <input placeholder="Paste article URL here..." id="article-url" type="text" name="article-url">
      <br></br>
      <button id="analyze-button" class="analyze-button" onClick="submitArticleURL()" type="button" value="Analyze">Analyze</button>`;
  } else {
    inputDiv.innerHTML = `
    <div id="article-type">
      <h2>Paste Article Here:</h2>
      <button class="selected-article" id="paste-article" onClick="toggleArticleType('article')">
        Article
      </button>
      <button id="paste-link" onClick="toggleArticleType('link')">
        Link
      </button>
    </div>
    <textarea id="article-contents" type="textarea" name="article-contents"
      placeholder="Paste article content here..."
      rows={5}
      cols={10}
      wrap="soft"
      type="text"
      id="pasted-article"
      name="article-contents"
    ></textarea>
      <br></br>
      <button id="analyze-button" class="analyze-button" onClick="submitArticleContent()" type="button" value="Analyze">Analyze</button>`;
  }
}

function submitArticleURL() {
  const url = document.getElementById("article-url").value;
  document.getElementById("analyze-button").textContent = "Loading ...";

  fetch(`/articleurl/${url}`, {method: "POST"})
  .then(response => {console.log(response); return response.json();})
  .then(data => {
    console.log(data);
    renderResults();
    
    document.querySelector("#bias").textContent = data.bias.toUpperCase();

    if (data.bias == "right") {
      document.getElementById("bias-warning").textContent = "Right-wing articles may exhibit biases such as a tendency towards conservative or libertarian political values, a belief in limited government intervention in economic and social affairs, a focus on individualism and personal responsibility, and an emphasis on traditional social values. They may also display a preference for free market capitalism, a skepticism towards government regulation, and a belief in national exceptionalism. Right-wing articles may also tend to be critical of progressive movements and ideologies, such as feminism, environmentalism, and socialism, and may be supportive of a strong national defense and military presence. Additionally, some right-wing articles may promote conspiracy theories or engage in fear-mongering tactics, particularly with regard to issues such as immigration and crime.";
    }
    else if (data.bias == "left") {
      document.getElementById("bias-warning").textContent = "Left-wing articles may exhibit various biases towards progressive policies, such as increasing government intervention in the economy, promoting social justice, and prioritizing environmentalism. Left-wing articles may also be biased towards a collectivist perspective, emphasizing the importance of community and the greater good over individualism and personal responsibility. Additionally, left-wing articles may exhibit a bias towards marginalized groups, such as racial minorities, women, and LGBTQ+ individuals, often advocating for their rights and equality. It is important to note that not all left-wing articles exhibit these biases, and it is important to approach all articles critically and objectively.";
    }
    else {
      document.getElementById("bias-warning").textContent = "In general, center articles may exhibit biases such as confirmation bias, status quo bias, corporate bias, national bias, or sensationalism bias. When it comes to center-wing articles specifically, biases may include a preference for moderate political positions, a pro-business stance, a technocratic approach that prioritizes expertise, nationalistic tendencies, or confirmation bias. It's important to be aware of potential biases in any source of information and to approach them with a critical mindset in order to gain a more well-rounded understanding of a topic.";
    }

    for (let i = 0; i < data.opposingArticles.length; i++) {
        document.querySelector("#card-" + (i+1) + " a").setAttribute("href", data.opposingArticles[i][2]);
        document.querySelector("#card-" + (i+1) + " figure").setAttribute("data-category", data.opposingArticles[i][0]);
        document.querySelector("#card-" + (i+1) + " img").setAttribute("src", data.opposingArticles[i][3]);
        document.querySelector("#card-" + (i+1) + " h1").textContent = data.opposingArticles[i][1];
      }
    })
  .catch(error => console.error(error));
  document.getElementById("analyze-button").textContent = "Analyze";
};

function submitArticleContent() {
  const article = document.getElementById("article-contents").value;
  document.getElementById("analyze-button").textContent = "Loading ...";
  
  fetch(`/p/${article}`, {method: "POST"})
  .then(response => {console.log(response); return response.json();})
  .then(data => {
    console.log(data);
    renderResults();

    document.querySelector("#bias").textContent = data.bias.toUpperCase();
    for (let i = 0; i < data.opposingArticles.length; i++) {
      document.querySelector("#card-" + (i+1) + " a").setAttribute("href", data.opposingArticles[i][2]);
      document.querySelector("#card-" + (i+1) + " figure").setAttribute("data-category", data.opposingArticles[i][0]);
      document.querySelector("#card-" + (i+1) + " img").setAttribute("src", data.opposingArticles[i][3]);
      document.querySelector("#card-" + (i+1) + " h1").textContent = data.opposingArticles[i][1];
    }
  });
  document.getElementById("analyze-button").textContent = "Analyze";
}

function renderInput() {
  document.getElementById("input").innerHTML = `<div id="article-type">
  <h2>Paste Article Here:</h2>
  <button class="selected-article" id="paste-article" onClick="toggleArticleType('article')">
    Article
  </button>
  <button id="paste-link" onClick="toggleArticleType('link')">
    Link
  </button>
</div>
<textarea id="article-contents" type="textarea" name="article-contents"
  placeholder="Paste article content here..."
  rows={5}
  cols={10}
  wrap="soft"
  type="text"
  id="pasted-article"
  name="article-contents"
></textarea>
<br></br>
<button class="analyze-button" onClick="submitArticleContent()" type="button" value="Analyze">Analyze</button>`;
  document.getElementById('input').scrollIntoView({
    behavior: 'smooth'
    });
}
a = document.getElementById("get-started");
a.addEventListener('click', renderInput);

function renderResults() {
  document.getElementById("line-break").innerHTML = `<hr></hr>`
  document.getElementById("results").innerHTML = `<div class="results-txt">
  <h3>This article is: </h3>
  <h1 id="bias"></h1>
  <p id="bias-warning">Blah blah blah</p>
</div>

<div class="alternative-articles">
  <h2>Alternative Articles</h2>
  <div id="carouselExample" class="carousel slide">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <div class="d-block w-100">
          <div id="card-1" class="cards">
            <li class="cards__item">
              <a href="/" class="cards__item__link">
                <figure class="cards__item__pic-wrap" data-category="">
                  <img src="" alt="Article 1" class="cards__item__img" />
                </figure>
                <div class="cards__item__info">
                  <h1 id="first-article" class="cards__item__text__main"></h1>
                </div>
              </a>
            </li>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <div class="d-block w-100">
          <div id="card-2" class="cards">
            <li class="cards__item">
              <a href="/" class="cards__item__link">
                <figure class="cards__item__pic-wrap" data-category="">
                  <img src="" alt="Article 2" class="cards__item__img" />
                </figure>
                <div class="cards__item__info">
                  <h1 class="cards__item__text__main"></h1>
                </div>
              </a>
            </li>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <div class="d-block w-100">
          <div id="card-3" class="cards">
            <li class="cards__item">
              <a href="/" class="cards__item__link">
                <figure class="cards__item__pic-wrap" data-category="">
                  <img src="" alt="Article 3" class="cards__item__img" />
                </figure>
                <div class="cards__item__info">
                  <h1 class="cards__item__text__main">"</h1>
                </div>}
              </a>
            </li>
          </div>
        </div>
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExample"
      data-bs-slide="prev"
    >
      <span
        class="carousel-control-prev-icon"
        aria-hidden="true"
      ></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExample"
      data-bs-slide="next"
    >
      <span
        class="carousel-control-next-icon"
        aria-hidden="true"
      ></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</div>`;
document.getElementById('results').scrollIntoView({
  behavior: 'smooth'
  });
}
b = document.getElementById("analyze-button");
b.addEventListener('click', renderInput);