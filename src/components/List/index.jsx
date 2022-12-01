import React from "react";

import allTasks from "../../assets/icons/iconalltasks.png";
import reactWebp from "../../assets/icons/react.webp";
import filmsWebp from "../../assets/icons/films.webp";
import booksWebp from "../../assets/icons/books.webp";
import childsWebp from "../../assets/icons/childs.webp";
import personalsWebp from "../../assets/icons/personals.webp";

import "./List.scss";

function List({ items }) {
  const getImageNameById = (id) => {
    switch (id) {
      case 1:
        return allTasks;
      case 2:
        return reactWebp;
      case 3:
        return filmsWebp;
      case 4:
        return booksWebp;
      case 5:
        return childsWebp;
      case 6:
        return personalsWebp;
      default:
        return "";
    }
  };
  return (
    <ul className="list">
      {items.map((item) => (
        <li key={item.id} className={item.active ? "active" : ""}>
          <picture className="iconTasks">
            <source srcSet={getImageNameById(item.id)} type="image/webp" />
            <img src={getImageNameById(item.id)} alt="иконка всех задач" />
          </picture>
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  );
}

export default List;
