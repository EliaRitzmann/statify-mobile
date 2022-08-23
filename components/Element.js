import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Element = ({data}) => {
  return (
    <View style={styles.container}>
        <Text >{data.elementId}</Text>
        <Image source={{uri: data.album.images[0].url}} style={styles.image} ></Image>
        <View>
            <Text style={styles.title}>{data.album.name}</Text>
            <Text style={styles.artist}>{data.artists[0].name}</Text>
        </View>
      
    </View>
  )
}

export default Element

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "white",
        margin: 10,
        borderRadius: 20,
        height: 100,
        alignItems: "center",
    },
    image: {
        height: 100,
        width: 100,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        
    },
    title: {
        fontSize: 30,
        marginBottom: 10,
        marginLeft: 10
    },
    artist: {
        fontSize: 20,
        marginLeft: 10
    }
})