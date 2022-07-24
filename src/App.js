import { useState } from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Layout from './components/Navigation/Layout';
import Profile from './components/Profile';
import {Route} from 'react-router-dom';

function App() {
  const [UserLogin,setUserLogin]=useState(false);
const LoginHandler=(state)=>{
    setUserLogin(true);
}
  return (
      <Layout>
        {!UserLogin &&<Route path='/'>
            <Login checkLogin={LoginHandler}/>
        </Route>}
        {UserLogin && <Route path='/home' >
            <Home />
        </Route>}
        {UserLogin && <Route path='/profile'>
            <Profile /> 
        </Route>}
        
      </Layout>
  );
}

export default App;
