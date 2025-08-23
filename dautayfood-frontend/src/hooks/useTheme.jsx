import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme phải được dùng trong ThemeProvider");
    }
    return context;
};

export default useTheme;
