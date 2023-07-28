/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewPlayerDetails } from '../../api/mergedData';

export default function ViewAuthor() {
  const [playerDetails, setPlayerDetails] = useState({});
  const router = useRouter();

  // grab firebaseKey from url

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewPlayerDetails(firebaseKey).then(setPlayerDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={playerDetails.image} alt={playerDetails.player_name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {playerDetails.player_name}
          <hr />
          {playerDetails.teamObject?.location} {playerDetails.teamObject?.team_name}
          {playerDetails.favorite ? ' 🤍' : ''} <br /> <br />
          Position: {playerDetails.player_position}
        </h5>
      </div>
    </div>
  );
}
