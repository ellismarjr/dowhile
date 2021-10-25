import { useEffect, useState } from 'react';
import { api } from '../../services/api';

import logoImg from '../../assets/logo.svg';

import styles from './styles.module.scss';

type IUser = {
  name: string;
  avatar_url: string;
}

type IMessage = {
  id: string;
  text: string;
  created_at: string;
  user_id: string;
  user: IUser;
}

export function MessageList() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    async function loadMessages() {
      const response = await api.get<IMessage[]>('/messages/last3');
      setMessages(response.data);
    }
    loadMessages();
  }, []);

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile 2021" />

      <ul className={styles.messageList}>
        {messages.map(message => (
          <li key={message.id} className={styles.message}>
            <p className={styles.messageContent}>
              {message.text}
            </p>

            <div className={styles.messageUser}>
              <div className={styles.userImage}>
                <img src={message.user.avatar_url} alt={message.user.name} />
              </div>
              <span>{message.user.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}