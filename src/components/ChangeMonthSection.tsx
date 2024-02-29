import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../shared/globalState/hooks';
import { changeMonthVisible } from '../shared/globalState/features/calendarSlice';
import { monthArray, January, December } from '../shared/data';

const Section = styled.section`
  display: flex;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 18px;
  margin-right: 20px;
`;

const MonthName = styled.p`
  width: 120px;
  text-align: center;
`;

const Button = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  background-color: #FDB700;
`;

export const ChangeMonthSection = () => {
  const dispatch = useAppDispatch();
  const { monthVisible } = useAppSelector(state => state.calendar);

  return (
    <Section>
      <Title>Calendar 2024</Title>

      <Section>
        <Button
          type='button'
          disabled={monthVisible === January}
          onClick={() => dispatch(changeMonthVisible(monthVisible - 1))}
        >
          {'<'}
        </Button>

        <MonthName>{monthArray[monthVisible]}</MonthName>

        <Button
          type='button'
          disabled={monthVisible === December}
          onClick={() => dispatch(changeMonthVisible(monthVisible + 1))}
        >
          {'>'}
        </Button>
      </Section>
    </Section>
  );
};