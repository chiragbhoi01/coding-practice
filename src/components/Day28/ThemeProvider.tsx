import { ReactNode, useState } from "react";
import { ThemeContext } from "./ThemeSwitcher";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme] = useState("light"); // abhi toggle nahi

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}
