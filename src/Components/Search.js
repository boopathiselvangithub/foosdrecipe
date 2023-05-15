import React, { Component } from 'react';
import { TextField,Button,Grid, CircularProgress,Box, Typography} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import API_RecipeList from './API';
import RecipeCard from './RecipeCard';
import PageNotFound from './PageNotFound';

const SearchFieldTheme=styled('div')(({theme})=>({
   [theme.breakpoints.down('md')]:{
       width:'90%'
   },
   [theme.breakpoints.up('md')]:{
       width:'60%'
   },
   margin          : '20px auto',
   display         : 'flex',
   justifyContent  : 'space-around',
   alignItems      : 'center'
}))

const ButtonTheme=styled('div')(({theme})=>({
   borderRadius :'20px',
}))

class Search extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       recipeSearch :null,
       loader       :false,
       searchText   :null,
       inputText    :null
    }
  }

  searchFunction=async()=>{
    const {searchText}=this.state
    if(searchText){
    const recipes = await API_RecipeList('https://tasty.p.rapidapi.com/recipes/list',  {from: '0', size: '40', tags: 'under_30_minutes', q:`${searchText}`})
    console.log(recipes,'hello')
    this.setState({
        recipeSearch :recipes.data.results,
        loader       :false
    })
  }
 }
  
  updateSearchText=()=>{
    console.log(this.state.inputText)
    if(this.state.inputText){
     this.setState({
      searchText  : this.state.inputText,
      loader      :true
     },this.searchFunction)
    }
  }

  render() {
    const {recipeSearch,loader}=this.state
    console.log(recipeSearch)
    if((recipeSearch && !recipeSearch.length)){
      return <PageNotFound/>
    }
    return (
      <div>
     <SearchFieldTheme>
        <TextField autoFocus
          id="outlined-multiline-flexible"
          label="Search"
          placeholder='Enter something'
          onChange={(e)=>this.setState({inputText:e.target.value})}
          sx={{width:'100%', 'fieldset':{borderRadius:'40px',border:'2px solid #282A3A'}}}
          InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                 <SearchIcon sx={{color:'black'}}/>
                </InputAdornment>
            ),
          }}
        />
        <ButtonTheme>
        <Button variant='contained' sx={{borderRadius:'inherit',mx:'20px'}}
         onClick={this.updateSearchText}>
         Enter</Button>
        </ButtonTheme>
      </SearchFieldTheme>

      {
        loader && 
        <Box py={10} sx={{display:'flex',justifyContent:'center'}}>
        <CircularProgress/> 
        </Box>
      }

      {
        (!loader && recipeSearch) &&
          <Grid pt={3} container spacing={4} >
         {
           recipeSearch.map((item)=>{
              return( 
              <React.Fragment key={item.id}>
                <Grid key={item.id} item xs={11}  md={5} lg={3.6} mx='auto' >
                <RecipeCard item={item}/>
                </Grid>
              </React.Fragment>
              )
           })
         }
       </Grid>
      }
      </div>
    );
  }
}

export default Search;
