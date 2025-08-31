import { Box, Grid } from "@mui/material";
import React from "react";

interface FlexibleGridProps {
  children: React.ReactNode;
  minWidth?: string; // Minimum width for each item
  gap?: number;
  alignItems?: string;
  justifyContent?: string;
  padding?: number;
  border?: number;
  sx?: object; // Additional styles
}

const FlexibleGrid: React.FC<FlexibleGridProps> = ({
  children,
  minWidth = "5.5rem", // Ensures wrapping to the next row
  gap = 1,
  alignItems = "center",
  justifyContent = "center",
  padding = 2,
  border = 0,
  sx = {},
}) => {
  return (
    <Grid
      container
      sx={{
        ...sx,
        display: "grid",
        gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}, 1fr))`, // Ensures wrapping
        gap: gap,
        alignItems: alignItems,
        justifyContent: justifyContent,
      }}
    >
      {React.Children.map(children, (child, index) => (
        <Box key={index} border={border} p={padding}>
          {child}
        </Box>
      ))}
    </Grid>
  );
};

export default FlexibleGrid;
