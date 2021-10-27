import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

//////// Sign in ////////
export const handleGoogleSignIn = () =>{
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      const { displayName, email, photoURL } = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      return signedInUser;

      console.log(res);
    })
    .catch(err =>{
      console.log(err);
      console.log(err.message);
    })
  }

   ////// Sign Out //////
 export const handleSignOut = () =>{
    return firebase.auth().signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false
      }
      return signedOutUser;
    })
    .catch(err => {

    })
  }

//   export const createUserWithEmailAndPassword = () => {
//     firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//     .then( res => {
//       const newUserInfo = {...user};
//       newUserInfo.error = '';
//       newUserInfo.success = true;
//       setUser(newUserInfo);
//       updateUserName(user.name);
//     })
//     .catch(error => {
//       const newUserInfo = {...user};
//       newUserInfo.error = error.message;
//       newUserInfo.success = false;
//       setUser(newUserInfo);
//     })
//   }

//   export const signInWithEmailAndPassword = () => {
//     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//     .then(res => {
//       const newUserInfo = {...user};
//       newUserInfo.error = '';
//       newUserInfo.success = true;
//       setUser(newUserInfo);
//       setLoggedInUser(newUserInfo);
//       history.replace(from);
//       console.log('signed in user info: ', res.user);
//    })
//     .catch((error) => {
//       const newUserInfo = {...user};
//       newUserInfo.error = error.message;
//       newUserInfo.success = false;
//       setUser(newUserInfo);
//    });
//   }


//     const updateUserName = name => {
//     const user = firebase.auth().currentUser;

//     user.updateProfile({
//       displayName: name
//     }).then(() => {
//       console.log('Username updated successfully');
//     }).catch((error) => {
//       console.log(error);
//     });  
//   }