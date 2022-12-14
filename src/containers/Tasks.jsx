import React from "react";

import todoAPI from "../dal/TodoAPI";
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

  const editTitle = async () => {
    let newTitle = window.prompt("Название списка", list.name);
    if (newTitle) {
      try {
        await todoAPI.patchTitle(list.id, newTitle);
        onEditTitle(list.id, newTitle);
      } catch (error) {
        window.alert("Не удалось обновить название списка " + error);
      }
    }
  };
  const addTask = async (listId, inputValue) => {
    let newTask = {
      text: inputValue,
      listId: listId,
      completed: false,
    };
    setIsLoading(true);
    try {
      const { data } = await todoAPI.postTask(newTask);
      newTask.id = data.id;
      onAddTask(list.id, newTask);
    } catch (error) {
      window.alert("Не удалось добавить задачу " + error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeTask = async (taskId, listId) => {
    if (window.confirm("Вы действительно хотите удалить задачу?")) {
      setIsLoading(true);
      try {
        await todoAPI.deleteTask(taskId);
        onRemoveTask(taskId, listId);
      } catch (error) {
        window.alert("Не удалось удалить задачу " + error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const editTask = async (taskId, listId, textTask) => {
    setIsLoading(true);
    try {
      await todoAPI.patchTask(taskId, { text: textTask });
      onEditTask(taskId, listId, textTask);
    } catch (error) {
      window.alert("Не удалось обновить задачу " + error);
    } finally {
      setIsLoading(false);
    }
  };

  const completedTask = async (taskId, listId, isCompleted) => {
    try {
      await todoAPI.patchTask(taskId, { completed: isCompleted });
      onCompletedTask(taskId, listId, isCompleted);
    } catch (error) {
      window.alert("Не удалось отметить задачу " + error);
    }
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
