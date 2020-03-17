class PlayerHandler {
	players: Array<Player> = []

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
		const player = this.players.filter(player => player.socket === id)
		return player.length === 1 ? player[0] : false
	}
}

export default Object.freeze(new PlayerHandler())
