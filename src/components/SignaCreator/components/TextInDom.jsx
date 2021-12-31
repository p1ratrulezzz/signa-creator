import React from "react";
import Draggable from "react-draggable";

export const TextInDom = ({
  settings,
  index,
  handleDragStop,
  handleSelectText,
  selectKey
 }) => {
  const style = {
    fontSize: `${settings.fontSize}px`,
    color: `${settings.color}`,
    textShadow: `${settings.strokeColor} 1px 1px 0,
                ${settings.strokeColor} -1px -1px 0,
                ${settings.strokeColor} -1px 1px 0,
                ${settings.strokeColor} 1px -1px 0`,
    transform: `rotate(${settings.rotate}deg)`,
  };

  let activeClass = "";

  if (selectKey === index) {
    activeClass = "active";
  }

  return (
    <Draggable
      onStop={(e, pos) => handleDragStop(e, pos, index)}
      position={{ x: settings.pos.x, y: settings.pos.y }}
      defaultClassNameDragging="drag"
    >
      <div
        id={`text${index}`}
        onClick={() => handleSelectText(index)}
        className={`SignaCreator__textContent SignaCreator__textContent--v${index} ${activeClass}`}
      >
        <div className="SignaCreator__row" style={style}>
          <div className="SignaCreator__text">{settings.name}</div>
        </div>
      </div>
    </Draggable>
  );
}
