import WidgetsOnPage from "../../components/Containers/WidgetsOnPage";
import { Box, Paper, Typography, Grid, Button, TextField, Container, Link, IconButton, useTheme } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn, Email, Phone, LocationOn, 
  SportsEsports, Group, EmojiEvents, AutoAwesome, RocketLaunch, 
  Security } from "@mui/icons-material";
import { floatAnimation } from "../../utils/animation";


const HomePage = () => {
  const theme = useTheme();

  return (
    <WidgetsOnPage footer={true} isSidebarShouldBeOn={false} components={
      <Box>
        <Box sx={{ 
          background: 'linear-gradient(135deg, #2196F3 0%, #21CBF3 50%, #2196F3 100%)',
          color: 'white',
          py: 12,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
          }
        }}>
          <Container>
            <Box sx={{ 
              animation: `${floatAnimation} 6s ease-in-out infinite`,
              mb: 4
            }}>
              <SportsEsports sx={{ fontSize: 80, color: 'white' }} />
            </Box>
            <Typography variant="h2" gutterBottom sx={{ 
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
              mb: 2
            }}>
              Quick Play App
            </Typography>
            <Typography variant="h5" sx={{ 
              mb: 4,
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
            }}>
              Your Ultimate Gaming Companion
            </Typography>
            <Button 
              variant="contained" 
              color="secondary" 
              size="large"
              endIcon={<RocketLaunch />}
              sx={{
                borderRadius: '25px',
                px: 4,
                py: 1.5,
                boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              Get Started
            </Button>
          </Container>
        </Box>

        {/* Features Section */}
        <Container sx={{ py: 8 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ 
            fontWeight: 'bold',
            mb: 6,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '4px',
              background: theme.palette.primary.main,
              borderRadius: '2px'
            }
          }}>
            Features
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mt: 2 }}>
            <Box sx={{ flex: '1 1 45%', minWidth: '300px' }}>
              <Paper elevation={3} sx={{ 
                p: 4, 
                height: '100%',
                borderRadius: '15px',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SportsEsports sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }} />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Game Library Management
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  - Add and organize your game collection<br />
                  - Track game progress and achievements<br />
                  - Categorize by genre, platform, and more<br />
                  - Set custom tags and filters
                </Typography>
              </Paper>
            </Box>
            <Box sx={{ flex: '1 1 45%', minWidth: '300px' }}>
              <Paper elevation={3} sx={{ 
                p: 4, 
                height: '100%',
                borderRadius: '15px',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Group sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }} />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Social Features
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  - Connect with friends and share progress<br />
                  - Compare game collections<br />
                  - Join gaming communities<br />
                  - Share achievements and milestones
                </Typography>
              </Paper>
            </Box>
          </Box>
        </Container>

        {/* About Us Section */}
        <Box sx={{ 
          bgcolor: 'background.paper', 
          py: 8,
          background: 'linear-gradient(45deg, #f5f5f5 30%, #ffffff 90%)'
        }}>
          <Container>
            <Typography variant="h4" align="center" gutterBottom sx={{ 
              fontWeight: 'bold',
              mb: 6,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '4px',
                background: theme.palette.primary.main,
                borderRadius: '2px'
              }
            }}>
              About Us
            </Typography>
            <Typography variant="body1" align="center" sx={{ 
              maxWidth: 800, 
              mx: 'auto', 
              mb: 6,
              fontSize: '1.1rem',
              lineHeight: 1.8
            }}>
              Quick Play is dedicated to revolutionizing how gamers manage and share their gaming experiences. 
              Our platform combines powerful organization tools with social features to create a comprehensive 
              gaming ecosystem.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
              <Box sx={{ flex: '1 1 300px', maxWidth: '400px' }}>
                <Paper elevation={3} sx={{ 
                  p: 4, 
                  textAlign: 'center',
                  borderRadius: '15px',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                  }
                }}>
                  <AutoAwesome sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 2 }} />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Our Mission</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    To provide gamers with the best tools to organize, track, and share their gaming journey.
                  </Typography>
                </Paper>
              </Box>
              <Box sx={{ flex: '1 1 300px', maxWidth: '400px' }}>
                <Paper elevation={3} sx={{ 
                  p: 4, 
                  textAlign: 'center',
                  borderRadius: '15px',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                  }
                }}>
                  <EmojiEvents sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 2 }} />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Our Vision</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    To create a global community where gamers can connect and share their passion.
                  </Typography>
                </Paper>
              </Box>
              <Box sx={{ flex: '1 1 300px', maxWidth: '400px' }}>
                <Paper elevation={3} sx={{ 
                  p: 4, 
                  textAlign: 'center',
                  borderRadius: '15px',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                  }
                }}>
                  <Security sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 2 }} />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Our Values</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Innovation, Community, and Passion for Gaming.
                  </Typography>
                </Paper>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Contact Us Section */}
        <Container sx={{ py: 8 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ 
            fontWeight: 'bold',
            mb: 6,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '4px',
              background: theme.palette.primary.main,
              borderRadius: '2px'
            }
          }}>
            Contact Us
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            <Box sx={{ flex: '1 1 45%', minWidth: '300px' }}>
              <Paper elevation={3} sx={{ 
                p: 4,
                borderRadius: '15px',
                background: 'linear-gradient(45deg, #f5f5f5 30%, #ffffff 90%)'
              }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Get in Touch</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Email sx={{ fontSize: 30, color: theme.palette.primary.main, mr: 2 }} />
                  <Typography>support@quickplay.com</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Phone sx={{ fontSize: 30, color: theme.palette.primary.main, mr: 2 }} />
                  <Typography>+1 (555) 123-4567</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOn sx={{ fontSize: 30, color: theme.palette.primary.main, mr: 2 }} />
                  <Typography>123 Gaming Street, Virtual City</Typography>
                </Box>
              </Paper>
            </Box>
            <Box sx={{ flex: '1 1 45%', minWidth: '300px' }}>
              <Paper elevation={3} sx={{ 
                p: 4,
                borderRadius: '15px',
                background: 'linear-gradient(45deg, #f5f5f5 30%, #ffffff 90%)'
              }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Send us a Message</Typography>
                <Box component="form" sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    label="Name"
                    margin="normal"
                    variant="outlined"
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                      }
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    variant="outlined"
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                      }
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Message"
                    multiline
                    rows={4}
                    margin="normal"
                    variant="outlined"
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                      }
                    }}
                  />
                  <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ 
                      mt: 2,
                      borderRadius: '25px',
                      px: 4,
                      py: 1.5,
                      boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Send Message
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Container>

        {/* Footer */}
        <Box sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          py: 6,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #2196F3, #21CBF3, #2196F3)'
          }
        }}>
          <Container>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              <Box sx={{ flex: '1 1 300px' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Quick Play</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Your ultimate gaming companion for managing and sharing your gaming experiences.
                </Typography>
              </Box>
              <Box sx={{ flex: '1 1 300px' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Quick Links</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Link href="#" color="inherit" sx={{ mb: 1, '&:hover': { opacity: 0.8 } }}>Home</Link>
                  <Link href="#" color="inherit" sx={{ mb: 1, '&:hover': { opacity: 0.8 } }}>Features</Link>
                  <Link href="#" color="inherit" sx={{ mb: 1, '&:hover': { opacity: 0.8 } }}>About Us</Link>
                  <Link href="#" color="inherit" sx={{ '&:hover': { opacity: 0.8 } }}>Contact</Link>
                </Box>
              </Box>
              <Box sx={{ flex: '1 1 300px' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Follow Us</Typography>
                <Box>
                  <IconButton color="inherit" sx={{ '&:hover': { transform: 'scale(1.1)' } }}>
                    <Facebook />
                  </IconButton>
                  <IconButton color="inherit" sx={{ '&:hover': { transform: 'scale(1.1)' } }}>
                    <Twitter />
                  </IconButton>
                  <IconButton color="inherit" sx={{ '&:hover': { transform: 'scale(1.1)' } }}>
                    <Instagram />
                  </IconButton>
                  <IconButton color="inherit" sx={{ '&:hover': { transform: 'scale(1.1)' } }}>
                    <LinkedIn />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                © {new Date().getFullYear()} Quick Play. All rights reserved.
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    } />
  );
};

export default HomePage;