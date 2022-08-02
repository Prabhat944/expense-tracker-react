import {Fragment} from 'react';
import {Link} from 'react-router-dom';
import styles from './Home.module.css';
import { CSVLink } from "react-csv";
import { useDispatch, useSelector} from 'react-redux';
import { authActions } from '../../Store/auth';
import ExpenseForm from './Helper/ExpenseForm';

const Home=(props)=>{
    const dispatch=useDispatch();
    const TotalExpense=useSelector(state=>state.expense.totalExpense);
    const darkOne=useSelector(state=>state.theme.darktheme);
    const premiumUser=useSelector(state=>state.auth.premium);
    const expense=useSelector(state=>state.expense.expense);
    

      const PremiumActivate=()=>{
        dispatch(authActions.premiumuser());
      }
    
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

        {props.login && <div className={darkOne?styles.darkprofile:styles.profile}>
            Your profile is Incomplete.
            <Link to='/login/profile'>Complete now</Link>
        </div>}
        </div>
        <div className={darkOne?styles.darkexpenseContainer:styles.expenseContainer}>
            <div className={darkOne?styles.darkpremium:styles.premium}>{TotalExpense>10000 && <button onClick={PremiumActivate} >Activate Premium</button>}</div>
                 {premiumUser && <div className={styles.downloadfile}>
                   <CSVLink className={styles.csvlink} data={expense} headers={header}>
                    Download Expense
                    </CSVLink>
                </div>}
           <div>
           <ExpenseForm darkTheme={darkOne} />
           </div> 
        </div>
        </div>
        </Fragment>
    );
};
export default Home;