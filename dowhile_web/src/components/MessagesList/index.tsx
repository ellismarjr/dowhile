import { useEffect, useState } from 'react';
import io from 'socket.io-client';

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

const messagesQueue: IMessage[] = [];

const socket = io('http://localhost:4000');

socket.on('new_message', (newMessage: IMessage) => {
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    console.log(messagesQueue);
    
    setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages(prevState => [
          messagesQueue[0], 
          prevState[0], 
          prevState[1]
        ].filter(Boolean));

        messagesQueue.shift();
      }
    }, 3000);
  }, []);

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