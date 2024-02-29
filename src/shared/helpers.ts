import { v4 as uuidv4 } from 'uuid';
import { monthArray } from './data';
import { weekdaysFull } from './data';

export function getMonthToRender(month: number, year: number) {
  const date = new Date(year, month, 1);

  const days = [];

  while (date.getMonth() === month) {
    const day = {
      id: uuidv4(),
      date: new Date(date),
    }

    days.push(day);
    date.setDate(date.getDate() + 1);
  }

  return days;
}

export function generateMonthToRender(month: number, year: number) {
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
    };

    days.push(day);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
}

export function getDateToRender(date: Date | null) {
  if (date) {
    return `${weekdaysFull[date.getDay()]} ${date.getDate()} ${monthArray[date.getMonth()]}`;
  } else {
    return 'today';
  }
}
