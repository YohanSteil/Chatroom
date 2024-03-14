import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import './Form.scss';
import store, { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../sockets/chat';

// --- Composant permettant d'afficher le bouton et l'input
const Form: FC = () => {
  // --- On récupère l'user connecté
  const { user } = useSelector((store: RootState) => store.settings);
  // --- State synchronisé avec l'input text, dans le but de pouvoir accéder à la valeur de ce dernier lors du submit de formulaire (pour créer un nouveau message)
  const [inputValue, setInputValue] = useState<string>('');

  // --- Interface pour exécuter des actions redux
  const dispatch: AppDispatch = useDispatch();

  // --- Fonction qui gère l'évènement submit du formulaire (envoi d'un nouveau message)
  const handleSubmit = (e: FormEvent) => {
    // --- On empêche l'event submit de déclencher un refresh de la page
    e.preventDefault();

    // --- Maintenant, on va faire en sorte de déclencher l'action 'messages/NEW_MESSAGE' pour créer un nouveau message
    sendMessage({
      author: user?.username || 'Yohan',
      content: inputValue,
      color: user?.color || 'dodgerblue',
    })

    // --- On vide l'input une fois le message envoyé
    setInputValue('');
  };

  // --- Fonction qui gère le changement de valeur de l'input et modifie le state en conséquence
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <form id="message_input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Saisissez votre message..."
        value={inputValue}
        onChange={handleChange}
      />
      <button type="submit" style={{ background: user?.color || 'dodgerblue' }}>
        <IoMdSend />
      </button>
    </form>
  );
};

export default Form;
