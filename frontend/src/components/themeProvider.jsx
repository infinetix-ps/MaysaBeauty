import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const isDark = localStorage.getItem('theme') === 'dark';
        setIsDarkMode(isDark);
        document.documentElement.classList.toggle('dark', isDark);
    }, []);

    const toggleTheme = () => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        setIsDarkMode(!isDarkMode);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-200"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
            {isDarkMode ? (
                <Sun className="w-5 h-5" />
            ) : (
                <Moon className="w-5 h-5" />
            )}
        </motion.button>
    );
};

export default ThemeToggle;