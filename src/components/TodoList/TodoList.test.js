import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mockear Firebase primero
jest.mock('../../FirebaseConfig', () => ({
  db: {},
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  query: jest.fn(),
  orderBy: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  serverTimestamp: jest.fn(),
  limit: jest.fn(),
  onSnapshot: jest.fn((query, callback) => {
    // Simular datos vacíos
    setTimeout(() => callback({ docs: [] }), 0);
    return jest.fn();
  }),
}));

import TodoList from './TodoList';

describe('Componente TodoList', () => {
  test('debe renderizar sin errores', () => {
    const { container } = render(<TodoList />);
    expect(container).toBeInTheDocument();
  });

  test('debe tener una clase "todo-list-container"', () => {
    const { container } = render(<TodoList />);
    const div = container.querySelector('.todo-list-container');
    expect(div).toBeInTheDocument();
  });
});
