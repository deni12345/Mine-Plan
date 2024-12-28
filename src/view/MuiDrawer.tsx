import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import DirectionsBusFilledOutlinedIcon from "@mui/icons-material/DirectionsBusFilledOutlined";
import { styled } from "@mui/material/styles";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";

export const drawerWidth = 240;

interface MuiDrawerProps {
  open?: boolean;
  handleDrawerClose?: () => void;
}

export const MuiDrawer = (props: MuiDrawerProps) => {
  const theme = useTheme();
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
        zIndex: 2,
      }}
      variant="persistent"
      anchor="left"
      open={props.open}
    >
      <DrawerHeader>
        <IconButton onClick={props.handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DirectionsBusFilledOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Transport"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <TimerOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Count Down"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
