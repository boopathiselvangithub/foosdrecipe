import axios from 'axios';

const API_RecipeList= async(url,params)=>{

  const options = {
      method :  'GET',
      url    :  url,
      params :  params,
      headers:  {
        'X-RapidAPI-Key' : '4d63950d76msh72cccfc57033be4p13aefbjsn4d9b094ca746',
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
