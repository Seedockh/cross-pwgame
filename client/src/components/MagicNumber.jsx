import React, { useEffect, useState } from "react"
import { useStateValue } from "../hooks/state"
import useInput from "../hooks/useInput"

const MagicNumber = () => {
	const [playersInQueue, setPlayersInQueue] = useState(0)
	const [mysteriousNumber, setMysteriousNumber] = useState(null)
	const [{ io, currentPlayer }, dispatch] = useStateValue()
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

	/*--------------------------------------------*/
	/** * add currentPlayer to magicnumber queue **/
	/*--------------------------------------------*/
	useEffect(() => {
		if (currentPlayer.currentGame) {
			io.emit('game::queue-magicnumber', currentPlayer)
		}
	}, [currentPlayer])

	/*----------------------------*/
	/** * receive queued players **/
	/*----------------------------*/
	io.on('game::players-magicnumber', players => {
		setPlayersInQueue(players)
	})

	/*-----------------------------*/
	/** * receive gameFull signal **/
	/*-----------------------------*/
	io.on('game::ready-magicnumber', players => {
		setMysteriousNumber(Math.floor(Math.random()*Math.floor(10)))
	})

	/*---------------*/
	/** * rendering **/
	/*---------------*/
  return (
    <div className="section">
		{playersInQueue.length < 2 &&
			<div className="content">
				<progress className="progress" value={playersInQueue.length*100/2} max="100">
				</progress>
				<p className="has-text-centered">{playersInQueue.length}/2 player(s) in queue</p>
			</div>
		}
		{playersInQueue.length >= 2 &&
			<div className="content">
				<div className="control">
					<input className="input is-block is-large is-one-quarter" placeholder="Find a number betweem 0 and 10 ..." {...magicNumber}/>
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
