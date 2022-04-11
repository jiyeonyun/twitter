import React, { useState } from 'react';
import { HashRouter as Router , Route , Routes } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
const AppRouter = (props) => {
    
    const[isLoggedIn,setIsLoggedIn]  = useState(false);
    
    return(
        <Router>
            <Routes>
            {isLoggedIn?
                <Route exact path='/' element={<Auth/>}/>
                :
                <Route exact path='/' element={<Home/>}/>
            }
            </Routes>
        </Router>
    );
};

export default AppRouter;