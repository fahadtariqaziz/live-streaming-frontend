import React, { useEffect, useState } from 'react';
import './ChannelsFrontend.css';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';

const Channels = () => {
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/channels')
            .then(response => response.json())
            .then(data => setChannels(data))
            .catch(error => console.error('Error fetching channels:', error));
    }, []);

    return (
        <div className="channels-container">
            <h1 className="channels-heading">Channels</h1>
            <div className="channels-list">
                {channels.map((channel) => (
                    <div key={channel.channel_id} className="channel-card">
                        <img src={channel.channel_logo} alt={channel.channel_name} className="channel-logo" />
                        <div className="channel-details">
                            <h2 className="channel-name">{channel.channel_name}</h2>
                            <ReactPlayer
                                url={channel.channel_url}
                                controls
                                width="100%"
                                height="100%"
                                style={{ marginBottom: '10px' }}
                            />
                            <div className="channel-header">
                                <p>Origin: {channel.header.origin}</p>
                                <a href=""  rel="noopener noreferrer" >
                                    {channel.header.reference}
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Channels;
