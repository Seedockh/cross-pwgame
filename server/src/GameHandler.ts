import chalk from 'chalk'
const logServ = chalk.bold.green
const logCli = chalk.bold.blue

class GameHandler {
	queues: Array<Queue> = []
	games: Array<Game> = [
		{ name: 'Magic Number', maxPlayers: 2 },
		{ name: 'Quick Word', maxPlayers: 2 },
		{ name: 'Word And Furious', maxPlayers: 2 },
	]

	/*---------------------------------------------------*/
	/** * create a queue and add it to handler instance **/
	/*---------------------------------------------------*/
	public createQueue(game: Game): Partial<Queue> {
		const queue = { game: game.name, players: [] }

		if (this.getQueue(queue.game))
			console.log(logServ(`[SERVER] Queue for ${game.name} already exists`))
		else this.queues.push(queue)

		return this.getQueue(queue.game)
	}

	/*------------------------------*/
	/** * get game queue if exists **/
	/*------------------------------*/
	public getQueue(gameName: string): Queue | boolean {
		const queue = this.queues.filter(queue => queue.game === gameName)
		return queue.length === 1 ? queue[0] : false
	}

	/*---------------------------------*/
	/** * get specific game if exists **/
	/*---------------------------------*/
	public getGame(name: string): Game | boolean {
		const result = this.games.filter(game => game.name === name)
		return result.length === 1 ? result[0] : false
	}

	/*-----------------------------*/
	/** * put a player in a queue **/
	/*-----------------------------*/
	public enqueuePlayer(player: Player, game: string): Queue {
		if (this.getGame(game)) {
			const handledQueue = this.getQueue(game)
			if (
				handledQueue &&
				!this.checkIfPlayerAlreadyQueued(player.socket, game)
			) {
				handledQueue.players.push(player)
				console.log(
					logCli(`[CLIENT] ${player.nickname} added to ${game} queue`),
				)
				return handledQueue
			} else {
				const newQueue = this.createQueue(game)
				newQueue.game = game
				newQueue.players.push(player)
				console.log(
					logCli(`[CLIENT] ${player.nickname} added to ${game} queue`),
				)
				return newQueue
			}
		}
	}

	/*--------------------------------------*/
	/** * check if player already in queue **/
	/*--------------------------------------*/
	public checkIfPlayerAlreadyQueued(id: string, game: string): boolean {
		return this.getQueue(game)?.players.filter(player => player.socket === id)
			.length >= 1
			? true
			: false
	}

	/*-------------------------------------*/
	/** * dispatch queue players for game **/
	/*-------------------------------------*/
	public dispatchDuo(game: string): void {
		console.log(logServ(`[SERVER] Dispatching players for ${game}`))
	}
}

export default Object.freeze(new GameHandler())
