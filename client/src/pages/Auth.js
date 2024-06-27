import React, { useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import '../pages/Auth.css'



function Auth() {

  const [containerActive, setContainerActive] = useState(false);

  const signUpButton = () => {
    setContainerActive(true);
  };

  const signInButton = () => {
    setContainerActive(false);
  };




  return (
    <div className='auth'>
      <div className={`auth-container ${containerActive ? " right-panel-active" : ""}`} id="auth-container">
        <Login />
        <Register />
	  <div className="auth-overlay-container">
	  	<div className="auth-overlay">
		  	<div className="overlay-panel overlay-left">
			  	<h1 className='auth-h1'>Welcome Back!</h1>
			  	<p className='auth-p'>To keep connected with us please login with your personal info</p>
			  	<button className="auth-ghost" id="signIn" onClick={signInButton}>Sign In</button>
		  	</div>
		  	<div className="overlay-panel overlay-right">
		  		<h1 className='auth-h1'>Hello, Friend!</h1>
		  		<p className='auth-p'>Enter your personal details and start journey with us</p>
		  		<button className="auth-ghost" id="signUp" onClick={signUpButton}>Sign Up</button>
		  	</div>
	  	</div>
  	</div>
      </div>
  </div>


    

    
    
    
    
  )
}

export default Auth
