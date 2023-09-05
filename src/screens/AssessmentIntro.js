import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import Slider from '@react-native-community/slider';

class AssessmentIntro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticate: 0,
      term1: false,
    };
  }

  getData = async () => {
    try {
      let value = await AsyncStorage.getItem('@autentikasi');
      value = JSON.parse(value);
      if (value !== null) {
        this.setState({authenticate: value});
      }
    } catch (error) {
      console.log(error);
    }
  };
  setToggleterm1 = () => {
    let term1 = this.state.term1;
    if (term1) {
      this.setState({term1: false});
    } else {
      this.setState({term1: true});
    }
  };

  nextStep = () => {
    if (this.state.term1) {
      this.props.navigation.navigate('AssessmentPerson', {
        auth: this.state.authenticate,
      });
    } else {
      Alert.alert('Info', 'Anda harus menyetujui semua persetujuan');
    }
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <View style={style.ScreenBody}>
            <Image
              source={require('../images/header.png')}
              style={{width: 65, height: 88, marginBottom: 5}}
            />
            <Text style={{fontSize: 20, color: '#BA0E14'}}>
              Penilaian Pemeriksaan Mandiri
            </Text>
            <View style={{marginHorizontal: 33, marginTop: 10}}>
              <Text
                style={{fontSize: 12, color: '#000000', textAlign: 'justify'}}>
                Harap dibaca dengan seksama. Dengan menyetujui kedua ketentuan
                dibawah dan mengisi penilaian mandiri ini, Anda akan mengijinkan
                penggunaan informasi di dalamnya untuk kepentingan pendidikan
                dan pengembangan upaya deteksi hemofilia :
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 20,
                paddingHorizontal: 16,
              }}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 12,
                  textAlign: 'justify',
                  marginVertical: 5,
                }}>
                1. Upaya penilaian mandiri terhadap risiko hemofilia ini
                ditujukan untuk pengumpulan informasi dan data pengembangan
                terkait upaya deteksi hemofilia, bukan merupakan nasihat medis
                ataupun pengganti nasihat medis profesional serta standar baku
                emas diagnosis. Anda akan diarahkan untuk berkonsultasi kepada
                dokter Anda atau tenaga kesehatan lainnya jika Anda memiliki
                pertanyaan atau masalah medis berdasarkan hasil penilaian
                mandiri di atas. Anda juga tidak boleh mengabaikan nasihat medis
                profesional atau menunda mencari pengobatan hanya berdasarkan
                hasil dari penilaian mandiri ini.{' '}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 20,
                paddingHorizontal: 16,
              }}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 12,
                  textAlign: 'justify',
                  marginVertical: 5,
                }}>
                2. Penilaian mandiri ini diberikan secara gratis untuk Anda,
                dengan catatan Anda memahami dan menyetujui bahwa tidak satu pun
                dari pihak Universitas Lambung Mangkurat, pihak Fakultas
                Kedokteran, baik karyawan, perwakilan, staf, sukarelawan, atau
                agen lain (yang selanjutnya semuanya disebut sebagai
                "Universitas Lambung Mangkurat") yang bertanggung jawab, atau
                berkewajiban kepada Anda, atas kehilangan, cedera atau kerusakan
                di luar kendalinya yang mungkin Anda timbulkan berdasarkan
                penilaian mandiri ini. Dalam menggunakan penilaian mandiri ini,
                Anda melepaskan pihak Universitas Lambung Mangkurat dari semua
                tanggung jawab dan kewajiban tersebut kepada Anda dan Anda
                melepaskan semua klaim tersebut.{' '}
              </Text>
            </View>
            {/* <View style={{alignItems:'center'}}>
                    <Text> Your skor : 26 </Text>
                    <View style={{flexDirection:'row'}}>
                        <Text>Min : 0</Text>
                        <Slider
                            style={{width: 200, height: 40}}
                            minimumValue={0}
                            maximumValue={62}
                            minimumTrackTintColor="#33bd55"
                            maximumTrackTintColor="#CE1E20"
                            value={26}
                        />
                        <Text>Max : 62</Text>
                    </View>
                </View> */}
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                alignItems: 'center',
              }}>
              <CheckBox
                disabled={false}
                value={this.state.term1}
                tintColors={{true: '#F15927', false: '#BA0E14'}}
                onValueChange={() => this.setToggleterm1()}
              />
              <Text style={{fontSize: 18, color: '#000000', marginLeft: 5}}>
                Saya Setuju
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', marginTop: 20, marginBottom: 35}}>
              <View style={style.ButtonBack}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#BA0E14',
                    padding: 10,
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: '#ffffff',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}
                  onPress={() => this.props.navigation.pop()}>
                  <Icon name="arrow-left" size={15} color="#ffffff" />
                  <Text style={{color: '#ffffff', marginLeft: 5}}>Kembali</Text>
                </TouchableOpacity>
              </View>
              <View style={style.ButtonNext}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#BA0E14',
                    padding: 10,
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: '#ffffff',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}
                  onPress={() => this.nextStep()}>
                  <Text style={{color: '#ffffff', marginRight: 5}}>
                    Lanjutkan
                  </Text>
                  <Icon name="arrow-right" size={15} color="#ffffff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  ScreenBody: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  ButtonBack: {
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  ButtonNext: {
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});
export default AssessmentIntro;
