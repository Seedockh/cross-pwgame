import React, { useState, useEffect } from "react"
import { useStateValue } from "../hooks/state"
import AskNickname from "./AskNickname"
import MagicNumber from "./MagicNumber"

const Dashboard = () => {
	const [isGameSelected, setGameSelected] = useState(false)
	const [selectedGame, setSelectedGame] = useState(null)
	const [{ io, totalPlayers, currentPlayer }, dispatch] = useStateValue()

	io.on('players::count', total => {
		dispatch({ type: 'setTotalPlayers',	totalPlayers: total })
	})

  const startMagicNumber = () => {
		setGameSelected(true)
		setSelectedGame(<MagicNumber io={io}/>)
	}

  const startQuickWord = () => alert('Quick Word')
  const startWordAndFurious = () => alert('Word & Furious')

	const logout = () => {
		localStorage.removeItem('player')
		console.log(currentPlayer)
		dispatch({ type: 'setCurrentPlayer', currentPlayer: undefined })
		console.log(currentPlayer)
		setGameSelected(false)
		setSelectedGame(null)
	}

	return (
		<div id="dashboard">
			{isGameSelected &&
				<>
					{selectedGame}
					<button className="button is-large is-fullwidth" onClick={resetGames}>Back</button>
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
