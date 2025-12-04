import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import IconSun from './IconSun';

describe('Componente IconSun', () => {
  test('debe renderizar un SVG', () => {
    const { container } = render(<IconSun />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('debe tener el atributo xmlns correcto', () => {
    const { container } = render(<IconSun />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
  });

  test('debe usar el tamaño por defecto de 24', () => {
    const { container } = render(<IconSun />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
  });

  test('debe aceptar un tamaño personalizado', () => {
    const { container } = render(<IconSun size={40} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '40');
    expect(svg).toHaveAttribute('height', '40');
  });

  test('debe tener un elemento circle (el sol)', () => {
    const { container } = render(<IconSun />);
    const circle = container.querySelector('circle');
    expect(circle).toBeInTheDocument();
    expect(circle).toHaveAttribute('cx', '12');
    expect(circle).toHaveAttribute('cy', '12');
    expect(circle).toHaveAttribute('r', '5');
  });

  test('debe tener múltiples elementos line (rayos del sol)', () => {
    const { container } = render(<IconSun />);
    const lines = container.querySelectorAll('line');
    expect(lines.length).toBeGreaterThan(0);
  });
});
