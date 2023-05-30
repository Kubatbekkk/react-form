import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { Controller } from 'react-hook-form';

const cities = [
  '',
  'Bishkek',
  'Osh',
  'Jalalabad',
  'Kara-Balta',
  'Issykkul',
  'Batken',
  'Naryn',
  'Talas',
  'Tokmok',
];

const SelectInput = ({ errors, control }) => {
  return (
    <FormControl sx={{ width: '100%' }} margin="normal">
      <InputLabel id="custom-select-label">Select City of Birth</InputLabel>
      <Controller
        control={control}
        name="birthCity"
        rules={{ required: 'City of Birth is required' }}
        render={({ field }) => (
          <Select
            {...field}
            labelId="custom-select-label"
            id="custom-select"
            label="Select City of Birth"
            fullWidth
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            error={!!errors.birthCity}
          >
            <MenuItem value="">None</MenuItem>
            {cities.map((birthCity) => {
              return (
                <MenuItem key={birthCity} value={birthCity}>
                  {birthCity}
                </MenuItem>
              );
            })}
          </Select>
        )}
      />

      {errors.birthCity && (
        <Typography variant="caption" sx={{ color: 'red' }}>
          {errors.birthCity?.message}
        </Typography>
      )}
    </FormControl>
  );
};

export default SelectInput;
