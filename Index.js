import React from 'react'

import { useAuth } from './context/AuthContext'
import AuthScreen from './screens/AuthScreen'
import Home from './screens/Home'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TopTracks from './screens/TopTracks'

const Index = () => {
    const { accessToken } = useAuth()
    const Tab = createBottomTabNavigator()

    if(accessToken){
        return (<Tab.Navigator>
            <Tab.Screen name='Home' component={Home}></Tab.Screen>
            <Tab.Screen name='TopTracks' component={TopTracks}></Tab.Screen>
        </Tab.Navigator>)
    }else{
        return <AuthScreen></AuthScreen>
    }


}

export default Index