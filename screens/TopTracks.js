import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { fetchTopTracks } from '../api/Spotify';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from "react";

const TopTracks = () => {

  const { accessToken } = useAuth();
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    fetchTopTracks(accessToken, "medium_term").then(data => {
      setTopTracks(data)
    })
  }, [])

  useEffect(() => {
    const items = topTracks.items
    if (items == undefined) return
    for (var i = 0; i < items.length; i++) {
      var artist = items[i].artists[0].name;
      var title = items[i].album.name;
      var cover = items[i].album.images[0].url;
      var uri = items[i].album.uri;
      console.log(cover)
      //setCards
    }
  }, [topTracks]);

  return (
    <View>
      <Text>TopTracks</Text>
    </View>
  )
}

export default TopTracks

const styles = StyleSheet.create({})