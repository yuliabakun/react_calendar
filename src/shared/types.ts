export type Tag = {
  id: string,
  name: string,
  color: string,
}

export type Task = {
  id: string,
  description: string,
  assign_date: Date | null,
  tags: string[],
}

export type Day = {
  id: string,
  date: Date,
  isTargetMonth: boolean,
  holidays?: Holiday[],
  items: Task[],
}

export type Holiday = {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[];
  launchYear: number | null;
  types: string[];
}

export type DayListItem = {
  id: string,
  date: Date,
  isTargetMonth: boolean,
  holidays?: Holiday[],
  items: Task[],
}

// components props
export type AddTagBarProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export type AddTaskProps = {
  open: boolean,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export type HeaderProps = {
  handlePdfExport: () => void,
}

export type ExportImportBarProps = {
  handleJsonExport: (data: Task[], type: string) => void,
  handleJsonImport: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handlePdfExport: () => void,
}

export type CalendarItemProps = {
  item: Day,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  holidays?: Holiday[],
  children: React.ReactNode;
}

export type DayActionsBarProps = {
  day: Day,
  onModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export type FilterBarProps = {
  isBarOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export type ReorderableListProps = {
  lists: DayListItem[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDragEnd: (v: any) => void,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export type TagItemProps = {
  tag: Tag,
}

export type TaskItemProps = {
  task: Task,
}