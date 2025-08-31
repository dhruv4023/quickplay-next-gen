import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import EventIcon from "@mui/icons-material/Event";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { motion } from "framer-motion";
import FlexBetween from "../../components/Containers/FlexBetween";

interface StatCardProps {
  title: string;
  value: number;
  Icon: React.ElementType;
  color: string;
  delay: number;
}

const StatCard = ({ title, value, Icon, color, delay }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
  >
    <Box
      sx={{
        background: color,
        borderRadius: 4,
        p: 3,
        color: "#fff",
        boxShadow: 4,
        width: "20rem",
        height: "10rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Icon sx={{ fontSize: 40, opacity: 0.9 }} />
        <Typography variant="h6" fontWeight="500">
          {title}
        </Typography>
      </Box>
      <Typography variant="h3" fontWeight="bold" mt={2}>
        {value}
      </Typography>
    </Box>
  </motion.div>
);

export const DashBoard = () => {
  const owner = useSelector((state: RootState) => state.auth.owner);

  // Replace with actual backend data
  const totalLocations = 5;
  const totalSessionTemplates = 12;
  const totalCurrentBookings = 8;
  const totalGames = 20;

  return (
    <Box>
      <WidgetsOnPage
        isSidebarShouldBeOn={true}
        components={
          <>
            <FlexBetween gap={2} flexWrap={"wrap"}>
              <StatCard
                title="Total Locations"
                value={totalLocations}
                Icon={LocationCityIcon}
                color="#2196f3"
                delay={0.1}
              />
              <StatCard
                title="Session Templates"
                value={totalSessionTemplates}
                Icon={ViewModuleIcon}
                color="#9c27b0"
                delay={0.2}
              />
              <StatCard
                title="Current Bookings"
                value={totalCurrentBookings}
                Icon={EventIcon}
                color="#ff9800"
                delay={0.3}
              />
              <StatCard
                title="Total Games"
                value={totalGames}
                Icon={SportsEsportsIcon}
                color="#4caf50"
                delay={0.4}
              />
            </FlexBetween>
          </>
        }
      />
    </Box>
  );
};
