import { createSlice } from "@reduxjs/toolkit";

const Login=localStorage.getItem('Login');

const initialAuthState={isAuthenticated:Login?true:false,token:'',userId:'',premium:false,premid:''};


const authSlice=createSlice({
    name:'auth',
    initialState:initialAuthState,
    reducers:{
        login(state,action){
            state.isAuthenticated=action.payload;  
            localStorage.setItem('Login',action.payload); 
        },
        logout(state){
            state.isAuthenticated=false;
            localStorage.clear();
        },
        token(state,action){
            state.token=action.payload;
            localStorage.setItem('Token',action.payload);
        },
        userid(state,action){
            state.userId=action.payload;
            localStorage.setItem('Email',action.payload);
        },
        premiumuser(state,action){
            state.premium=true;
            state.premid=action.payload;
            console.log(state.premid,action.payload)
            localStorage.setItem('Premium',true);
        }
    }
});


export const authActions=authSlice.actions;

export default authSlice.reducer;