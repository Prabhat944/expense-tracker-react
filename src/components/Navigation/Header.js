import styles from './Header.module.css';
const Header=()=>{

    return(
        <header className={styles.header}>
        <h1>MyWebLink</h1>
        <ul>
            <li>Home</li>
            <li>Products</li>
            <li>About Us</li>
        </ul>
        </header>
    );
};

export default Header;