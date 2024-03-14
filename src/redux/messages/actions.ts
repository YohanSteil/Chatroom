import { createAction } from "@reduxjs/toolkit";
import { IMessage } from "../../types";

export const newMessageAction = createAction<IMessage>('messages/NEW_MESSAGE');

export default {
    newMessageAction,
}