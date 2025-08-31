import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
import { Navbar } from "../../navigation_componets/Navbar/Navbar";
import Sidebar from "../../navigation_componets/Sidebar/Sidebar";
import FlexEvenly from "../FlexEvenly";
import { ReactNode } from "react";
type WidgetsOnPageProps = {
  title?: string;
  components: ReactNode;
  isSidebarShouldBeOn?: boolean;
  footer?: boolean;
  scrollable?: boolean;
};

const WidgetsOnPage: React.FC<WidgetsOnPageProps> = ({
  title,
  components,
  isSidebarShouldBeOn = false,
  scrollable = true,
}) => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <Navbar />
      <FlexBetween height={scrollable ? "93vh" : "none"}>
        <Sidebar
          sidebarOn={isSidebarShouldBeOn}
          isNonMobileScreens={isNonMobileScreens}
        />
        <Box
          width={
            isNonMobileScreens ? "calc(100vw - 15rem)" : "calc(100vw - 4rem)"
          }
          gap={2}
          flexGrow={1}
          maxHeight={scrollable ? "93vh" : "none"}
          overflow="auto"
        >
          {title && (
            <Box
              width="100%"
              textAlign="center"
              padding={2}
            >
              <Typography
                fontWeight="bold"
                fontSize="1.5rem"
                color={theme.palette.secondary.main}
              >
                {title}
              </Typography>
            </Box>
          )}
          <FlexBetween mx={1} my={2}>
            <Box
              display="grid"
              gridTemplateColumns={"1fr"}
              gap={1}
              width="100%"
            >
              {components}
            </Box>
          </FlexBetween>
        </Box>
      </FlexBetween>
    </Box>
  );
};


4