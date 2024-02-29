import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './features/taskSlice';
import calendarReducer from './features/calendarSlice';
import tagsReducer from './features/tagsSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    calendar: calendarReducer,
    tag: tagsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
