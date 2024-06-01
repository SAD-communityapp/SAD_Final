import React from "react";
import {View, Text, Image, StyleSheet} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity, Pressable } from "react-native";
import { H3 } from '../assets/TextStyles';
import colors from '../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';



const Header = (props) => {
    const {title} = props;
    const navigation = useNavigation()
    const handleBack = (announcement) => {
      // Handle navigation to the announcement details screen
      //console.log("Navigating to announcement:", announcement.title);
      navigation.goBack()
  
    };
    return (
        <View style={{ height: 97}}>
            <LinearGradient
                colors={['#FCF3D0', '#D6E2D7', '#BED7DC']}
                style={styles.headerBackground}
                >
                    <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={handleBack}>
                        <Feather name="chevron-left" size={18} color={colors.text_white} />
                    </TouchableOpacity>
                    <Text style={{ ...H3, fontWeight: 'bold', color: colors.text_white}}>
                        {title}
                    </Text>
                    </View>
                    
                
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    headerBackground:{
        flexDirection: 'row',
        paddingHorizontal: 16,
        flex: 1,
        paddingTop: 48,
        paddingBottom: 16,
        borderBottomLeftRadius: 20, 
        borderBottomRightRadius: 20,
        gap: 8,
        alignItems: 'center',
    },
      headerContainer:{
        flexDirection: 'row',
        flex: 1,
        gap: 8,
        alignItems: 'center',
    },
})

export default Header