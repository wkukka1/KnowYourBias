import React from "react";
import Button from "./Button";
import "./Hero.css";

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
        <img src="./src/assets/news.png" alt="news" className="news"></img>
        <p>
          <span>
            KnowYourBias is a website that analyzes articles from a wide range
            of news sources to determine their political biases.
          </span>
          <span>
            {" "}
            It uses machine learning algorithms and human editors to provide
            users with an objective assessment of the article's political
            leanings.
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
          <button>Article Plaintext</button>
          <button>Article Link</button>
        </div>
        <h2>Paste Article Here:</h2>
        <h3></h3>
        <form>
          <textarea
            rows="5"
            cols="10"
            wrap="soft"
            type="text"
            id="pasted-article"
            name="article-contents"
          ></textarea>
          <input type="submit" value="Analyze"></input>
        </form>
      </div>

      <hr></hr>

      <div className="results">
        <div className="results-txt">
          <h1>Center Left</h1>
          <p>Blah blah blah</p>
        </div>

        <div id="carouselExampleCaptions" className="carousel slide">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="./src/assets/logo.png"
                className="d-block w-100"
                alt="..."
              ></img>
              <div className="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>
                  Some representative placeholder content for the first slide.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="./src/assets/logo.png"
                className="d-block w-100"
                alt="..."
              ></img>
              <div className="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>
                  Some representative placeholder content for the second slide.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="./src/assets/logo.png"
                className="d-block w-100"
                alt="..."
              ></img>
              <div className="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>
                  Some representative placeholder content for the third slide.
                </p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
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
            data-bs-target="#carouselExampleCaptions"
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
    </>
  );
}

export default Hero;
