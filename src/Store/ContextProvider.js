import AuthContext from "./AuthContext";
import { useEffect, useState } from "react";

const ContextProvider=(props)=>{
    const [isLogin,setIsLogin]=useState(false);
    const [email,setEmail]=useState('');
    const [token,setToken]=useState('');
    const [expenses,setExpenses]=useState([]);

    useEffect(()=>{
          const emailId=localStorage.getItem('Email');
          const token=localStorage.getItem('Token');
          if(emailId && token){
            setIsLogin(true);
            setEmail(emailId);
            setToken(token);
          }
          const response=async()=>{
            await fetch('https://expense-tracker-react-d5a39-default-rtdb.firebaseio.com/expenses.json/',
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
                           
                            setExpenses(prev=>[...prev,{...data[item],key:item}])
                        }                     
                    })
                    
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
    },[])
    const LoginHandler=(data)=>{
        setIsLogin(true);
        localStorage.setItem('Token',data.idToken);
        localStorage.setItem('Email',data.email);
    }
    const LogoutHandler=()=>{
        setIsLogin(false);
        localStorage.removeItem('Token');
        localStorage.removeItem('Email');
        localStorage.removeItem('EmailVerified');
    }
    const AddExpenseHandler=async(key)=>{

        await fetch(`https://expense-tracker-react-d5a39-default-rtdb.firebaseio.com/expenses/${key}.json`,
        {
            method:'GET',
            headers:{
                'Content-type':'application/json'
            }
        })
        .then(res=>{
            if(res.ok){
                res.json().then(data=>{
                    const index=expenses.findIndex(item=>item.key===key);
                    if(index === -1){
                        setExpenses(prev=>[...prev,{...data,key:key}]);
                    }else{
                        const newExpense=[...expenses];
                        newExpense[index]={...data,key:key}

                           setExpenses(newExpense);
                    }
                    
                })
            }else{
                return res.json().then(err=>console.log('error in fetching new expense',err))
            }
        })
    }
    
    const DeleteHandler=async(key)=>{
      await fetch(`https://expense-tracker-react-d5a39-default-rtdb.firebaseio.com/expenses/${key}.json`,{
        method:'DELETE',
      }).then(res=>{
        console.log("Expense successfuly deleted");
        const newExpense=[];
        for(let data in expenses){
            if(expenses[data].key !== key){
                newExpense.push(expenses[data]);
            }
        }

        setExpenses(newExpense);
      })
      .catch(err=>console.log('delete failed',err))
    }
const contextItem={
    expenseData:expenses,
    email:email,
    token:token,
    username:'',
    Login:isLogin,
    UserLogin:LoginHandler,
    UserLogOut:LogoutHandler,
    AddExpense:AddExpenseHandler,
    DeleteExpense:DeleteHandler

}
    return (
        <AuthContext.Provider value={contextItem}>
            {props.children}
        </AuthContext.Provider>
    );
};
export default ContextProvider;