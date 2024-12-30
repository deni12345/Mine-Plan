import dayjs from "dayjs";
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import { useEffect, useMemo, useRef, useState } from "react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Car, Schedule, Trip } from "../types/context";

const SHEET_ID = parseInt(process.env.REACT_APP_SHEET_ID ?? "", 10);
const DOC_ID = process.env.REACT_APP_DOC_ID ?? "";
dayjs.extend(customParseFormat);

const useHome = () => {
  const sheetRef = useRef<GoogleSpreadsheetWorksheet | null>(null);
  const [isloading, setIsLoading] = useState(true);
  const [trip, setTrip] = useState<Trip>({} as Trip);
  const doc = useMemo(() => {
    return new GoogleSpreadsheet(DOC_ID, {
      apiKey: "AIzaSyC5aUwKkR6alHA3jH8Ji9YQdHoTAlC1LlI",
    });
  }, []);

  useEffect(() => {
    const loadTripData = async () => {
      try {
        await doc.loadInfo();
        sheetRef.current = doc.sheetsById[SHEET_ID];
        let trip = await getCarInfo({
          sheet: sheetRef.current,
          trip: {} as Trip,
        });

        getTrip({ sheet: sheetRef.current, trip }).then(setTrip);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTripData();
  }, [doc]);

  return { trip, isloading, setIsLoading };
};

const getTrip = async ({
  sheet,
  trip,
}: {
  sheet: GoogleSpreadsheetWorksheet | null;
  trip: Trip;
}): Promise<Trip> => {
  if (!sheet) return trip;

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

    // if the first row contain date, create new schedule
    if (!!rawDate) {
      schs.push({
        planDate: dayjs(rawDate, "DD/MM/YYYY"),
        Detail: [],
      });
    }

    schs[schs.length - 1].Detail.push({
      time: dayjs(rawTime, "HH:mm"),
      activity: sheet.getCell(rowIndex, 2).formattedValue ?? undefined,
      location: sheet.getCell(rowIndex, 4).formattedValue ?? undefined,
      locationURL: sheet.getCell(rowIndex, 4).hyperlink ?? undefined,
      locationBackup: sheet.getCell(rowIndex, 5).formattedValue ?? undefined,
      locationBackupURL: sheet.getCell(rowIndex, 5).hyperlink ?? undefined,
    });
    return schs;
  }, []);

  return { ...trip, schedules: schedules } as Trip;
};

const getCarInfo = async ({
  sheet,
  trip,
}: {
  sheet: GoogleSpreadsheetWorksheet | null;
  trip: Trip;
}): Promise<Trip> => {
  if (!sheet) return trip;

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

  return { ...trip, cars: cars } as Trip;
};

export default useHome;
