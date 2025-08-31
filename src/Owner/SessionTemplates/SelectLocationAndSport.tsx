import { useEffect, useState } from 'react'
import { Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material'
import { isApiResponse } from '../../schemas/Response.schema'
import { SessionTemplate } from '../../schemas/SessionTemplate/SessionTemplate'
import { useAppSelector } from '../../state/store'
import { getLocationSortsApi } from './session.template'

type Props = {
  isEdit: boolean
  data: SessionTemplate
  setData: (data: SessionTemplate) => void
}

type Sport = {
  id: string
  name: string
}

type LocationData = {
  id: string
  name: string
  sports: Sport[]
}

const SelectLocationAndSport = ({ isEdit, data, setData }: Props) => {
  const token = useAppSelector((state) => state.auth.token)
  const [locations, setLocations] = useState<LocationData[]>([])
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null)

  const getLocationSports = async () => {
    if (!token) return;
    
    const response = await getLocationSortsApi(token);
    if (isApiResponse(response)) {
      const mapped = (response.data as any[])?.map((location: any) => ({
        id: location.locationId,
        name: location.locationName,
        sports: location.sport?.map((s: any) => ({
          id: s.id,
          name: s.name,
        })) || [],
      })) || []
      setLocations(mapped)

      if (data.locationId) {
        const loc = mapped.find((l: LocationData) => l.id === data.locationId)
        if (loc) setSelectedLocation(loc)
      }
    }
  }

  useEffect(() => {
    getLocationSports()
  }, [])

  const handleLocationChange = (event: any) => {
    const locationId = event.target.value
    const loc = locations.find((l) => l.id === locationId) || null
    setSelectedLocation(loc)
    setData({ ...data, locationId, sportId: '' })
  }

  const handleSportChange = (event: any) => {
    const sportId = event.target.value
    setData({ ...data, sportId })
  }

  const locationName = locations.find((l) => l.id === data.locationId)?.name || 'N/A'
  const sportName =
    selectedLocation?.sports.find((s) => s.id === data.sportId)?.name || 'N/A'

  return (
    <>
      {isEdit ? (
        <>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Select Location</InputLabel>
            <Select
              variant="standard"
              value={data.locationId || ''}
              onChange={handleLocationChange}
              label="Select Location"
            >
              {locations.map((loc) => (
                <MenuItem key={loc.id} value={loc.id}>
                  {loc.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedLocation && (
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Select Sport</InputLabel>
              <Select
                value={data.sportId || ''}
                variant="standard"
                onChange={handleSportChange}
                label="Select Sport"
              >
                {selectedLocation.sports.map((sport) => (
                  <MenuItem key={sport.id} value={sport.id}>
                    {sport.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </>
      ) : (
        <>
          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Location:</strong> {locationName}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            <strong>Sport:</strong> {sportName}
          </Typography>
        </>
      )}
    </>
  )
}

export default SelectLocationAndSport