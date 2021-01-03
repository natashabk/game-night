const bgSpin = ( action ) => {
  const bigCircle = document.querySelector( '.bgCircle' )
  if ( bigCircle ) {
    const clList = bigCircle.classList.toString()
    if ( action === 'start' && !clList.includes( 'keepSpinning' ) ) {
      bigCircle.classList.add( 'keepSpinning' )
    } else if ( action === 'stop' && clList.includes( 'keepSpinning' ) ) {
      bigCircle.classList.remove( 'keepSpinning' )
    } else if ( action === 'once' && !clList.includes( 'spinOnce' ) ) {
      bigCircle.classList.add( 'spinOnce' )
    } else if ( action === 'onceDone' && clList.includes( 'spinOnce' ) ) {
      bigCircle.classList.remove( 'spinOnce' )
    }
  }
}

export { WebSocketContext } from './WebSocket'
export { default as WebSocketProvider } from './WebSocket'
export { default as store } from './store'
export { createRoom, joinRoom, checkRoom, resetRoom, setUsername, setAvatar } from './actions'
export { bgSpin }