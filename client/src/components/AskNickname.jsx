import React, { useEffect } from "react"
import socketIO from "socket.io-client"
import useInput from '../hooks/useInput'
import { useStateValue } from '../hooks/state'

const AskNickname = ({ io, game }) => {
	const nickname = useInput('')
	const [{ playerOne, playerTwo, players }, dispatch] = useStateValue()

	useEffect(() => {
		if (playerOne && playerTwo)
			dispatch({type: 'setPlayers', players: {
				playerOne: playerOne,
				playerTwo: playerTwo
			}})
	}, [playerOne, playerTwo])

	const sendPlayerOne = () => {
		console.log(`Setting player 1 : ${nickname.value}!`)
		dispatch({type: 'setPlayerOne', name: nickname.value})
		io.emit("event::init" + game, nickname)
	}

	const sendPlayerTwo = () => {
		console.log("Setting player 2 !")
		dispatch({type: 'setPlayerTwo', name: nickname.value})
		io.emit("event::init" + game, nickname.value)
	}

	return (
		<div className="field">
			<div className="control" style={{marginBottom: '1em'}}>
				<input className="input is-block is-large is-fullwidth" placeholder="Enter your nickname" {...nickname}/>
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
