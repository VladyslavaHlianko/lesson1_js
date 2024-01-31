import React, { useEffect } from 'react';
import "./style.sass"
import { useDispatch, useSelector } from 'react-redux';
import {
  setEmailSignIn,
  setPasswordSignIn,
  setCreateName,
  setCreateEmail,
  setCreatePassword,
  setVerifyPassword,
  setErrorSignIn,
  setErrorCreate,
  signIn,
  createAccount,
} from '../../store/actions';
import { Form, Field, Formik} from 'formik';
import { Box, Button, Typography } from '@mui/material';
  
const Login = () => {
  const dispatch = useDispatch();
  
  const {
    emailSignIn,
    passwordSignIn,
    createName,
    createEmail,
    createPassword,
    verifyPassword,
    errorSignIn,
    errorCreate,
  } = useSelector((state) => state);
  
  const handleSignIn = () => {
    dispatch(signIn(emailSignIn, passwordSignIn));
  };
  
  const handleCreateAccount = () => {
    dispatch(createAccount(createName, createEmail, createPassword, verifyPassword));
  };
  
  const handleSubmitSignIn = (values) => {
    handleSignIn();
  };
  
  const handleSubmitCreateAccount = (values) => {
    handleCreateAccount();
  };
  
  useEffect(() => {
    dispatch(setErrorSignIn(''));
  }, [emailSignIn, passwordSignIn]);
  
  useEffect(() => {
    dispatch(setErrorCreate(''));
  }, [createName, createEmail, createPassword, verifyPassword]);


  return (
    <Box
      sx={{
        background: '#f8f8f8',
        Width: '100%',
        height: '100%',
        padding: '50px 120px 0',
      }}
    >
      <Box display="flex" justifyContent="space-between" gap="41px">
        <Box
          component="div"
          sx={{
            flex: '1 50%',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '0',
              right: '-21px',
              width: '1px',
              background: '#dbd7d7',
              height: '100%',
            },
          }}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}
          >
            Secure Sign In
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: 16, margin: '0 0 15px', fontWeight: '600' }}
          >
            For current customers
          </Typography>
          {errorSignIn && (
            <Typography
              variant="div"
              sx={{
                display: 'block',
                margin: '0 0 10px',
                background: 'rgb(249, 211, 211)',
                border: '2px solid rgb(228, 110, 110)',
                borderRadius: '5px',
                color: 'rgb(177, 91, 91)',
                padding: '15px',
              }}
            >
              {errorSignIn}
            </Typography>
          )}
          <Formik
            initialValues={{
              email: emailSignIn,
              password: passwordSignIn,
            }}
            onSubmit={handleSubmitSignIn}
          >
            <Form>
              <Field
                type="email"
                name="email" 
                placeholder="Email Address"
                required
                value={emailSignIn} 
                onChange={(event) => dispatch(setEmailSignIn(event.target.value))}    
                className="input-field"
              />
              <Field
                type="password"
                name="password" 
                placeholder="Password"
                required
                value={passwordSignIn}
                onChange={(event) => dispatch(setPasswordSignIn(event.target.value))}      
                className="input"
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  background: 'rgb(207, 23, 23)',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '30px',
                  padding: '10px 30px',
                  fontWeight: 'bold',
                  margin: '0 auto 0 0',
                  '&:hover': {
                    background: 'rgb(207, 23, 23)',
                  },
                }}
              >
                Sign In
              </Button>
            </Form>
          </Formik>
        </Box>
        <Box
          component="div"
          sx={{
            flex: '1 50%',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '0',
              left: '-21px',
              width: '1px',
              background: '#dbd7d7',
              height: '100%',
            },
          }}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}
          >
            Create Account
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: 16, margin: '0 0 15px', fontWeight: '600' }}
          >
            For new customers
          </Typography>
          {errorCreate && (
            <Typography
              variant="div"
              sx={{
                display: 'block',
                margin: '0 0 10px',
                background: 'rgb(249, 211, 211)',
                border: '2px solid rgb(228, 110, 110)',
                borderRadius: '5px',
                color: 'rgb(177, 91, 91)',
                padding: '15px',
              }}
            >
              {errorCreate}
            </Typography>
          )}
          <Formik 
            initialValues={{
              name: createName,
              email: createEmail,
              password: createPassword,
              verifyPassword: verifyPassword,
            }}
            onSubmit={handleSubmitCreateAccount}
          >
            <Form>
              <Field
                type="text"
                name="name"
                placeholder="Name"
                required
                value={createName}
                className="input-field"                
                onChange={(event) => dispatch(setCreateName(event.target.value))}
              />
              <Field
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={createEmail}
                onChange={(event) => dispatch(setCreateEmail(event.target.value))}    
                className="input-field"
              />
              <Field
                type="password"            
                name="password"
                placeholder="Password"
                onChange={(event) => dispatch(setCreatePassword(event.target.value))}    
                required
                value={createPassword} 
                className="input-field"
              />
              <Field
                type="password"
                name="verifyPassword"
                placeholder="Verify Password"
                onChange={(event) => dispatch(setVerifyPassword(event.target.value))}    
                required
                value={verifyPassword}
                className="input"
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  background: 'rgb(207, 23, 23)',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '30px',
                  padding: '10px 30px',
                  fontWeight: 'bold',
                  margin: '0 auto 0 0',
                  '&:hover': {
                    background: 'rgb(207, 23, 23)',
                  },
                }}
              >
                Create Account
              </Button>
            </Form>
          </Formik>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
