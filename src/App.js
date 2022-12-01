import React from "react";

import allTasksWebp from "./assets/icons/iconalltasks.png";
import reactWebp from "./assets/icons/react.webp";
import filmsWebp from "./assets/icons/films.webp";

function App() {
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <ul className="todo__list">
          <li>
            <picture className="iconTasks">
              <source srcSet={allTasksWebp} type="image/webp" />
              <img src={allTasksWebp} alt="иконка всех задач" />
            </picture>
            <span>Все задачи</span>
          </li>
          <li>
            <picture className="iconTasks">
              <source srcSet={reactWebp} type="image/webp" />
              <img src={reactWebp} alt="иконка всех задач" />
            </picture>
            <span>Фронтенд</span>
          </li>
          <li>
            <picture className="iconTasks">
              <source srcSet={filmsWebp} type="image/webp" />
              <img src={filmsWebp} alt="иконка всех задач" />
            </picture>
            <span>Фильмы и сериалы</span>
          </li>
        </ul>
      </div>
      <div className="todo__tasks"></div>
    </div>
  );
}

export default App;
