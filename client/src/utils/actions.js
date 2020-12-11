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
export const SEND_MESSAGE_REQUEST = "SEND_MESSAGE_REQUEST"
export const UPDATE_CHAT_LOG = "UPDATE_CHAT_LOG"

// Now we define actions
const createRoomRequest = () => ( { type: CREATE_ROOM_REQUEST } )
const createRoomSuccess = ( payload ) => ( { type: CREATE_ROOM_SUCCESS, payload } )
const createRoomError = ( error ) => ( { type: CREATE_ROOM_ERROR, error } )

export function createRoom( roomName ) {
  return async function ( dispatch ) {
    dispatch( createRoomRequest() );
    try {
      const response = await axios.get( `${ API_BASE }/room?name=${ roomName }` )
      dispatch( createRoomSuccess( response.data ) );
    } catch ( error ) {
      dispatch( createRoomError( error ) );
    }
  }
}

const joinRoomRequest = () => ( { type: JOIN_ROOM_REQUEST } )
const joinRoomSuccess = ( payload ) => ( { type: JOIN_ROOM_SUCCESS, payload } )
const joinRoomError = ( error ) => ( { type: JOIN_ROOM_ERROR, error } )

export function joinRoom( roomId ) {
  return async function ( dispatch ) {
    dispatch( joinRoomRequest() );
    try {
      const response = await axios.get( `${ API_BASE }/room/${ roomId }` )
      dispatch( joinRoomSuccess( response.data ) );
    } catch ( error ) {
      dispatch( joinRoomError( error ) );
    }
  }
}

export const setUsername = ( username ) => ( { type: SET_USERNAME, username } )
export const updateChatLog = ( update ) => ( { type: UPDATE_CHAT_LOG, update } )
