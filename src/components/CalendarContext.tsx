import React, { useState } from 'react';
import { CalendarContextProp, ProviderProps } from '../shared/types';
import { getMonthToRender2 } from '../shared/helpers';

const today = new Date();

export const CalendarContext = React.createContext<CalendarContextProp>({
  monthVisible: today.getMonth(),
  changeMonthVisible: () => { },
  month: []
});

export const CalendarContextProvider = ({ children }: ProviderProps) => {
  const [monthVisible, setMonthVisible] = useState(today.getMonth());
  const [month, setMonth] = useState(getMonthToRender2(monthVisible, 2024));

  console.log(monthVisible);

  const changeMonthVisible = (value: number) => {
    setMonthVisible(value);
    setMonth(getMonthToRender2(value, 2024))
  };

  const value = {
    monthVisible,
    changeMonthVisible,
    month
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  )
}