class GameHandler {
	queues: Array<Queue> = []

	/*---------------------------------------------------*/
	/** * create a queue and add it to handler instance **/
	/*---------------------------------------------------*/
	public createQueue(game: Game): Partial<Queue> {
		const queue = { game: game.name }

		if (this.getQueue(queue.game))
			console.log(`[SERVER] Queue for ${game.name} already exists`)
		else this.queues.push(queue)

		return this.getQueue(queue.game)
	}

	/*------------------------------*/
	/** * get game queue if exists **/
	/*------------------------------*/
	public getQueue(gameName: string): Queue | boolean {
		const queue = this.queues.filter(queue => queue.game === gameName)
		return queue.length === 1 ? result[0] : false
	}
}

export default Object.freeze(new GameHandler())
