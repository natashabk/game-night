// actions.js
import axios from 'axios';
const API = process.env.REACT_APP_API_BASE

// These are our action types
export const CREATE_ROOM_REQUEST = "CREATE_ROOM_REQUEST"
export const CREATE_ROOM_SUCCESS = "CREATE_ROOM_SUCCESS"
export const CREATE_ROOM_ERROR = "CREATE_ROOM_ERROR"

export const JOIN_ROOM_REQUEST = "JOIN_ROOM_REQUEST"
export const JOIN_ROOM_SUCCESS = "JOIN_ROOM_SUCCESS"
export const JOIN_ROOM_ERROR = "JOIN_ROOM_ERROR"

export const CHECK_ROOM_REQUEST = "CHECK_ROOM_REQUEST"
export const CHECK_ROOM_SUCCESS = "CHECK_ROOM_SUCCESS"
export const CHECK_ROOM_ERROR = "CHECK_ROOM_ERROR"

export const SET_USERNAME = "SET_USERNAME"
export const SET_AVATAR = "SET_AVATAR"

export const UPDATE_CHAT_LOG = "UPDATE_CHAT_LOG"
export const UPDATE_PLAYERS = "UPDATE_PLAYERS"
export const UPDATE_SCORE = "UPDATE_SCORE"
export const UPDATE_GAME = "UPDATE_GAME"

export const RESET_ROOM = "RESET_ROOM"

// Now we define actions
const createRoomRequest = () => ( { type: CREATE_ROOM_REQUEST } )
const createRoomSuccess = ( payload ) => ( { type: CREATE_ROOM_SUCCESS, payload } )
const createRoomError = ( error ) => ( { type: CREATE_ROOM_ERROR, error } )

export function createRoom() {
  return async function ( dispatch ) {
    dispatch( createRoomRequest() );
    try {
      const resp = await axios.get( `${ API }/newRoom` )
      dispatch( createRoomSuccess( resp.data ) );
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
      const resp = await axios.get( `${ API }/room/${ roomId }/${ username }/${ avatar }` )
      dispatch( joinRoomSuccess( resp.data ) );
    } catch ( error ) {
      dispatch( joinRoomError( error ) );
    }
  }
}

const checkRoomRequest = () => ( { type: CHECK_ROOM_REQUEST } )
const checkRoomSuccess = ( payload ) => ( { type: CHECK_ROOM_SUCCESS, payload } )
const checkRoomError = ( error ) => ( { type: CHECK_ROOM_ERROR, error } )

export function checkRoom( roomId ) {
  return async function ( dispatch ) {
    dispatch( checkRoomRequest() );
    try {
      const resp = await axios.get( `${ API }/checkRoom/${ roomId }` )
      if ( resp.data.error ) {
        dispatch( checkRoomError( resp.data.error ) )
      } else dispatch( checkRoomSuccess( resp.data ) )
    } catch ( error ) {
      dispatch( checkRoomError( ( error ) ) );
    }
  }
}

export const setUsername = ( username ) => ( { type: SET_USERNAME, username } )
export const setAvatar = ( avatar ) => ( { type: SET_AVATAR, avatar } )
export const updateChatLog = ( update ) => ( { type: UPDATE_CHAT_LOG, update } )
export const updatePlayers = ( update ) => ( { type: UPDATE_PLAYERS, update } )
export const updateScore = ( update ) => ( { type: UPDATE_SCORE, update } )
export const updateGame = ( update ) => ( { type: UPDATE_GAME, update } )

export const resetRoom = ( update ) => ( { type: RESET_ROOM } )