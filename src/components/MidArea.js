import React from "react";
import { useDrop } from "react-dnd";

export default function MidArea({actions, onDropAction }) {
  const [{ isOver }, drop] = useDrop({
    accept: "BLOCK",
    drop: (item) => onDropAction(item.action),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`flex-1 h-full overflow-y-auto p-4 ${
        isOver ? "bg-gray-100" : "bg-white"
      }`}
    >
      {actions?.map((action, index) => (
        <div key={index} className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
          {action}
        </div>
      ))}
    </div>
  );
}

