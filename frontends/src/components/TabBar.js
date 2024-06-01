import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../assets/colors/colors';
// const TabBar = ({ activeTab, handleTabChange }) => {
//   return (
//     <View style={styles.tabContainer}>
//       <TouchableOpacity
//         activeOpacity={1}
//         style={[styles.tabItem, activeTab === 'active' && styles.activeTabItem]}
//         onPress={() => handleTabChange('active')}
//       >
//         <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>我要预约</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         activeOpacity={1}
//         style={[styles.tabItem, activeTab === 'records' && styles.activeTabItem]}
//         onPress={() => handleTabChange('records')}
//       >
//         <Text style={[styles.tabText, activeTab === 'records' && styles.activeTabText]}>预约记录</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
const TabBar = (props) => {
    const { activeTitle, recordTitle, activeTab, handleTabChange } = props;
    return (
      <View style={styles.tabContainer}>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.tabItem, activeTab === 'active' && styles.activeTabItem]}
          onPress={() => handleTabChange('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>{activeTitle}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.tabItem, activeTab === 'records' && styles.activeTabItem]}
          onPress={() => handleTabChange('records')}
        >
          <Text style={[styles.tabText, activeTab === 'records' && styles.activeTabText]}>{recordTitle}</Text>
        </TouchableOpacity>
      </View>
    );
  }

const styles = StyleSheet.create({
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
})
export default TabBar;