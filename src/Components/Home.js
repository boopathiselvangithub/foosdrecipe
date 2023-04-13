import React, { Component } from 'react';
import {Box, CircularProgress, Typography,Grid} from '@mui/material';
import API_RecipeList from './API';
import RecipeCard from './RecipeCard';
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';

const HomeHeader=styled('div')(({theme})=>({
  backgroundImage :'linear-gradient(to right,rgba(0,0,0,0.7),rgba(255,0,0,0))',
  position        :'absolute',
  height          :'99%',
  width           :'50%',
  fontSize        :'50px',
  fontWeight      :'4px',
  color           :'white',
  fontFamily      :'Andale Mono',
}))

class Home extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       recipeList:null,
       page      :1
    }
  }

  async componentDidMount(){
    const recipes = await API_RecipeList('https://tasty.p.rapidapi.com/recipes/list',{from: '0', size: '50', tags: 'under_30_minutes'})
    this.setState({
      recipeList:recipes.data.results
    })
    
  }

  updatePagination=(page)=>{
    this.setState({
      page:page
    })
  }

  render(){
    const {recipeList, page}=this.state
    console.log(recipeList)
    if(!recipeList){
      console.log(recipeList,'inner')
      return <Box py={10} sx={{display:'flex',justifyContent:'center'}}>
             <CircularProgress/> 
             </Box>
    }
    console.log(recipeList);
    return (
      //  homeHeader content
    <React.Fragment >
      <Box sx={{ width:'90%',m:'auto',position:'relative'}}>
        <HomeHeader>
         <Typography  variant='h6' component='div' fontFamily='inherit' fontSize='inherit'>
          FOOD BRINGS ETERNAL BLISS
         </Typography>
       </HomeHeader>
        <img 
        src='https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_1280,ar_16:9/v1/img/recipes/68/40/4/T8DlM7TETzmqbwoTWpez_strata%2520SITE-2.jpg'
        style={{width:'100%'}}/>
      </Box>
      
      <Typography variant='h4' fontFamily='Andale Mono' m={4} textAlign='center'>TOP RECIPES</Typography>
      <Grid pt={3} container spacing={4} >
       {
         recipeList.slice((page*5)-5,(page*5)+1).map((item)=>{
            return( 
            <>
              <Grid item xs={11}  md={5} lg={3.6} mx='auto' >
              <RecipeCard item={item}/>
              </Grid>
            </>
            )
         })
       }
       </Grid>
       <Box sx={{display:'flex',justifyContent:'center'}} py={5}>
       <Pagination  count={6} onChange={(event,page)=>this.updatePagination(page)} color="secondary" />
       </Box>
    </React.Fragment>
    );
  }
}

export default Home;