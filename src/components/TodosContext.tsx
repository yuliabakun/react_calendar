import React, { useState } from 'react';
import { TodoContext, ProviderProps, Todo } from '../shared/types';
import { v4 as uuidv4 } from 'uuid';

export const TodosContext = React.createContext<TodoContext>({
  todos: [],
  addNewTodo: () => { },
})

export const ContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addNewTodo = (value: Omit<Todo, 'id'>) => {
    const newTodo = { ...value, id: uuidv4() };

    const updatedTodos = [...todos, newTodo];

    setTodos(updatedTodos);
  };

  const value = {
    todos,
    addNewTodo,
  };

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  )
}
