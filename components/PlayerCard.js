/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSinglePlayer } from '../api/playerData';
import { viewTeamDetails } from '../api/mergedData';

function PlayerCard({ playerObj, onUpdate }) {
  const [teamDetails, setTeamDetails] = useState({});

  // useEffect goes to viewTeamDetails to grab players team id. after
  // finding what team player is on teamData is passed to setTeamDetails giving teamDetails able to use the data from team section
  useEffect(() => {
    viewTeamDetails(playerObj.team_id).then((teamData) => {
      setTeamDetails(teamData);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to delete player
  const deleteThisPlayer = () => {
    if (window.confirm(`Delete ${playerObj.player_name}`)) {
      deleteSinglePlayer(playerObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    // Display cards with player information.
    <Card className="player-card" style={{ width: '25rem', margin: '10px' }}>
      <Card.Img variant="top" src={playerObj.image} alt={playerObj.player_name} style={{ height: '450px' }} />
      <Card.Body>
        <Card.Title>
          {playerObj.player_name} {playerObj.favorite ? ' 🤍' : ''}
        </Card.Title>
        <Card.Text>Position: {playerObj.player_position}</Card.Text>
        <Card.Text>
          {teamDetails?.image && <img src={teamDetails.image} alt="Team Logo" style={{ width: '30px', height: '30px', marginRight: '10px' }} />}
          {teamDetails?.location} {teamDetails?.team_name}
        </Card.Text>
        <p className="card-text bold">{playerObj.favorite}</p>
        {/* DYNAMIC LINK TO VIEW THE PLAYER DETAILS  */}
        <Link href={`/players/${playerObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">
            VIEW
          </Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE PLAYER DETAILS  */}
        <Link href={`/players/edit/${playerObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisPlayer} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

//
PlayerCard.propTypes = {
  playerObj: PropTypes.shape({
    image: PropTypes.string,
    player_name: PropTypes.string,
    player_position: PropTypes.string,
    location: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
    team_id: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
export default PlayerCard;
