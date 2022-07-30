import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authActions } from '../../Store';
import styles from './Header.module.css';
const Header=()=>{
    const dispatch=useDispatch();
     const islogin=useSelector(state=>state.auth.isAuthenticated);
     const darkOne=useSelector(state=>state.theme.darktheme);

     const history=useHistory();
     const UserStateHandler=()=>{
        if(islogin){
            dispatch(authActions.logout())
        }
            history.replace('/login');
     }
    return(
        <header className={darkOne?styles.darkheader:styles.header}>
        <h1>MyWebLink</h1>
        <ul>
            <li>Home</li>
            <li>Products</li>
            <li>About Us</li>
        </ul>
        <button className={darkOne?styles.darkuserState:styles.userState} onClick={UserStateHandler}>{islogin?'Logout':'Login'}</button>
        </header>
    );
};

export default Header;