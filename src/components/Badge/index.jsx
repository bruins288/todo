import React from "react";

import Icon from "../Icon";

import "./Badge.scss";

function Badge({ icons }) {
  const [selectedIcon, setSelectIcon] = React.useState(null);

  return (
    <div className="badge">
      {icons.map((icon) => (
        <Icon
          key={icon.id}
          iconFileName={icon.iconFileName}
          name={icon.name}
          onClick={() => setSelectIcon(icon.id)}
          className={selectedIcon === icon.id ? "active" : ""}
        />
      ))}
    </div>
  );
}

export default Badge;
