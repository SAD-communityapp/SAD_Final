/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import colors from './src/assets/colors/colors.js';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

import SigninScreen from './src/screens/SigninScreen/SigninScreen.js';

import Home_User from './src/screens/Home_User/Home.js';
import Services_User from './src/screens/Services_User/Services.js';
import Notification_User from './src/screens/Notification_User/Notification.js';
import My_User from './src/screens/My_User/My.js';
import Account from './src/screens/My_User/Account.js';
import ManagementFeeRecord from './src/screens/My_User/ManagementFeeRecord.js';
import ReservationRecord from './src/screens/My_User/ReservationRecord.js';
import AnnouncementDetail_User from './src/screens/Home_User/AnnouncementDetail.js'
import Reservation_User from './src/screens/Services_User/Reservation/Reservation.js';
import MeetingRoom_User from './src/screens/Services_User/Reservation/MeetingRoom.js';
import ManagementFee_User from './src/screens/Services_User/ManagementFee/ManagementFee.js';
import PaymentDetail_User from './src/screens/Services_User/ManagementFee/PaymentDetail.js';
import Gas from './src/screens/Services_User/Gas/Gas.js';
import Comment from './src/screens/Services_User/Comment/Comment.js';
import CommentDetail from './src/screens/Services_User/Comment/CommentDetail.js';

import Home_Admin from './src/screens/Home_Admin/Home_Admin.js';
import AnnouncementDetail_Admin from './src/screens/Home_Admin/AnnouncementDetail_Admin.js';
import Add_Announcement from './src/screens/Home_Admin/Add_Announcement.js';
import Notification_Admin from './src/screens/Notification_Admin/Notification_Admin.js';
import AddNotification from './src/screens/Notification_Admin/Add_Notification.js';
import My_Admin from './src/screens/My_Admin/My_Admin.js';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()
const HomeName = '主頁';
const ServicesName = '服務';
const NotificationName = '通知';
const MyName = '個人';


function SigninSignoutStackNavigator(){
  return(
    <Stack.Navigator
        initialRouteName = 'SigninScreen'
      >
        <Stack.Screen
          name = "SigninScreen"
          component = {SigninScreen}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen name="MainAppUser" component={MainAppUser} options={{ headerShown: false }} />
        <Stack.Screen name="MainAppAdmin" component={MainAppAdmin} options={{ headerShown: false }} />
      </Stack.Navigator>
  )
}

const App = () => {
  return (
    
    <NavigationContainer>
      <SigninSignoutStackNavigator/>
    </NavigationContainer>
  );
}

//User
function HomeStackNavigator_User(){
  return(
    <Stack.Navigator
        initialRouteName = 'Home'
        screenOptions={{
          header: (props) => <NavBarUser/>,
        }}
      >
        <Stack.Screen
          name = "Home"
          component = {Home_User}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen name="AnnouncementDetail" component={AnnouncementDetail_User} options={{ headerShown: false }} />
      </Stack.Navigator>
  )
}

function ServicesStackNavigator_User(){
  return(
    <Stack.Navigator
        initialRouteName = 'Services'
        screenOptions={{
          header: (props) => <NavBarUser/>,
        }}
      >
        <Stack.Screen
          name = "Services"
          component = {Services_User}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen name="Reservation" component={Reservation_User} options={{ headerShown: false }}/>
        <Stack.Screen name="MeetingRoom" component={MeetingRoom_User} options={{headerShown: false}}/>
        <Stack.Screen name="ManagementFee" component={ManagementFee_User} options={{headerShown: false}}/>
        <Stack.Screen name="PaymentDetail" component={PaymentDetail_User} options={{headerShown: false}}/>
        <Stack.Screen name="Gas" component={Gas} options={{headerShown: false}}/>
        <Stack.Screen name="Comment" component={Comment} options={{headerShown: false}}/>
        <Stack.Screen name="CommentDetail" component={CommentDetail} options={{headerShown: false}}/>

      </Stack.Navigator>
  )
}

function MyStackNavigator_User(){
  return(
    <Stack.Navigator
        initialRouteName = 'My'
        screenOptions={{
          header: (props) => <NavBarUser/>,
        }}
      >
        <Stack.Screen
          name = "My"
          component = {My_User}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen name="Account" component={Account} options={{ headerShown: false }}/>
        <Stack.Screen name="ManagementFeeRecord" component={ManagementFeeRecord} options={{ headerShown: false }}/>
        <Stack.Screen name="ReservationRecord" component={ReservationRecord} options={{ headerShown: false }}/>

      </Stack.Navigator>
  )
}

//Admin

function HomeStackNavigator_Admin(){
  return(
    <Stack.Navigator
        initialRouteName = 'Home'
        screenOptions={{
          header: (props) => <NavBarAdmin/>,
        }}
      >
        <Stack.Screen
          name = "Home_Admin"
          component = {Home_Admin}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen name="AnnouncementDetail" component={AnnouncementDetail_Admin} options={{ headerShown: false }} />
        <Stack.Screen name="Add_Announcement" component={Add_Announcement} options={{ headerShown: false }} />
      </Stack.Navigator>
  )
}

function ServicesStackNavigator_Admin(){
  return(
    <Stack.Navigator
        initialRouteName = 'Services'
        screenOptions={{
          header: (props) => <NavBarUser/>,
        }}
      >
        <Stack.Screen
          name = "Services"
          component = {Services_User}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen name="Reservation" component={Reservation_User} options={{ headerShown: false }}/>
        <Stack.Screen name="MeetingRoom" component={MeetingRoom_User} options={{headerShown: false}}/>
        <Stack.Screen name="ManagementFee" component={ManagementFee_User} options={{headerShown: false}}/>
        <Stack.Screen name="PaymentDetail" component={PaymentDetail_User} options={{headerShown: false}}/>

      </Stack.Navigator>
  )
}

function NotificationStackNavigator_Admin(){
  return(
    <Stack.Navigator
        initialRouteName = 'Notification'
        screenOptions={{
          header: (props) => <NavBarUser/>,
        }}
      >
        <Stack.Screen
          name = "Notification"
          component = {Notification_Admin}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="AddNotification" component={AddNotification} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
};

function NavBarUser(){
  return (
    
      <Tab.Navigator
          initialRouteName={HomeName}
          screenOptions={({ route }) => ({
              headerShown: false,
              tabBarActiveTintColor: colors.primary_100,
              tabBarInactiveTintColor: colors.text_black,
              tabBarShowLabel: true,
              tabBarStyle: 
              {
                  height: 107,
                  paddingBottom: 28,
                  paddingTop: 24,
                  paddingHorizontal: 0, //this brings them further together and produces the desired prensentation.
                  alignContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors.text_white,
              },

              tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  let rn = route.name;

                  if (rn == HomeName) {
                      return focused ? <Ionicons name={'home'} size={28} color={colors.primary_100} /> : <Ionicons name={'home-outline'} size={28} color={colors.text_black} />
                  } else if (rn == ServicesName) {
                      return focused ? <AntDesign name="appstore1" size={28} color={colors.primary_100} /> : <AntDesign name={'appstore-o'} size={28} color={colors.text_black} />
                  } else if (rn == NotificationName) {
                      return focused ? <Octicons name="bell-fill" size={28} color={colors.primary_100} /> : <Octicons name={'bell'} size={28} color={colors.text_black} />
                  } else {
                      return focused ? <Octicons name="person-fill" size={28} color={colors.primary_100} /> : <Octicons name={'person'} size={28} color={colors.text_black} />
                  }
              },

          })}>
              <Tab.Screen name={HomeName} component={HomeStackNavigator_User} />
              <Tab.Screen name={ServicesName} component={ServicesStackNavigator_User} />
              <Tab.Screen name={NotificationName} component={Notification_User} />
              <Tab.Screen name={MyName} component={MyStackNavigator_User} />
    </Tab.Navigator>
  );
}

function NavBarAdmin(){
  return (
    
      <Tab.Navigator
          initialRouteName={HomeName}
          screenOptions={({ route }) => ({
              headerShown: false,
              tabBarActiveTintColor: colors.primary_100,
              tabBarInactiveTintColor: colors.text_black,
              tabBarShowLabel: true,
              tabBarStyle: 
              {
                  height: 107,
                  paddingBottom: 28,
                  paddingTop: 24,
                  paddingHorizontal: 0, //this brings them further together and produces the desired prensentation.
                  alignContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors.text_white,
              },

              tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  let rn = route.name;

                  if (rn == HomeName) {
                      return focused ? <Ionicons name={'home'} size={28} color={colors.primary_100} /> : <Ionicons name={'home-outline'} size={28} color={colors.text_black} />
                  } else if (rn == ServicesName) {
                      return focused ? <AntDesign name="appstore1" size={28} color={colors.primary_100} /> : <AntDesign name={'appstore-o'} size={28} color={colors.text_black} />
                  } else if (rn == NotificationName) {
                      return focused ? <Octicons name="bell-fill" size={28} color={colors.primary_100} /> : <Octicons name={'bell'} size={28} color={colors.text_black} />
                  } else {
                      return focused ? <Octicons name="person-fill" size={28} color={colors.primary_100} /> : <Octicons name={'person'} size={28} color={colors.text_black} />
                  }
              },

          })}>
              <Tab.Screen name={HomeName} component={HomeStackNavigator_Admin} />
              <Tab.Screen name={ServicesName} component={ServicesStackNavigator_Admin} />
              <Tab.Screen name={NotificationName} component={NotificationStackNavigator_Admin} />
              <Tab.Screen name={MyName} component={My_Admin} />
    </Tab.Navigator>
  );
}

const MainAppUser = () => {
  return (
    <NavBarUser/>
  );
};

const MainAppAdmin = () => {
  return (
    <NavBarAdmin/>
  );
};

export default App;