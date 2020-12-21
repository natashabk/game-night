var express = require( 'express' );
var app = express();
var http = require( 'http' ).createServer( app );
var io = require( 'socket.io' )( http );
const cors = require( 'cors' );
var shortid = require( 'shortid' )

let rooms = {};
let chatLogs = {};

app.use( cors() );

//creating a room
app.get( '/newRoom/:roomName/:username/:avatar', function ( req, res, next ) {
  const player = { username: req.params.username, avatar: req.params.avatar, score: 0 }
  const newPlayerMsg = { ...player, message: 'has entered the chat' }

  // id is what other players will be typing in to enter the room so it needs to be easy
  // 0 - O and I - l are difficult to distinguish in the app font
  const id = shortid.generate().slice( 0, 7 ).replace( /0|O|I|l/gi, 'A' )

  const room = { name: req.params.roomName, id, players: [ player ] }
  rooms[ id ] = room;
  chatLogs[ id ] = [ newPlayerMsg ];

  res.json( { room, chats: [ newPlayerMsg ] } );
} );

//joining a room
app.get( '/room/:roomId/:username/:avatar', function ( req, res, next ) {
  const player = { username: req.params.username, avatar: req.params.avatar, score: 0 }
  const newPlayerMsg = { ...player, message: 'has entered the chat' }

  const roomId = req.params.roomId;

  rooms[ roomId ] = { ...rooms[ roomId ], players: [ ...rooms[ roomId ].players, player ] }
  chatLogs[ roomId ] = [ ...chatLogs[ roomId ], newPlayerMsg ]

  res.json( { room: rooms[ roomId ], chats: chatLogs[ roomId ] } );
} );

//websockets that will alert the whole group of events immediately
io.on( 'connection', function ( socket ) {
  socket.on( 'event://send-message', function ( msg ) {
    const payload = JSON.parse( msg );
    if ( chatLogs[ payload.room.id ] ) {
      chatLogs[ payload.room.id ] = [ ...chatLogs[ payload.room.id ], payload.data ];
    }
    const response = JSON.stringify( {
      room: rooms[ payload.room.id ],
      chats: chatLogs[ payload.room.id ]
    } )
    socket.broadcast.emit( 'event://get-message', response );
  } )
} );

io.on( 'connection', function ( socket ) {
  socket.on( 'event://add-player', function ( msg ) {
    const payload = JSON.parse( msg );
    const response = JSON.stringify( {
      room: rooms[ payload.room.id ],
      chats: chatLogs[ payload.room.id ]
    } )
    socket.broadcast.emit( 'event://get-player', response );
  } )
} );

io.on( 'connection', function ( socket ) {
  socket.on( 'event://update-score', function ( msg ) {
    const payload = JSON.parse( msg );
    rooms[ payload.roomId ].players[ payload.playerIdx ].score = payload.score
    const response = JSON.stringify( payload )
    socket.broadcast.emit( 'event://get-score', response );
  } )
} );

http.listen( 5000, function () {
  console.log( 'listening on *:5000' );
} );