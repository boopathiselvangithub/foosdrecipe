import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import RecipeContent from './Components/RecipeContent';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import {Box} from '@mui/material';
import Search from './Components/Search';
import PageNotFound from './Components/PageNotFound';

function App() {
  return (
    <div className="App">
    <Box pb={{xs:'50px',md:'50px'}}><Navbar /></Box>
    <BrowserRouter>
    <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/:id' element={<RecipeContent/>}/>
       <Route path='/search' element={<Search/>}/>
       <Route path='*' element={<PageNotFound/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
