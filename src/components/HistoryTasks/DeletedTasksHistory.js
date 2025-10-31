import React, { useState, useEffect } from 'react';
import { db } from '../../FirebaseConfig';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot 
} from "firebase/firestore"; 
import '../../components/TodoList/TodoList.css'; 

const DeletedTasksHistory = () => {
  const [deletedTasks, setDeletedTasks] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, "deletedTasks");
    const q = query(collectionRef, orderBy("deletedAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setDeletedTasks(tasks);
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
      <h2>Historial de Tareas Eliminadas</h2>
      
      <ul>
        {deletedTasks.map(task => (
          <li key={task.id} style={{ 
            display: 'block', 
            padding: '12px', 
            margin: '8px 0', 
            backgroundColor: '#f5f5f5', 
            borderRadius: '4px', 
            borderLeft: '4px solid #dc3545' 
          }}>
            <div>
              <strong>{task.text}</strong>
              <br />
              <small>
                Eliminada el: {formatDate(task.deletedAt)}
                {task.wasCompleted && <span> • Estaba completada</span>}
              </small>
            </div>
          </li>
        ))}
      </ul>

      {deletedTasks.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666' }}>
          No hay tareas eliminadas en el historial
        </p>
      )}
    </div>
  );
};

export default DeletedTasksHistory;