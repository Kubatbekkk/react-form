import React, { useState } from 'react';
import { Button, Typography, Divider, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import Modal from '../Modal/Modal';
import './style.css';
import NameInput from './FormComponents/NameInput';
import PasswordInput from './FormComponents/PasswordInput';
import EmailInput from './FormComponents/EmailInput';
import SelectInput from './FormComponents/SelectInput';
import CheckboxInput from './FormComponents/CheckboxInput';
import TextareaInput from './FormComponents/TextareaInput';
import RadioInput from './FormComponents/RadioInput';
import DatePickerComponent from './FormComponents/DatePickerComponent';
import KeywordInput from './FormComponents/KeywordInput';

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

  const formComponents = [
    {
      component: NameInput,
      props: { register, errors },
    },
    {
      component: PasswordInput,
      props: { register, errors },
    },
    {
      component: EmailInput,
      props: { register, errors },
    },
    {
      component: SelectInput,
      props: { errors, control },
    },
    {
      component: CheckboxInput,
      props: { errors, control },
    },
    {
      component: TextareaInput,
      props: { errors, register },
    },
    {
      component: RadioInput,
      props: { errors, control },
    },
    {
      component: DatePickerComponent,
      props: { errors, control },
    },
    {
      component: KeywordInput,
      props: { control },
    },
  ];

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
        {formComponents.map((item, index) => {
          const { component: Component, props } = item;
          return <Component key={index} {...props} />;
        })}
        <Button type="submit" variant="contained" fullWidth disabled={!isValid}>
          Submit
        </Button>
      </form>

      <Modal open={open} handleClose={handleClose} userInfo={userInfo} />
    </div>
  );
};

export default Form;
