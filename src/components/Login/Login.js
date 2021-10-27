import React, { useContext } from 'react';
// import * as firebase from "firebase/app";
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';


firebase.initializeApp(firebaseConfig);


function Login() {
  const provider = new firebase.auth.GoogleAuthProvider();
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

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  //////// Sign in ////////
  const handleSignIn = () =>{
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const { displayName, email, photoURL } = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedInUser);

      console.log(res);
    })
    .catch(err =>{
      console.log(err);
      console.log(err.message);
    })
  }

  ////// Sign Out //////
  const handleSignOut = () =>{
    firebase.auth().signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false
      }
      setUser(signedOutUser);
    })
    .catch(err => {

    })
  }
  /// handle submit /// 
  const handleSubmit = (e) => {
    // console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then( res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        updateUserName(user.name);
      })
      .catch(error => {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      })
    }

    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = {...user};
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          console.log('signed in user info: ', res.user);
       })
        .catch((error) => {
          const newUserInfo = {...user};
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
       });
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
  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(() => {
      console.log('Username updated successfully');
    }).catch((error) => {
      console.log(error);
    });  
  }
  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn ? <button onClick={handleSignOut} >Sign out</button> :
        <button onClick={handleSignIn} >Sign in with Google</button>
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
