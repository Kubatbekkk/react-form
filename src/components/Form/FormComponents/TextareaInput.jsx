import { Textarea } from '@mui/joy';
import { FormControl, Typography } from '@mui/material';

const TextareaInput = ({ errors, register }) => {
  return (
    <FormControl margin="normal" fullWidth>
      <Textarea
        placeholder="Type in here…"
        minRows={3}
        maxRows={3}
        size="sm"
        variant="outlined"
        margin="normal"
        {...register('message', {
          required: 'Message is required',
          maxLength: {
            value: 200,
            message: 'Message should not exceed 200 characters',
          },
        })}
        error={!!errors.message}
      />
      {errors.message && (
        <Typography variant="caption" sx={{ color: 'red' }}>
          {errors.message?.message}
        </Typography>
      )}
    </FormControl>
  );
};

export default TextareaInput;
