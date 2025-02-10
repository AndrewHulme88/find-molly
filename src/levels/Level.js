import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useParams, useNavigate } from 'react-router-dom';

const Level = () => {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const level = parseInt(levelId);
  const [gridSize, setGridSize] = useState(20);
  const [wallyPosition, setWallyPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(100);
  const [time, setTime] = useState(30);
  const [successAnimation, setSuccessAnimation] = useState({ opacity: 0 });

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
      // Trigger success animation
      setSuccessAnimation({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 1000 }
      });
      setTimeout(() => {
        if (level < 3) {
          navigate(`/level/ ${level + 1}`);
        } else {
          navigate('/');
        }
      }, 1000);
    } else {
      setScore(score - 5); // Penalty for wrong click
    }
  };

  const getRandomColor = () => {
    const colors = ['#4CAF50', '#2196F3', '#FFC107', '#9E9E9E'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div>
      <p>Score: {score}</p>
      <p>Time left: {time}</p>
      <animated.div style={successAnimation}>
        <h1 style={{ color: 'green' }}>Found Molly!</h1>
      </animated.div>
      {Array(gridSize).fill().map((_, y) => (
        <div key={y} style={{ display: 'flex' }}>
          {Array(gridSize).fill().map((_, x) => (
            <div
              key={`${x}- ${y}`}
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: (x === wallyPosition.x && y === wallyPosition.y) ? 'red' : getRandomColor(),
                border: '1px solid #ccc'
              }}
              onClick={() => checkClick(x, y)}
            />
          ))}
        </div>
      ))}
      <button onClick={() => navigate('/')}>Home</button>
    </div>
  );
};

export default Level;
