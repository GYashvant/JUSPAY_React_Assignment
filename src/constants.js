import React from "react";
import Icon from "./components/Icon";

export const ACTIONS_BLOCK = [
  {
    action: "when_flag_clicked",
    display: (
      <>
        {"When "}
        <Icon name="flag" size={15} className="text-green-600 mx-2" />
        {"clicked"}
      </>
    ),
  },
  { action: "when_sprite_clicked", display: "When this sprite clicked" },
  { action: "when_space_key_pressed", display: "When space key pressed" },
  { action: "move_10_steps", display: "Move 10 steps" },
  {
    action: "turn_15_degrees_left",
    display: (
      <>
        {"Turn "}
        <Icon name="undo" size={15} className="text-white mx-2" />
        {"15 degrees"}
      </>
    ),
  },
  {
    action: "turn_15_degrees_right",
    display: (
      <>
        {"Turn "}
        <Icon name="redo" size={15} className="text-white mx-2" />
        {"15 degrees"}
      </>
    ),
  },
  { action: "set_x_to", display: "Set x to" },
  { action: "set_y_to", display: "Set y to" },
  { action: "change_color", display: "Change color" },
  { action: "say_hello", display: "Say hello" },
  { action: "show", display: "Show" },
  { action: "hide", display: "Hide" },
  { action: "say_hello_for", display: "Say hello for" },
];
