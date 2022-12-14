import React from "react";
import { NavLink } from "react-router-dom";

import "./Home.scss";

function Home() {
  return (
    <article className="home">
      <h1>TODO Lists</h1>
      <p>
        Web приложение на ReactJS - библиотеки для создания пользовательских
        интерфейсов
      </p>
      <h2>Стек технологий</h2>
      <h3>Базовые технологии</h3>
      <dl>
        <dt>HTML5, CSS3, JavaScript, SCSS</dt>
        <dd>
          <strong>HTML</strong> (HyperText Markup Language, язык разметки
          гипертекста) это язык разметки, который используется для визуального и
          смыслового структурирования web контента. <strong>CSS</strong>
          (Cascading Style Sheets, каскадные таблицы стилей) это язык стилей с
          помощью которого придается стиль отображения HTML контента.
          <strong>JavaScript</strong> язык программирования, который позволяет
          создать динамически обновляемый контент. <strong>SCSS</strong>{" "}
          препроцессор - это программа, которой на вход дается код написанный на
          языке препроцессора, а на выходе получается CSS, на вход браузеру.
        </dd>
      </dl>
      <h3>Дополнительные библиотеки</h3>
      <dl>
        <dt>ReactJS, React Router DOM, Axios, Classnames</dt>
        <dd>
          <strong>ReactJS</strong> библиотека JavaScript с открытым кодом для
          создания внешних пользовательских интерфейсов.
          <strong>React Router DOM</strong> модуль узла, который предназначен
          для маршрутизации в веб-приложениях. <strong>Axios</strong>это
          JavaScript-библиотека, представляет собой HTTP-клиент, основанный на
          промисах и предназначенный для браузеров и для Node.js.
          <strong>Classnames</strong> библиотека для простого условного
          объединения имен классов.
        </dd>
      </dl>
      <NavLink to="/lists">Вход</NavLink>
    </article>
  );
}

export default Home;
