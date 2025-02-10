import React from 'react';

const GameBoard = ({ gridSize, wallyPosition, onClick }) => (
  <div>
    {Array.from({ length: gridSize }, (_, y) => (
      <div key={y} style={{ display: 'flex' }}>
        {Array.from({ length: gridSize }, (_, x) => (
          <div
            key={`${x}- ${y}`}
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: (x === wallyPosition.x && y === wallyPosition.y) ? 'red' : getRandomColor(),
              border: '1px solid #ccc'  // Add borders for visibility
            }}
            onClick={() => onClick(x, y)}
          />
        ))}
      </div>
    ))}
  </div>
);

// Helper function for color generation
const getRandomColor = () => {
  const colors = ['#4CAF50', '#2196F3', '#FFC107', '#9E9E9E'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default GameBoard;
