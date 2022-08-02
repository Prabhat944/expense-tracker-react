import styles from './Login.module.css';
import {useEffect, useRef, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SignUpToServer } from '../../Store/LoginServerData';
import { FetchFromServer } from '../../Store/ServerData';
import { authActions } from '../../Store/auth';


const Login=(props)=>{
    const dispatch=useDispatch();
    const darkOne=useSelector(state=>state.theme.darktheme);
    const userEmailRef=useRef();
    const userPasswordRef=useRef();
    const userConfirmPasswordRef=useRef();
    const [isLogin,setIsLogin]=useState(false);
    const [isLoading,setIsLoading]=useState(false);
    const history=useHistory();

    useEffect(()=>{
    },[]);

    const IsLoginHandler=()=>{
        setIsLogin(prev=>!prev);
    }

   const FormSubmitHandler=async(event)=>{
    event.preventDefault();
    const email=userEmailRef.current.value;
    const password=userPasswordRef.current.value;
    const confirmPassword=isLogin ? '':userConfirmPasswordRef.current.value;
    setIsLoading(true);
    if(!isLogin && password !== confirmPassword){
        alert('Password Not Matched')
        return;
    }
    if(isLogin){
        await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCLc6N3-tIh7YG_6Fl2B6raRRnEcvhu9TE',{
                 method:'POST',
                 body:JSON.stringify({
                    email:email,
                    password:password,
                    returnSecureToken:true
                 }),
                 headers:{
                 'Content-Type':'applications/json'
                    }
                 }).then(response=>{
                     if(response.ok){
                        response.json().then(userinfo=>{
                              console.log('Successfully login')
                                dispatch(authActions.loginhandler({
                                    isAuthenticated:userinfo.registered,
                                    userId:userinfo.email,
                                    token:userinfo.idToken,
                                }));
                                const Id=userinfo.email.replace(/[^a-zA-Z0-9 ]/g, '');
                                dispatch(FetchFromServer(Id));
                                props.loginhandler();
                                
                            })
                            
                        }else{
                            response.json().then(data=>{
                                let errorMessage='Authenication failed';
                                if(data && data.error && data.error.message){
                                    errorMessage=data.error.message;
                                }
                                alert(errorMessage);
                            })
                        }
                    })
                }
        else{
        dispatch(SignUpToServer({
            email:email,
            password:password,
            returnSecureToken:true
        }
        ))
    }
   history.replace('/login/home')

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