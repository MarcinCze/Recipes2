import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Create from './components/Create';
import DailyMenu from './components/DailyMenu';
import RecipesList from './components/RecipesList';
import RecipeView from './components/RecipeView';
const Main = () => {
return (         
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/recipes' element={<RecipesList/>} />
    <Route path='/recipe/:id' element={<RecipeView/>} />
    <Route path='/daily-menu' element={<DailyMenu/>} />
    <Route path='/create' element={<Create/>} />
  </Routes>
);
}
export default Main;