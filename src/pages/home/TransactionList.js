import { useFirestore } from '../../hooks/useFirestore';

// styles
import styles from './Home.module.css'

const TransactionList = ({ transactions }) => {
  const { deleteDocument } = useFirestore('transactions');


  const checkStatus = (number) => {
    return Math.sign(number) >= 0 ? styles.positiv : styles.negative;
  }

  return (
    <ul className={styles.transactions}>
      {transactions.map(transaction => (
        <li key={transaction.id} className={checkStatus(transaction.amount)}>
          <p className={styles.name}>{transaction.name}</p>
          <p className={styles.amount}>{transaction.amount} €</p>
          <button onClick = {() => deleteDocument(transaction.id)}>x</button>
        </li>
      ))}
    </ul>
  );
}
 
export default TransactionList;