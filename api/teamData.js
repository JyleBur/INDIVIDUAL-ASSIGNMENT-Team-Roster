/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';
import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getTeams = (uid) =>
  axios
    .get(`${endpoint}/teams.json`, {
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

const createTeams = (payload) =>
  axios
    .post(`${endpoint}/teams.json`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.data);

const deleteTeam = (firebaseKey) =>
  axios
    .delete(`${endpoint}/teams/${firebaseKey}.json`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.data);

const updateTeam = (payload) =>
  axios
    .patch(`${endpoint}/teams/${payload.firebaseKey}.json`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.data);

const getTeamsByPlayer = (firebaseKey) =>
  axios
    .get(`${endpoint}/players.json`, {
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

const getSingleTeam = (firebaseKey) =>
  axios
    .get(`${endpoint}/teams/${firebaseKey}.json`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.data);

// eslint-disable-next-line object-curly-newline
export { getTeams, createTeams, deleteTeam, updateTeam, getTeamsByPlayer, getSingleTeam };
