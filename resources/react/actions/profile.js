import { PROFILE } from "./types";
import ProfileApi from "../api/profileApi";

export const getProfile = () =>
  ( dispatch, getState ) => {
    if ( getState().profile.fetching )
      return;
    
    dispatch( setProfileFetching() );
    return ProfileApi.index({}, ( data, err) => {
      if ( !err ) dispatch( validateProfile( data) );
      else dispatch( setProfileError( err ) );
    })
  }

export const setProfileFetching = () => ({
  type: PROFILE.SET_FETCHING
})

export const setProfileError = response => ({
  type: PROFILE.SET_ERROR, response
})

export const validateProfile = data => ({
  type: PROFILE.VALIDATE, data
})