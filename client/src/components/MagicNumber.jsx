import React, { useEffect } from "react"
import { useStateValue } from "../hooks/state"

const MagicNumber = () => {
	const [{ io, currentPlayer }, dispatch] = useStateValue()

	useEffect(() => {
		if (!currentPlayer.currentGame) {
			dispatch({
				type: 'setCurrentPlayer',
				currentPlayer: { ...currentPlayer, currentGame: 'Magic Number' }
			})
		}
	}, [])

	useEffect(() => {
		if (currentPlayer.currentGame) {
			io.emit('game::queue-magicnumber', currentPlayer)
		}
	}, [currentPlayer])

  return (
    <div id="MagicNumber">
			<p className="is-title">Magic Number ahead !</p>
    </div>
  )
}

export default MagicNumber
