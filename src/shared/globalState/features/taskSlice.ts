import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../../types';

interface InitialState {
  tasks: Task[],
  selectedDate: Date | null,
  searchQuery: string,
}

const initialState: InitialState = {
  tasks: [],
  selectedDate: null,
  searchQuery: '',
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addNewTask: (state, action) => {
      const newTask = {
        id: uuidv4(),
        ...action.payload,
      };
      state.tasks.push(newTask);
    },
    updateTask: (state, action) => {
      const updatedTask = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === updatedTask.id);

      if (taskIndex !== -1) {
        state.tasks[taskIndex] = updatedTask;
      }
    },
    updateTaskTitle: (state, action) => {
      const updatedTask = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === updatedTask.id);

      if (taskIndex !== -1) {
        state.tasks[taskIndex] = updatedTask;
      }
    },
    deleteTaskById: (state, action) => {
      const newTasks = state.tasks.filter(task => task.id !== action.payload);

      state.tasks = newTasks;
    },
    addTasksFromFile: (state, action) => {
      state.tasks = [...state.tasks, ...action.payload];
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { addNewTask, updateTask, deleteTaskById, addTasksFromFile, setSelectedDate, setSearchQuery } = taskSlice.actions;
export default taskSlice.reducer;