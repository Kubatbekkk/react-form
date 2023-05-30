import React, { Fragment } from 'react';
import Modal from '../Modal/Modal';
import './style.css';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  TextField,
  Button,
  RadioGroup,
  Radio,
  Typography,
  Divider,
  Box,
} from '@mui/material';

import { useForm, Controller, useFieldArray } from 'react-hook-form';

// ? datepicker imports
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import NameInput from './FormComponents/NameInput';
import PasswordInput from './FormComponents/PasswordInput';
import EmailInput from './FormComponents/EmailInput';
import SelectInput from './FormComponents/SelectInput';
import CheckboxInput from './FormComponents/CheckboxInput';
import TextareaInput from './FormComponents/TextareaInput';
import RadioInput from './FormComponents/RadioInput';

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
        <SelectInput errors={errors} control={control} />
        <CheckboxInput errors={errors} control={control} />
        <TextareaInput errors={errors} register={register} />

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <RadioInput errors={errors} control={control} />

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
