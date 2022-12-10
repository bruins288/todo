import React from "react";
import axios from "axios";

import { List, AddList, Tasks } from "./components";

function App() {
  const [lists, setLists] = React.useState(null);
  const [icons, setIcons] = React.useState(null);
  const [activeItem, setActiveItem] = React.useState(null);

  React.useEffect(() => {
    axios
      .get("http://localhost:4000/lists?_expand=iconFileName&_embed=tasks")
      .then(({ data }) => {
        setLists(data);
      });
    axios.get("http://localhost:4000/iconFileNames").then(({ data }) => {
      setIcons(data);
    });
  }, []);

  const onAddList = (list) => {
    let newList = [...lists, list];
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
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          items={[
            {
              id: 100,
              name: "Все задачи",
              iconFileName: { id: 100, fileName: "alltasks.png" },
              active: true,
            },
          ]}
        />
        {/* только для булевых значений можно передать одно имя свойства 
          в хорошей практике ставится вниз после всех свойств значений*/}
        {!Array.isArray(lists) ? (
          "Загрузка..."
        ) : (
          <List
            items={lists}
            onRemove={(id) => {
              let newList = lists.filter((item) => item.id !== id);
              setLists(newList);
            }}
            onClickItem={(item) => setActiveItem(item)}
            activeItem={activeItem}
            isRemovable
          />
        )}
        <AddList icons={icons} onAdd={onAddList} />
      </div>
      <div className="todo__tasks">
        {lists && activeItem && (
          <Tasks
            list={activeItem}
            onEditTitle={onEditListTitle}
            onAddTask={onAddTask}
          />
        )}
      </div>
    </div>
  );
}

export default App;
