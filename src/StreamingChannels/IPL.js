// src/LiveSportsPlayer.js
import React from 'react';
import ReactPlayer from 'react-player';
import "./Channels.css";

const LiveSportsPlayer = () => {
  const videoUrl = 'https://www.youtube.com/live/R0iU94S2Cjs?si=1LXl0D4SfY9UDQPX';

  return (
    <div className="player-wrapper">
      <ReactPlayer
        url={videoUrl}
        className="react-player"
        playing
        controls
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default LiveSportsPlayer;
