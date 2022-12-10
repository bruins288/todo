import React from "react";
import classNames from "classnames";
import axios from "axios";

import Icon from "../Icon";

import "./List.scss";

function List({
  items,
  isRemovable,
  onClick,
  onClickItem,
  onRemove,
  activeItem,
}) {
  const removeList = (item) => {
    if (window.confirm("Вы действительно хотите удалить список?")) {
      axios.delete("http://localhost:4000/lists/" + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };
  return (
    <ul className="list" onClick={onClick}>
      {/* Указание ключа обязательно он указывает React какой конкретно элемент в случае
      необходимости нужно обновить или удалить, связано с virtual dom */}
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, {
            active: activeItem && activeItem.id === item.id,
          })}
          onClick={onClickItem ? () => onClickItem(item) : null}
        >
          <Icon fileName={item.iconFileName.fileName} name={item.name} />
          <span>
            {item.name}
            {item.tasks && ` (${item.tasks.length})`}
          </span>
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
