import {GET_ALL_PHOTO, GET_USER_PHOTO} from "../actions/gallery";

const initState = {
  allPhoto: [],
  userGallery: []
};

const galleryReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_PHOTO: {
      return {...state, allPhoto: action.data}
    }
    case GET_USER_PHOTO: {
      return {...state, userGallery: action.data}
    }
    default: return state
  }
};

export default galleryReducer;