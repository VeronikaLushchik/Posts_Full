/* eslint-disable */
import React from 'react';
import { TextField, Grid, TextFieldProps } from '@mui/material';

type Props = {
  name?: string; 
  label?: string; 
  handleChange?: (e: any) => void; 
  autoFocus?: true; 
  half?: true;
  type?: string;
}

export const Input:React.FC<Props> = ({ name, handleChange, label, half, autoFocus, type, }) => (
  <Grid item xs={12} sm={half ? 6 : 12}>
    <TextField
      name={name}
      onChange={handleChange}
      variant="outlined"
      required
      fullWidth
      label={label}
      autoFocus={autoFocus}
      type={type}
    />
  </Grid>
);
