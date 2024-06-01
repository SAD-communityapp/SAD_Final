import React, { useState, Dimensions } from 'react';
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../assets/colors/colors';
const ButtonPopUp = (props) => {
    const navigation = useNavigation();
    const [show, setShow] = useState(false);

    const renderOutsideTouchable = (onTouch) => {
        const view = <View style={{ flex: 1, width: '100%' }} />
        if (!onTouch) return view
        return (
            <TouchableWithoutFeedback onPress={onTouch} style={{ flex: 1, width: '100%' }}>
                {view}
            </TouchableWithoutFeedback>
        )
    }

    const renderTitle = () => {
        const { title } = props;
        return (
            <View>
                <Text style={{
                    color: colors.tertiary_100,
                    ...Title,
                    fontWeight: 'bold',
                    margin: 16,
                }}>
                    {title}
                </Text>
            </View>
        )
    }

    const renderContent = () => {
        const { data } = props;
        return (
            <View>
                <FlatList
                    style={{ marginBottom: 16 }}
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={renderItem}
                    extraData={data}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={renderSeparator}
                    contentContainerStyle={{
                        paddingBottom: 40
                    }}
                />
            </View>
        )
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ height: 50, flex: 1, alignItems: 'center'}}>
                <Text>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    const renderSeparator = () => {
        return (
            <View
                style={{
                    opacity: 0.1,
                    backgroundColor: '#182E44',
                    height: 1
                }}
            >
            </View>
        )
    }

    const { onTouchOutside, title } = props;

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={show}
            onRequestClose={() => setShow(false)}
        >
            <View style={{ flex: 1, backgroundColor: '#000000AA', justifyContent: 'flex-end' }}>
                {renderOutsideTouchable(onTouchOutside)}
                <View style={{
                    backgroundColor: colors.text_white,
                    width: '100%',
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    paddingHorizontal: 16,
                    maxHeight: deviceHeight * 0.4
                }}>
                    {renderTitle()}
                    {renderContent()}
                </View>
            </View>
        </Modal>
    )
}

export default ButtonPopUp;
