// reducers.js

import {
  CREATE_ROOM_SUCCESS,
  JOIN_ROOM_SUCCESS,
  SET_USERNAME,
  SET_AVATAR,
  UPDATE_CHAT_LOG
} from './actions';

const initialState = {
  room: null,
  chatLog: [],
  username: null,
  avatar: null,
  players: []
}

export default function chatReducer( state, action ) {
  if ( typeof state === 'undefined' ) {
    return initialState
  }

  switch ( action.type ) {
    case CREATE_ROOM_SUCCESS:
      state.room = action.payload;
      break;

    case JOIN_ROOM_SUCCESS:
      state.room = action.payload.room;
      state.players = action.payload.players;
      break;

    case SET_USERNAME:
      state.username = action.username;
      break;

    case SET_AVATAR:
      state.avatar = action.avatar;
      break;

    case UPDATE_CHAT_LOG:
      if ( state.room !== null && action.update.roomId === state.room.id ) {
        state.chatLog = [ ...state.chatLog, action.update.data ];
      }
      break;
    default:
  }

  return state
}