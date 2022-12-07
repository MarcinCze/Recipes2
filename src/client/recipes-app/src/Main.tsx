import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Recipes from './components/Recipes';
import Create from './components/Create';
import DailyMenu from './components/DailyMenu';
const Main = () => {
return (         
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/recipes' element={<Recipes/>} />
    <Route path='/daily-menu' element={<DailyMenu/>} />
    <Route path='/create' element={<Create/>} />
  </Routes>
);
}
export default Main;