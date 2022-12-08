import React from 'react';
import './App.css';
import {NavLink} from 'react-router-dom';
import Main from './Main';

function App() {
  return (
    <>  
      <div className="container">
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
          <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
            <img src="/pot-of-food-svgrepo-com.svg" alt="Logo" width="50" height="45" className="d-inline-block align-text-top"/>
            <span className="fs-4">Recipes</span>
          </a>

          <ul className="nav nav-pills">
            <li className="nav-item"><NavLink to="/" className="nav-link">Home</NavLink></li>
            <li className="nav-item"><NavLink to="/recipes" className="nav-link">Recipes</NavLink></li>
            <li className="nav-item"><NavLink to="/daily-menu" className="nav-link">Daily menu</NavLink></li>
            {/* <li className="nav-item"><NavLink to="/create" className="nav-link">Create new</NavLink></li> */}
          </ul>
        </header>
        <Main/>
      </div>
      <div style={{marginBottom: "2em"}}></div>
    </>
  );
}

export default App;
