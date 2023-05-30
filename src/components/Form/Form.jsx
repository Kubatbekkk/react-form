import React, { Fragment } from 'react';
import Modal from '../Modal/Modal';
import './style.css';
import {
  FormControl,
  FormGroup,
  FormLabel,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Checkbox,
  RadioGroup,
  Radio,
  Typography,
  Divider,
  Box,
} from '@mui/material';

import Textarea from '@mui/joy/Textarea';
import { useForm, Controller, useFieldArray } from 'react-hook-form';

// ? datepicker imports
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import NameInput from './FormComponents/NameInput';
import PasswordInput from './FormComponents/PasswordInput';
import EmailInput from './FormComponents/EmailInput';

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

const Form = () => {
  const [open, setOpen] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({});
  const defaultFormValues = {
    name: '',
    password: '',
    email: '',
    birthCity: '',
    acceptTerms: false,
    message: '',
    gender: '',
    dateOfFlight: null,
  };
  const form = useForm({
    defaultValues: defaultFormValues,
    mode: 'onBlur',
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'keywords',
  });

  const onSubmit = (data) => {
    setUserInfo(data);
    setOpen(true);
    reset(defaultFormValues);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <div className="form__container">
      <Typography
        variant="h4"
        sx={{ textAlign: 'center' }}
        color="primary"
        my={2}
      >
        Формочки
      </Typography>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <NameInput register={register} errors={errors} />
        <PasswordInput register={register} errors={errors} />
        <EmailInput register={register} errors={errors} />
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

        <Box display="flex" alignItems="center" justifyContent="space-between">
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
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
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

          <FormControl margin="normal">
            {/* <FormLabel sx={{ marginBottom: '5px' }}>Select your date</FormLabel> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                control={control}
                name="dateOfFlight"
                rules={{
                  required: 'Please select date of flight',
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
        </Box>

        <FormControl margin="normal" fullWidth>
          <FormLabel>Keywords</FormLabel>
          {fields.map((field, index) => (
            <Fragment key={field.id}>
              <Controller
                control={control}
                name={`keywords[${index}].value`}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} margin="normal" variant="filled" />
                )}
              />

              <Button
                variant="outlined"
                color="error"
                size="small"
                sx={{ width: '120px', textTransform: 'capitalize' }}
                onClick={() => remove(index)}
                disabled={index === fields.length - 1}
              >
                Remove
              </Button>
            </Fragment>
          ))}
          <Button
            variant="outlined"
            onClick={() => append({ value: '' })}
            size="small"
            sx={{
              width: '120px',
              textTransform: 'capitalize',
              marginTop: '5px',
            }}
          >
            Add Keyword
          </Button>
        </FormControl>
        <Button type="submit" variant="contained" fullWidth disabled={!isValid}>
          Submit
        </Button>
      </form>
      <Modal open={open} handleClose={handleClose} userInfo={userInfo} />
    </div>
  );
};

export default Form;
