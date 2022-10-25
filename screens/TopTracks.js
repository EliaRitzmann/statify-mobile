import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { fetchTopTracks } from "../api/Spotify";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import Element from "../components/Element";

const TopTracks = () => {
  const { accessToken } = useAuth();
  const [topTracks, setTopTracks] = useState([]);

  console.log(topTracks)

  useEffect(() => {
    fetchTopTracks(accessToken, "medium_term").then((data) => {
      setTopTracks(data.items);
    });
  }, []);

  const renderItem = ({ item, index }) => (
    <Element
      id={index + 1 + "#"}
      header={item.name}
      description={item.artists[0].name}
      image={item.album.images[0].url}
      link={item.external_urls.spotify}
    ></Element>
  );

  return (
    <View style={{ backgroundColor: "white" }}>
      <FlatList
        data={topTracks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </View>
  );
};

export default TopTracks;

const styles = StyleSheet.create({});
