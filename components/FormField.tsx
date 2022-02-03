import { TextField } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
}

const FormField: React.FC<FormFieldProps> = ({ name, label, type }) => {
  const { register, formState } = useFormContext();
  return (
    <TextField
      className="mb-20"
      size="small"
      label={label}
      variant="outlined"
      fullWidth
      type={type || 'text'}
      required
      error={Boolean(formState.errors[name]?.message)}
      helperText={formState.errors[name]?.message}
      name={name}
      {...register(name)}
    />
  );
};

export default FormField;
