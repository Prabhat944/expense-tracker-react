import {  useRef } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { expenseActions } from '../../../Store/expense';
import styles from './ExpenseForm.module.css';
import ExpenseList from './ExpenseList';

const ExpenseForm=(props)=>{
    const darkOne=props.darkTheme;
    const dispatch=useDispatch();
    const amountRef=useRef();
    const descriptionRef=useRef();
    const categoryRef=useRef();
    const expense=useSelector(state=>state.expense.expense);

    const AddNewExpense=(event)=>{
        event.preventDefault();
        const amount=amountRef.current.value;
        const description=descriptionRef.current.value;
        const category=categoryRef.current.value;
        dispatch(expenseActions.addexpense({amount:amount,description:description,category:category}));
        amountRef.current.value='';
        descriptionRef.current.value='';
        categoryRef.current.value='';
    }

    const EditHandler=(body)=>{
        amountRef.current.value=body.amount;
        descriptionRef.current.value=body.description;
        categoryRef.current.value=body.category;

      }
    const userExpenses=expense.map(itemData=><ExpenseList item={itemData} key={Math.random().toString()} onEdit={EditHandler}/>);
    return(
        <>
        <form className={darkOne?styles.darkformContainer:styles.formContainer} onSubmit={AddNewExpense} >
        <div className={darkOne?styles.darkamount:styles.amount}>
            <label htmlFor='Amount'>Amount</label>
            <input type='number' required ref={amountRef}/>
        </div>
        <div className={darkOne?styles.darkdescription:styles.description}>
            <label htmlFor='Description'>Description</label>
            <input type='text' required ref={descriptionRef} maxLength = "50"/>
        </div>
        <div className={darkOne?styles.darkcategory:styles.category}>
            <label htmlFor='Category'>Category</label>
            <select ref={categoryRef}>
                <option>Food</option>
                <option>Petrol</option>
                <option>Salary</option>
                <option>Others</option>
            </select>
        </div>
        <button>Add Expense</button>
    </form>
    <div className={darkOne?styles.darkuserExpenses:styles.userExpenses}>
         {userExpenses}
    </div>
    </>
    );
};

export default ExpenseForm;