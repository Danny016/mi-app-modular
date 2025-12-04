import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoItem from './TodoItem';

describe('Componente TodoItem', () => {
  const mockTask = {
    id: '1',
    text: 'Tarea de prueba',
    isComplete: false,
  };

  const mockToggleComplete = jest.fn();
  const mockDeleteTask = jest.fn();

  beforeEach(() => {
    mockToggleComplete.mockClear();
    mockDeleteTask.mockClear();
  });

  test('debe renderizar el texto de la tarea', () => {
    render(
      <TodoItem
        task={mockTask}
        onToggleComplete={mockToggleComplete}
        onDeleteTask={mockDeleteTask}
      />
    );
    expect(screen.getByText('Tarea de prueba')).toBeInTheDocument();
  });

  test('debe renderizar un checkbox', () => {
    render(
      <TodoItem
        task={mockTask}
        onToggleComplete={mockToggleComplete}
        onDeleteTask={mockDeleteTask}
      />
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  test('debe mostrar el checkbox sin marcar cuando la tarea no está completa', () => {
    render(
      <TodoItem
        task={mockTask}
        onToggleComplete={mockToggleComplete}
        onDeleteTask={mockDeleteTask}
      />
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('debe mostrar el checkbox marcado cuando la tarea está completa', () => {
    const completedTask = { ...mockTask, isComplete: true };
    render(
      <TodoItem
        task={completedTask}
        onToggleComplete={mockToggleComplete}
        onDeleteTask={mockDeleteTask}
      />
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('debe llamar a onToggleComplete cuando se hace clic en el checkbox', () => {
    render(
      <TodoItem
        task={mockTask}
        onToggleComplete={mockToggleComplete}
        onDeleteTask={mockDeleteTask}
      />
    );
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockToggleComplete).toHaveBeenCalled();
  });

  test('debe renderizar un botón de eliminar', () => {
    render(
      <TodoItem
        task={mockTask}
        onToggleComplete={mockToggleComplete}
        onDeleteTask={mockDeleteTask}
      />
    );
    const button = screen.getByRole('button', { name: /eliminar/i });
    expect(button).toBeInTheDocument();
  });

  test('debe llamar a onDeleteTask con el ID de la tarea cuando se hace clic en eliminar', () => {
    render(
      <TodoItem
        task={mockTask}
        onToggleComplete={mockToggleComplete}
        onDeleteTask={mockDeleteTask}
      />
    );
    const button = screen.getByRole('button', { name: /eliminar/i });
    fireEvent.click(button);
    expect(mockDeleteTask).toHaveBeenCalledWith('1');
  });

  test('debe añadir la clase "completed" cuando la tarea está completa', () => {
    const completedTask = { ...mockTask, isComplete: true };
    const { container } = render(
      <TodoItem
        task={completedTask}
        onToggleComplete={mockToggleComplete}
        onDeleteTask={mockDeleteTask}
      />
    );
    const li = container.querySelector('li');
    expect(li).toHaveClass('completed');
  });

  test('debe renderizar dentro de un elemento li', () => {
    const { container } = render(
      <TodoItem
        task={mockTask}
        onToggleComplete={mockToggleComplete}
        onDeleteTask={mockDeleteTask}
      />
    );
    const li = container.querySelector('li');
    expect(li).toBeInTheDocument();
    expect(li).toHaveClass('todo-item');
  });
});
