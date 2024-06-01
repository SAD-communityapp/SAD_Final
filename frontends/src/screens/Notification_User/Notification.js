import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from "../../assets/colors/colors";
import Button from '../../components/Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { H3, Small_Body_Bold, Body_Regular } from '../../assets/TextStyles';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
const Notification = () => {
    const navigation = useNavigation();

    // const [notifications, setNotifications] = useState([
    //     { id: 1, title: '水塔清洗通知', date: '2024/03/21 12:20', hasDot: true, details: '明日 09:00~17:00 A 棟清洗水塔，詳情請看相關公告。' },
    //     { id: 2, title: '包裹到貨通知', date: '2024/03/18 12:20', hasDot: true, details: '您的包裹已到達，請於 03/28 前取件。' },
    //     { id: 3, title: '撞球桌預約提醒', date: '2024/03/17 12:20', hasDot: true, details: '您明日有預約撞球桌，詳情請看預約紀錄。' },
    //     { id: 4, title: '撞球桌預約提醒', date: '2024/03/16 12:20', hasDot: false, details: '您明日有預約撞球桌，詳情請看預約紀錄。' },
    //     { id: 5, title: '包裹到貨通知', date: '2024/03/13 12:20', hasDot: false, details: '您的包裹已到達，請於 03/23 前取件。' },
    //     { id: 6, title: '包裹到貨通知', date: '2024/03/12 12:20', hasDot: false, details: '您的包裹已到達，請於 03/22 前取件。' },
    //     { id: 7, title: 'KTV 預約提醒', date: '2024/03/08 12:20', hasDot: false, details: '您明日有預約 KTV，詳情請看預約紀錄。' },
    //     { id: 8, title: '管理費繳費通知', date: '2024/03/05 12:20', hasDot: false, details: '請於 03/15 前繳交三月份管理費。' },
    //     { id: 9, title: '水塔清洗通知', date: '2024/02/21 12:20', hasDot: false, details: '明日 09:00~17:00 B 棟清洗水塔，詳情請看相關公告。' },
    //     { id: 10, title: '包裹到貨通知', date: '2024/02/18 12:20', hasDot: true, details: '您的包裹已到達，請於 02/28 前取件。' },
    //     { id: 11, title: '撞球桌預約提醒', date: '2024/02/17 12:20', hasDot: false, details: '您明日有預約撞球桌，詳情請看預約紀錄。' },
    //     { id: 12, title: '撞球桌預約提醒', date: '2024/02/16 12:20', hasDot: false, details: '您明日有預約撞球桌，詳情請看預約紀錄。' },
    //     { id: 13, title: '包裹到貨通知', date: '2024/02/13 12:20', hasDot: true, details: '您的包裹已到達，請於 02/23 前取件。' },
    //     { id: 14, title: '包裹到貨通知', date: '2024/02/12 12:20', hasDot: false, details: '您的包裹已到達，請於 02/22 前取件。' },
    //     { id: 15, title: 'KTV 預約提醒', date: '2024/02/08 12:20', hasDot: false, details: '您明日有預約 KTV，詳情請看預約紀錄。' },
    //     { id: 16, title: '管理費繳費通知', date: '2024/02/05 12:20', hasDot: false, details: '請於 02/15 前繳交二月份管理費。' },
    //     { id: 17, title: '水塔清洗通知', date: '2024/01/21 12:20', hasDot: false, details: '明日 09:00~17:00 C 棟清洗水塔，詳情請看相關公告。' },
    //     { id: 18, title: '包裹到貨通知', date: '2024/01/18 12:20', hasDot: false, details: '您的包裹已到達，請於 01/28 前取件。' },
    //     { id: 19, title: '撞球桌預約提醒', date: '2024/01/17 12:20', hasDot: false, details: '您明日有預約撞球桌，詳情請看預約紀錄。' },
    //     { id: 20, title: '撞球桌預約提醒', date: '2024/01/16 12:20', hasDot: false, details: '您明日有預約撞球桌，詳情請看預約紀錄。' },
    //     { id: 21, title: '包裹到貨通知', date: '2024/01/13 12:20', hasDot: false, details: '您的包裹已到達，請於 01/23 前取件。' },
    //     { id: 22, title: '包裹到貨通知', date: '2024/01/12 12:20', hasDot: false, details: '您的包裹已到達，請於 01/22 前取件。' },
    //     { id: 23, title: 'KTV 預約提醒', date: '2024/01/08 12:20', hasDot: false, details: '您明日有預約 KTV，詳情請看預約紀錄。' },
    //     { id: 24, title: '管理費繳費通知', date: '2024/01/05 12:20', hasDot: false, details: '請於 01/15 前繳交三月份管理費。' },
    //     { id: 25, title: '水塔清洗通知', date: '2023/12/21 12:20', hasDot: false, details: '明日 09:00~17:00 A 棟清洗水塔，詳情請看相關公告。' },
    //     { id: 26, title: '包裹到貨通知', date: '2023/12/18 12:20', hasDot: false, details: '您的包裹已到達，請於 12/28 前取件。' },
    //     { id: 27, title: '撞球桌預約提醒', date: '2023/12/17 12:20', hasDot: false, details: '您明日有預約撞球桌，詳情請看預約紀錄。' },
    //     { id: 28, title: '撞球桌預約提醒', date: '2023/12/16 12:20', hasDot: false, details: '您明日有預約撞球桌，詳情請看預約紀錄。' },
    //     { id: 29, title: '包裹到貨通知', date: '2023/12/13 12:20', hasDot: false, details: '您的包裹已到達，請於 12/23 前取件。' },
    //     { id: 30, title: '包裹到貨通知', date: '2023/12/12 12:20', hasDot: false, details: '您的包裹已到達，請於 12/22 前取件。' },
    //     { id: 31, title: 'KTV 預約提醒', date: '2023/12/08 12:20', hasDot: false, details: '您明日有預約 KTV，詳情請看預約紀錄。' },
    //     { id: 32, title: '管理費繳費通知', date: '2023/12/05 12:20', hasDot: false, details: '請於 12/15 前繳交二月份管理費。' },
    //     // more notifications
    // ]);
    const [notifications, setNotifications] = useState([]);
    useFocusEffect(
        React.useCallback(() => {
            // 重新執行你的 useEffect 邏輯
            axios.get('http://10.0.2.2:3000/notifications')
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

                setNotifications(sortedAnnouncements);
              })
              .catch((error) => {
                console.log(error)
              });
              

            // 確保清理函數返回取消訂閱的邏輯
            return () => {
                // 清理函數（如果需要的話）
            };
        }, [])
    );

    const [viewedNotifications, setViewedNotifications] = useState(new Set());
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(notifications.length / itemsPerPage);

    const NotificationItem = ({ id, title, date, hasDot, details, onExpand, isLast }) => {
        const [isOpen, setIsOpen] = useState(false);
    
        const toggleItem = () => {
            setIsOpen(!isOpen);
            onExpand(id);
            if (isOpen && hasDot) {
                axios.put(`http://10.0.2.2:3000/notifications/id=${id}`)
                .then((response) => {
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log(error)
                });
                axios.get('http://10.0.2.2:3000/notifications')
                .then((response) => {
                    axios.get('http://10.0.2.2:3000/notifications')
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
      
                      setNotifications(sortedAnnouncements);
                    })
                    .catch((error) => {
                      console.log(error)
                    });
                })
                .catch((error) => {
                  console.log(error)
                });
            }
        };
        // 將日期字串解析為 Date 物件
        const parsedDate = new Date(date);

        // 格式化日期為 dd-mm-yyyy 形式
        const day = parsedDate.getDate().toString().padStart(2, '0');
        const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
        const year = parsedDate.getFullYear();
        const formattedDate = `${year}-${month}-${day}`;
    
        return (
            <TouchableOpacity activeOpacity={1} onPress={toggleItem} style={isLast == true? styles.item_last: styles.item}>
                <View style={styles.itemHeader}>
                    <View style={[styles.cell, styles.dateContainer]}>
                        <Text style={styles.date}>{formattedDate}</Text>
                    </View>
                    <View style={[styles.cell, styles.titleContainer]}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <View style={[styles.cell, styles.dotContainer]}>
                        {hasDot && !isOpen && <View style={styles.dot} />}
                    </View>
                    <View style={[styles.cell, styles.iconContainer]}>
                        <MaterialIcons name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color={colors.icon_dark} />
                    </View>
                </View>
                {isOpen && (
                    <View style = {styles.bodyContainer}>
                        <View style = {styles.bodySmallContainer}>
                            <Text style={styles.bodyText}>{details}</Text>

                        </View>
                        
                    </View>
                        
                )}
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
    
    return (
        <View style={{ backgroundColor: colors.background_white, height: '100%' }}>
            <View style={{ height: 97 }}>
                <LinearGradient
                    colors={['#FCF3D0', '#D6E2D7', '#BED7DC']}
                    style={{ flex: 1, height: 97, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
                >
                    <Text style={{ ...H3, fontWeight: 'bold', color: colors.text_white, paddingTop: 49, paddingLeft: 16 }}>
                        通知
                    </Text>
                </LinearGradient>
            </View>
            <ScrollView style={{ marginTop: 16, marginHorizontal: 25 }}>
                <View style={styles.tableHeader}>
                    <Text style={[styles.headerText, { flex: 3 }]}>通知時間</Text>
                    <Text style={[styles.headerText, { flex: 3 }]}>標題</Text>
                    <Text style={[styles.headerText, { flex: 2 }]}>狀態</Text>
                    <Text style={[styles.headerText, { flex: 1 }]}> </Text>
                </View>
                
                {notifications.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((notification, index, arr) => (
                    <NotificationItem
                        key={notification.id}
                        id={notification.id}
                        title={notification.title}
                        date={notification.date}
                        hasDot={notification.hasdot}
                        details={notification.details}
                        onExpand={() => {}}
                        isLast={index === arr.length - 1}
                    />

                ))}
                <View style={styles.pagination}>
                    <Button primary_filled={true} iconLibrary={AntDesign} icon="left" onPress={() => handlePageChange('prev')} />
                    <Text style={{ marginHorizontal: 20, fontSize: 16, color: colors.text_dark }}>{currentPage} / {totalPages}</Text>
                    <Button primary_filled={true} iconLibrary={AntDesign} icon="right" onPress={() => handlePageChange('next')} />
                </View>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: colors.primary_50,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    headerText: {
        fontWeight: 'bold',
        color: colors.text_white,
        flex: 1,
        textAlign: 'center',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30,
    },
    pageNumber: {
        marginHorizontal: 20,
    },
    item: {
        backgroundColor: colors.background_white,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        marginHorizontal: 0, // Centering the item
    },
    item_last: {
        backgroundColor: colors.background_white,
        // borderBottomColor: 'lightgray',
        marginHorizontal: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: 'hidden',
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: colors.text_white,
    },
    cell: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dotContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 16,
    },
    iconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        color: colors.text_black,
        textAlign: 'center',
    },
    date: {
        color: colors.text_black,
        textAlign: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'red',
        marginRight: 10,
    },
    bodyText: {
        color: colors.text_dark,
        ...Body_Regular,
        textAlign: 'center',

    },
    bodyContainer:{
        backgroundColor: colors.text_white,
        paddingVertical: 8,
        paddingHorizontal: 8
    },
    bodySmallContainer:{
        paddingHorizontal: 8,
        paddingVertical: 16,
        borderRadius: 10,
        backgroundColor: colors.background_gray, 
    }
});


export default Notification;
