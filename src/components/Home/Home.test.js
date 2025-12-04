import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home.js';

describe('Componente Home', () => {
  test('debe renderizar el título principal', () => {
    render(<Home />);
    const titulo = screen.getByText('Bienvenido a la Aplicación de Demostración');
    expect(titulo).toBeInTheDocument();
  });

  test('debe renderizar el párrafo de descripción', () => {
    render(<Home />);
    const parrafo = screen.getByText(/Usa la navegación de arriba/i);
    expect(parrafo).toBeInTheDocument();
  });

  test('debe mencionar el Directorio de Usuarios en la descripción', () => {
    render(<Home />);
    const texto = screen.getByText(/Directorio de Usuarios/i);
    expect(texto).toBeInTheDocument();
  });

  test('debe mencionar la Lista de Tareas en la descripción', () => {
    render(<Home />);
    const texto = screen.getByText(/Lista de Tareas/i);
    expect(texto).toBeInTheDocument();
  });

  test('debe tener un heading h2 con el título', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
  });
});
