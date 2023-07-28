import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createTeams, updateTeam } from '../../api/teamData';

const initialState = {
  team_name: '',
  image: '',
  location: '',
  favorite: false,
};

function TeamsForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateTeam(formInput).then(() => router.push(`/teams/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid, team_id: obj.firebaseKey };
      createTeams(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name, team_id: name };
        updateTeam(patchPayload).then(() => {
          router.push('/teams');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Teams</h2>

      {/* FIRST NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Team Name" className="mb-3">
        <Form.Control type="text" placeholder="Team Name" name="team_name" value={formInput.team_name} onChange={handleChange} required />
      </FloatingLabel>

      {/* TEAM LOCATION INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Team Location" className="mb-3">
        <Form.Control type="text" placeholder="Team Location" name="location" value={formInput.location} onChange={handleChange} required />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Team Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter an image url" name="image" value={formInput.image} onChange={handleChange} required />
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="Favorite"
        checked={formInput.favorite}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Teams</Button>
    </Form>
  );
}

TeamsForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    team_name: PropTypes.string,
    location: PropTypes.string,
    image: PropTypes.string,
    favorite: PropTypes.bool,
    team_id: PropTypes.string,
  }),
};

TeamsForm.defaultProps = {
  obj: initialState,
};

export default TeamsForm;
