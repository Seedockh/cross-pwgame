import express from 'express'
import socketIO, { Socket } from 'socket.io'
import { createServer } from 'http'
import { config } from 'dotenv'
config()

import { GameHandlerInstance } from './GameHandler'
import { PlayerHandlerInstance } from './PlayerHandler'

/** @get_player_handler_singleton **/
const playerHandler = PlayerHandlerInstance

/** @get_game_handler_singleton **/
const gameHandler = GameHandlerInstance

const PORT = process.env.PORT
const app = express()
const server = createServer(app)
const io = socketIO(server)

/*-------------------------------*/
/** * allow access to root path **/
/*-------------------------------*/
app.get('/', (_, res) => {
	res.send('Welcome on PWA-Games Server !')
})

/*----------------------------------*/
/** * listen to socket connections **/
/*----------------------------------*/

io.on('connection', (socket: Socket) => {
	console.log('[CLIENT] Connection received :', socket.id)

	/** @send_answer_to_client **/
	socket.emit('handshake')

	socket.on('player::new', (param: unknown) => {
		console.log('New player')
		console.log(param)
	})
})

/*--------------------------*/
/** * start express server **/
/*--------------------------*/
server.listen(PORT, () => console.log(`[SERVER] Running on port : ${PORT}`))
