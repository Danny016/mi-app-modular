import React, { useState, useEffect } from 'react';
import { db } from '../../FirebaseConfig';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot 
} from "firebase/firestore"; 
import '../../components/TodoList/TodoList.css'; // Ruta corregida

const CompletedTasksHistory = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, "completedTasks");
    const q = query(collectionRef, orderBy("completedAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setCompletedTasks(tasks);
    });

    return () => unsubscribe();
  }, []);

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
      <h2>Historial de Tareas Completadas</h2>
      
      <ul>
        {completedTasks.map(task => (
          <li key={task.id} style={{ 
            display: 'block', 
            padding: '12px', 
            margin: '8px 0', 
            backgroundColor: '#f5f5f5', 
            borderRadius: '4px', 
            borderLeft: '4px solid #28a745' 
          }}>
            <div>
              <strong>{task.text}</strong>
              <br />
              <small>
                Completada el: {formatDate(task.completedAt)}
              </small>
            </div>
          </li>
        ))}
      </ul>

      {completedTasks.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666' }}>
          No hay tareas completadas en el historial
        </p>
      )}
    </div>
  );
};

export default CompletedTasksHistory;