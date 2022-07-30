import styles from './Profile.module.css';
import {useEffect, useRef,useState} from 'react';
import { useSelector } from 'react-redux';

const Profile=props=>{
    const [IsLoading,setIsLoading]=useState(false);
    const [Emailverified,setEmailVerified]=useState(false);
    const darkOne=useSelector(state=>state.theme.darktheme);
    const userNameRef=useRef();
    const userUrlRef=useRef();
    useEffect(()=>{
       const FetchData=async()=>{
        const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCLc6N3-tIh7YG_6Fl2B6raRRnEcvhu9TE',{
            method:"POST",
            body:JSON.stringify({idToken:localStorage.getItem('Token')}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const data=await response.json()
        if(data.users){
            userNameRef.current.value=data.users[0].displayName;
            userUrlRef.current.value=data.users[0].photoUrl;
            localStorage.setItem('EmailVerified',data.users[0].emailVerified);
        }
        setEmailVerified(localStorage.getItem('EmailVerified'));
       }
       FetchData()
       
    },[])

 const EmailVerifiedHandler=async()=>{
    setIsLoading(true);
    await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCLc6N3-tIh7YG_6Fl2B6raRRnEcvhu9TE',
    {
        method:'POST',
        body:JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken:localStorage.getItem('Token')
        }),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(res=>{
        setIsLoading(false);
        if(res.ok){
              res.json().then(data=>{
                console.log('Verification successful',data);
                alert('Verification link send to your email');
                
            })
        }else{
            return res.json().then(data=>
                {
                    let error='Verification Failed';
                    if(data && data.error && data.error.message){
                        error=data.error.message;
                    }
                    alert(error);
                })
        }
    })
    .catch(err=>console.log('error',err));
    }

    const contactFormHandler=(event)=>{
        event.preventDefault();
         const token=localStorage.getItem('Token');
         const name=userNameRef.current.value;
         const url=userUrlRef.current.value;
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCLc6N3-tIh7YG_6Fl2B6raRRnEcvhu9TE',
        {
            method:'POST',
            body:JSON.stringify({
                idToken:token,
                displayName:name,
                photoUrl:url,
                deleteAttribute:[],
                returnSecureToken:true
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res=>
           { if(res.ok){
               res.json().then(data=>console.log('Seuccesfully updated',data))
           }else{
            return res.json().then(data=>console.log('error in response',data))
           }})
        .catch(err=>console.log('error',err));

    }
    return (
        <div>
        <div className={darkOne?styles.darkheadline:styles.headline}>
            <h3>Winners never quite,Quitters never win.</h3>
            <div className={darkOne?styles.darkprofile:styles.profile}>
                Your Profile is 64% complete.A complete Profile has higher chances of landing a job.
                <button>Complete now</button>
            </div>
        </div>
        <div className={darkOne?styles.profilebox:styles.profilebox}>
        <div className={darkOne?styles.darkverify:styles.verify}>
           <div className={styles.verified}>{Emailverified ?'Your Email is Verified': "Your Email is Not Verified"}</div>
           {!Emailverified && <div className={styles.notverified}><button onClick={EmailVerifiedHandler}>{IsLoading ?'Verifying...' :"Verify Now"}</button></div>}
           
        </div>
        <div className={darkOne?styles.darkcontacts:styles.contacts}>
            <div className={darkOne?styles.darkdetails:styles.details}>
                <h2>Contact Details</h2>
                <button>Cancel</button>
            </div>
            <form className={darkOne?styles.darkcontactform:styles.contactform} onSubmit={contactFormHandler}>
                <div className={styles.forminput}>
                <div className={darkOne?styles.darkname:styles.name}>
                    <label>Full Name:</label>
                    <input type='text' ref={userNameRef} required />
                </div>
                <div className={darkOne?styles.darkurl:styles.url}>
                    <label>Profile Photo URL</label>
                    <input type='url' ref={userUrlRef} required />
                </div>
                </div>
                <div className={darkOne?styles.darkupdate:styles.update}>
                    <button >Update</button>
                </div>
            </form>
            
        </div>
        </div>
        </div>
    );
};

export default Profile;