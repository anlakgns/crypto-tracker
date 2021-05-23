import { createContext } from "react";
import {useAuth} from "../hooks/authHook"

export const AuthContext = createContext();

export const AuthProvider = (props) => {

  const [
    handleLogin,
    handleLogout,
    handleVerify,
    handleSignUp,
    state,
    dispatch,
    ACTIONS,
  ] = useAuth();

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleLogout,
        handleVerify,
        handleSignUp,
        state,
        dispatch,
        ACTIONS,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
