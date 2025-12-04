import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import IconTrash from './IconTrash';

describe('Componente IconTrash', () => {
  test('debe renderizar un SVG', () => {
    const { container } = render(<IconTrash />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('debe tener el atributo xmlns correcto', () => {
    const { container } = render(<IconTrash />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
  });

  test('debe usar el tamaño por defecto de 18', () => {
    const { container } = render(<IconTrash />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '18');
    expect(svg).toHaveAttribute('height', '18');
  });

  test('debe aceptar un tamaño personalizado', () => {
    const { container } = render(<IconTrash size={24} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
  });

  test('debe tener elementos polyline y path para el icono de papelera', () => {
    const { container } = render(<IconTrash />);
    const polyline = container.querySelector('polyline');
    const path = container.querySelector('path');
    expect(polyline).toBeInTheDocument();
    expect(path).toBeInTheDocument();
  });

  test('debe tener atributos de trazo correctos', () => {
    const { container } = render(<IconTrash />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('stroke-width', '2');
    expect(svg).toHaveAttribute('stroke-linecap', 'round');
  });
});
