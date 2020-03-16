import express from 'express'
import socketIO from 'socket.io'
import { createServer } from 'http'
import { config } from 'dotenv'
config()

import { GameHandlerInstance } from './GameHandler'

const PORT = process.env.PORT
const app = express()
const server = createServer(app)
const io = socketIO(server)

/*----------------------------------*/
/** * listen to socket connections **/
/*----------------------------------*/
io.on('connection', (socket: socketIO.Socket) => {
	console.log('[CLIENT] Connection received :', socket.id)

	/** @send_answer_to_client **/
	io.emit('event::handshake')

	/** @start_game_handler_singleton **/
	const gameHandler = GameHandlerInstance
})

/*--------------------------*/
/** * start express server **/
/*--------------------------*/
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
