import React from "react";
import { useDrag } from "react-dnd";
import { ACTIONS_BLOCK } from "../constants";

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
      {ACTIONS_BLOCK.map((el, index) => (
        <React.Fragment key={index}>
          {el.action === action ? el.display : null}
        </React.Fragment>
      ))}
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
      <Block action="when_space_key_pressed" onBlockClick={handleBlockClick} />
      <div className="font-bold">{"Motion"}</div>
      <Block action="move_10_steps" onBlockClick={handleBlockClick} />
      <Block action="turn_15_degrees_left" onBlockClick={handleBlockClick} />
      <Block action="turn_15_degrees_right" onBlockClick={handleBlockClick} />
      <Block action="set_x_to" onBlockClick={handleBlockClick} />
      <Block action="set_y_to" onBlockClick={handleBlockClick} />
      <div className="font-bold">{"looks"}</div>
      <Block action="change_color" onBlockClick={handleBlockClick} />
      <Block action="say_hello" onBlockClick={handleBlockClick} />
      <Block action="say_hello_for" onBlockClick={handleBlockClick} />
      <Block action="show" onBlockClick={handleBlockClick} />
      <Block action="hide" onBlockClick={handleBlockClick} />
    </div>
  );
}
