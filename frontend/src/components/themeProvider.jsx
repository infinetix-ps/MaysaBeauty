// import React, { useState, useEffect, createContext, useContext } from "react";

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//     const [theme, setTheme] = useState(() => {
//         const storedTheme = localStorage.getItem("theme");
//         if (storedTheme) return storedTheme;
//         // Default to system preference
//         return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
//     });

//     useEffect(() => {
//         document.documentElement.className = theme;
//         localStorage.setItem("theme", theme);
//     }, [theme]);

//     const toggleTheme = () => {
//         setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
//     };

//     return (
//         <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
//             {children}
//         </ThemeContext.Provider>
//     );
// };

// export const useTheme = () => useContext(ThemeContext);
