import styles from './Login.module.css';
import {useContext, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import AuthContext from '../Store/AuthContext';
const Login=(props)=>{
    const ctx=useContext(AuthContext)
    const userEmailRef=useRef();
    const userPasswordRef=useRef();
    const userConfirmPasswordRef=useRef();

    const [isLogin,setIsLogin]=useState(false);
    const [isLoading,setIsLoading]=useState(false);
    const history=useHistory();
    const IsLoginHandler=()=>{
        setIsLogin(prev=>!prev);
    }
   const FormSubmitHandler=event=>{
    event.preventDefault();
    const email=userEmailRef.current.value;
    const password=userPasswordRef.current.value;
    const confirmPassword=isLogin ? '':userConfirmPasswordRef.current.value;
    setIsLoading(true);
    const URL=isLogin?'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCLc6N3-tIh7YG_6Fl2B6raRRnEcvhu9TE':'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCLc6N3-tIh7YG_6Fl2B6raRRnEcvhu9TE';
    if(password === confirmPassword || isLogin){
       fetch(URL,
       {
        method:'POST',
        body:JSON.stringify({
            email:email,
            password:password,
            returnSecureToken:true
        }),
        headers:{
            'Content-Type':'application/json'
        }
       })
       .then(res=>{
        setIsLoading(false);
           if(res.ok){
               res.json().then(data=>{
                isLogin?console.log(" User has successfully Logged In"):console.log(" User has successfully Sign Up");
                ctx.UserLogin(data);
                history.replace('/home')
            });
               
               
                }
            else{
                return res.json().then(data=>{
                    let errorMessage='Authenication failed';
                    if(data && data.error && data.error.message){
                        errorMessage=data.error.message;
                    }
                    alert(errorMessage);
                    })}})
       .catch(err=>{
        console.log('Error',err)})
    }else{
        alert('Entered Password are not same!!!');
        return;
    }

   }
    return (
        <div>
            <img className={styles.style} src='corner.JPG' alt='corner'/>
            <form className={styles.container} onSubmit={FormSubmitHandler}>
                <h2>{isLogin? 'LogIn':'SignUp'}</h2>
                <div className={styles.email}>
                    <input type='email' placeholder='Email' required ref={userEmailRef}/>
                </div>
                <div className={styles.password}>
                    <input type='password' placeholder='Password' required ref={userPasswordRef}/>
                </div>
                <div className={styles.password}>
                    {!isLogin && <input type='password' placeholder='ConfirmPassword' required ref={userConfirmPasswordRef}/>}
                </div>
                {isLoading? <h3>Loading...</h3>:<button className={styles.loginbutton}>{isLogin? 'Login':'Sign up'}</button>}
                {isLogin && <button className={styles.forgetpassword}>Forget Password</button>}
            </form>
            <div className={styles.usertype}>
                <button href='' onClick={IsLoginHandler}>{isLogin? "Don't have an account? Signup":'Have an account? Login'}</button>
            </div>
        </div>
    );
};

export default Login;