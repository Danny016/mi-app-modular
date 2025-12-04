import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Error404 from './Error404';

describe('Componente Error404', () => {
  test('debe renderizar el título "Error 404"', () => {
    render(<Error404 />);
    const titulo = screen.getByText('Error 404');
    expect(titulo).toBeInTheDocument();
  });

  test('debe renderizar el mensaje de página no encontrada', () => {
    render(<Error404 />);
    const mensaje = screen.getByText('Pagina no encontrada');
    expect(mensaje).toBeInTheDocument();
  });

  test('debe renderizar el componente dentro de un div con clase "error"', () => {
    const { container } = render(<Error404 />);
    const errorDiv = container.querySelector('.error');
    expect(errorDiv).toBeInTheDocument();
  });

  test('debe tener una estructura correcta con h2 y p', () => {
    render(<Error404 />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Error 404');
  });
});
