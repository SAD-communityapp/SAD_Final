import React, { useState , useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import colors from '../../../assets/colors/colors';
import { H3, Title, Body_Regular, Body_bold, Small_Body_Bold, Small_Body_Regular, Smallest_Body_Regular } from '../../../assets/TextStyles';
// import DataTable from "react-data-table-component";
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../../components/Button';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import TabBar from '../../../components/TabBar';
import Header from '../../../components/Header';

import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    Text,
    useColorScheme,
    Image,
    View,
    TextInput,
    Pressable,
    KeyboardAvoidingView
  } from 'react-native';

const PaymentDetail = ({navigation}) =>{
    const handlePress = () => {

    }

 

    return(
            <View  style={{backgroundColor: colors.background_white, height: '100%'}}>
                <Header title = "超商繳費"/>
                <View style={{marginHorizontal: 20, gap: 16}}>
                    <Text style={{textAlign: 'center', ...Title, fontWeight: 'bold', marginVertical: 16}}>
                        便利商店繳費電子帳單
                    </Text>
                    <View style={styles.container}>
                        <Text style={{...Body_Regular}}>帳    號</Text>
                        <Text>062258711451469</Text>
                    </View>
                    <View style={styles.container}>
                        <Text style={{...Body_Regular}}>戶    名</Text>
                        <Text>社區管理委員會</Text>
                    </View>
                    <View style={styles.container}>
                        <Text style={{...Body_Regular}}>金    額</Text>
                        <Text>1196 </Text>
                    </View>
                    <Text style={{textAlign: 'center', ...Title, fontWeight: 'bold'}}>
                        超商專用條碼區
                    </Text>
                    <Text style={{textAlign: 'center', ...Body_Regular}}>
                        超商手續費: 25 元
                    </Text>
                    <View style={{marginTop: -220}}>
                    <Image source={require("../../../assets/img/barcode.png")} resizeMode= 'contain' style={{ width: "100%" }}></Image>
                    </View>
                    
                </View>

            </View>
        

        
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        borderColor: colors.tertiary_75,
        borderRadius : 10,
        backgroundColor: colors.text_white,
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderraidius: 10
    },
    iconContainer:{
        justifyContent: 'center',
    },
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
  });

export default PaymentDetail