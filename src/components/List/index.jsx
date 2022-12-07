import React from "react";
import classNames from "classnames";
import axios from "axios";

import Icon from "../Icon";

import "./List.scss";

function List({ items, isRemovable, onClick, onRemove }) {
  const removeList = (item) => {
    if (window.confirm("Вы действительно хотите удалить список?")) {
      axios.delete("http://localhost:4000/lists/" + item.id);
      onRemove(item);
    }
  };

  return (
    <ul className="list" onClick={onClick}>
      {/* Указание ключа обязательно он указывает React какой конкретно элемент в случае
      необходимости нужно обновить или удалить, связано с virtual dom */}
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, { active: item.active })}
        >
          <Icon fileName={item.iconFileName.fileName} name={item.name} />
          <span>{item.name}</span>
          {isRemovable && (
            <Icon
              fileName={"close.png"}
              name="удаление"
              className="list__remove-icon"
              onClick={() => removeList(item)}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export default List;
