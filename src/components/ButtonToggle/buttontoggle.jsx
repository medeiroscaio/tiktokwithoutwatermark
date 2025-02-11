import React from "react";
import Switch from "react-switch";
import { useTheme } from "../../hooks/themecontext.jsx";
import { useState } from "react";

export const ButtonToggle = () => {
  const [checked, setChecked] = useState(false);
  const { toggleTheme } = useTheme();

  const handleToggle = (nextChecked) => {
    setChecked(nextChecked);
    toggleTheme();
  };

  return (
    <div>
      <label>
        <Switch onChange={handleToggle} checked={checked} />
      </label>
    </div>
  );
};
