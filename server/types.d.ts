import { Socket } from 'socket.io'

interface Player {
  nickname: string,
  currentGame: Game | null,
  socket: string | null,
}

interface Game {
  name: string,
  maxPlayers: integer,
}

interface Queue {
  game: string,
  players: Array<Player>,
}
