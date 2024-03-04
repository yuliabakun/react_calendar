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