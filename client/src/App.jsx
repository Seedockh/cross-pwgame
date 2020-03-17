import React, { useState, useEffect } from "react"
import { StateProvider } from './hooks/state'
import socketIO from "socket.io-client"
import AskNickname from "./components/AskNickname"

const App = () => {
	/*--------------------------------------*/
	/** * set reducer initial state values **/
	/*--------------------------------------*/
	const initialState = {
		io: socketIO("http://localhost:3000"),
		totalPlayers: 0,
		currentPlayer: localStorage.getItem('player') || null,
		isPlayerWaiting: false,
	}

	/*----------------------------------*/
	/** * define reducer state actions **/
	/*----------------------------------*/
	const reducer = (state, action) => {
		switch (action.type) {
			case 'setIo':
				return ({ ...state, io: action.io })
			case 'setTotalPlayers':
				return ({ ...state, totalPlayers: action.totalPlayers })
			case 'setIsPlayerWaiting':
				return ({ ...state, isWaiting: action.isWaiting })
			case 'setCurrentPlayer':
				return ({ ...state, currentPlayer: action.currentPlayer })
		}
	}

	/*---------------*/
	/** * rendering **/
	/*---------------*/
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
							<AskNickname />
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
