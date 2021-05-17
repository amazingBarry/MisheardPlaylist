import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, ListItem, ScrollView, Alert, TouchableHighlight, ToastAndroid } from 'react-native';
import update from 'immutability-helper';
import RNEventSource from 'react-native-event-source';
import { Icon } from 'react-native-elements';
//play-circle-filled

export default class MusicList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message : 'Empty',
            songs : [],
            unalteredSongs: [
                {
                    title : "Gangnam Style",
                    artist : "Psy",
                    icon : "",
                    track : ""
                },{
                    title : "I Love It",
                    artist : "Icona Pop",
                    icon : "",
                    track : ""
                },{
                    title : "Bicycle",
                    artist : "Queen",
                    icon : "",
                    track : ""
                },{
                    title : "Teenage Dream",
                    artist : "Katy Perry",
                    icon : "",
                    track : ""
                },{
                    title : "Gangnam Style",
                    artist : "Psy",
                    icon : "",
                    track : ""
                },{
                    title : "I Love It",
                    artist : "Icona Pop",
                    icon : "",
                    track : ""
                },{
                    title : "Bicycle",
                    artist : "Queen",
                    icon : "",
                    track : ""
                },{
                    title : "Teenage Dream",
                    artist : "Katy Perry",
                    icon : "",
                    track : ""
                },{
                    title : "Gangnam Style",
                    artist : "Psy",
                    icon : "",
                    track : ""
                },{
                    title : "I Love It",
                    artist : "Icona Pop",
                    icon : "",
                    track : ""
                },{
                    title : "Bicycle",
                    artist : "Queen",
                    icon : "",
                    track : ""
                },{
                    title : "Teenage Dream",
                    artist : "Katy Perry",
                    icon : "",
                    track : ""
                },{
                    title : "Gangnam Style",
                    artist : "Psy",
                    icon : "",
                    track : ""
                },{
                    title : "I Love It",
                    artist : "Icona Pop",
                    icon : "",
                    track : ""
                },{
                    title : "Bicycle",
                    artist : "Queen",
                    icon : "",
                    track : ""
                },{
                    title : "Teenage Dream",
                    artist : "Katy Perry",
                    icon : "",
                    track : ""
                },   
            ],
            replacements: [
                {
                    title : "Two Tickets to Paradise",
                    artist : "Eddie Money",
                    icon : "",
                    track : ""
                }, {
                    title : "We Built This City",
                    artist : "Starship",
                    icon : "",
                    track : ""
                }, {
                    title : "I Want it That Way",
                    artist : "Backstreet Boys",
                    icon : "",
                    track : ""
                }, 
            ]
        }
        //Ive got 2 chickens to paralyze
        //We built this city on sausage rolls
        //Tummy why? Ain’t nothing but a fart hey, ain’t nothing but a meat steak
        this.playSong = this.playSong.bind(this);
    }

    playSong = (index) => {
        
        ToastAndroid.show(this.state.songs[index].title + " added to Playlist", ToastAndroid.SHORT);
        this.setState({
            songs: update(this.state.songs, {[index]: {title: {$set: "I changed"}}})
        });
    }

    componentDidMount() {
        //copy unalertedSongs into songs
        this.setState({songs:[...this.state.unalteredSongs]});
        const source = new RNEventSource("http://amazingbarry.com/playlist/getValues.php?session=1");

        //This is what gets fired with every server change
        source.addEventListener('message',(event) => {
            
            // Do no work if the message hasn't changed 
            if(event.data!==this.state.message) {
                this.setState({message:event.data});

                // We populate a tmpSongs instead of just replacing values because we want to revert to the old songs if they change
                // Failure to do so can lead to duplicate songs
                var tmpSongs = [...this.state.unalteredSongs];
                JSON.parse(event.data).map((item,index) => {
                    tmpSongs[item.Position - 1] = this.state.replacements[item.SongKey - 1];
                    /*
                    this.setState({
                        songs: update(this.state.songs, {[item.Position - 1]: {$set: this.state.replacements[item.SongKey - 1]}})
                    });
                    */
                });
                this.setState({songs : [...tmpSongs]});
            }
            
        });
    }
    

  render() {
    return (
        <View style={styles.container}>
            <TouchableHighlight style={styles.floatButton} onPress={() => Alert.alert("hi")}>
                <Icon name="play-circle-filled" size={75} color="orange" onPress={() => this.props.navigation.navigate('Playlist')}/>
            </TouchableHighlight>
            <ScrollView style={styles.container}>
            {
                this.state.songs.map((item,i) => (
                        <TouchableHighlight key={i} onPress={() => this.playSong(i)}>
                            <View style={styles.item}>
                                <Text style={styles.itemPosition}>{i + 1}</Text>
                                <View style={styles.songText}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.artist}>{item.artist}</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    )
                )
            }
            </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22,
   width: "100%",
   backgroundColor:"#aaaaaa"
  },
  floatButton: {
      position: 'absolute',
      right : 0,
      bottom : 0,
      zIndex :10
  },
  item: {
    padding: 10,
    fontSize: 24,
    borderBottomWidth:1,
    backgroundColor:"#ffffff",
    flexDirection:"row"

  },
  itemPosition: {
      fontSize:20,
      width:30,
      justifyContent: "center",
      alignSelf: "center"

  },
  songText: {
      justifyContent:"space-around"
  },
  title:{
      fontSize:18,
      fontWeight:"bold"
  },
  artist:{},
})
