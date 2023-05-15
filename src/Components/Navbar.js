import React, { Component } from 'react';
import {AppBar,Toolbar,IconButton,Typography,Box, createTheme, headTheme} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const HeadTheme=styled('div')(({theme})=>({
  fontFamily                  :'Andale Mono',
  fontSize                    :'18px',
  [theme.breakpoints.up('md')]: {
   fontSize:'25px',
  },
}))

const Search=styled('div')(({theme})=>({
   display      :'flex',
   alignItems   :'center'
}))

class Navbar extends Component {
  render() {
    return (
    <>
    <AppBar position="fixed" sx={{bgcolor:"#282A3A"}}>
        <Toolbar sx={{display:'flex',justifyContent:'space-between'}}>
        <Box sx={{display:'flex', alignItems:'center',px:'0px'}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
          >
           <a href='/' style={{color :'white'}}><HomeIcon/></a>
          </IconButton>
          <HeadTheme >
            <Typography fontSize='inherit' fontFamily='inherit'> TASTY TIPS</Typography>
          </HeadTheme>
        </Box>
        <Search>
         <a href='/search'>
          <SearchIcon sx={{pr:1,color:'white','&:hover':{opacity:0.7}}}/> 
          </a> 
         <IconButton size="large" color='inherit' >
            <AccountCircle />
         </IconButton>
        </Search>
        </Toolbar>
    </AppBar>
    <Box sx={{height:'100px',bgcolor:'#FFB100'}}></Box>
    </>
    );
  }
}

export default Navbar;
