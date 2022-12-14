import React from "react";
import classNames from "classnames";

import { Icon } from "../components";
import "./ListsSummer.scss";
import { calcPercent, getCountCompleted, addClassName } from "../utils.js";

function ListsSummer({ lists }) {
  const totalLists =
    lists &&
    lists.map((list) => {
      return {
        id: list.id,
        name: list.name,
        iconFileName: list.iconFileName,
        countTasks: list.tasks.length,
        completedTasks: getCountCompleted(list.tasks),
        className: addClassName(
          list.tasks.length,
          list.tasks,
          getCountCompleted,
          calcPercent
        ),
      };
    });
  return (
    <div className="summer">
      {lists ? (
        totalLists.map((list) => (
          <React.Fragment key={list.id}>
            <h2 className="summer__title">
              <Icon
                fileName={list.iconFileName.fileName}
                name={list.iconFileName.name}
                className="head-icon"
              />
              {list.name}
            </h2>
            <div className="summer_tasks">
              <table>
                <thead>
                  <tr>
                    <th>Количество задач</th>
                    <th>Выполнено</th>
                    <th>%</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{list.countTasks}</td>
                    <td>{list.completedTasks}</td>
                    <td className={classNames(list.className)}>
                      {calcPercent(list.countTasks, list.completedTasks)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </React.Fragment>
        ))
      ) : (
        <h1>Список отсутствует</h1>
      )}
    </div>
  );
}

export default ListsSummer;
