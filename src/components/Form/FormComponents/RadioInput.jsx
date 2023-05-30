import React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Typography,
} from '@mui/material';
import { Controller } from 'react-hook-form';

const RadioInput = ({ errors, control }) => {
  return (
    <FormControl margin="normal">
      <FormLabel>Select your gender</FormLabel>
      <Controller
        control={control}
        name="gender"
        rules={{
          required: 'Please select your gender',
        }}
        render={({ field }) => (
          <RadioGroup
            {...field}
            name="radio-buttons-group"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>
        )}
        error={!!errors.gender}
      />
      {errors.gender && (
        <Typography variant="caption" sx={{ color: 'red' }}>
          {errors.gender?.message}
        </Typography>
      )}
    </FormControl>
  );
};

export default RadioInput;
