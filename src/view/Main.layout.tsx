import { IconButton, Toolbar, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import MenuIcon from "@mui/icons-material/Menu";
import { createContext, useState } from "react";
import { DrawerView } from "./DrawerView";
import { Trip } from "../types/context";
import useHome from "./Main.hook";
import PlanView from "./PlanView";
import MuiAppBar from "../component/MuiAppBar";
import dayjs from "dayjs";

export const HomeContext = createContext<Trip>({} as Trip);

const Main = () => {
  const { trip, isloading } = useHome();
  const [open, setOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<dayjs.Dayjs>(dayjs());

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Grid container direction={"column"} height={"100vh"} flexWrap={"nowrap"}>
      <HomeContext.Provider value={trip}>
        <Grid>
          <MuiAppBar open={open}>
            <Toolbar>
              <Typography
                variant="h6"
                flex={1}
                component="div"
                textAlign="center"
              >
                Persistent drawer
              </Typography>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={open ? handleDrawerClose : handleDrawerOpen}
                sx={{ marginRight: "12px", position: "absolute", right: 20 }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </MuiAppBar>
        </Grid>
        <Grid>
          <DrawerView open={open} handleDrawerClose={handleDrawerClose} />
        </Grid>
        <Grid flex={1}>
          <PlanView
            setSelectedDay={setSelectedDay}
            selectedDay={selectedDay}
            isloading={isloading}
          />
        </Grid>
      </HomeContext.Provider>
    </Grid>
  );
};

export default Main;
