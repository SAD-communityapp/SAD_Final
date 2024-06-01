import React, { useState,} from "react";
import {View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { H3, Title, Body_Regular, Body_bold, Small_Body_Bold, Small_Body_Regular, Smallest_Body_Regular } from '../../../assets/TextStyles';
import Button from "../../../components/Button";
import colors from "../../../assets/colors/colors";
import Header from "../../../components/Header";


const Gas = () => {
    const [gas, setGas] = useState("");
    const [sended, setSended] = useState(false);
    const [currentDate, setCurrentDate] = useState("2024/01/29");

    const handleGasChange = (text) => {
        setGas(text);
    };

    const handleGas = () => {
        const today = new Date();
        const formattedDate = `${today.getFullYear()}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getDate().toString().padStart(2, '0')}`;
        setCurrentDate(formattedDate);
        setSended(true);
    };

    return (
        <View style={{ backgroundColor: colors.background_white, height: '100%' }}>
            <Header title="瓦斯抄表" />
            <Text style={{ ...Title, fontWeight: 'bold', marginHorizontal: 20, marginTop: 16 }}>
                114 號 5 樓之一
            </Text>
            <View style={{ flexDirection: 'row', marginHorizontal: 20, gap: 24, marginTop: 16, alignSelf: 'center' }}>
                <Text style={{ ...Body_Regular, width: 100 }}>
                    上次填表
                </Text>
                <Text style={{ ...Body_Regular }}>
                    {currentDate}
                </Text>
            </View>
            <View style={{ flexDirection: 'row', marginHorizontal: 20, gap: 24, marginTop: 16, alignSelf: 'center' }}>
                <Text style={{ ...Body_Regular, width: 100 }}>
                    本期狀態
                </Text>
                <Text style={{ ...Body_Regular, color: sended ? colors.success : colors.notification }}>
                    {sended ? '本期已抄錶' : '尚未抄錶'}
                </Text>
            </View>
            {!sended && (
                <View style={{ flexDirection: 'row', gap: 16, alignSelf: 'center', marginTop: 16 }}>
                    <TextInput
                        placeholder="請輸入瓦斯錶度數"
                        placeholderTextColor={colors.tertiary_100}
                        value={gas}
                        onChangeText={handleGasChange}
                        style={styles.inputContainer}
                    />
                    <Button primary_filled={true} title="送出" disabled={!gas} onPress={handleGas} />
                </View>
            )}
            <View style={{alignSelf: 'center', marginTop: 16 }}>
                <Image
                    source={require("../../../assets/img/image29.png")}
                />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
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
        borderColor: colors.tertiary_50,
        borderWidth: 1,
        borderRadius : 10,
        backgroundColor: colors.text_white,
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderraidius: 10,
        ...Body_Regular,
    },
})
export default Gas