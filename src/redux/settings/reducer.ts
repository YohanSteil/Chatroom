import { createReducer } from "@reduxjs/toolkit";
import { SettingsState } from "../../types";
import actions from "./actions";




const initialState: SettingsState = {
    displayModal: false,
    isConnected: false,
    isPending: false
};

const settingsReducer = createReducer(initialState, (builder) => {
    builder 
        .addCase(actions.loginAction.pending, (state, action) => {
            state.isPending = true
        })
        .addCase(actions.loginAction.fulfilled, (state, action) => {
            state.isPending = false;
            state.isConnected = true;
            state.user = {
                username: action.payload.pseudo,
                color: action.payload.color
            }
        })
        .addCase(actions.disconnectAction, (state,action) => {
            state.isConnected = false;
            state.user = undefined;
        })
        .addCase(actions.loginAction.rejected, (state, action) => {
            state.isPending= false;
            console.error('Erreur: Identifiants incorrects lors de la connexion');
        })
        .addCase(actions.displayModalAction, (state, action) => {
            state.displayModal = true;
        })
        .addCase(actions.hideModalAction, (state, action) => {
            state.displayModal = false;
        })
})
export default settingsReducer;