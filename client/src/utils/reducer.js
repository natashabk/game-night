import {
  CREATE_ROOM_SUCCESS,
  JOIN_ROOM_SUCCESS,
  CHECK_ROOM_SUCCESS,
  CHECK_ROOM_ERROR,
  SET_USERNAME,
  SET_AVATAR,
  UPDATE_CHAT_LOG,
  UPDATE_PLAYERS,
  UPDATE_SCORE,
  RESET_ROOM
} from './actions';

const initialState = {
  room: null,
  chatLog: [],
  username: null,
  avatar: null,
  error: null
}

//for dev
const devState = {
  room: {
    id: '4_2AhXc',
    name: 'Kaczmarczyk Party',
    players: [
      {
        username: 'deg',
        avatar: 'dog',
        score: 5
      },
      {
        username: 'STATIC NOISE',
        avatar: 'tv',
        score: 18
      },
      {
        username: 'muthie',
        avatar: 'moth',
        score: 0
      },
      {
        username: 'xenon',
        avatar: 'alien',
        score: 10
      },
    ]
  },
  chatLog: [],
  username: 'muthie',
  avatar: 'moth',
  error: null
}

export default function chatReducer( state, action ) {
  if ( typeof state === 'undefined' ) {
    return devState
  }

  switch ( action.type ) {
    case CREATE_ROOM_SUCCESS:
      state.room = action.payload.room;
      state.chatLog = action.payload.chats;
      state.error = null;
      break;

    case JOIN_ROOM_SUCCESS:
      state.room = action.payload.room;
      state.chatLog = action.payload.chats;
      state.error = null;
      break;

    case CHECK_ROOM_SUCCESS:
      state.room = action.payload.room;
      state.error = null;
      break;

    case CHECK_ROOM_ERROR:
      state.error = action;
      break;

    case RESET_ROOM:
      state.room = null;
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

    case UPDATE_SCORE:
      if ( state.room !== null && action.update.roomId === state.room.id ) {
        const updatedPlayer = {
          ...state.room.players[ action.update.playerIdx ],
          score: action.update.score
        }
        let newPlayers = [ ...state.room.players ]
        newPlayers[ action.update.playerIdx ] = updatedPlayer
        state.room.players = newPlayers
      }
      break;

    default:
  }

  return state
}