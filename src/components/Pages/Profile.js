import styles from './Profile.module.css';
import {useEffect, useRef,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ContactUpdate, EmailVerification, UserContactInfo } from '../../Store/LoginServerData';

const Profile=props=>{
    const dispatch=useDispatch();
    const [IsLoading,setIsLoading]=useState(false);
    const userNameRef=useRef();
    const userUrlRef=useRef();
    const darkOne=useSelector(state=>state.theme.darktheme);
    const emailVerified=useSelector(state=>state.auth.emailVerified);
    const fullname=useSelector(state=>state.auth.userName);
    const photoUrl=useSelector(state=>state.auth.imageUrl);

    useEffect(()=>{
       dispatch(UserContactInfo());
       userNameRef.current.value=fullname || '';
       userUrlRef.current.value=photoUrl || '';
    },[dispatch,fullname,photoUrl])

 const EmailVerifiedHandler=()=>{
    setIsLoading(true);
    dispatch(EmailVerification());
    }

    const contactFormHandler=(event)=>{
        event.preventDefault();
         const token=localStorage.getItem('Token');
         const name=userNameRef.current.value;
         const url=userUrlRef.current.value;
        dispatch(ContactUpdate({
            idToken:token,
            displayName:name,
            photoUrl:url,
            deleteAttribute:[],
            returnSecureToken:true
        }));

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
           <div className={styles.verified}>{emailVerified ?'Your Email is Verified': "Your Email is Not Verified"}</div>
           {!emailVerified && <div className={styles.notverified}><button onClick={EmailVerifiedHandler}>{IsLoading ?'Verifying...' :"Verify Now"}</button></div>}
           
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