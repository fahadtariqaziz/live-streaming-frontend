import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Teams.css';

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [newTeam, setNewTeam] = useState({ team_id: '', team_name: '', team_logo: '' });
    const [editMode, setEditMode] = useState(false);
    const [editTeamId, setEditTeamId] = useState(null);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        fetch('http://localhost:4000/teams')
            .then(response => response.json())
            .then(data => setTeams(data))
            .catch(error => console.error('Error fetching teams:', error));
    }, []);

    const toggleModal = () => setModal(!modal);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setNewTeam({ ...newTeam, [id]: value });
    };

    const addOrUpdateTeam = () => {
        const method = editMode ? 'PUT' : 'POST';
        const url = editMode ? `http://localhost:4000/teams/${editTeamId}` : 'http://localhost:4000/teams';
        const body = JSON.stringify(newTeam);

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
                    setTeams(teams.map(team => (team.team_id === editTeamId ? data : team)));
                } else {
                    setTeams([...teams, data]);
                }
                setNewTeam({ team_id: '', team_name: '', team_logo: '' });
                setEditMode(false);
                setEditTeamId(null);
                toggleModal();
            })
            .catch(error => console.error('Error adding/updating team:', error));
    };

    const startEditTeam = (team) => {
        setEditMode(true);
        setEditTeamId(team.team_id);
        setNewTeam(team);
        toggleModal();
    };

    const deleteTeam = (id) => {
        fetch(`http://localhost:4000/teams/${id}`, {
            method: 'DELETE',
        })
            .then(() => setTeams(teams.filter(team => team.team_id !== id)))
            .catch(error => console.error('Error deleting team:', error));
    };

    return (
        <div>
            <h2>Teams</h2>
            <Button color="primary" onClick={toggleModal}>Add Team</Button>
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader ></ModalHeader>
                <ModalBody>
                    <div className='popup'>
                    <Form >
                        <FormGroup>
                            <Label for="team_id">ID</Label>
                            <Input type="text" id="team_id" value={newTeam.team_id} onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="team_name">Name</Label>
                            <Input type="text" id="team_name" value={newTeam.team_name} onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="team_logo">Logo URL</Label>
                            <Input type="text" id="team_logo" value={newTeam.team_logo} onChange={handleInputChange} />
                        </FormGroup>
                        <ModalFooter>
                    <Button color="primary" onClick={addOrUpdateTeam}>{editMode ? 'Update Team' : 'Add Team'}</Button>
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
                    </Form>
                    </div>
                </ModalBody>
                
            </Modal>

            <div className="team-cards">
                {teams.map(team => (
                    <div key={team.team_id} className="team-card">
                        <img src={team.team_logo} alt={team.team_name} className="team-logo" />
                        <div className="team-details">
                            <h4>{team.team_name}</h4>
                        </div>
                        <div className="team-actions">
                            <Button color="warning" size="sm" onClick={() => startEditTeam(team)}>Edit</Button>
                            <Button color="danger" size="sm" onClick={() => deleteTeam(team.team_id)}>Delete</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Teams;
