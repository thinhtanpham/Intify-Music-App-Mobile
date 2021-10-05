import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import InfomationUser from './UserComponent/InfomationUser';
import UploadMusic from './UserComponent/UploadMusic';
import {StatusBar} from 'react-native';
import MyList from './UserComponent/MyList';

const Tab = createBottomTabNavigator();
export default class User extends Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          options={{
            headerShown: false,
            title: "User"
          }}
          name="InformationUser"
          component={InfomationUser}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            title: "Upload"
          }}
          name="UploadMusic"
          component={UploadMusic}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            title: "My List"
          }}
          name="MyList"
          component={MyList}
        />
      </Tab.Navigator>
    );
  }
}
