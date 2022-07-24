import {Link} from 'react-router-dom';
import styles from './Home.module.css';

const Home=(props)=>{

    return (
        <div className={styles.headline}>
        <h3>Welcome To Expense Tracker!!!</h3>

        <div className={styles.profile}>
            Your profile is Incomplete.
            <Link to='/profile'>Complete now</Link>
        </div>
        </div>
    );
};
export default Home;