import React from "react";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <article className="home">
      <h1 style={{ textAlign: "center" }}>TODO Lists</h1>
      <p>
        Web приложение на базе ReactJS - библиотеки для создания
        пользовательских интерфейсов
      </p>
      <h2>Стек технологий</h2>
      <dl>
        <dt>HTML5</dt>
        <dd>
          HTML (HyperText Markup Language, язык разметки гипертекста) это язык
          разметки, который используется для визуального и смыслового
          структурирования нашего web контента.
        </dd>
        <dt>CSS3</dt>
        <dd>
          CSS (Cascading Style Sheets, каскадные таблицы стилей) это язык стилей
          с помощью которого придается стиль отображения нашего HTML контента.
        </dd>
        <dt>JavaScript</dt>
        <dd>
          JavaScript язык программирования, который позволяет создать
          динамически обновляемый контент, управляет мультимедиа, анимирует
          изображения, впрочем, делает всё, что угодно.
        </dd>
      </dl>

      <NavLink to="/lists">Начало</NavLink>
    </article>
  );
}

export default Home;
