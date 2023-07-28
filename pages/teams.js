import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getTeams } from '../api/teamData';
import TeamsCard from '../components/TeamsCard';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const { user } = useAuth();
  const getAllTheTeams = () => {
    getTeams(user.uid).then(setTeams);
  };

  useEffect(() => {
    getAllTheTeams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/teams/new" passHref>
        <Button>Add A Team</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {teams.map((team) => (
          <TeamsCard key={team.firebaseKey} teamsObj={team} onUpdate={getAllTheTeams} />
        ))}
      </div>
    </div>
  );
}
