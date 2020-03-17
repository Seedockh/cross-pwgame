import React, { useEffect, useState } from "react"
import { useStateValue } from "../hooks/state"
import useInput from "../hooks/useInput"

const MagicNumber = () => {
	const [mysteriousNumber, setMysteriousNumber] = useState(null)
	const [{ io, currentPlayer, magicNumberQueue }, dispatch] = useStateValue()
	const magicNumber = useInput('')

	/*---------------------------------------*/
	/** * define the game for currentPlayer **/
	/*---------------------------------------*/
	useEffect(() => {
		if (!currentPlayer.currentGame) {
			dispatch({
				type: 'setCurrentPlayer',
				currentPlayer: { ...currentPlayer, currentGame: 'Magic Number' }
			})
		}
	}, [])

	io.emit('game::get-magicnumber-queue', currentPlayer)
	io.on('game::send-magicnumber-queue', queuePayload => {
		if (queuePayload !== magicNumberQueue) {
			dispatch({
				type: 'setMagicNumberQueue',
				magicNumberQueue: queuePayload
			})
		}
		console.log(magicNumberQueue)
	})

	/*--------------------------------------------*/
	/** * add currentPlayer to magicnumber queue **/
	/*--------------------------------------------*/
	useEffect(() => {
		if (currentPlayer.currentGame === 'Magic Number') {
			io.emit('game::queue-magicnumber', currentPlayer)
		}
	}, [currentPlayer])

	/*-----------------------------*/
	/** * receive gameFull signal **/
	/*-----------------------------*/
	io.on('game::ready-magicnumber', players => {
		setMysteriousNumber(Math.floor(Math.random()*Math.floor(10)))
		console.log(mysteriousNumber)
	})

	/*---------------*/
	/** * rendering **/
	/*---------------*/
  return (
    <div className="section">
		{magicNumberQueue && magicNumberQueue.players.length < 2 &&
			<div className="content">
				<progress className="progress" value={magicNumberQueue.players.length*100/2} max="100">
				</progress>
				<p className="has-text-centered">{magicNumberQueue.players.length}/2 player(s) in queue</p>
			</div>
		}
		{magicNumberQueue && magicNumberQueue.players.length >= 2 &&
			<div className="content">
				<div className="control">
					<input className="input is-block is-one-quarter" placeholder="Find a number betweem 0 and 10 ..." {...magicNumber}/>
				</div>
				<div className="control">
					<a className="button is-large is-one-quarter is-info">
						Send
					</a>
				</div>
			</div>
		}
    </div>
  )
}

export default MagicNumber
