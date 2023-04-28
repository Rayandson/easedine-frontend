import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function ProgressBar() {
  return (
    <Box sx={{
        width: '40%',
        '@media (min-width: 600px)': {
          width: '30%',
        },
        '@media (min-width: 960px)': {
          width: '20%',
        },
      }}>
      <LinearProgress />
    </Box>
  );
}  