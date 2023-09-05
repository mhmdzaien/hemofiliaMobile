import { View, Text,TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'

const Button = ({onPress,text}) => {
 return (
    <View>
        <TouchableOpacity 
            style={style.customButton}
            onPress={onPress}
        >
        <Text style={style.buttonText}>{text}</Text>
        </TouchableOpacity>
    </View>
 );  
};

const style = StyleSheet.create({
    customButton : {
        backgroundColor :'#BA0E14',
        paddingVertical :7,
        justifyContent  :'center',
        alignItems      :'center',
        borderRadius    :5,
        marginTop       :10
    },
    buttonText: {
        color   : '#ffffff',
        fontSize: 20
    }
})

export default Button;