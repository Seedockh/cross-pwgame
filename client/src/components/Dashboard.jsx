import React, { useState, useEffect } from "react"
import socketIO from "socket.io-client"
import AskNickname from "./AskNickname"
import MagicNumber from "./MagicNumber"

const Dashboard = () => {
	const [isGameSelected, setGameSelected] = useState(false)
	const [selectedGame, setSelectedGame] = useState(null)
	const io = socketIO("http://localhost:3000")

	useEffect(() => {
		io.emit("connection")
	}, [])

  const startMagicNumber = () => {
		setGameSelected(true)
		setSelectedGame(<MagicNumber io={io}/>)
	}
  const startQuickWord = () => alert('Quick Word')
  const startWordAndFurious = () => alert('Word & Furious')

	const resetGames = () => {
		setGameSelected(false)
		setSelectedGame(null)
		io.emit("close")
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
		      </ul>
				</>
			}
		</div>
	);
};

export default Dashboard;