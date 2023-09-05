import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ToastAndroid,
  Platform,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Menu from '../../components/Menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

class AssessmentLanguage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      quetions: '',
      authenticate: {},
      answers: {},
      uuid: 0,
      loading: false,
    };
  }

  getAuth = async () => {
    try {
      let value = await AsyncStorage.getItem('@dataPribadi');
      value = JSON.parse(value);
      if (value !== null) {
        this.setState({authenticate: value});
      }

      let auth = await AsyncStorage.getItem('@autentikasi');
      Authvalue = JSON.parse(auth);

      if (Authvalue !== null) {
        // console.log(Authvalue.uuid)
        this.setState({uuid: Authvalue.uuid});
      }
    } catch (error) {
      console.log(error);
    }
  };

  getQuestion = () => {
    fetch(
      `https://care4blood.ulm.ac.id/api/soal/${this.props.route.params.uuid}`,
    )
      .then(response => response.json())
      .then(json => this.setState({quetions: json}))
      .catch(err => console.log(err));
  };

  AnswerSet = item => {
    this.setState({
      answers: {
        ...this.state.answers,
        [item.soal_id]: item.id,
      },
    });
  };

  isSelected = item => {
    if ((this.state.answers[item.soal_id] = item.id)) {
      return 'e8e6e6';
    } else {
      return '#ffffff';
    }
  };

  requestLocationPermissionAndSubmit = async () => {
    this.setState({loading: true});
    try {
      const locationPermissionRequest = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      if (locationPermissionRequest == 'granted') {
        Geolocation.getCurrentPosition(
          pos => {
            this.handleSubmit({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            });
          },
          error => {
            console.log(error.code, error.message);
            this.handleSubmit();
          },
          {enableHighAccuracy: true, timeout: 15000, showLocationDialog: true},
        );
      } else {
        this.handleSubmit();
      }
    } catch (err) {
      this.handleSubmit();
    }
  };

  handleSubmit = async position => {
    let response = await fetch(
      'https://care4blood.ulm.ac.id/api/selfAssessmentMobile',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Accept: 'application/json',
          Authorization: 'Bearer care4Blood',
        },
        body: JSON.stringify({
          user: this.state.authenticate,
          answers: this.state.answers,
          language: this.props.route.params.uuid,
          uuid: this.state.uuid,
        }),
      },
    );

    let result = await response.json();
    this.setState({loading: false});
    if (response.status == 405) {
      if (Platform.OS == 'android') {
        ToastAndroid.show(
          'Incomplete Answers, Please fill in all question',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else if (Platform.OS == 'ios') {
        Alert.alert('Incomplete Answers', 'Please fill in all question');
      }
    }

    if (response.status == 200) {
      console.log(result.data);
      let backgroundColor;

      if (result.data.kesimpulan === 'Kelompok berisiko tinggi') {
        backgroundColor = '#CE1E20';
      } else {
        backgroundColor = '#33bd55';
      }
      let nearbyHospital = null;
      if (position) {
        await fetch(
          `https://care4blood.ulm.ac.id/api/rumahSakit?page=1&longitude=${position.longitude}&latitude=${position.latitude}`,
        )
          .then(response => response.json())
          .then(json => {
            if (json.data.length > 0) {
              nearbyHospital = json.data[0];
            }
          })
          .catch(err => console.log(err));
      }

      this.props.navigation.navigate('Result', {
        nearbyHospital: nearbyHospital,
        data: result.data,
        backgroundColor: backgroundColor,
      });
    }
  };

  componentDidMount() {
    this.getQuestion();
    this.getAuth();
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={style.screenBody}>
          <View style={style.navbarContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.pop()}>
              <Icon name="arrow-left" size={20} color="#BA0E14" />
            </TouchableOpacity>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold'}}>Care for Hemophilia</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('About')}>
              <Icon name="info-circle" size={20} color="#BA0E14" />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            {/* content */}
            <View style={{flex: 1, marginHorizontal: 0}}>
              <FlatList
                data={this.state.quetions.data}
                renderItem={({item, index}) => (
                  <View style={style.DataContainer}>
                    <View style={style.QuestionContainer}>
                      <View
                        style={{
                          flex: 1,
                          paddingHorizontal: 10,
                          flexDirection: 'row',
                        }}>
                        <View style={style.QuestionNumber}>
                          <Text style={{color: '#ffffff', fontWeight: 'bold'}}>
                            {parseInt(index) + 1}
                          </Text>
                        </View>
                        <View style={style.QuestionText}>
                          <Text style={{fontSize: 14, color: '#1f1f1f'}}>
                            {item.attributes.uraian}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <FlatList
                      data={item.attributes.pilihan}
                      renderItem={({item, index}) => (
                        <TouchableOpacity
                          style={[
                            style.answers,
                            {
                              backgroundColor:
                                this.state.answers[item.soal_id] == item.id
                                  ? '#fad366'
                                  : '#ffffff',
                            },
                          ]}
                          onPress={() => this.AnswerSet(item)}>
                          <Text style={{color: '#303030'}}>
                            {item.uraian_jawaban}
                          </Text>
                        </TouchableOpacity>
                      )}
                      keyExtractor={item => item.id}
                    />
                  </View>
                )}
                keyExtractor={item => item.uuid}
              />
            </View>
            <View style={style.Footer}>
              <TouchableOpacity
                style={style.ButtonSubmit}
                onPress={() => this.requestLocationPermissionAndSubmit()}>
                {this.state.loading ? (
                  <Text style={{color: '#ffffff', fontSize: 18}}>
                    <ActivityIndicator size="small" color="#ffffff" />
                    Memproses . . .
                  </Text>
                ) : (
                  <Text style={{color: '#ffffff', fontSize: 18}}>
                    Simpan Jawaban
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <Menu screenName="Assessment" />
        </View>
      </SafeAreaView>
    );
  }
}
const style = StyleSheet.create({
  screenBody: {
    flex: 1,
    backgroundColor: '#CE1E20',
  },
  answers: {
    backgroundColor: '#ffffff',
    padding: 5,
    marginHorizontal: 20,
    marginVertical: 3,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e8e6e6',
  },
  navbarContainer: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    elevation: 5,
  },
  DataContainer: {
    marginVertical: 0,
    backgroundColor: '#ffffff',
    paddingBottom: 10,
    borderRadius: 3,
  },
  QuestionContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
    height: 100,
    flexDirection: 'row',
  },
  QuestionNumber: {
    backgroundColor: '#BA0E14',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    elevation: 3,
  },
  QuestionText: {
    flex: 1,
    padding: 5,
    backgroundColor: '#e8e6e6',
    paddingLeft: 10,
  },
  Footer: {
    flex: 1 / 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  ButtonSubmit: {
    width: 200,
    backgroundColor: '#CE1E20',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default AssessmentLanguage;
