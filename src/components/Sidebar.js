import React from "react";
import { useDrag } from "react-dnd";
import Icon from "./Icon";

const Block = ({ action, onBlockClick }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "BLOCK",
    item: { action },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer ${
        isDragging ? "opacity-50" : ""
      }`}
      onClick={() => onBlockClick(action)}
    >
      {action === "when_flag_clicked" ? (
        <>
          {"When "}
          <Icon name="flag" size={15} className="text-green-600 mx-2" />
          {"clicked"}
        </>
      ) : action === "when_sprite_clicked" ? (
        "When this sprite clicked"
      ) : action === "move_10_steps" ? (
        "Move 10 steps"
      ) : action === "turn_15_degrees_left" ? (
        <>
          {"Turn "}
          <Icon name="undo" size={15} className="text-white mx-2" />
          {"15 degrees"}
        </>
      ) : action === "turn_15_degrees_right" ? (
        <>
          {"Turn "}
          <Icon name="redo" size={15} className="text-white mx-2" />
          {"15 degrees"}
        </>
      ) : action === "change_color" ? (
        "Change color"
      ) : action === "say_hello" ? (
        "sayHello"
      ) : null}
    </div>
  );
};

export default function Sidebar({ onAction }) {
  const handleBlockClick = (action) => {
    onAction(action);
  };

  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold">{"Events"}</div>
      <Block action="when_flag_clicked" onBlockClick={handleBlockClick} />
      <Block action="when_sprite_clicked" onBlockClick={handleBlockClick} />
      <div className="font-bold">{"Motion"}</div>
      <Block action="move_10_steps" onBlockClick={handleBlockClick} />
      <Block action="turn_15_degrees_left" onBlockClick={handleBlockClick} />
      <Block action="turn_15_degrees_right" onBlockClick={handleBlockClick} />
      <div className="font-bold">{"looks"}</div>
      <Block action="change_color" onBlockClick={handleBlockClick} />
      <Block action="say_hello" onBlockClick={handleBlockClick} />
    </div>
  );
}
