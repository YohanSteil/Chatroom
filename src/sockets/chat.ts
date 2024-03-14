import store from '../redux/store';
import { IMessage } from '../types';
import socket from './index';

/**
 * Fonction qui allume un canal nommé 'send_message' et stocke les messages reçus dans le store redux
 */
export const listenToMessages = (): void => {
  // socket est le serveur socket ouvert dans le fichier index.ts
  // Quand on appelle socket.on, on se place en position d'écoute du canal choisi (ici: send_message), si jamais quelque chose est reçu par ce canal, alors la fonction associée est déclenchée, permettant d'avoir accès à la donnée transmise via le paramètre (ici: message)
  socket.on('send_message', (message) => {
    // Lorque un message est reçu sur ce canal, cela signifie que un client a envoyé un message, il faut donc lire ce qui a été reçu et l'afficher via notre interface redux déjà prête (ici: action 'message/NEW_MESSAGE')
    store.dispatch({ type: 'messages/NEW_MESSAGE', payload: message });
  });
};

/**
 * @param message Message à transmettre sur le canal (author, content)
 * Fonction qui permet de transmettre un message sur le canal 'send_message'
 */
export const sendMessage = (message: IMessage): void => {
  // socket est le serveur socket ouvert dans le fichier index.ts
  // quand on appelle socket.emit, on emet sur le canal choisi (ici: send_message) en précisant une potentielle donnée (ici: message)
  socket.emit('send_message', message);
};

/**
 * Fonction qui ferme le canal d'écoute des messages
 */
export const unlistenToMessage = (): void => {
  socket.off('send_message');
};

export default {
  listenToMessages,
  unlistenToMessage,
  sendMessage,
};
