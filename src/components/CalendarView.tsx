import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../shared/globalState/hooks';
import { getHolidaysForUpcomingWeek } from '../shared/fetchClient';
import { Holiday, DayListItem, Task } from '../shared/types';
import { AddTaskModal } from './AddTaskModal';
import { CalendarItem } from './CalendarItem';
import { WeekdaysBar } from './WeekdaysBar';
import ReorderableList from './ReorderableLists';

const CalendarGrid = styled.main`
  margin: 0 5px 60px 5px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

export const CalendarView = () => {
  const { month } = useAppSelector(state => state.calendar);
  const { tasks } = useAppSelector(state => state.tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [holidaysData, setHolidaysData] = useState<Holiday[]>([]);
  const [lists, setLists] = useState<DayListItem[]>([]);

  useEffect(() => {
    // const getHolidaysData = async () => {
    //   const data = await getHolidaysForUpcomingWeek();

    //   setHolidaysData(data);
    // }

    prepareListsData();

    // getHolidaysData();
  }, [tasks]);

  const compareDates = (taskDate: Date, cellDate: Date) => {
    const taskAssigned = `${taskDate.getDate()}-${taskDate.getMonth()}`;
    const currentDate = `${cellDate.getDate()}-${cellDate.getMonth()}`;

    return taskAssigned === currentDate;
  }

  const prepareMonthDataToRender = () => {
    const holidaysArray = holidaysData.flat();

    const preparedData = month.map(day => {
      const monthStr = (day.date.getMonth() + 1).toString().padStart(2, '0');
      const dayStr = day.date.getDate().toString().padStart(2, '0');
      const dateToCompare = `${day.date.getFullYear()}-${monthStr}-${dayStr}`;

      const holidaysForDay = holidaysArray.filter(holiday => holiday.date === dateToCompare);

      return {
        ...day,
        holidays: holidaysForDay
      };
    })

    return preparedData;
  };

  const monthWithHolidays = prepareMonthDataToRender();

  const prepareListsData = () => {
    let listsData: DayListItem[] = [];

    listsData = monthWithHolidays.map(day => {
      const tasksForToday: Task[] = [];

      tasks.map((task: Task) => {
        if (compareDates(task.assign_date as Date , day.date)) {
          tasksForToday.push(task);
        }
      })

      day.items = tasksForToday;

      return day;
    })

    setLists(listsData);
  };


  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceList = lists.find((list) => list.id === source.droppableId);
    const destinationList = lists.find(
      (list) => list.id === destination.droppableId
    );
    const [removed] = sourceList.items.splice(source.index, 1);
    destinationList.items.splice(destination.index, 0, removed);

    setLists([...lists]);
  };

  return (
    <>
      <AddTaskModal open={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <WeekdaysBar />

      <CalendarGrid>
        <ReorderableList lists={lists} onDragEnd={onDragEnd} setIsModalOpen={setIsModalOpen} />
        {/* {monthWithHolidays.map(item => (
          <CalendarItem
            key={item.id}
            item={item}
            setIsModalOpen={setIsModalOpen}
            holidays={item.holidays}
          />
        ))} */}
      </CalendarGrid>
    </>
  )
}
