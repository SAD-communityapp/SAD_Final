import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image, TextBase} from 'react-native'
import React, { useState , useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import { H3, Title, Body_Regular, Body_bold, Small_Body_Bold, Small_Body_Regular, Smallest_Body_Regular } from '../../assets/TextStyles';
import Button from '../../components/Button';
import Header from '../../components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const initialReseravtions = [
    { id: 1, title: '會議室', date: '2024/06/30', hasDot: true, timePeriods: ['15:00 ~ 16:00', '16:00 ~ 17:00'] },
    { id: 2, title: '撞球桌', date: '2024/05/29', hasDot: true, timePeriods: ['15:00 ~ 16:00', '16:00 ~ 17:00'] },
    { id: 3, title: '撞球桌', date: '2024/03/17', hasDot: true, timePeriods: ['15:00 ~ 16:00', '16:00 ~ 17:00'] },
    { id: 4, title: '撞球桌', date: '2024/01/18', hasDot: false, timePeriods: ['15:00 ~ 16:00', '16:00 ~ 17:00'] },
    { id: 5, title: '會議室', date: '2023/12/11', hasDot: false, timePeriods: ['15:00 ~ 16:00', '16:00 ~ 17:00'] },
    { id: 6, title: '會議室', date: '2023/12/10', hasDot: false, timePeriods: ['15:00 ~ 16:00', '16:00 ~ 17:00'] },
    { id: 7, title: 'KTV', date: '2023/12/8', hasDot: false, timePeriods: ['15:00 ~ 16:00', '16:00 ~ 17:00'] },
    { id: 8, title: 'KTV', date: '2023/11/11', hasDot: false, timePeriods: ['15:00 ~ 16:00', '16:00 ~ 17:00'] },
    { id: 9, title: 'KTV', date: '2023/09/1', hasDot: false, timePeriods: ['15:00 ~ 16:00', '16:00 ~ 17:00'] },

    // more reservations
]


const ReservationRecord = ({ route }) => {
    const currentDate = new Date();

    const [reservations, setReservation] = useState(initialReseravtions);

    
    const isFutureDate = (dateString) => {
        const dateParts = dateString.split('/');
        const date = new Date(`${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`);
        return date > currentDate;
    };

    const navigation = useNavigation();
    const handlePoolBall = () => {

    }
    const handleMeeting = () => {
      navigation.navigate("MeetingRoom", { activeTab: activeTab });
    }
    const [activeTab, setActiveTab] = useState('active');
    useEffect(() => {
        if (route.params === 'records') {
            setActiveTab(route.params);
        }
    }, [route.params]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleCancel = (id) => {
        setReservation(prevReservations => prevReservations.filter(reservation => reservation.id !== id));
    };
    
    const [viewedReservations, setViewedReservations] = useState(new Set());
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 13;
    const totalPages = Math.ceil(reservations.length / itemsPerPage);

    const ReservationItem = ({ id, title, date, hasDot, timePeriods, onExpand, isLast }) => {
        const [isOpen, setIsOpen] = useState(false);
    
        const toggleItem = () => {
            setIsOpen(!isOpen);
            onExpand(id);
            if (isOpen && hasDot) {

                setReservation(prevReservations => 
                    prevReservations.map(reservation => 
                        reservation.id === id ? { ...reservation, hasDot: false } : reservation
                    )
                );
                
                setViewedReservations(prevViewedReservations => {
                    const updatedViewedReservations = new Set(prevViewedReservations);
                    updatedViewedReservations.add(id);
                    return updatedViewedReservations;
                });
            }
        };
    
        return (
            <TouchableOpacity activeOpacity={1} onPress={toggleItem} style={isLast == true? styles.item_last: styles.item}>
                <View style={styles.itemHeader}>
                    <View style={[styles.cell, styles.dateContainer]}>
                        <Text style={styles.date}>{date}</Text>
                    </View>
                    <View style={[styles.cell, styles.titleContainer]}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    {/* <View style={[styles.cell, styles.dotContainer]}>
                        {hasDot && !isOpen && <View style={styles.dot} />}
                    </View> */}
                    <View style={[styles.cell, styles.iconContainer]}>
                        <MaterialIcons name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color={colors.icon_dark} />
                    </View>
                </View>
                {isOpen && (
                    <View style = {styles.bodyContainer}>
                        <View style = {styles.bodySmallContainer}>
                        {timePeriods.map((period, index) => (
                            <Text key={index} style={styles.bodyText}>{period}</Text>
                        ))}
                            {isFutureDate(date) && (
                                <View style={{ width: 64, alignSelf: 'center', marginTop: 16 }}>
                                    <Button title="取消" tertiary_filled={true}/>
                                </View>
                            )}
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
    




        //真正要 return 的東西
        return (
          <View style={{backgroundColor: colors.background_white, height: '100%'}}>
                <Header title = "公設預約紀錄"/>
                    <ScrollView style={{ marginTop: 16, marginHorizontal: 25 }}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.headerText, { flex: 3 }]}>日期</Text>
                        <Text style={[styles.headerText, { flex: 3 }]}>標題</Text>
                        <Text style={[styles.headerText, { flex: 1 }]}> </Text>
                    </View>
                    
                    {reservations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((reservation, index, arr) => (
                        <ReservationItem
                            key={reservation.id}
                            id={reservation.id}
                            title={reservation.title}
                            date={reservation.date}
                            hasDot={reservation.hasDot}
                            timePeriods={reservation.timePeriods}
                            onExpand={() => {}}
                            isLast={index === arr.length - 1}
                        />

                    ))}
                    <View style={styles.pagination}>
                        <Button primary_filled={true} iconLibrary={AntDesign} icon="left" onPress={() => handlePageChange('prev')} />
                        <Text style={{ marginHorizontal: 20, fontSize: 16, color: colors.text_dark }}>{currentPage}</Text>
                        <Button primary_filled={true} iconLibrary={AntDesign} icon="right" onPress={() => handlePageChange('next')} />
                    </View>
            </ScrollView>
          </View>
      )
}

const styles = StyleSheet.create({
    headerBackground:{
        flexDirection: 'row',
        paddingHorizontal: 16,
        flex: 1,
        paddingTop: 48,
        paddingBottom: 16,
        borderBottomLeftRadius: 20, 
        borderBottomRightRadius: 20,
        gap: 8,
        alignItems: 'center',
    },
    headerContainer:{
        flexDirection: 'row',
        flex: 1,
        gap: 8,
        alignItems: 'center',
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
        ...Title,
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
        ...Title,
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

export default ReservationRecord;