import React, { useState } from 'react';
  import { StyleSheet, Text, View } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import colors from '../assets/colors/colors';

  const DropdownComponent = (props) => {
    const { data, onValueChange } = props;
    const [value, setValue] = useState("");
    const [isFocus, setIsFocus] = useState(false);

    const handleChange = (item) => {
        setValue(item.value);
        setIsFocus(false);
        if (onValueChange) {
            onValueChange(item.value);
        }
    };

    return (
        <View style={styles.container}>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: colors.primary_100 }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={'請選擇'}
                searchPlaceholder="搜尋..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={handleChange}
            />
        </View>
    );
};
const styles = StyleSheet.create({
  dropdown: {
      marginTop: 16,
      backgroundColor: colors.text_white,
      height: 50,
      borderColor: colors.tertiary_25,
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: colors.tertiary_100,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
  export default DropdownComponent;