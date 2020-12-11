var express = require( 'express' );
var app = express();
// var expressWs = require('express-ws')(app);
var http = require( 'http' ).createServer( app );
var io = require( 'socket.io' )( http );

const cors = require( 'cors' );
var uuidv4 = require( 'uuid' ).v4;

let rooms = {};
let chatLogs = {};
let players = {};

app.use( cors() );

//creating a room
app.get( '/newRoom/:roomName/:username/:avatar', function ( req, res, next ) {
  const player = { username: req.params.username, avatar: req.params.avatar }
  const room = {
    name: req.query.name,
    id: uuidv4(),
    players: [ player ]
  };
  rooms[ room.id ] = room;
  chatLogs[ room.id ] = [];
  players[ room.id ] = [ player ]
  res.json( room );
} );

//joining a room
app.get( '/room/:roomId/:username/:avatar', function ( req, res, next ) {
  const player = { username: req.params.username, avatar: req.params.avatar }
  const roomId = req.params.roomId;
  const newPlayers = [ ...players[ roomId ], player ]
  players[ roomId ] = newPlayers
  console.log( 'from roomjoin:', chatLogs )
  const response = {
    room: {
      name: rooms[ roomId ].name,
      id: rooms[ roomId ].id
    },
    chats: chatLogs[ roomId ],
    players: newPlayers
  };
  res.json( response );
} );

// io.on( 'connection', function ( socket ) {
//   socket.on( 'event://add-player', function ( player ) {
//     const payload = JSON.parse( player );

//     if ( chatLogs[ payload.roomID ] ) {
//       chatLogs[ msg.roomID ].push( payload.data );
//     }

//     socket.broadcast.emit( 'event://get-player', player );
//   } )
// } );

io.on( 'connection', function ( socket ) {
  socket.on( 'event://send-message', function ( msg ) {
    console.log( 'from socket:', chatLogs )
    const payload = JSON.parse( msg );
    if ( chatLogs[ payload.roomId ] ) {
      chatLogs[ payload.roomId ] = [ ...chatLogs[ payload.roomId ], payload.data ];
    }
    socket.broadcast.emit( 'event://get-message', msg );
  } )
} );

http.listen( 5000, function () {
  console.log( 'listening on *:5000' );
} );