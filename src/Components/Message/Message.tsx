import { FC } from 'react';
import './Message.scss';
import { IMessage } from '../../types';
import { useSelector } from 'react-redux';
import store, { RootState } from '../../redux/store';

interface IProps extends IMessage {}

// --- Composant permettant d'afficher un message
const Message: FC<IProps> = ({
  author = 'Autheur inconnu',
  content = '',
  color = 'dodgerblue',
  timestamp,
}) =>  {
  // --- On récupère la variable user depuis le reducer 'Settings'
  const { user } = useSelector((store: RootState) => store.settings);

  return (
    <li
      className={`message ${(user && author !== user.username) || (!user && author !== 'Anon') ? 'left-side' : ''}`}
      title={timestamp}
    >
      <h4 className="author">{author}</h4>
      <p
        className="content"
        //On applique la couleur du compte connecté sur le background des messages, si aucun user n'est connecté,
        // alors on va avoir user = undefined qui va déclencher le 'retour' de secour, cad la couleur dodgerblue
        style={{ background: color }}
      >
        {content}
      </p>
    </li>
  );
};

export default Message;
