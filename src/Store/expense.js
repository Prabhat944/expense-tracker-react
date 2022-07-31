import { createSlice } from "@reduxjs/toolkit";


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
});

export const expenseActions=expenseSlice.actions;

export default expenseSlice.reducer;
