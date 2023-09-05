import { Text,View, TextInput,StyleSheet } from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';

function CustomTextInput({keyboardType,control,name,placeholder,secureTextEntry,value,rules = {}}) {
    return (
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({field:{value,onChange,onBlur},fieldState:{error}})=>(
                   <>
                     <View style={[style.container,{borderColor:error ? '#CE1E20' : '#e8e8e8'}]}>
                        <TextInput 
                            value={value}
                            onChangeText={onChange}
                            style={style.textInput}
                            placeholder={placeholder}
                            onBlur={onBlur}
                            autoCapitalize='none'
                            keyboardType={keyboardType}
                            secureTextEntry={secureTextEntry}
                            placeholderTextColor="lightgrey" 
                            />
                    </View>
                   {error && (
                     <Text style={{color:'red',alignSelf:'stretch'}}>{error.message || 'Error'}</Text>
                   )}
                   </>
                )}
            />
    );
}

const style = StyleSheet.create({
    container :{
        backgroundColor:'white',
        width:'100%',
        borderColor:'#e8e8e8',
        borderWidth:1,
        borderRadius:5,
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    textInput : {
        color:'#303030',
        height:40
          },

})
export default CustomTextInput;