import React from "react";

import Icon from "../Icon";

import "./Badge.scss";

function Badge({ icons, selected, setSelect }) {
  return (
    <div className="badge">
      {icons.map((icon) => (
        <Icon
          key={icon.id}
          iconFileName={icon.iconFileName}
          name={icon.name}
          onClick={() => setSelect(icon.id)}
          className={selected === icon.id ? "active" : ""}
        />
      ))}
    </div>
  );
}

export default Badge;
