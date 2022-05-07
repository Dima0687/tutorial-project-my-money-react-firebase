import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';

// styles
import styles from './Home.module.css';

const TransactionForm = ({ uid }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [isSpending, setIsSpending] = useState(false);
  const { addDocument, response } = useFirestore('transactions');

  const handleSubmit = (e) => {
    e.preventDefault();

    addDocument({
      uid,
      name,
      amount: isSpending ? `- ${amount}`: amount
    })
  }

  useEffect(() => {
    if(response.success){
      setName('');
      setAmount('');
    }
  }, [response.success]);

  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name:</span>
          <input 
            type="text"
            required
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Amount (€):</span>
          <input 
            type="number"
            required
            onChange={e => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        <label className={styles.spending}>
        <input 
            type="checkbox"
            onChange={e => setIsSpending(e.target.checked)}
            value={amount}
          />
          <span>Mark as spending ?</span>
        </label>
        <button>Add Transaction</button>
      </form>
    </>
  );
}
 
export default TransactionForm;