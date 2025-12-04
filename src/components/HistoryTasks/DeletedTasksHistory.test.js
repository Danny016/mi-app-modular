import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock Firebase Firestore PRIMERO
jest.mock('../../FirebaseConfig', () => ({
  db: {},
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  query: jest.fn(),
  orderBy: jest.fn(),
  onSnapshot: jest.fn((query, callback) => {
    callback({ docs: [] });
    return jest.fn();
  }),
}));

import DeletedTasksHistory from './DeletedTasksHistory';

describe('Componente DeletedTasksHistory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debe renderizar el título "Historial de Tareas Eliminadas"', () => {
    render(<DeletedTasksHistory />);
    const titulo = screen.getByText('Historial de Tareas Eliminadas');
    expect(titulo).toBeInTheDocument();
  });

  test('debe renderizar un elemento h2', () => {
    render(<DeletedTasksHistory />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
  });

  test('debe renderizar una lista (ul)', () => {
    render(<DeletedTasksHistory />);
    const lista = screen.getByRole('list');
    expect(lista).toBeInTheDocument();
  });

  test('debe tener la clase "todo-list-container"', () => {
    const { container } = render(<DeletedTasksHistory />);
    const div = container.querySelector('.todo-list-container');
    expect(div).toBeInTheDocument();
  });
});
