import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Tasks from "../containers/Tasks.jsx";
import ListsBar from "../containers/ListsBar.jsx";
import ListsSummer from "../containers/ListsSummer.jsx";

function AppTodo() {
  const [lists, setLists] = React.useState(null);
  const [activeItem, setActiveItem] = React.useState(null);

  let params = useParams();

  React.useEffect(() => {
    axios
      .get("http://localhost:4000/lists?_expand=iconFileName&_embed=tasks")
      .then(({ data }) => {
        setLists(data);
      });
  }, []);

  React.useEffect(() => {
    if (lists) {
      let list = lists.find((list) => list.id === Number(params.id));
      setActiveItem(list);
    }
  }, [params, lists]);

  const onAddList = (list) => {
    let newList = [...lists, list];
    setLists(newList);
  };
  const onRemoveList = (id) => {
    let newList = lists.filter((item) => item.id !== id);
    setLists(newList);
  };
  const onEditListTitle = (id, title) => {
    const newList = lists.map((item) => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newList);
  };
  const onAddTask = (listId, newTask) => {
    let newLists = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, newTask];
      }
      return item;
    });
    setLists(newLists);
  };

  const onRemoveTask = (taskId, listId) => {
    let newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = item.tasks.filter((task) => task.id !== taskId);
      }
      return item;
    });
    setLists(newList);
  };

  const onEditTask = (taskId, listId, textTask) => {
    let newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = item.tasks.map((task) => {
          if (task.id === taskId) {
            task.text = textTask;
          }
          return task;
        });
      }
      return item;
    });
    setLists(newList);
  };

  const onCompletedTask = (taskId, listId, completedTask) => {
    let newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = item.tasks.map((task) => {
          if (task.id === taskId) {
            task.completed = completedTask;
          }
          return task;
        });
      }
      return item;
    });
    setLists(newList);
  };
  return (
    <React.Fragment>
      {Array.isArray(lists) ? (
        <ListsBar
          lists={lists}
          onAddList={onAddList}
          onRemoveList={onRemoveList}
          activeItem={activeItem}
        />
      ) : (
        "Загрузка..."
      )}
      {(lists && activeItem && (
        <Tasks
          list={activeItem}
          onEditTitle={onEditListTitle}
          onAddTask={onAddTask}
          onRemoveTask={onRemoveTask}
          onEditTask={onEditTask}
          onCompletedTask={onCompletedTask}
        />
      )) ||
        (lists && <ListsSummer lists={lists} />)}
    </React.Fragment>
  );
}

export default AppTodo;
