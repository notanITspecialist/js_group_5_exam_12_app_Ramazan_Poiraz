import axios from "axios";


export const addPhoto = data => async (dispatch, getState) => {
  const token = getState().authorization.user.token;
  await axios.post('http://localhost:8000/gallery', data, {headers: {'Authorization': 'Token ' + token}})
};