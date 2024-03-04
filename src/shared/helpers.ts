import { v4 as uuidv4 } from 'uuid';
import { monthArray } from './data';
import { weekdaysFull } from './data';
import { Task } from './types';

export const generateMonthToRender = (month: number, year: number) => {
  const days = [];
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const monday = new Date(firstDayOfMonth);
  monday.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay() + 1);

  const sunday = new Date(lastDayOfMonth);
  sunday.setDate(lastDayOfMonth.getDate() - lastDayOfMonth.getDay() + 7);

  const currentDate = new Date(monday);

  while (currentDate <= sunday) {
    const isTargetMonth = currentDate.getMonth() === month;

    const day = {
      id: uuidv4(),
      date: new Date(currentDate),
      isTargetMonth: isTargetMonth,
      items: [],
    };

    days.push(day);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
}

export const getDateToRender = (date: Date | null) => {
  if (date) {
    return `${weekdaysFull[date.getDay()]} ${date.getDate()} ${monthArray[date.getMonth()]}`;
  } else {
    return '';
  }
}

export const compareDates = (taskDate: Date, cellDate: Date) => {
  const taskAssigned = `${taskDate.getDate()}-${taskDate.getMonth()}`;
  const currentDate = `${cellDate.getDate()}-${cellDate.getMonth()}`;

  return taskAssigned === currentDate;
}

export const compareDatesWithCast = (holidayDate: string, taskDate: Date) => {
  const monthStr = (taskDate.getMonth() + 1).toString().padStart(2, '0');
  const dayStr = taskDate.getDate().toString().padStart(2, '0');
  const dateToCompare = `${taskDate.getFullYear()}-${monthStr}-${dayStr}`;

  return dateToCompare === holidayDate;
}

export const handleJsonExport = (data: Task[], type: string) => {
  const dataToLoad = JSON.stringify(data);

  const blob = new Blob([dataToLoad], { type });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Json tasks';
  a.click();
  window.URL.revokeObjectURL(url);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dateReviver = (key: any, value: any) => {
  if (key === 'assignDate') {
    return new Date(value);
  }

  return value;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTasksFromFile = (data: any) => {
  return JSON.parse(data, dateReviver);
}

export const getRandomColor = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  
  const color = "rgb(" + red + ", " + green + ", " + blue + ")";
  
  return color;
}
