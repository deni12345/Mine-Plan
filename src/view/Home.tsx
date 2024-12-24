import { IconButton, Toolbar, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import MenuIcon from "@mui/icons-material/Menu";
import { createContext, useState } from "react";
import { MuiDrawer } from "./MuiDrawer";
import { ContextType } from "../types/context";
import useHome, { Plan } from "./Home.hook";
import Main from "./MuiMain";
import MuiAppBar from "./MuiAppBar";

export const HomeContext = createContext<ContextType>({
  plan: {} as Plan,
});

const Home = () => {
  const { plan, isloading } = useHome();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Grid container direction={"column"} height={"100vh"}>
      <HomeContext.Provider value={{ plan }}>
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
          <Main open={open} isloading={isloading} />
        </Grid>
      </HomeContext.Provider>
    </Grid>
  );
};

export default Home;
