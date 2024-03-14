// --- Interface pour le format de messages
export interface IMessage {
  id?: number;
  color?: string;
  timestamp?: string;
  author: string;
  content: string;
}
  
  // --- Type pour le reducer des messages
  export type MessagesState = {
    messagesList: IMessage[];
  };
  
  // --- Type pour le reducer de settings
export type SettingsState = {
  displayModal: boolean;
  isConnected: boolean;
  isPending: boolean;
  user?: {
    username: string;
    color: string;
  };
};