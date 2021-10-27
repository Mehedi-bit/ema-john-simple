import React, { useContext } from 'react';
// import * as firebase from "firebase/app";
import { useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { handleGoogleSignIn, handleSignOut, initializeLoginFramework } from './LoginManager';

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    //****//
    error: '',
    success: false
  });

  initializeLoginFramework()

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  //////// Sign in ////////
  const googleSignIn = () => {
      handleGoogleSignIn()
      .then(res => {
            setUser(res);
            setLoggedInUser(res);
            history.replace(from); 
        })
  }

 ////// Sign out ////////
  const signOut = () => {
      handleSignOut()
      .then(res => {
          setUser(res)
      })
  }

  /// handle submit /// 
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      
    }

    if (!newUser && user.email && user.password) {
      
    }
    e.preventDefault();
  }
  /// handle input Blur ///
  const handleBlur = (e) => {
    let isFieldValid = true;
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value.length);
      isFieldValid = isPasswordValid && passwordHasNumber;
      
    }
    if (isFieldValid) {
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn ? <button onClick={signOut} >Sign out</button> :
        <button onClick={googleSignIn} >Sign in with Google</button>
      }
      <br />
      <button>Sign in using Facebook</button>
      {
        user.isSignedIn && <div>
          <h1>Welcome, {user.name}</h1>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }

      <h1>Our own Authentication</h1>
      <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New user Sign up</label>
      <form onSubmit={handleSubmit} >
        { newUser && <input onBlur={handleBlur} type="text" name="name" placeholder="Your name" required/>}
        <br />
        <input onBlur={handleBlur} type="text" name="email" placeholder="Your email address" required/> 
        <br />
        <input onBlur={handleBlur} type="password" name="password" placeholder="Your password" required/> 
        <br />
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
      </form>
      <p style={{color: 'red'}}>{user.error}</p>
      {
        user.success && <p style={{color: 'green'}}>User {newUser ? 'created' : 'logged in'} successfully</p>
      }
    </div>
  );
}

export default Login;
