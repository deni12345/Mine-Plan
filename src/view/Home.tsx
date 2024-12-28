import { IconButton, Toolbar, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import MenuIcon from "@mui/icons-material/Menu";
import { createContext, useEffect, useState } from "react";
import { MuiDrawer } from "./MuiDrawer";
import { ContextType, Trip } from "../types/context";
import useHome from "./Home.hook";
import Main from "./MuiMain";
import MuiAppBar from "../component/MuiAppBar";
import dayjs from "dayjs";

export const HomeContext = createContext<ContextType>({
  trip: {} as Trip,
});

const Home = () => {
  const { plan, isloading } = useHome();
  const [open, setOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<dayjs.Dayjs>(dayjs());

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Grid container direction={"column"}>
      <HomeContext.Provider value={{ trip: plan.trip }}>
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
          <MuiDrawer open={open} handleDrawerClose={handleDrawerClose} />
        </Grid>
        <Grid flex={1}>
          <Main
            setSelectedDay={setSelectedDay}
            selectedDay={selectedDay}
            isloading={isloading}
          />
        </Grid>
      </HomeContext.Provider>
    </Grid>
  );
};

export default Home;
