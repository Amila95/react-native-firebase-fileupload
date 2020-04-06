// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default class MessageScreen extends React.Component{
//     render(){
//         return(
//             <View style={styles.container}>
//                 <Text>Message Screen</Text>
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
import { View } from 'react-native'
import PDFReader from 'rn-pdf-reader-js'
import { WebView } from 'react-native-webview'

export default class MessageScreen extends React.Component {
    static navigationOptions ={
        title: 'View'
    }

    constructor(props) {
        super(props);
    }
  render() {
      //const {url} = this.props;
      const { navigation } = this.props; 
      const url = navigation.getParam('url'); 
    return (
        
      // <PDFReader
      //   source={{
      //    // uri: 'http://gahp.net/wp-content/uploads/2017/09/sample.pdf',
      //     uri: url
      //   }}
      // />
      <WebView source={{ uri: url }} style={{ marginTop: 20 }} />

    )
  }
}