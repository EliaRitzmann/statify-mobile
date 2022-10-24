import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { fetchTopArtists } from '../api/Spotify';
import Element from '../components/Element';

const TopArtists = () => {
    const { accessToken } = useAuth();
    const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    fetchTopArtists(accessToken, "medium_term").then(data => {
      setTopTracks(data.items)
    })
  }, [])

  const renderItem = ({ item, index }) => 
  <Element 
  id={index + 1 + "#"} 
  header={item.name} 
  description={"Popularity: " + item.popularity} 
  image={item.images[0].url}
  link={item.external_urls.spotify}
  ></Element>;

  return (
    <View style={{backgroundColor: "white"}}>
      <FlatList data={topTracks} renderItem={renderItem} keyExtractor={item => item.id}>
      </FlatList>
    </View>
  )
}

export default TopArtists

const styles = StyleSheet.create({})