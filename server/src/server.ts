import express from "express"
import socketIO from "socket.io"
import nodemon from "nodemon"
import killPort from "kill-port"
import { createServer } from "http"
import { config } from "dotenv"

config()

process.on('SIGUSR2', function () {
	console.log('QUITTING NODEMON')
	nodemon.emit('quit')
	process.exit()
	killPort(3000, 'tcp')
		.then('=== PORT 3000 KILLED ===').catch('=== ERROR IN KILLING PORT ====')
  // do some "stuff" then when you're ready (or not):
  nodemon.emit('restart');
})

const PORT = process.env.PORT
const LIMIT_PLAYERS_PER_GAME = 2

const app = express()
const server = createServer(app)
const io = socketIO(server)
let players: Array<Player> = []

app.get("/", (_, res) => {
	res.send("hello fellows")
})

/*====================================*/
/*====== HANDLE CONNECTIONS ==========*/
/*====================================*/
io.on("connection", (socket: socketIO.Socket) => {
	console.log(`[CLIENT]::connection=${socket.id}`)
	socket.emit("event::handshake")

	socket.on("event::initMagicNumber", payload => {
		console.log("new name received: ", payload)
		players.push(payload)

		if (players.length >= LIMIT_PLAYERS_PER_GAME)
			return socket.emit("event::gameFull")

		return socket.emit("event::newPlayer", players)
	})

	socket.on("event::initQuickWord", payload => {
		console.log("[QuickWord] Connection requested")
	})

	socket.on("event::initWordAndFurious", payload => {
		console.log("[WordAndFurious] Connection requested")
	})

	/*====================================*/
	/*======= CLOSE CONNECTIONS ==========*/
	/*====================================*/
	socket.on("close", (socket: socketIO.Socket) => {
		//socket.disconnect()
		players = []
		console.log('connection closed')
	})
})


server.listen(PORT, () => {
	console.log("Server ready at http://localhost:3000/")
})
