export const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const January = 0;
export const December = 11;
export const CalendarYear = 2024;

export const mockedTags = [
  { id: '1', name: 'Work', color: '#60BE50' },
  { id: '2', name: 'Household', color: '#00129A' },
  { id: '3', name: 'Study', color: '#F2D701' },
];

export const mockedTasks = [
  {
    "id": "0d11028b-c31e-4681-b0c8-59c9add6192d",
    "description": "Drag and drop to move task to another day",
    "assign_date": new Date("2024-02-29T23:00:00.000Z"),
    "tags": []
  },
  {
    "id": "4bb4912d-c41d-4260-9e45-5b5904407a69",
    "description": "Drag and drop to reorder tasks in list",
    "assign_date": new Date("2024-03-06T23:00:00.000Z"),
    "tags": [
      "Study",
      "Household"
    ]
  },
  {
    "id": "330010e9-33a6-40e1-9495-c0c892904c16",
    "description": "Try to add a custom tag!",
    "assign_date": new Date("2024-03-02T23:00:00.000Z"),
    "tags": [
      "Work",
      "Study",
      "Household"
    ]
  },
  {
    "id": "5aca0b33-51ab-487e-94f3-43d7da1c210c",
    "description": "You can export calendar as PDF or Json file",
    "assign_date": new Date("2024-03-11T23:00:00.000Z"),
    "tags": [
      "Work"
    ]
  },
  {
    "id": "e76e40f0-f2f1-4262-b422-7b5368c98341",
    "description": "Hover over task to see editing options",
    "assign_date": new Date("2024-03-05T23:00:00.000Z"),
    "tags": []
  },
  {
    "id": "f8c8d8d7-c834-4ea8-9bf3-aa5bd7ce76b5",
    "description": "Hover over calendar icon to see todays holidays",
    "assign_date": new Date("2024-03-07T23:00:00.000Z"),
    "tags": [
      "Study"
    ]
  }
]
