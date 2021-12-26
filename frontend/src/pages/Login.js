import { Link } from 'react-router-dom';
import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import cookie from 'js-cookie';

const useStyles = makeStyles({
  bg: {
    backgroundImage: 'url("https://wallpaperaccess.com/full/1099445.png")',
    height: '151%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  form: {
    paddingTop: '200px',
    paddingLeft: '50px',
    paddingRight: '50px',
  },
});

export default function Login() {
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [passwordConfirm, setpasswordConfirm] = useState('');
  const classes = useStyles();

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:8000/login', {
        email,
        password,
        passwordConfirm,
      })
      .then((res) => {
        if (res.data.token) {
          cookie.set('jwt', res.data.token);
        }
        alert(res.data.message);
        navigate('/home');
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <Grid container>
        <Grid item lg={8}>
          <div className={classes.bg}></div>
        </Grid>
        <Grid item lg={4}>
          <form className={classes.form} onSubmit={submitHandler}>
            <TextField
              className="mb-4"
              label="Email"
              type="email"
              variant="standard"
              value={email}
              fullWidth={true}
              onChange={(e) => setemail(e.target.value)}
            />
            <TextField
              className="my-4"
              label="Password"
              type="password"
              variant="standard"
              fullWidth={true}
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <TextField
              className="my-4"
              label="Confirm Password"
              type="password"
              variant="standard"
              fullWidth={true}
              value={passwordConfirm}
              onChange={(e) => setpasswordConfirm(e.target.value)}
            />
            <Button className="mt-4" type="submit" variant="contained">
              submit
            </Button>
            <Button className="mx-4 mt-4" variant="contained">
              <Link to="/" className="text-decoration-none text-white">
                signup
              </Link>
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
}
