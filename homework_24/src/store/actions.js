//actions.js
import API from "../services/api";
export const setEmailSignIn = (email) => ({
  type: 'SET_EMAIL_SIGN_IN',
  payload: email,
});

export const setPasswordSignIn = (password) => ({
  type: 'SET_PASSWORD_SIGN_IN',
  payload: password,
});

export const setCreateName = (name) => ({
  type: 'SET_CREATE_NAME',
  payload: name,
});

export const setCreateEmail = (email) => ({
  type: 'SET_CREATE_EMAIL',
  payload: email,
});

export const setCreatePassword = (password) => ({
  type: 'SET_CREATE_PASSWORD',
  payload: password,
});

export const setVerifyPassword = (password) => ({
  type: 'SET_VERIFY_PASSWORD',
  payload: password,
});

export const setErrorSignIn = (error) => ({
  type: 'SET_ERROR_SIGN_IN',
  payload: error,
});

export const setErrorCreate = (error) => ({
  type: 'SET_ERROR_CREATE',
  payload: error,
});

export const signIn = (email, password) => async (dispatch) => {
  try {
    const users = await API.getUsers();
    const matchedUser = users.find((user) => user.email === email);

    if (matchedUser === undefined) {
      dispatch(setErrorSignIn('Invalid email'));
      throw new Error('Invalid email');
    } else if (matchedUser.password !== password) {
      dispatch(setErrorSignIn('Invalid password'));
      throw new Error('Invalid password');
    } else {
      matchedUser.status = true;
      await API.updateUserData(matchedUser.id, matchedUser);

      localStorage.setItem('loggedInUser', JSON.stringify(matchedUser));
      window.location.href = '/home';
    }
  } catch (error) {
    console.error('Error updating user:', error);
    dispatch(setErrorSignIn(error.message));
  }
};

export const createAccount = (name, email, password, verifyPassword) => async (
  dispatch
) => {
  try {
    const users = await API.getUsers();
    const matchedUser = users.some((user) => user.email === email);

    if (password !== verifyPassword) {
      throw new Error('Password does not match!');
    } else if (matchedUser) {
      dispatch(setErrorCreate(`User with email "${email}" already exists!`));
      throw new Error(`User with email "${email}" already exists!`);
    } else {
      const newUser = {
        name,
        password,
        email,
        orders: [],
        shoppingCart: [],
        status: true,
      };

      const createdUser = await API.createUser(newUser);
      console.log('User created successfully');

      localStorage.setItem('loggedInUser', JSON.stringify(createdUser));
      window.location.href = '/home';
    }
  } catch (error) {
    console.error('Error creating user:', error);
    dispatch(setErrorCreate(error.message));
  }
};
