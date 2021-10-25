import { useEffect } from 'react';
import { VscGithubInverted } from 'react-icons/vsc';
import { api } from '../../services/api';

import styles from './styles.module.scss';

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  }
}

export function LoginBox() {
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=2c8a5bc625f2e4b4db8e`;

  async function signIn(githubeCode: string) {
    console.log(githubeCode); 
    
    const response = await api.post<AuthResponse>('authenticate', {
      code: githubeCode
    });

    const { token, user } = response.data;

    localStorage.setItem('@dowhile:token', token);
    console.log(user);
  }

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=');

    if (hasGithubCode) {
      const [urlWithoutCode, gihubCode] = url.split('?code=');
      window.history.pushState({}, '', urlWithoutCode);

      signIn(gihubCode);
    }
  }, []);

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