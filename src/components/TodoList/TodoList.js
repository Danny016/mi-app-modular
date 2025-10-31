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
  serverTimestamp,
  limit
} from "firebase/firestore"; 
import './TodoList.css';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = () => {
  const [tasks, setTasks] = useState([]); 
  const [inputValue, setInputValue] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // --- LEER TAREAS ACTIVAS ---
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

  // --- LEER HISTORIAL DE TAREAS COMPLETADAS ---
  useEffect(() => {
    const collectionRef = collection(db, "completedTasks");
    const q = query(collectionRef, orderBy("completedAt", "desc"), limit(5));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setCompletedTasks(tasks);
    });

    return () => unsubscribe();
  }, []);

  // --- LEER HISTORIAL DE TAREAS ELIMINADAS ---
  useEffect(() => {
    const collectionRef = collection(db, "deletedTasks");
    const q = query(collectionRef, orderBy("deletedAt", "desc"), limit(5));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setDeletedTasks(tasks);
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
    
    // Si la tarea se está marcando como completada, guardar en historial
    if (!task.isComplete) {
      await addDoc(collection(db, "completedTasks"), {
        text: task.text,
        completedAt: serverTimestamp(),
        originalTaskId: task.id
      });
    }

    await updateDoc(taskRef, {
      isComplete: !task.isComplete
    });
  };

  // --- ELIMINAR TAREA (DELETE) ---
  const handleDeleteTask = async (idToDelete) => {
    // Encontrar la tarea antes de eliminarla para guardar en historial
    const taskToDelete = tasks.find(task => task.id === idToDelete);
    
    if (taskToDelete) {
      await addDoc(collection(db, "deletedTasks"), {
        text: taskToDelete.text,
        deletedAt: serverTimestamp(),
        wasCompleted: taskToDelete.isComplete,
        originalTaskId: idToDelete
      });
    }

    const taskRef = doc(db, "tasks", idToDelete);
    await deleteDoc(taskRef);
  };

  // --- FORMATEAR FECHA ---
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Fecha no disponible';
    try {
      return timestamp.toDate().toLocaleString();
    } catch (error) {
      return 'Fecha inválida';
    }
  };

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
            onDeleteTask={() => handleDeleteTask(task.id)}
          />
        ))}
      </ul>

      {/* Botón para mostrar/ocultar historiales */}
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <button 
          className="toggle-history-btn"
          onClick={() => setShowHistory(!showHistory)}
        >
          {showHistory ? 'Ocultar Historiales' : 'Mostrar Historiales'}
        </button>
      </div>

      {/* Historiales */}
      {showHistory && (
        <div className="history-sections">
          {/* Historial de tareas completadas */}
          <div className="history-section">
            <h3>Últimas Tareas Completadas</h3>
            {completedTasks.length > 0 ? (
              <ul className="history-list">
                {completedTasks.map(task => (
                  <li key={task.id} className="history-item completed">
                    <div className="history-text">{task.text}</div>
                    <div className="history-date">
                      Completada: {formatDate(task.completedAt)}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-history">No hay tareas completadas recientemente</p>
            )}
          </div>

          {/* Historial de tareas eliminadas */}
          <div className="history-section">
            <h3>Últimas Tareas Eliminadas</h3>
            {deletedTasks.length > 0 ? (
              <ul className="history-list">
                {deletedTasks.map(task => (
                  <li key={task.id} className="history-item deleted">
                    <div className="history-text">{task.text}</div>
                    <div className="history-date">
                      Eliminada: {formatDate(task.deletedAt)}
                      {task.wasCompleted && <span className="was-completed"> • Estaba completada</span>}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-history">No hay tareas eliminadas recientemente</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;