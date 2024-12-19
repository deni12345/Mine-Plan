import {
  IconButton,
  Stack,
  StackProps,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { MuiDrawer } from "./MuiDrawer";

const Home = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Grid container direction={"column"} alignContent={"center"}>
      <Grid flex={1} width={"100%"}>
        <AppBar open={open}>
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
        </AppBar>
      </Grid>
      <Grid>
        <MuiDrawer open={open} handleDrawerClose={handleDrawerClose} />
      </Grid>
    </Grid>
  );
};

export default Home;

interface AppBarProps extends StackProps {
  open?: boolean;
}

const AppBar = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: "100%",
        marginLeft: "10px",
        transition: theme.transitions.create(["margin"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));
