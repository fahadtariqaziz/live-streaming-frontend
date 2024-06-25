// src/LiveSportsPlayer.js
import React from 'react';
import ReactPlayer from 'react-player';
import "./Channels.css";

const LiveSportsPlayer = () => {
  const videoUrl = 'https://www.youtube.com/live/UG_Iwa96794?si=wrFvuzahiKahWeS6';

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
