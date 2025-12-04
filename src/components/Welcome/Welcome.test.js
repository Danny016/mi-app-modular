import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Welcome from './Welcome';

describe('Componente Welcome', () => {
  test('debe renderizar el mensaje de bienvenida con el nombre', () => {
    render(<Welcome nombre="Juan" />);
    const titulo = screen.getByText(/Bienvenido, Juan!/i);
    expect(titulo).toBeInTheDocument();
  });

  test('debe renderizar el texto de descripción', () => {
    render(<Welcome nombre="Juan" />);
    const descripcion = screen.getByText(/Este es un ejemplo de componentes modularizados/i);
    expect(descripcion).toBeInTheDocument();
  });

  test('debe mostrar "Eres un Crack" cuando el nombre es "Desarrollador"', () => {
    render(<Welcome nombre="Desarrollador" />);
    const mensaje = screen.getByText(/Eres un Crack/i);
    expect(mensaje).toBeInTheDocument();
  });

  test('debe renderizar la imagen cuando el nombre es "Desarrollador"', () => {
    render(<Welcome nombre="Desarrollador" />);
    const imagen = screen.getByAltText('Mi Foto');
    expect(imagen).toBeInTheDocument();
    expect(imagen).toHaveAttribute('width', '200');
  });

  test('no debe renderizar la imagen cuando el nombre no es "Desarrollador"', () => {
    render(<Welcome nombre="Juan" />);
    const imagen = screen.queryByAltText('Mi Foto');
    expect(imagen).not.toBeInTheDocument();
  });

  test('debe tener un heading h2', () => {
    render(<Welcome nombre="Juan" />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
  });
});
