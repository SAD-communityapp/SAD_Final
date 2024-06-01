import { Text, View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import Header from '../../components/Header'
import React, { Component, useState } from 'react'
import { Title, Body_Regular} from '../../assets/TextStyles'
import colors from '../../assets/colors/colors'
import { useRoute } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import CommentSection_Admin from '../../components/CommentSection_Admin';


const AnnouncementDetail_Admin = ({route}) => {
  const { announcement } = route.params;
  console.log(announcement.content)
    // const [attachment, setAttachment] = useState(null); // 用于存储附件信息

  // // 模拟从后端获取附件信息的函数
  // const fetchAttachment = () => {
  //   // 这里应该调用您的后端 API 来获取附件信息
  //   // 示例：假设附件信息包含名称和下载链接
  //   const attachmentInfo = {
  //     name: '附件文件.pdf',
  //     url: 'https://example.com/attachment.pdf'
  //   };
  //   setAttachment(attachmentInfo);
  // };

  // // 处理下载附件的函数
  // const handleDownloadAttachment = () => {
  //   // 确保有附件信息可用
  //   if (attachment) {
  //     // 使用 Linking 打开附件链接，即触发下载操作
  //     Linking.openURL(attachment.url);
  //   }
  // };

  // const route = useRoute(); // 使用 useRoute 钩子获取路由参数
  //const { announcement } = route.params; // 从路由参数中获取公告对象
  const navigation = useNavigation()

  
  return (
    // <View style={styles.container}>
    //   <Text style={styles.title}>{announcement.title}</Text>
    //   <Text style={styles.content}>{announcement.content}</Text>
    // </View>
    // <View>

    <View style={{backgroundColor: colors.background_white, height: '100%'}}>
        <Header title = "公告詳細內容"/>
        <ScrollView style={{marginBottom: 16}}>
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{announcement.title}</Text>
                <Text style={styles.titleText}>{announcement.date}</Text>
              </View>
              <View style={styles.contentContainer}>
                <Text>{announcement.content}</Text>
              </View>                          
              {/* 显示附件名称 */}
                {/* {attachment && (
                  <Text>附件：{attachment.name}</Text>
                )} */}
                <View style={{ flexDirection: 'row', marginHorizontal: 20, alignItems: 'center', gap: 8}}>
                  <Icon name = {"paperclip"} size={12} style={{ color: colors.primary_100, marginTop: 3}}></Icon>
                  <Text style = {{color: colors.primary_100,}}>
                    {announcement.attach}
                  </Text>
                </View>
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>留言區</Text>
              </View>
              <CommentSection_Admin aID = {announcement.id}></CommentSection_Admin>

        </ScrollView>
    </View>

  );
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingTop: 16,
    marginHorizontal: 20
  },
  titleText:{
    ...Title,
    fontWeight: 'bold'
  },
  contentContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingTop: 16,
    marginHorizontal: 20
  },

  content: {
    ...Body_Regular,
    color: colors.text_black,
  },
});

export default AnnouncementDetail_Admin;

// export default class AnnouncementDetail extends Component {
//   render() {
//     return (
//       <View>
//         <View style={{ height: 97}}>
//                 <LinearGradient
//                 colors={['#FCF3D0', '#D6E2D7', '#BED7DC']}
//                 style={{ flex: 1, height:97, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}
//                 >
//                 <Text style={{ ...H3, fontWeight: 'bold', color: colors.text_white, paddingTop: 49, paddingLeft: 16 }}>
//                 社區網路通
//                 </Text>
//                 </LinearGradient>
//             </View>
//         <Text>AnnouncementDetail</Text>
//       </View>
//     )
//   }
// }