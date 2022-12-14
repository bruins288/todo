import React from "react";

import Icon from "../Icon";

import "./Task.scss";

function Task({
  id,
  text,
  listId,
  completed,
  isLoading,
  onRemove,
  onEdit,
  onCompleted,
}) {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [idToEdit, setIdToEdit] = React.useState(null);
  const [inputValue, setInputValue] = React.useState(text);
  const [isChecked, setIsChecked] = React.useState(completed);

  const handleEdit = () => {
    setIsEditMode(!isEditMode);
    setIdToEdit(id);
  };
  const handleCancel = () => {
    setIsEditMode(!isEditMode);
    setIdToEdit(null);
    setInputValue(text);
  };

  const handleRemove = () => {
    setIdToEdit(id);
    onRemove(id, listId);
  };
  const handleEditTask = () => {
    if (inputValue) {
      setIdToEdit(id);
      onEdit(id, listId, inputValue);
    }
    handleCancel();
  };

  const checkedCompleted = () => {
    setIsChecked(!isChecked);
    onCompleted(id, listId, !isChecked);
  };

  return (
    <div className="tasks-items-row">
      <div className="checkbox">
        <input
          id={id}
          type="checkbox"
          checked={isChecked}
          onChange={checkedCompleted}
        />
        <label htmlFor={id}>
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
      {isEditMode && idToEdit === id ? (
        isLoading ? (
          <span>Обновление...</span>
        ) : (
          <React.Fragment>
            <input
              type="text"
              defaultValue={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Icon
              fileName={"ok.webp"}
              name="подтвердить"
              className="ok-icon"
              onClick={handleEditTask}
            />
            <Icon
              fileName={"cancel.webp"}
              name="отменить"
              className="cancel-icon"
              onClick={handleCancel}
            />
          </React.Fragment>
        )
      ) : (
        <React.Fragment>
          {isLoading && idToEdit === id ? (
            <span>Удаление...</span>
          ) : (
            <React.Fragment>
              <span>{text}</span>
              <Icon
                fileName="edit.webp"
                name="редактировать"
                className="edit-icon"
                onClick={handleEdit}
              />
              <Icon
                fileName={"close.png"}
                name="удаление"
                className="remove-icon"
                onClick={handleRemove}
              />
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </div>
  );
}

export default Task;
