import React from "react";

interface IButton {
  text: string;
  selected: boolean;
}

export const Button = (props: IButton) => {
  const getStyle = () => {
    return `w-full py-2 ${
      !props.selected ? "hover:" : ""
    }bg-gray-700 font-bold text-center rounded"`;
  };
  return <button className={getStyle()}>{props.text}</button>;
};
