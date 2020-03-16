import React, { useState, useEffect } from "react"
import { StateProvider } from './hooks/state'
import Dashboard from "./components/Dashboard"

const App = () => {
	const initialState = {
		playerOne: null,
		playerTwo: null,
		players: [],
		playersReady: false,
	}

	const reducer = (state, action) => {
		switch (action.type) {
			case 'setPlayerOne': return ({ ...state, name: action.name })
			case 'setPlayerTwo': return ({ ...state, name: action.name })
			case 'setPlayers': return ({ ...state, players: action.players })
			case 'setPlayersReady': return ({ ...state, ready: action.ready })
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
