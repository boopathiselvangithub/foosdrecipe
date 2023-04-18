import React, { Component } from 'react';
import {Box, CircularProgress, Typography,Grid} from '@mui/material';
import API_RecipeList from './API';
import RecipeCard from './RecipeCard';
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const HomeHeader=styled('div')(({theme})=>({
  backgroundImage :'linear-gradient(to right,rgba(0,0,0,0.7),rgba(255,0,0,0))',
  position        :'absolute',
  height          :'99%',
  width           :'50%',
  fontSize        :'50px',
  fontWeight      :'4px',
  color           :'white',
  fontFamily      :'Andale Mono',
  [theme.breakpoints.down('sm')] :{
    fontSize      :'22px'
  },
  [theme.breakpoints.only('md')]:{
    fontSize      :'26px'
  }
}))

const FormTheme=styled('div')(({theme})=>({
  display         :'flex',
  justifyContent  :'flex-start',
}))

class Home extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       recipeList:null,
       page      :1,
       sorting   :null,
       filter    :null
    }
    this.copyOfRecipe = this.state.recipeList
    
  }

  async componentDidMount(){
    const recipes = await API_RecipeList('https://tasty.p.rapidapi.com/recipes/list',{from: '0', size: '50', tags: 'under_30_minutes'})
    this.setState({
      recipeList : recipes.data.results
    },
      ()=>this.copyOfRecipe=this.state.recipeList
    )
  }

  updatePagination=(newPage)=>{
    this.setState({
      page : newPage
    })
  }

  sortingBasedOnCondition=()=>{
    let sortedArray
    const {sorting,recipeList}=this.state
   
    switch(sorting){
      case 'alphabetical':
        sortedArray = recipeList.sort((a,b)=>{
        return a.name.localeCompare(b.name)
      })
      break ;
      case 'oldest_dish':
        sortedArray = recipeList.sort((a,b)=>{
        return a.updated_at-b.updated_at
      })
      break;
      case 'newest_dish':
        sortedArray = recipeList.sort((a,b)=>{
        return b.updated_at-a.updated_at
      })
      break;
   } 
   this.setState({
    recipeList : sortedArray
   }) 
  }

  sortHandler=(event)=>{
    this.setState({
      sorting : event.target.value 
    },this.sortingBasedOnCondition)
  }
  
  filterHandler=(event)=>{
    this.setState({
      filter : event.target.value
    },this.filterBasedOnCondition)
  }
  
  filterBasedOnCondition=()=>{
    const {filter,recipeList}=this.state
    let filterArray = this.copyOfRecipe
    console.log(recipeList,'fi')
    switch(filter){
      case 'under_20_minutes':
        filterArray = filterArray.filter(recipe => recipe.cook_time_minutes <20 ) 
      break
      case 'low_price':
        filterArray = filterArray.filter(recipe => recipe.price?.total<1500 )
        console.log(filterArray,"fa")
      break
      case 'high_price':
        filterArray = recipeList.filter(recipe => recipe.price?.total>=1500 )
        console.log(filterArray,"fah")
      break
    }
    this.setState({
      recipeList : filterArray
    })
  }

  render(){
    const {recipeList, page,sorting,filter}=this.state
    console.log(recipeList)
    if(!recipeList){
      console.log(recipeList,'inner')
      return <Box py={10} sx={{display:'flex',justifyContent:'center'}}>
             <CircularProgress/> 
             </Box>
    }
    
    return (
    <React.Fragment >
      {/* homeHeader content */}
      <Box sx={{ width:'90%',m:'auto',position:'relative'}}>
       <HomeHeader>
        <Typography sx={{p:{xs:2,md:4,lg:8}}} variant='h6' component='div' fontFamily='inherit' fontSize='inherit'>
         FOOD BRINGS ETERNAL BLISS
        </Typography>   
       </HomeHeader>
        <img 
        src='https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_1280,ar_16:9/v1/img/recipes/68/40/4/T8DlM7TETzmqbwoTWpez_strata%2520SITE-2.jpg'
        style={{width:'100%'}}/>
      </Box>
      
      <Typography variant='h4' fontFamily='Andale Mono' m={4} textAlign='center'>TOP RECIPES</Typography>

      <FormTheme >
      <FormControl sx={{width:'15%'}}>
        <InputLabel id='demo-simple-select-label' >Sort </InputLabel>
        <Select
          id="demo-simple-select"
          value={sorting}
          label='Sort'
          onChange={this.sortHandler}
          sx={{'fieldset':{borderRadius:'40px',border:'2px solid #282A3A'}}}
        >
        <MenuItem value='alphabetical'>Alphabetical Order</MenuItem>
        <MenuItem value='newest_dish'>Newest Dish</MenuItem>
        <MenuItem value='oldest_dish'>Oldest Dish</MenuItem>
        </Select>
      </FormControl>
       
      <FormControl sx={{width:'15%',mx:'20px'}}>
        <InputLabel id='demo-simple-select-label' >filter </InputLabel>
        <Select
          id="demo-simple-select"
          value={filter}
          label='filter'
          onChange={this.filterHandler}
          sx={{'fieldset':{borderRadius:'40px',border:'2px solid #282A3A'}}}
        >
        <MenuItem value='under_20_minutes'>Under 20 Minutes</MenuItem>
        <MenuItem value='low_price'>Low price</MenuItem>
        <MenuItem value='high_price'>High price</MenuItem>
        </Select>
      </FormControl>
      </FormTheme>

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