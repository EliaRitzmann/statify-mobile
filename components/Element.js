import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import React from "react";

const Element = ({ header, description, image, id, link }) => {
  const openSpotify = () => {
    Linking.canOpenURL(link).then((supported) => {
      if (supported) {
        Linking.openURL(link);
      } else {
        console.log("Don't know how to open URI: " + link);
      }
    });
  };

  return (
    <TouchableNativeFeedback onPress={openSpotify}>
      <View style={styles.container}>
        <Image source={{ uri: image }} style={styles.image}></Image>
        <View>
          <Text style={{ fontSize: 12, marginLeft: 10 }}>{id}</Text>
          <Text style={styles.title}>{header}</Text>
          <Text style={styles.artist}>{description}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default Element;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    margin: 10,
    height: 100,
    alignItems: "center",
    padding: 10,
  },
  image: {
    height: 90,
    width: 90,
  },
  title: {
    fontSize: 30,
    marginBottom: 1,
    marginLeft: 10,
  },
  artist: {
    fontSize: 20,
    marginLeft: 10,
  },
});
