import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';

// styles
import styles from './Signup.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const {error, signup, isPending } = useSignup();
  const [isMasked, setIsMasked] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    signup(email, password, displayName);
  }

  return (
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
      <h2>Signup</h2>
      <label>
        <span>email:</span>
        <input 
          type="email"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password</span>
        <div>
          <input 
            type={isMasked ? 'password' : 'text'}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className={styles.password}
          />
         { !isMasked && 
            <FontAwesomeIcon 
              icon={faEyeSlash} 
              className={styles.eyes}
              onClick={() => setIsMasked(true)}
         />}
         { isMasked && 
            <FontAwesomeIcon 
              icon={faEye} 
              className={styles.eyes}
              onClick={() => setIsMasked(false)}
          />}
        </div>
      </label>
      <label>
        <span>display name:</span>
        <input 
          type="text"
          onChange={e => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      {!isPending && <button className='btn'>Signup</button> }
      { isPending && <button className='btn' disabled>loading</button> }
      { error && <p>{ error }</p> }
    </form>
  );
}
 
export default Signup;