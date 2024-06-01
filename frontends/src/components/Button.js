import React from "react";
import {View, Text, Image, StyleSheet} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { Dimensions } from 'react-native';
import { TouchableOpacity, Pressable } from "react-native";
import { H3, Title, Body_Regular, Body_bold, Small_Body_Bold, Small_Body_Regular, Smallest_Body_Regular } from '../assets/TextStyles';
import colors from '../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';



const Button = (props) => {
    // const filledBgColor = props.focused ? colors.primary_100 : colors.primary_75;
    // const outlinedColor = filledBgColor;
    // const bgColor = props.filled ? filledBgColor : outlinedColor;
    // const textColor = props.filled ? colors.text_white : colors.primary_50;
    const IconComponent = props.iconLibrary || Feather;
    const { primary_filled, tertiary_filled, tertiary_outlined, disabled, icon, title, onPress, style } = props;
    let backgroundColor, borderColor, textColor;
    const getButtonStyle = ({ pressed }) => {
        if (props.primary_filled){
            if (props.disabled) {
                backgroundColor = colors.tertiary_25; // Disabled state
                textColor = colors.tertiary_50;
                borderColor = backgroundColor;
            } else if (pressed) {
                backgroundColor = props.title ? colors.primary_100 : colors.primary_75; // Pressed state
                borderColor = backgroundColor;
                textColor = colors.text_white;
            } else {
                backgroundColor = props.title ? colors.primary_75: colors.primary_50; // Default state
                borderColor = backgroundColor;
                textColor = colors.text_white;
            }
        }
        else if (props.tertiary_filled){
            if (props.disabled) {
                backgroundColor = colors.tertiary_25; // Disabled state
                borderColor = backgroundColor;
                textColor = colors.tertiary_50;
            } else if (pressed) {
                backgroundColor = props.title ? "#666666" : colors.tertiary_75; // Pressed state
                borderColor = backgroundColor;
                textColor = colors.text_white;
            } else {
                backgroundColor = props.title ? colors.tertiary_100: colors.primary_50; // Default state
                borderColor = backgroundColor;
                textColor = colors.text_white;
            }
        }
        else if (props.tertiary_outlined){
            if (props.disabled){
                borderColor = colors.tertiary_25;  
                textColor = borderColor;            
            } else if (props.pressed) {
                borderColor =  colors.tertiary_50; // Default state
                textColor = borderColor;  
            } else {
                borderColor =  colors.tertiary_75;
                textColor = borderColor;  
            }
        }

        // Additional style for button with only icon
        const iconOnlyStyle = !props.title && props.iconOnlyStyle;
        
        return { backgroundColor, borderColor, textColor };
        //return [styles.button, { backgroundColor, borderColor, textColor }, iconOnlyStyle, props.style];
    };

    const buttonStyle = [styles.button, props.tertiary_outlined ? styles.outlinedButton : null];
    return (
        <Pressable
            style={({ pressed }) => [
                buttonStyle,
                getButtonStyle({ pressed }),
                props.style,
                !props.title && props.iconOnlyStyle,
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            {title && icon && (
                <View style={{flexDirection: 'row', alignItems: 'center',  paddingLeft: 12, paddingRight: 16, }}>
                    <IconComponent name={props.icon} style={{
                        color: colors.text_white,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }} />
                    <Text style={{...Body_bold, marginLeft: 8, marginVertical: 8, fontWeight: 'bold',color: getButtonStyle({ onPress }).textColor }}>
                        {title}
                    </Text>
                </View>
                
            )}
            {title && !icon && (
                <Text style={{...Body_bold, fontWeight: 'bold',  color: getButtonStyle({ onPress }).textColor, paddingHorizontal: 16, paddingVertical:6}}>
                    {title}
                </Text>
            )}
            {!title && icon &&  (
                <IconComponent name={props.icon} style={styles.icon} />

            )}
            {/* Render title if provided */}
            {/* {title && (
                <Text style={{ color: getButtonStyle({ onPress }).textColor }}>
                {title}
                </Text>
            )} */}
            {/* Render icon if provided */}
            {/* {props.icon && <IconComponent name={props.icon} size={20} style={styles.icon} />} */}

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
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        ...Small_Body_Bold,
        fontWeight: 'bold'
    },
    icon: {
        color: colors.text_white,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16, 
        paddingVertical: 8,
        // Add some spacing between icon and text
    },
    outlinedButton: {
        borderWidth: 1,
    },
})

export default Button