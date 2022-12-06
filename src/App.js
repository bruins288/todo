import React from "react";

import List from "./components/List";
import AddList from "./components/AddList";
import Tasks from "./components/Tasks";

import DB from "./assets/data.json";
import { getNewId } from "./utils.js";

function App() {
  const [lists, setLists] = React.useState(
    DB.lists.map((item) => {
      item.iconFileName = DB.icons
        .filter((icon) => icon.id === item.iconId)
        .shift().iconFileName;
      return item;
    })
  );
  const [icons, setIcons] = React.useState(
    DB.icons.reduce((acc, icon) => {
      if (!DB.lists.some((list) => list.iconId === icon.id)) acc.push(icon);
      return acc;
    }, [])
  );

  const onAddList = (list) => {
    let newList = [...lists, list];
    setLists(newList);
  };
  const removeIcon = (iconId) => {
    let newIcons = [...icons].filter((icon) => icon.id !== iconId);
    setIcons(newIcons);
  };

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          items={[
            {
              id: 1,
              name: "Все задачи",
              iconFileName: "alltasks.png",
              active: true,
            },
          ]}
        />
        {/* только для булевых значений можно передать одно имя свойства 
          в хорошей практике ставится вниз после всех свойств значений*/}
        <List
          items={lists}
          onRemove={(item) => console.log(item)}
          isRemovable
        />
        <AddList
          icons={icons}
          newId={getNewId(lists)}
          onAdd={onAddList}
          removeIcon={removeIcon}
        />
      </div>
      <div className="todo__tasks">
        <Tasks />
      </div>
    </div>
  );
}

export default App;
