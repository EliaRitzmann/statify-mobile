import { Button, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { fetchMe } from '../api/Spotify';

const Profile = () => {
    const { accessToken, logOut } = useAuth();

  const [user, setUser] = useState([]);

  useEffect(() => {
    fetchMe(accessToken).then((data) => {
      setUser(data);
      console.log(data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{user.display_name}</Text>
      <Text style={styles.text}>{user.email}</Text>
      <Button title="logOut" onPress={() => logOut()}></Button>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
      },
      text: {
        fontSize: 24,
        marginVertical: 16,
      }
})