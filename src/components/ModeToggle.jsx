import React, { useState, useEffect } from "react";

function ModeToggle() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    // Set background color: black for dark mode, white for light mode.
    document.body.style.backgroundColor = darkMode ? '#000000' : '#ffffff';
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
