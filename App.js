import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import MessageScreen from './screens/MessageScreen';
import NotificationScreen from './screens/NotificationScreen';
import PostScreen from './screens/PostScreen';

import * as firebase from 'firebase';
import 'firebase/firestore';



import { decode, encode } from 'base-64'
global.crypto = require("@firebase/firestore");
global.crypto.getRandomValues = byteArray => { for (let i = 0; i < byteArray.length; i++) { byteArray[i] = Math.floor(256 * Math.random()); } }

if (!global.btoa) { global.btoa = encode; }

if (!global.atob) { global.atob = decode; }


var firebaseConfig = {
  apiKey: "AIzaSyC7UjK6ub0hwFqLENnNYS8-4C4BjAXsdDM",
  authDomain: "class-f4034.firebaseapp.com",
  databaseURL: "https://class-f4034.firebaseio.com",
  projectId: "class-f4034",
  storageBucket: "class-f4034.appspot.com",
  messagingSenderId: "247137520863",
  appId: "1:247137520863:web:94ea1a3a96ad1da31ded6a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//var AppDispatcher = require('../Dispatcher/Dispatcher');
//var EventEmitter = require('events').EventEmitter;
//require('events').EventEmitter.prototype._maxListeners = 100;

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  View: MessageScreen
});

const AppContainer = createStackNavigator(
  {
    default: createBottomTabNavigator({
      Home:{
        screen:HomeStack,
        navigationOptions:{
          tabBarIcon:({tintColor})=><Ionicons name="ios-home" size={24} color={tintColor}/>
        }
      },
      // Message:{
      //   screen:MessageScreen,
      //   navigationOptions:{
      //     tabBarIcon:({tintColor})=><Ionicons name="ios-chatboxes" size={24} color={tintColor}/>
      //   }
      // },
      Post:{
        screen:PostScreen,
        navigationOptions:{
          tabBarIcon:({tintColor})=><Ionicons name="ios-add-circle" size={48} 
          color="#E9446A"
          style={{
            shadowColor: "#E9446A",
            shadowOffset:{width: 0, height: 0},
            shadowRadius: 10,
            shadowOpacity: 0.3
          }}
          />
        }
      },
      // Notification:{
      //   screen:NotificationScreen,
      //   navigationOptions:{
      //     tabBarIcon:({tintColor})=><Ionicons name="ios-notifications" size={24} color={tintColor}/>
      //   }
      // },
      Profile:{
        screen:ProfileScreen,
        navigationOptions:{
          tabBarIcon:({tintColor})=><Ionicons name="ios-person" size={24} color={tintColor}/>
        }
      },
    
    },{
      defaultNavigationOptions:{
        tabBarOptions:({navigation, defaultHandler}) =>{
          if(navigation.state.key === "Post"){
            navigation.navigate("postModal")
          }else{
            defaultHandler()
          }
        }
      },
      tabBarOptions:{
        activeTintColor: "#161F30",
        inactiveTintColor: "#8888CA",
        showLabel: false
      }
    
    }),
    postModal:{
      screen: PostScreen
    }
  },
  {
    mode:"modal",
    headerMode:"none"
    
  }
)

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppContainer,
      Auth: AuthStack,
    },
    {
      initialRouteName: "Loading",
    },
  ),
);
