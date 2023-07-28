import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSinglePlayer } from '../api/playerData';

function PlayerCard({ playerObj, onUpdate }) {
  const deleteThisPlayer = () => {
    if (window.confirm(`Delete ${playerObj.player_name}`)) {
      deleteSinglePlayer(playerObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '25rem', margin: '10px' }}>
      <Card.Img variant="top" src={playerObj.image} alt={playerObj.player_name} style={{ height: '450px' }} />
      <Card.Body>
        <Card.Title>
          {playerObj.player_name} {playerObj.favorite ? ' 🤍' : ''}
        </Card.Title>
        <Card.Text>Position: {playerObj.player_position}</Card.Text>
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

PlayerCard.propTypes = {
  playerObj: PropTypes.shape({
    image: PropTypes.string,
    player_name: PropTypes.string,
    player_position: PropTypes.string,
    location: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
export default PlayerCard;
