import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";

export default function MidArea({
  actions,
  setActions,
  onDropAction,
  executeActions,
  move,
  setMove,
  delay,
  setDelay,
}) {
  const [{ isOver }, drop] = useDrop({
    accept: "BLOCK",
    drop: (item) => onDropAction(item.action),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleChangePosition = (val, action) => {
    if (action === "say_hello_for") {
      setDelay(val.target.value);
    } else if (action === "set_x_to") {
      setMove((prev) => ({ ...prev, x: +val.target.value }));
    } else {
      setMove((prev) => ({ ...prev, y: +val.target.value }));
    }
  };

  const handleRemoveAction = (action) => {
    let updatedAction = actions.filter((el) => el !== action);
    setActions(updatedAction);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.code === "Space" &&
        actions.includes("when_space_key_pressed")
      ) {
        executeActions();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [actions]);

  const handlevalue = (action) => {
    if (action === "say_hello_for") {
      return delay;
    } else if (action === "set_x_to") {
      return move.x;
    } else {
      return move.y;
    }
  };

  return (
    <div
      ref={drop}
      className={`flex-1 h-full overflow-y-auto p-4 ${
        isOver ? "bg-gray-100" : "bg-white"
      }`}
    >
      {actions?.map((action, index) => (
        <div
          key={index}
          className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm"
        >
          {["set_x_to", "set_y_to", "say_hello_for"].includes(action) ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                padding: "0px 10px",
              }}
            >
              <div className="flex cursor-pointer">
                <div onClick={() => executeActions(action)}> {action}</div>
                <input
                  type="number"
                  value={handlevalue(action)}
                  onChange={(e) => handleChangePosition(e, action)}
                  style={{
                    width: "auto",
                    padding: "10px",
                    height: "20px",
                    marginLeft: action === "say_hello_for" ? "4px" : "-15px",
                    marginRight: action === "say_hello_for" ? "4px" : "0px",
                    borderRadius: "50px",
                    color: "black",
                    textAlign: "center",
                  }}
                />
                {action === "say_hello_for" ? "sec" : null}
              </div>
              <div
                onClick={() => handleRemoveAction(action)}
                style={{ color: "black", fontWeight: "600" }}
              >
                X
              </div>
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                padding: "0px 10px",
              }}
            >
              <div
                className="cursor-pointer"
                onClick={() =>
                  action !== "when_space_key_pressed"
                    ? executeActions(action)
                    : null
                }
              >
                {" "}
                {action}
              </div>
              <div
                onClick={() => handleRemoveAction(action)}
                className="cursor-pointer"
                style={{ color: "black", fontWeight: "600" }}
              >
                X
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
