import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity,  } from 'react-native'
import React, { useState, useEffect  } from 'react'
import colors from '../../../assets/colors/colors'
import { Body_Regular, H3, Small_Body_Regular, Title } from '../../../assets/TextStyles'
import Header from '../../../components/Header'
import Button from '../../../components/Button'
import Entypo from 'react-native-vector-icons/Entypo'
import Reservation from './Reservation'
import { useNavigation, useRoute } from '@react-navigation/native';

const MeetingRoom  = () => {
    const navigation = useNavigation()
    const route = useRoute();
    const [ maxId, setMaxId] = useState(10);
    const weekDates = [];
    const weekDay = [];
    const [showReservation, setShowReservation] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const timeSlots = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
    const rows = [];
    const itemsPerRow = 4;
    const [selectedTime, setSelectedTimes] = useState([]);
    // 獲取本週第一天
    const currentDate = new Date();
    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(currentDate.getDate());

    const handleReservation = () => {
        setShowReservation(true);
    }

    // 生成本週日期
    
    const handleDatePress = (date) => {
        setSelectedDate(selectedDate => selectedDate && selectedDate.getTime() === date.getTime() ? null : date);
    };

    for (let i = 0; i < 7; i++) {
        const day = new Date(firstDayOfWeek);
        day.setDate(firstDayOfWeek.getDate() + i);
        weekDates.push(day);
        weekDay.push(day.getDay()); 
    }
    
    for (let i = 0; i < timeSlots.length; i += itemsPerRow) {
        rows.push(timeSlots.slice(i, i + itemsPerRow));
    }

    useEffect(() => {
        setSelectedTimes([]);
    }, [selectedDate]);

    const handleRemoveTime = (indexToRemove) => {
        setSelectedTimes(prevSelectedTime => prevSelectedTime.filter((_, index) => index !== indexToRemove));
    }
    
    const resetForm = () => {
        setSelectedDate(null);
        setSelectedTimes([]);
    };

    const handleSubmit  = () =>{
        const newRecord = {
            key: maxId + 1,
            id: maxId + 1,
            title: "會議室",

            date: selectedDate.toLocaleDateString('zh-Hant', { year: 'numeric', month: '2-digit', day: '2-digit' }), // 使用 formatDate 函數來格式化日期
            hasDot: true,
            timePeriods: selectedTime.map(time => {
                const start = new Date(time);
                const end = new Date(time);
                end.setHours(end.getHours() + 1);
                const startTimeString = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
                const endTimeString = end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
                return `${startTimeString} ~ ${endTimeString}`;
            }),
        };

        navigation.navigate('Reservation', { newRecord });

        resetForm();
        setMaxId(maxId + 1); // 更新 maxId
    }

    const handleTimePress = (slot) => {
        const time = new Date(selectedDate);
        const [hour, minute] = slot.split(':');
        time.setHours(parseInt(hour), parseInt(minute), 0, 0);

        // 检查选中的时间是否已经存在于数组中
        const index = selectedTime.findIndex(selected => selected.getTime() === time.getTime());

        // 如果已经选中了这个时间，从选中列表中移除
        if (index !== -1) {
            setSelectedTimes(prevSelectedTime => prevSelectedTime.filter((_, i) => i !== index));
        } else {
            // 否则将时间添加到选中列表中
            setSelectedTimes(prevSelectedTime => [...prevSelectedTime, time]);
        }
    };

    
    return (
        <View style={{backgroundColor: colors.background_white, height: '100%'}}>
            {!showReservation ? (
                
                <View>
                    <Header title = "會議室預約"/>
                    <ScrollView style={styles.container}>                
                        <Image source={require("../../../assets/img/meetingRoom.png")} style={styles.image}/>
                        <Text style = {styles.titleText}>會議室</Text>
                        <View style={styles.contentContainer}>
                            <Text style={styles.contentText}>開放時間</Text>
                            <Text style={styles.contentText}>每天 09:00~21:00</Text>
                        </View>
                        <View style={styles.contentContainer}>
                            <Text style={styles.contentText}>預約單位時間</Text>
                            <Text style={styles.contentText}>每 60 分鐘</Text>
                        </View>
                        <View style={styles.contentContainer}>
                            <Text style={styles.contentText}>可預約日期</Text>
                            <Text style={styles.contentText}>即日起至一周以內</Text>
                        </View>
                        <View style={styles.separator}></View>
                        <Text style = {styles.titleText}>設施簡介</Text>
                        <View style={styles.contentContainer}>
                            <Text style={styles.contentText}>        
                                {"\t\t\t\t\t"}提供專業會議設備，適合面試、小型會議、家教使用。附帶大電視及無線投影設備。
                            </Text>
                        </View>
                    </ScrollView>
                    <View style={{maxWidth : 250, alignSelf: 'center', marginTop: 56}}>
                        <Button primary_filled={true} 
                                    onPress={handleReservation}
                                    title={"立即預約"}/> 
                    </View>      
                </View>
                ) : (
                    <View style={{backgroundColor: colors.background_white, height: '100%'}}>
                        <Header title = "會議室預約"/>
                        <ScrollView style={styles.container}>                
                            <Image source={require("../../../assets/img/meetingRoom.png")} style={styles.image}/>
                            <Text style = {styles.titleText}>會議室</Text>
                            <View style={styles.contentContainer}>
                                <Text style={styles.contentText}>開放時間</Text>
                                <Text style={styles.contentText}>每天 09:00~21:00</Text>
                            </View>
                            <View style={styles.contentContainer}>
                                <Text style={styles.contentText}>預約單位時間</Text>
                                <Text style={styles.contentText}>每 60 分鐘</Text>
                            </View>
                            <View style={styles.contentContainer}>
                                <Text style={styles.contentText}>可預約日期</Text>
                                <Text style={styles.contentText}>即日起至一周以內</Text>
                            </View>
                            <View style={styles.separator}></View>
                            <Text style = {styles.titleText}>時段選擇</Text>
                            <View>
                                <View style={styles.weekContainer}>
                                    {weekDates.map((date, index) => (
                                        <View key={index} style={styles.dateWrapper}>
                                            <Text style={styles.weekDayText}>{['週日', '週一', '週二', '週三', '週四', '週五', '週六'][weekDay[index % 7]]}</Text>
                                            <TouchableOpacity 
                                                onPress={() => handleDatePress(date)}
                                                style={[
                                                styles.dateButton,
                                                selectedDate && selectedDate.getDate() === date.getDate() ? styles.selectedDateButton : styles.unSelectedDateButton
                                                ]}
                                                activeOpacity={1}
                                            >
                                                <Text style={[
                                                styles.dateText,
                                                selectedDate && selectedDate.getDate() === date.getDate() ? styles.selectedDate : styles.unselectedDate
                                                ]}>{date.toLocaleDateString(undefined, { month: '2-digit', day: 'numeric' })}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                                {selectedDate && 
                                    <View>
                                        <View style={{flexDirection: 'row', gap: 16, justifyContent: 'flex-end', marginVertical: 16}}>
                                            <View style={{ width: 20, height: 20, backgroundColor: colors.text_white, borderRadius: 5 }}></View>
                                            <Text style={{...Small_Body_Regular}}>可選</Text>
                                            <View style={{ width: 20, height: 20, backgroundColor: colors.primary_100, borderRadius: 5 }}></View>
                                            <Text style={{...Small_Body_Regular}}>已選</Text>
                                        </View>
                                        <View style={{ gap: 16, marginBottom: 16 }}>
                                            {rows.map((row, index) => (
                                                <View key={index} style={styles.rowContainer}>
                                                    {row.map((slot, idx) => {
                                                        const time = new Date(selectedDate);
                                                        const [hour, minute] = slot.split(':');
                                                        time.setHours(parseInt(hour), parseInt(minute), 0, 0);
                                                        const isSelected = selectedTime.some(selected => selected.getTime() === time.getTime());
                            
                                                        return (
                                                            <TouchableOpacity
                                                                activeOpacity={1}
                                                                key={idx}
                                                                style={[
                                                                    isSelected ? styles.selectedTimeButton : styles.unSelectedTimeButton
                                                                ]}
                                                                onPress={() => handleTimePress(slot)}
                                                            >
                                                                <Text style={[isSelected ? styles.selectedTime : styles.unSelectedTime]}>
                                                                    {slot}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        );
                                                    })}
                                                </View>
                                            ))}
                                        </View>
                                        <View style={styles.separator}></View>
                                        <Text style={styles.titleText}>已選時段</Text>
                                        <Text>{selectedDate.toLocaleDateString('zh-Hant', { year: 'numeric', month: '2-digit', day: '2-digit' })}</Text>

                                        <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginTop: 16}}>
                                            
                                            {selectedTime.map((time, index) => (
                                                <View style={styles.timeContainer}  key={index}>
                                                    <Text style= {{...Small_Body_Regular, color: colors.primary_100}}key={index}>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} ~{' '}
                                                    {(() => {
                                                        const nextTime = new Date(time);
                                                        nextTime.setHours(nextTime.getHours() + 1);
                                                        return nextTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
                                                    })()}</Text>
                                                    <Entypo name={"cross"} style={{color: colors.primary_100}}  onPress={() => handleRemoveTime(index)} />
                                                </View>
                                            ))}
                                        </View>
                                        <Button
                                            title = "確定預約"
                                            primary_filled={true} 
                                            onPress={handleSubmit}
                                            disabled={selectedTime.length === 0}
                                            style={{alignSelf: 'center', marginTop: 16}}
                                            
                                            >
                                        </Button>
                            
                                    </View>
                                }
                            </View>
                        </ScrollView>
                    </View>
                )}
        </View>
        
    )
}
const styles = StyleSheet.create({
    image:{
        borderRadius: 10,
        width: 400,
    },
    container:{
        marginHorizontal: 20,
        marginVertical: 16,
        gap: 16,
        
    },
    titleText:{
        ...Title,
        fontWeight: 'bold',
        marginVertical: 16,
        flex: 1
    }, 
    contentContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
    },
    contentText:{
        ...Body_Regular,
        marginBottom: 16,
    },
    separator: {
        borderBottomColor: colors.text_black, 
        borderBottomWidth: 1, 
    },
    weekContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    unSelectedDateButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.primary_100,
        borderRadius: 100,
        width: 40,
        height: 40,
        backgroundColor: colors.tertiary_25,
    },
    selectedDateButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.primary_100,
        borderRadius: 100,
        width: 40,
        height: 40,
        backgroundColor: colors.primary_100,
    },
    unselectedDate:{
        ...Small_Body_Regular,
        color: colors.text_black,
    },
    selectedDate: {
        ...Small_Body_Regular,
        color: colors.text_white,
    },
    dateWrapper: {
        gap: 16,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabledTimeButton:{
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        width: 58,
        height: 32,
        backgroundColor: colors.tertiary_25,
    },
    unSelectedTimeButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        width: 58,
        height: 32,
        backgroundColor: colors.text_white,
    },
    selectedTimeButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        width: 58,
        height: 32,
        backgroundColor: colors.primary_100,
    },
    unSelectedTime:{
        ...Small_Body_Regular,
        color: colors.primary_100,
    },
    selectedTime: {
        ...Small_Body_Regular,
        color: colors.text_white,
    },
    
    disabledTime: {
        ...Small_Body_Regular,
        color: colors.tertiary_50,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    timeContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around', // 控制水平方向上的对齐方式
        alignItems: 'center', // 控制垂直方向上的对齐方式
        borderRadius: 10,
        borderColor: colors.primary_100,
        borderWidth: 1,
        gap: 8,
        maxWidth: 120,
        minHeight: 32,
        paddingHorizontal: 8

    }
})

export default MeetingRoom;