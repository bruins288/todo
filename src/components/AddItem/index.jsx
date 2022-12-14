import React from "react";

import Icon from "../Icon";
import "./AddItem.scss";

function AddItem({ onVisibleForm }) {
  return (
    <div className="add-item" onClick={onVisibleForm}>
      <Icon fileName="add.png" name="добавить" />
      <span>Добавить</span>
    </div>
  );
}

export default AddItem;
