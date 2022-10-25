import { Button, SafeAreaView, StyleSheet, Text } from "react-native";
import React from "react";
import { useAuth } from "../context/AuthContext";

const AuthScreen = () => {
  const { login } = useAuth();

  return (
    <SafeAreaView>
      <Text>AuthScreen</Text>
      <Button title="Login" onPress={login}></Button>
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({});
