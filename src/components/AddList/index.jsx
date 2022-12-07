import React from "react";

import List from "../List";
import Badge from "../Badge";
import Icon from "../Icon";

import "./AddList.scss";

import { getNewId } from "../../utils.js";

function AddList({ icons, onAdd, removeIcon }) {
  const [visiblePopup, setVisiblePopup] = React.useState(false);
  const [selectedIcon, setSelectedIcon] = React.useState(
    Array.isArray(icons) ? icons[0].id : null
  );
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    if (Array.isArray(icons)) setSelectedIcon(icons[0].id);
  }, [icons]);

  const newId = React.useMemo(() => {
    if (Array.isArray(icons)) getNewId(icons);
  }, [icons]);

  const onSelected = (id) => {
    setSelectedIcon(id);
  };

  const addList = () => {
    if (!inputValue) {
      alert("Введите название списка");
      return;
    }
    const iconFileName = icons
      .filter((icon) => icon.id === selectedIcon)
      .shift();

    onAdd({
      id: newId,
      name: inputValue,
      iconFileNameId: selectedIcon,
      iconFileName,
    });
    removeIcon(selectedIcon);
    onClose();
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
            Добавить
          </button>
        </div>
      )}
    </div>
  );
}

export default AddList;
