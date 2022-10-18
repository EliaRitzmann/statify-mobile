import { SafeAreaView, StyleSheet, Text, View, Button, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { StorageTestButton } from '../components/StorageTestButton'
import { fetchMe, fetchRecentlyPlayed, fetchTopTracks } from '../api/Spotify'
import Element from '../components/Element'
import RecentlyPlayed from '../components/RecentlyPlayed'

const Home = () => {
    const { accessToken, logOut} = useAuth()

    const [user, setUser] = useState([]);

  useEffect(() => {
    fetchMe(accessToken).then(data => {
      setUser(data)
      console.log(data)
    })
  }, [])


  return (
    <SafeAreaView style={{backgroundColor: "white", height: "100%"}}>
      <Text>hi-ya {user.display_name}</Text>
      <RecentlyPlayed></RecentlyPlayed>
      
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