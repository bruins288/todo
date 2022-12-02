import React from "react";

import List from "./components/List";
import AddList from "./components/AddList";

function App() {
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
          /*только для булевых значений можно передать одно имя свойства 
          в хорошей практике ставится вниз после всех свойств значений*/
          isRemovable
        />
        <List
          items={[
            {
              id: 1,
              name: "Фронтенд",
              iconFileName: "react.webp",
              allTasksId: 1,
            },
            {
              id: 2,
              name: "Фильмы и сериалы",
              iconFileName: "films.webp",
              allTasksId: 1,
            },
            { id: 3, name: "Книги", iconFileName: "books.webp", allTasksId: 1 },
            { id: 4, name: "Дети", iconFileName: "childs.webp", allTasksId: 1 },
            {
              id: 5,
              name: "Личное",
              iconFileName: "personals.webp",
              allTasksId: 1,
            },
          ]}
          isRemovable
        />
        <AddList />
      </div>
      <div className="todo__tasks"></div>
    </div>
  );
}

export default App;
