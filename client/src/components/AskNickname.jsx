import React, { useState, useEffect } from 'react'
import useInput from '../hooks/useInput'
import { useStateValue } from '../hooks/state'
import Dashboard from './Dashboard'

const AskNickname = () => {
	const nickname = useInput('')
	const [isServerConnected, setIsServerConnected] = useState(false)
	const [isPlayerCreated, setIsPlayerCreated] = useState(false)
	const [{ io, totalPlayers, currentPlayer }, dispatch] = useStateValue()

	/*---------------------------------------*/
	/** * send connection request to server **/
	/*---------------------------------------*/
	useEffect(() => {
		io.emit("connection")

		const storedPlayer = localStorage.getItem('player')
		if (storedPlayer) {
			dispatch({
				type: 'setCurrentPlayer',
				currentPlayer: JSON.parse(storedPlayer)
			})
			setIsPlayerCreated(true)
		}
	}, [])

	/*--------------------------------*/
	/** * receive answer from server **/
	/*--------------------------------*/
	useEffect(() => {
		io.on('handshake', () => {
			setIsServerConnected(true)
			console.log('Connected to the server !')
		})
	}, [io])

	/*---------------------------------*/
	/** * send a new player to server **/
	/*---------------------------------*/
	const sendPlayer = () => {
		io.emit('player::new', {
			nickname: nickname.value,
			socket: io.id
		})
	}

	/*----------------------------------------*/
	/** *   listen server to confirm player  **/
	/*																				*/
	/** @TODO_Handle_error_if_player_is_false */
	/*----------------------------------------*/
	io.on('player::created', player => {
		if (player) {
			setIsPlayerCreated(true)
			dispatch({
				type: 'setCurrentPlayer',
				currentPlayer: player
			})
			localStorage.setItem('player', JSON.stringify(player))
		}
	})

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
					{isPlayerCreated && currentPlayer &&
						<Dashboard />
					}
					{!currentPlayer &&
						<>
							<div className="control" style={{marginBottom: '1em'}}>
								<input className="input is-block is-large is-fullwidth" placeholder="Enter your nickname" {...nickname}/>
							</div>
							<div className="control" style={{marginBottom: '1em'}}>
								<a className="button is-large is-fullwidth is-info" onClick={sendPlayer}>
									Send
								</a>
							</div>
						</>
					}
					{currentPlayer &&
						<div className="section">
							<div className="box has-text-centered has-text-info">
								{totalPlayers > 0 &&
									<p className="title is-4">{totalPlayers} player(s) on server</p>
								}
								<p className="has-text-weight-semibold">
									ID : {currentPlayer.socket}
								</p>
								<p className="has-text-weight-semibold">
									nickname : {currentPlayer.nickname}
								</p>
								<p className="has-text-weight-semibold">
									{currentPlayer.game !== undefined ?
										`playing:  ${currentPlayer.game}` : ''}
								</p>
							</div>
						</div>
					}
				</>
			}
		</div>
	);
};

export default AskNickname;
