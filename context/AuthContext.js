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


  AsyncStorage.getItem("refreshToken")
    .then((data) => {
      if (data != null) {
        setRefreshToken(data);
      }
  })


  useEffect(() => {
    if (refreshToken != null) {
      refreshAccessToken();
    }
  }, [refreshToken]);


  const login = () => {
    promptAsync();
  }


  const logOut = () => {
    setRefreshToken(null);
    AsyncStorage.removeItem("refreshToken");
    setExpiresAt(null);
    AsyncStorage.removeItem("expiresAt");
    setAccessToken(null);
    AsyncStorage.removeItem("accessToken");
  }


  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: getClientID(),
      usePKCE: true,
      responseType: ResponseType.code,
      scopes: ["user-read-email", "user-top-read", "user-read-private", "user-read-email", "user-read-recently-played"],
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
      scopes: ["user-read-email", "user-top-read", "user-read-private", "user-read-email", "user-read-recently-played"],
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
      var expiryTime = (now.valueOf()+(res.expiresIn*1000)).toString();
      AsyncStorage.setItem("expiresAt", expiryTime);
      setExpiresAt("expiresAt", expiryTime);
    })
  }

  
  const refreshAccessToken = () => {
    const isExpired = AsyncStorage.getItem("expiresAt")
    .then(expiryTime => {
      let now = new Date();
      if (now.valueOf() < parseInt(expiryTime)) {
        return false;
      } else return true;
    })
    .catch((err) => console.log(err))  


    const refreshConfig = new RefreshTokenRequest({
      clientId: getClientID(),
      refreshToken: refreshToken,
      grantType: GrantType.RefreshToken,
      scopes: ["user-read-email", "user-top-read", "user-read-private", "user-read-email" ,"user-read-recently-played"],
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })


    isExpired.then(isExpired => {
      if (isExpired) {
        console.log("refreshing...")
        refreshAsync(refreshConfig, { tokenEndpoint: discovery.tokenEndpoint })
        .then(res => {
          AsyncStorage.setItem("accessToken", res.accessToken);
          setAccessToken(res.accessToken);
          let now = new Date();
          setExpiresAt(now.valueOf()+(res.expiresIn*1000));
          AsyncStorage.setItem("expiresAt", (now.valueOf()+(res.expiresIn*1000)).toString());
        })
        .catch(err => console.log(err))
      } else {
        AsyncStorage.getItem("accessToken").then(accessTk => {
          setAccessToken(accessTk);
        })
      }
    })
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