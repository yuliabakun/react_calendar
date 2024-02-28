export type Tag = {
  id: string,
  name: string,
}

export type Todo = {
  id: string,
  assign_date: string,
  task: string,
  tags: Tag[],
}

export type Day = {
  id: string,
  date: Date,
  isTargetMonth: boolean,
}

export type TodoContext = {
  todos: Todo[],
  addNewTodo: (value: Todo) => void,
};

export type CalendarContextProp = {
  monthVisible: number,
  changeMonthVisible: (v: number) => void,
  month: Day[];
};

export type ProviderProps = {
  children: React.ReactNode,
};
