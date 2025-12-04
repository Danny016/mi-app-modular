import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import IconMoon from './IconMoon';

describe('Componente IconMoon', () => {
  test('debe renderizar un SVG', () => {
    const { container } = render(<IconMoon />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('debe tener el atributo xmlns correcto', () => {
    const { container } = render(<IconMoon />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
  });

  test('debe usar el tamaño por defecto de 24', () => {
    const { container } = render(<IconMoon />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
  });

  test('debe aceptar un tamaño personalizado', () => {
    const { container } = render(<IconMoon size={32} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });

  test('debe tener un elemento path', () => {
    const { container } = render(<IconMoon />);
    const path = container.querySelector('path');
    expect(path).toBeInTheDocument();
  });

  test('debe tener atributos de trazo correctos', () => {
    const { container } = render(<IconMoon />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('stroke-width', '2');
    expect(svg).toHaveAttribute('stroke-linecap', 'round');
    expect(svg).toHaveAttribute('stroke-linejoin', 'round');
  });
});
