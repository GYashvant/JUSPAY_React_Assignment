import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";

export default function App() {
  const [actions, setActions] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0, rotation: 0 });
  const [move, setMove] = useState({ x: 10, y: 10 });
  const [color, setColor] = useState("#FFAB19");
  const [storeText, setStoreText] = useState("");
  const [showCat, setShowCat] = useState(true);
  const [delay, setDelay] = useState(2);

  const handleSwitchCase = (action, newPosition) => {
    let updatedAction = action
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
    switch (updatedAction) {
      case "move10Steps":
        newPosition.x += 10;
        return;
      case "turn15DegreesLeft":
        newPosition.rotation -= 15;
        return;
      case "turn15DegreesRight":
        newPosition.rotation += 15;
        return;
      case "setXTo":
        newPosition.x += +move.x;
        return;
      case "setYTo":
        newPosition.y += +move.y;
        return;
      case "sayHello":
        setStoreText("Hello");
        return;
      case "sayHelloFor":
        let timer;
        setStoreText("Hello");
        clearTimeout(timer);
        setTimeout(() => {
          setStoreText("");
        }, delay * 1000);
        return;
      case "show":
        setShowCat(true);
        return;
      case "hide":
        setShowCat(false);
        return;
      case "changeColor":
        let newColor = color === "#FFAB19" ? "#0000FF" : "#FFAB19";
        setColor(newColor);
        return;
      default:
        return;
    }
  };

  const executeActions = (action, mode) => {
    let newPosition = { ...position };
    mode === "REPLAY"
      ? handleSwitchCase(action, newPosition)
      : actions?.forEach((action) => {
          handleSwitchCase(action, newPosition);
        });
    setPosition(newPosition);
  };

  const handleAction = (action) => {
    if (
      (action == "when_flag_clicked" ||
        action == "when_sprite_clicked" ||
        action === "when_space_key_pressed") &&
      actions?.length
    ) {
      setActions((prevActions) => [action, ...prevActions]);
    } else {
      setActions((prevActions) => [...prevActions, action]);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-blue-100 pt-6 font-sans">
        <div className="h-screen overflow-hidden flex flex-row">
          <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
            <Sidebar onAction={handleAction} />
            <MidArea
              actions={actions}
              setActions={setActions}
              onDropAction={handleAction}
              handleSwitchCase={handleSwitchCase}
              executeActions={executeActions}
              move={move}
              setMove={setMove}
              delay={delay}
              setDelay={setDelay}
            />
          </div>
          <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
            <PreviewArea
              actions={actions}
              handleSwitchCase={handleSwitchCase}
              executeActions={executeActions}
              position={position}
              setPosition={setPosition}
              color={color}
              setColor={setColor}
              storeText={storeText}
              setStoreText={setStoreText}
              showCat={showCat}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
