import {useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';


const Header=(props)=>{
    const darkOne=useSelector(state=>state.theme.darktheme);
    const UserStateHandler=()=>{
        props.logoutHandler();
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