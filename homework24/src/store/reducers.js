const initialState = {
  emailSignIn: '',
  passwordSignIn: '',
  createName: '',
  createEmail: '',
  createPassword: '',
  verifyPassword: '',
  errorSignIn: '',
  errorCreate: '',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_EMAIL_SIGN_IN':
      return { ...state, emailSignIn: action.payload };
    case 'SET_PASSWORD_SIGN_IN':
      return { ...state, passwordSignIn: action.payload };
    case 'SET_CREATE_NAME':
      return { ...state, createName: action.payload };
    case 'SET_CREATE_EMAIL':
      return { ...state, createEmail: action.payload };
    case 'SET_CREATE_PASSWORD':
      return { ...state, createPassword: action.payload };
    case 'SET_VERIFY_PASSWORD':
      return { ...state, verifyPassword: action.payload };
    case 'SET_ERROR_SIGN_IN':
      return { ...state, errorSignIn: action.payload };
    case 'SET_ERROR_CREATE':
      return { ...state, errorCreate: action.payload };
    default:
      return state;
  }
};
