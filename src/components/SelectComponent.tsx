import React from 'react';
import { Select, MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import styled from 'styled-components';
import { makeStyles } from '@mui/material/styles';

interface TableSelectProps {
  values: Array<number | string> | undefined;
  label: string;
  state: number | string | undefined | unknown;
  setState: React.Dispatch<React.SetStateAction<number | string | undefined | unknown>>;
}


export default function SelectComponent({ values, label, state, setState }: TableSelectProps) {

  return (
    <FormControlWrapper>
      <FormControl variant="outlined">
        <InputLabel id="select-label">{label}</InputLabel>
        <Select labelId="select-label" id="select" value={state} onChange={(event) => setState(event.target.value)} label={label} MenuProps={{ disableScrollLock: true }}>
          {values?.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </FormControlWrapper>
  );
}

const FormControlWrapper = styled.section`
  min-width: 22%;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
`;
