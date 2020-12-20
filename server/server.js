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
  // id is what other players will be typing in to enter the room so it needs to be easy
  // 0 - O and I - l are difficult to distinguish in the app font
  const id = shortid.generate().slice( 0, 5 ).replace( /0|O|I|l/gi, 'A' )
  console.log( 'im creating this player now in CREATE ROOM: ', player )
  const room = {
    name: req.params.roomName,
    id,
    players: []
  };
  rooms[ room.id ] = room;
  chatLogs[ room.id ] = [];
  res.json( room );
} );

//joining a room
app.get( '/room/:roomId/:username/:avatar', function ( req, res, next ) {
  const player = { username: req.params.username, avatar: req.params.avatar, score: 0 }
  const roomId = req.params.roomId;
  const newPlayers = [ ...rooms[ roomId ].players, player ]
  console.log( 'im creating this player now in JOIN ROOM: ', player )
  const response = {
    room: {
      name: rooms[ roomId ].name,
      id: rooms[ roomId ].id,
      players: newPlayers
    },
    chats: chatLogs[ roomId ]
  };
  res.json( response );
} );

io.on( 'connection', function ( socket ) {
  socket.on( 'event://send-message', function ( msg ) {
    const payload = JSON.parse( msg );
    if ( chatLogs[ payload.roomId ] ) {
      chatLogs[ payload.roomId ] = [ ...chatLogs[ payload.roomId ], payload.data ];
    }
    socket.broadcast.emit( 'event://get-message', msg );
  } )
} );

io.on( 'connection', function ( socket ) {
  socket.on( 'event://add-player', function ( msg ) {
    const payload = JSON.parse( msg );
    const newPlayer = { username: payload.data.username, avatar: payload.data.avatar, score: 0 }
    //update chat log list for this room
    if ( chatLogs[ payload.roomId ] ) {
      chatLogs[ payload.roomId ] = [ ...chatLogs[ payload.roomId ], payload.data ];
    }
    //update player list for this room
    if ( rooms[ payload.roomId ].players ) {
      rooms[ payload.roomId ].players = [ ...rooms[ payload.roomId ].players, newPlayer ]
    }

    console.log( 'im in ADDPLAYER now', rooms[ payload.roomId ].players )
    const response = JSON.stringify( {
      room: rooms[ payload.roomId ],
      data: payload.data
    } )

    socket.broadcast.emit( 'event://get-player', response );
  } )
} );

http.listen( 5000, function () {
  console.log( 'listening on *:5000' );
} );