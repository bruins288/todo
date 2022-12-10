import React from "react";
import axios from "axios";

import Icon from "../Icon";

function AddTaskForm({ list, onAddTask }) {
  const [visibleForm, setVisibleForm] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const toggleVisibleForm = () => {
    setVisibleForm(!visibleForm);
    setInputValue("");
  };
  const addTask = () => {
    let newTask = {
      text: inputValue,
      listId: list.id,
      completed: false,
    };
    axios
      .post("http://localhost:4000/tasks", newTask)
      .then(({ data }) => {
        newTask.id = data.id;
        onAddTask(list.id, newTask);
        toggleVisibleForm();
      })
      .catch(() => {
        alert("Не удалось добавить задачу");
      });
  };

  return (
    <React.Fragment>
      {!visibleForm ? (
        <div className="tasks-form__new" onClick={toggleVisibleForm}>
          <Icon
            fileName="add.png"
            name="добавить"
            className="tasks-form__addText"
          />
          <span>Добавить задачу</span>
        </div>
      ) : (
        <div className="tasks-form__block">
          <input
            className="field"
            type="text"
            placeholder="название задачи"
            defaultValue={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button className="button" type="button" onClick={addTask}>
            Добавить
          </button>
          <button
            className="button-grey"
            type="button"
            onClick={toggleVisibleForm}
          >
            Отмена
          </button>
        </div>
      )}
    </React.Fragment>
  );
}

export default AddTaskForm;
