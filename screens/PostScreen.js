import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Contants from "expo-constants";
import * as Permissions from "expo-permissions";
import Fire from "../fire";
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
// import Pdf from 'react-native-pdf';

const firebase = require("firebase");
require("firebase/firestore");

export default class PostScreen extends React.Component{
    state ={
        loading:false,
        text:"",
        image: null,
        type:null,
        loadingLink: false
    }
    imageUri = this.state.image !=null ? this.state.image : "";
    componentDidMount(){
        this.getPhotoPermission();
    }

    
    getPhotoPermission = async () =>{
        if(Contants.platform.ios){
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if(status != "granted"){
                alert("We need permission to access your camera roll")
            }
        }
    };

    handlePost =() =>{
        this.setState({loading: true})
        {this.state.image != null?
            
        Fire.shared
        .addPost({ text: this.state.text.trim(), localUrl: this.state.image, type: this.state.type})
        .then(ref =>{
            this.setState({ text:"", image: null, type: null, loading:false});
            this.props.navigation.goBack();
        })
        
        .catch(error =>{
            alert(error);
        }
        )
        :
        Fire.shared
        .addTextPost({ text: this.state.text.trim()})
        .then(ref =>{
            this.setState({ text:"", image: null, type: null,loading:false});
            this.props.navigation.goBack();
        })
        .catch(error =>{
            alert(error);
        }
        )
    }
    }

    pickImage = async () =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        });
        if(!result.cancelled){
            console.log("result.uri"+ result.uri);
            this.setState({image: result.uri, type:"image"})
        }
    };

    pickDoc = async () =>{
        let result = await DocumentPicker.getDocumentAsync();
        if(!result.cancelled){
            console.log("result.uri"+ result.uri);
            this.setState({image: result.uri, type:"doc"})
        }
    };

    pickLink = async () =>{
        // let result = await DocumentPicker.getDocumentAsync();
        // if(!result.cancelled){
        //     console.log("result.uri"+ result.uri);
        //     this.setState({image: result.uri, type:"link"})
        // }
        this.setState({
            loadingLink: !this.state.loadingLink
        })
        if(!this.state.loadingLink){
            this.setState({
                type: "link"
            })
        }
    };

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
                        <Ionicons name="md-arrow-back" size={24} color="#DE09DB"></Ionicons>
                    </TouchableOpacity>
                    {!this.state.loading?
                    <TouchableOpacity onPress={this.handlePost}>
                        <Text style={{fontWeight: "500"}}>
                            Post
                        </Text>
                    </TouchableOpacity>:
                    <ActivityIndicator size="large" />
                }
                </View>
                <View style={styles.inputContainer}>
                    <Image source={require("../assets/8.jpg")} style={styles.avatar}></Image>
                    <TextInput
                    autoFocus={true}
                    multiline={true}
                    numberOfLines={4}
                    style={{flex:1}}
                    placeholder="Want to Share something"
                    onChangeText={text => this.setState({text})}
                    value={this.state.text}
                    // onChangeText={email=> this.setState({email}) }
                    // value={this.state.email}
                    >

                    </TextInput>
                    

                </View>
                <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
                    <Ionicons name="md-camera" size={32}  color="#D8D9DB" ></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity style={styles.photo} onPress={this.pickDoc}>
                    <Ionicons name="md-attach" size={32} color="#D8D9DB" ></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity style={styles.photo} onPress={this.pickLink}>
                    <Ionicons name="ios-link" size={32} color="#D8D9DB" ></Ionicons>
                </TouchableOpacity>
                </View>
                {this.state.type =="image"?
                <View style={{ marginHorizontal: 32, marginTop: 32, height:150}}>
                    <Image source={this.state.image !=null ?{uri: this.state.image}: null} style={{width:"100%", height:"100%"}}></Image>
                </View>:null}
                {this.state.type =="doc" && this.state.image !=null?
                <View style={{ marginHorizontal: 32, marginTop: 32, height:150}}>
                    <Image source={require("../assets/pdficon.png")} style={styles.postImagePdf}></Image>
                </View>:null}
                {this.state.loadingLink ?
                <View style={styles.inputContainer}>
                    {/* <Image source={require("../assets/8.jpg")} style={styles.avatar}></Image> */}
                    <TextInput
                    autoFocus={true}
                    multiline={true}
                    numberOfLines={4}
                    style={{flex:1}}
                    placeholder="add you tube url"
                    onChangeText={image => this.setState({image})}
                    value={this.state.image}
                    // onChangeText={email=> this.setState({email}) }
                    // value={this.state.email}
                    >

                    </TextInput>
                    

                </View>: null}
                {/* <Pdf
                    source={{uri: this.state.image}}
                    style={styles.pdf}/> */}

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#D8D9DB"
    },
    inputContainer:{
        margin: 32,
        flexDirection:"row"
    },
    avatar: {
        width: 48,
        height:48,
        //boarderRadius: 24,
        marginRight:16,
        borderRadius: 400/ 2
    },
    photo:{
        alignItems:"flex-end",
        marginHorizontal:32
    },
    postImagePdf: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginVertical: 16
    },
})