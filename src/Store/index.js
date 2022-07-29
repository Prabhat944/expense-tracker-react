import {configureStore, createSlice} from '@reduxjs/toolkit';

const Login=localStorage.getItem('Login');
const initialAuthState={isAuthenticated:Login?true:false,token:'',userId:''};


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
        }
    }
});

const initialExpenseState={expense:[],totalExpense:0};

const expenseSlice=createSlice({
    name:'expense',
    initialState:initialExpenseState,
    reducers:{
        addexpense(state,action){
            const newExpense=action.payload;
            const existing=state.expense.find(item=>item.key === newExpense.key);
            if(!existing){
                state.expense.push({...newExpense});
                state.totalExpense=state.totalExpense + Number(newExpense.amount);
            }
            else{
            const index=state.expense.findIndex(item=>item.key===newExpense.key);
            state.totalExpense=state.totalExpense + Number(newExpense.amount) - Number(state.expense[index].amount);
            state.expense[index]=newExpense;
            }
            
        },
        deleteexpense(state,action){
            const key=action.payload;
            const index=state.expense.findIndex(item=>item.key===key);
            state.totalExpense=state.totalExpense - Number(state.expense[index].amount);
            state.expense=state.expense.filter(item=>item.key !== key);
        }
    }
})

const store=configureStore({
    reducer:{auth:authSlice.reducer,expense:expenseSlice.reducer}
});

export const expenseActions=expenseSlice.actions;
export const authActions=authSlice.actions;
export default store;