import { Stack, StackProps, styled } from "@mui/material";

interface AppBarProps extends StackProps {
  open?: boolean;
}

const MuiAppBar = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(["margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: "10px",
        transition: theme.transitions.create(["margin"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

export default MuiAppBar;
