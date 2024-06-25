import React, { useEffect, useState } from 'react';
import './Channels.css';

const Channels = () => {
    const [channels, setChannels] = useState([]);
    const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [currentChannel, setCurrentChannel] = useState(null);

    useEffect(() => {
        fetch('http://localhost:4000/channels')
            .then(response => response.json())
            .then(data => setChannels(data))
            .catch(error => console.error('Error fetching channels:', error));
    }, []);

    const handleAddClick = () => {
        setIsAddPopupOpen(true);
    };

    const handleEditClick = (channel) => {
        setCurrentChannel(channel);
        setIsEditPopupOpen(true);
    };

    const handleDeleteClick = (id) => {
        fetch(`http://localhost:4000/channels/${id}`, {
            method: 'DELETE'
        })
        .then(() => setChannels(channels.filter(channel => channel.channel_id !== id)))
        .catch(error => console.error('Error deleting channel:', error));
    };

    const handleFormSubmit = (e, isEdit = false) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newChannel = {
            channel_id: isEdit ? currentChannel.channel_id : null,
            channel_name: formData.get('channel_name'),
            channel_logo: formData.get('channel_logo'),
            channel_url: formData.get('channel_url'),
            header: {
                origin: formData.get('origin'),
                reference: formData.get('reference')
            }
        };

        if (isEdit) {
            fetch(`http://localhost:4000/channels/${newChannel.channel_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newChannel)
            })
            .then(response => response.json())
            .then(updatedChannel => {
                setChannels(channels.map(channel => (channel.channel_id === updatedChannel.channel_id ? updatedChannel : channel)));
                setIsEditPopupOpen(false);
                setCurrentChannel(null);
            })
            .catch(error => console.error('Error updating channel:', error));
        } else {
            fetch('http://localhost:4000/channels', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newChannel)
            })
            .then(response => response.json())
            .then(addedChannel => {
                setChannels([...channels, addedChannel]);
                setIsAddPopupOpen(false);
            })
            .catch(error => console.error('Error adding channel:', error));
        }
    };

    return (
        <div className="channels-container">
            <h1 className="channels-heading">Channels</h1>
            <button className="add-button" onClick={handleAddClick}>Add Channel</button>
            <div className="channels-list">
                {channels.map((channel) => (
                    <div key={channel.channel_id} className="channel-card">
                        <img src={channel.channel_logo} alt={channel.channel_name} className="channel-logo" />
                        <div className="channel-details">
                            <h2 className="channel-name">{channel.channel_name}</h2>
                            <a href={channel.channel_url} target="_blank" rel="noopener noreferrer" className="channel-link">
                                Watch Now
                            </a>
                            <div className="channel-header">
                                <p>Origin: {channel.header.origin}</p>
                                <a href={channel.header.reference} target="_blank" rel="noopener noreferrer">
                                    {channel.header.reference}
                                </a>
                            </div>
                        </div>
                        <div className="channel-actions">
                            <button className="edit-button" onClick={() => handleEditClick(channel)}>Edit</button>
                            <button className="delete-button" onClick={() => handleDeleteClick(channel.channel_id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            {isAddPopupOpen && (
                <div className="popup">
                    <form onSubmit={e => handleFormSubmit(e)}>
                        <h3>Add Channel</h3>
                        <label>Channel Name: <input name="channel_name" required /></label>
                        <label>Channel Logo URL: <input name="channel_logo" required /></label>
                        <label>Channel URL: <input name="channel_url" required /></label>
                        <label>Origin: <input name="origin" required /></label>
                        <label>Reference URL: <input name="reference" required /></label>
                        <button type="submit">Add</button>
                        <button type="button" onClick={() => setIsAddPopupOpen(false)}>Cancel</button>
                    </form>
                </div>
            )}
            {isEditPopupOpen && (
                <div className="popup">
                    <form onSubmit={e => handleFormSubmit(e, true)}>
                        <h3>Edit Channel</h3>
                        <label>Channel Name: <input name="channel_name" defaultValue={currentChannel.channel_name} required /></label>
                        <label>Channel Logo URL: <input name="channel_logo" defaultValue={currentChannel.channel_logo} required /></label>
                        <label>Channel URL: <input name="channel_url" defaultValue={currentChannel.channel_url} required /></label>
                        <label>Origin: <input name="origin" defaultValue={currentChannel.header.origin} required /></label>
                        <label>Reference URL: <input name="reference" defaultValue={currentChannel.header.reference} required /></label>
                        <button type="submit">Update</button>
                        <button type="button" onClick={() => setIsEditPopupOpen(false)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Channels;
