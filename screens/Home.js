import { SafeAreaView, StyleSheet, Text, View, Button, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { StorageTestButton } from '../components/StorageTestButton'
import { fetchMe, fetchRecentlyPlayed, fetchTopTracks } from '../api/Spotify'
import Element from '../components/Element'

const Home = () => {
    const { accessToken, logOut} = useAuth()

    const [user, setUser] = useState([]);
    const [recently, setRecently] = useState([]);

  useEffect(() => {
    fetchMe(accessToken).then(data => {
      setUser(data)
      console.log(data)
    })
  }, [])

  useEffect(() => {
    fetchTopTracks(accessToken).then(data => {
      setRecently(data.items)
    })
  })


  const renderItem = ({ item, index }) => 
  <Element 
  id={index + 1 } 
  header={"item.album.name"} 
  description={"item.artists[0].name"} 
  image={"item.album.images[0].url"}
  link={"item.external_urls.spotify"}
  ></Element>;

  return (
    <SafeAreaView style={{backgroundColor: "white", height: "100%"}}>
      <Text>hi-ya {user.display_name}</Text>
      <FlatList data={recently} renderItem={renderItem} keyExtractor={item => item.id}>
      </FlatList>
      
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