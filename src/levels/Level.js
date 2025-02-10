import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useHistory } from 'react-router-dom';

const Level = ({ match }) => {
  const history = useHistory();
  const level = parseInt(match.params.levelId);
  const [gridSize, setGridSize] = useState(20);
  const [wallyPosition, setWallyPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(100);
  const [time, setTime] = useState(30);

  useEffect(() => {
    if (level === 2) setGridSize(30);
    else if (level === 3) setGridSize(40);

    // Set Wally's position randomly
    setWallyPosition({
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize)
    });

    // Timer setup
    const timer = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        clearInterval(timer);
        alert('Time is up!');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [level, gridSize, time]);

  const checkClick = (x, y) => {
    if (x === wallyPosition.x && y === wallyPosition.y) {
      // Success animation
      const successAnimation = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 1000 } });
      alert('You found Molly!');
      // Logic for next level or go home
    } else {
      setScore(score - 5); // Penalty for wrong click
    }
  };

  return (
    <div>
      <p>Score: {score}</p>
      <p>Time left: {time}</p>
      {Array(gridSize).fill().map((_, y) => (
        <div key={y} style={{ display: 'flex' }}>
          {Array(gridSize).fill().map((_, x) => (
            <div
              key={`${x}- ${y}`}
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: (x === wallyPosition.x && y === wallyPosition.y) ? 'red' : getRandomColor()
              }}
              onClick={() => checkClick(x, y)}
            />
          ))}
        </div>
      ))}
      <button onClick={() => history.push('/')}>Home</button>
    </div>
  );
};

// Helper function to generate random non-red colors
const getRandomColor = () => {
  const colors = ['#4CAF50', '#2196F3', '#FFC107', '#9E9E9E'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default Level;
