import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  IconButton,
} from '@mui/material';
import { Location } from '../../schemas/Location/OwnerLocation.schema';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { setSelectedLocation } from '../../state/slices/locationSlice';
import { useAppDispatch } from '../../state/store';
import { getSportIcon } from './location.util';
import { locationCardStyle } from './Owner.css';

interface LocationComponentProps {
  location: Location;
}

const LocationCardView = ({ location }: LocationComponentProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  return (
    <Card sx={locationCardStyle(theme)}
      onClick={() => {
        dispatch(setSelectedLocation(location));
        navigate(`/owner/locations/${location._id}`);
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography fontWeight="bold" variant="h6">
            {location.locationName}
          </Typography>
        </Box>

        <Stack spacing={2}>
          <Box>
            <Typography fontWeight="bold" variant="subtitle2" color="text.secondary" gutterBottom>
              Address
            </Typography>
            <Typography variant="body2">{location.area}</Typography>
            <Typography variant="body2">{location.addressLine1}</Typography>
            <Typography variant="body2">{location.addressLine2}</Typography>
            <Typography variant="body2">
              {location.city}, {location.state}
            </Typography>
          </Box>
          <Box>
            <Typography fontWeight="bold" variant="subtitle2" color="text.secondary" gutterBottom>
              Available Sports
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {(location?.sports || []).map((sport, index) => (
                <Chip
                  key={index}
                  icon={getSportIcon(sport.name)}
                  label={sport.name}
                  sx={{
                    borderRadius: '12px',
                    background: 'rgba(25, 118, 210, 0.08)',
                    '& .MuiChip-icon': {
                      color: theme.palette.primary.main,
                    },
                  }}
                />
              ))}
            </Stack>
          </Box>
          {location?.mapLink && (
            <Box>
              <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" gutterBottom>
                Map Location
              </Typography>
              <Typography
                variant="body2"
                component="a"
                href={location.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                View on Google Maps
              </Typography>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default LocationCardView;
