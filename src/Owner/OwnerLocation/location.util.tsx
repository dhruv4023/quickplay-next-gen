import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

export const getSportIcon = (sportName: string) => {
  switch (sportName.toLowerCase()) {
    case 'cricket':
      return <SportsCricketIcon />;
    case 'football':
      return <SportsSoccerIcon />;
    default:
      return <SportsBasketballIcon />;
  }
};


export const SPORTS = [
  {
    _id: "1",
    name: "Cricket",
    icon: "cricket.png"
  },
  {
    _id: "2",
    name: "Football",
    icon: "football.png"
  },
  {
    _id: "3",
    name: "Tennis",
    icon: "tennis.png"
  },
  {
    _id: "4",
    name: "Badminton",
    icon: "badminton.png"
  },
  {
    _id: "5",
    name: "Basketball",
    icon: "basketball.png"
  }
]