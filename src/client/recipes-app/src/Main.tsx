import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import DailyMenu from './components/DailyMenu/DailyMenu';
import RecipesList from './components/RecipesList/RecipesList';
import RecipeView from './components/RecipeView/RecipeView';
const Main = () => {
return (         
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/recipes' element={<RecipesList/>} />
    <Route path='/recipe/:id' element={<RecipeView/>} />
    <Route path='/daily-menu' element={<DailyMenu/>} />
  </Routes>
);
}
export default Main;