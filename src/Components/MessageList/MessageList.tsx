import { FC, useEffect } from 'react';
import './MessageList.scss';
import { IMessage } from '../../types';
import Message from '../Message/Message';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

// --- Composant permettant d'afficher la liste de messages
const MessageList: FC = () => {
  // --- On récupère la propriété messagesList (contenant tous les messages stovkés dans un tableau) pour les afficher
  // NOTE: Si le tableau des messages change (nouveau message...) alors le composant va re-render car le retour de useSelector est considéré comme un state REACT (useState)
  const { messagesList } = useSelector((store: RootState) => {
    // --- Dans le but d'avoir le dernier message reçu toujours affiché, on récupère le tableau des messages renversé, et dans le css on retourne l'alignement des messages avec flex-direction: column-reverse
    return store.messages;
  });

  // --- On récupère l'utilisateur connecté
  const { user } = useSelector((store: RootState) => store.settings);

  useEffect(() => {
    // On empêche le son au démarrage en fermant la fonction prématurément si le tableau est vide (il est vide uniquement lorsque l'on arrivepour la premiere fois sur l'app)
    if (messagesList.length === 0) return;
    if (messagesList[messagesList.length - 1].author === user?.username) return;

  }, [messagesList, user?.username]);

  return (
    <ul id="messages_list">
      {[...messagesList].reverse().map((messageItem: IMessage, key: number) => (
        <Message
          author={messageItem.author}
          content={messageItem.content}
          color={messageItem.color}
          timestamp={messageItem.timestamp}
          key={messageItem.id}
        />
      ))}
    </ul>
  );
};

export default MessageList;
