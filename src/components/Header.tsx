import { useContext } from 'react';
import styled from 'styled-components';
import { CalendarContext } from './CalendarContext';

const HeaderContainer = styled.header`
  width: 100%;
  padding-inline: 40px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: antiquewhite;
`;

const ViewBar = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionsBar = styled.div`
  display: flex;
  gap: 10px;
  align-items: baseline;
`;

function Header() {
  const { monthVisible, changeMonthVisible } = useContext(CalendarContext);

  return (
    <HeaderContainer>
      <ActionsBar>
        <h2>Calendar</h2>
        <p>import/export</p>
      </ActionsBar>

      <ViewBar>
        <button
          disabled={monthVisible === 0}
          onClick={() => changeMonthVisible(monthVisible - 1)}
        >
          Prev
        </button>

        <p>Month</p>

        <button
          disabled={monthVisible === 11}
          onClick={() => changeMonthVisible(monthVisible + 1)}
        >
          Next
        </button>
      </ViewBar>
    </HeaderContainer>
  )
}

// viewbar will control view(month/week)
// and prev/next buttons
// actionsbar will control export/import and search
// on hover on cell will appear + button and modal to add todo
// week start (monday/sunday) button

export default Header;