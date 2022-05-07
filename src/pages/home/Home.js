import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';

// components
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';

// styles
import styles from './Home.module.css';

const Home = () => {
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    'transactions',
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );

  return (
    <main className={styles.container}>
      <section className={styles.content}>
        { error && <p>{error}</p> }
        { documents && <TransactionList transactions={documents}/> }
      </section>
      <section className={styles.sidebar}>
        <TransactionForm uid={ user.uid }/>
      </section>
    </main>
  );
}
 
export default Home;