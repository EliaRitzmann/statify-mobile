import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Pressable } from "react-native";
import { Text } from 'react-native';

export const StorageTestButton = () => {

  return (
    <Pressable onPress={() => { AsyncStorage.clear(() => console.log("cleared")) } }>
        <Text>Clear Storage</Text>
    </Pressable>
  )
}
