import { useEffect, useReducer } from "react";
import fire from "../../../fire";

const ACTIONS = {
  LOGIN : "login",
  VERIFY: "verify",
  VERIFYFAIL: "verifyFail",
  SIGNUP: "signUp",
  CATCHFAIL: "catchFail",
  LOGOUT : "logOut",
  AUTHCHANGEON: "authChangeOn",
  AUTHCHANGEOFF: "authChangeOff",
  SETSPINNER: "setSpinner",
  SETSNACK: "setSnack",
  SETERRORMESSAGE: "setErrorMessage"
}


const reducerFn = (state, action) => {
  switch(action.type) {
    case ACTIONS.LOGIN : {
      return {
      ...state,
      isLoggedIn: true,
      newUser: false,
      spinner: false }
    }
    case ACTIONS.VERIFY: {
      return {
        ...state,
        emailSent: true,
        snackOpen: true,
        emailSentError: "",
      }
    }
    case ACTIONS.VERIFYFAIL : {
      return {
        ...state,
        emailSentError: action.payload,
        snackOpen: true
      }
    }
    case ACTIONS.SIGNUP: {
      return {
        ...state,
        newUser: true,
        isLoggedIn: true,
        spinner: false,
      }
    }
    case ACTIONS.CATCHFAIL: {
      return {
        ...state,
        spinner: false,
        errorMessage: action.payload
      }
    }
    case ACTIONS.LOGOUT : {
      return {
        ...state,
        isLoggedIn: false,
        spinner: false,
        emailSent: false,
        newUser: false,
        errorMessage: "",
      }
    }
    case ACTIONS.AUTHCHANGEON : {
      return {
        ...state,
        userInfo: action.payload,
      }
    }
    case ACTIONS.AUTHCHANGEOFF : {
      return {
        ...state,
        userInfo: action.payload,
      }
    }
    case ACTIONS.SETSNACK : {
      return {
        ...state,
        snackOpen : action.payload
      }
    }
    case ACTIONS.SETERRORMESSAGE : {
      return {
        ...state,
        errorMessage: action.payload
      }
    }
    case ACTIONS.SETSPINNER: {
      return {
        ...state,
        spinner: action.payload
      }
    }
    default : {
      return state
    }
  }

}

export const useAuth = () => {
  const [state, dispatch] = useReducer(reducerFn, {
    userInfo : "",
    isLoggedIn: false,
    emailSent: false,
    snackOpen: false,
    emailSentError: null,
    spinner: false,
    errorMessage: "",
    newUser: false,
  })

  const handleLogin = (email, password) => {
    dispatch({type: ACTIONS.SETSPINNER, payload: true })
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        dispatch({type: ACTIONS.LOGIN })

      })
      .catch((err) => {
        let errorMsg;
        switch (err.code) {
          case "auth/invalid-email":
            errorMsg =  "The email address is not valid. Please enter a valid email."
            break;
          case "auth/user-disabled":
            errorMsg = "Invalid email or password. Please check again.";
            break;
          case "auth/user-not-found":
            errorMsg = "The is no user corresponding to the given email. Please check again."
            break;
          case "auth/wrong-password":
            errorMsg = "Invalid password. Please check again."
            break;
          default:
        }
        dispatch({type: ACTIONS.CATCHFAIL, payload: errorMsg  })
      });
  };
  const handleVerify = () => {
    let actionCodeSettings = {
      url: "http://localhost:3000/",
      handleCodeInApp: true,
    };

    let user = fire.auth().currentUser;
    user
      .sendEmailVerification(actionCodeSettings)
      .then(function () {
        console.log("Email succesfully send.");
        dispatch({type: ACTIONS.VERIFY })

      })
      .catch(function (error) {
        console.log("Something wrong. Please try again.");
        dispatch({type: ACTIONS.VERIFYFAIL, payload: error })

      });
  };
  const handleSignUp = (email, password) => {
    dispatch({type: ACTIONS.SPINNERON})
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        dispatch({type: ACTIONS.SIGNUP })

      })
      .then(() => {
        handleVerify();
      })
      .catch((err) => {
        console.log(err);
        let errorMsg;
        switch (err.code) {
          case "auth/email-already-in-use":
             errorMsg =  "The email already exists. Please use another email address."
            break;
          case "auth/invalid-email":
            errorMsg = "Invalid email address. Please check again."
            break;
          case "auth/operation-not-allowed":
            errorMsg = "Invalid email address. Please check again."
            break;
          case "auth/weak-password":
            errorMsg = "The password is not strong enough. Please use an password having at least 6 characters."
            break;
          default: errorMsg = null;
        }
        dispatch({type: ACTIONS.CATCHFAIL, payload: errorMsg })

      });
  };
  const handleLogout = async () => {
    dispatch({type: ACTIONS.SETSPINNER, payload: true })
    await fire.auth().signOut();
    dispatch({type: ACTIONS.LOGOUT })
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({type: ACTIONS.AUTHCHANGEON, payload: user })
      } else {
        dispatch({type: ACTIONS.AUTHCHANGEON, payload: "" })
      }
      ;
    });
  };
  useEffect(() => {
    authListener();
  }, []);

  return [
    handleLogin,
    handleLogout,
    handleVerify,
    handleSignUp,
    state,
    dispatch,
    ACTIONS,
  ];
};
