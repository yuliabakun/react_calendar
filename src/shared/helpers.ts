import { v4 as uuidv4 } from 'uuid';

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


export function getMonthToRender2(month: number, year: number) {
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
