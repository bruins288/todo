import React from "react";

import "./Icon.scss";

function Icon({ fileName, name, className, onClick }) {
  const srcDefault = "https://via.placeholder.com/25X25";

  return (
    <picture className="iconTasks">
      <source
        srcSet={
          fileName ? require(`../../assets/icons/${fileName}`) : srcDefault
        }
        type="image/webp"
      />
      <img
        src={fileName ? require(`../../assets/icons/${fileName}`) : srcDefault}
        alt={`${name} иконка`}
        title={`${name}`}
        onClick={onClick}
        className={className}
      />
    </picture>
  );
}

export default Icon;
