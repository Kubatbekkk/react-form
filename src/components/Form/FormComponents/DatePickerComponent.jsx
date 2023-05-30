import { FormControl } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DatePickerComponent = ({ control, errors }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <FormControl margin="normal">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          control={control}
          name="dateOfFlight"
          rules={{
            required: 'Please select date of flight',
            validate: (value) => {
              if (value < today) {
                return 'Date must not be earlier than today';
              }
              return true;
            },
          }}
          render={({ field }) => (
            <DatePicker
              {...field}
              value={field.value}
              onChange={(date) => field.onChange(date)}
              label="Select Date of Flight"
              slotProps={{
                textField: {
                  onBlur: field.onBlur,
                  variant: 'filled',
                  error: !!errors.dateOfFlight,
                  helperText: errors.dateOfFlight?.message,
                },
              }}
              inputFormat="MM/dd/yyyy"
              disablePast
            />
          )}
        />
      </LocalizationProvider>
    </FormControl>
  );
};

export default DatePickerComponent;
