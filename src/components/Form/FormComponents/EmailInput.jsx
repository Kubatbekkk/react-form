import { InputAdornment, TextField } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

const EmailInput = ({ register, errors }) => {
  return (
    <TextField
      fullWidth
      id="email"
      label="Email address"
      variant="filled"
      margin="normal"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <EmailIcon />
          </InputAdornment>
        ),
      }}
      {...register('email', {
        required: 'Email is required',
        pattern: {
          value:
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: 'Please enter a valid email',
        },
      })}
      error={!!errors.email}
      helperText={errors.email?.message}
    />
  );
};

export default EmailInput;
