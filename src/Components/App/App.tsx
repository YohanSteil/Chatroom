import { FC, useEffect } from 'react';
import './App.scss';
import Form from '../Form/Form';
import MessageList from '../MessageList/MessageList';
import Settings from '../Settings/Settings';
import { listenToMessages, unlistenToMessage } from '../../sockets/chat';

const App: FC = () => {
  // useEffect avec tableau vide permet d'exécuter du code lors de l'ouverture du composant (ici carrément l'application puisque App est le composant racine)
  useEffect(() => {
    // --- On ouvre le canal d'écoute qui permettra de recevoir des messages
    listenToMessages();

    // NOTE:
    // Lorsque l'on retourne une fonction dans un useEffect avec tableau, on donne une fonction qui s'exécutera lorsque notre composant sera détruit
    return () => {
      unlistenToMessage();
    };
  }, []);
  return (
    <>
    <h1 className='app_title'>MESSAGERIE</h1>
    <div className="app">
      <Settings/>
      <MessageList />
      <Form />
    </div>
    </>
  );
};

export default App;
