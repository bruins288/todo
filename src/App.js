import React from "react";
import List from "./components/List/index.jsx";

function App() {
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          items={[
            { id: 1, name: "Все задачи", active: true },
            { id: 2, name: "Фронтенд" },
            { id: 3, name: "Фильмы и сериалы" },
            { id: 4, name: "Книги" },
            { id: 5, name: "Дети" },
            { id: 6, name: "Личное" },
          ]}
        />
      </div>
      <div className="todo__tasks"></div>
    </div>
  );
}

export default App;
