// actions.js
import axios from 'axios';
import { API_BASE } from './config';

// These are our action types
export const CREATE_ROOM_REQUEST = "CREATE_ROOM_REQUEST"
export const CREATE_ROOM_SUCCESS = "CREATE_ROOM_SUCCESS"
export const CREATE_ROOM_ERROR = "CREATE_ROOM_ERROR"
export const JOIN_ROOM_REQUEST = "JOIN_ROOM_REQUEST"
export const JOIN_ROOM_SUCCESS = "JOIN_ROOM_SUCCESS"
export const JOIN_ROOM_ERROR = "JOIN_ROOM_ERROR"
export const SET_USERNAME = "SET_USERNAME"
export const SET_AVATAR = "SET_AVATAR"
export const UPDATE_CHAT_LOG = "UPDATE_CHAT_LOG"
export const UPDATE_PLAYERS = "UPDATE_PLAYERS"
export const UPDATE_SCORE = "UPDATE_SCORE"


// Now we define actions
const createRoomRequest = () => ( { type: CREATE_ROOM_REQUEST } )
const createRoomSuccess = ( payload ) => ( { type: CREATE_ROOM_SUCCESS, payload } )
const createRoomError = ( error ) => ( { type: CREATE_ROOM_ERROR, error } )

export function createRoom( roomName, username, avatar ) {

  return async function ( dispatch ) {
    dispatch( createRoomRequest() );
    try {
      const resp = await axios.get( `${ API_BASE }/newRoom/${ roomName }/${ username }/${ avatar }` )
      dispatch( createRoomSuccess( resp.data ) );
      resp.data.chats.forEach( msg =>
        dispatch( updateChatLog( { room: resp.data.room, data: msg } ) )
      )
    } catch ( error ) {
      dispatch( createRoomError( error ) );
    }
  }
}

const joinRoomRequest = () => ( { type: JOIN_ROOM_REQUEST } )
const joinRoomSuccess = ( payload ) => ( { type: JOIN_ROOM_SUCCESS, payload } )
const joinRoomError = ( error ) => ( { type: JOIN_ROOM_ERROR, error } )

export function joinRoom( roomId, username, avatar ) {
  return async function ( dispatch ) {
    dispatch( joinRoomRequest() );
    try {
      const resp = await axios.get( `${ API_BASE }/room/${ roomId }/${ username }/${ avatar }` )
      dispatch( joinRoomSuccess( resp.data ) );
      resp.data.chats.forEach( msg =>
        dispatch( updateChatLog( { room: resp.data.room, data: msg } ) )
      )
    } catch ( error ) {
      dispatch( joinRoomError( error ) );
    }
  }
}

export const setUsername = ( username ) => ( { type: SET_USERNAME, username } )
export const setAvatar = ( avatar ) => ( { type: SET_AVATAR, avatar } )
export const updateChatLog = ( update ) => ( { type: UPDATE_CHAT_LOG, update } )
export const updatePlayers = ( update ) => ( { type: UPDATE_PLAYERS, update } )
export const updateScore = ( update ) => ( { type: UPDATE_SCORE, update } )
