import React from 'react';
import { Text, View } from 'react-native';

const Header = ({headerText, bottomText}) => {
    const{ textStyle, viewStyle, HeaderTextStyle } = styles

    return (
        <View style={viewStyle }>
            <Text style={HeaderTextStyle}>{headerText}</Text>
            <Text style={textStyle}>{bottomText}</Text>
        </View>
    )
}

const styles = {
    viewStyle: {
        backgroundColor: '#3F51B5',
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        marginVertical: 20


    },
    HeaderTextStyle: {
        fontWeight: 'thin',
        fontSize: 30,
        color: '#FFFFFF',
        marginHorizontal: 30
    },
    textStyle: {
        fontSize: 16,
        color: '#FFFFFF',
        marginHorizontal: 40
    }
}

export default Header