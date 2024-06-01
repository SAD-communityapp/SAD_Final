import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Modal,TouchableWithoutFeedback, FlatList } from 'react-native'
import React, { useState , useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import colors from '../../../assets/colors/colors';
import {H4, Title, Body_Regular} from '../../../assets/TextStyles';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../../../components/Header';
import Button from '../../../components/Button';

const CommentItem = (props) => {
    const navigation = useNavigation();

    const handleCommentDetail = () => {
        navigation.navigate("CommentDetail");
    }

    const {title, time, category,} = props;
    return (
        <View style={{marginTop: 16}}>
            <TouchableOpacity style={styles.container} onPress={handleCommentDetail}>
                <Text style={{...Title, fontWeight: 'bold', color: colors.text_black}}>
                    {title}
                </Text>
                <View style={styles.textContainer}>
                    <View style={styles.textContainer}>
                        <Text style={{...Body_Regular, color: colors.text_black}}>
                            {time}
                        </Text>
                        <Text style={{...Body_Regular, color: colors.text_black}}>
                            {category}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row-reverse' }}>
                        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 16}}>
                            {/* <Text>
                                前往繳交
                            </Text> */}
                            <Feather name = "arrow-right-circle" size={28} color={colors.primary_100}/>
                        </View>
                    </View>
                </View>
                
            </TouchableOpacity>
        </View>
        
    );
  };

const Comment = ({ route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('active');
    useEffect(() => {
        if (route.params === 'records') {
            setActiveTab(route.params);
        }
    }, [route.params]);

    
    return (
        <View style={{backgroundColor: colors.background_white, height: '100%'}}>
            <Header title = "意見反饋"/>
            <ScrollView style={{ flex: 1, marginHorizontal: 20 }}>
                <View>
                    <CommentItem title="圖書館天花板電燈壞掉" time="2024-02-29 23:59" category="公設損壞" address="114 號 5 樓之 1" setModalVisible={setModalVisible}/>
                </View>
            </ScrollView>
            <View style={{marginHorizontal: 50, marginBottom: 16}} >
                <Button title="我要填寫" primary_filled={true}/>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.text_white,
        padding: 16,
        borderRadius: 10,
        flex: 1,
        gap: 16,
        
    },
    textContainer:{
        flexDirection: 'row',
        flex: 1,
        gap: 16,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 16,
        marginHorizontal: 20,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
    },
    tabText: {
        fontSize: 16,
        color: colors.tertiary_50,
    },
    activeTabItem: {
        borderBottomWidth: 4,
        borderBottomColor: colors.primary_100,
    },
    activeTabText: {
        fontWeight: 'bold',
        color: colors.primary_100,
    },
    reserveTextContainer:{
      marginVertical: 8,
      gap: 8,
    },
    reserveContainer:{
      alignItems: 'center',
      gap: 16,
      flexDirection: 'row',
      backgroundColor: colors.text_white,
      borderRadius: 10,
      paddingVertical: 8,

      justifyContent: 'space-around',
    },
    image:{

    },
    modalContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 半透明背景
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    listContainer:{
        backgroundColor: colors.text_white,
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingVertical: 8,
    },
    methodContainer:{
        paddingVertical: 8,
        alignItems: 'center',
    }

});

export default Comment;