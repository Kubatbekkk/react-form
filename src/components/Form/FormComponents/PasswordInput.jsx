import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

const PasswordInput = ({ register, errors }) => {
  return (
    <TextField
      id="password"
      type="password"
      aria-describedby="password"
      fullWidth
      label="Password"
      variant="filled"
      margin="normal"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <AccountCircle />
          </InputAdornment>
        ),
      }}
      {...register('password', {
        required: 'Password is required',
        minLength: {
          value: 8,
          message: 'Password should be at least 8 characters',
        },
        pattern: {
          value: /^(?=.*[A-Z])(?=.*\d).*$/,
          message:
            'Password should contain at least one uppercase letter and one digit',
        },
      })}
      error={!!errors.password}
      helperText={errors.password?.message}
    />
  );
};

export default PasswordInput;
