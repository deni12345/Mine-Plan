import dayjs, { Dayjs } from "dayjs";
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import { useEffect, useMemo, useRef, useState } from "react";
import customParseFormat from "dayjs/plugin/customParseFormat";

const DOC_ID = "18K9zsT265iGksYYClDnmWPWu02XayD2ujj44qFXLnAM";
const SHEET_ID = 1482047481;

export interface Schedule {
  planDate: Dayjs;
  Detail: ScheduleDetail[];
}

export interface ScheduleDetail {
  time: Dayjs;
  activity?: string;
  location?: string;
  locationURL?: string;
  Phone?: string;
  Cost?: number;
}

export interface Car {
  route: string;
  brand: string;
  operateAt: Dayjs;
  location: string;
}

interface Trip {
  title: string;
  schedules: Schedule[];
  cars: Car[];
}

export interface Plan {
  sheet: GoogleSpreadsheetWorksheet;
  trip: Trip;
}

const useHome = () => {
  const sheetRef = useRef<GoogleSpreadsheetWorksheet | null>(null);
  const [isloading, setIsLoading] = useState(true);
  const [plan, setPlan] = useState<Plan>({} as Plan);

  const doc = useMemo(() => {
    return new GoogleSpreadsheet(DOC_ID, {
      apiKey: "AIzaSyC5aUwKkR6alHA3jH8Ji9YQdHoTAlC1LlI",
    });
  }, []);

  dayjs.extend(customParseFormat);

  useEffect(() => {
    const loadTripData = async () => {
      try {
        await doc.loadInfo();
        sheetRef.current = doc.sheetsById[SHEET_ID];
        let plan = await getCarInfo({
          sheet: sheetRef.current,
          trip: {} as Trip,
        });

        plan = await getPlan(plan);
        setPlan(plan);
        console.log(plan);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTripData();
  }, [doc]);

  return { plan, isloading, setIsLoading };
};

const getPlan = async ({ sheet, trip }: Plan): Promise<Plan> => {
  if (!sheet) return { sheet, trip };

  // load rows from sheet
  const rows = await sheet?.getRows({
    offset: 19,
    limit: 33,
  });
  // pre-load cells use for crawl data
  await sheet?.loadCells("A21:G53");

  let schedules: Schedule[] = rows.reduce((schs: Schedule[], row) => {
    if (!Object.keys(row.toObject()).length) {
      return schs;
    }
    // get raw date and time
    const rowIndex = row.rowNumber - 1;
    const rawTime = sheet.getCell(rowIndex, 1).formattedValue?.trim();
    const rawDate = sheet
      .getCell(rowIndex, 0)
      .formattedValue?.replace(/\n.*/, "");
    console.log("rawDate", rawDate);

    // if the first row contain date, create new schedule
    if (!!rawDate) {
      schs.push({
        planDate: dayjs(rawDate, "DD/MM/YYYY"),
        Detail: [],
      });
    }
    schs[schs.length - 1].Detail.push({
      time: dayjs(rawTime, "HH:mm"),
      activity: sheet.getCell(rowIndex, 2).formattedValue ?? "",
      location: sheet.getCell(rowIndex, 4).formattedValue ?? "",
      locationURL: sheet.getCell(rowIndex, 4).hyperlink ?? "",
    });
    return schs;
  }, []);

  return { sheet, trip: { ...trip, schedules: schedules } } as Plan;
};

const getCarInfo = async ({ sheet, trip }: Plan): Promise<Plan> => {
  if (!sheet) return { sheet, trip };

  //load rows from sheet
  const rows = await sheet?.getRows({
    offset: 4,
    limit: 6,
  });
  // pre-load cells use for crawl data
  await sheet?.loadCells("A6:G11");

  let cars: Car[] = rows.reduce((cars: Car[], row) => {
    if (!Object.keys(row.toObject()).length) {
      return cars;
    }

    const rowIndex = row.rowNumber - 1;

    cars.push({
      route: sheet.getCell(rowIndex, 0).formattedValue ?? "",
      brand: sheet.getCell(rowIndex, 5).formattedValue ?? "",
      operateAt: dayjs(
        sheet.getCell(rowIndex, 3).formattedValue?.trim(),
        "DD/MM/YYYY HH:mm:ss"
      ),
      location: sheet.getCell(rowIndex, 4).formattedValue ?? "",
    });
    return cars;
  }, []);

  return {
    sheet,
    trip: { ...trip, cars },
  } as Plan;
};

export default useHome;
