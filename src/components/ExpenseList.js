import { useDispatch } from 'react-redux';
import styles from './ExpenseList.module.css';
import {expenseActions} from '../Store/index';

const ExpenseList=props=>{
    const dispatch=useDispatch();
   
    const DeleteHandler=async()=>{
      dispatch(expenseActions.deleteexpense(props.item.key));
      await fetch(`https://expense-tracker-react-d5a39-default-rtdb.firebaseio.com/expenses/${props.item.key}.json`,{
                method:'DELETE',
              }).then(res=>{
                console.log("Expense successfully deleted");    
                })
              
       
    }
    return (
        <div className={styles.expense} key={props.item.id}>
            <ul>
                <li><h3>Amount:</h3> {props.item.amount}</li>
                <li><h3>Description:</h3> {props.item.description}</li>
                <li><h3>Category:</h3> {props.item.category}</li>
            </ul>
            <div className={styles.controlbutton}>
                <button className={styles.edit} onClick={()=>props.onEdit(props.item)} >Edit</button>
                <button className={styles.delete} onClick={DeleteHandler} >Delete</button>
            </div>
        </div>
    );
};

export default ExpenseList;