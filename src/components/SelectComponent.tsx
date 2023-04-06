import React from 'react';
import { Select, MenuItem } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

interface TableSelectProps {
  values: Array<number | string>;
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
          {values.map((value) => (
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
