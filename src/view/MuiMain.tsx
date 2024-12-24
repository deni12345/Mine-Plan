import {
  Badge,
  Box,
  Card,
  CircularProgress,
  Container,
  StackProps,
  styled,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { drawerWidth } from "./MuiDrawer";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DateCalendar,
  DayCalendarSkeleton,
  LocalizationProvider,
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers";
import { useContext } from "react";
import { HomeContext } from "./Home";
import dayjs from "dayjs";

interface AppBarProps extends StackProps {
  open?: boolean;
  isloading?: boolean;
}

interface EventProps extends PickersDayProps<dayjs.Dayjs> {
  events?: dayjs.Dayjs[];
}

const Main = ({ open, isloading }: AppBarProps) => {
  const { plan } = useContext(HomeContext);

  return (
    <MuiMain open={open} isloading={isloading}>
      {isloading ? (
        <Box
          component={Container}
          sx={{
            height: "100%",
            justifyContent: "center",
            alignContent: "center",
            textAlign: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid
          container
          justifyContent={"space-evenly"}
          gap={2}
          paddingBlock={{ xs: 1, md: 2 }}
          paddingInline={{ xs: 1, sm: 2, md: 6 }}
        >
          <Grid component={Card} size={{ xs: 12, md: 3 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                loading={isloading}
                renderLoading={() => <DayCalendarSkeleton />}
                slots={{
                  day: eventDay,
                }}
                slotProps={{
                  day: {
                    events: plan.trip.schedules.map(
                      (schedule) => schedule.planDate
                    ),
                  } as EventProps,
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }} textAlign={"center"} component={Card}>
            <Typography>test</Typography>
          </Grid>
        </Grid>
      )}
    </MuiMain>
  );
};

const eventDay = (props: EventProps) => {
  console.log(props);
  const { day, events = [], outsideCurrentMonth } = props;

  const isSelected = events.some(
    (event) => day.isSame(event) && !outsideCurrentMonth
  );

  return (
    <Badge overlap="circular" badgeContent={isSelected ? "✅" : undefined}>
      <PickersDay {...props} />
    </Badge>
  );
};

const MuiMain = styled("main", {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "isloading",
})<AppBarProps>(({ theme }) => ({
  height: "100%",
  opacity: 0.5,
  transition: theme.transitions.create(["margin", "opacity"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
    {
      props: ({ isloading }) => !isloading,
      style: {
        opacity: 1,
        transition: theme.transitions.create(["opacity"], {
          easing: theme.transitions.easing.easeIn,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

export default Main;
