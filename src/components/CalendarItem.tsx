import styled from 'styled-components';
import { Day, Holiday } from '../shared/types';
import { useAppDispatch, useAppSelector } from '../shared/globalState/hooks';
import { deleteTaskById, updateTask } from '../shared/globalState/features/taskSlice';
import { TaskItem } from './TaskItem';
import { Task } from '../shared/types';
import { DayActionsBar } from './DayActionsBar';

interface CalendarCellProp {
  isCurrentMonth: boolean,
}

const CalendarCell = styled.section<CalendarCellProp>`
  grid-column: span 1;
  background-color: ${props => props.isCurrentMonth ? '#E3E4E6' : '#EBEBEB'};
  height: 140px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }

  &::-webkit-scrollbar-thumb {
    background: #ffffff; 
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }
`;

type Props = {
  item: Day,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  holidays?: Holiday[],
};

export const CalendarItem: React.FC<Props> = ({
  item,
  setIsModalOpen
}) => {
  const dispatch = useAppDispatch();
  const { tasks, searchQuery } = useAppSelector(state => state.tasks);
  const { tagSelected } = useAppSelector(state => state.tag);

  const compareDates = (taskDate: Date, cellDate: Date) => {
    const taskAssigned = `${taskDate.getDate()}-${taskDate.getMonth()}`;
    const currentDate = `${cellDate.getDate()}-${cellDate.getMonth()}`;

    return taskAssigned === currentDate;
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleOnDrop = (e: React.DragEvent) => {
    const data = e.dataTransfer.getData('currentTask');
    const task = JSON.parse(data);


    const updatedTask: Task = {
      ...task,
      assign_date: item.date,
    };

    dispatch(updateTask(updatedTask))
  };

  const filterItems = () => {
    let filteredItems = tasks;

    if (searchQuery) {
      filteredItems = filteredItems.filter(item => item.description.includes(searchQuery));
    }

    if (tagSelected) {
      filteredItems = filteredItems.filter(item => item.tags.includes(tagSelected));
    }

    return filteredItems;
  }

  const deleteTask = (taskId: string) => {
    dispatch(deleteTaskById(taskId));
  }

  const filteredTasks = filterItems();

  return (
    <CalendarCell
      key={item.id}
      isCurrentMonth={item.isTargetMonth}
      onDragOver={(event) => handleDragOver(event)}
      onDrop={(event) => handleOnDrop(event)}
    >
      <DayActionsBar day={item} onModalOpen={setIsModalOpen} />

      {filteredTasks.map(todo => {
        if (compareDates(todo.assign_date as Date, item.date)) {
          return (
            <TaskItem key={todo.id} task={todo} onTaskDelete={deleteTask} />
          )
        } else {
          return null;
        }
      })}
    </CalendarCell>
  )
}