import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

function Navbar() {

  const [cookies, setCookies] = useCookies(["access_token"])

  const navigate = useNavigate();

  const logOut = async () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    toast.info("Logged Out, Bye 👋", { autoClose: 1500 })
    await delay(1500);
    navigate("/auth");
  }


  return (
    <div className='navbar'>
      <Link className='navlink' to="/">Home</Link>
      <Link className='navlink' to="/create-recipe">Create Recipe</Link>
      <Link className='navlink' to="/saved-recipes">Saved Recipes</Link>
      {!cookies.access_token ?
        (<Link className='navlink' to="/auth">Login/Register</Link>) :
        (<button className='logOut-button' onClick={logOut}>LogOut</button>)
      }
    </div>

   
  )
}

export default Navbar
