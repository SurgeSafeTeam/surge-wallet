import { createContext, useContext } from "react";

// 创建一个上下文，默认值为 'light'
const ThemeContext = createContext("light");

const ThemeProvider = ({ children }) => {
  const theme = "dark"; // 这里我们设置主题为 'dark'
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

const ThemedButton = () => {
  const theme = useContext(ThemeContext); // 获取上下文的值

  return (
    <button
      className="rounded-xl px-6 py-2"
      style={{
        background: theme === "dark" ? "#333" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
      }}
    >
      Themed Button
    </button>
  );
};

export default function Test() {
  return (
    <div className="text-white">
      <ThemeProvider>
        <ThemedButton />
      </ThemeProvider>
    </div>
  );
}
