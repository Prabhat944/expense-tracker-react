import styles from './Profile.module.css';
import {useRef} from 'react';

const Profile=props=>{
    const userNameRef=useRef();
    const userUrlRef=useRef();
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
                deleteAttribute:["DISPLAY_NAME","PHOTO_URL"],
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
        <div className={styles.headline}>
            <h3>Winners never quite,Quitters never win.</h3>
            <div className={styles.profile}>
                Your Profile is 64% complete.A complete Profile has higher chances of landing a job.
                <button>Complete now</button>
            </div>
        </div>
        <div className={styles.contacts}>
            <div className={styles.details}>
                <h2>Contact Details</h2>
                <button>Cancel</button>
            </div>
            <form className={styles.contactform} onSubmit={contactFormHandler}>
                <div className={styles.name}>
                    <label>Full Name:</label>
                    <input type='text' ref={userNameRef} required/>
                </div>
                <div className={styles.url}>
                    <label>Profile Photo URL</label>
                    <input type='url' ref={userUrlRef} required/>
                </div>
                <div className={styles.update}>
                    <button >Update</button>
                </div>
            </form>
            
        </div>
        </div>
    );
};

export default Profile;