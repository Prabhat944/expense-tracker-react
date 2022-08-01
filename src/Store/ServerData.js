import { expenseActions } from "./expense";

export const FetchFromServer=()=>{
    return async(dispatch)=>{
        const FetchingExpense=async()=>{
            const response=await fetch('https://expense-tracker-react-d5a39-default-rtdb.firebaseio.com/expense.json');
            if(!response.ok){
                throw new Error('Failed to fetch data');
            }
            const data=await response.json();
            return data;
        }
        try{
            const expensedata=await FetchingExpense();
            dispatch(expenseActions.replaceexpense({
                expense:expensedata.expense || [],
                totalExpense:expensedata.totalExpense || 0
            }))
        }catch(error){
            console.log('error in fetching data');
        }
        
    }
}

export const ExpenseToServer=(expensedata)=>{
    return async(dispatch)=>{
        const SendingData=async()=>{
            const response = await fetch('https://expense-tracker-react-d5a39-default-rtdb.firebaseio.com/expense.json',{
                method:'PUT',
                body:JSON.stringify(expensedata)
            });
            if(!response.ok){
                throw new Error('Failed to send data');
            }
            console.log('Successfully updated data');
            
        }
        await SendingData().catch(error=>{console.log('Failed to send to server')});
    }
}