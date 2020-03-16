import React, { useState } from "react"
import { StateProvider } from './hooks/state'
import socketIO from "socket.io-client"
import Dashboard from "./components/Dashboard"

const App = () => {
	const initialState = {
		io: socketIO("http://localhost:3000"),
		playerOne: null,
		playerTwo: null,
		players: [],
		playersReady: false,
		isPlayerWaiting: false,
	}

	const reducer = (state, action) => {
		switch (action.type) {
			case 'setPlayerOne': return ({ ...state, playerOne: action.playerOne })
			case 'setPlayerTwo': return ({ ...state, playerTwo: action.playerTwo })
			case 'setPlayers': return ({ ...state, players: action.players })
			case 'setPlayersReady': return ({ ...state, ready: action.ready })
			case 'setIsPlayerWaiting': return ({ ...state, isWaiting: action.isWaiting })
		}
	}

	return (
		<StateProvider initialState={initialState} reducer={reducer}>
			<section className="hero is-fullheight is-light">
				<div className="hero-head">
					<div className="container">
						<div className="tabs is-centered">
							<ul>
								<li>
									<a>PWA Games</a>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="hero-body">
					<div className="container">
						<header className="bd-index-header">
							<Dashboard />
						</header>
					</div>
				</div>

				<div className="hero-foot">
					<div className="container">
						<div className="tabs is-centered">
							<ul>
								<li>
									<a>Let's Rock!</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
		</StateProvider>
	)
}

export default App
