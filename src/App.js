import { useContext} from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Layout from './components/Navigation/Layout';
import Profile from './components/Profile';
import {Route} from 'react-router-dom';
import AuthContext from './Store/AuthContext';

function App() {
  const ctx=useContext(AuthContext);
  
  return (
      <Layout>
        {!ctx.Login &&<Route path='/'>
            <Login />
        </Route>}
        {ctx.Login && <Route path='/home' >
            <Home />
        </Route>}
        {ctx.Login && <Route path='/profile'>
            <Profile /> 
        </Route>}
        
      </Layout>
  );
}

export default App;
