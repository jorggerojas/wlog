import React, { useState } from "react";

const Switch = () => {
  const [check, setCheck] = useState(false);
  const checked = () => {
    console.log(check);

    setCheck(!check);
  };
  return (
    <div className="mid">
      <label className="rocker rocker-small">
        <input type="checkbox" checked={check} onChange={checked} />
        <span className="switch-left">🌞</span>
        <span className="switch-right">🌚</span>
      </label>
    </div>
  );
};

export default Switch;
