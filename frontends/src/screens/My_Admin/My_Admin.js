import React, { useState } from "react";
import {View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { H3, Title, Body_Regular, Body_bold, Small_Body_Bold, Small_Body_Regular, Smallest_Body_Regular } from '../../assets/TextStyles';
import Button from "../../components/Button";
import colors from "../../assets/colors/colors";
import Feather from 'react-native-vector-icons/Feather';


const My_Admin = ({navigation}) =>{
    const handleSignOut = () =>{
        navigation.navigate("SigninScreen")
    }
    return(
        <View style={{backgroundColor: colors.background_white, height: '100%'}}>
            <View style={{ height: 97}}>
                <LinearGradient
                colors={['#FCF3D0', '#D6E2D7', '#BED7DC']}
                style={{ flex: 1, height:97, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}
                >
                <Text style={{ ...H3, fontWeight: 'bold', color: colors.text_white, paddingTop: 49, paddingLeft: 16 }}>
                    管理員
                </Text>
                </LinearGradient>
            </View>
            <View style={{alignItems: 'center', marginTop: 16, gap: 16}}>
                <Image
                    source={require("../../assets/img/image28.png")}
                    style={styles.image}
                />
            </View>
            <Text style={{...Title, fontWeight: 'bold', marginHorizontal: 20, marginTop: 16,}}>
                基本資料
            </Text>
            <View style={{flexDirection: 'row', marginHorizontal: 20, gap: 24, marginTop: 16,}}>
                <Text style={{...Body_Regular, width: 100}}>
                    身分
                </Text>
                <Text style={{...Body_Regular}}>
                    警衛
                </Text>
            </View>   
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
                <Button
                    title="登出"
                    tertiary_outlined={true}
                    style={{
                        height: 40,
                        marginTop: 24,
                        width: 204,
                        marginBottom: 24,
                    }}
                    onPress={handleSignOut}
                />
            </View>         
        </View>
        
    )
}

const styles = StyleSheet.create({
    image: {
        height: 114,
        width: 114,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: colors.tertiary_75,
    },
    table:{
        marginHorizontal: 20,
        backgroundColor: colors.text_white,
        borderRadius: 10,
        marginTop: 16,
    },
    table_body:{
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 16,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: colors.tertiary_50
    },
    table_body_last:{
        flexDirection: 'row',
        paddingVertical: 16,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius:10
    },
    inputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: colors.tertiary_75,
        paddingVertical: 4,
        paddingHorizontal: 12,
        ...Body_Regular,
        width: 200,
        textAlign: 'center',
    },
})
export default My_Admin