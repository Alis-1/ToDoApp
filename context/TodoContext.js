import React, { createContext, useState, useEffect, useContext } from 'react';
import { todoAPI } from '../services/api';
import { Alert } from 'react-native';

const TodoContext = createContext();

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within TodoProvider');
  }
  return context;
};

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Lataa todot palvelimelta
  const loadTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await todoAPI.getAllTodos();
      setTodos(data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error loading todos:', err);
      Alert.alert('Virhe', 'Tehtävien lataaminen epäonnistui');
    } finally {
      setLoading(false);
    }
  };

  // Lataa todot komponentin mountissa
  useEffect(() => {
    loadTodos();
  }, []);

  // Luo uusi todo
  const createTodo = async (todoData) => {
    try {
      const newTodo = await todoAPI.createTodo({
        ...todoData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      setTodos((prev) => [...prev, newTodo]);
      return { success: true, data: newTodo };
    } catch (err) {
      console.error('Error creating todo:', err);
      Alert.alert('Virhe', 'Tehtävän luominen epäonnistui');
      return { success: false, error: err.message };
    }
  };

  // Päivitä todo
  const updateTodo = async (id, updates) => {
    try {
      // Hae nykyinen todo varmistaaksemme että kaikki kentät säilyvät
      const currentTodo = todos.find((t) => t.id === id);
      if (!currentTodo) {
        throw new Error('Tehtävää ei löytynyt');
      }

      // Yhdistä nykyiset tiedot päivityksiin
      const updatedTodo = await todoAPI.updateTodo(id, {
        ...currentTodo, // Säilytä kaikki nykyiset kentät
        ...updates,     // Päivitä vain muuttuneet kentät
        updatedAt: new Date().toISOString(),
      });
      
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      return { success: true, data: updatedTodo };
    } catch (err) {
      console.error('Error updating todo:', err);
      Alert.alert('Virhe', 'Tehtävän päivitys epäonnistui');
      return { success: false, error: err.message };
    }
  };

  // Poista todo
  const deleteTodo = async (id) => {
    try {
      await todoAPI.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Error deleting todo:', err);
      Alert.alert('Virhe', 'Tehtävän poistaminen epäonnistui');
      return { success: false, error: err.message };
    }
  };

  // Merkitse todo tehdyksi
  const toggleTodo = async (id) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      return await updateTodo(id, { completed: !todo.completed });
    }
  };

  const value = {
    todos,
    loading,
    error,
    loadTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoContext;

