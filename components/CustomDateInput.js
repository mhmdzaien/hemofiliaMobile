import { Text,View, TextInput,StyleSheet } from 'react-native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form'
import DatePicker from 'react-native-date-picker'

function CustomDateInput({control,name,placeholderText,rules = {}}) {
    return (
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({field:{value,onChange,onBlur},fieldState:{error}})=>(
                   <>
                     <View style={[style.container,{borderColor:error ? '#CE1E20' : '#e8e8e8'}]}>
                        <DatePicker
                            mode="date"
                            modal
                            open={false}
                            date={new Date()}
                            placeholderText='Select date'
                            onChangeText={onChange}
                            selected={value}
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
          },

})
export default CustomDateInput;