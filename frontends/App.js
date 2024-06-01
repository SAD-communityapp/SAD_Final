"use strict";
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
Object.defineProperty(exports, "__esModule", { value: true });
var bottom_tabs_1 = require("@react-navigation/bottom-tabs");
var native_1 = require("@react-navigation/native");
var native_stack_1 = require("@react-navigation/native-stack");
var react_1 = require("react");
var colors_js_1 = require("./src/assets/colors/colors.js");
var AntDesign_1 = require("react-native-vector-icons/AntDesign");
var Ionicons_1 = require("react-native-vector-icons/Ionicons");
var Octicons_1 = require("react-native-vector-icons/Octicons");
var SigninScreen_js_1 = require("./src/screens/SigninScreen/SigninScreen.js");
var Home_js_1 = require("./src/screens/Home_User/Home.js");
var Services_js_1 = require("./src/screens/Services_User/Services.js");
var Notification_js_1 = require("./src/screens/Notification_User/Notification.js");
var My_js_1 = require("./src/screens/My_User/My.js");
var Account_js_1 = require("./src/screens/My_User/Account.js");
var ManagementFeeRecord_js_1 = require("./src/screens/My_User/ManagementFeeRecord.js");
var ReservationRecord_js_1 = require("./src/screens/My_User/ReservationRecord.js");
var AnnouncementDetail_js_1 = require("./src/screens/Home_User/AnnouncementDetail.js");
var Reservation_js_1 = require("./src/screens/Services_User/Reservation/Reservation.js");
var MeetingRoom_js_1 = require("./src/screens/Services_User/Reservation/MeetingRoom.js");
var ManagementFee_js_1 = require("./src/screens/Services_User/ManagementFee/ManagementFee.js");
var PaymentDetail_js_1 = require("./src/screens/Services_User/ManagementFee/PaymentDetail.js");
var Gas_js_1 = require("./src/screens/Services_User/Gas/Gas.js");
var Comment_js_1 = require("./src/screens/Services_User/Comment/Comment.js");
var CommentDetail_js_1 = require("./src/screens/Services_User/Comment/CommentDetail.js");
var Home_Admin_js_1 = require("./src/screens/Home_Admin/Home_Admin.js");
var AnnouncementDetail_Admin_js_1 = require("./src/screens/Home_Admin/AnnouncementDetail_Admin.js");
var Add_Announcement_js_1 = require("./src/screens/Home_Admin/Add_Announcement.js");
var Notification_Admin_js_1 = require("./src/screens/Notification_Admin/Notification_Admin.js");
var Add_Notification_js_1 = require("./src/screens/Notification_Admin/Add_Notification.js");
var My_Admin_js_1 = require("./src/screens/My_Admin/My_Admin.js");
var Tab = (0, bottom_tabs_1.createBottomTabNavigator)();
var Stack = (0, native_stack_1.createNativeStackNavigator)();
var HomeName = '主頁';
var ServicesName = '服務';
var NotificationName = '通知';
var MyName = '個人';
function SigninSignoutStackNavigator() {
    return (<Stack.Navigator initialRouteName='SigninScreen'>
        <Stack.Screen name="SigninScreen" component={SigninScreen_js_1.default} options={{
            headerShown: false
        }}/>
        <Stack.Screen name="MainAppUser" component={MainAppUser} options={{ headerShown: false }}/>
        <Stack.Screen name="MainAppAdmin" component={MainAppAdmin} options={{ headerShown: false }}/>
      </Stack.Navigator>);
}
var App = function () {
    return (<native_1.NavigationContainer>
      <SigninSignoutStackNavigator />
    </native_1.NavigationContainer>);
};
//User
function HomeStackNavigator_User() {
    return (<Stack.Navigator initialRouteName='Home' screenOptions={{
            header: function (props) { return <NavBarUser />; },
        }}>
        <Stack.Screen name="Home" component={Home_js_1.default} options={{
            headerShown: false
        }}/>
        <Stack.Screen name="AnnouncementDetail" component={AnnouncementDetail_js_1.default} options={{ headerShown: false }}/>
      </Stack.Navigator>);
}
function ServicesStackNavigator_User() {
    return (<Stack.Navigator initialRouteName='Services' screenOptions={{
            header: function (props) { return <NavBarUser />; },
        }}>
        <Stack.Screen name="Services" component={Services_js_1.default} options={{
            headerShown: false
        }}/>
        <Stack.Screen name="Reservation" component={Reservation_js_1.default} options={{ headerShown: false }}/>
        <Stack.Screen name="MeetingRoom" component={MeetingRoom_js_1.default} options={{ headerShown: false }}/>
        <Stack.Screen name="ManagementFee" component={ManagementFee_js_1.default} options={{ headerShown: false }}/>
        <Stack.Screen name="PaymentDetail" component={PaymentDetail_js_1.default} options={{ headerShown: false }}/>
        <Stack.Screen name="Gas" component={Gas_js_1.default} options={{ headerShown: false }}/>
        <Stack.Screen name="Comment" component={Comment_js_1.default} options={{ headerShown: false }}/>
        <Stack.Screen name="CommentDetail" component={CommentDetail_js_1.default} options={{ headerShown: false }}/>

      </Stack.Navigator>);
}
function MyStackNavigator_User() {
    return (<Stack.Navigator initialRouteName='My' screenOptions={{
            header: function (props) { return <NavBarUser />; },
        }}>
        <Stack.Screen name="My" component={My_js_1.default} options={{
            headerShown: false
        }}/>
        <Stack.Screen name="Account" component={Account_js_1.default} options={{ headerShown: false }}/>
        <Stack.Screen name="ManagementFeeRecord" component={ManagementFeeRecord_js_1.default} options={{ headerShown: false }}/>
        <Stack.Screen name="ReservationRecord" component={ReservationRecord_js_1.default} options={{ headerShown: false }}/>

      </Stack.Navigator>);
}
//Admin
function HomeStackNavigator_Admin() {
    return (<Stack.Navigator initialRouteName='Home' screenOptions={{
            header: function (props) { return <NavBarAdmin />; },
        }}>
        <Stack.Screen name="Home_Admin" component={Home_Admin_js_1.default} options={{
            headerShown: false
        }}/>
        <Stack.Screen name="AnnouncementDetail" component={AnnouncementDetail_Admin_js_1.default} options={{ headerShown: false }}/>
        <Stack.Screen name="Add_Announcement" component={Add_Announcement_js_1.default} options={{ headerShown: false }}/>
      </Stack.Navigator>);
}
function ServicesStackNavigator_Admin() {
    return (<Stack.Navigator initialRouteName='Services' screenOptions={{
            header: function (props) { return <NavBarUser />; },
        }}>
        <Stack.Screen name="Services" component={Services_js_1.default} options={{
            headerShown: false
        }}/>
        <Stack.Screen name="Reservation" component={Reservation_js_1.default} options={{ headerShown: false }}/>
        <Stack.Screen name="MeetingRoom" component={MeetingRoom_js_1.default} options={{ headerShown: false }}/>
        <Stack.Screen name="ManagementFee" component={ManagementFee_js_1.default} options={{ headerShown: false }}/>
        <Stack.Screen name="PaymentDetail" component={PaymentDetail_js_1.default} options={{ headerShown: false }}/>

      </Stack.Navigator>);
}
function NotificationStackNavigator_Admin() {
    return (<Stack.Navigator initialRouteName='Notification' screenOptions={{
            header: function (props) { return <NavBarUser />; },
        }}>
        <Stack.Screen name="Notification" component={Notification_Admin_js_1.default} options={{
            headerShown: false
        }}/>
        <Stack.Screen name="AddNotification" component={Add_Notification_js_1.default} options={{ headerShown: false }}/>
    </Stack.Navigator>);
}
;
function NavBarUser() {
    return (<Tab.Navigator initialRouteName={HomeName} screenOptions={function (_a) {
            var route = _a.route;
            return ({
                headerShown: false,
                tabBarActiveTintColor: colors_js_1.default.primary_100,
                tabBarInactiveTintColor: colors_js_1.default.text_black,
                tabBarShowLabel: true,
                tabBarStyle: {
                    height: 107,
                    paddingBottom: 28,
                    paddingTop: 24,
                    paddingHorizontal: 0,
                    alignContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors_js_1.default.text_white,
                },
                tabBarIcon: function (_a) {
                    var focused = _a.focused, color = _a.color, size = _a.size;
                    var iconName;
                    var rn = route.name;
                    if (rn == HomeName) {
                        return focused ? <Ionicons_1.default name={'home'} size={28} color={colors_js_1.default.primary_100}/> : <Ionicons_1.default name={'home-outline'} size={28} color={colors_js_1.default.text_black}/>;
                    }
                    else if (rn == ServicesName) {
                        return focused ? <AntDesign_1.default name="appstore1" size={28} color={colors_js_1.default.primary_100}/> : <AntDesign_1.default name={'appstore-o'} size={28} color={colors_js_1.default.text_black}/>;
                    }
                    else if (rn == NotificationName) {
                        return focused ? <Octicons_1.default name="bell-fill" size={28} color={colors_js_1.default.primary_100}/> : <Octicons_1.default name={'bell'} size={28} color={colors_js_1.default.text_black}/>;
                    }
                    else {
                        return focused ? <Octicons_1.default name="person-fill" size={28} color={colors_js_1.default.primary_100}/> : <Octicons_1.default name={'person'} size={28} color={colors_js_1.default.text_black}/>;
                    }
                },
            });
        }}>
              <Tab.Screen name={HomeName} component={HomeStackNavigator_User}/>
              <Tab.Screen name={ServicesName} component={ServicesStackNavigator_User}/>
              <Tab.Screen name={NotificationName} component={Notification_js_1.default}/>
              <Tab.Screen name={MyName} component={MyStackNavigator_User}/>
    </Tab.Navigator>);
}
function NavBarAdmin() {
    return (<Tab.Navigator initialRouteName={HomeName} screenOptions={function (_a) {
            var route = _a.route;
            return ({
                headerShown: false,
                tabBarActiveTintColor: colors_js_1.default.primary_100,
                tabBarInactiveTintColor: colors_js_1.default.text_black,
                tabBarShowLabel: true,
                tabBarStyle: {
                    height: 107,
                    paddingBottom: 28,
                    paddingTop: 24,
                    paddingHorizontal: 0,
                    alignContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors_js_1.default.text_white,
                },
                tabBarIcon: function (_a) {
                    var focused = _a.focused, color = _a.color, size = _a.size;
                    var iconName;
                    var rn = route.name;
                    if (rn == HomeName) {
                        return focused ? <Ionicons_1.default name={'home'} size={28} color={colors_js_1.default.primary_100}/> : <Ionicons_1.default name={'home-outline'} size={28} color={colors_js_1.default.text_black}/>;
                    }
                    else if (rn == ServicesName) {
                        return focused ? <AntDesign_1.default name="appstore1" size={28} color={colors_js_1.default.primary_100}/> : <AntDesign_1.default name={'appstore-o'} size={28} color={colors_js_1.default.text_black}/>;
                    }
                    else if (rn == NotificationName) {
                        return focused ? <Octicons_1.default name="bell-fill" size={28} color={colors_js_1.default.primary_100}/> : <Octicons_1.default name={'bell'} size={28} color={colors_js_1.default.text_black}/>;
                    }
                    else {
                        return focused ? <Octicons_1.default name="person-fill" size={28} color={colors_js_1.default.primary_100}/> : <Octicons_1.default name={'person'} size={28} color={colors_js_1.default.text_black}/>;
                    }
                },
            });
        }}>
              <Tab.Screen name={HomeName} component={HomeStackNavigator_Admin}/>
              <Tab.Screen name={ServicesName} component={ServicesStackNavigator_Admin}/>
              <Tab.Screen name={NotificationName} component={NotificationStackNavigator_Admin}/>
              <Tab.Screen name={MyName} component={My_Admin_js_1.default}/>
    </Tab.Navigator>);
}
var MainAppUser = function () {
    return (<NavBarUser />);
};
var MainAppAdmin = function () {
    return (<NavBarAdmin />);
};
exports.default = App;
