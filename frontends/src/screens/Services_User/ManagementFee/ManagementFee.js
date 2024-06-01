import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Modal,TouchableWithoutFeedback, FlatList } from 'react-native'
import React, { useState , useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import colors from '../../../assets/colors/colors';
import {H4, Title, Body_Regular} from '../../../assets/TextStyles';
import Feather from 'react-native-vector-icons/Feather';
import TabBar from '../../../components/TabBar';
import Header from '../../../components/Header';


const UnPaymentItem = (props) => {
    const navigation = useNavigation();
    
    const handlePayment = () => {
        setModalVisible(true);
    }

    const { address, deadline, amount, title, setModalVisible } = props;
    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={handlePayment}>
                <View style={styles.textContainer}>
                    <Text style={{...Title, fontWeight: 'bold', color: colors.text_black}}>
                        {title}
                    </Text>
                    <Text style={{...Title, fontWeight: 'bold', color: colors.notification}}>
                        未繳交
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
                        繳費期限
                    </Text>
                    <Text style={{...Body_Regular, color: colors.text_black}}>
                        {deadline}
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
                <View style={{ flexDirection: 'row-reverse' }}>
                    <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 16}}>
                        {/* <Text>
                            前往繳交
                        </Text> */}
                        <Feather name = "arrow-right-circle" size={28} color={colors.primary_100}/>
                        
                    </View>
                </View>
            </TouchableOpacity>
        </View>
        
    );
  };

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

const ManagementFee = ({ route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('active');
    useEffect(() => {
        if (route.params === 'records') {
            setActiveTab(route.params);
        }
    }, [route.params]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handlePaymentDetail = () => {
        navigation.navigate("PaymentDetail");
        setModalVisible(false);
    }

    const handleCloseModal = () => {
        setModalVisible(false);
    }

    return (
        <View style={{backgroundColor: colors.background_white, height: '100%'}}>
            <Header title = "繳管理費"/>
            <TabBar activeTitle="尚未繳交" recordTitle = "繳費明細" activeTab={activeTab} handleTabChange={handleTabChange}></TabBar>
            <ScrollView style={{ flex: 1, marginHorizontal: 20 }}>
                {activeTab === 'active' ? (
                    <View>
                        <UnPaymentItem title="113 年 2 月管理費" deadline="2024-02-29 23:59" amount="1196" address="114 號 5 樓之 1" setModalVisible={setModalVisible}/>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => setModalVisible(false)}
                        >
                            <TouchableWithoutFeedback onPress={handleCloseModal}>
                                <View style={styles.modalContainer}>
                                <View style={styles.listContainer}>
                                    <FlatList
                                        data={[
                                            {key: '超商繳費'},{key: '信用卡繳費'}, {key: 'ATM 匯款'},{key: '網銀匯款'},
                                        ]}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity onPress={handlePaymentDetail}
                                                style={styles.methodContainer}
                                            >
                                                <Text style={{...H4}}>{item.key}</Text>
                                            </TouchableOpacity>
                                        )}
                                        style = {styles.listContainer}
                                    />
                                </View>
                                    
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>
                        
                    </View>
                    
                ) : (
                    <View style={{gap: 16}}>
                        <PaymentItem title="113 年 1 月管理費" payTime="2024-01-04 21:59" amount = "1196" address = "114 號 5 樓之 1" method = "超商繳費"/>
                        <PaymentItem title="112 年 12 月管理費" payTime="2024-12-10 18:32" amount = "1196" address = "114 號 5 樓之 1" method = "超商繳費"/>
                    </View>
                    

                )}
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

export default ManagementFee;