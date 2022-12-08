import React from "react";
import axios from "axios";

import { List, AddList, Tasks } from "./components";

function App() {
  const [lists, setLists] = React.useState(null);
  const [icons, setIcons] = React.useState(null);

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

  const getRemainIcons = React.useMemo(() => {
    if (Array.isArray(lists) && Array.isArray(icons)) {
      return icons.reduce((acc, icon) => {
        if (!lists.some((list) => list.iconFileNameId === icon.id)) {
          acc.push(icon);
        }
        return acc;
      }, []);
    }
  }, [lists, icons]);

  const onAddList = (list) => {
    let newList = [...lists, list];
    setLists(newList);
  };
  const removeIcon = (iconFileNameId) => {
    let newIcons = [...icons].filter((icon) => icon.id !== iconFileNameId);
    setIcons(newIcons);
  };
  const addIcon = (icon) => {
    let newIcons = [...icons, icon];
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
              iconFileName: { id: 1, fileName: "alltasks.png" },
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
            addIcon={addIcon}
            isRemovable
          />
        )}
        <AddList
          icons={getRemainIcons}
          onAdd={onAddList}
          removeIcon={removeIcon}
        />
      </div>
      <div className="todo__tasks">
        {!Array.isArray(lists) ? "Загрузка.." : <Tasks list={lists[0]} />}
      </div>
    </div>
  );
}

export default App;
