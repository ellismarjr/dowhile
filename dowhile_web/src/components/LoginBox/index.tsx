import { VscGithubInverted } from 'react-icons/vsc';
import { useAuth } from '../../contexts/auth';

import styles from './styles.module.scss';



export function LoginBox() {
  const { signInUrl, user } = useAuth();

  console.log(user);


  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={signInUrl} className={styles.signInWithGithub}>
        <VscGithubInverted size={24} />
        Entrar com Github
      </a>
    </div>
  )
}