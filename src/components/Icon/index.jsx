import React from "react";

import "./Icon.scss";

function Icon({ iconFileName, name, className, onClick }) {
  const srcDefault = "https://via.placeholder.com/25X25";

  return (
    <picture className="iconTasks">
      <source
        srcSet={
          iconFileName
            ? require(`../../assets/icons/${iconFileName}`)
            : srcDefault
        }
        type="image/webp"
      />
      <img
        src={
          iconFileName
            ? require(`../../assets/icons/${iconFileName}`)
            : srcDefault
        }
        alt={`${name} иконка`}
        title={`${name} иконка`}
        onClick={onClick}
        className={className}
      />
    </picture>
  );
}

export default Icon;
