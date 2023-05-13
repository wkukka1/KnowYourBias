import React from "react";
import { Link } from "react-router-dom";

interface Props {
  clsName: string;
  src: string;
  textMain: string;
  textDesc: string;
  label: string;
  path: string;
}

function CardItem({ clsName, src, textMain, textDesc, label, path }: Props) {
  return (
    <>
      <div className={clsName}></div>
      <li className="cards__item">
        <Link to={path} className="cards__item__link">
          <figure className="cards__item__pic-wrap" data-category={label}>
            <img src={src} alt="Videogame" className="cards__item__img" />
          </figure>
          <div className="cards__item__info">
            <h1 className="cards__item__text__main">{textMain}</h1>
            <h5 className="cards__item__text__desc">{textDesc}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItem;
