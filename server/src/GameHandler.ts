export default class GameHandler {
	queues: Array<Queue>

	/*---------------------------------------------------*/
	/** * create a queue and add it to handler instance **/
	/*---------------------------------------------------*/
	public createQueue(game: Game): Partial<Queue> {
		const queue = { game: game.name }

		if (this.getQueue(queue.game))
			console.log(`[SERVER] Queue created for : ${game.name}`)
		else this.queues.push(queue)

		return this.getQueue(queue.game)
	}

	/*------------------------------*/
	/** * get game queue if exists **/
	/*------------------------------*/
	public getQueue(gameName: string): Queue | boolean {
		return this.queues.filter(queue => queue.game === gameName).length === 1
			? result[0]
			: false
	}
}
