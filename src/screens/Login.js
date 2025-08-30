import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Button';
import CustomTextInput from '../../components/CustomTextInput';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import { SafeAreaView  } from 'react-native-safe-area-context';

const Login = () => {
  const [autentikasi, setAutentikasi] = useState('');

  const [isloaded, setIsloaded] = useState(false);

  const [errorMessage, setMessage] = useState('');

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const getData = async () => {
    try {
      let value = await AsyncStorage.getItem('@autentikasi');
      value = JSON.parse(value);

      if (value !== null) {
        navigation.navigate('Profile');
      } else {
        setIsloaded(true);
      }
      console.log('data generate successfuly');
    } catch (error) {
      console.log(error);
    }
  };

  const navigation = useNavigation();

  const onSignInPressed = async data => {
    try {
      setMessage('');
      fetch('https://care4blood.ulm.ac.id/api/loginMobile', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer care4Blood',
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      })
        .then(response => response.text())
        .then(responseText => {
          try {
            let json = JSON.parse(responseText);
            AsyncStorage.setItem('@autentikasi', responseText);
            navigation.navigate('Profile');
          } catch (err) {
            setMessage(responseText);
          }
        })
        .catch(err => console.log(err.code));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#ffffff'}}>
        {isloaded ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <Image
                source={require('../images/header.png')}
                style={{width: 111, height: 92, marginBottom: 10}}
              />
              <Text
                style={{color: '#000000', fontSize: 20, fontWeight: 'bold'}}>
                Login Akun
              </Text>
            </View>

            {errorMessage != '' && (
              <View
                style={{
                  backgroundColor: '#f8d7da',
                  justifyContent: 'center',
                  alignContent: 'center',
                  padding: 10,
                  marginHorizontal: 20,
                  borderRadius: 5,
                }}>
                <Text style={{color: '#721c24', textAlign: 'center'}}>
                  {errorMessage}
                </Text>
              </View>
            )}
            <View style={{marginHorizontal: 20}}>
              <CustomTextInput
                name="username"
                placeholder="Nama User"
                control={control}
                rules={{required: 'Username is required'}}
              />
              <CustomTextInput
                name="password"
                placeholder="Kata Sandi"
                control={control}
                secureTextEntry
                rules={{
                  required: 'Password is required',
                  minLength: {
                    value: 3,
                    message: 'Password should be minimum 3 characters long',
                  },
                }}
              />
              <Button text="Login" onPress={handleSubmit(onSignInPressed)} />
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <TouchableOpacity
                  style={{flex: 1}}
                  onPress={() => navigation.navigate('Register')}>
                  <Text style={{color: '#000000', fontSize: 16}}>
                    Belum punya akun ?
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Home')}
                  style={{justifyContent: 'center'}}>
                  <Text style={{color: '#000000', fontSize: 16}}>Batal</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <Text>Loading</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Login;
