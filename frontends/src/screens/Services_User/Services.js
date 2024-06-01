import React, {useState}from "react";
import {ScrollView, SafeAreaView, View, Text, Alert, StyleSheet, FlatList,Table, Row, Rows, TouchableOpacity  } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { H3, Title, Body_Regular, Body_bold, Small_Body_Bold, Small_Body_Regular, Smallest_Body_Regular } from '../../assets/TextStyles';
import colors from '../../assets/colors/colors';
import Button from "../../components/Button";
import {Agenda, Calendar, LocaleConfig} from 'react-native-calendars';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from '@react-navigation/native';


const Services = () => {
    const navigation = useNavigation()
    const handleReservation = () => {
        
        // Handle navigation to the announcement details screen
        //console.log("Navigating to announcement:", announcement.title);
        navigation.navigate("Reservation")
    
    };

    const handleManagementFee = () => {
        navigation.navigate("ManagementFee")
    }

    const handleGas = () => {
        navigation.navigate("Gas")
    }

    const hadleComment = () => {
        navigation.navigate("Comment")
    }
    



    return(

        <View style={{backgroundColor: colors.background_white, height: '100%'}}>
            <View style={{ height: 97, marginBottom: 48
            }}>
                <LinearGradient
                colors={['#FCF3D0', '#D6E2D7', '#BED7DC']}
                style={{ flex: 1, height:97, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}
                >
                <Text style={{ ...H3, fontWeight: 'bold', color: colors.text_white, paddingTop: 49, paddingLeft: 16 }}>
                社區服務
                </Text>
                </LinearGradient>
            </View>
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={1} style={styles.serviceItem} onPress={handleReservation}>     
                    <FontAwesome5 name="calendar-alt" size={70} color={colors.primary_75}/>
                    <Text style={styles.textStyle}>公設預約</Text>
                </TouchableOpacity> 
                <TouchableOpacity activeOpacity={1}  onPress={handleGas} style={{
                        backgroundColor: colors.text_white,
                        borderWidth: 3,
                        borderRadius: 10,
                        borderColor: colors.primary_75,
                        width: 146,
                        height: 146,
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 0,
                }}>     
                    <MaterialCommunityIcons name="fire" size={80} color={colors.primary_75}/>
                    <Text style={styles.textStyle}>瓦斯抄表</Text>
                </TouchableOpacity> 
            </View>
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={1} style={styles.serviceItem} onPress={handleManagementFee}>     
                    <MaterialIcons name="payment" size={70} color={colors.primary_75}/>
                    <Text style={styles.textStyle}>繳管理費</Text>
                </TouchableOpacity> 
                <TouchableOpacity activeOpacity={1} style={styles.serviceItem}>     
                    <MaterialCommunityIcons name="parking" size={70} color={colors.primary_75}/>
                    <Text style={styles.textStyle}>租賃車位</Text>
                </TouchableOpacity> 
            </View>
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={1} style={styles.serviceItem}>     
                    <FontAwesome5Icon name="wrench" size={70} color={colors.primary_75}/>
                    <Text style={styles.textStyle}>報修</Text>
                </TouchableOpacity> 
                <TouchableOpacity activeOpacity={1} style={styles.serviceItem} onPress={hadleComment}>     
                    <MaterialCommunityIcons name="comment-processing" size={70} color={colors.primary_75}/>
                    <Text style={styles.textStyle}>意見反饋</Text>
                </TouchableOpacity> 
            </View>
           
        </View>
        
        
    )
}

const styles = StyleSheet.create({
    serviceItem: {
        backgroundColor: colors.text_white,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: colors.primary_75,
        width: 146,
        height: 146,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    container:{
        marginHorizontal: 40,
        marginTop: 48,
        width: 330,
        justifyContent: 'space-between',
        marginTop: 30,
        flexDirection: 'row',
        alignSelf: 'center',

    },
    textStyle:{
        ...H3, 
        fontWeight: 'bold', 
        color: colors.primary_75,
    },
    iconButton: {
        // Add styles for the icon button
    },
});
export default Services