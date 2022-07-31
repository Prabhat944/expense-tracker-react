import { useDispatch, useSelector } from 'react-redux';
import styles from './ExpenseList.module.css';
import {expenseActions} from '../Store/expense';

const ExpenseList=props=>{
    const dispatch=useDispatch();
    const darkOne=useSelector(state=>state.theme.darktheme);
    const userId=useSelector(state=>state.auth.userId);
    const user=userId.replace(/[.@]/g , '');
   
    const DeleteHandler=async()=>{
      dispatch(expenseActions.deleteexpense(props.item.key));
      await fetch(`https://expense-tracker-react-d5a39-default-rtdb.firebaseio.com/${user}/expenses/${props.item.key}.json`,{
                method:'DELETE',
              }).then(res=>{
                console.log("Expense successfully deleted");    
                })
              
       
    }
    return (
        <div className={darkOne?styles.darkexpense:styles.expense} key={props.item.id}>
            <ul>
                <li><h3>Amount:</h3> {props.item.amount}</li>
                <li><h3>Description:</h3> {props.item.description}</li>
                <li><h3>Category:</h3> {props.item.category}</li>
            </ul>
            <div className={darkOne?styles.darkcontrolbutton:styles.controlbutton}>
                <button className={darkOne?styles.darkedit:styles.edit} onClick={()=>props.onEdit(props.item)} >Edit</button>
                <button className={darkOne?styles.darkdelete:styles.delete} onClick={DeleteHandler} >Delete</button>
            </div>
        </div>
    );
};

export default ExpenseList;