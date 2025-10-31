// Arriba de todo en TodoList.js
import React, { useState, useEffect } from 'react'; 
import { db } from '../../FirebaseConfig'; 
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp 
} from "firebase/firestore"; 
import './TodoList.css';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = () => {
  const [tasks, setTasks] = useState([]); 
  const [inputValue, setInputValue] = useState('');

  // --- LEER TAREAS (GET) ---
  useEffect(() => {
    const collectionRef = collection(db, "tasks");
    const q = query(collectionRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newTasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(newTasks);
    });

    return () => unsubscribe();
  }, []);

  // --- AÑADIR TAREA (CREATE) ---
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    await addDoc(collection(db, "tasks"), {
      text: inputValue,
      isComplete: false,
      createdAt: serverTimestamp()
    });

    setInputValue('');
  };

  // --- MARCAR COMO COMPLETA / INCOMPLETA (UPDATE) ---
  const handleToggleComplete = async (task) => {
    const taskRef = doc(db, "tasks", task.id);
    await updateDoc(taskRef, {
      isComplete: !task.isComplete
    });
  };

  // --- ELIMINAR TAREA (DELETE) ---
  const handleDeleteTask = async (idToDelete) => {
    const taskRef = doc(db, "tasks", idToDelete);
    await deleteDoc(taskRef);
  };

  // --- RENDER ---
  return (
    <div className="todo-list-container">
      <h2>Mi Lista de Tareas</h2>

      <form onSubmit={handleAddTask} className="add-task-form">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Añade una nueva tarea..."
        />
        <button type="submit">Añadir</button>
      </form>

      <ul>
        {tasks.map(task => (
          <TodoItem 
            key={task.id}
            task={task}
            onToggleComplete={() => handleToggleComplete(task)}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
