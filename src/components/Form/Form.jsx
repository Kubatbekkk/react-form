import React, { useState } from 'react';
import { Button, Typography, Divider, Box } from '@mui/material';
import { useForm, useFieldArray } from 'react-hook-form';
import NameInput from './FormComponents/NameInput';
import PasswordInput from './FormComponents/PasswordInput';
import EmailInput from './FormComponents/EmailInput';
import SelectInput from './FormComponents/SelectInput';
import CheckboxInput from './FormComponents/CheckboxInput';
import TextareaInput from './FormComponents/TextareaInput';
import RadioInput from './FormComponents/RadioInput';
import Modal from '../Modal/Modal';
import DatePickerComponent from './FormComponents/DatePickerComponent';
import KeywordInput from './FormComponents/KeywordInput';
import './style.css';

const Form = () => {
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});

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
        <KeywordInput control={control} />
        <Button type="submit" variant="contained" fullWidth disabled={!isValid}>
          Submit
        </Button>
      </form>
      <Modal open={open} handleClose={handleClose} userInfo={userInfo} />
    </div>
  );
};

export default Form;
