import { useContext } from 'react';
import AuthContext from '../../Store/AuthContext';
import styles from './Header.module.css';
const Header=()=>{
     const ctx=useContext(AuthContext);
     
    return(
        <header className={styles.header}>
        <h1>MyWebLink</h1>
        <ul>
            <li>Home</li>
            <li>Products</li>
            <li>About Us</li>
        </ul>
        <button className={styles.userState} onClick={()=>ctx.UserLogOut()}>{ctx.Login?'Logout':'Login'}</button>
        </header>
    );
};

export default Header;