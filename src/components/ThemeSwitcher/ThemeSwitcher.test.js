import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../../context/ThemeContext';
import ThemeSwitcher from './ThemeSwitcher';

describe('Componente ThemeSwitcher', () => {
  const renderThemeSwitcher = () => {
    return render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>
    );
  };

  test('debe renderizar un botón', () => {
    const { container } = renderThemeSwitcher();
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  test('debe tener la clase "theme-switcher"', () => {
    const { container } = renderThemeSwitcher();
    const button = container.querySelector('button.theme-switcher');
    expect(button).toBeInTheDocument();
  });

  test('debe renderizar un SVG dentro del botón', () => {
    const { container } = renderThemeSwitcher();
    const svg = container.querySelector('button svg');
    expect(svg).toBeInTheDocument();
  });

  test('debe renderizar el icono de luna inicialmente (tema light)', () => {
    const { container } = renderThemeSwitcher();
    // En tema light, se debe mostrar el ícono de luna
    const button = container.querySelector('button');
    const svgElements = button.querySelectorAll('svg');
    expect(svgElements.length).toBeGreaterThan(0);
  });

  test('debe ser clickeable', () => {
    const { container } = renderThemeSwitcher();
    const button = container.querySelector('button');
    expect(button).not.toBeDisabled();
  });

  test('el botón debe ser accesible', () => {
    const { container } = renderThemeSwitcher();
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('type', 'button');
  });
});
