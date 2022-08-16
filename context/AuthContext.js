import { createContext, useContext, useEffect, useState } from "react";

import {
  makeRedirectUri,
  ResponseType,
  useAuthRequest,
} from "expo-auth-session";

import { Alert } from "react-native";
import { getClientID } from "../api/Spotify";

//Create Context
const userAuthContext = createContext();

//Provider
export function useAuth() {
  return useContext(userAuthContext);
}

export function UserAuthContextProvider({ children }) {
  const [accessToken, setAccessToken] = useState();
  const [loading, setLoading] = useState(false);

  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  const login = () => {
    console.log("press")
    promptAsync()
  }

  const logOut = () => {
    setAccessToken(null)
  }

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: getClientID(),
      scopes: ["user-read-email", "user-top-read"],
      usePKCE: false,
      redirectUri: makeRedirectUri({
        scheme: "react-native-oauth2",
      }),
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setAccessToken(access_token)
    }
  }, [response]);

  const value = {
    accessToken,
    login,
    logOut
  }

  return (
    <userAuthContext.Provider value={value}>
      {!loading && children}
    </userAuthContext.Provider>
  )
}