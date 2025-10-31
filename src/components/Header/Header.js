import React from 'react';
import { Link } from 'react-router-dom';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import './Header.css'; // Crearemos este archivo a continuación
import { SiReactivex } from "react-icons/si";

const Header = () => {
  // return (
  //   <header className="app-header">
  //     <h1>Mi Aplicación Modular</h1>
  //     <ThemeSwitcher/>
  //   </header>
  // );
  return (
    <header className="app-header">
      <div className="logo-nav">
        <h1 className="logo"><SiReactivex /></h1>
        <nav>
          {/* Usamos <Link> en lugar de <a href=""> */}
          <Link to="/">Inicio</Link>
          <Link to="/tareas">Tareas</Link>
          <Link to="/directorio">Directorio</Link>
        </nav>
      </div>
      <ThemeSwitcher />
    </header>
  );
};

export default Header;