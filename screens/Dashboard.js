import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchMe } from "../api/Spotify";
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 

const Dashboard = ({navigation}) => {
    const { accessToken } = useAuth();

  const [user, setUser] = useState([]);

  useEffect(() => {
    fetchMe(accessToken).then((data) => {
      setUser(data);
      console.log(data);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{marginTop: 50}}>Hey {user.display_name}</Text>
      <Text>Have a grat day</Text>
       
      <View style={styles.profile}>
        <View style={styles.navbar}>
          <TouchableOpacity
            onPress={() => navigation.push("RecentlyPlayed")}
            style={styles.profileButton}
          >
            <Entypo name="back-in-time" size={40} color="black" />
          </TouchableOpacity>
          <Text style={{fontSize: 32, color: "#1DB954", fontWeight: "600"}}>Statify</Text>
          <TouchableOpacity
            onPress={() => navigation.push("Profile")}
            style={styles.profileButton}
          >
            <Feather name="user" size={40} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        
      },
    profile: {
        position: "absolute",
        top: 50,
        width: "95%",
      },
      profileButton: {
        color: "red",
      },
    navbar: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      },
})