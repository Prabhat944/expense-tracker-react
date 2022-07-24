import styles from './Login.module.css';
import {useRef} from 'react';
const Login=()=>{
    const userEmailRef=useRef();
    const userPasswordRef=useRef();
    const userConfirmPasswordRef=useRef();
   const FormSubmitHandler=event=>{
    event.preventDefault();
    const email=userEmailRef.current.value;
    const password=userPasswordRef.current.value;
    const confirmPassword=userConfirmPasswordRef.current.value;
    if(password === confirmPassword){
       fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCLc6N3-tIh7YG_6Fl2B6raRRnEcvhu9TE',
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
           if(res.ok){
               res.json().then(data=>console.log(" User has successfully signed up"))
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
                <h2>SignUp</h2>
                <div className={styles.email}>
                    <input type='email' placeholder='Email' required ref={userEmailRef}/>
                </div>
                <div className={styles.password}>
                    <input type='password' placeholder='Password' required ref={userPasswordRef}/>
                </div>
                <div className={styles.password}>
                    <input type='password' placeholder='ConfirmPassword' required ref={userConfirmPasswordRef}/>
                </div>
                <button>Sign up</button>
            </form>
            <div className={styles.usertype}>
                <button href=''>Have an account? Login</button>
            </div>
        </div>
    );
};

export default Login;