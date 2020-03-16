import express from 'express'
import socketIO from 'socket.io'
import { createServer } from 'http'
import { config } from 'dotenv'

config()

const PORT = process.env.PORT
const app = express()
const server = createServer(app)
const io = socketIO(server)

app.get('/', (_, res) => res.send('hello fellas'))

io.on('connection', () => io.emit('event::handshake', io.id))

server.listen(PORT, () => console.log(`Server running on port ${PORT} !`))
