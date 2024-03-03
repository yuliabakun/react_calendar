import styled from 'styled-components';
import { CalendarItemProps } from '../shared/types';
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

export const CalendarItem: React.FC<CalendarItemProps> = ({
  item,
  setIsModalOpen,
  children,
}) => {

  return (
    <CalendarCell
      key={item.id}
      isCurrentMonth={item.isTargetMonth}
    >
      <DayActionsBar day={item} onModalOpen={setIsModalOpen} />

      {children}
    </CalendarCell>
  )
}