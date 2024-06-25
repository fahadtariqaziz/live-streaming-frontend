import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Leagues.css';

const Leagues = () => {
    const [leagues, setLeagues] = useState([]);
    const [newLeague, setNewLeague] = useState({ league_id: '', league_name: '', league_logo: '', league_country: '' });
    const [editMode, setEditMode] = useState(false);
    const [editLeagueId, setEditLeagueId] = useState(null);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        fetch('http://localhost:4000/leagues')
            .then(response => response.json())
            .then(data => setLeagues(data))
            .catch(error => console.error('Error fetching leagues:', error));
    }, []);

    const toggleModal = () => setModal(!modal);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setNewLeague({ ...newLeague, [id]: value });
    };

    const addOrUpdateLeague = () => {
        const method = editMode ? 'PUT' : 'POST';
        const url = editMode ? `http://localhost:4000/leagues/${editLeagueId}` : 'http://localhost:4000/leagues';
        const body = JSON.stringify(newLeague);

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body,
        })
            .then(response => response.json())
            .then(data => {
                if (editMode) {
                    setLeagues(leagues.map(league => (league.league_id === editLeagueId ? data : league)));
                } else {
                    setLeagues([...leagues, data]);
                }
                setNewLeague({ league_id: '', league_name: '', league_logo: '', league_country: '' });
                setEditMode(false);
                setEditLeagueId(null);
                toggleModal();
            })
            .catch(error => console.error('Error adding/updating league:', error));
    };

    const startEditLeague = (league) => {
        setEditMode(true);
        setEditLeagueId(league.league_id);
        setNewLeague(league);
        toggleModal();
    };

    const deleteLeague = (id) => {
        fetch(`http://localhost:4000/leagues/${id}`, {
            method: 'DELETE',
        })
            .then(() => setLeagues(leagues.filter(league => league.league_id !== id)))
            .catch(error => console.error('Error deleting league:', error));
    };

    return (
        <div>
            <h2>Leagues</h2>
            <Button color="primary" onClick={toggleModal}>Add League</Button>
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader ></ModalHeader>
                <ModalBody>
                <div className='popup'>
                    <Form>
                        <FormGroup>
                            <Label for="league_id">ID</Label>
                            <Input type="text" id="league_id" value={newLeague.league_id} onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="league_name">Name</Label>
                            <Input type="text" id="league_name" value={newLeague.league_name} onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="league_logo">Logo URL</Label>
                            <Input type="text" id="league_logo" value={newLeague.league_logo} onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="league_country">Country</Label>
                            <Input type="text" id="league_country" value={newLeague.league_country} onChange={handleInputChange} />
                        </FormGroup>
                    
                    
                
                <ModalFooter>
                    <Button color="primary" onClick={addOrUpdateLeague}>{editMode ? 'Update League' : 'Add League'}</Button>
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                    
                </ModalFooter>
                </Form>
                </div>
                </ModalBody>
                </Modal>
           

            <div className="league-cards">
                {leagues.map(league => (
                    <div key={league.league_id} className="league-card">
                        <img src={league.league_logo} alt={league.league_name} className="league-logo" />
                        <div className="league-details">
                            <h4>{league.league_name}</h4>
                            <p>{league.league_country}</p>
                        </div>
                        <div className="league-actions">
                            <Button color="warning" size="sm" onClick={() => startEditLeague(league)}>Edit</Button>
                            <Button color="danger" size="sm" onClick={() => deleteLeague(league.league_id)}>Delete</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Leagues;
