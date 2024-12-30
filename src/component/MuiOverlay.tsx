import { Box, CircularProgress, Container } from "@mui/material";

const OverlayLoading = () => {
  return (
    <Box
      sx={{
        height: "100%",
        justifyContent: "center",
        alignContent: "center",
        textAlign: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default OverlayLoading;
