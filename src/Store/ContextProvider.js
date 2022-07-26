import AuthContext from "./AuthContext";
import { useEffect, useState } from "react";

const ContextProvider=(props)=>{
    const [isLogin,setIsLogin]=useState(false);
    const [email,setEmail]=useState('');
    const [token,setToken]=useState('');
    const [expenses,setExpenses]=useState([]);

    useEffect(()=>{
          const emailId=localStorage.getItem('Email');
          const token=localStorage.getItem('Token');
          if(emailId && token){
            setIsLogin(true);
            setEmail(emailId);
            setToken(token);
          }
    },[])
    const LoginHandler=(data)=>{
        setIsLogin(true);
        localStorage.setItem('Token',data.idToken);
        localStorage.setItem('Email',data.email);
    }
    const LogoutHandler=()=>{
        setIsLogin(false);
        localStorage.removeItem('Token');
        localStorage.removeItem('Email');
        localStorage.removeItem('EmailVerified');
    }
    const ExpenseHandler=data=>{
        setExpenses(prev=>[...prev,data]);
    }
const contextItem={
    expenseData:expenses,
    email:email,
    token:token,
    username:'',
    Login:isLogin,
    UserLogin:LoginHandler,
    UserLogOut:LogoutHandler,
    AddExpense:ExpenseHandler

}
    return (
        <AuthContext.Provider value={contextItem}>
            {props.children}
        </AuthContext.Provider>
    );
};
export default ContextProvider;