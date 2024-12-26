import {
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import { ScheduleDetail } from "./Home.hook";

interface MuiCardProps {
  scheduleDetail: ScheduleDetail;
}

const MuiCard = ({ scheduleDetail }: MuiCardProps) => {
  const { activity, time, location, locationURL, Phone } = scheduleDetail;

  return (
    <Badge
      overlap="circular"
      color="warning"
      badgeContent=""
      sx={{
        height: "fit-content",
        width: "90%",
        ".MuiBadge-badge": {
          border: "1px solid #fff",
          borderRadius: "50%",
          zIndex: 2,
          top: "0px",
          right: "1px",
        },
      }}
    >
      <Card
        sx={{
          width: "100%",
          padding: "10px",
          fontSize: "12px",
          margin: 0,
        }}
        variant="outlined"
      >
        <CardHeader
          sx={{ paddingBlock: "8px" }}
          title={`${time.format("HH:mm")} - ${activity?.toUpperCase()}`}
        />
        <CardContent sx={{ paddingBlock: "8px" }}>
          <Box sx={{ paddingBlock: 1 }}>
            <Typography variant="body1" sx={{ color: "primary" }}>
              Location:
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              {location}
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ color: "primary" }}>
            Phone: {Phone}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            variant="contained"
            tabIndex={-1}
            startIcon={<MapIcon />}
            href={locationURL}
          >
            GO TO MAP
          </Button>
        </CardActions>
      </Card>
    </Badge>
  );
};

export default MuiCard;
