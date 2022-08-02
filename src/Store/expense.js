import { createSlice } from "@reduxjs/toolkit";


const initialExpenseState={expense:[],totalExpense:0,cartupdate:false};

const expenseSlice=createSlice({
    name:'expense',
    initialState:initialExpenseState,
    reducers:{
        replaceexpense(state,action){
            state.expense=action.payload.expense;
            state.totalExpense=action.payload.totalExpense;
        },
        addexpense(state,action){
            state.cartupdate=true;
            const newExpense=action.payload;
            const existing=state.expense.find(item=>item.description === newExpense.description);
            if(!existing){
                state.expense.push({...newExpense});
                state.totalExpense=state.totalExpense + Number(newExpense.amount);
            }
            else{
            const index=state.expense.findIndex(item=>item.description === newExpense.description);
            state.totalExpense=state.totalExpense + Number(newExpense.amount) - Number(state.expense[index].amount);
            state.expense[index]=newExpense;
            console.log(state.expense);
            }
            
        },
        deleteexpense(state,action){
            state.cartupdate=true;
            const description=action.payload;
            const index=state.expense.findIndex(item=>item.description===description);
            state.totalExpense=state.totalExpense - Number(state.expense[index].amount);
            state.expense=state.expense.filter(item=>item.description !== description);
        },
        clearexpense(state){
            state.expense=[];
            state.totalExpense=0;
            state.cartupdate=false;
        }
    }
});

export const expenseActions=expenseSlice.actions;

export default expenseSlice.reducer;
