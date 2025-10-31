import React from 'react';
import './TodoItem.css';

const TodoItem = ({ task, onToggleComplete, onDeleteTask }) => {
  return (
    <li className={`todo-item ${task.isComplete ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.isComplete}
        onChange={onToggleComplete} // ya no se pasa ID, solo la función
      />
      <span>{task.text}</span>
      <button onClick={() => onDeleteTask(task.id)}>Eliminar</button>
    </li>
  );
};

export default TodoItem;
