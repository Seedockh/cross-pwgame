import React, { useState, useEffect } from "react"
import socketIO from "socket.io-client"

const AskNickname = ({ io, game }) => {
	const [nickname, setNickname] = useState("")
	const [playerOne, setPlayerOne] = useState(null)
	const [playerTwo, setPlayerTwo] = useState(null)
	const [players, setPlayers] = useState({})

	useEffect(() => {
		if (playerOne && playerTwo)
			setPlayers({
				playerOne: playerOne,
				playerTwo: playerTwo
			})
	}, [playerOne, playerTwo])

	const handleNickname = event => {
		setNickname(event.target.value)
	}

	const sendPlayerOne = () => {
		console.log("Setting player 1 !")
		setPlayerOne({ name: nickname })
		io.emit("event::init" + game, { nickname })
	}

	const sendPlayerTwo = () => {
		console.log("Setting player 2 !")
		setPlayerTwo({ name: nickname })
		io.emit("event::init" + game, { nickname })
	}

	return (
		<div className="field">
			<div className="control" style={{marginBottom: '1em'}}>
				<input className="input is-block is-large is-fullwidth" placeholder="Enter your nickname" onChange={handleNickname} value={nickname} />
			</div>
			<div className="control" style={{marginBottom: '1em'}}>
				{ !playerOne && !playerTwo &&
					<a className="button is-large is-fullwidth is-info" onClick={sendPlayerOne}>Send</a> }
				{ (!playerOne && playerTwo) || (!playerOne && playerTwo) &&
					<a className="button is-large is-fullwidth is-info" onClick={sendPlayerTwo}>Send</a> }
				{ playerOne && !playerTwo && <a className="button is-large is-fullwidth is-info is-loading">Send</a>
				}
			</div>
		</div>
	);
};

export default AskNickname;
