import React from "react";
import Button from "./Button";
import CardItem from "./CardItem";
import "./Hero.css";

const BASE = "http://127.0.0.1:5000/";

function handleSubmiturl() {
  // event.preventDefault();

  fetch(BASE + "url", {
    method: "POST",
    body: JSON.stringify(FormData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function toggleInputType(toggleType) {
  let inputDiv = documnet.getElementById("input");
  let articlePasteButton = document.getElementById("paste-article");
  let linkPasteButton = document.getElementById("paste-link");

  if (toggleType == "link") {
    inputDiv.innerHTML = ``;
    articlePasteButton.style += "";
    linkPasteButton.style = "";
  } else {
    inputDiv.innerHTML = ``;
    articlePasteButton.style = "";
    linkPasteButton.style += "";
  }
}

function Hero() {
  return (
    <>
      <div className="hero-container">
        <div className="title">
          <img src="./src/assets/logo.png" alt="logo" className="logo"></img>
          <h1>KnowYourBias</h1>
        </div>
        <h2>Select what you would like to paste:</h2>
        <div className="hero-btns">
          <Button buttonStyle="btn--primary" buttonSize="btn--large">
            URL
          </Button>
          <Button buttonStyle="btn--primary" buttonSize="btn--large">
            Article
          </Button>
        </div>
        <p>
          <span>
            KnowYourBias is a website that analyzes articles from a wide range
            of news sources to determine their political biases.
          </span>
          <span>
            {" "}
            It uses machine learning algorithms to provide users with an
            objective assessment of the article's political leanings.
          </span>
          <span>
            The website aims to promote a more informed public discourse and
            encourage critical thinking in the consumption of online news.
          </span>
        </p>
      </div>

      <hr></hr>

      <div id="input">
        <div id="article-type">
          <h2>Paste Article Here:</h2>
          <button id="paste-article" onClick="toggleInputType()">
            Article
          </button>
          <button id="paste-link" onClick="toggleInputType()">
            Link
          </button>
        </div>
        <form onSubmit={handleSubmiturl}>
          <textarea
            placeholder="Paste article content here..."
            rows="5"
            cols="10"
            wrap="soft"
            type="text"
            id="pasted-article"
            name="article-contents"
          ></textarea>
          <br></br>
          <input type="submit" value="Analyze"></input>
        </form>
      </div>

      <hr></hr>

      <div className="results">
        <div className="results-txt">
          <h3>This article is: </h3>
          <h1>Center Left</h1>
          <p>Blah blah blah</p>
        </div>

        <div className="alternative-articles">
          <h2>Alternative Articles</h2>
          <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <CardItem
                  className="d-block w-100"
                  src="/src/assets/logo.png"
                  textMain="asdas"
                  textDesc="dasd."
                  label="Left"
                  path="/"
                ></CardItem>
              </div>
              <div className="carousel-item">
                <img src="..." className="d-block w-100" alt="..."></img>
              </div>
              <div className="carousel-item">
                <img src="..." className="d-block w-100" alt="..."></img>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
