import { useContext} from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Layout from './components/Navigation/Layout';
import Profile from './components/Profile';
import {Redirect, Route, Switch} from 'react-router-dom';
import AuthContext from './Store/AuthContext';
import ForgetPassword from './components/ForgetPassword';

function App() {
  const ctx=useContext(AuthContext);
  
  return (
      <Layout>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/login' />
          </Route>
        <Route path='/login' exact>
             {!ctx.Login &&<Login />}
        </Route>
        <Route path='/forgetpassword' exact>
          <ForgetPassword />
        </Route>
        <Route path='/home' exact>
            {ctx.Login && <Home />}
        </Route>
        <Route path='/profile' exact>
            {ctx.Login && <Profile /> }
        </Route>
        </Switch>
      </Layout>
  );
}

export default App;
