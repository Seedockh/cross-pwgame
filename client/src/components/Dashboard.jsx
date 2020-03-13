import React, { useState } from "react"
import socketIO from "socket.io-client"
import AskNickname from "./AskNickname"
import MagicNumber from "./MagicNumber"

const Dashboard = () => {
	const [isGameStarted, setGameStarted] = useState(false)
	const [players, setPlayers] = useState([])
	const io = socketIO("http://localhost:3000")

  const startMagicNumber = () => alert('Magic Number')
  const startQuickWord = () => alert('Quick Word')
  const startWordAndFurious = () => alert('Word & Furious')

	io.on("event::hello", () => {
		console.log("handshake")
	});

	io.on("event::gameStarted", () => {
		console.log("game started")
		setGameStarted(true)
	});

	io.on("event::getPlayers", players => {
		console.log(players)
		setPlayers(players)
	})

	const closeConnection = () => {
		io.emit("event::closeConnection")
	}

	return (
		<div id="dashboard">
			<h3 className="title is-3">Chose a game</h3>
      <ul className="gamesList">
        <li className="title is-4"><button className="button is-large is-fullwidth" onClick={startMagicNumber}>MagicNumber</button></li>
        <li className="title is-4"><button className="button is-large is-fullwidth" onClick={startQuickWord}>QuickWord</button></li>
        <li className="title is-4"><button className="button is-large is-fullwidth" onClick={startWordAndFurious}>WordAndFurious</button></li>
      </ul>
		</div>
	);
};

export default Dashboard;
