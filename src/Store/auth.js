import { createSlice } from "@reduxjs/toolkit";

const initialAuthState={isAuthenticated:false,token:'',userName:'',userId:'',imageUrl:'',emailVerified:false,premium:false};


const authSlice=createSlice({
    name:'auth',
    initialState:initialAuthState,
    reducers:{
        loginhandler(state,action){
            state.isAuthenticated=action.payload.isAuthenticated; 
            state.userId=action.payload.userId;
            state.token=action.payload.token;
            localStorage.setItem('Login',action.payload.isAuthenticated);
            localStorage.setItem('Token',action.payload.token);
            localStorage.setItem('userId',action.payload.userId); 
        },
        logout(state){
            state.isAuthenticated=false;
            localStorage.clear();
        },
        premiumuser(state,action){
            state.premium=true;
        },
        userpersonalinfo(state,action){
            state.userName=action.payload.displayName;
            state.imageUrl=action.payload.photoUrl;
            state.emailVerified=action.payload.emailVerified
        
        }
    }
});


export const authActions=authSlice.actions;

export default authSlice.reducer;