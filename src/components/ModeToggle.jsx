import React, { useState, useEffect } from "react";

function ModeToggle() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
    document.body.style.backgroundColor = darkMode ? '#121212' : '#ffffff'; // Change background color
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div className="mode-toggle">
      <label className="switch">
        <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        <span className="slider round"></span>
      </label>
    </div>
  );
}

export default ModeToggle;
