import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { AddTaskModal } from './AddTaskModal';
import { CalendarItem } from './CalendarItem';
import { useAppSelector } from '../shared/globalState/hooks';
import { WeekdaysBar } from './WeekdaysBar';
import { getHolidaysForUpcomingWeek } from '../shared/fetchClient';
import { Holiday } from '../shared/types';

const CalendarGrid = styled.main`
  margin: 0 5px 60px 5px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

export const CalendarView = () => {
  const { month } = useAppSelector(state => state.calendar);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [holidaysData, setHolidaysData] = useState<Holiday[]>([]);

  useEffect(() => {
    const getHolidaysData = async () => {
      const data = await getHolidaysForUpcomingWeek();

      setHolidaysData(data);
    }

    getHolidaysData();
  }, []);

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

  return (
    <>
      <AddTaskModal open={isModalOpen} setIsModalOpen={setIsModalOpen} />

      <WeekdaysBar />

      <CalendarGrid>
        {monthWithHolidays.map(item => (
          <CalendarItem
            key={item.id}
            item={item}
            setIsModalOpen={setIsModalOpen}
            holidays={item.holidays}
          />
        ))}
      </CalendarGrid>
    </>
  )
}
