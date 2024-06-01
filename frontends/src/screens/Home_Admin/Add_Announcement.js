import { Text, View, Switch, StyleSheet, TouchableOpacity, ScrollView, TextInput} from 'react-native'
import Header from '../../components/Header'
import React, { Component, useState } from 'react'
import { Title, Body_Regular} from '../../assets/TextStyles'
import colors from '../../assets/colors/colors'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../../components/Button'
import AntDesign from 'react-native-vector-icons/AntDesign'
import DatePicker from 'react-native-date-picker'
import DropdownComponent from '../../components/DropDown'
import { Calendar } from 'react-native-calendars'
import axios from 'axios';


const Add_Announcement = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { maxId } = route.params;

    const data = [
        { label: '最新消息', value: '最新消息' },
        { label: '里民活動', value: '里民活動' },
        { label: '管委會相關', value: '管委會相關' },
    ];

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const currentDate = new Date();
    const today = new Date(currentDate);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [startingDay, setStartingDay] = useState(today)
    const [endingDay, setEndingDay] = useState(today)

    const [startingDayOpen, setStartingDayOpen] = useState(false)
    const [endingDayOpen, setEndingDayOpen] = useState(false)

    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleTitleChange = (text) => {
        setTitle(text);
    };

    const handleContentChange = (text) => {
        setContent(text);
    };

    const handleCategoryChange = (value) =>{
        setSelectedCategory(value);
    };

    const resetForm = () => {
        setTitle('');
        setContent('');
        setSelectedCategory('');
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}/${month}/${day}`; // 格式為 YYYY/MM/DD
    };

    const submitAnnouncement = () => {

        const newAnnouncement = {
            "title": title,
            "date": formatDate(new Date()), // 使用 formatDate 函數來格式化日期
            "category": selectedCategory,
            "content": content, // 傳遞備註內容作為 details
            "start_date": startingDay,
            "end_date": endingDay,
            "show_in_calender": isEnabled
        };
        axios.post('http://10.0.2.2:3000/announcements', newAnnouncement)
            .then((response) => {
                const result = response.data;
                console.log(result); // Access response data directly
                resetForm();
            })
            .catch((error) => {
                console.log(error)
            });
        navigation.navigate("Home_Admin");


        // console.log('Title:', title);
        // console.log('Contents:', content);
        // console.log('Selected category:', selectedCategory);
        // console.log('On Calendar:', isEnabled);
        // console.log('Starting day:', startingDay);
        // console.log('Ending day:', endingDay);
    };
    
    return (
    // <View style={styles.container}>
    //   <Text style={styles.title}>{announcement.title}</Text>
    //   <Text style={styles.content}>{announcement.content}</Text>
    // </View>
    // <View>

    <View style={{backgroundColor: colors.background_white, height: '100%'}}>
        <Header title = "新增公告"/>
        <ScrollView style={{marginHorizontal: 20}}>
            <Text style={styles.titleText}>標題</Text>
            <TextInput
                value={title}
                onChangeText={handleTitleChange}
                style={styles.titleContainer}
            />
            <Text style={styles.titleText}>內容</Text>
            <TextInput
                value={content}
                onChangeText={handleContentChange}
                style={styles.contentContainer}
                multiline={true}
                textAlignVertical="top"
            />
            <Text style={styles.titleText}>類別</Text>
            <DropdownComponent data={data} onValueChange={handleCategoryChange} />


            <View style={styles.twoItemContainer}>
                <Text style={{...Body_Regular,}}>顯示於行事曆</Text>
                <Switch
                    trackColor={{false: colors.tertiary_75, true: colors.primary_25 }}
                    thumbColor={isEnabled ? colors.primary_50 : colors.tertiary_25}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            {isEnabled && (
                <>
                    <View style={styles.twoItemContainer}>
                        <Text style={{...Body_Regular,}}>開始日期</Text>
                        <TouchableOpacity activeOpacity={1} onPress={() => setStartingDayOpen(true)} style={styles.dateContainer} >
                            <Text>{startingDay.toLocaleDateString('zh-Hans-CN')}</Text>
                            <AntDesign name='caretdown'/>
                        </TouchableOpacity>
                        <DatePicker
                        modal
                        title="選擇開始日期"
                        locale='zh-Hant'
                        mode="date"
                        open={startingDayOpen}
                        date={startingDay}
                        minimumDate={today}
                        confirmText = "確認"
                        cancelText= "取消"
                        buttonColor={colors.primary_100}
                        onConfirm={(date) => {
                        setStartingDayOpen(false)
                        setStartingDay(date)
                        setEndingDay(date)
                        }}
                        onCancel={() => {
                        setStartingDayOpen(false)
                        }}
                        />
                    </View>
                    <View style={styles.twoItemContainer}>
                        <Text style={{...Body_Regular,}}>結束日期</Text>
                        <TouchableOpacity activeOpacity={1} onPress={() => setEndingDayOpen(true)} style={styles.dateContainer} >
                            <Text>{endingDay.toLocaleDateString('zh-Hans-CN')}</Text>
                            <AntDesign name='caretdown'/>
                        </TouchableOpacity>
                        <DatePicker
                        modal
                        title="選擇結束日期"
                        locale='zh-Hant'
                        mode="date"
                        open={endingDayOpen}
                        date={endingDay}
                        minimumDate={startingDay}
                        confirmText = "確認"
                        cancelText="取消"
                        buttonColor={colors.primary_100}
                        onConfirm={(date) => {
                        setEndingDayOpen(false)
                        setEndingDay(date)
                        }}
                        onCancel={() => {
                        setEndingDayOpen(false)
                        }}
                        />
                    </View>
                </>

                )}
            <View style={styles.twoItemContainer}>
                <Text style={{...Body_Regular,}}>附件</Text>
                <Button primary_filled={true} iconLibrary={AntDesign} icon="upload" title = "上傳檔案"onPress={() => {}} />
            </View>
            <View
                style={{flexDirection: 'row', gap: 12, marginVertical: 16, alignSelf:'flex-end'}}
            >
                <Button tertiary_outlined={true} title = "取消" onPress={resetForm} />
                <Button primary_filled={true} title = "發布公告" disabled={!title || !content || !selectedCategory} onPress={submitAnnouncement} />

            </View>
                


        </ScrollView>
    </View>

  );
}


const styles = StyleSheet.create({
    titleText:{
        ...Body_Regular,
        marginTop: 16, 
    },
    content: {
        ...Body_Regular,
        color: colors.text_black,
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
    twoItemContainer:{
        alignItems: 'center', 
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 16,
    },
    dateContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        padding: 8,
        backgroundColor: colors.text_white,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.tertiary_25,

    }
});

export default Add_Announcement;