import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

type LoginActionPayload = {
    email: string;
    password: string;
  };

export const loginAction = createAsyncThunk('settings/LOGIN', async(payload: LoginActionPayload) => {
    const pseudoResponse = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },

        body: JSON.stringify({
            email: payload.email,
            password: payload.password,
        })
    })

    const pseudoResponseParsed = await pseudoResponse.json();
    console.log(pseudoResponseParsed);

    const colorResponse = await fetch(
        `http://localhost:3001/theme/${payload.email}`
      );
  
      // On filtre la requête pour ne garder que le body
      const colorResponseParsed = await colorResponse.json();
  
      // Payload pour l'action fulfilled
      return {
        pseudo: pseudoResponseParsed.pseudo,
        color: colorResponseParsed.color,
      };
    
})

// --- Action pour se déconnecter
export const disconnectAction = createAction('settings/DISCONNECT');

// --- Action pour afficher/cacher le modal de connexion
export const displayModalAction = createAction('settings/DISPLAY_MODAL');
export const hideModalAction = createAction('settings/HIDE_MODAL');

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    loginAction,
    disconnectAction,
    displayModalAction,
    hideModalAction,
  };
  