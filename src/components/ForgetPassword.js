import {useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import styles from './ForgetPassword.module.css';
const ForgetPassword=()=>{
    const [IsLoading,setIsLoading]=useState(false);
    const emailRef=useRef();
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
        <div className={styles.background}>
            <img src='background.JPG' alt='expenses_jpg' className={styles.backimage}/>
            <div className={styles.center}>
            <img src='center.PNG' alt='checkList_jpg'/>
            <form className={styles.container} onSubmit={ForgetPasswordHandler}>
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