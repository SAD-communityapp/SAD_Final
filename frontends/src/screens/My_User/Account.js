import React, { useState,} from "react";
import {View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { H3, Title, Body_Regular, Body_bold, Small_Body_Bold, Small_Body_Regular, Smallest_Body_Regular } from '../../assets/TextStyles';
import Button from "../../components/Button";
import colors from "../../assets/colors/colors";
import Feather from 'react-native-vector-icons/Feather';
import Header from "../../components/Header";

const Account = ({navigation}) =>{
    const [username, setUsername] = useState("小黃雞");
    const handleUsernameChange = (text) => {
        setUsername(text);
    };
    return(
        <View style={{backgroundColor: colors.background_white, height: '100%'}}>
            <Header title="帳號管理"/>
            <View style={{alignItems: 'center', marginTop: 16, gap: 16}}>
                <Image
                    source={require("../../assets/img/image13.png")}
                    style={styles.image}
                />
                <Button primary_filled={true} title = "更換照片"/>
                <TextInput
                    value={username}
                    onChangeText={handleUsernameChange}
                    placeholderTextColor={colors.tertiary_100}
                    style={styles.inputContainer}
                />
            </View>
            <Text style={{...Title, fontWeight: 'bold', marginHorizontal: 20, marginTop: 16,}}>
                基本資料
            </Text>
            <View style={{flexDirection: 'row', marginHorizontal: 20, gap: 24, marginTop: 16,}}>
                <Text style={{...Body_Regular, width: 100}}>
                    真實姓名
                </Text>
                <Text style={{...Body_Regular}}>
                    黃二雞
                </Text>
            </View>
            <View style={{flexDirection: 'row', marginHorizontal: 20, gap: 24, marginTop: 16,}}>
                <Text style={{...Body_Regular, width: 100}}>
                    住址
                </Text>
                <Text style={{...Body_Regular, flex: 1}}>
                    臺北市大安區羅斯福路一段 114 號 5 樓之 1
                </Text>
            </View>
            <View style={{flexDirection: 'row', marginHorizontal: 20, gap: 24, marginTop: 16,}}>
                <Text style={{...Body_Regular, width: 100}}>
                    SKYSCRAPER
                </Text>
                <Text style={{...Body_Regular}}>
                    A 棟 5 樓之一
                </Text>
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
export default Account