export interface Trip {
  id: string;
  days: Day[];
  title: string;
}

export interface PackingItem {
  id: string;
  label: string;
  icon: string;
  checked: boolean;
}

export interface Task {
  id: string;
  text: string;
  optional: boolean;
  done: boolean;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  destiny: string;
  icon: string;
  photos: string[];
  tasks: Task[];
}

export interface Day {
  id: string;
  n: number;
  title: string;
  date: string;
  budget: Budget;
  packingItems: PackingItem[];
  activities: Activity[];
}

export interface Budget {
  expected: number;
  spent: number;
}
