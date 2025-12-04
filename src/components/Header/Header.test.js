import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock react-router-dom ANTES de cualquier importación de componentes
jest.mock('react-router-dom');

import { ThemeProvider } from '../../context/ThemeContext';
import Header from './Header';

describe('Componente Header', () => {
  const renderHeader = () => {
    return render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );
  };

  test('debe renderizar el elemento header', async () => {
    const { container } = renderHeader();
    await waitFor(() => {
      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
    });
  });

  test('debe tener la clase "app-header"', async () => {
    const { container } = renderHeader();
    await waitFor(() => {
      const header = container.querySelector('header.app-header');
      expect(header).toBeInTheDocument();
    });
  });

  test('debe renderizar un elemento nav', async () => {
    const { container } = renderHeader();
    await waitFor(() => {
      const nav = container.querySelector('nav');
      expect(nav).toBeInTheDocument();
    });
  });

  test('debe tener el enlace "Inicio"', async () => {
    renderHeader();
    await waitFor(() => {
      const links = screen.getAllByRole('link', { name: /Inicio/i });
      expect(links.length).toBeGreaterThan(0);
    });
  });

  test('debe tener el enlace "Tareas"', async () => {
    renderHeader();
    await waitFor(() => {
      const links = screen.getAllByRole('link', { name: /Tareas/i });
      expect(links.length).toBeGreaterThan(0);
    });
  });

  test('debe tener el enlace "Directorio"', async () => {
    renderHeader();
    await waitFor(() => {
      const links = screen.getAllByRole('link', { name: /Directorio/i });
      expect(links.length).toBeGreaterThan(0);
    });
  });

  test('debe renderizar el ThemeSwitcher', async () => {
    const { container } = renderHeader();
    await waitFor(() => {
      const themeSwitcher = container.querySelector('button.theme-switcher');
      expect(themeSwitcher).toBeInTheDocument();
    });
  });
});
