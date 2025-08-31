import { useTheme } from "@mui/material";
import { Box, Container, Typography, Grid, Paper, Avatar, Card } from "@mui/material";
import { SportsEsports, EmojiEvents, Groups, TrendingUp } from "@mui/icons-material";
import WidgetsOnPage from "../../components/Containers/WidgetsOnPage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../state/store";
import { useSelector } from "react-redux";
import FlexEvenly from "../../components/FlexEvenly";

const Home = () => {
  const theme = useTheme();

  const stats = [
    { icon: <SportsEsports />, value: "1000+", label: "Active Games" },
    { icon: <EmojiEvents />, value: "500+", label: "Tournaments" },
    { icon: <Groups />, value: "10K+", label: "Players" },
    { icon: <TrendingUp />, value: "95%", label: "Growth" }
  ];
  const navigate = useNavigate();
  const owner = useSelector((state: RootState) => state.auth.owner);
  useEffect(() => {
    if (owner) {
      navigate("/owner/dashboard");
    }
  }, []);
  const features = [
    {
      icon: <SportsEsports />,
      title: "Game Management",
      description: "Easily manage your games, schedules, and player bookings all in one place."
    },
    {
      icon: <Groups />,
      title: "Player Engagement",
      description: "Connect with your player community and build lasting relationships."
    },
    {
      icon: <EmojiEvents />,
      title: "Tournament Hosting",
      description: "Organize and manage tournaments to attract more players to your venue."
    },
    {
      icon: <TrendingUp />,
      title: "Business Analytics",
      description: "Track your performance with detailed analytics and insights."
    }
  ];

  return (
    <WidgetsOnPage
      footer={true}
      isSidebarShouldBeOn={false}
      components={
        <Box>
          {/* Hero Section */}
          <Box
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              pt: 15,
              pb: 8,
              color: 'white',
              textAlign: 'center'
            }}
          >
            <Container maxWidth="lg">
              <Typography
                variant="h2"
                fontWeight="bold"
                gutterBottom
                sx={{ mb: 3 }}
              >
                Welcome to Your Gaming Business Hub
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  maxWidth: '800px',
                  mx: 'auto'
                }}
              >
                Manage Your Gaming Center, Grow Your Business, and Create Amazing Experiences
              </Typography>
            </Container>
          </Box>

          {/* Stats Section */}
          <FlexEvenly sx={{ my: 2 }}>
            <Grid container spacing={4}>
              {stats.map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <Paper
                    elevation={3}
                    sx={{
                      width: '10rem',
                      p: 3,
                      textAlign: 'center',
                      borderRadius: '15px'
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        width: 56,
                        height: 56,
                        mb: 2,
                        mx: 'auto'
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                    <Typography variant="h4" fontWeight="bold" color="primary">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </FlexEvenly>
{/* Features Section */}
<FlexEvenly flexDirection="column" sx={{ m: 8 }} alignItems="center">
  <Typography
    variant="h3"
    align="center"
    gutterBottom
    sx={{
      fontWeight: 'bold',
      mb: 6,
      color: theme.palette.primary.main
    }}
  >
    Powerful Tools for Your Success
  </Typography>

  <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: '1200px' }}>
    {features.map((feature, index) => (
      <Grid item xs={12} md={6} lg={3} key={index}>
        <Card
          elevation={2}
          sx={{
            p: 4,
            width: '30rem',
            height: '100%',
            borderRadius: '20px',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-10px)',
              boxShadow: '0 12px 20px rgba(0,0,0,0.1)'
            }
          }}
        >
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              width: 60,
              height: 60,
              mb: 3
            }}
          >
            {feature.icon}
          </Avatar>
          <Typography
            variant="h6"
            gutterBottom
            fontWeight="bold"
            color="primary"
          >
            {feature.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {feature.description}
          </Typography>
        </Card>
      </Grid>
    ))}
  </Grid>
</FlexEvenly>

        </Box>
      }
    />
  );
};

export default Home;