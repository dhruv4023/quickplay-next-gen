import WidgetsOnPage from "../../components/Containers/WidgetsOnPage";
import { Box, Paper, Typography, Grid, Button, Container, useTheme, Card, Avatar, Divider } from "@mui/material";
import { SportsEsports, Group, EmojiEvents, Speed, Star, TrendingUp, Gamepad, PersonAdd } from "@mui/icons-material";
import { keyframes } from '@mui/system';

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const Home = () => {
  const theme = useTheme();

  const features = [
    { icon: <SportsEsports />, title: "Game Library", description: "Organize and manage your game collection with ease" },
    { icon: <Group />, title: "Community", description: "Connect with fellow gamers and share experiences" },
    { icon: <EmojiEvents />, title: "Achievements", description: "Track your gaming milestones and progress" },
    { icon: <Speed />, title: "Quick Access", description: "Launch your favorite games instantly" }
  ];

  const stats = [
    { icon: <Gamepad />, value: "1000+", label: "Games Available" },
    { icon: <PersonAdd />, value: "50K+", label: "Active Players" },
    { icon: <Star />, value: "4.8", label: "User Rating" },
    { icon: <TrendingUp />, value: "24/7", label: "Support" }
  ];

  return (
    <WidgetsOnPage 
      footer={true} 
      scrollable={false}
      isSidebarShouldBeOn={false} 
      components={
        <Box>
          {/* Hero Section */}
          <Box sx={{ 
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 50%, ${theme.palette.primary.main} 100%)`,
            color: 'white',
            py: 12,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            mb: 6,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <Container maxWidth="lg">
              <Typography 
                variant="h2" 
                sx={{ 
                  fontWeight: 900,
                  mb: 2,
                  animation: `${floatAnimation} 3s ease-in-out infinite`,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                Welcome to Quick Play
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4, 
                  opacity: 0.9,
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.6
                }}
              >
                Your Ultimate Gaming Companion - Discover, Play, and Connect with Gamers Worldwide
              </Typography>
              <Button 
                variant="contained" 
                size="large"
                sx={{
                  backgroundColor: 'white',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    transform: 'scale(1.05)'
                  },
                  transition: 'all 0.3s ease',
                  px: 6,
                  py: 2,
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}
              >
                Get Started Now
              </Button>
            </Container>
          </Box>

          {/* Stats Section */}
          <Container maxWidth="lg" sx={{ mb: 8 }}>
            <Grid container spacing={4}>
              {stats.map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <Paper 
                    elevation={0}
                    sx={{ 
                      p: 3,
                      textAlign: 'center',
                      background: 'rgba(255,255,255,0.8)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '15px',
                      border: `1px solid ${theme.palette.primary.light}`,
                      animation: `${pulseAnimation} ${3 + index * 0.2}s ease-in-out infinite`
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
          </Container>

          {/* Features Section */}
          <Container maxWidth="lg" sx={{ mb: 8 }}>
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
              Why Choose Quick Play?
            </Typography>
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={6} lg={3} key={index}>
                  <Card 
                    elevation={4}
                    sx={{ 
                      p: 4,
                      height: '100%',
                      borderRadius: '20px',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 12px 20px rgba(0,0,0,0.1)'
                      },
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      background: `linear-gradient(145deg, white, ${theme.palette.background.paper})`
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        width: 70,
                        height: 70,
                        mb: 3,
                        transform: 'rotate(-10deg)',
                        '&:hover': {
                          transform: 'rotate(0deg) scale(1.1)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      fontWeight="bold"
                      color="primary"
                      textAlign="center"
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      textAlign="center"
                      sx={{ lineHeight: 1.7 }}
                    >
                      {feature.description}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>

          {/* Call to Action */}
          <Container maxWidth="lg" sx={{ mb: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: 6,
                borderRadius: '30px',
                background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                color: 'white',
                textAlign: 'center'
              }}
            >
              <Typography variant="h4" gutterBottom fontWeight="bold">
                Ready to Start Your Gaming Journey?
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                Join thousands of gamers and take your gaming experience to the next level
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'white',
                  color: theme.palette.primary.main,
                  px: 6,
                  py: 2,
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.9)',
                    transform: 'scale(1.05)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Join Now
              </Button>
            </Paper>
          </Container>
        </Box>
      } 
    />
  );
};

export default Home;    