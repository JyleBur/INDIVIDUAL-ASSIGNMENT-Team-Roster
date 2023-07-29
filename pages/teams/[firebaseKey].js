/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewTeamDetails } from '../../api/mergedData';
import { getTeamsByPlayer } from '../../api/teamData';
import PlayerCard from '../../components/PlayerCard';

export default function ViewTeams() {
  const [teamDetails, setTeamDetails] = useState({});
  const [players, setTeamPlayers] = useState([]);
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    viewTeamDetails(firebaseKey).then(setTeamDetails);
    getTeamsByPlayer(firebaseKey).then(setTeamPlayers);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={teamDetails.image} alt={teamDetails.title} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>{teamDetails.location}</h5>
        <h5>{teamDetails.team_name}</h5>
        {teamDetails.favorite ? 'Favorited 🤍' : ''}
        <p>{teamDetails.description || ''}</p>
      </div>
      <div className="w-100 border-bottom pb-3">
        <div className="d-flex flex-wrap">
          {players.map((player) => (
            <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={setTeamPlayers} />
          ))}
        </div>
      </div>
    </div>
  );
}
