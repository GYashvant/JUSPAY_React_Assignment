import React, { useRef, useState } from "react";
import CatSprite from "./CatSprite";

export default function PreviewArea({ actions, replayAction }) {
  const [position, setPosition] = useState({ x: 0, y: 0, rotation: 0 });
  const [color, setColor] = useState("#FFAB19");
  const [storeText, setStoreText] = useState('')

  const handleSwitchCase = (action, newPosition) => {
    let updatedAction = action
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
    switch (updatedAction) {
      case "move10Steps":
        newPosition.x += 10;
        return
      case "turn15DegreesLeft":
        newPosition.rotation -= 15;
        return
      case "turn15DegreesRight":
        newPosition.rotation += 15;
        return
      case "sayHello":
        setStoreText('Hello')
        return
      case "changeColor":
        newColor = newColor === "#FFAB19" ? "#0000FF" : "#FFAB19";
        return
      default:
        return
    }
  };

  const executeActions = (action, mode) => {
    let newPosition = { ...position };
    let newColor = color;
    mode === "REPLAY"
      ? handleSwitchCase(action, newPosition)
      : actions?.forEach((action) => {
          handleSwitchCase(action, newPosition);
        });
    setPosition(newPosition);
    setColor(newColor);
  };

  const replayNthAction = (n) => {
    if (n >=0 && n < actions.length) {
      const action = actions[n];
      executeActions(action, "REPLAY");
    }
  };

  return (
    <div className="flex-none h-full overflow-y-auto p-2">
      <CatSprite position={position} color={color} storeText={storeText}/>
      <button
        onClick={executeActions}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Execute Actions
      </button>
      <button
        onClick={() => replayNthAction(actions.length - 1)}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Replay Last Action
      </button>
    </div>
  );
}
