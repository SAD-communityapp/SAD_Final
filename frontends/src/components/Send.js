import React from "react";
import {View, Text, Image, StyleSheet} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { Dimensions } from 'react-native';
import { TouchableOpacity, Pressable } from "react-native";
import { H3, Title, Body_Regular, Body_bold, Small_Body_Bold, Small_Body_Regular, Smallest_Body_Regular } from '../assets/TextStyles';
import colors from '../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';



const Send = (props) => {
    const { disabled, onPress} = props;
    const getButtonStyle = ({ pressed }) => {
        let backgroundColor = colors.sendDefault
        if (props.disabled) {
            backgroundColor = colors.tertiary_25; // Disabled state
        } else if (pressed) {
            backgroundColor = colors.sendPressed; // Pressed state
        }
        return { backgroundColor};
        //return [styles.button, { backgroundColor, borderColor, textColor }, iconOnlyStyle, props.style];
    };

    const buttonStyle = [styles.button, props.tertiary_outlined ? styles.outlinedButton : null];
    return (
        <Pressable
            style={({ pressed }) => [
                buttonStyle,
                getButtonStyle({ pressed }),
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            {<Feather name="send" size={20} style={styles.icon} />}

        </Pressable>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        borderRadius: 100,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',

    },
    icon: {
        color: colors.text_white,
        alignItems: 'center',
        justifyContent: 'center',
        // Add some spacing between icon and text
    },
})

export default Send