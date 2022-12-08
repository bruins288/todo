import React from "react";
import axios from "axios";

import List from "../List";
import Badge from "../Badge";
import Icon from "../Icon";

import "./AddList.scss";

function AddList({ icons, onAdd, removeIcon }) {
  const [visiblePopup, setVisiblePopup] = React.useState(false);
  const [selectedIcon, setSelectedIcon] = React.useState(
    Array.isArray(icons) ? icons[0].id : null
  );
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    if (Array.isArray(icons)) setSelectedIcon(icons[0].id);
  }, [icons]);

  const onSelected = (id) => {
    setSelectedIcon(id);
  };

  const addList = () => {
    if (!inputValue) {
      alert("Введите название списка");
      return;
    }
    setIsLoading(true);
    axios
      .post("http://localhost:4000/lists", {
        name: inputValue,
        iconFileNameId: selectedIcon,
      })
      .then(({ data }) => {
        let iconFileName = icons
          .filter((icon) => icon.id === selectedIcon)
          .shift();
        let newList = { ...data, iconFileName };
        onAdd(newList);
        removeIcon(selectedIcon);
        onClose();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue("");
  };

  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(true)}
        items={[
          {
            id: 1,
            name: "Добавить список",
            iconFileName: { id: 1, fileName: "add.png" },
            className: "list__addText",
          },
        ]}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <Icon
            fileName={"close.png"}
            name="закрытие списка"
            className="add-list__popup-close"
            onClick={onClose}
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
              setSelect={onSelected}
            />
          )}
          <button className="button" type="button" onClick={addList}>
            {isLoading ? "Добавление..." : "Добавить"}
          </button>
        </div>
      )}
    </div>
  );
}

export default AddList;
