import { Dayjs } from "dayjs";
import { GoogleSpreadsheetWorksheet } from "google-spreadsheet";

export interface ContextType {
  trip?: Trip;
}

export interface Schedule {
  planDate: Dayjs;
  Detail: ScheduleDetail[];
}

export interface ScheduleDetail {
  time: Dayjs;
  activity?: string;
  location?: string;
  locationURL?: string;
  locationBackup?: string;
  locationBackupURL?: string;
}

export interface Car {
  route: string;
  brand: string;
  operateAt: Dayjs;
  location: string;
}

export interface Trip {
  title: string;
  schedules: Schedule[];
  cars: Car[];
}

export interface Plan {
  sheet: GoogleSpreadsheetWorksheet;
  trip: Trip;
}
