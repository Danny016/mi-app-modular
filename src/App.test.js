import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock react-router-dom ANTES de importar App
jest.mock('react-router-dom');
jest.mock('./FirebaseConfig', () => ({
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
    callback({ docs: [] });
    return jest.fn();
  }),
}));

// Ahora importar App
import App from './App';

test('debe renderizar el componente App', () => {
  const { container } = render(<App />);
  expect(container.querySelector('.App')).toBeInTheDocument();
});

test('debe tener la clase App', () => {
  const { container } = render(<App />);
  const appDiv = container.querySelector('.App');
  expect(appDiv).toBeInTheDocument();
});
