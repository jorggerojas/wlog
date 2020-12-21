import React from "react";

interface SwitchProps {
  check: boolean;
  checked: Function;
}

const Switch = ({ check, checked }: SwitchProps) => {
  const change = () => {
    checked(!check);
  };
  return (
    <div className="mid">
      <label className="rocker rocker-small">
        <input type="checkbox" checked={check} onChange={change} />
        <span className="switch-left">🌞</span>
        <span className="switch-right">🌚</span>
      </label>
    </div>
  );
};

export default Switch;
