import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Settings.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import settings from '../../redux/settings';
import { TailSpin } from 'react-loader-spinner';
import { MdOutlineLogout } from 'react-icons/md';

const Settings: FC = () => {
  // --- Interface pour dispatcher des actions dans le store
  const dispatch: AppDispatch = useDispatch();
  // --- On récupère les valeurs du reducer 'Settings'
  const { displayModal, isConnected, isPending, user } = useSelector(
    (store: RootState) => store.settings
  );
  // --- State de contrôle de l'input mail
  const [email, setMail] = useState<string>('');
  // --- State de contrôle de l'input password
  const [password, setPassword] = useState<string>('');

  // --- Fonction pour gérer le changement de l'input mail
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value);
  };

  // --- Fonction pour gérer le changement de l'input password
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // --- Fonction pour gérer l'affichage du dialog
  // Version courte / optimisée
  const handleDialogDisplay = () =>
    displayModal
      ? dispatch({ type: 'settings/HIDE_MODAL' })
      : dispatch({ type: 'settings/DISPLAY_MODAL' });
  // Version classique
  /*
  const handleDialogDisplay = () => {
    if (displayModal) 
      dispatch({ type: 'settings/HIDE_MODAL' });
     else 
      dispatch({ type: 'settings/DISPLAY_MODAL' });
    }
  };
  */

  // --- Fonction pour gérer le submit du formulaire de déconnexion
  const handleDisconnect = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'settings/DISCONNECT' });
  };

  // --- Fonction pour gérer le submit du formulaire de connexion
  const handleConnect = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // --- On dispatch avec la fonction renvoyée par le AsyncThunk, car il ne s'agit pas d'une action classique et rien ne se passe avec la vieille méthode
    dispatch(
      settings.actions.loginAction({
        email,
        password,
      })
    );
  };

  return (
    <dialog
      id="connection_modal"
      open
      className={displayModal ? 'displayed' : ''}
    >
      {isConnected ? (
        <form onSubmit={handleDisconnect}>
          <h3>
            <i>👋 Bienvenue {user?.username}!</i>
          </h3>
          <button
            type="submit"
            style={{
              width: 'fit-content',
              background: user?.color || 'dodgerblue',
            }}
          >
            <MdOutlineLogout /> Déconnexion
          </button>
        </form>
      ) : (
        <form onSubmit={handleConnect}>
          <h3>Connexion</h3>
          <hr />
          <label htmlFor="mail">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="toto@hello-world.com"
            disabled={isPending}
          />
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="*****"
            disabled={isPending}
          />
          <button type="submit" disabled={isPending}>
            {isPending ? (
              <TailSpin
                visible={true}
                height="20"
                width="20"
                color="#fafafa"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              'Soumettre'
            )}
          </button>
        </form>
      )}
      <button onClick={handleDialogDisplay}>
        {displayModal ? <FaChevronLeft /> : <FaChevronRight />}
      </button>
    </dialog>
  );
};

export default Settings;
