// reducers.js

import {
  CREATE_ROOM_SUCCESS,
  JOIN_ROOM_SUCCESS,
  SET_USERNAME,
  SET_AVATAR,
  UPDATE_CHAT_LOG,
  UPDATE_PLAYERS,
} from './actions';

const initialState = {
  room: null,
  chatLog: [],
  username: null,
  avatar: null,
}

// for dev
// const initialState = {
//   room: {
//     id: 'pj_vm',
//     players: [
//       {
//         username: 'deg',
//         avatar: 'dog',
//         score: 5
//       },
//       {
//         username: 'tov',
//         avatar: 'tv',
//         score: 18
//       },
//       {
//         username: 'space',
//         avatar: 'alien',
//         score: 7
//       },
//     ]
//   },
//   chatLog: [
//     { username: 'sk8', message: 'has entered the chat' },
//     {
//       username: 'sk8',
//       avatar: 'skateboard',
//       message: '3. When you are ready to start, click on one of the rounds in the left menu. Make sure everyone on the call is starting at the same time!'
//     },
//     { username: 'space', message: 'has entered the chat' },
//     { username: 'space', avatar: 'alien', message: 'cool m8' },
//     { username: 'moth', message: 'has entered the chat' },
//     { username: 'moth', avatar: 'moth', message: 'nice' },
//     { username: 'deg', message: 'has entered the chat' },
//     { username: 'deg', avatar: 'dog', message: 'bark bark' },
//     { username: 'deg', avatar: 'dog', message: 'wooof' },
//     {
//       username: 'deg',
//       avatar: 'dog',
//       message: 'woofwoofwoofwoofwoofwoofwoofwoofwoofwoofwoofwoofwoofwoofwoofwoofwoofwoofwoofwoofwoofwoofwoofwoof'
//     },
//     { username: 'tov', message: 'has entered the chat' },
//     { username: 'tov', avatar: 'tv', message: 'oi oi lads' }, ],
//   username: 'testmoth',
//   avatar: 'moth',

// }

export default function chatReducer( state, action ) {
  if ( typeof state === 'undefined' ) {
    return initialState
  }

  switch ( action.type ) {
    case CREATE_ROOM_SUCCESS:
      state.room = action.payload.room;
      state.chats = action.payload.chats;
      break;

    case JOIN_ROOM_SUCCESS:
      state.room = action.payload.room;
      state.chats = action.payload.chats;
      break;

    case SET_USERNAME:
      state.username = action.username;
      break;

    case SET_AVATAR:
      state.avatar = action.avatar;
      break;

    case UPDATE_PLAYERS:
      state.room.players = action.update.room.players;
      break;

    case UPDATE_CHAT_LOG:
      if ( state.room !== null && action.update.room.id === state.room.id ) {
        if ( action.update.data ) {
          state.chatLog = [ ...state.chatLog, action.update.data ]
        } else state.chatLog = action.update.chats
      }
      break;

    default:
  }

  return state
}