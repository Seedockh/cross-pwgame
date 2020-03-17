export default class PlayerHandler {
	players: Array<Player>

	/*----------------------------------------------------*/
	/** * create a player and add it to handler instance **/
	/*----------------------------------------------------*/
	createPlayer(player: Partial<Player>): Player {
		if (this.getPlayer(player.socket))
			console.log(`[SERVER] Warning: ${player.nickname} already exists`)
		else this.players.push(player)

		return this.getPlayer(player.socket)
	}

	/*----------------------------------*/
	/** * get player if already exists **/
	/*----------------------------------*/
	getPlayer(id: string): Player | boolean {
		return this.players.filter(player => player.socket.id === id).length === 1
			? result[0]
			: false
	}
}
