import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { Card, Row } from 'antd';
import Brand from '../Brand';
import { checkRoom } from '../utils';
import CreateOrJoinRoom from './CreateOrJoinRoom'
import CreateUserName from './CreateUsername'

export const lightWhite = '#ffffff4d'
export const inputStyle = { maxWidth: 355, minWidth: 200 }
export const btnStyle = { height: 40, width: 145 }

const SignIn = () => {
  const [ mode, setMode ] = useState( 'room' )

  const history = useHistory();
  let { roomId } = useParams();

  const room = useSelector( state => state.room );
  const username = useSelector( state => state.username );
  const avatar = useSelector( state => state.avatar );
  const err = useSelector( state => state.error );
  const dispatch = useDispatch();

  useEffect( () => {
    //check for room validity if attempted to enter straight from url
    //if server says room is valid, app state.room will be updated
    if ( roomId && !room && !err ) dispatch( checkRoom( roomId ) )
  }, [ roomId, err, room, dispatch ] )

  useEffect( () => { //room name + id is the first thing to be collected and checked by server
    if ( !room && mode !== 'roomData' ) setMode( 'roomData' )
  }, [ room, mode ] )

  useEffect( () => { //moves from room info collection screen to user info collection screen
    if ( ( room && !username ) || ( room && !avatar ) ) setMode( 'userData' )
  }, [ room, username, avatar ] )

  useEffect( () => { //loads app when all user + room info is collected in server + stored in state
    if ( room && username && avatar ) history.push( `/${ room.id }` )
  } )

  return (
    <>
      <Brand />
      <Row justify={'center'}>
        <Card style={{ width: 550, background: lightWhite }}>
          {mode === 'roomData' ? <CreateOrJoinRoom /> : <CreateUserName />}
        </Card>
      </Row>
    </>
  );
}

export default SignIn;