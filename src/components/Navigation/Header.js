import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../Store/AuthContext';
import styles from './Header.module.css';
const Header=()=>{
     const ctx=useContext(AuthContext);
     const history=useHistory();
     const UserStateHandler=()=>{
        if(ctx.Login){
            ctx.UserLogOut();
        }else{
            history.replace('/login');
        }
     }
    return(
        <header className={styles.header}>
        <h1>MyWebLink</h1>
        <ul>
            <li>Home</li>
            <li>Products</li>
            <li>About Us</li>
        </ul>
        <button className={styles.userState} onClick={UserStateHandler}>{ctx.Login?'Logout':'Login'}</button>
        </header>
    );
};

export default Header;