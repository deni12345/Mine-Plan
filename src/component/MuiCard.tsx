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
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
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
          title={
            <Typography fontWeight={600} variant="h5">{`${time.format(
              "HH:mm"
            )} - ${activity?.toUpperCase()}`}</Typography>
          }
        />
        <CardContent sx={{ padding: "0px 14px" }}>
          <Box paddingBlock={1}>
            <Typography
              variant="body1"
              display="flex"
              alignItems={"center"}
              fontWeight={600}
            >
              <LocationOnOutlinedIcon />
              Location:
            </Typography>
            <Typography variant="body1" paddingInline={3}>
              {location}
            </Typography>
          </Box>
          {locationBackup && (
            <Box paddingBlock={1}>
              <Typography
                variant="body1"
                display="flex"
                alignItems={"center"}
                fontWeight={600}
              >
                <LocationOnOutlinedIcon /> Backup:
              </Typography>
              <Typography variant="body1" paddingInline={3}>
                {locationBackup}
              </Typography>
            </Box>
          )}
        </CardContent>
        <CardActions sx={{ paddingInline: "16px" }}>
          <Button
            variant="contained"
            size="medium"
            startIcon={<MapIcon />}
            href={locationURL ?? undefined}
          >
            LOCATION
          </Button>
          {locationBackupURL && (
            <Button
              variant="contained"
              size="medium"
              startIcon={<MapIcon />}
              href={locationBackupURL ?? undefined}
            >
              BACKUP
            </Button>
          )}
        </CardActions>
      </Card>
    </Badge>
  );
};

export default MuiCard;
