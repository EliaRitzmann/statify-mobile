import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import Element from './Element';
import { fetchRecentlyPlayed, fetchTopTracks } from '../api/Spotify';

const RecentlyPlayed = () => {
    const { accessToken } = useAuth();
    const [topTracks, setTopTracks] = useState([]);
  
    useEffect(() => {
      fetchRecentlyPlayed(accessToken, "medium_term").then(data => {
        setTopTracks(data.items)
        console.log(data.items)
      })
    }, [])

    function formatDate(date){

        var seconds = Math.floor((new Date() - Date.parse(date)) / 1000);
      
        var interval = seconds / 31536000;
      
        if (interval > 1) {
          return Math.floor(interval) + " years ago";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
          return Math.floor(interval) + " months ago";
        }
        interval = seconds / 86400;
        if (interval > 1) {
          return Math.floor(interval) + " days ago";
        }
        interval = seconds / 3600;
        if (interval > 1) {
          return Math.floor(interval) + " hours ago";
        }
        interval = seconds / 60;
        if (interval > 1) {
          return Math.floor(interval) + " minutes ago";
        }
        return Math.floor(seconds) + " seconds ago";
      }
  
    const renderItem = ({ item, index }) => 
    <Element 
    id={formatDate(item.played_at)} 
    header={item.track.name} 
    description={item.track.artists[0].name} 
    image={item.track.album.images[0].url}
    link={item.track.external_urls.spotify}
    ></Element>;    
  
    return (
      <View style={{backgroundColor: "white"}}>
        <Text>Recently Played</Text>
        <FlatList data={topTracks} renderItem={renderItem} keyExtractor={(item, index) => index}>
        </FlatList>
      </View>
    )
  }

export default RecentlyPlayed

const styles = StyleSheet.create({})