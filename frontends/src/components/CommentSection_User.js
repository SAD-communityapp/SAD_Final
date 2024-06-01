import React, { useState, useRef, useEffect} from 'react';
import { View, Text, TextInput, FlatList, TouchableWithoutFeedback,TouchableOpacity, StyleSheet, Image, Keyboard } from 'react-native';
import Send from './Send';
import colors from '../assets/colors/colors';
import { Smallest_Body_Regular } from '../assets/TextStyles';

const CommentSection = (props) => {
  const { aID } = props;

  const [comments, setComments] = useState([
    { id: 1, announcementID: 1, name: '劉阿版', img: require("../assets/img/comment.png"), content: "為什麼又要洗水塔，又要停水很麻煩欸！", time: '13 小時前'},    
    { id: 2, announcementID: 3, name: '小黃雞', img: require("../assets/img/image12.png"), content: "看起來真好玩", time: '2024-03-26'},    
    { id: 3, announcementID: 1, name: '管理員', img: require("../assets/img/image27.png"), content: "不好意思，因為近日有颱風造成水質下降，因此管委會決定要再次清洗水塔，對於您的不便，我們深感抱歉。", time: '2 小時前'}
    // Add additional announcement with building field
]);
  
  const filteredComments = comments.filter(comment => comment.announcementID === aID);
  const [inputText, setInputText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyVisible, setReplyVisible] = useState(false); 
  const replyInputRef = useRef(null);
  const handleAddComment = () => {
    if (inputText.trim() !== '') {
      setComments([...comments, { id: comments.length + 1, content: inputText, name: '小黃雞', time: '剛剛', announcementID: aID, img: require("../assets/img/image12.png") }]);
      setInputText('');
    }
  };
  const handleContainerPress = () => {
    setReplyVisible(false);
  };

  const handleReply = () => {
    if (replyVisible && replyText.trim() !== '') {
      // 如果回复框已经显示且有输入文字，则直接发送回复
      handleSendReply();
    } else {
      // 否则，显示回复框
      setReplyVisible(true);
    }
  };

  const handleSendReply = () => {
    if (replyText.trim() != '') {
      setComments([...comments, { id: comments.length + 1, text: replyText }]);
      setReplyText(''); 
      setReplyVisible(false);
    }
  };

  const CommentItem = ({ comment}) => {
    const { id, name, img, content, time } = comment;

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

  const renderReplyInput = () => {
    return (
      <View style={styles.replyInputContainer}>
        <TextInput
          style={styles.replyInput}
          placeholder="輸入回覆..."
          placeholderTextColor={colors.tertiary_75}
          value={replyText}
          onChangeText={setReplyText}
        />
        <Send onPress={handleSendReply} disabled={replyText.trim() === ''} />
      </View>
    );
  };

  useEffect(() => {
    if (!replyText.trim()) {
      const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);
      return () => {
        keyboardDidHideListener.remove();
      };
    }
  }, [replyText]);


  const handleKeyboardDidHide = () => {
    if (!replyText.trim()) {
      setReplyVisible(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleContainerPress}>
          <View  style={{gap: 16, marginTop: 16}}>
              <View style={styles.container}>
                {/* 留言输入框 */}
                <View>
                  <Image
                    source={require("../assets/img/image12.png")}
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
                  {/* 留言列表 */}

                {/* 留言列表 */}
                {/* <FlatList
                  data={comments}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.commentItem}>
                      <Text>{item.text}</Text>
                    </TouchableOpacity>
                  )}
                /> */}
              </View>

              {filteredComments.map((comment, index, arr) => (
                  <CommentItem
                      key={comment.id}
                      comment={comment}
                  />
              ))}
              
              {/* <View style={styles.commentContainer}>
                <Image
                source={require("../assets/img/comment.png")}
                style={styles.image}
                >
                
                </Image>
                <View style={styles.commentTextContainer}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{color:colors.tertiary_100}}>留阿版</Text>
                    <Text style={{color:colors.tertiary_100}}>13 小時前</Text>
                  </View>
                  <Text>為什麼又要洗水塔，又要停水很麻煩欸！</Text>
                  <TouchableOpacity onPress={handleReply}>
                        <Text style={styles.replyButton}>回覆</Text>
                  </TouchableOpacity>
                  {replyVisible && renderReplyInput()}
                </View>
                
              </View> */}
              {/* <View style={styles.replyContainer}>
                <Image
                source={require("../assets/img/image27.png")}
                style={styles.image}
                >
                
                </Image>
                <View style={styles.replyTextContainer}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{color:colors.tertiary_100}}>管理員</Text>
                    <Text style={{color:colors.tertiary_100}}>剛剛</Text>
                  </View>
                  <Text>不好意思，因為近日有颱風造成水質下降，因此管委會決定要再次清洗水塔，對於您的不便，我們深感抱歉。</Text>
                  <TouchableOpacity >
                        <Text style={{color:colors.tertiary_100}}>回覆</Text>
                  </TouchableOpacity>
                </View>
              </View> */}
          </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    justifyContent: 'space-between',
    
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
  commentContainer: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
    marginHorizontal: 20
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
});

export default CommentSection;