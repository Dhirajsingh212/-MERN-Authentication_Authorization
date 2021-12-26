import React from 'react';
import cookie from 'js-cookie';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  img: {
    borderRadius: '5%',
    height: '265px',
    width: '350px',
    marginLeft: '50px',
    marginTop: '20px',
  },
  margin: {
    marginLeft: '50px',
    marginTop: '25px',
  },
});

export default function Home() {
  const classes = useStyles();
  const [statusCode, setstatusCode] = useState(null);
  const [data, setdata] = useState([]);
  useEffect(() => {
    const headers = {
      token: cookie.get('jwt'),
    };
    axios
      .get('http://localhost:8000/getdata', { headers: headers })
      .then((res) => {
        setdata(res.data.data);
        setstatusCode(res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();
  const clickHandler = () => {
    const tokenlogout = undefined;
    cookie.set('jwt', tokenlogout);
    navigate('/Login');
  };

  return (
    <div>
      {statusCode !== 200 ? (
        <h1>something went seriously wrong</h1>
      ) : (
        <div>
          <img
            src="https://wallpapermoon.com/wp-content/uploads/2021/07/00870045.jpg"
            alt="hellpw"
            className={classes.img}
          />
          <br />
          <h2 className={classes.margin}>Your Email Is - {data.email}</h2>
          <h2 className={classes.margin}>
            Your Token Is - {cookie.get('jwt').slice(0, 50)}...
          </h2>
          <Button onClick={clickHandler} variant="contained" className="m-5">
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}
