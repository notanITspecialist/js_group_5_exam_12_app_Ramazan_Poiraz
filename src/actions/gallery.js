import axios from "axios";
import {push} from 'connected-react-router';
import Toast from "light-toast";

export const GET_USER_PHOTO = 'GET_USER_PHOTO';

export const GET_ALL_PHOTO = 'GET_ALL_PHOTO';


const getUserPhotoSuc = data => ({type: GET_USER_PHOTO, data});

const getAllPhotoSuc = data => ({type: GET_ALL_PHOTO, data});


export const getAllPhoto = () => async dispatch => {
  const data = await axios('http://localhost:8000/gallery/');

  dispatch(getAllPhotoSuc(data.data))
};

export const getUserPhoto = id => async dispatch => {
  const data = await axios.get('http://localhost:8000/gallery/'+id);
  dispatch(getUserPhotoSuc(data.data))
};

export const deletePhoto = id => async (dispatch, getState) => {
  const user = getState().authorization.user;
  await axios.delete('http://localhost:8000/gallery/'+id, {headers: {'Authorization': 'Token ' + user.token}});

  dispatch(getUserPhoto(user._id));
};

export const addPhoto = info => async (dispatch, getState) => {
  const user = getState().authorization.user;
  const data = await axios.post('http://localhost:8000/gallery', info, {headers: {'Authorization': 'Token ' + user.token}});

  if(data.data.error) return Toast.fail(data.data.error, 1500);

  dispatch(push(`userPhoto/${user._id}`))
};