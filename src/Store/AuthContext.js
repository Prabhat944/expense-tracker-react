import React from 'react';

const AuthContext=React.createContext({
    expenseData:'',
    email:'',
    token:'',
    username:'',
    Login:false,
    UserLogin:(data)=>{},
    UserLogOut:()=>{},
    AddExpense:(data)=>{},
    DeleteExpense:(key)=>{},

});

export default AuthContext;

