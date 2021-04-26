import {useState, useEffect } from 'react'
import fire from "../../../fire"


export const useAuth = () => {

  const [userInfo, setUserInfo] = useState("")  
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [snackOpen, setSnackOpen] = useState(false)
  const [emailSentError, setEmailSentError] = useState()
  const [spinner, setSpinner] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newUser, setNewUser] = useState(false);
  

  const handleLogin = (email, password) => {
  setSpinner(true)
  fire
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(()=> {
      setIsLoggedIn(true)
      setNewUser(false)
      setSpinner(false)
    })
    .catch(err => {
      setSpinner(false)
      console.log(err)
      switch (err.code) {
        case "auth/invalid-email":
          setErrorMessage("The email address is not valid. Please enter a valid email.")
          break;
        case "auth/user-disabled":
          setErrorMessage("Invalid email or password. Please check again.")
          break;
        case "auth/user-not-found":
          setErrorMessage("The is no user corresponding to the given email. Please check again.")
          break;
        case "auth/wrong-password":
          setErrorMessage("Invalid password. Please check again.")
          break;
        default:  
      }
    })
  }
  const handleVerify = () => {
    let actionCodeSettings = {
      url : "http://localhost:3000/",
      handleCodeInApp: true
    }

    let user = fire.auth().currentUser;
    user.sendEmailVerification(actionCodeSettings).then(function() {
      console.log("Email succesfully send.")
      setEmailSent(true)
      setSnackOpen(true)
      setEmailSentError("")
    }).catch(function(error) {
      console.log("Something wrong. Please try again.")
      setEmailSentError(error)
      setSnackOpen(true)
    });
  }
  const handleSignUp = (email, password)=> {
    setSpinner(true)
  fire
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(()=> {
      setNewUser(true)
      setIsLoggedIn(true)
      setSpinner(false)
      
    })
    .then(()=> {
      handleVerify()
    })
    .catch(err => {
      setSpinner(false)
      console.log(err)
      switch (err.code) {
        case "auth/email-already-in-use":
          setErrorMessage("The email already exists. Please use another email address.")
          break;
        case "auth/invalid-email":
          setErrorMessage("Invalid email address. Please check again.")
          break;
        case "auth/operation-not-allowed":
          setErrorMessage("Invalid email address. Please check again.")
          break;
        case "auth/weak-password":
          setErrorMessage("The password is not strong enough. Please use an password having at least 6 characters.")
          break;
        default:  
      }
    
    })
  }
  const handleLogout = async ()=> {
    setSpinner(true)
    await fire.auth().signOut();
    setIsLoggedIn(false)
    setSpinner(false)
    setEmailSent(false)
    setNewUser(false)
    setErrorMessage("")
  }
  
  const authListener = ()=> {
  fire.auth().onAuthStateChanged(user => {
    if(user) {
      setUserInfo(user)
      setIsLoggedIn(true)
    }else
      setUserInfo("");
  })
  }
  useEffect(()=> {
  authListener()
  }, [])


  return [
    handleLogin, 
    handleLogout, 
    isLoggedIn, 
    handleSignUp, 
    userInfo, 
    spinner, 
    errorMessage,
    setErrorMessage, 
    handleVerify, 
    emailSent, 
    setEmailSent, 
    setEmailSentError, 
    emailSentError, 
    snackOpen,
    newUser,
    setSnackOpen,
     ]
}