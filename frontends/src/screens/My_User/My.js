import React from "react";
import {View, Text, ScrollView, StyleSheet, Image, TouchableOpacity} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { H3, Title, Body_Regular, Body_bold, Small_Body_Bold, Small_Body_Regular, Smallest_Body_Regular } from '../../assets/TextStyles';
import Button from "../../components/Button";
import colors from "../../assets/colors/colors";
import Feather from 'react-native-vector-icons/Feather';


const My = ({navigation}) =>{
    const handleSignOut = () =>{
        navigation.navigate("SigninScreen")
    }

    const handleAccount = () => {
        navigation.navigate("Account")
    }

    const handleManagementFee = () => {
        navigation.navigate("ManagementFeeRecord")
    }

    const handleReservation = () => {
        navigation.navigate("ReservationRecord")
    }

    return(
        <View style={{backgroundColor: colors.background_white, height: '100%'}}>
            <View style={{ height: 97}}>
                <LinearGradient
                colors={['#FCF3D0', '#D6E2D7', '#BED7DC']}
                style={{ flex: 1, height:97, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}
                >
                    <View style={{paddingTop: 34, paddingLeft: 16, flexDirection: 'row' }}>
                        <Image
                            source={require("../../assets/img/image13.png")}
                            style={styles.image}
                        />
                        <Text style={{ ...H3, fontWeight: 'bold', color: colors.text_white, paddingLeft: 16, paddingTop: 20 }}>
                            小黃雞
                        </Text>
                    </View>
                </LinearGradient>
            </View>
            <Text style={{...Body_Regular, marginLeft: 146, marginRight: 32, marginTop: 16}}>
                臺北市大安區羅斯福路一段 114 號 5 樓之 1
            </Text> 
            <View style={{alignItems: 'center'}}>
                <View style={styles.table}>
                    <TouchableOpacity activeOpacity={1} style = {styles.table_body} onPress={handleAccount}>
                        <Text>
                            帳號管理
                        </Text>
                        <Feather name="chevron-right" size={18} color={colors.text_black} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style = {styles.table_body} onPress={handleManagementFee}>
                        <Text>
                            管理費繳費紀錄
                        </Text>
                        <Feather name="chevron-right" size={18} color={colors.text_black} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style = {styles.table_body} onPress={handleReservation}>
                        <Text>
                            公設預約紀錄
                        </Text>
                        <Feather name="chevron-right" size={18} color={colors.text_black} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style = {styles.table_body} onPress={handleAccount}>
                        <Text>
                            租賃車位紀錄
                        </Text>
                        <Feather name="chevron-right" size={18} color={colors.text_black} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style = {styles.table_body_last} onPress={handleAccount}>
                        <Text>
                            報修紀錄
                        </Text>
                        <Feather name="chevron-right" size={18} color={colors.text_black} />
                    </TouchableOpacity>
                </View>
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
})
export default My