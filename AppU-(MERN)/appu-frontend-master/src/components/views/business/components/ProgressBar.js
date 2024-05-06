import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

export default function ProgressBar(props) {

  return (
    <>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={props && props.state && props.state.step ? props.state.step : 0} color="success"
      thickness={4}  />
    </Box>
  </Box>
    </>
    
  );
}
