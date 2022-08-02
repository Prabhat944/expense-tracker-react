import Login from '../src/components/Pages/Login';
import Layout from './components/Navigation/Layout';
import {useSelector,useDispatch} from 'react-redux';
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import ForgetPassword from './components/Pages/ForgetPassword';
import { useEffect, useState} from 'react';
import { ExpenseToServer, FetchFromServer } from './Store/ServerData';
import Profile from './components/Pages/Profile';
import Home from './components/Pages/Home';
import NotReady from './components/Pages/NotReady';
import { authActions } from './Store/auth';
import { expenseActions } from './Store/expense';


let onStart=true;
let storedData=localStorage.getItem('Token');

function App() {
  const [islogin,setIsLogin]=useState(storedData?true:false);
  const dispatch=useDispatch();
  const history=useHistory();
  const cartupdate=useSelector(state=>state.expense.cartupdate);
  const expense=useSelector(state=>state.expense.expense);
  const totalExpense=useSelector(state=>state.expense.totalExpense);
  const emailId=localStorage.getItem('userId');

useEffect(()=>{
  
  if( onStart && emailId){
    onStart=false;
    const Id=emailId.replace(/[^a-zA-Z0-9 ]/g, '');

    dispatch(FetchFromServer(Id));
  }
if(cartupdate){
  const Id=emailId.replace(/[^a-zA-Z0-9 ]/g, '');
  dispatch(ExpenseToServer({expense:expense,totalExpense:totalExpense},Id))
}
},[cartupdate,dispatch,expense,totalExpense,emailId]);

const LoginHandler=()=>{
  setIsLogin(true);
}
const LogoutHandler=()=>{
  if(islogin){
    dispatch(authActions.logout());
    dispatch(expenseActions.clearexpense());
}
    history.replace('/login');
    setIsLogin(false);
}

  return (
      <Layout islogin={islogin} logoutHandler={LogoutHandler}>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/login' />
          </Route>
        <Route path='/login' exact>
             <Login login={LoginHandler}/>
        </Route>
        <Route path='/forgetpassword' exact>
          <ForgetPassword />
        </Route>
        {islogin && <Route path='/login/profile' exact>
            <Profile />
        </Route>}
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
