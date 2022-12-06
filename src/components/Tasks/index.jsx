import React from "react";

import Icon from "../Icon";

import "./Tasks.scss";

function Tasks() {
  return (
    <div className="tasks">
      <h2 className="tasks__title">
        Фронтенд
        <Icon
          iconFileName="edit.webp"
          name="редактировать"
          className="tasks__title__edit-icon"
        />
      </h2>
      <div className="tasks_items">
        <div className="checkbox">
          <input id="check" type="checkbox" />
          <label htmlFor="check"></label>
          <svg
            width="11"
            height="8"
            viewBox="0 0 11 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
              stroke="#000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Tasks;