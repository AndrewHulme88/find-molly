import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useParams, useNavigate } from 'react-router-dom';
import GameBoard from '../components/GameBoard';

const Level = () => {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const level = parseInt(levelId);
  const [gridSize, setGridSize] = useState(20);
  const [wallyPosition, setWallyPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(100);
  const [time, setTime] = useState(30);

  const [springProps, setSpringProps] = useSpring(() => ({ opacity: 0 }));

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
      setSpringProps({ opacity: 1, from: { opacity: 0 }, config: { duration: 1000 } });
      alert('You found Molly!');

      // Logic for next level or home
      if (level < 3) {
        navigate(`/level/${level + 1}`);
      } else {
        navigate('/');
      }
    } else {
      setScore(score - 5); // Penalty for wrong click
    }
  };

  return (
    <div>
      <p>Score: {score}</p>
      <p>Time left: {time}</p>
      <animated.div style={springProps}>
        <GameBoard gridSize={gridSize} wallyPosition={wallyPosition} onClick={checkClick} />
      </animated.div>
      <button onClick={() => navigate('/')}>Home</button>
    </div>
  );
};

export default Level;
