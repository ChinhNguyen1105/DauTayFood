// src/context/ThemeProvider.js
import { useState, useEffect } from "react";
import ThemeContext from "./ThemeContext";
function ThemeProvider({ children }) {
    // Lấy theme từ localStorage hoặc mặc định là 'light'
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    // useEffect này sẽ xử lý việc thêm/xóa class 'dark' trên <html>
    useEffect(() => {
        console.log("Theme hiện tại:", theme);
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
export default ThemeProvider;