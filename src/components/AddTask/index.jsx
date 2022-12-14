import React from "react";

import AddItem from "../AddItem";

import "./AddTask.scss";

function AddTask({ list, addTask, isLoading }) {
  const [inputValue, setInputValue] = React.useState("");
  const [isVisibleForm, setIsVisibleForm] = React.useState(false);

  const toggleVisible = () => {
    setInputValue("");
    setIsVisibleForm(!isVisibleForm);
  };

  const handleAddTask = () => {
    if (inputValue) addTask(list.id, inputValue);
    setInputValue("");
    setIsVisibleForm(!isVisibleForm);
  };

  return (
    <React.Fragment>
      {!isVisibleForm ? (
        <AddItem onVisibleForm={toggleVisible} />
      ) : (
        <div className="tasks-form__block">
          <input
            className="field"
            type="text"
            placeholder="название задачи"
            defaultValue={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button
            disabled={isLoading}
            className="button"
            type="button"
            onClick={handleAddTask}
          >
            {isLoading ? "Добавление..." : "Добавить"}
          </button>
          <button
            disabled={isLoading}
            className="button-grey"
            type="button"
            onClick={toggleVisible}
          >
            Отмена
          </button>
        </div>
      )}
    </React.Fragment>
  );
}

export default AddTask;
