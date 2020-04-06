// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default class ProfileScreen extends React.Component{
//     render(){
//         return(
//             <View style={styles.container}>
//                 <Text>Profile Screen</Text>
//             </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container:{
//         flex: 1,
//         justifyContent: "center"
//     }
// })

import * as React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import PDFReader from 'rn-pdf-reader-js'

export default class ProfileScreen extends React.Component {
    static navigationOptions ={
        title: 'About'
    }

    constructor(props) {
        super(props);
    }
  render() {
      //const {url} = this.props;
      const { navigation } = this.props; 
      const url = navigation.getParam('url'); 
    return (
        
        <View style={ styles.container }>
        <Image source={require("../assets/das.jpg")} style={styles.backgroundImage}>
            
            
        </Image>
      </View>
    )
  }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        height:"80%",
        width:"120%",
        resizeMode: 'cover', // or 'stretch'
    },
    loginForm: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
});