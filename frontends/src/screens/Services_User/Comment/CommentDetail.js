import React, { useState,} from "react";
import {View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { H3, Title, Body_Regular, Body_bold, Small_Body_Bold, Small_Body_Regular, Smallest_Body_Regular } from '../../../assets/TextStyles';
import Button from "../../../components/Button";
import colors from "../../../assets/colors/colors";
import Feather from 'react-native-vector-icons/Feather';
import Header from "../../../components/Header";
import Send from "../../../components/Send";

const CommentDetail = ({navigation}) =>{
    const [comments, setComments] = useState([]);
    const [inputText, setInputText] = useState('');
    const handleAddComment = () => {
        if (inputText.trim() !== '') {
            setComments([...comments, { id: comments.length + 1, content: inputText, name: '小黃雞', time: '剛剛', img: require("../../../assets/img/image12.png") }]);
            setInputText('');
          }
      };
    const [username, setUsername] = useState("小黃雞");
    const handleUsernameChange = (text) => {
        setUsername(text);
    };

    const CommentItem = ({ comment}) => {
        const {name, img, content, time } = comment;
    
        return (
          <View style={styles.commentContainer}>
            <Image
            source={img}
            style={styles.image}
            >
            
            </Image>
            <View style={styles.commentTextContainer}>{/*main comment*/}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{color:colors.tertiary_100}}>{name}{/*name*/}</Text>
                <Text style={{color:colors.tertiary_100}}>{time}{/*time*/}</Text>
              </View>
              <Text>{content}{/*content*/}</Text>
            </View>
            
          </View>
        );
    };

    return(
        <View style={{backgroundColor: colors.background_white, height: '100%'}}>
            <Header title="意見反饋詳細"/>
            <View style={{marginHorizontal: 20}}>
                <View style={styles.twoItemContainer}>
                    <Text style={{...Body_Regular, width: 100}}>
                        類別
                    </Text>
                    <Text style={{...Body_Regular}}>
                        公設損壞
                    </Text>
                </View>
                <View style={styles.twoItemContainer}>
                    <Text style={{...Body_Regular, width: 100}}>
                        描述
                    </Text>
                    <Text style={{...Body_Regular}}>
                        圖書館天花板電燈壞掉
                    </Text>
                </View>
                <View style={styles.twoItemContainer}>
                    <Text style={{...Body_Regular, width: 100}}>
                        附加照片
                    </Text>
                    <Image
                        source={require("../../../assets/img/image01.png")}
                    />
                </View>
                <Text style={styles.titleText}>留言區</Text>
                <View style={styles.container}>
                    {/* 留言输入框 */}
                    <View>
                    <Image
                        source={require("../../../assets/img/image12.png")}
                        style={styles.image}
                    />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="留個言吧"
                        placeholderTextColor={colors.tertiary_75}
                        value={inputText}
                        onChangeText={setInputText}
                    />
                    <Send onPress={handleAddComment} disabled={!inputText}/>
                </View>
                {comments.length > 0 && (
                    comments.map(comment => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                        />
                    ))
                )
                
                }
            </View>
            
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 16,
      gap: 4,
    },
    image: {
        height: 114,
        width: 114,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: colors.tertiary_75,
    },
    inputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: colors.tertiary_75,
        paddingVertical: 4,
        paddingHorizontal: 12,
        ...Body_Regular,
        width: 200,
        textAlign: 'center',
    },
    twoItemContainer:{
        alignItems: 'center', 
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 16,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        paddingTop: 16,
    },
    titleText:{
        ...Title,
        fontWeight: 'bold'
    },
    input: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderWidth: 1.5,
        borderColor: colors.tertiary_75,
        borderRadius: 8,
        ...Smallest_Body_Regular,
        color: colors.text_black,
        backgroundColor: colors.text_white,
        height: 30,
    },
    image: {
      height: 40,
      width: 40,
      borderRadius: 100,
      borderWidth: 2,
      borderColor: colors.tertiary_75,
    },
      image: {
        height: 40,
        width: 40,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: colors.tertiary_75,
      },
      commentContainer: {
        marginTop: 16,
        flexDirection: 'row',
        flex: 1,
      },
      commentTextContainer:{
        gap: 8,
        flex: 1,
      },
      replyContainer: {
        flexDirection: 'row',
        gap: 8,
        flex: 1,
        marginLeft: 60,
        marginRight: 20,
      },
      replyTextContainer:{
        gap: 8,
        flex: 1,
      },
      replyInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        gap: 4
      },
      replyInput: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderWidth: 1.5,
        borderColor: colors.tertiary_75,
        borderRadius: 8,
        ...Smallest_Body_Regular,
        color: colors.text_black,
        backgroundColor: colors.text_white,
        height: 30,
      },
      replyButton: {
        color: colors.tertiary_100,
        marginTop: 8,
      },
      comments:{
    
      }
})
export default CommentDetail