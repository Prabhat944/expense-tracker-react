import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authActions } from '../../Store/auth';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';


const Header=(props)=>{
    const dispatch=useDispatch();
     const darkOne=useSelector(state=>state.theme.darktheme);

     const history=useHistory();
     const UserStateHandler=()=>{
        if(props.islogin){
            dispatch(authActions.logout())
        }
            history.replace('/login');
     }
    return(
        <header className={darkOne?styles.darkheader:styles.header}>
        <h1>MyWebLink</h1>
        <ul>
            <li><NavLink to='/login/home'>Home</NavLink></li>
            <li><NavLink to='/login/prod'>Products</NavLink></li>
            <li><NavLink to='/login/about'>About Us</NavLink></li>
        </ul>
        <button className={darkOne?styles.darkuserState:styles.userState} onClick={UserStateHandler}>{props.islogin?'Logout':'Login'}</button>
        </header>
    );
};

export default Header;