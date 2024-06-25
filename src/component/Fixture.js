import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Form, FormGroup, Label, Input } from 'reactstrap';
import './Fixtures.css';

const Fixtures = () => {
    const [fixtures, setFixtures] = useState([]);
    const [newFixture, setNewFixture] = useState({ ID: '', TeamA: '', TeamB: '', Date: '', Time: '', ChannelURL: '', LeagueName: '' });
    const [editMode, setEditMode] = useState(false);
    const [editFixtureId, setEditFixtureId] = useState(null);
    const [modal, setModal] = useState(false);

    const [teams, setTeams] = useState([]);
    const [channels, setChannels] = useState([]);
    const [leagues, setLeagues] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/fixtures')
            .then(response => response.json())
            .then(data => setFixtures(data))
            .catch(error => console.error('Error fetching fixtures:', error));

        fetch('http://localhost:4000/teams')
            .then(response => response.json())
            .then(data => setTeams(data))
            .catch(error => console.error('Error fetching teams:', error));

        fetch('http://localhost:4000/channels')
            .then(response => response.json())
            .then(data => setChannels(data))
            .catch(error => console.error('Error fetching channels:', error));

        fetch('http://localhost:4000/leagues')
            .then(response => response.json())
            .then(data => setLeagues(data))
            .catch(error => console.error('Error fetching leagues:', error));
    }, []);

    const toggleModal = () => setModal(!modal);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setNewFixture({ ...newFixture, [id]: value });
    };

    const addOrUpdateFixture = () => {
        const method = editMode ? 'PUT' : 'POST';
        const url = editMode ? `http://localhost:4000/fixtures/${editFixtureId}` : 'http://localhost:4000/fixtures';
        const body = JSON.stringify(newFixture);

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
                    setFixtures(fixtures.map(fixture => (fixture.ID === editFixtureId ? data : fixture)));
                } else {
                    setFixtures([...fixtures, data]);
                }
                setNewFixture({ ID: '', TeamA: '', TeamB: '', Date: '', Time: '', ChannelURL: '', LeagueName: '' });
                setEditMode(false);
                setEditFixtureId(null);
                toggleModal();
            })
            .catch(error => console.error('Error adding/updating fixture:', error));
    };

    const startEditFixture = (fixture) => {
        setEditMode(true);
        setEditFixtureId(fixture.ID);
        setNewFixture(fixture);
        toggleModal();
    };

    const deleteFixture = (id) => {
        fetch(`http://localhost:4000/fixtures/${id}`, {
            method: 'DELETE',
        })
            .then(() => setFixtures(fixtures.filter(fixture => fixture.ID !== id)))
            .catch(error => console.error('Error deleting fixture:', error));
    };

    const getTeamName = (id) => {
        const team = teams.find(team => team.team_id === id);
        return team ? team.team_name : 'Unknown Team';
    };

    const getChannelName = (id) => {
        const channel = channels.find(channel => channel.channel_id === id);
        return channel ? channel.channel_name : 'Unknown Channel';
    };

    const getLeagueName = (id) => {
        const league = leagues.find(league => league.league_id === id);
        return league ? league.league_name : 'Unknown League';
    };

    return (
        <div className="container">
            <h2>Fixtures</h2>
            <button className="add-fixture-button" color="primary" onClick={toggleModal}>Add Fixture</button>
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalBody>
                <div className='popup'>
                <ModalHeader ></ModalHeader>
                    <Form>
                        <FormGroup>
                            <label for="ID">ID</label>
                            <Input type="text" id="ID" value={newFixture.ID} onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <label for="TeamA">Team A</label>
                            <Input type="select" id="TeamA" value={newFixture.TeamA} onChange={handleInputChange}>
                                <option value="">Select Team A</option>
                                {teams.map(team => (
                                    <option key={team.team_id} value={team.team_id}>{team.team_name}</option>
                                ))}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <label for="TeamB">Team B</label>
                            <select  id="TeamB" value={newFixture.TeamB} onChange={handleInputChange}>
                                <option value="">Select Team B</option>
                                {teams.map(team => (
                                    <option key={team.team_id} value={team.team_id}>{team.team_name}</option>
                                ))}
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <label for="Date">Date</label>
                            <input type="date" id="Date" value={newFixture.Date} onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <label for="Time">Time</label>
                            <Input type="time" id="Time" value={newFixture.Time} onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <label for="ChannelURL">Channel URL</label>
                            <Input type="select" id="ChannelURL" value={newFixture.ChannelURL} onChange={handleInputChange}>
                                <option value="">Select Channel URL</option>
                                {channels.map(channel => (
                                    <option key={channel.channel_id} value={channel.channel_id}>{channel.channel_name}</option>
                                ))}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <label for="LeagueName">League Name</label>
                            <Input type="select" id="LeagueName" value={newFixture.LeagueName} onChange={handleInputChange}>
                                <option value="">Select League Name</option>
                                {leagues.map(league => (
                                    <option key={league.league_id} value={league.league_id}>{league.league_name}</option>
                                ))}
                            </Input>
                        </FormGroup>
                  
                <ModalFooter>
                    <button color="primary" onClick={addOrUpdateFixture}>{editMode ? 'Update Fixture' : 'Add Fixture'}</button>
                    <button color="secondary" onClick={toggleModal}>Cancel</button>
                    </ModalFooter>
                </Form>
                </div>
                </ModalBody>
                </Modal>

            <Table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Team A</th>
                        <th>Team B</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Channel</th>
                        <th>League</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {fixtures.map(fixture => (
                        <tr key={fixture.ID}>
                            <td>{fixture.ID}</td>
                            <td>{getTeamName(fixture.TeamA)}</td>
                            <td>{getTeamName(fixture.TeamB)}</td>
                            <td>{fixture.Date}</td>
                            <td>{fixture.Time}</td>
                            <td>{getChannelName(fixture.ChannelURL)}</td>
                            <td>{getLeagueName(fixture.LeagueName)}</td>
                            <td>
                                <Button color="warning" size="sm" onClick={() => startEditFixture(fixture)}>Edit</Button>
                                <Button color="danger" size="sm" onClick={() => deleteFixture(fixture.ID)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Fixtures;
