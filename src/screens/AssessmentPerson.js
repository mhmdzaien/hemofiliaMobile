import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  ScrollView,
  StyleSheet,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {format} from 'date-fns';
import {useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import CustomTextInput from '../../components/CustomTextInput';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView  } from 'react-native-safe-area-context';

const AssessmentPerson = props => {
  const navigation = useNavigation();

  const [gender, setGender] = useState();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [errorGender, setErrorGender] = useState('');
  const [penghasilanOrangtua, setPenghasilanOrangtua] = useState(null);
  const [loading, setLoading] = useState('');
  const [items, setItems] = useState([
    {
      label: '< Rp. 4.000.000',
      value: '< Rp. 4.000.000',
    },
    {
      label: 'Rp 4.000.000 - Rp. 10.000.000',
      value: 'Rp 4.000.000 - Rp. 10.000.000',
    },
    {
      label: '> Rp. 10.000.000',
      value: '> Rp. 10.000.000',
    },
  ]);

  const [openBloodTypeDropdown, setOpenBloodTypeDropdown] = useState(false);
  const [blodTypes, setBlodTypes] = useState(null);
  const [itemBlodTypes, setItemBlodTypes] = useState([
    {
      label: 'A',
      value: 'A',
    },
    {
      label: 'B',
      value: 'B',
    },
    {
      label: 'O',
      value: 'O',
    },
    {
      label: 'AB',
      value: 'AB',
    },
  ]);

  const [errorBloodType, setErrorBloodType] = useState('');
  const [openCityDropdown, setOpenCityDropdown] = useState(false);
  const [city, setCity] = useState(null);
  const [itemCities, setItemCities] = useState([
    {
      label: '-',
      value: 'choose city / pilih kota',
    },
  ]);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();

  const auth = props.route.params.auth;

  const setValue = () => {
    let defaultValues = {};
    if (auth) {
      setDate(auth.tanggal_lahir);
      setGender(auth.jenis_kelamin);

      defaultValues.nama = auth.nama;
      defaultValues.tempat_lahir = auth.tempat_lahir;
      defaultValues.alamat = auth.alamat;
      defaultValues.no_hp = auth.no_hp;
      defaultValues.email = auth.email;
    }
    reset({...defaultValues});
  };

  useEffect(() => {
    setValue();
  }, [auth]);

  const onNextPress = async data => {
    if (!gender) {
      setErrorGender('Gender is required');
    } else {
      if (!blodTypes) {
        setErrorBloodType('Bloodtype is required');
      } else {
        let formData = {
          nama: data.nama,
          jenis_kelamin: gender,
          tempat_lahir: data.tempat_lahir,
          tanggal_lahir: format(new Date(date), 'yyyy-MM-dd'),
          golongan_darah: blodTypes,
          alamat: data.alamat,
          no_hp: data.no_hp,
          email: data.email,
          kebangsaan: data.kebangsaan,
          pekerjaan: data.pekerjaan,
          tinggi: data.tinggi,
          berat: data.berat,
          nama_orangtua: data.nama_orangtua,
          pekerjaan_orangtua: data.pekerjaan_orangtua,
          pendidikan_orangtua: data.pendidikan_orangtua,
          penghasilan_orangtua: penghasilanOrangtua,
          kode_koka: city,
        };

        await AsyncStorage.setItem('@dataPribadi', JSON.stringify(formData));
        await navigation.navigate('AssessmentLanguage');
      }
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
              <Text
                style={{
                  color: '#000000',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginTop: 10,
                }}>
                Penilaian Pemeriksaan Mandiri
              </Text>
            </View>
            <View style={{marginHorizontal: 20}}>
              <CustomTextInput
                name="nama"
                placeholder="Nama (optional) "
                control={control}
              />
              <View style={{marginVertical: 5}}>
                <Text style={{marginBottom: 5}}>jenis Kelamin</Text>
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
              <View style={{marginVertical: 5}}>
                <Text style={{marginBottom: 5}}>Tanggal lahir </Text>
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
                  maximumDate={new Date(date)}
                  onConfirm={date => {
                    setOpen(false);
                    setDate(new Date(date));
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
              </View>
              <Text style={{color: 'red'}}>{errorBloodType}</Text>
              <DropDownPicker
                style={{borderColor: 'lightgrey', marginVertical: 5}}
                open={openBloodTypeDropdown}
                value={blodTypes}
                items={itemBlodTypes}
                setOpen={setOpenBloodTypeDropdown}
                setValue={setBlodTypes}
                setItems={setItemBlodTypes}
                placeholder="Golongan darah"
                searchPlaceholderTextColor="lightgrey"
                listMode="MODAL"
              />
              <CustomTextInput
                name="kebangsaan"
                placeholder="Kewarganegaraan (optional)"
                control={control}
              />
              <DropDownPicker
                style={{borderColor: 'lightgrey', marginVertical: 5}}
                open={openCityDropdown}
                value={city}
                items={itemCities}
                setOpen={setOpenCityDropdown}
                setValue={setCity}
                setItems={setItemCities}
                placeholder="Kota"
                searchPlaceholderTextColor="lightgrey"
                listMode="MODAL"
                searchable={true}
                loading={loading}
                disableLocalSearch={true} // required for remote search
                searchPlaceholder="ketikan nama kota "
                onChangeSearchText={text => {
                  // Show the loading animation
                  setLoading(true);
                  setTimeout(function () {
                    fetch(`https://care4blood.ulm.ac.id/api/kota/${text}`)
                      .then(response => response.json())
                      .then(json => setItemCities(json))
                      .catch(err => {
                        //
                        console.log(err);
                      })
                      .finally(() => {
                        // Hide the loading animation
                        setLoading(false);
                      });
                  }, 1000);
                  // Get items from API
                }}
              />
              <CustomTextInput
                name="alamat"
                placeholder="Alamat (optional)"
                control={control}
              />
              <CustomTextInput
                name="no_hp"
                placeholder="Nomor Telepon"
                control={control}
                keyboardType="numeric"
                rules={{required: 'phone number is required'}}
              />
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
                name="pekerjaan"
                placeholder="Pekerjaan"
                control={control}
                rules={{required: 'Job is required'}}
              />
              <CustomTextInput
                name="tinggi"
                placeholder="Tinggi dalam cm (optional)"
                control={control}
              />
              <CustomTextInput
                name="berat"
                placeholder="Berat dalam kg (optional)"
                control={control}
              />
              <CustomTextInput
                name="nama_orangtua"
                placeholder="Nama orangtua (optional)"
                control={control}
              />
              <CustomTextInput
                name="pekerjaan_orang_tua"
                placeholder="Pekerjaan orangtua (optional)"
                control={control}
              />
              <CustomTextInput
                name="pendidikan_orang_tua"
                placeholder="Pendidikan orangtua (optional)"
                control={control}
              />
              <DropDownPicker
                style={{borderColor: 'lightgrey'}}
                open={openDropdown}
                value={penghasilanOrangtua}
                items={items}
                setOpen={setOpenDropdown}
                setValue={setPenghasilanOrangtua}
                setItems={setItems}
                placeholder="pilih penghasilan keluarga (optional)"
                searchPlaceholderTextColor="lightgrey"
                listMode="MODAL"
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
                onPress={handleSubmit(onNextPress)}>
                <Text style={{color: '#ffffff', fontSize: 16}}>Lanjutkan</Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('AssessmentIntro')}>
                  <Text style={{color: '#000000', fontSize: 12}}>Kembali</Text>
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
export default AssessmentPerson;
