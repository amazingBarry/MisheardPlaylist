import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, Text, Alert } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MusicList from './components/musicList';
import Playlist from './components/playlist';

const Stack = createStackNavigator();

export default function App() {

  const[playlist, setPlaylist] = useState([]);
/*
  addToPlaylist = (newSong) => {
    //setPlaylist([...playlist,newSong]);
    Alert.alert("BOOM");
  }
*/
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        <Stack.Screen
          name="Home"
          component={MusicList}
          options={{title: 'Create Playlist', headerMode:'none'}}
          
        />
        <Stack.Screen name="Playlist" component={Playlist} />
      </Stack.Navigator>

    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
  },
});
