import React, { Fragment } from 'react';
import './style.css';
import {
  FormControl,
  FormLabel,
  TextField,
  Button,
  Typography,
  Divider,
  Box,
} from '@mui/material';

import { useForm, Controller, useFieldArray } from 'react-hook-form';
import NameInput from './FormComponents/NameInput';
import PasswordInput from './FormComponents/PasswordInput';
import EmailInput from './FormComponents/EmailInput';
import SelectInput from './FormComponents/SelectInput';
import CheckboxInput from './FormComponents/CheckboxInput';
import TextareaInput from './FormComponents/TextareaInput';
import RadioInput from './FormComponents/RadioInput';
import Modal from '../Modal/Modal';
import { DesktopDateTimePicker } from '@mui/x-date-pickers';
import DatePickerComponent from './FormComponents/DatePickerComponent';

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
          <DatePickerComponent errors={errors} control={control} />
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
