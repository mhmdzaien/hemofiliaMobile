import React, {Component, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {format} from 'date-fns';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import CustomTextInput from '../../components/CustomTextInput';

const Register = () => {
  const navigation = useNavigation();

  const [gender, setGender] = useState();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errorGender, setErrorGender] = useState('');

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onRegisterPress = async data => {
    setLoading(true);
    let formData = {
      nama: data.nama,
      jenis_kelamin: gender,
      tempat_lahir: data.tempat_lahir,
      tanggal_lahir: format(new Date(date), 'yyyy-MM-dd'),
      alamat: data.alamat,
      no_hp: data.no_hp,
      email: data.email,
      username: data.username,
      password: data.password,
    };
    try {
      let response = await fetch(
        'https://care4blood.ulm.ac.id/api/registerMobile',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Accept: 'application/json',
            Authorization: 'Bearer care4Blood',
          },
          body: JSON.stringify(formData),
        },
      );

      let result = await response.json();
      setLoading(false);
      console.log(result);
      if (response.status == 200) {
        console.log(result.data);
        await AsyncStorage.setItem('@autentikasi', JSON.stringify(result.data));
        await navigation.navigate('Profile');
      } else {
        console.log(result);
      }
    } catch (exception) {
      console.log(exception);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#ffffff', paddingBottom: 10}}>
        <ScrollView>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <Image
                source={require('../images/header.png')}
                style={{width: 80, height: 62, marginTop: 10}}
              />
              <Text
                style={{
                  color: '#000000',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginTop: 10,
                }}>
                Pendaftaran Pengguna
              </Text>
            </View>
            <View style={{marginHorizontal: 20}}>
              <CustomTextInput
                name="nama"
                placeholder="Nama"
                control={control}
                rules={{required: 'Username is required'}}
              />
              <View style={{marginVertical: 5}}>
                <Text style={{marginBottom: 5}}>Jenis kelamin</Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={[
                      style.genderButton,
                      {
                        backgroundColor:
                          gender == 'Laki - laki' ? 'lightgrey' : '#ffffff',
                      },
                    ]}
                    onPress={() => setGender('Laki - laki')}>
                    <Icon name="mars" size={15} color="#BA0E14" />
                    <Text style={{marginLeft: 5, color: '#5C5C5C'}}>
                      Laki - laki
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      style.genderButton,
                      {
                        backgroundColor:
                          gender == 'Perempuan' ? 'lightgrey' : '#ffffff',
                      },
                    ]}
                    onPress={() => setGender('Perempuan')}>
                    <Icon name="venus" size={15} color="#BA0E14" />
                    <Text style={{marginLeft: 5, color: '#5C5C5C'}}>
                      Perempuan
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={{color: 'red'}}>{errorGender}</Text>
                </View>
              </View>
              {/* <CustomTextInput 
                                name="tempat_lahir"
                                placeholder="Tempat lahir (Opsional/Boleh Tidak Diisi)"
                                control={control}
                                rules={{}}
                            /> */}
              <View style={{marginVertical: 5}}>
                <Text style={{marginBottom: 5}}>Tanggal lahir</Text>
                <Button
                  color="lightgrey"
                  title={format(new Date(date), 'dd-MM-yyyy')}
                  onPress={() => setOpen(true)}
                />
                <DatePicker
                  mode="date"
                  modal
                  open={open}
                  date={date}
                  onConfirm={date => {
                    setOpen(false);
                    setDate(date);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
              </View>
              {/* <CustomTextInput 
                                name="alamat"
                                placeholder="Alamat (Opsional/Boleh Tidak Diisi)"
                                control={control}
                                rules={{}}
                            />
                            <CustomTextInput 
                                name="no_hp"
                                placeholder="Nomor telepon (Opsional/Boleh Tidak Diisi)"
                                control={control}
                                rules={{}}
                            /> */}
              <CustomTextInput
                name="email"
                placeholder="Email / Surel"
                control={control}
                rules={{
                  required: 'email is required',
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: 'invalid email format',
                  },
                }}
              />
              <CustomTextInput
                name="username"
                placeholder="Nama user"
                control={control}
                rules={{required: 'Username is required'}}
              />
              <CustomTextInput
                name="password"
                placeholder="Password minimal 8 char"
                control={control}
                rules={{
                  required: 'Password is required',
                  minLength: {
                    value: 3,
                    message: 'Password should be minimum 3 characters long',
                  },
                }}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: '#BA0E14',
                  height: 40,
                  paddingVertical: 7,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  marginTop: 30,
                }}
                onPress={handleSubmit(onRegisterPress)}>
                {isLoading ? (
                  <ActivityIndicator color={'#ffffff'} />
                ) : (
                  <Text style={{color: '#ffffff', fontSize: 16}}>Daftar</Text>
                )}
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  marginBottom: 15,
                  justifyContent: 'center',
                }}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={{color: '#000000', fontSize: 12}}>
                    Kembali ke halaman login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  genderButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 5,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Register;
