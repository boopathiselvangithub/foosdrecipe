import React, { Component } from 'react';
import API_RecipeList from './API';

 class Filter extends Component {

 async componentDidMount(){
     const recipes = await API_RecipeList('https://tasty.p.rapidapi.com/feeds/list',{size: '5', timezone: '+0700', vegetarian: 'true', from: '0'})
     console.log(recipes)
}
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default Filter;
