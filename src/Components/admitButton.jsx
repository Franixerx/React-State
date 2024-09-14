import * as React from 'react';
import Button from '@mui/material/Button';

export default function AdmitTaskButton({ onClick }) {
  return (
    <Button 
      variant="contained" 
      onClick={onClick} 
      sx={{ 
        backgroundColor: '#6A9C89', 
        color: '#FFFFFF',           
        width: '200px',             
        '&:hover': {
          backgroundColor: '#C4DAD2',
        },
      }}
    >
      ADMIT TASK
    </Button>
  );
}
