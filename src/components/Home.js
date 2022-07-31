import { useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import styles from './Home.module.css';
import ExpenseList from './ExpenseList';
import { CSVLink } from "react-csv";
import { useDispatch, useSelector} from 'react-redux';
import { authActions } from '../Store/auth';
import { expenseActions } from '../Store/expense';

const Home=(props)=>{
    const dispatch=useDispatch();
    const expense=useSelector(state=>state.expense.expense);
    const TotalExpense=useSelector(state=>state.expense.totalExpense);
    const userId=useSelector(state=>state.auth.userId);
    const user=userId.replace(/[.@]/g , '');
    const darkOne=useSelector(state=>state.theme.darktheme);
    const premium=useSelector(state=>state.auth.premium);
    const premid=useSelector(state=>state.auth.premid);

    const [KeyValue,setKeyValue]=useState('');
    const amountRef=useRef();
    const descriptionRef=useRef();
    const categoryRef=useRef();
useEffect(()=>{
    const emailId=localStorage.getItem('Email');
    const token=localStorage.getItem('Token');
    const login=localStorage.getItem('Login');
    if(emailId && token){
      dispatch(authActions.userid(emailId));
      dispatch(authActions.token(token));
      dispatch(authActions.login(login));
    }
    const response=async()=>{
        await fetch(`https://expense-tracker-react-d5a39-default-rtdb.firebaseio.com/${user}/expenses.json/`,
        {
            method:'GET',
            headers:{
                'Content-type':'application/json'
            }

        })
        .then(res=>{
            if(res.ok){
                res.json().then(data=>{  
                    for(let item in data){
                        dispatch(expenseActions.addexpense({...data[item],key:item}));
                    
                    }                     
                });
                
            }else{
                return res.json().then(data=>{
                let error='Not able to add';
                if(data && data.error && data.error.message){
                    error=data.error.message;
                }
                alert(error);})}
            })
        }
         response();
        const premiumUser=async()=>{await fetch(`https://expense-tracker-react-d5a39-default-rtdb.firebaseio.com/${user}/${premid}.json`,{
            method:'GET',
            headers:{
                'Content-type':'application/json'
            }
        }).then(res=>{if(res.ok){dispatch(authActions.premiumuser(premid))}})
        .catch(err=>console.log(err))
         }
         premiumUser();
    },[dispatch,user,premid]);
    
    const ExpenseHandler=async(event)=>{
        event.preventDefault();
        const index=expense.findIndex(item=>item.key===KeyValue);

        let flag=false;
        if(index > -1){flag=true};

       const amount=amountRef.current.value;
       const description=descriptionRef.current.value;
       const category=categoryRef.current.value;
       const newExpense={
        amount:amount,
        description:description,
        category:category,
          };
          const url=flag?`https://expense-tracker-react-d5a39-default-rtdb.firebaseio.com/${user}/expenses/${KeyValue}.json`:`https://expense-tracker-react-d5a39-default-rtdb.firebaseio.com/${user}/expenses.json`;
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
                console.log('data',data)
                  if(flag){
                        dispatch(expenseActions.addexpense({...data,key:KeyValue}));
                        setKeyValue('');
                  }else{
                       dispatch(expenseActions.addexpense({...newExpense,key:data.name}));
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
    const userExpenses=expense.map(itemData=><ExpenseList item={itemData} key={itemData.key} onEdit={EditHandler}/>);
    const header=[
        {label:'AMOUNT',key:'amount'},
        {label:'CATEGORY',key:'category'},
        {label:'DESCRIPTION',key:'description'}
    ]
    const ActivatePremium=async()=>{
        if(!premid){
       await fetch(`https://expense-tracker-react-d5a39-default-rtdb.firebaseio.com/${user}.json`,{
        method:'POST',
        body:JSON.stringify({premiumuser:true}),
        headers:{
            'Content-type':'application/json'
        }}).then(res=>{
            if(res.ok){
                res.json().then(data=>dispatch(authActions.premiumuser(data.name))
                );
            }else{
                return res.json().then(data=>console.log('error in getting premium info',data))
            }
        })
    }else{
        dispatch(authActions.premiumuser(premid));
    }
       
    }
    return (
        <div className={styles.expensesection}>
        <div className={darkOne?styles.darkheadline:styles.headline}>
        <h3>Welcome To Expense Tracker!!!</h3>

        <div className={darkOne?styles.darkprofile:styles.profile}>
            Your profile is Incomplete.
            <Link to='/profile'>Complete now</Link>
        </div>
        </div>
        <div className={darkOne?styles.darkexpenseContainer:styles.expenseContainer}>
            <div className={darkOne?styles.darkpremium:styles.premium}>{TotalExpense>10000 && <button onClick={ActivatePremium}>Activate Premium</button>}</div>
                {premium && premid && <div className={styles.downloadfile}>
                   <CSVLink className={styles.csvlink} data={expense} headers={header}>
                    Download Expense
                    </CSVLink>
                </div>}
            <form className={darkOne?styles.darkformContainer:styles.formContainer} onSubmit={ExpenseHandler}>
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
    );
};
export default Home;