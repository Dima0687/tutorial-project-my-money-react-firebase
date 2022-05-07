import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';

//styles
import styles from './Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isPending } = useLogin();
  const [isMasked, setIsMasked] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    login(email, password);
  }

  return (
    <form onSubmit={handleSubmit} className={styles['login-form']}>
      <h2>Login</h2>
      <label>
        <span>email:</span>
        <input 
          type="email"
          onChange={(e) => setEmail(e.target.value)}
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
          {/* <FontAwesomeIcon icon={ faEye } */}
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
      { !isPending && <button className='btn'>Login</button> }
      { isPending && <button className='btn' disabled>loading</button> }
      { error && <p>{error}</p> }
    </form>
  );
}
 
export default Login;