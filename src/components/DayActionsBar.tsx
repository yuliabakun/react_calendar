import styled from 'styled-components';
import { Day } from '../shared/types';
import { useAppDispatch } from '../shared/globalState/hooks';
import { setSelectedDate } from '../shared/globalState/features/taskSlice';
import iconStarred from '../shared/assets/icon-starred.svg';

const ActionsBar = styled.div`
  padding: 0 5px;
  border-bottom: 1px solid #CFCFCF;
  display: flex;
  justify-content: space-between;
  gap: 5px;
`;

const AddButton = styled.button`
  height: 20px;
  width: 20px;
  border: none;
  background: none;
  cursor: pointer;
  color: #929598;

  &:hover {
    color: black;
  }
`;

interface DayProps {
  isTargetMonth: boolean,
}

const DayNumber = styled.p<DayProps>`
  font-weight: ${props => props.isTargetMonth ? 'bold' : 'normal'};
`;

const HolidayIcon = styled.img`
  height: 20px;
  width: 20px;
`;

const DayInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2px;
`;

type Props = {
  day: Day,
  onModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
};

export const DayActionsBar: React.FC<Props> = ({ day, onModalOpen }) => {
  const dispatch = useAppDispatch();

  return (
    <ActionsBar>
      <DayNumber isTargetMonth={day.isTargetMonth}>
        {day.date.getDate()}
      </DayNumber>

      {day.isTargetMonth && (
        <DayInfoContainer>
          {day.holidays && day.holidays.length > 0 &&
            day.holidays.map(holiday => (
              <HolidayIcon
                key={holiday.localName}
                src={iconStarred}
                title={`${holiday.name} in ${holiday.countryCode}`}
              >
              </HolidayIcon>
            ))}

          <AddButton
            onClick={() => {
              dispatch(setSelectedDate(day.date));
              onModalOpen(true);
            }}
          >
            +
          </AddButton>
        </DayInfoContainer>
      )}
    </ActionsBar>
  );
};