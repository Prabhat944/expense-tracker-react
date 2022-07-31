import Home from './components/Home';
import Login from './components/Login';
import Layout from './components/Navigation/Layout';
import Profile from './components/Profile';
import {useSelector} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';
import ForgetPassword from './components/ForgetPassword';

function App() {
  const islogin=useSelector(state=>state.auth.isAuthenticated);

  return (
    
      <Layout>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/login' />
          </Route>
        <Route path='/login' exact>
             <Login />
        </Route>
        <Route path='/forgetpassword' exact>
          <ForgetPassword />
        </Route>
        <Route path='/home' exact>
            {islogin && <Home />}
        </Route>
        <Route path='/profile' exact>
            {islogin && <Profile /> }
        </Route>
        </Switch>
      </Layout>
  );
}

export default App;
