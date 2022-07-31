import styles from './Login.module.css';
import {useRef, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../Store/auth';
const Login=(props)=>{
    const dispatch=useDispatch();
    const darkOne=useSelector(state=>state.theme.darktheme);
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
                dispatch(authActions.login(true));
                dispatch(authActions.token(data.idToken))
                dispatch(authActions.userid(data.email));
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
            <img className={darkOne?styles.darkstyle:styles.style} src={darkOne?'darkcorner.png':'corner.JPG'} alt='corner'/>
            <form className={darkOne?styles.darkcontainer:styles.container} onSubmit={FormSubmitHandler}>
                <h2>{isLogin? 'LogIn':'SignUp'}</h2>
                <div className={darkOne?styles.darkemail:styles.email}>
                    <input type='email' placeholder='Email' required ref={userEmailRef}/>
                </div>
                <div className={darkOne?styles.darkpassword:styles.password}>
                    <input type='password' placeholder='Password' required ref={userPasswordRef}/>
                </div>
                <div className={darkOne?styles.darkpassword:styles.password}>
                    {!isLogin && <input type='password' placeholder='ConfirmPassword' required ref={userConfirmPasswordRef}/>}
                </div>
                {isLoading? <h3>Loading...</h3>:<button className={darkOne?styles.darkloginbutton:styles.loginbutton}>{isLogin? 'Login':'Sign up'}</button>}
                {isLogin && <Link to='/forgetPassword' >Forget Password</Link>}
            </form>
            <div className={darkOne?styles.darkusertype:styles.usertype}>
                <button href='' onClick={IsLoginHandler}>{isLogin? "Don't have an account? Signup":'Have an account? Login'}</button>
            </div>
        </div>
    );
};

export default Login;