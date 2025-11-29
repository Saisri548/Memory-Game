import React from 'react'

export const GameHeader = ({ scores,moves }) => {
  return (
    <div className='game-header'>
        <h1>🎮 Memory Card Game</h1>
        <div className="stats">
            <div className="stat-item">
            <span className="stat-label">Score:</span>{" "}
             <span className="stat-value">{scores}</span>
            </div>
             <div className="stat-item">
            <span className="stat-label">Moves:</span>{" "}
             <span className="stat-value">{moves}</span>
            </div>

        </div>
    </div>
  )
}
