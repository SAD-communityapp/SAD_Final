import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Modal,TouchableWithoutFeedback, FlatList } from 'react-native'
import React, { useState , useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import {H4, Title, Body_Regular} from '../../assets/TextStyles';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../../components/Header';


const PaymentItem = (props) => {
    const navigation = useNavigation()
    
    const { address, payTime, amount, title} = props;
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={{...Title, fontWeight: 'bold', color: colors.text_black}}>
                    {title}
                </Text>
                <Text style={{...Title, fontWeight: 'bold', color: colors.primary_100}}>
                    已繳交
                </Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={{...Body_Regular, color: colors.text_black}}>
                    住址
                </Text>
                <Text style={{...Body_Regular, color: colors.text_black}}>
                    {address}
                </Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={{...Body_Regular, color: colors.text_black}}>
                    繳費日期
                </Text>
                <Text style={{...Body_Regular, color: colors.text_black}}>
                    {payTime}
                </Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={{...Body_Regular, color: colors.text_black}}>
                    總計費用
                </Text>
                <Text style={{...Body_Regular, color: colors.text_black}}>
                    {amount}
                </Text>
            </View>
            
            
    </View>
    );
};

const ManagementFeeRecord = ({ route }) => {
    useEffect(() => {
        if (route.params === 'records') {
            setActiveTab(route.params);
        }
    }, [route.params]);

    return (
        <View style={{backgroundColor: colors.background_white, height: '100%'}}>
            <Header title = "管理費繳費紀錄"/>
            <ScrollView style={{ flex: 1, marginHorizontal: 20, marginTop: 16 }}>
                <View style={{gap: 16}}>
                    <PaymentItem title="113 年 1 月管理費" payTime="2024-01-04 21:59" amount = "1196" address = "114 號 5 樓之 1" method = "超商繳費"/>
                    <PaymentItem title="112 年 12 月管理費" payTime="2024-12-10 18:32" amount = "1196" address = "114 號 5 樓之 1" method = "超商繳費"/>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.text_white,
        padding: 16,
        borderRadius: 10,
        flex: 1,
        gap: 16
    },
    textContainer:{
        flexDirection: 'row',
        flex: 1,
        justifyContent : 'space-between',
    }

});

export default ManagementFeeRecord;