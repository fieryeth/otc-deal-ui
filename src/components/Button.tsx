import React from "react";

interface IButton {
  text: string;
  selected: boolean;
  onClick: () => void;
}

export const Button = (props: IButton) => {
  const getStyle = () => {
    return `w-full py-2 ${
      !props.selected ? "hover:" : ""
    }bg-gray-700 font-bold text-center border border-purple-300 rounded"`;
  };
  return (
    <button className={getStyle()} onClick={props.onClick}>
      {props.text}
    </button>
  );
};
