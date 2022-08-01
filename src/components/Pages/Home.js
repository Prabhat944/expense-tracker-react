import {Fragment, useRef} from 'react';
import {Link} from 'react-router-dom';
import styles from './Home.module.css';
import ExpenseList from '../ExpenseList';
import { CSVLink } from "react-csv";
import { useDispatch, useSelector} from 'react-redux';
import { expenseActions } from '../../Store/expense';
import { authActions } from '../../Store/auth';

const Home=(props)=>{
    const dispatch=useDispatch();
    const expense=useSelector(state=>state.expense.expense);
    const TotalExpense=useSelector(state=>state.expense.totalExpense);
    const darkOne=useSelector(state=>state.theme.darktheme);
    const premiumUser=useSelector(state=>state.auth.premium);
    const amountRef=useRef();
    const descriptionRef=useRef();
    const categoryRef=useRef();

    const AddNewExpense=(event)=>{
        event.preventDefault();
        const amount=amountRef.current.value;
        const description=descriptionRef.current.value;
        const category=categoryRef.current.value;
        dispatch(expenseActions.addexpense({amount:amount,description:description,category:category}));
    }
    const EditHandler=(body)=>{
        amountRef.current.value=body.amount;
        descriptionRef.current.value=body.description;
        categoryRef.current.value=body.category;
      }

      const PremiumActivate=()=>{
        dispatch(authActions.premiumuser());
      }
    const userExpenses=expense.map(itemData=><ExpenseList item={itemData} key={Math.random().toString()} onEdit={EditHandler}/>);
    const header=[
        {label:'AMOUNT',key:'amount'},
        {label:'CATEGORY',key:'category'},
        {label:'DESCRIPTION',key:'description'}
    ]

    return (
        <Fragment>
        <div className={styles.expensesection}>
        <div className={darkOne?styles.darkheadline:styles.headline}>
        <h3>Welcome To Expense Tracker!!!</h3>

        <div className={darkOne?styles.darkprofile:styles.profile}>
            Your profile is Incomplete.
            <Link to='/login/profile'>Complete now</Link>
        </div>
        </div>
        <div className={darkOne?styles.darkexpenseContainer:styles.expenseContainer}>
            <div className={darkOne?styles.darkpremium:styles.premium}>{TotalExpense>10000 && <button onClick={PremiumActivate} >Activate Premium</button>}</div>
                 {premiumUser && <div className={styles.downloadfile}>
                   <CSVLink className={styles.csvlink} data={expense} headers={header}>
                    Download Expense
                    </CSVLink>
                </div>}
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
        </div>
        
        </div>
        </Fragment>
    );
};
export default Home;