import React, { useState } from "react"

const AskNickname = ({ io }) => {
	const [nickname, setNickname] = useState("")
	const [playerOne, setPlayerOne] = useState(null)
	const [playerTwo, setPlayerTwo] = useState(null)

	const handleNickname = event => {
		setNickname(event.target.value)
	}

	const sendPlayerOne = () => {
		console.log("Setting player 1 !")
		setPlayerOne({ name: nickname })
		io.emit("event::initialize", { nickname })
	}

	const sendPlayerTwo = () => {
		console.log("Setting player 2 !")
		setPlayerTwo({ name: nickname })
		io.emit("event::initialize", { nickname })
	}

	return (
		<div className="field">
			<div className="control">
				<input className="input" placeholder="Enter your nickname" onChange={handleNickname} value={nickname} />
			</div>
			<div className="control">
				{ !playerOne && !playerTwo &&
					<a className="button is-info" onClick={sendPlayerOne}>Send</a> }
				{ (!playerOne && playerTwo) || (!playerOne && playerTwo) &&
					<a className="button is-info" onClick={sendPlayerTwo}>Send</a> }
				{ playerOne && !playerTwo && <a className="button is-info is-loading">Send</a>
				}
			</div>
		</div>
	);
};

export default AskNickname;
