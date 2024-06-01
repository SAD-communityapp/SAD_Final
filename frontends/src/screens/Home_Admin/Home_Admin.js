import React, {useState, useEffect}from "react";
import {ScrollView, SafeAreaView, View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { H3, Title, Body_Regular, Body_bold, Small_Body_Bold, Small_Body_Regular, Smallest_Body_Regular } from '../../assets/TextStyles';
import colors from '../../assets/colors/colors';
import Button from "../../components/Button";
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

LocaleConfig.locales['fr'] = {
    monthNames: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月'
    ],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['日', '一', '二', '三', '四', '五', '六'],
    dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
    today: "Aujourd'hui"
  };
  
  LocaleConfig.defaultLocale = 'fr';

function Home_Admin(){

    const navigation = useNavigation()
    const route = useRoute();

    // const [announcements, setAnnouncements] = useState([
    //     { id: 1, title: '水塔清洗公告', date: '2024-03-27', attach: '113 年度工作計畫事項', category: '最新消息', content: "親愛的住戶您好：\n\n為了確保我們社區的用水品質，由清潔廠商真乾淨依合約協助我們進行水塔的定期清洗和維護工作。以下是相關資訊。\n\n（一）依據本社區 113 年度工作計畫事項\n（二）時間：2024-04-09 ~ 2024-04-11 共三天\n（三）作業範圍：\n\t2024-04-09 清洗 A、B 棟\n\t2024-04-10 清洗 C、D 棟\n\t2024-04-11 清洗 E 棟\n（四）清洗水塔當天 9:00 ~ 17:00 將會暫停供水，請住戶儲水備用，謝謝。\n（五）清洗後用水前，請先將水龍頭打開排放管內汙濁髒水五分鐘，確保用水乾淨安全。\n\n造成不便，敬請見諒，謝謝。\n\n管委會敬上\n"},
    //     { id: 2, title: '停電公告', date: '2024-03-27', category: '最新消息', attach: '', content: "親愛的住戶您好：\n\n因配合台電公司進行設備維修，將於以下時間進行停電作業。請各位住戶提前做好準備。\n\n（一）停電時間：2024-03-30 早上 9:00 至 下午 5:00\n（二）停電範圍：\n\tA 棟、B 棟、C 棟\n（三）注意事項：\n\t1. 停電期間，請勿使用電梯。\n\t2. 停電期間，請關閉所有電器設備，以免恢復供電時引起意外。\n\t3. 請各位住戶提前儲備充足的水和食物。\n\n停電造成不便，敬請見諒，謝謝。\n\n管委會敬上\n"},
    //     { id: 3, title: '南投一日遊', date: '2024-03-26', category: '里長轉知', attach: '', content: "以下是來自里長的轉知\n\n親愛的住戶您好：\n\n我們將於 2024 年 3 月 26 日舉辦南投一日遊活動，歡迎大家踴躍參加。具體活動安排如下：\n\n（一）集合時間：2024 年 3 月 26 日早上 8:00\n（二）集合地點：社區大門口\n（三）行程安排：\n\t1. 參觀日月潭\n\t2. 中午享用當地特色午餐\n\t3. 下午遊覽中台禪寺\n\t4. 傍晚返回社區\n\n活動名額有限，請提前報名。報名截止日期為 2024 年 3 月 20 日。\n\n期待大家的參與，謝謝！\n\n里長敬上\n"},
    //     { id: 4, title: '2024 2 月報表', date: '2024-03-01', category: '管委會相關', attach: '2024 2 月報表', content: "親愛的住戶您好：附件為2024 2 月報表\n\n管委會敬上\n"},
    //     { id: 5, title: '2024 1 月報表', date: '2024-02-01', category: '管委會相關', attach: '2024 1 月報表', content: "親愛的住戶您好：附件為2024 1 月報表\n\n管委會敬上\n"},
    //     { id: 6, title: '里民春酒', date: '2024-01-21', category: '里長轉知', attach: '',content: "以下是來自里長的轉知\n\n親愛的住戶您好：\n\n為了增進鄰里關係，我們將於 2024 年 1 月 21 日舉辦里民春酒活動，歡迎大家參加。具體安排如下：\n\n（一）活動時間：2024 年 1 月 21 日下午 6:00\n（二）活動地點：社區大禮堂\n（三）活動內容：\n\t1. 春酒宴席\n\t2. 互動遊戲\n\t3. 抽獎活動\n\n請各位住戶提前報名，報名截止日期為 2024 年 1 月 15 日。\n\n期待大家的參與，謝謝！\n\n里長敬上\n"},

    //     { id: 7, title: '2023 12 月報表', date: '2024-01-01', category: '管委會相關', attach: '', content: "親愛的住戶您好：附件為2024 12 月報表\n\n管委會敬上\n"},
    //     { id: 8, title: '水塔清洗公告', date: '2023-12-22', category: '最新消息', attach: '', content: "hi"},
    //     { id: 9, title: '2023 11 月報表', date: '2023-12-01', category: '管委會相關', attach: '', content: "hi"},
    //     { id: 10, title: '停電公告', date: '2023-11-20', category: '最新消息', attach: '', content: "hi"},
        
    //     // Add additional announcement with building field
    // ]);
    const [announcements, setAnnouncements] = useState([]);
    useFocusEffect(
        React.useCallback(() => {
            axios.get('http://10.0.2.2:3000/announcements')
              .then((response) => {
                const formattedAnnouncements = response.data.map(announcement => ({
                  ...announcement,
                  date: announcement.date.slice(0, 10)
                }));
                const sortedAnnouncements = [...formattedAnnouncements].sort((a, b) => {
                    const dateA = new Date(a.date.replace('//', '-'));
                    const dateB = new Date(b.date.replace('//', '-'));
                    return dateB - dateA; // Sort descending (latest date first)
                });
                setAnnouncements(sortedAnnouncements);
              })
              .catch((error) => {
                console.log(error)
              });
            
            return () => {
            };
        }, [])
    );

    useEffect(() => {
        if (route.params?.newAnnouncement) {
            setAnnouncements(prev => [route.params.newAnnouncement, ...prev]);
        }
    }, [route.params?.newAnnouncement]);

    const [filterCategory, setFilterCategory] = useState('All'); // Filter state
    
    const filteredAnnouncements = filterCategory === 'All' ? announcements : announcements.filter(n => n.category.includes(filterCategory));

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(filteredAnnouncements.length / itemsPerPage);

    
    const AnnouncementItem = ({ announcement, isLast }) => {
        const { id, date, title, category, content, attach } = announcement;
    
    
        const handlePress = () => {
            navigation.navigate("AnnouncementDetail", {announcement});
        };

        return (
            <TouchableOpacity activeOpacity={1} onPress={handlePress} style={isLast == true? styles.item_last: styles.item}>
                <TouchableOpacity activeOpacity={1} style = {isLast == true? styles.table_body_last : styles.table_body} onPress={handlePress}>
                    <View style={{minWidth: 90, flex: 3}}>
                        <Text style={styles.table_data}>{date}</Text>
                    </View>
                    <View style={{minWidth: 90, flex: 2}}>
                        <Text style={styles.table_data}>{title}</Text>
                    </View>
                    <View style={{minWidth: 90, flex: 3}}>
                        <Text style={styles.table_data}>{category}</Text>
                    </View>
                    <View style={styles.iconContainer} onPress={handlePress}>
                    <Feather name="chevron-right" size={18} color={colors.text_black} />
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    const handlePageChange = (direction) => {
        setCurrentPage(prev => {
            if (direction === 'next' && prev < totalPages) {
                return prev + 1;
            } else if (direction === 'prev' && prev > 1) {
                return prev - 1;
            }
            return prev;
        });
    };

    const FilterTab = ({ label, text }) => (
        <TouchableOpacity
            style={[styles.filterTab, filterCategory === label ? styles.filterTabActive : {}]}
            onPress={() => setFilterCategory(label)}
        >
            <Text style={[styles.filterTabText, filterCategory === label ? styles.filterTabTextActive : {}]}>
                {text}
            </Text>
        </TouchableOpacity>
    );


    const [selected, setSelected] = useState('');
    const getMarked = (announcements) => {
        let marked = {};
      
        announcements.forEach(announcement => {
            const { start_date, end_date, text, show_in_calendar } = announcement;
            const endingDay = end_date
            const startingDay = start_date
            const onCalendar = show_in_calendar
            const color = colors.text_white
            if (onCalendar) {
                const startDate = new Date(startingDay);
                const endDate = new Date(endingDay);
          
                for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
                    const year = d.getFullYear();
                    const month = (d.getMonth() + 1).toString().padStart(2, '0');
                    const day = d.getDate().toString().padStart(2, '0');
                    const dateString = `${year}-${month}-${day}`;
          
                    if (!marked[dateString]) {
                      marked[dateString] = { periods: [] };
                    }
                    console.log(startingDay)
                    marked[dateString].periods.unshift({
                        startingDay: dateString === startingDay.slice(0, 10),
                        endingDay: dateString === endingDay.slice(0, 10),
                        color: color,
                        text: text,
                        betweenStartAndEnd: d >= startDate && d <= endDate
                    });
                  }
                }
        });
        console.log('Marked Dates:', JSON.stringify(marked, null, 2));
      
        return marked;
    };
      
    
    const handle_Add = () => {
        // Handle navigation to the announcement details screen
        //console.log("Navigating to announcement:", announcement.title);
        const maxId = Math.max(...announcements.map(n => n.id), 0)
        navigation.navigate("Add_Announcement", maxId)
    };

    return(

        <View style={{backgroundColor: colors.background_white, height: '100%'}}>
            <View style={{ height: 97}}>
                <LinearGradient
                colors={['#FCF3D0', '#D6E2D7', '#BED7DC']}
                style={{ flex: 1, height:97, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}
                >
                <Text style={{ ...H3, fontWeight: 'bold', color: colors.text_white, paddingTop: 49, paddingLeft: 16 }}>
                    社區網路通
                </Text>
                </LinearGradient>
            </View>
            <ScrollView style={{paddingHorizontal: 20}}>
                  
                <View style={{marginTop: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{...Title, fontWeight: 'bold', color: colors.text_black}}>
                        社區公告
                    </Text>
                    <Button primary_filled={true} iconLibrary={AntDesign} icon="plus" title= '新增公告' onPress={handle_Add} />
                </View>
                <View style={styles.filterContainer}>
                    <FilterTab label="All" text="全部公告" onPress={() => setFilterCategory('All')} />
                    <FilterTab label="最新消息" text="最新消息" onPress={() => setFilterCategory('最新消息')} />
                    <FilterTab label="里長轉知" text="里長轉知" onPress={() => setFilterCategory('里長轉知')} />
                    <FilterTab label="管委會相關" text="管委會相關" onPress={() => setFilterCategory('管委會相關')} />
                </View>
                <View style={styles.table_head}>
                    <Text style={[styles.table_caption, { flex: 3 }]}>發佈日期</Text>
                    <Text style={[styles.table_caption, { flex: 3 }]}>標題</Text>
                    <Text style={[styles.table_caption, { flex: 3 }]}>類別</Text>
                    <Text style={[styles.table_caption, { flex: 1 }]}></Text>
                </View>
                {filteredAnnouncements.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((announcement, index, arr) => (
                    <AnnouncementItem
                        key={announcement.id}
                        announcement={announcement}
                        isLast={index === arr.length - 1}
                    />
                ))}
                <View style={styles.pagination_container}>
                    <Button primary_filled={true} iconLibrary={AntDesign} icon="left" onPress={() => handlePageChange('prev')} />
                    <Text style={{ marginHorizontal: 20, fontSize: 16, color: colors.text_dark }}>{currentPage} / {totalPages}</Text>
                    <Button primary_filled={true} iconLibrary={AntDesign} icon="right" onPress={() => handlePageChange('next')} />
                </View>
                <View style={{paddingBottom: 16}}>
                    <Text style={{...Title, fontWeight: 'bold', color: colors.text_black, paddingVertical: 16}}>
                        社區行事曆
                    </Text>
                    <SafeAreaView>
                        <Calendar
                            initialDate="2024-05-01"
                            markingType="multi-period"
                            markedDates={getMarked(announcements)}
                            style={{
                                    borderRadius: 10,
                                    backgroundColor: colors.text_white,
                                    margin: 0
                            }}
                            theme={{
                                'stylesheet.calendar.header': {
                                    header: {
                                    // override the default header style react-native-calendars/src/calendar/header/style.js
                                    backgroundColor: colors.primary_50, // set the backgroundColor for header
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderTopLeftRadius: 8,
                                    borderTopRightRadius: 8,
                                    width: '100%'
                                    },
                                    monthText: {
                                    color: colors.text_white,
                                    ...Title,
                                    fontWeight: '700',
                                    fontSize: 16,
                                    },
                                    dayHeader: {
                                    marginTop: 2,
                                    ...Smallest_Body_Regular,
                                    color: colors.text_black,
                                    marginBottom: 7,
                                    textAlign: 'center',
                                    
                                    },                                    
                                },
                                'stylesheet.calender.basic.day':{
                                    text: {
                                        ...Smallest_Body_Regular,
                                        color: colors.primary_100,
                                        backgroundColor: colors.primary_100,
                                    },
                                }
                            }}
                            onDayPress={day => {
                                console.log('selected day', day);
                            }}
                            // markedDates={{
                            //     [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
                            // }}
                        />
                    </SafeAreaView>
                </View>
            </ScrollView>            
        </View>
        
        
    )
}

const styles = StyleSheet.create({
    pagination_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: 170,
        paddingTop: 16,
        gap: 8,
        width: 170
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'center', // This centers the filter tabs horizontally
        backgroundColor: colors.background_white,
        borderBottomColor: colors.tertiary_50,
    },
    filterTab: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 8,
    },
    
    filterTabActive: {
        borderBottomWidth: 4,
        borderBottomColor: colors.primary_100, // Highlight color for active tab
    },
    filterTabText: {
        ...Body_Regular,
        color: colors.tertiary_75,
    },
    filterTabTextActive: {
        color: colors.primary_100, 
        fontWeight: 'bold',
    },
    table_head:{
        flexDirection: 'row',
        backgroundColor: colors.primary_50,
        paddingVertical: 8,
        paddingHorizontal:8,
        justifyContent: 'center',
        flex: 1
    },
    table_caption:{
        color: colors.text_white,
        ...Body_bold,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    table_body:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colors.text_white,
        paddingVertical: 8,
        paddingHorizontal:8,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: 'lightgray'
    },
    table_body_last:{
        flexDirection: 'row',
        backgroundColor: colors.text_white,
        paddingVertical: 8,
        paddingHorizontal:8,
        justifyContent: 'center',
        borderColor: 'lightgray',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius:10
    },
    table_data:{
        ...Body_Regular,
        textAlign: 'center'
    },
    table_data_new:{
      ...Body_Regular,
      textAlign: 'center',
      fontWeight: 'bold'
    },
});

export default Home_Admin
