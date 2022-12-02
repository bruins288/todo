import React from "react";

import "./Icon.scss";

function Icon({ iconFileName, name, className, onClick }) {
  return (
    <picture className="iconTasks">
      <source
        srcSet={require(`../../assets/icons/${iconFileName}`)}
        type="image/webp"
      />
      <img
        src={require(`../../assets/icons/${iconFileName}`)}
        alt={`${name} иконка`}
        onClick={onClick}
        className={className}
      />
    </picture>
  );
}

export default Icon;
