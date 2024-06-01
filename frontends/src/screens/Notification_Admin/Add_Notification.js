//Add Notification
import React, { useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../assets/colors/colors';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { Body_Regular } from '../../assets/TextStyles';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

const AddNotification = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { maxId } = route.params;

    const [category, setCategory] = useState('');
    const [details, setDetails] = useState('');
    const [recipient, setRecipient] = useState('');
    const [individualUnit, setIndividualUnit] = useState('');
    const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
    const [isRecipientModalVisible, setRecipientModalVisible] = useState(false);
    const categories = [
        { label: '水塔清洗通知', value: 'cleaning' },
        { label: '包裹到貨通知', value: 'parcel' },
        { label: '管理費繳費通知', value: 'fee' },
        { label: '公設預約通知', value: 'reservation' }
    ];
    const recipients = [
        { label: '所有住戶', value: 'allResidents' },
        { label: 'A 棟', value: 'buildingA' },
        { label: 'B 棟', value: 'buildingB' },
        { label: 'C 棟', value: 'buildingC' },
        { label: '個體戶', value: 'individual' }
    ];

    const resetForm = () => {
      setCategory('');
      setRecipient('');
      setDetails(''); 
    };
  

    const handleSelectCategory = (label, value) => {
        setCategory(label);
        setCategoryModalVisible(false);
    
        if (value === 'cleaning') {
            const recipientText = recipient ? `${recipient}清洗水塔` : "清洗水塔";
            setDetails(`明日 09:00~17:00 ${recipientText}，詳情請看相關公告。`);
        } else if (value === 'parcel') {
            const pickupDate = addDays(new Date(), 10);
            setDetails(`您的包裹已經到達，請於 ${formatDate(pickupDate)} 前領取`);
        } else if (value === 'fee') {
            const paymentDueDate = addDays(new Date(), 10);
            const currentMonth = getCurrentMonth();
            setDetails(`請於 ${formatDate(paymentDueDate)} 前繳交 ${currentMonth} 月份管理費。`);
        } else if (value === 'reservation') {
            setDetails(`您明日有預約公設，詳情請看預約紀錄。`);
        } else {
            setDetails('');
        }
    };
  
  

    const handleSelectRecipient = (label, value) => {
        setRecipient(label);
        if (value === 'individual') {
            setIsIndividualUnitVisible(true);
        } else {
            setIsIndividualUnitVisible(false);
        }
        setRecipientModalVisible(false);
    
        // 如果已選擇水塔清洗，更新備註
        if (category === '水塔清洗') {
            const recipientText = label ? `${label}清洗水塔` : "清洗水塔";
            setDetails(`明日 09:00~17:00 ${recipientText}，詳情請看相關公告。`);
        }
    };
  
    
    const [isIndividualUnitVisible, setIsIndividualUnitVisible] = useState(false);

    const submitNotification = () => {
        const newNotification = {
            "title": category,
            "account": recipient === '個體戶' ? individualUnit : recipient[0],
            "details": details // 傳遞備註內容作為 details
        };
        console.log(newNotification);
        axios.post('http://10.0.2.2:3000/notifications', newNotification)
              .then((response) => {
                  const result = response.data;
                  console.log(result); // Access response data directly
                  resetForm();
              })
              .catch((error) => {
                  console.log(error)
              });
      navigation.navigate('Notification');
      resetForm();
    };
  
    
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}/${month}/${day}`; // 格式為 YYYY/MM/DD
    };
  
    const addDays = (date, days) => {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    };
    
    const getCurrentMonth = () => {
      const date = new Date();
      return date.getMonth() + 1;  
    };
  
  

    return (
        <View style={{backgroundColor: colors.background_white, height: '100%'}}>
            <Header title = "新增通知"/>
            <ScrollView style={styles.container}>
                
                <Text style={styles.titleText}>通知類別</Text>
                <TouchableOpacity style={styles.input} onPress={() => setCategoryModalVisible(true)}>
                    <Text>{category || "選擇類別"}</Text>
                    <Feather name='chevron-down' style={{ 
                        fontWeight: 'bold'
                    }}/>
                </TouchableOpacity>

                <Modal
                    visible={isCategoryModalVisible}
                    animationType="fade"
                    transparent={true}
                    onRequestClose={() => setCategoryModalVisible(false)}
                >
                    <TouchableOpacity style={styles.modalOverlay} onPress={() => setCategoryModalVisible(false)}>
                        <View style={styles.modalContent}>
                            <FlatList
                                data={categories}
                                keyExtractor={item => item.value}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => handleSelectCategory(item.label, item.value)}>
                                        <Text style={styles.itemText}>{item.label}</Text>
                                    </TouchableOpacity>
                                
                                )}
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>

                <Text style={styles.titleText}>通知對象</Text>
                <TouchableOpacity style={styles.input} onPress={() => setRecipientModalVisible(true)}>
                    <Text>{recipient || "選擇對象 ..."}</Text>
                    <Feather name='chevron-down' style={{ 
                        fontWeight: 'bold'
                    }}/>
                </TouchableOpacity>
                {isIndividualUnitVisible && (
                    <TextInput
                        style={styles.input}
                        placeholder="輸入單一門牌..."
                        value={individualUnit}
                        onChangeText={setIndividualUnit}
                    />
                )}
                <Modal
                    visible={isRecipientModalVisible}
                    animationType="fade"
                    transparent={true}
                    onRequestClose={() => setRecipientModalVisible(false)}
                >
                    <TouchableOpacity style={styles.modalOverlay} onPress={() => setRecipientModalVisible(false)}>
                        <View style={styles.modalContent}>
                            <FlatList
                                data={recipients}
                                keyExtractor={item => item.value}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => handleSelectRecipient(item.label, item.value)}>
                                        <Text style={styles.itemText}>{item.label}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>

                <Text style={styles.titleText}>備註</Text>
                <TextInput 
                    placeholder="詳細描述..."
                    numberOfLines={4}
                    value={details}
                    onChangeText={setDetails}
                    style={styles.contentContainer}
                    multiline={true}
                    textAlignVertical="top"    
                />

                <View 
                    style={{flexDirection: 'row', gap: 12, marginVertical: 16, alignSelf:'flex-end'}}
                >
                    <Button tertiary_outlined={true} title= '取消' onPress={resetForm} />
                    <Button primary_filled={true}  disabled={!category || !recipient || !details} title= '發布通知' onPress={submitNotification} />
                </View>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    titleText:{
        ...Body_Regular,
        marginTop: 16, 
    },
    titleContainer: {
        borderColor: colors.tertiary_25,
        borderRadius : 10,
        borderWidth: 1,
        backgroundColor: colors.text_white,
        paddingVertical: 4,
        paddingHorizontal: 12,
        marginTop: 16,
        borderraidius: 10
    },
    contentContainer: {
        borderColor: colors.tertiary_25,
        borderRadius : 10,
        borderWidth: 1,
        backgroundColor: colors.text_white,
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginTop: 16,
        borderraidius: 10,
        minHeight: 198,
    },
    container: {
        marginHorizontal: 20
    },
    label: {
        color: colors.text_black,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        marginTop: 16,
        ...Body_Regular,
        borderWidth: 1,
        borderColor: colors.tertiary_50,
        padding: 10,
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: colors.text_white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    textArea: {
        height: 200,
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: colors.tertiary_50,
        padding: 10,
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: colors.text_white,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
    },
    buttonCancel: {
        backgroundColor: colors.tertiary_50,
        padding: 10,
        borderRadius: 10,
        marginRight: 20, // Add spacing between buttons
    },
    buttonSubmit: {
        backgroundColor: colors.primary_75,
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        fontSize: 16,
    },
    modalContent: {
        backgroundColor: colors.text_white,
        padding: 20,
        borderRadius: 10,
        width: '80%',
        fontSize: 16,
    },
    itemText: {
        fontSize: 16,
        padding: 10,
    },
  });
  
  
  export default AddNotification;