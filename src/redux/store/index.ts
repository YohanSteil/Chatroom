import { configureStore } from '@reduxjs/toolkit';
import messages from '../messages';
import settings from '../settings';

const store = configureStore({
  reducer: {
    messages: messages.reducer,
    settings: settings.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
