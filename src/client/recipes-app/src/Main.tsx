import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import DailyMenu from './components/DailyMenu/DailyMenu';
import RecipesList from './components/RecipesList/RecipesList';
import RecipeView from './components/RecipeView/RecipeView';
import Login from './components/Login/Login';
const Main = () => {
return (         
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/recipes' element={<RecipesList/>} />
    <Route path='/recipe/:id' element={<RecipeView/>} />
    <Route path='/daily-menu' element={<DailyMenu/>} />
    <Route path='/login' element={<Login/>} />
  </Routes>
);
}
export default Main;