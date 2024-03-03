import { createSlice } from '@reduxjs/toolkit';
import { generateMonthToRender } from '../../helpers';
import { CalendarYear } from '../../data';
import { Day } from '../../types';

interface InitialState {
  monthVisible: number,
  month: Day[],
}

const initialState: InitialState = {
  monthVisible: new Date().getMonth(),
  month: generateMonthToRender(new Date().getMonth(), 2024),
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    changeMonthVisible: (state, action) => {
      state.monthVisible = action.payload;
      state.month = generateMonthToRender(action.payload, CalendarYear);
    },
  },
});

export const { changeMonthVisible } = calendarSlice.actions;
export default calendarSlice.reducer;