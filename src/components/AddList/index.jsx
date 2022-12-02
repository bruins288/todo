import React from "react";

import List from "../List";
import Badge from "../Badge";
import Icon from "../Icon";

import "./AddList.scss";

function AddList() {
  const [visiblePopup, setVisiblePopup] = React.useState(false);
  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(true)}
        items={[
          {
            id: 1,
            name: "Добавить список",
            iconFileName: "add.png",
            className: "list__addText",
          },
        ]}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <Icon
            iconFileName={"close.png"}
            name="закрытие списка"
            className="add-list__popup-close"
            onClick={() => setVisiblePopup(false)}
          />
          <input className="field" type="text" placeholder="названия списка" />
          <Badge
            icons={[
              { id: 1, iconFileName: "sports.png" },
              { id: 2, iconFileName: "cars.webp" },
              { id: 3, iconFileName: "hotel.webp" },
              { id: 4, iconFileName: "meet.webp" },
              { id: 5, iconFileName: "notes.webp" },
            ]}
          />
          <button className="button" type="button">
            Добавить
          </button>
        </div>
      )}
    </div>
  );
}

export default AddList;
