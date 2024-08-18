import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
const ThemeToggle = () => {
  // Ensure consistent theme case handling
  const storedTheme = localStorage.getItem('theme') || 'light';
  const [theme, setTheme] = useState(storedTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme.toLowerCase());
    localStorage.setItem('theme', theme.toLowerCase());
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <button onClick={toggleTheme} style={{ fontSize: '24px', cursor: 'pointer', background: 'none', border: 'none' }}>
      {theme === 'light' ? (
        <FontAwesomeIcon icon={faMoon} />
      ) : (
        <FontAwesomeIcon icon={faSun} />
      )}
    </button>
  );
};

export default ThemeToggle;