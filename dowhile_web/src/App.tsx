import { LoginBox } from './components/LoginBox';
import { MessageList } from './components/MessagesList';

import styles from './App.module.scss';

function App() {
  return (
    <main className={styles.contentWrapper}>
      <MessageList />
      <LoginBox />
    </main>
  )
}

export { App }
