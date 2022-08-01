import Login from '../src/components/Pages/Login';
import Layout from './components/Navigation/Layout';
import {useSelector,useDispatch} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';
import ForgetPassword from './components/Pages/ForgetPassword';
import { useEffect } from 'react';
import { ExpenseToServer, FetchFromServer } from './Store/ServerData';
import { authActions } from './Store/auth';
import Profile from './components/Pages/Profile';
import Home from './components/Pages/Home';
import NotReady from './components/Pages/NotReady';


let onStart=true;

function App() {
  const dispatch=useDispatch();
  const cartupdate=useSelector(state=>state.expense.cartupdate);
  const expense=useSelector(state=>state.expense.expense);
  const totalExpense=useSelector(state=>state.expense.totalExpense);
  const login=useSelector(state=>state.auth.isAuthenticated);


useEffect(()=>{
  if(onStart && login){
    onStart=false;
    dispatch(FetchFromServer());
  }
  if(!login && onStart){
    dispatch(authActions.loginhandler({
      isAuthenticated:localStorage.getItem('Login')||false,
      userId:localStorage.getItem('userId')||'',
      token:localStorage.getItem('Token')||''
    }));
  }
  
if(cartupdate){
  dispatch(ExpenseToServer({expense:expense,totalExpense:totalExpense}))
}
},[cartupdate,dispatch,expense,totalExpense,login]);

  return (
      <Layout islogin={login}>
        <Switch>
          <Route path='/' exact>
            <Redirect path='/login' />
          </Route>
        <Route path='/login' exact>
             <Login />
        </Route>
        <Route path='/forgetpassword' exact>
          <ForgetPassword />
        </Route>
        <Route path='/login/profile' exact>
            <Profile />
        </Route>
        <Route path='/login/home' exact>
            <Home />
        </Route>
        <Route path='*' >
            <NotReady />
          </Route>
        </Switch>
      </Layout>
  );
}

export default App;
