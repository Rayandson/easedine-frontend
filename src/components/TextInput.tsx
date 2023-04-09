import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface inputProps {
    userName: string | undefined;
    setUserName: React.Dispatch<React.SetStateAction<string | undefined>>
}

export default function TextInput({userName, setUserName}: inputProps) {

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUserName(event.target.value);
    }

  return (
      <TextField id="outlined-basic" label="Nome e sobrenome" variant="outlined" style={{ width: '100%' }} onChange={handleChange}/>
  );
}