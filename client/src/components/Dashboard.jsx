import React, { useState, useEffect } from "react"
import { useStateValue } from "../hooks/state"
import AskNickname from "./AskNickname"
import MagicNumber from "./MagicNumber"

const Dashboard = () => {
	const [isGameSelected, setGameSelected] = useState(false)
	const [selectedGame, setSelectedGame] = useState(null)
	const [{ io, totalPlayers, currentPlayer }, dispatch] = useStateValue()

	/*-------------------------------------*/
	/** * get the total players on server **/
	/*-------------------------------------*/
	io.on('players::count', total => {
		console.log('new total of players received !')
		dispatch({ type: 'setTotalPlayers',	totalPlayers: total })
	})

	/*-------------------------------*/
	/** * launch game : MagicNumber **/
	/*-------------------------------*/
  const startMagicNumber = () => {
		setGameSelected(true)
		setSelectedGame(<MagicNumber io={io}/>)

		/** @queue_for_magic_number **/
		io.emit('game::queue-magicnumber', currentPlayer)
	}

	/*-----------------------------*/
	/** * launch game : QuickWord **/
	/*-----------------------------*/
  const startQuickWord = () => alert('Quick Word')

	/*------------------------------------*/
	/** * launch game : Word and Furious **/
	/*------------------------------------*/
  const startWordAndFurious = () => alert('Word & Furious')

	/*------------------------------*/
	/** * logout from localStorage **/
	/*------------------------------*/
	const logout = () => {
		localStorage.removeItem('player')
		dispatch({ type: 'setCurrentPlayer', currentPlayer: null })
	}

	/*---------------------*/
	/** * ragequit button **/
	/*---------------------*/
	const resetGames = () => {
		setGameSelected(false)
		setSelectedGame(null)
		io.emit('game::quit-queue', currentPlayer)
	}

	return (
		<div id="dashboard">
			{isGameSelected &&
				<>
					{selectedGame}
					<button className="button is-large is-fullwidth is-danger" onClick={resetGames}>Quit</button>
				</>
			}
			{! isGameSelected &&
				<>
					<h3 className="title is-3">Choose a game</h3>
					<ul className="gamesList">
						<li className="title is-4">
							<button
								className="button is-large is-fullwidth"
								onClick={startMagicNumber}>
								MagicNumber
							</button>
						</li>
						<li className="title is-4">
							<button
								className="button is-large is-fullwidth"
								onClick={startQuickWord}>
								QuickWord
							</button>
						</li>
						<li className="title is-4">
							<button
								className="button is-large is-fullwidth"
								onClick={startWordAndFurious}>
								WordAndFurious
							</button>
						</li>
						<a className="button is-large is-fullwidth is-danger" onClick={logout}>
							Logout
						</a>
					</ul>
				</>
			}
		</div>
	)
}

export default Dashboard;
