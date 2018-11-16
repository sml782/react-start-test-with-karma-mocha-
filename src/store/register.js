import * as Validator from 'helpers/validator';

export const CHANGE_USERNAME_ERROR = 'CHANGE_USERNAME_ERROR';

export function checkUsername (name) {
  return {
    type: CHANGE_USERNAME_ERROR,
    error: Validator.checkUsername(name)
  };
};

export const CHANGE_USERNAME = 'CHANGE_USERNAME';

export function changeUsername (name) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_USERNAME,
      name
    });
    dispatch(checkUsername(name));
  };
};
