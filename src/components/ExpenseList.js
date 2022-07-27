import { useContext } from 'react';
import AuthContext from '../Store/AuthContext';
import styles from './ExpenseList.module.css';

const ExpenseList=props=>{
    const ctx=useContext(AuthContext);
   
    const DeleteHandler=()=>{
      ctx.DeleteExpense(props.item.key);
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