import Header from "./Header";
import { Fragment } from "react";
import styles from './Layout.module.css';

const Layout=(props)=>{

    return(
        <Fragment>
        <Header/>
        <div className={styles.section}>{props.children}</div>
        </Fragment>
        
    );
};
export default Layout;