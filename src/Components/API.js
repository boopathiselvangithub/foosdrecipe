import axios from 'axios';

const API_RecipeList= async(url,params)=>{

  const options = {
      method :  'GET',
      url    :  url,
      params :  params,
      headers:  {
        'X-RapidAPI-Key' : 'b83487bde5msh1d3203564e89b6bp16a956jsn842243c5ee29',
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
      }
    }
  console.log(options)
  try
  {
    return await axios.request(options)
  }
  catch(err)
  {
    console.log("Error in fetching data")
    return err.message
  }
} 


export default API_RecipeList;
