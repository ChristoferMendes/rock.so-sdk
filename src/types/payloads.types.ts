export type TextFragment = {
  text: string;
};

export interface CreateNoteRequest {
  body: TextFragment[];
  labels?: string[];
  watchersIds?: string[];
}

export type RecurringScheduleDaysOfWeek = {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
};

export enum RecurringScheduleType {
  "DAILY",
  "DAYS_OF_WEEK",
  "DAY_OF_MONTH",
  "LAST_DAY_OF_MONTH",
}

export type RecurringSchedule = {
  targetListId: string;
  type: RecurringScheduleType;
  workdaysOnly: boolean;
  dayOfMonth: number;
  daysOfWeek: RecurringScheduleDaysOfWeek;
};

export enum ListIdStatusEnum {
  DONE = 1,
  TO_DO = 2,
  DOING = 3,
}

export enum PriorityEnum {
  LOWEST = -2,
  LOW = -1,
  MEDIUM = 0,
  HIGH = 1,
  HIGHEST = 2,
}

export interface CreateTaskRequest {
  body: TextFragment[];
  listId: ListIdStatusEnum;
  priority: PriorityEnum;
  title: string;
  start?: number;
  due?: number;
  owners?: string[];
  severity?: number;
  sprint?: number;
  checkList?: string[];
  recurringSchedule?: RecurringSchedule;
  customFields?: string[];
  labels?: string[];
  watchersIds?: string[];
}
