import { Badge, Card, StackProps, styled } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DateCalendar,
  DateView,
  DayCalendarSkeleton,
  LocalizationProvider,
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers";
import { FC, useCallback, useContext, useMemo } from "react";
import { HomeContext } from "./Home";
import dayjs from "dayjs";
import { PickerSelectionState } from "@mui/x-date-pickers/internals";
import MuiCard from "../component/MuiCard";
import { Schedule } from "../types/context";
import OverlayLoading from "../component/MuiOverlay";

interface MainProps extends AppBarProps {
  selectedDay: dayjs.Dayjs;
  setSelectedDay: (value: dayjs.Dayjs) => void;
}

interface AppBarProps extends StackProps {
  isloading?: boolean;
}

interface EventProps extends PickersDayProps<dayjs.Dayjs> {
  events?: dayjs.Dayjs[];
}

const Main = ({ isloading, setSelectedDay, selectedDay }: MainProps) => {
  const { trip } = useContext(HomeContext);
  const onDayChange = useCallback(
    (
      value: any,
      selectionState?: PickerSelectionState | undefined,
      selectedView?: DateView | undefined
    ): void => {
      selectedView === "day" && setSelectedDay(dayjs(value));
    },
    [setSelectedDay]
  );

  const eventSchedule = useMemo(() => {
    return trip?.schedules.find((schedule) =>
      schedule.planDate.isSame(selectedDay, "d")
    );
  }, [trip, selectedDay]);

  const events = useMemo<EventProps>(() => {
    return {
      events: trip?.schedules.map((schedule) => schedule.planDate),
    } as EventProps;
  }, [trip]);

  return (
    <MuiMain isloading={isloading}>
      {isloading ? (
        <OverlayLoading />
      ) : (
        <Grid
          container
          justifyContent={"space-evenly"}
          gap={2}
          paddingBlock={{ xs: 1, md: 2 }}
          paddingInline={{ xs: 1, sm: 2, md: 6 }}
        >
          <Grid component={Card} size={{ xs: 12, md: 3 }} paddingBlock={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                onChange={onDayChange}
                value={selectedDay}
                loading={isloading}
                renderLoading={() => <DayCalendarSkeleton />}
                slots={{
                  day: EventDaySlot,
                }}
                slotProps={{
                  day: events,
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid
            container
            size={{ xs: 12, md: 8 }}
            component={Card}
            paddingBlock={3}
            rowGap={2}
            justifyContent={"space-evenly"}
            maxHeight={"500px"}
            sx={{ overflowY: "auto" }}
          >
            <EventDaysContent schedule={eventSchedule} />
          </Grid>
        </Grid>
      )}
    </MuiMain>
  );
};

const EventDaysContent: FC<{ schedule: Schedule | undefined }> = ({
  schedule,
}) => {
  if (!schedule) return <h1>Event not found</h1>;

  return (
    <>
      {schedule.Detail?.map((detail, index) => (
        <MuiCard key={`${detail.location}#${index}`} detail={detail} />
      ))}
    </>
  );
};

const EventDaySlot = (props: EventProps) => {
  const { day, events = [], outsideCurrentMonth, ...other } = props;
  const isSelected = events.some(
    (event) => day.isSame(event) && !outsideCurrentMonth
  );

  return (
    <Badge overlap="circular" badgeContent={isSelected ? "✅" : undefined}>
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
};

const MuiMain = styled("main", {
  shouldForwardProp: (prop) => prop !== "isloading",
})<AppBarProps>(({ theme }) => ({
  height: "100vh",
  opacity: 0.5,
  transition: theme.transitions.create(["opacity"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ isloading }) => !isloading,
      style: {
        opacity: 1,
        transition: theme.transitions.create(["opacity"], {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

export default Main;
