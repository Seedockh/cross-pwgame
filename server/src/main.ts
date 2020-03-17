import express from 'express'
import socketIO, { Socket } from 'socket.io'
import chalk from 'chalk'
import { createServer } from 'http'
import { config } from 'dotenv'
config()

import GameHandlerInstance from './GameHandler'
import PlayerHandlerInstance from './PlayerHandler'

/** @get_player_handler_singleton **/
const playerHandler = PlayerHandlerInstance

/** @get_game_handler_singleton **/
const gameHandler = GameHandlerInstance

const logServ = chalk.bold.green
const logCli = chalk.bold.blue
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
	console.log(logCli('[CLIENT] Connection received :', socket.id))

	/** @send_connection_answer_to_client **/
	socket.emit('handshake')

	/*-------------------------*/
	/** * create a new player **/
	/*-------------------------*/
	socket.on('player::new', (player: Partial<Player>) => {
		const newPlayer = playerHandler.createPlayer(player)
		console.log(logServ(`[SERVER] New user created : ${newPlayer.nickname}`))

		/** @send_newly_created_player_to_client **/
		socket.emit('player::created', newPlayer)
		/** @send_total_players_to_client **/
		socket.emit('players::count', playerHandler.players.length)
	})

	/*-------------------------------------*/
	/** * add player to MagicNumber queue **/
	/*-------------------------------------*/
	socket.on('game::queue-magicnumber', (player: Player) => {
		if (player.currentGame === 'Magic Number') {
			const enqueuing = gameHandler.enqueuePlayer(player, 'Magic Number')

			if (
				enqueuing.players.length >=
				gameHandler.getGame(enqueuing.game).maxPlayers
			) {
				socket.emit('game::ready-magicnumber', enqueuing)
			}

			socket.emit('game::players-magicnumber', enqueuing.players)
			console.log(logServ(JSON.stringify(enqueuing, null, 2)))
		}
	})

	/*--------------------------------------*/
	/** * send MagicNumber queue to client **/
	/*--------------------------------------*/
	socket.on('game::get-magicnumber-queue', (player: Player) => {
		return player.currentGame
			? socket.emit(
					'game::send-magicnumber-queue',
					gameHandler.getQueue(player.currentGame),
			  )
			: false
	})

	/*------------------------------------------*/
	/** * remove player from MagicNumber queue **/
	/*------------------------------------------*/
	socket.on('game::quit-queue', (player: Player) => {
		if (player.currentGame === 'Magic Number') {
			const dequeue = gameHandler.dequeuePlayer(player)
			console.log(
				logCli(
					`[CLIENT] ${player.nickname} removed from ${dequeue.game} queue`,
				),
			)
			console.log(logServ(JSON.stringify(dequeue, null, 2)))
		}
	})

	/** @send_total_players_to_client **/
	socket.emit('players::count', playerHandler.players.length)
})

/*--------------------------*/
/** * start express server **/
/*--------------------------*/
server.listen(PORT, () =>
	console.log(logServ(`[SERVER] Running on port : ${PORT}`)),
)
