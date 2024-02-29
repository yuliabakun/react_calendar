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
  holidays: Holiday[],
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
};
