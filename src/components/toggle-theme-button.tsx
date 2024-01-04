"use client";
import { useTheme } from "next-themes";
import { FC } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

interface ToggleThemeButtonProps {}

const ToggleThemeButton: FC<ToggleThemeButtonProps> = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    <button onClick={toggleTheme}>
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default ToggleThemeButton;
