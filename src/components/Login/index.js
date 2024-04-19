// import {Component} from 'react'
// import firebase from 'firebase/app'; // Import only the base Firebase module
// import 'firebase/auth'; // Import the Firebase authentication module
// import Cookies from 'js-cookie'
// import {Redirect} from 'react-router-dom'
// import './index.css'

// const auth=firebase.auth();
// firebase.initializeApp({
//   apiKey: "AIzaSyBNrXbsbOt35ZjFkZZA9F4_78fleZgHt1A",

//   authDomain: "signin-6363d.firebaseapp.com",

//   projectId: "signin-6363d",

//   storageBucket: "signin-6363d.appspot.com",

//   messagingSenderId: "79416377053",

//   appId: "1:79416377053:web:32ebcac363472264dca534"

// })

// class Login extends Component {
//   state = {
//     username: '',
//     password: '',
//     errorMsg: '',
//     showErrorMsg: false,
//     user:null,
//   }
// componentDidMount() {
//     auth.onAuthStateChanged((person) => {
//       if (person) {
//         this.setState({ user: person });
//       } else {
//         this.setState({ user: null });
//       }
//     });
//   }

//  google=async()=>{
//   try{
// await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())

//   }

//   catch{

//   }
//  }
//   onSuccessLogin = jwtToken => {
//     Cookies.set('jwt_token', jwtToken, {expires: 30})
//     const {history} = this.props
//     history.replace('/')
//   }

//   onFailureLogin = errorMsg => {
//     this.setState({errorMsg, showErrorMsg: true})
//   }

//   onSubmitForm = async event => {
//     event.preventDefault()
//     let {username, password} = this.state

//     if (username.toLowerCase().trim(' ') === 'santosh') username = 'rahul'
//     if (password === 'santosh@2023') password = 'rahul@2021'

//     const userDetails = {username, password}
//     const LoginApiUrl = 'https://apis.ccbp.in/login'
//     const options = {
//       method: 'POST',
//       body: JSON.stringify(userDetails),
//     }
//     const response = await fetch(LoginApiUrl, options)
//     const data = await response.json()

//     if (response.ok === true) {
//       this.onSuccessLogin(data.jwt_token)
//     } else {
//       this.onFailureLogin(data.error_msg)
//     }
//   }

//   updateUsername = event => this.setState({username: event.target.value})

//   updatePassword = event => this.setState({password: event.target.value})

//   renderUsernameField = () => {
//     const {username} = this.state
//     return (
//       <div className="input-field-container">
//         <label htmlFor="username" className="login-input-label">
//           USERNAME
//         </label>
//         <input
//           type="text"
//           value={username}
//           className="login-input-field"
//           placeholder="santosh"
//           id="username"
//           onChange={this.updateUsername}
//         />
//       </div>
//     )
//   }

//   renderPasswordField = () => {
//     const {password} = this.state
//     return (
//       <div className="input-field-container">
//         <label htmlFor="password" className="login-input-label">
//           PASSWORD
//         </label>
//         <input
//           type="password"
//           value={password}
//           className="login-input-field"
//           placeholder="santosh@2023"
//           id="password"
//           onChange={this.updatePassword}
//         />
//       </div>
//     )
//   }

//   render() {
//     const jwtToken = Cookies.get('jwt_token')
//     if (jwtToken !== undefined) {
//       return <Redirect to="/" />
//     }
//     const {errorMsg, showErrorMsg} = this.state
//     return (
//       <div className="login-container">
//         <form className="login-form" onSubmit={this.onSubmitForm}>
//           <img
//             src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
//             alt="website logo"
//             className="website-logo-login-form"
//           />
//           {this.renderUsernameField()}
//           {this.renderPasswordField()}
//           <div>
//             <button onClick={this.google()}>google</button>
//             <button type="submit" className="login-button">
//               Login
//             </button>
//             {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
//           </div>
//         </form>
//       </div>
//     )
//   }
// }

// export default Login

import React, { Component } from 'react';
import { Google } from '@mui/icons-material'; 
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { ClipLoader } from 'react-spinners';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import './index.css';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBNrXbsbOt35ZjFkZZA9F4_78fleZgHt1A",

   authDomain: "signin-6363d.firebaseapp.com",

   projectId: "signin-6363d",

   storageBucket: "signin-6363d.appspot.com",

   messagingSenderId: "79416377053",

   appId: "1:79416377053:web:32ebcac363472264dca534"
 
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showErrorMsg: false,
    user: null,
    success:false,
    gitsuccess:false,
  }
 
  
  onSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, { expires: 30 });
    const { history } = this.props;
    history.replace('/');
  }
  signOut=()=>{
    auth.signOut()
    console.log(`yes${this.state.user}`)

    
  }

    github = async () => {
      this.setState({gitsuccess:true})
      const userDetails = { username:"henry",password:"henry_the_developer"};
      const LoginApiUrl = 'https://apis.ccbp.in/login';
      const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
      };
      try {
        await auth.signInWithPopup(new firebase.auth.GithubAuthProvider());
       
        await auth.onAuthStateChanged((person) => {
          console.log(person)
          console.log(person.photoURL);
          console.log(person.displayName)
          Cookies.set("profile", person.displayName, { expires: 30 });
          Cookies.set("profileUrl", person.photoURL, { expires: 30 });
          Cookies.set("email", person.email, { expires: 30 });
        })
        const response = await fetch(LoginApiUrl, options);
        const data = await response.json();
  
        if (response.ok === true) {
          this.onSuccessLogin(data.jwt_token);
        } else {
          this.onFailureLogin(data.error_msg);
        }
      } catch (error) {
        console.error(error);
      }
    }
  

  google = async () => {
    this.setState({success:true})
    const userDetails = { username:"henry",password:"henry_the_developer"};
    const LoginApiUrl = 'https://apis.ccbp.in/login';
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    };

    try {
      await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
   await auth.onAuthStateChanged((person) => {
    console.log(person)
        console.log(person.photoURL);
        Cookies.set("profile", person.displayName, { expires: 30 });
        Cookies.set("profileUrl", person.photoURL, { expires: 30 });
              Cookies.set("email", person.email, { expires: 30 });
      })
      const response = await fetch(LoginApiUrl, options);
      const data = await response.json();

      if (response.ok === true) {
        this.onSuccessLogin(data.jwt_token);
      } else {
        this.onFailureLogin(data.error_msg);
      }
    } catch (error) {
      console.error(error);
    }
  }



  onFailureLogin = errorMsg => {
    this.setState({ errorMsg, showErrorMsg: true });
  }

 

  updateUsername = event => this.setState({ username: event.target.value })

  updatePassword = event => this.setState({ password: event.target.value })

  renderUsernameField = () => {
    const { username } = this.state;
    return (
      <div className="input-field-container">
        <label htmlFor="username" className="login-input-label">
          USERNAME
        </label>
        <input
          type="text"
          value={username}
          className="login-input-field"
          placeholder="Enter your username"
          id="username"
          onChange={this.updateUsername}
        />
      </div>
    );
  }

  renderPasswordField = () => {
    const { password,success } = this.state;
    return (
      <div className="input-field-container">
        <label htmlFor="password" className="login-input-label">
          PASSWORD
        </label>
        <input
          type="password"
          value={password}
          className="login-input-field"
          placeholder="Enter your password"
          id="password"
          onChange={this.updatePassword}
        />
      </div>
    );
  }

  render() {
    const jwtToken = Cookies.get('jwt_token');
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const { errorMsg, showErrorMsg,user,success,gitsuccess } = this.state;
    return (
      <div className="login-container">
        <div className="login-form">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo-login-form"
          />
       
          <div>
           
            <button onClick={this.google} className="login-button">
         { success?   <ClipLoader color="white" size={17} />   : <div className="icons"><img className="google" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8MZbrexS_jJJVoToqLeAcb7xZ8RwPqkDlcDZHdYYg7A&s"/><span>Sign in with Google</span></div>}
            </button >
            <br/>
            <br/>
          <button onClick={this.github} className="login-button" style={{backgroundColor:"green"}}>
          { gitsuccess?   <ClipLoader color="white" size={17} /> 
            :<div className="icons"><img className="google" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3LJ1Nm8T1Ynsp4wcGA4V4JiabL8fMG0KibFpbTKJ7fQ&s"
          /><span>Sign in with GitHub</span></div>}
          </button>
           

            {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

