import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const [ , setCookies] = useCookies(["access_token"])

    const submit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/auth/login", { username, password });

            if (response.data.message === "notExist") {
                toast.error("User Does not Exist!");
            } else if (response.data.message === "inputIncorrect") {
                toast.error("Username or Password is incorrect!");
            } else if (response.data.message === "success") {
                setCookies("access_token", response.data.token);
                window.localStorage.setItem("userID", response.data.userID);
                toast.success(`Hello, ${username}! Redirecting you to the homepage...`, { autoClose: 1500 })
                await delay(1500);
                navigate("/");
            }
        } catch (err) {
            console.log(err);
        }
    };


  return (
      <div className='form-container sign-in-container'>
          <form onSubmit={submit}>
              <h2 className='auth-h2'>Login</h2>
              <div className='form-group'>
                  <label className='auth-label' htmlFor='username'>Username:</label>
                  <input type='text' id='username' required value={username} onChange={(event) => setUsername(event.target.value) }/>
              </div>
              <div className='form-group'>
                  <label htmlFor='password'>Password:</label>
                  <input type='password' id='password' required value={password} onChange={(event) => setPassword(event.target.value) }/>
              </div>
              <button className="auth-button" type='submit'>Login</button>
          </form>
    </div>
  )
}

export default Login


