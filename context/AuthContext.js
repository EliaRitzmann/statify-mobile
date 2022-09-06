import { createContext, useContext, useEffect, useState } from "react";
import {
  CodeChallengeMethod,
  makeRedirectUri,
  ResponseType,
  useAuthRequest,
  AccessTokenRequest,
  GrantType,
  exchangeCodeAsync,
  RefreshTokenRequest,
  refreshAsync
} from "expo-auth-session";
import { Alert } from "react-native";
import { getClientID } from "../api/Spotify";
import AsyncStorage from '@react-native-async-storage/async-storage';

const userAuthContext = createContext();

export function useAuth() {
  return useContext(userAuthContext);
}


export function UserAuthContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresAt, setExpiresAt] = useState();
  
  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };


  const login = () => {
    promptAsync()
  }


  const logOut = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setExpiresAt(null);
  }


  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: getClientID(),
      usePKCE: true,
      responseType: ResponseType.code,
      scopes: ["user-read-email", "user-top-read"],
      codeChallengeMethod: CodeChallengeMethod.S256,
      redirectUri: makeRedirectUri({
        scheme: "react-native-oauth2",
      }),
    },
    discovery
  );


  useEffect(() => {
    if (response?.type === "success") {
      fetchAccessToken();
    }
  }, [response]);


  const fetchAccessToken = () => {
    const { code } = response.params;
    const accessTokenConfig = new AccessTokenRequest({
      clientId: getClientID(),
      code: code,
      grantType: GrantType.AuthorizationCode,
      scopes: ["user-read-email", "user-top-read"],
      extraParams: {
        code_verifier: request.codeVerifier,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      redirectUri: makeRedirectUri({
        scheme: "react-native-oauth2",
      }),
    })
    exchangeCodeAsync(accessTokenConfig, { tokenEndpoint: discovery.tokenEndpoint })
    .then(res => {
      setAccessToken(res.accessToken);
      AsyncStorage.setItem("accessToken", res.accessToken);
      setRefreshToken(res.refreshToken);
      AsyncStorage.setItem("refreshToken", res.refreshToken);
      var now = new Date();
      const millis = (now.valueOf()+(res.expiresIn*1000)+(res.expiresIn*1000)).toString();
      AsyncStorage.setItem("expiresAt", millis);
      setExpiresAt("expiresAt", millis);
    })
  }


  const setStoredRefreshToken = async () => {
    await AsyncStorage.getItem("refreshToken")
    .then(refresh => setRefreshToken(refresh))
  };


  const setStoredExpiresAt = async () => {
    await AsyncStorage.getItem("expiresAt")
    .then(expiresAt => setExpiresAt(expiresAt))
  };

  const setStoredAccessToken = async () => {
    await AsyncStorage.getItem("accessToken")
    .then(accessToken => setAccessToken(accessToken))
  };



  setStoredRefreshToken();
  setStoredExpiresAt();
  setStoredAccessToken();


  useEffect(() => {
    if (refreshToken != null) {
      var date = new Date();
      if (date.valueOf() > parseInt(expiresAt))
        refreshAccessToken();
    }
  }, [refreshToken])

  
  const refreshAccessToken = () => {
    console.log(refreshToken);
    const refreshConfig = new RefreshTokenRequest({
      clientId: getClientID(),
      refreshToken: refreshToken,
      grantType: GrantType.RefreshToken,
      scopes: ["user-read-email", "user-top-read"],
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })

    refreshAsync(refreshConfig, { tokenEndpoint: discovery.tokenEndpoint })
    .then(res => {
      console.log(res);
      setAccessToken(res.accessToken);
      AsyncStorage.setItem("accessToken", res.accessToken);
      var date = new Date();
      setExpiresAt(date.valueOf()+(res.expiresIn*1000));
      AsyncStorage.setItem("expiresAt", (date.valueOf()+(res.expiresIn*1000)).toString())
    })
    .catch(err => console.log(err))
  }


  const value = {
    accessToken,
    refreshToken,
    login,
    logOut
  }


  return (
    <userAuthContext.Provider value={value}>
      {!loading && children}
    </userAuthContext.Provider>
  )
}