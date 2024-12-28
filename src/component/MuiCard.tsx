import {
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import { ScheduleDetail } from "../types/context";

interface MuiCardProps {
  detail: ScheduleDetail;
}

const MuiCard = ({ detail: scheduleDetail }: MuiCardProps) => {
  const {
    activity,
    time,
    location,
    locationURL,
    locationBackup,
    locationBackupURL,
  } = scheduleDetail;

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
          {locationBackup && (
            <Box sx={{ paddingBlock: 1 }}>
              <Typography variant="body1" sx={{ color: "primary" }}>
                Location Backup:
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                {locationBackup}
              </Typography>
            </Box>
          )}
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            tabIndex={-1}
            startIcon={<MapIcon />}
            href={locationURL ?? undefined}
          >
            LOCATION
          </Button>
          {locationBackupURL && (
            <Button
              variant="contained"
              tabIndex={-1}
              startIcon={<MapIcon />}
              href={locationBackupURL ?? undefined}
            >
              LOCATION BACKUP
            </Button>
          )}
        </CardActions>
      </Card>
    </Badge>
  );
};

export default MuiCard;
