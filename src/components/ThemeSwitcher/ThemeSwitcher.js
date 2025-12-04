import React, { useContext } from 'react';
import ThemeContext from '../../context/ThemeContext'; // Importamos el contexto
import IconMoon from '../Icons/IconMoon'; // <-- Importar
import IconSun from '../Icons/IconSun';   // <-- Importar
import './ThemeSwitcher.css'; // Crearemos este archivo

const ThemeSwitcher = () => {
  // 3. Usamos el hook useContext para consumir el contexto
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button type="button" onClick={toggleTheme} className="theme-switcher">
      {theme === 'light' ? <IconMoon /> : <IconSun />}
    </button>
  );
};

export default ThemeSwitcher;