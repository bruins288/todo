import React from "react";
import classNames from "classnames";

import Icon from "../Icon";

import "./List.scss";

function List({ items, isRemovable, onClick }) {
  return (
    <ul className="list" onClick={onClick}>
      {/* Указание ключа обязательно он указывает React какой конкретно элемент в случае
      необходимости нужно обновить или удалить, связано с virtual dom */}
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, { active: item.active })}
        >
          <Icon iconFileName={item.iconFileName} name={item.name} />
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  );
}

export default List;
