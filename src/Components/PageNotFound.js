import { Box, Typography,Button} from '@mui/material';
import React, { Component } from 'react';

class PageNotFound extends Component {
  render() {
    return (
      <Box sx={{textAlign:'center'}}>
        <Typography variant='h6' fontFamily='Andale Mono' fontSize='30px'>Recipe Not Found</Typography>
        <a href='/'><Button color ='secondary'>Go to Home</Button></a>
      </Box>
    );
  }
}   

export default PageNotFound;
