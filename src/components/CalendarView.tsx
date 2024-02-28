import styled from 'styled-components';
import { daysOfWeek } from '../shared/data';
import { useContext } from 'react';
import { CalendarContext } from './CalendarContext';
import { monthArray } from '../shared/data';

const CalendarGrid = styled.main`
  margin: 10px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

const CalendarBar = styled.div`
  margin: 10px;
  display: flex;
  justify-content: space-around;
`;

interface CalendarCellProp {
  isCurrentMonth: boolean,
}

const CalendarCell = styled.section<CalendarCellProp>`  
  grid-column: span 1;
  background-color: ${props => props.isCurrentMonth ? 'lightblue' : 'white'};
  height: 120px;
`;

function CalendarView() {
  const { month } = useContext(CalendarContext);

  const getDateToRender = (date: Date) => {
    const str = `${date.getDate()}-${monthArray[date.getMonth()]}`;
    return str;
  }

  return (
    <>
      <CalendarBar>
        {daysOfWeek.map(day => <p key={day}>{day}</p>)}
      </CalendarBar>

      <CalendarGrid>
        {month.map(item => (
          <CalendarCell
            key={item.id}
            isCurrentMonth={item.isTargetMonth}
          >
            {getDateToRender(item.date)}
          </CalendarCell>
        ))}
      </CalendarGrid>
    </>
  )
}

export default CalendarView;