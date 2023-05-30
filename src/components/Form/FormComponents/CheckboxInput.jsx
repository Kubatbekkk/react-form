import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Typography,
} from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

const CheckboxInput = ({ control, errors }) => {
  return (
    <FormControl margin="normal">
      <FormGroup
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <Controller
          control={control}
          name="acceptTerms"
          rules={{
            validate: (value) =>
              value === true ||
              'Please accept the Terms & Conditions in order to proceed',
          }}
          render={({ field }) => (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
                label="Accept Terms & Conditions"
              />
              {errors.acceptTerms && (
                <Typography variant="caption" sx={{ color: 'red' }}>
                  {errors.acceptTerms?.message}
                </Typography>
              )}
            </>
          )}
        />
      </FormGroup>
    </FormControl>
  );
};

export default CheckboxInput;
