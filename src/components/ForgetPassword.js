import {useRef, useState} from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import styles from './ForgetPassword.module.css';
const ForgetPassword=()=>{
    const [IsLoading,setIsLoading]=useState(false);
    const emailRef=useRef();
    const darkOne=useSelector(state=>state.theme.darktheme);
    const ForgetPasswordHandler=async(event)=>{
    event.preventDefault();
    const email=emailRef.current.value;
    setIsLoading(true);
    await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCLc6N3-tIh7YG_6Fl2B6raRRnEcvhu9TE',
       {
        method:"POST",
        body:JSON.stringify({
            requestType: "PASSWORD_RESET",
            email:email
        }),
        headers:{
            'Content-Type': 'application/json'
        }
       }).then(res=>{
        setIsLoading(false);
        if(res.ok){
            res.json().then(data=>console.log('Mail send for password reset',data));
        }else{
            return res.json().then(data=>{
                let error='Forget Password Authentication Failed';
                if(data && data.error && data.error.message){
                    error=data.error.message;
                }
                alert(error);
                console.log(data);
            })
        }
       })
  }
    return (
        <div className={darkOne?styles.darkbackground:styles.background}>
            <img src={darkOne?'darkback.jpg':'light.jpg'} alt='backgroundImage' className={darkOne?styles.darkbackimage:styles.backimage}/>
            <div className={darkOne?styles.darkcenter:styles.center}>
            <img src={darkOne?'darkcenter.jpg':'lightcenter.jpg'} alt='checkList_jpg'/>
            <form className={darkOne?styles.darkcontainer:styles.container} onSubmit={ForgetPasswordHandler}>
                {IsLoading && <p>Please Wait Loading...</p>}
                <label>Email the email with which you have registered.</label>
                <input type='email' required ref={emailRef} placeholder='Email'/>
                <button>Send Link</button>
                <label>Already a user?<Link to='/login'>Login</Link></label>
            </form>
            </div>
        </div>
    );
};
export default ForgetPassword;