import React from "react";

import Badge from "../Badge";
import Icon from "../Icon";

import "./AddList.scss";

function AddList({ icons, visibleForm, onVisibleForm, addItem, isLoading }) {
  const [selectedIcon, setSelectedIcon] = React.useState(
    Array.isArray(icons) ? icons[0].id : null
  );
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    if (Array.isArray(icons)) setSelectedIcon(icons[0].id);
  }, [icons]);

  return (
    <div className="add-list">
      {visibleForm && (
        <div className="add-list__popup">
          <Icon
            fileName={"close.png"}
            name="закрытие списка"
            className="popup-close"
            onClick={() => {
              onVisibleForm(false);
              setInputValue("");
            }}
          />
          <input
            className="field"
            type="text"
            placeholder="названия списка"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          {Array.isArray(icons) && (
            <Badge
              icons={icons}
              selected={selectedIcon}
              setSelect={setSelectedIcon}
            />
          )}
          <button
            disabled={isLoading}
            className="button"
            type="button"
            onClick={() => {
              addItem(inputValue, selectedIcon);
              setInputValue("");
            }}
          >
            {isLoading ? "Добавление..." : "Добавить"}
          </button>
        </div>
      )}
    </div>
  );
}

export default AddList;
