import actions from './actions';
import messagesReducer from './reducer';

// --- Ce fichier sert uniquement a fournir un objet avec tout ce qui est en rapport avec le reducer 'messages' (servant à la gestion des messages)
// Pour permetre un accès plus facile aux actions & reducer
// Cette manière de faire, bien que répandue, n'est pas nécessaire pour autant
export default {
  actions,
  reducer: messagesReducer,
};
