import axios from 'axios';

const API_RecipeList= async(url,params)=>{

  const options = {
      method :  'GET',
      url    :  url,
      params :  params,
      headers:  {
        'X-RapidAPI-Key': '13f0645f06msh69269a33678a161p1abe39jsn1441abf140bd',
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
