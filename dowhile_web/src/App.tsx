import { LoginBox } from './components/LoginBox';
import { MessageList } from './components/MessagesList';

import styles from './App.module.scss';
import { useAuth } from './contexts/auth';
import { SendMessageForm } from './components/SendMessageForm';

function App() {
  const { user } = useAuth();
  return (
    <main className={styles.contentWrapper}>
      <MessageList />
      {!!user ? <SendMessageForm /> : <LoginBox />}
    </main>
  )
}

export { App }
