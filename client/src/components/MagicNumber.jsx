import React from "react"
import { useStateValue } from "../hooks/state"
import AskNickname from "./AskNickname"

const MagicNumber = () => {
	const [{ io, playerOne, playerTwo, players, playersReady }, dispatch] = useStateValue()

	io.on("event::handshake", () => {
		console.log('Connected to server')
	});

  io.on("event::newPlayer", data => {
    dispatch({ type: 'setPlayers', data })
  })

  io.on("event::gameFull", () => {
    console.log("MAGICNUMBER ready !")
    dispatch({ type: 'setPlayersReady', ready: true })
  })

  return (
    <div id="MagicNumber">
      <>
        {!playersReady &&
          <AskNickname game='MagicNumber'/>
        }
        {playersReady &&
          <h1>LET THE GAME BEGIN !</h1>
        }
      </>
    </div>
  )
}

export default MagicNumber
