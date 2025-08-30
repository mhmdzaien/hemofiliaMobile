import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  ScrollView,
  StyleSheet,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {format} from 'date-fns';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import CustomTextInput from '../../components/CustomTextInput';
import { SafeAreaView  } from 'react-native-safe-area-context';

const EditProfile = props => {
  const navigation = useNavigation();

  const [gender, setGender] = useState();
  const [date, setDate] = useState('2022-09-02');
  const [open, setOpen] = useState(false);
  const [errorGender, setErrorGender] = useState('');

  //)
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: {errors},
  } = useForm();

  const onUpdatePress = async data => {
    let uuid = props.route.params.auth.uuid;
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
    // console.log(formData)
    let response = await fetch(
      `https://care4blood.ulm.ac.id/api/updateProfil/${uuid}`,
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
    console.log(result);

    if (response.status == 200) {
      // await AsyncStorage.removeItem('@autentikasi');
      await AsyncStorage.setItem('@autentikasi', JSON.stringify(result));
      await navigation.navigate('Home');
    } else {
      console.log(result);
    }
  };

  useEffect(() => {
    setDate(props.route.params.auth.tanggal_lahir);
    setGender(props.route.params.auth.jenis_kelamin);

    let defaultValues = {};

    defaultValues.nama = props.route.params.auth.nama;
    defaultValues.tempat_lahir = props.route.params.auth.tempat_lahir;
    defaultValues.alamat = props.route.params.auth.alamat;
    defaultValues.no_hp = props.route.params.auth.no_hp;
    defaultValues.email = props.route.params.auth.email;

    reset({...defaultValues});
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
          paddingBottom: 10,
          paddingTop: 10,
        }}>
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
                style={{width: 70, height: 50}}
              />
              <Text
                style={{
                  color: '#000000',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginTop: 10,
                }}>
                Ubah Profil
              </Text>
              {/* <Text style={{color:"#000000",fontSize:20,fontWeight:'bold',marginTop:10}}>{auth.jenis_kelamin}</Text> */}
            </View>
            <View style={{marginHorizontal: 20}}>
              <CustomTextInput
                name="nama"
                placeholder="Name"
                control={control}
                textColor="black"
                rules={{required: 'Username is required'}}
              />
              <View style={{marginVertical: 5}}>
                <Text style={{marginBottom: 5}}>Gender</Text>
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
                    <Text style={{marginLeft: 5, color: '#303030'}}>Male</Text>
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
                    <Text style={{marginLeft: 5, color: '#303030'}}>
                      Female
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={{color: 'red'}}>{errorGender}</Text>
                </View>
              </View>
              <CustomTextInput
                name="tempat_lahir"
                placeholder="Place of Birth (Optional)"
                control={control}
                rules={{}}
              />
              <View style={{marginVertical: 5}}>
                <Text style={{marginBottom: 5}}>Date of birth</Text>
                <Button
                  color="lightgrey"
                  title={format(new Date(date), 'dd-MM-yyyy')}
                  onPress={() => setOpen(true)}
                />
                <DatePicker
                  mode="date"
                  modal
                  open={open}
                  date={new Date(date)}
                  dateFormat="MM/dd/yyyy"
                  onConfirm={date => {
                    setOpen(false);
                    setDate(new Date(date));
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
              </View>
              <CustomTextInput
                name="alamat"
                placeholder="Address (Optional)"
                control={control}
                rules={{}}
              />
              <CustomTextInput
                name="no_hp"
                placeholder="Phone Number (Optional)"
                control={control}
                rules={{}}
              />
              <CustomTextInput
                name="email"
                placeholder="Email"
                control={control}
                rules={{required: 'email is required'}}
              />
              <CustomTextInput
                name="username"
                placeholder="Username"
                control={control}
              />
              <CustomTextInput
                name="password"
                placeholder="Password minimal 8 char"
                control={control}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: '#BA0E14',
                  paddingVertical: 7,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  marginTop: 30,
                }}
                onPress={handleSubmit(onUpdatePress)}>
                <Text style={{color: '#ffffff', fontSize: 16}}>
                  Simpan Perubahan
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Profile')}>
                  <Text style={{color: '#000000', fontSize: 12}}>
                    Kembali ke profil
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
export default EditProfile;
