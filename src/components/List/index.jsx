import React from "react";
import classNames from "classnames";

import Icon from "../Icon";
import "./List.scss";

function List({ items, isRemovable, onClickItem, remove, activeItem }) {
  return (
    <ul className="list">
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
              onClick={() => remove(item)}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export default List;
