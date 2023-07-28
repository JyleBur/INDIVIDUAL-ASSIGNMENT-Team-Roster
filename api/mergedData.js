import { getSinglePlayer, deleteSinglePlayer } from './playerData';
import { getSingleTeam, deleteTeam, getTeamsByPlayer } from './teamData';

const viewTeamDetails = (teamFirebaseKey) =>
  new Promise((resolve, reject) => {
    getSingleTeam(teamFirebaseKey)
      .then((teamObject) => {
        getSinglePlayer(teamObject.team_id).then((playerObject) => {
          resolve({ playerObject, ...teamObject });
        });
      })
      .catch((error) => reject(error));
  });

// Function to view player details along with their associated teams
const viewPlayerDetails = (playerFirebaseKey) =>
  new Promise((resolve, reject) => {
    getSinglePlayer(playerFirebaseKey)
      .then((playerObject) => {
        getSingleTeam(playerObject.team_id).then((teamObject) => {
          resolve({ teamObject, ...playerObject });
        });
      })
      .catch((error) => reject(error));
  });

const deleteTeamPlayers = (teamId) =>
  new Promise((resolve, reject) => {
    getTeamsByPlayer(teamId)
      .then((playersArray) => {
        console.warn(playersArray, 'Team Players');
        const deletePlayerPromises = playersArray.map((player) => deleteSinglePlayer(player.firebaseKey));

        Promise.all(deletePlayerPromises).then(() => {
          deleteTeam(teamId).then(resolve);
        });
      })
      .catch((error) => reject(error));
  });

export { viewTeamDetails, viewPlayerDetails, deleteTeamPlayers };
