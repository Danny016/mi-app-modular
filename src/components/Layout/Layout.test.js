import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock react-router-dom ANTES de importaciones
jest.mock('react-router-dom');

import { ThemeProvider } from '../../context/ThemeContext';
import Layout from './Layout';

describe('Componente Layout', () => {
  const renderLayout = () => {
    return render(
      <ThemeProvider>
        <Layout />
      </ThemeProvider>
    );
  };

  test('debe renderizar el elemento header', async () => {
    const { container } = renderLayout();
    await waitFor(() => {
      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
    });
  });

  test('debe renderizar un elemento main', () => {
    const { container } = renderLayout();
    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
  });

  test('debe tener la estructura correcta: header y main', async () => {
    const { container } = renderLayout();
    await waitFor(() => {
      const header = container.querySelector('header');
      const main = container.querySelector('main');
      expect(header).toBeInTheDocument();
      expect(main).toBeInTheDocument();
    });
  });

  test('el header debe estar antes que el main', async () => {
    const { container } = renderLayout();
    await waitFor(() => {
      const header = container.querySelector('header');
      const main = container.querySelector('main');
      expect(header.compareDocumentPosition(main)).toBe(4);
    });
  });

  test('debe renderizar la navegación en el header', async () => {
    const { container } = renderLayout();
    await waitFor(() => {
      const nav = container.querySelector('header nav');
      expect(nav).toBeInTheDocument();
    });
  });
});
