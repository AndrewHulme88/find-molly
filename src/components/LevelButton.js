import React from 'react';

const LevelButton = ({ level, onClick }) => (
  <button onClick={onClick} style={{ margin: '5px' }}>
    Level {level}
  </button>
);

export default LevelButton;
