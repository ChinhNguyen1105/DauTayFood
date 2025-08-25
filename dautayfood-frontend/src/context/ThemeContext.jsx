import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Lấy theme từ localStorage hoặc mặc định là 'light'
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    // Mỗi khi theme thay đổi, cập nhật class trên <html> + lưu vào localStorage
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
