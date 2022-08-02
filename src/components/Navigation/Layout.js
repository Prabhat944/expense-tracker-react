import Header from "./Header";
import { Fragment } from "react";
import styles from './Layout.module.css';
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../../Store/theme";

const Layout=(props)=>{
    const darkOne=useSelector(state=>state.theme.darktheme);
    const dispatch=useDispatch();
    const premium=useSelector(state=>state.auth.premium);
    const ChangeTheme=()=>{
   dispatch(themeActions.changetheme());
     }
    return(
        <Fragment>
        <Header islogin={props.islogin} logoutHandler={()=>props.logoutHandler()}/>
        {premium && <button 
        onClick={ChangeTheme} 
        className={darkOne?styles.darkthemechangerbutton:styles.themechangerbutton}>
          {darkOne?'Light Theme':'Dark Theme'}
          </button>}
        <div className={darkOne?styles.darksection:styles.section}>{props.children}</div>
        </Fragment>
        
    );
};
export default Layout;