import React, { useState } from "react";
import CatSprite from "./CatSprite";
import Icon from "./Icon";

export default function PreviewArea(props) {
  const {
    actions,
    executeActions,
    position,
    setPosition,
    color,
    setColor,
    storeText,
    setStoreText,
    showCat,
  } = props;

  const replayNthAction = (n) => {
    if (n >= 0 && n < actions.length) {
      const action = actions[n];
      executeActions(action, "REPLAY");
    }
  };

  return (
    <div
      className="flex-none h-full overflow-y-auto p-2"
      style={{ width: "100%" }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={() => {
            if (actions.includes("when_flag_clicked")) executeActions();
          }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          style={{ display: "flex" }}
        >
          {"when"}
          <Icon name="flag" size={15} className="text-green-600 mx-2" />
          {"clicked"}
        </button>
        <button
          onClick={() => {
            setPosition({ x: 0, y: 0, rotation: 0 });
            setColor("#FFAB19");
            setStoreText("");
          }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          stop actions
        </button>
        <button
          onClick={() => replayNthAction(actions.length - 1)}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Replay Last Action
        </button>
      </div>

      {showCat ? (
        <CatSprite
          handleWhenCatSpriteClicked={() => {
            if (actions.includes("when_sprite_clicked")) executeActions();
          }}
          position={position}
          setPosition={setPosition}
          color={color}
          storeText={storeText}
        />
      ) : null}
    </div>
  );
}
