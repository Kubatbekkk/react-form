import { TextField, InputAdornment } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

const NameTextField = ({ register, errors }) => {
  return (
    <TextField
      id="name"
      aria-describedby="name"
      fullWidth
      label="Name"
      variant="filled"
      margin="normal"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <AccountCircle />
          </InputAdornment>
        ),
      }}
      {...register('name', {
        required: 'Name is required',
        minLength: {
          value: 3,
          message: 'Name should be at least 3 characters',
        },
      })}
      error={!!errors.name}
      helperText={errors.name?.message}
    />
  );
};

export default NameTextField;
