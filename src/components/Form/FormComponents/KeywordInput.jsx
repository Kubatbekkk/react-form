import { Button, FormControl, FormLabel, TextField } from '@mui/material';
import React, { Fragment } from 'react';
import { Controller, useFieldArray } from 'react-hook-form';

const KeywordInput = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'keywords',
  });
  return (
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
  );
};

export default KeywordInput;
