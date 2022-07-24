import { useState } from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Layout from './components/Navigation/Layout';

function App() {
  const [UserLogin,setUserLogin]=useState(false);

const LoginHandler=(state)=>{
    setUserLogin(true);
}
  return (
      <Layout>
        {UserLogin && <Home />}
        {!UserLogin && <Login checkLogin={LoginHandler}/>}
      </Layout>
  );
}

export default App;
