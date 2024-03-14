import { createReducer } from "@reduxjs/toolkit";
import { MessagesState } from "../../types";
import { newMessageAction } from "./actions";

const initialState: MessagesState = {
    messagesList: [],
}

const messagesReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(newMessageAction, (state, action) => {
            const messagesCopy = [...state.messagesList]

            messagesCopy.push({
                author: action.payload.author,
                content: action.payload.content,
                id: action.payload.id,
                color: action.payload.color
            })
            state.messagesList = messagesCopy;
        })
})

export default messagesReducer;