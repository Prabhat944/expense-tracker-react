import React from 'react';

const AuthContext=React.createContext({
    email:'',
    token:'',
    username:'',
    Login:false,
    UserLogin:(data)=>{},
    UserLogOut:()=>{}

});

export default AuthContext;

