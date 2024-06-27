import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/auth/register", { username, password });

            if (response.data.message === "userExists") {
                toast.error("User Already Exists!");
            } else if (response.data.message === "registrationOk") {
                toast.success("Registration Completed! Now time to Login!");
            };

        } catch (err) {
            console.log(err);
        }
    };


  return (
      <div className='form-container sign-up-container'>
          <form onSubmit={submit}>
              <h2>Register</h2>
              <div className='form-group'>
                  <label htmlFor='username'>Username:</label>
                  <input type='text' id='username' required value={username} onChange={(event) => setUsername(event.target.value) }/>
              </div>
              <div className='form-group'>
                  <label htmlFor='password'>Password:</label>
                  <input type='password' id='password' required value={password} onChange={(event) => setPassword(event.target.value) }/>
              </div>
              <button className="auth-button" type="submit">Register</button>
          </form>
    </div>
  )
}

export default Register

