import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../shared/globalState/hooks';
import { getHolidays } from '../shared/fetchClient';
import { Holiday, DayListItem } from '../shared/types';
import { AddTaskModal } from './AddTaskModal';
import { WeekdaysBar } from './WeekdaysBar';
import { ReorderableList } from './ReorderableLists';
import { compareDates, compareDatesWithCast } from '../shared/helpers';
import { updateTask } from '../shared/globalState/features/taskSlice';

const CalendarGrid = styled.main`
  margin: 0 5px 60px 5px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

export const CalendarView = () => {
  const dispatch = useAppDispatch();
  const { month } = useAppSelector(state => state.calendar);
  const { tasks, searchQuery } = useAppSelector(state => state.tasks);
  const { tagSelected } = useAppSelector(state => state.tag);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [holidaysData, setHolidaysData] = useState<Holiday[]>([]);
  const [lists, setLists] = useState<DayListItem[]>([]);

  useEffect(() => {
    const getHolidaysData = async () => {
      const data = await getHolidays();

      setHolidaysData(data);
    }

    getHolidaysData();
  }, []);

  useEffect(() => {
    prepareMonthData();
  }, [month, searchQuery, tagSelected, tasks, holidaysData])

  const prepareMonthData = useCallback(() => {
    const holidaysArray = holidaysData.flat();

    const preparedData: DayListItem[] = month.map(day => {
      const holidays = holidaysArray.filter(holiday => compareDatesWithCast(holiday.date, day.date));
      const todayTasks = tasks.filter(task => compareDates(task.assignDate as Date, day.date));

      return {
        ...day,
        holidays: holidays,
        items: todayTasks,
      };
    })

    if (searchQuery) {
      const normalizedQuery = searchQuery.toLowerCase();

      preparedData.forEach((day: DayListItem) => {
        day.items = day.items.filter(task =>
          task.description.toLowerCase().includes(normalizedQuery));
      });
    }

    if (tagSelected) {
      preparedData.forEach((day: DayListItem) => {
        day.items = day.items.filter(task => task.tags.includes(tagSelected));
      });
    }

    setLists(preparedData);
  }, [month, searchQuery, tagSelected, tasks, holidaysData]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDragEnd = useCallback((result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceListIndex = lists.findIndex((list) => list.id === source.droppableId);
    const sourceList = lists.find((list) => list.id === source.droppableId);
    const destinationList = lists.find((list) => list.id === destination.droppableId);

    const draggedItem = lists[sourceListIndex].items[source.index];

    if (sourceList?.id !== destinationList?.id) {
      const taskWithNewDate = {
        ...draggedItem,
        assignDate: destinationList?.date,
      };

      dispatch(updateTask(taskWithNewDate))
    }

    if (sourceList) {
      const [removed] = sourceList.items.splice(source.index, 1);
      destinationList?.items.splice(destination.index, 0, removed);
    }

    setLists([...lists]);
  }, [dispatch, lists]);

  return (
    <>
      <AddTaskModal open={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <WeekdaysBar />

      <CalendarGrid>
        <ReorderableList
          lists={lists}
          onDragEnd={onDragEnd}
          setIsModalOpen={setIsModalOpen}
        />
      </CalendarGrid>
    </>
  )
}
