import { authActions } from "./auth";

// export const LoginToServer=(logindata)=>{
//     return async(dispatch)=>{
//             await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCLc6N3-tIh7YG_6Fl2B6raRRnEcvhu9TE',{
//                 method:'POST',
//                 body:JSON.stringify(logindata),
//                 headers:{
//                     'Content-Type':'applications/json'
//                 }
//             }).then(response=>{
//                 if(response.ok){
//                     response.json().then(userinfo=>{
//                         console.log('Successfully login')
//                         dispatch(authActions.loginhandler({
//                             isAuthenticated:userinfo.registered,
//                             userId:userinfo.email,
//                             token:userinfo.idToken,
//                         }));
                        
//                     })
                    
//                 }else{
//                     response.json().then(data=>{
//                         let errorMessage='Authenication failed';
//                         if(data && data.error && data.error.message){
//                             errorMessage=data.error.message;
//                         }
//                         alert(errorMessage);
//                     })
//                 }
//             })
//         }
               
        
//     };

export const SignUpToServer=(logindata)=>{
    return async(dispatch)=>{
        const SendingInfo=async()=>{
            const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCLc6N3-tIh7YG_6Fl2B6raRRnEcvhu9TE',{
                method:'POST',
                body:JSON.stringify(logindata),
                headers:{
                    'Content-Type':'applications/json'
                }
            });
            if(!response.ok){
                throw new Error('Unable to signup');
            }
            const data=response.json();
            return data;
        }
        try{
            const userinfo=await SendingInfo();
            console.log('Successfully sinup')
            dispatch(authActions.loginhandler({
                isAuthenticated:true,
                userId:userinfo.email,
                token:userinfo.idToken,
            }))
        }catch(error){
            throw new Error();
        }
    }
};



export const UserContactInfo=()=>{
    return async(dispatch)=>{
        const FetchingInfo=async()=>{
            const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCLc6N3-tIh7YG_6Fl2B6raRRnEcvhu9TE',{
                method:'POST',
                body:JSON.stringify({idToken:localStorage.getItem('Token')}),
                headers:{
                    'Content-Type':'applications/json'
                }
            });
            if(!response.ok){
                throw new Error('Unable to process');
            }
            const data=response.json();
            return data;
        }
        try{
            const userinfo=await FetchingInfo();
            const data=userinfo.users[0];
            dispatch(authActions.userpersonalinfo(data))
            console.log('Successfully updated cart')
        }catch(error){
            throw new Error('Error in Fetching contact data');
        }
    }
};


export const EmailVerification=()=>{
    return async(dispatch)=>{
        const FetchingInfo=async()=>{
            const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCLc6N3-tIh7YG_6Fl2B6raRRnEcvhu9TE',{
                method:'POST',
                body:JSON.stringify({
                    requestType: "VERIFY_EMAIL",
                    idToken:localStorage.getItem('Token')
                }),
                headers:{
                    'Content-Type':'applications/json'
                }
            });
            if(!response.ok){
                throw new Error('Unable to Verify Email');
            }
        }
           await FetchingInfo().catch(error=>{throw new Error('Error in Sending verification email');})
        
    }
};



export const ContactUpdate=(userdata)=>{
    return async(dispatch)=>{
        const FetchingInfo=async()=>{
            const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCLc6N3-tIh7YG_6Fl2B6raRRnEcvhu9TE',{
                method:'POST',
                body:JSON.stringify(userdata),
                headers:{
                    'Content-Type':'applications/json'
                }
            });
            if(!response.ok){
                throw new Error('Unable to update contacts');
            }
            console.log('successfully updated')
        }
           await FetchingInfo().catch(error=>{throw new Error('Error in updating current info');})
        
    }
};