import { Fragment, useContext,useRef} from 'react';
import {Link} from 'react-router-dom';
import styles from './Home.module.css';
import AuthContext from '../Store/AuthContext';

const Home=(props)=>{
    const ctx=useContext(AuthContext);
    const amountRef=useRef();
    const descriptionRef=useRef();
    const categoryRef=useRef();

    const ExpenseHandler=event=>{
        event.preventDefault();
       const amount=amountRef.current.value;
       const description=descriptionRef.current.value;
       const category=categoryRef.current.value;
       ctx.AddExpense({
        amount:amount,
        description:description,
        category:category,
        id:Math.random().toString()
       })
    }
    const userExpenses=ctx.expenseData.map(item=>
        <div className={styles.expense}>
            <ul>
                <li><h3>Amount:</h3> {item.amount}</li>
                <li><h3>Description:</h3> {item.description}</li>
                <li><h3>Category:</h3> {item.category}</li>
            </ul>
        </div>
    );
    return (
        <Fragment>
        <div className={styles.headline}>
        <h3>Welcome To Expense Tracker!!!</h3>

        <div className={styles.profile}>
            Your profile is Incomplete.
            <Link to='/profile'>Complete now</Link>
        </div>
        </div>
        <div className={styles.expenseContainer}>
            <form className={styles.formContainer} onSubmit={ExpenseHandler}>
                <div className={styles.amount}>
                    <label htmlFor='Amount'>Amount</label>
                    <input type='number' required ref={amountRef}/>
                </div>
                <div className={styles.description}>
                    <label htmlFor='Description'>Description</label>
                    <input type='text' required ref={descriptionRef} maxlength = "50"/>
                </div>
                <div className={styles.category}>
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
            <div className={styles.userExpenses}>
                {userExpenses}
            </div>
        </div>
        
        </Fragment>
    );
};
export default Home;