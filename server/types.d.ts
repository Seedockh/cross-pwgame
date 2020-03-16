import { Socket } from 'socket.io'

interface Player {
  name: string,
  currentGame: Game|null,
  socket: Socket|null,
}

interface Game {
  name: string,
  maxPlayers: integer,
}
