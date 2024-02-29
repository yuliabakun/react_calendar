import styled from 'styled-components';
import { weekdays } from '../shared/data';

const Weekdays = styled.div`
  margin: 10px 5px;
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  color: #929598;
`;

export const WeekdaysBar = () => {
  return (
    <Weekdays>
      {weekdays.map(day => <p key={day}>{day}</p>)}
    </Weekdays>
  )
}
