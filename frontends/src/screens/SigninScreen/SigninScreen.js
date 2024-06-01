import React, { useState } from "react";
import LinearGradient from 'react-native-linear-gradient';
import Button from "../../components/Button";
import colors from '../../assets/colors/colors';
import { H3, Body_Regular, } from '../../assets/TextStyles';
import axios from 'axios';

import {
    StyleSheet,
    Text,
    Image,
    View,
    TextInput,
} from 'react-native';

const SigninScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState('');

    const handleUsernameChange = (text) => {
        setUsername(text);
        setError("");
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
        setError("");
    };


    const handleSignIn = () => {
        console.log(username);
        console.log(password);

        axios.post('http://10.0.2.2:3000/users/login', {
            "username":username,
            "password":password
        })
            .then((response) => {
                const result = response.data;
                console.log(result); // Access response data directly
                if (result.success) {
                    setSuccess(result.success);
                    setError('');
                    if (username === 'admin') {
                        navigation.navigate("MainAppAdmin");
                        console.log('Navigate to MainAppAdmin');
                    } else {
                        navigation.navigate("MainAppUser");
                        console.log('Navigate to MainAppUser');
                    }
                } else {
                    setError(result.message);
                }
            })
            .catch((error) => {
                setError(error.response);
            })
            .finally(() => {
                // 清除表單
                setUsername('');
                setPassword('');
            });
    };

    // const handleSignIn = () => {
    //     console.log
    //     const postData = {
    //       "username": 'user_1',
    //       "password": 'password123'
    //     };
    
    //     axios.post('http://10.0.2.2:3000/users/login', postData)
    //       .then((response) => {
    //         console.log(response.data.success); 
    //       })
    //       .catch((e) => {
    //         setError('rejected');
    //         console.log(e)
    //       });
    //   };
    
    return (
        <LinearGradient
            colors={['#BED7DC', '#D6E2D7', '#FCF3D0']}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        >
            <View style={{
                ...H3,
                flexDirection: 'column',
                alignItems: 'center',
                gap: 100,
                marginTop: 205,
            }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Image source={require("../../assets/img/image38.png")}
                        style={{
                            height: 112,
                            width: 112,
                            top: 10,
                            marginBottom: 32,
                        }}
                    />
                </View>
                <View style={{
                    width: 204,
                    flexDirection: 'column',
                    gap: 32,
                    justifyContent: "center",

                }}>
                    <View style={{
                        width: 204,
                        flexDirection: 'column',
                        gap: 16,
                        justifyContent: "center",
                    }}>
                        <TextInput
                            placeholder="請輸入帳號"
                            placeholderTextColor={colors.tertiary_100}
                            value={username}
                            onChangeText={handleUsernameChange}
                            style={styles.inputContainer}
                        />

                        <TextInput
                            value={password}
                            onChangeText={handlePasswordChange}
                            secureTextEntry={true}
                            placeholder="請輸入密碼"
                            placeholderTextColor={colors.tertiary_100}
                            style={styles.inputContainer}
                        />
                        {error ? (
                            <Text style={{ color: colors.notification, marginTop: 8, alignSelf: 'center' }}>{error}</Text>
                        ) : null}
                    </View>
                    <Button
                        title="登入"
                        primary_filled={true}
                        onPress={handleSignIn}
                        disabled={!username || !password}
                        style={{ height: 40 }}
                    >
                    </Button>
                </View>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        borderColor: colors.tertiary_75,
        borderRadius: 10,
        backgroundColor: colors.text_white,
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderraidius: 10,
        ...Body_Regular,
    },
});

export default SigninScreen;
