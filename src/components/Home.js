import { Fragment, useContext, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import styles from './Home.module.css';
import AuthContext from '../Store/AuthContext';
import ExpenseList from './ExpenseList';

const Home=(props)=>{
    const [KeyValue,setKeyValue]=useState('');
    const ctx=useContext(AuthContext);
    const amountRef=useRef();
    const descriptionRef=useRef();
    const categoryRef=useRef();

    
    const ExpenseHandler=async(event)=>{
        event.preventDefault();
        const index=ctx.expenseData.findIndex(item=>item.key===KeyValue);
        let flag=false;
        if(index > -1){flag=true}
       const amount=amountRef.current.value;
       const description=descriptionRef.current.value;
       const category=categoryRef.current.value;
       const newExpense={
        amount:amount,
        description:description,
        category:category,
          };
          const url=flag?`https://expense-tracker-react-d5a39-default-rtdb.firebaseio.com/expenses/${KeyValue}.json`:`https://expense-tracker-react-d5a39-default-rtdb.firebaseio.com/expenses.json`;
    await fetch(url,
    {
        method:flag?'PUT':'POST',
        body:JSON.stringify(newExpense),
        headers:{
            'Content-type':'application/json'
        }
    })
    .then(res=>{
        if(res.ok){
            res.json().then(data=>{
                
                if(flag){
                    ctx.AddExpense(KeyValue);
                    setKeyValue(null)
                }else{
                    ctx.AddExpense(data.name);
                }
                
                
            })
            
        }else{
            return res.json().then(data=>{
                let error='Not able to add';
                if(data && data.error && data.error.message){
                    error=data.error.message;
                }
                alert(error);
            })
        }
    })
    .catch(err=>console.log('Error',err));
       
    }
    const EditHandler=(body)=>{
        amountRef.current.value=body.amount;
        descriptionRef.current.value=body.description;
        categoryRef.current.value=body.category;
        setKeyValue(body.key);
      }
    const userExpenses=ctx.expenseData.map(itemData=><ExpenseList item={itemData} key={itemData.key} onEdit={EditHandler}/>);
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
                    <input type='text' required ref={descriptionRef} maxLength = "50"/>
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