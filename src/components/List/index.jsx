import React from "react";

import "./List.scss";

function List({ items }) {
  return (
    <ul className="list">
      {items.map((item) => (
        <li key={item.id} className={item.active ? "active" : ""}>
          <picture className="iconTasks">
            <source
              srcSet={require(`../../assets/icons/${item.iconFileName}`)}
              type="image/webp"
            />
            <img
              src={require(`../../assets/icons/${item.iconFileName}`)}
              alt={`${item.name} иконка`}
            />
          </picture>
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  );
}

export default List;
