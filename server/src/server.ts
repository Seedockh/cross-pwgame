import express from "express"
import socketIO from "socket.io"
import { createServer } from "http"
import { config } from "dotenv"

config()

const PORT = process.env.PORT

const app = express()
const server = createServer(app)
const io = socketIO(server)
let players: Array<any> = []

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
		console.log("new name received: ", payload.nickname)
		players.push(payload)

		if (players.length >= 2) return socket.emit("event::gameFull")
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
	console.log("Server ready at ...")
})
