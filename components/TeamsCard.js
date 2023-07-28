import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteTeamPlayers } from '../api/mergedData';

function TeamsCard({ teamsObj, onUpdate }) {
  const deleteThisTeam = () => {
    if (window.confirm(`Delete ${teamsObj.team_name} from ${teamsObj.location}?`)) {
      deleteTeamPlayers(teamsObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={teamsObj.image} alt={teamsObj.team_name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>
          {teamsObj.team_name} {teamsObj.favorite ? ' 🤍' : ''}
        </Card.Title>
        <Card.Text>Location: {teamsObj.location}</Card.Text>
        <p className="card-text bold">{teamsObj.favorite}</p>
        {/* DYNAMIC LINK TO VIEW THE AUTHOR DETAILS  */}
        <Link href={`/teams/${teamsObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">
            VIEW
          </Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE AUTHOR DETAILS  */}
        <Link href={`/teams/edit/${teamsObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisTeam} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

TeamsCard.propTypes = {
  teamsObj: PropTypes.shape({
    image: PropTypes.string,
    team_name: PropTypes.string,
    location: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
export default TeamsCard;
