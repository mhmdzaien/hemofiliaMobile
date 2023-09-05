import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Linking,
  ScrollView,
  Modal,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Menu from '../../components/Menu';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autentikasi: '',
      AssessmentHistory: '',
      showModal: false,
      canDelete: false,
      isDeleting: false,
    };
  }

  getData = async () => {
    try {
      let value = await AsyncStorage.getItem('@autentikasi');
      value = JSON.parse(value);

      if (value !== null) {
        console.log(value);
        this.setState({autentikasi: value});
        this.getAssessmentHistory(value.uuid);
      } else {
        this.props.navigation.navigate('Home');
      }

      console.log('data generate successfuly');
    } catch (error) {
      console.log(error);
    }
  };

  getAssessmentHistory = async uuid => {
    let response = await fetch(
      `https://care4blood.ulm.ac.id/api/riwayatAssessment/${uuid}`,
    );
    let data = await response.json();

    this.setState({AssessmentHistory: data.slice(0, 5)});
  };

  async handleLogout() {
    try {
      await AsyncStorage.removeItem('@autentikasi');

      this.props.navigation.navigate('Home');
    } catch (exception) {
      return false;
    }
  }

  ReportRedirect = async url => {
    // console.log(String(url));
    await Linking.openURL(String(url));
  };

  async deleteAccount(user) {
    try {
      console.log('Run');
      this.setState({isDeleting: true});
      let response = await fetch(
        `https://care4blood.ulm.ac.id/api/deleteUser`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Accept: 'application/json',
            Authorization: 'Bearer care4Blood',
          },
          body: JSON.stringify({id: user.uuid}),
        },
      );
      this.setState({isDeleting: false});
      console.log(response);
      let data = await response.json();
      if (data.status) {
        await AsyncStorage.removeItem('@autentikasi');
        this.props.navigation.navigate('Home');
      }
    } catch (exception) {
      this.setState({isDeleting: false});

      console.log(exception);
      return false;
    }
  }

  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <View style={{flex: 1, backgroundColor: '#CE1E20'}}>
            <View
              style={{
                backgroundColor: '#CE1E20',
                paddingVertical: 10,
                paddingHorizontal: 15,
                flexDirection: 'row',
                elevation: 5,
                height: 100,
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Home')}>
                <Icon name="arrow-left" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: '#f5f2f2',
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
              }}>
              {/* content */}
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../images/user.png')}
                  style={{
                    width: 140,
                    height: 140,
                    borderRadius: 100,
                    marginTop: -50,
                    borderWidth: 6,
                    borderColor: '#f5f2f2',
                  }}
                />
                <Text style={{color: '#303030', fontSize: 20, marginTop: 5}}>
                  {this.state.autentikasi.nama}
                </Text>
                <Text style={{color: '#303030', fontSize: 14}}>
                  {this.state.autentikasi.jenis_kelamin},{' '}
                  {this.state.autentikasi.umur} Tahun
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#ffffff',
                  paddingVertical: 10,
                  marginHorizontal: 20,
                  borderRadius: 5,
                  elevation: 3,
                  marginTop: 10,
                  paddingHorizontal: 10,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: '#303030'}}>Email</Text>
                  <Text style={{fontSize: 10, color: '#303030'}}>
                    {this.state.autentikasi.email}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: '#303030'}}>Phone Number</Text>
                  <Text style={{fontSize: 10, color: '#303030'}}>
                    {this.state.autentikasi.no_hp}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: '#ffffff',
                  paddingVertical: 10,
                  marginHorizontal: 20,
                  borderRadius: 5,
                  elevation: 3,
                  marginTop: 10,
                  paddingHorizontal: 10,
                }}>
                <Text style={{color: '#303030'}}>
                  Riwayat Penilaian Pemeriksaan Mandiri
                </Text>
                <FlatList
                  data={this.state.AssessmentHistory}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={{
                        marginVertical: 10,
                        borderWidth: 0.5,
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        borderRadius: 3,
                        flexDirection: 'row',
                      }}
                      onPress={() => this.ReportRedirect(item.url)}>
                      <Text style={{flex: 1, color: '#303030'}}>
                        Date : {item.tanggal_assessment}
                      </Text>
                      <Text style={{color: '#900', fontSize: 12}}>
                        {item.kesimpulan}
                      </Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.uuid}
                />
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#D8A40F',
                  marginHorizontal: 20,
                  marginTop: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 10,
                  borderRadius: 3,
                }}
                onPress={() =>
                  this.props.navigation.navigate('EditProfile', {
                    auth: this.state.autentikasi,
                  })
                }>
                <Text style={{color: '#ffffff', fontWeight: 'bold'}}>
                  Edit Profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#D8A40F',
                  marginHorizontal: 20,
                  marginVertical: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 10,
                  borderRadius: 3,
                }}
                onPress={() => this.handleLogout()}>
                <Text style={{color: '#ffffff', fontWeight: 'bold'}}>
                  Logout
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: 'red',
                  marginHorizontal: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 10,
                  borderRadius: 3,
                }}
                onPress={() => this.setState({showModal: true})}>
                <Text style={{color: '#ffffff', fontWeight: 'bold'}}>
                  Hapus Akun
                </Text>
              </TouchableOpacity>
            </View>
            <Menu screenName="Login" />
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.showModal}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              this.setState({showModal: false});
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={{fontWeight: 'bold', marginBottom: 10}}>
                  Hapus Akun
                </Text>
                <Text style={{marginBottom: 10}}>
                  Akun yang telah dihapus tidak akan dapat dikembalikan.{'\n\n'}
                  Silakan ketikan kata 'hapus' di bawah ini kemudian tekan
                  tombol hapus, untuk konfirmasi bahwa Anda ingin menghapusnya
                  secara permanen:
                </Text>
                <View
                  style={{
                    backgroundColor: 'white',
                    width: '100%',
                    borderColor: '#e8e8e8',
                    borderWidth: 1,
                    borderRadius: 5,
                    paddingHorizontal: 10,
                    marginVertical: 5,
                    marginBottom: 10,
                  }}>
                  <TextInput
                    onChangeText={val => {
                      if (val.toLowerCase() == 'hapus') {
                        this.setState({canDelete: true});
                      } else {
                        this.setState({canDelete: false});
                      }
                    }}
                    style={{
                      color: '#303030',
                      height: 40,
                    }}
                  />
                </View>

                <TouchableOpacity
                  style={{
                    backgroundColor: this.state.canDelete ? 'red' : 'white',
                    marginHorizontal: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 10,
                    borderRadius: 3,
                    width: '100%',
                  }}
                  disabled={!this.state.canDelete}
                  onPress={() => this.deleteAccount(this.state.autentikasi)}>
                  {this.state.isDeleting ? (
                    <ActivityIndicator color={'#ffffff'} />
                  ) : (
                    <Text
                      style={{
                        color: this.state.canDelete ? '#ffffff' : 'grey',
                        fontWeight: 'bold',
                      }}>
                      Hapus
                    </Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#D8A40F',
                    marginHorizontal: 20,
                    marginTop: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 10,
                    borderRadius: 3,
                    width: '100%',
                  }}
                  onPress={() => this.setState({showModal: false})}>
                  <Text style={{color: '#ffffff', fontWeight: 'bold'}}>
                    Batal
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
export default Profile;
