import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useAuth } from '../context/AuthContext'

const Home = () => {
    const {accessToken, logOut} = useAuth()
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <Text>Token: {accessToken}</Text>
      <Button title="logOut" onPress={() => logOut()}></Button>
    </SafeAreaView>
  )
}

{/*
<SafeAreaView>
      <Text>Home</Text>
      <Text>Token: {accessToken}</Text>
      <Button title="logOut" onPress={() => logOut()}></Button>
    </SafeAreaView>
*/}

export default Home

const styles = StyleSheet.create({})