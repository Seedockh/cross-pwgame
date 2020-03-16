import React, { useState, useEffect } from "react"
import socketIO from "socket.io-client"
import useInput from '../hooks/useInput'
import { useStateValue } from '../hooks/state'

const AskNickname = () => {
	const nickname = useInput('')
	const [isServerConnected, setIsServerConnected] = useState(false)
	const [{ io, players, isPlayerWaiting }, dispatch] = useStateValue()

	/*---------------------------------------*/
	/** * send connection request to server **/
	/*---------------------------------------*/
	useEffect(() => {
		io.emit("connection")
	}, [])

	/*--------------------------------*/
	/** * receive answer from server **/
	/*--------------------------------*/
	useEffect(() => {
		io.on('event::handshake', () => {
			setIsServerConnected(true)
			console.log('Connected to the server !')
		})
	}, [io])

	/*-------------------------------*/
	/** * send new player to server **/
	/*-------------------------------*/
	const sendPlayer = () => {
		console.log(`New player`)
	}

	/*---------------*/
	/** * rendering **/
	/*---------------*/
	return (
		<div className="field">
			{!isServerConnected &&
				<h2 className="has-text-centered is-size-3 is-large">Connecting to server ...</h2>
			}
			{isServerConnected &&
				<>
					<div className="control" style={{marginBottom: '1em'}}>
						<input className="input is-block is-large is-fullwidth" placeholder="Enter your nickname" {...nickname}/>
					</div>
					<div className="control" style={{marginBottom: '1em'}}>
						{!isPlayerWaiting &&
							<a className="button is-large is-fullwidth is-info" onClick={sendPlayer}>
								Send
							</a>
						}
						{isPlayerWaiting &&
							<a className="button is-large is-fullwidth is-info is-loading">
								Send
							</a>
						}
					</div>
					<div className="section">
						<div className="box has-text-centered has-text-info">
							<h6 className="title is-6">YOUR CONNECTION ID :</h6>
							<p>{io.id}</p>
						</div>
					</div>
				</>
			}
		</div>
	);
};

export default AskNickname;
