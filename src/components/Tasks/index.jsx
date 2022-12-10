import React from "react";
import axios from "axios";

import Icon from "../Icon";
import AddTaskForm from "./AddTaskForm";

import "./Tasks.scss";

function Tasks({ list, onEditTitle, onAddTask }) {
  const editTitle = () => {
    let newTitle = window.prompt("Название списка", list.name);
    if (newTitle) {
      axios
        .patch("http://localhost:4000/lists/" + list.id, {
          name: newTitle,
        })
        .then(() => onEditTitle(list.id, newTitle))
        .catch(() => {
          alert("Не удалось обновить название списка");
        });
    }
  };
  return (
    <div className="tasks">
      <h2 className="tasks__title">
        {list.name}
        <Icon
          fileName="edit.webp"
          name="редактировать"
          className="tasks__title__edit-icon"
          onClick={editTitle}
        />
      </h2>
      <div className="tasks__items">
        {!list.tasks.length && <h3>Задачи отсутствуют</h3>}
        {list.tasks.map((task) => (
          <div className="tasks__items-row" key={task.id}>
            <div className="checkbox">
              <input id={task.id} type="checkbox" />
              <label htmlFor={task.id}>
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
              </label>
            </div>
            <input type="text" defaultValue={task.text} />
          </div>
        ))}
        <div className="tasks-form">
          <AddTaskForm list={list} onAddTask={onAddTask} />
        </div>
      </div>
    </div>
  );
}

export default Tasks;
