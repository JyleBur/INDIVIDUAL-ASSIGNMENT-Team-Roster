/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';
import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getPlayers = (uid) =>
  axios
    .get(`${endpoint}/players.json`, {
      params: {
        orderBy: '"uid"',
        equalTo: `"${uid}"`,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.data)
    .then((data) => (data ? Object.values(data) : []));

const createPlayer = (payload) =>
  axios
    .post(`${endpoint}/players.json`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.data);

const getSinglePlayer = (firebaseKey) =>
  axios
    .get(`${endpoint}/players/${firebaseKey}.json`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.data);

const deleteSinglePlayer = (firebaseKey) =>
  axios
    .delete(`${endpoint}/players/${firebaseKey}.json`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.data);

const updatePlayer = (payload) =>
  axios
    .patch(`${endpoint}/players/${payload.firebaseKey}.json`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.data);

const getPlayersTeam = (firebaseKey) =>
  axios
    .get(`${endpoint}/teams.json`, {
      params: {
        orderBy: '"team_id"',
        equalTo: `"${firebaseKey}"`,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.data)
    .then((data) => Object.values(data));

// eslint-disable-next-line object-curly-newline
export { getPlayers, createPlayer, getSinglePlayer, deleteSinglePlayer, updatePlayer, getPlayersTeam };
