import React, { useState } from "react"
import socketIO from "socket.io-client"
import AskNickname from "./AskNickname"

const MagicNumber = ({ io }) => {
  const [players, setPlayers] = useState({})
  const [playersReady, setPlayersReady] = useState(false)

	io.on("event::handshake", () => {
		console.log(`
      Server connection ...
      ---> OK`)
	});

  io.on("event::gameFull", () => {
    console.log("MAGICNUMBER ready !")
    setPlayersReady(true)
  })

  return (
    <div id="MagicNumber">
      <>
        {!playersReady &&
          <AskNickname io={io} game='MagicNumber'/>
        }
        {playersReady &&
          <h1>LET THE GAME BEGIN !</h1>
        }
      </>
    </div>
  )
}

export default MagicNumber
