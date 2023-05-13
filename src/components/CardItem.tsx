import React from "react";
import "./CardItem.css";

interface Props {
  src: string;
  textMain: string;
  textDesc: string;
  label: string;
  path: string;
}

function CardItem({ src, textMain, textDesc, label, path }: Props) {
  return (
    <>
      <div className="cards">
        <li className="cards__item">
          <a href={path} className="cards__item__link">
            <figure className="cards__item__pic-wrap" data-category={label}>
              <img src={src} alt="Videogame" className="cards__item__img" />
            </figure>
            <div className="cards__item__info">
              <h1 className="cards__item__text__main">{textMain}</h1>
              <h5 className="cards__item__text__desc">{textDesc}</h5>
            </div>
          </a>
        </li>
      </div>
    </>
  );
}

export default CardItem;
