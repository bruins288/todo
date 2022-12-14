import React from "react";
import axios from "axios";

import { AddTask, Icon, Task } from "../components/";

import "./Tasks.scss";

function Tasks({
  list,
  onEditTitle,
  onAddTask,
  onRemoveTask,
  onEditTask,
  onCompletedTask,
}) {
  const [isLoading, setIsLoading] = React.useState(false);

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
  const addTask = (listId, inputValue) => {
    let newTask = {
      text: inputValue,
      listId: listId,
      completed: false,
    };
    setIsLoading(true);
    axios
      .post("http://localhost:4000/tasks", newTask)
      .then(({ data }) => {
        newTask.id = data.id;
        onAddTask(list.id, newTask);
      })
      .catch(() => {
        alert("Не удалось добавить задачу");
      })
      .finally(() => setIsLoading(false));
  };

  const removeTask = (taskId, listId) => {
    if (window.confirm("Вы действительно хотите удалить задачу?")) {
      setIsLoading(true);
      axios
        .delete("http://localhost:4000/tasks/" + taskId)
        .then(() => {
          onRemoveTask(taskId, listId);
        })
        .catch(() => alert("Не удалось удалить задачу"))
        .finally(() => setIsLoading(false));
    }
  };

  const editTask = (taskId, listId, textTask) => {
    setIsLoading(true);
    axios
      .patch("http://localhost:4000/tasks/" + taskId, { text: textTask })
      .then(() => {
        onEditTask(taskId, listId, textTask);
      })
      .catch(() => alert("Не удалось обновить задачу"))
      .finally(() => setIsLoading(false));
  };

  const completedTask = (taskId, listId, isCompleted) => {
    axios
      .patch("http://localhost:4000/tasks/" + taskId, {
        completed: isCompleted,
      })
      .then(() => {
        onCompletedTask(taskId, listId, isCompleted);
      })
      .catch(() => window.alert("Не удалось отметить задачу"));
  };

  return (
    <div className="tasks">
      <h2 className="tasks__title">
        <Icon
          fileName={list.iconFileName.fileName}
          name={list.iconFileName.name}
          className="head-icon"
        />
        {list.name}
        <Icon
          fileName="edit.webp"
          name="редактировать"
          className="edit-icon"
          onClick={editTitle}
        />
      </h2>
      <div className="tasks__items">
        {!list.tasks.length && <h3>Задачи отсутствуют</h3>}
        {list.tasks.map((task) => (
          <Task
            {...task}
            key={task.id}
            isLoading={isLoading}
            onRemove={removeTask}
            onEdit={editTask}
            onCompleted={completedTask}
          />
        ))}
        <div className="tasks-form">
          <AddTask
            key={list.id}
            list={list}
            addTask={addTask}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default Tasks;
