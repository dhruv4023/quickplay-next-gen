import { Theme } from "@mui/material";

export const locationCardStyle = (theme: Theme) => ({
  borderRadius: theme.shape.borderRadius * 2.5,
  cursor: "pointer",
  height: "29rem",
  width: "24rem",
  padding: theme.spacing(2.5),
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
  color: theme.palette.text.primary,
  boxShadow: `
    0 4px 20px rgba(0,0,0,0.1),
    0 10px 40px rgba(0,0,0,0.1)
  `,
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)", // Safari support
  transition: "all 0.35s ease-in-out",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  "&:hover": {
    transform: "translateY(-8px) scale(1.02)",
    boxShadow: `
      0 8px 30px rgba(0, 0, 0, 0.15),
      0 16px 50px rgba(0, 0, 0, 0.2)
    `,
  },

  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background: `radial-gradient(circle at top left, rgba(255,255,255,0.15), transparent 70%)`,
    zIndex: 0,
  },

  // Optional inner layer for content clarity
  "& > *": {
    position: "relative",
    zIndex: 1,
  },
});


export const addButtonStyle = (theme: Theme) => ({
  background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  color: "#fff",
  borderRadius: "2rem",
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingTop: theme.spacing(1.2),
  paddingBottom: theme.spacing(1.2),
  fontWeight: "bold",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  textTransform: "none",
  transition: "all 0.3s ease-in-out",
  '&:hover': {
    background: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    transform: "translateY(-2px)",
  },
});
