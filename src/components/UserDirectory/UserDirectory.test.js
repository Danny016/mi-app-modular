import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserDirectory from './UserDirectory';

// Mock fetch
global.fetch = jest.fn();

describe('Componente UserDirectory', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('debe renderizar el título "Directorio de Usuarios"', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<UserDirectory />);
    
    await waitFor(() => {
      const titulo = screen.getByText('Directorio de Usuarios');
      expect(titulo).toBeInTheDocument();
    });
  });

  test('debe mostrar "Cargando usuarios..." mientras carga', () => {
    fetch.mockImplementationOnce(
      () =>
        new Promise(() => {
          /* nunca resuelve */
        })
    );

    render(<UserDirectory />);
    const loading = screen.getByText('Cargando usuarios...');
    expect(loading).toBeInTheDocument();
  });

  test('debe mostrar un mensaje de error cuando la petición falla', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });

    render(<UserDirectory />);

    await waitFor(() => {
      const error = screen.getByText(/Error:/i);
      expect(error).toBeInTheDocument();
    });
  });

  test('debe renderizar la lista de usuarios cuando la carga es exitosa', async () => {
    const mockUsers = [
      { id: 1, name: 'Usuario 1' },
      { id: 2, name: 'Usuario 2' },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    render(<UserDirectory />);

    await waitFor(() => {
      expect(screen.queryByText('Cargando usuarios...')).not.toBeInTheDocument();
    });

    const lista = screen.getByRole('list');
    expect(lista).toBeInTheDocument();
  });

  test('debe tener un elemento h2', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<UserDirectory />);
    
    await waitFor(() => {
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
    });
  });

  test('debe tener la clase "user-directory"', () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    const { container } = render(<UserDirectory />);
    const div = container.querySelector('.user-directory');
    expect(div).toBeInTheDocument();
  });

  test('debe hacer una llamada a fetch a la URL correcta', () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<UserDirectory />);

    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
  });
});
