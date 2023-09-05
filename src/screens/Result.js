import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
  Touchable,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import RumahSakitCard from '../../components/RumahSakitCard';

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticate: 0,
      backgroundColor: '',
    };
  }

  ReportRedirect = async () => {
    await Linking.openURL(this.props.route.params.data.url_hasil);
  };

  ReportRedirect = async url => {
    await Linking.openURL(String(url));
  };

  componentDidMount() {
    console.log(this.state.backgroundColor);
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={style.scrollView}>
          <View
            style={[
              style.ScreenBody,
              {backgroundColor: this.props.route.params.backgroundColor},
            ]}>
            <Image
              source={require('../images/bloodtear.png')}
              style={{width: 100, height: 100}}
            />
            {this.props.route.params.data.kesimpulan ==
            'Kelompok berisiko rendah' ? (
              <Text
                style={{
                  fontSize: 24,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Anda risiko rendah hemofilia
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 24,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Anda risiko tinggi hemofilia
              </Text>
            )}
            <Text style={{fontSize: 18, color: 'white', marginTop: 20}}>
              Hasil Penilaian Pemeriksaan Mandiri
            </Text>
            <View style={{marginHorizontal: 25, color: 'white'}}>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Skor anda adalah : {this.props.route.params.data.skor}
              </Text>
              <View style={{alignItems: 'center'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text>Min : 0</Text>
                  <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={0}
                    maximumValue={62}
                    minimumTrackTintColor="#ffffff"
                    maximumTrackTintColor="#CE1E20"
                    value={this.props.route.params.data.skor}
                    disabled
                  />
                  <Text>Max : 63</Text>
                </View>
              </View>
              {this.props.route.params.data.kesimpulan ==
              'Kelompok berisiko rendah' ? (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: 'white',
                    borderRadius: 5,
                    marginTop: 20,
                    padding: 15,
                  }}>
                  <View style={{marginHorizontal: 15, marginTop: 0}}>
                    <Text style={{fontWeight: 'bold', color: 'white'}}>
                      Kategori :
                    </Text>
                    <Text
                      style={{textAlign: 'left', marginTop: 2, color: 'white'}}>
                      Hasil Pemeriksaan mandiri anda menunjukan adanya{' '}
                      <Text style={{fontWeight: 'bold'}}>
                        risiko rendah Hemofilia
                      </Text>
                    </Text>
                  </View>
                  <View style={{marginHorizontal: 15, marginTop: 10}}>
                    <Text style={{fontWeight: 'bold', color: 'white'}}>
                      Edukasi :
                    </Text>
                    <Text
                      style={{textAlign: 'left', marginTop: 2, color: 'white'}}>
                      Apabila anda masih membutuhkan informasi lebih lanjut,
                      silahkan melakukan pemeriksaan ke fasilitas kesehatan
                      terdekat
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: 'white',
                    borderRadius: 5,
                    marginTop: 20,
                    padding: 15,
                  }}>
                  <View style={{marginHorizontal: 15, marginTop: 0}}>
                    <Text style={{fontWeight: 'bold', color: 'white'}}>
                      Kategori :
                    </Text>
                    <Text
                      style={{textAlign: 'left', marginTop: 2, color: 'white'}}>
                      Hasil Pemeriksaan mandiri anda menunjukan adanya{' '}
                      <Text style={{fontWeight: 'bold'}}>
                        risiko tinggi Hemofilia
                      </Text>
                    </Text>
                  </View>
                  <View style={{marginHorizontal: 15, marginTop: 10}}>
                    <Text style={{fontWeight: 'bold', color: 'white'}}>
                      Edukasi :
                    </Text>
                    <Text
                      style={{textAlign: 'left', marginTop: 2, color: 'white'}}>
                      Mohon segera lakukan pemeriksaan ke fasilitas kesehatan
                      terdekat untuk menyingkirkan kemungkinan menderita
                      hemofilia atau gangguan pendarahan lainnya. untuk
                      pemeriksaan lebih lanjut, silahkan kunjungi
                    </Text>
                    <TouchableOpacity
                      style={{marginTop: 5}}
                      onPress={() =>
                        this.ReportRedirect('https://hemofilia.or.id/contacts')
                      }>
                      <Text style={{color: 'blue'}}>
                        https://hemofilia.or.id/contacts
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {this.props.route.params.nearbyHospital && (
                <View style={{marginTop: 10}}>
                  <Text style={{fontWeight: 'bold', color: 'white'}}>
                    Informasi Rumah Sakit Terdekat :
                  </Text>
                  <RumahSakitCard
                    data={this.props.route.params.nearbyHospital}
                  />
                </View>
              )}
            </View>

            <View
              style={{flexDirection: 'row', marginTop: 20, marginBottom: 20}}>
              <View style={style.ButtonBack}>
                <TouchableOpacity
                  style={{
                    backgroundColor: this.props.route.params.backgroundColor,
                    padding: 10,
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: 'white',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}
                  onPress={() => this.props.navigation.navigate('Home')}>
                  <Icon name="arrow-left" size={15} color="white" />
                  <Text style={{marginLeft: 5, color: 'white'}}>Kembali</Text>
                </TouchableOpacity>
              </View>

              <View style={style.ButtonNext}>
                <TouchableOpacity
                  style={{
                    backgroundColor: this.props.route.params.backgroundColor,
                    padding: 10,
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: 'white',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}
                  onPress={() =>
                    this.ReportRedirect(this.props.route.params.data.url_hasil)
                  }>
                  <Icon name="file" size={15} color="white" />
                  <Text style={{color: 'white', marginLeft: 5}}>
                    Lihat Hasil Pemeriksaan
                  </Text>
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
    backgroundColor: '#BA0E14',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonBack: {
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  scrollView: {},
  ButtonNext: {
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});
export default Result;
