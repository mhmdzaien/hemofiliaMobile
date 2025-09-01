import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  Button,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Menu from '../../components/Menu';
import RumahSakitCard from '../../components/RumahSakitCard';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import { SafeAreaView } from 'react-native-safe-area-context';
import HandleChallenge from './components/HandleChallenge';
import { useNavigation } from '@react-navigation/native';
import CookieManager from '@react-native-cookies/cookies';
import axios from 'axios';

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

class RsNearby extends Component {
  constructor(props) {
    super(props);
    this.currentPosition = { latitude: null, longitude: null };
    this.refCloudflare = React.createRef();
    this.state = {
      isLoading: false,
      searchValue: '',
      currentPage: 1,
      rumahSakitData: [],
      isListEnd: false,
      moreLoading: false,
      requestingLocation: false,
    };
  }

  async requestLocationPermission() {
    try {
      this.setState({ requestingLocation: true, isLoading: true });

      const locationPermissionRequest = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      console.log('Status Permission :', locationPermissionRequest);
      if (locationPermissionRequest == 'granted') {
        Geolocation.getCurrentPosition(
          pos => {
            this.currentPosition = {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            };
            this.setState({ requestingLocation: false, isLoading: false });
            this.requestData(1);
          },
          error => {
            this.setState({ requestingLocation: false, isLoading: false });
            console.log(error.code, error.message);
            this.requestData(1);
          },
          { enableHighAccuracy: true, timeout: 15000, showLocationDialog: true },
        );
      } else {
        this.setState({ requestingLocation: false, isLoading: true });
        this.requestData(1);
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  }

  async requestData(page = 1) {
    if (
      (this.state.isListEnd == false || page == 1) &&
      this.state.moreLoading == false
    ) {
      if (page == 1) {
        this.setState({ isLoading: true });
      } else {
        this.setState({ moreLoading: true });
      }
      this.state.currentPage = page;
      const cookie = await CookieManager.get(`https://care4blood.ulm.ac.id/api/rumahSakit?page=${page}&search=${this.state.searchValue}&longitude=${this.currentPosition.longitude}&latitude=${this.currentPosition.latitude}`)
      axios.get(
        `https://care4blood.ulm.ac.id/api/rumahSakit?page=${page}&search=${this.state.searchValue}&longitude=${this.currentPosition.longitude}&latitude=${this.currentPosition.latitude}`,
        {
          credentials: 'include',
          headers: {
            "User-Agent": userAgent,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer care4Blood',
            'Cookie': { cf_clearance: cookie['cf_clearance'].value }
          }
        }
      ).then(response => {
        const json = response.data;
        if (json.data.length == 0) {
          this.setState({
            isListEnd: true,
            isLoading: false,
            moreLoading: false,
          });
        } else if (page == 1) {
          this.setState({
            isListEnd: false,
            rumahSakitData: json.data,
            isLoading: false,
            moreLoading: false,
          });
        } else {
          this.setState({
            rumahSakitData: this.state.rumahSakitData.concat(json.data),
            isLoading: false,
            moreLoading: false,
          });
        }
        console.log('Ukuran Data :', this.state.rumahSakitData.length);
      }).catch(err => {
          this.setState({
            rumahSakitData: [],
            isLoading: false,
            moreLoading: false,
          });
          //  console.log(err)
        });


    }
  }

  fetchMoreData() {
    let page = this.state.currentPage + 1;
    console.log('Page :', page);
    this.requestData(page);
    // this.setState({currentPage: page, moreLoading: true});
  }

  renderFooter() {
    return (
      <View style={style.footerText}>
        {this.state.moreLoading && <ActivityIndicator />}
        {this.state.isListEnd && <Text>Ini akhir dari daftar..</Text>}
      </View>
    );
  }

  renderEmpty() {
    return (
      <View style={style.emptyText}>
        <Text>Tidak ada data..</Text>
        <Button onPress={() => this.requestData()} title="Refresh" />
      </View>
    );
  }

  componentDidMount() {
    this.requestLocationPermission();
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={style.ScreenBody}>
          <View style={style.NavbarContainer}>
            <View style={style.NavbarIconLeft}>
              <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                <Icon name="arrow-left" size={20} color="#ffffff" />
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('About')}>
                <Icon name="info-circle" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <Text
                style={{ fontWeight: 'bold', fontSize: 18, color: '#ffffff' }}>
                Daftar Rumah Sakit
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: '#ffffff',
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              paddingHorizontal: 10,
              paddingTop: 10,
            }}>
            <View style={style.searchWrapper}>
              <Icon
                name="search"
                size={20}
                color="#CE1E20"
                onPress={() => this.requestData(1)}
              />
              <TextInput
                style={{ flexGrow: 1, marginLeft: 5 }}
                placeholder="Pencarian"
                value={this.state.searchValue}
                onChangeText={text => this.setState({ searchValue: text })}
                onSubmitEditing={() => this.requestData(1)}
              />
              {this.state.searchValue.length > 0 && (
                <Icon
                  name="times-circle"
                  size={20}
                  color="#000"
                  onPress={() => {
                    this.setState({ searchValue: '' });
                    this.requestData(1);
                  }}
                />
              )}
            </View>
            <View style={{ flex: 1 }}>
              {this.state.isLoading ? (
                <View style={style.loading}>
                  <ActivityIndicator size="large" />
                  {this.state.requestingLocation && (
                    <Text>Sedang mencari lokasi anda...</Text>
                  )}
                </View>
              ) : (
                <FlatList
                  contentContainerStyle={{ flexGrow: 1 }}
                  data={this.state.rumahSakitData}
                  renderItem={({ item }) => (
                    <View style={style.cardContainer}>
                      <RumahSakitCard data={item} />
                    </View>
                  )}
                  ListFooterComponent={this.renderFooter()}
                  ListEmptyComponent={this.renderEmpty()}
                  onEndReachedThreshold={0.3}
                  onEndReached={() => this.fetchMoreData()}
                />
              )}
            </View>
          </View>
          <Menu screenName="RsNearby" />
        </View>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 10,
  },
  searchWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  ScreenBody: {
    flex: 1,
    backgroundColor: '#CE1E20',
  },
  NavbarContainer: {
    flex: 1 / 5,
    backgroundColor: '#CE1E20',
  },
  NavbarIconLeft: {
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    elevation: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    marginVertical: 15,
    marginHorizontal: 10,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  emptyText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RsNearby;
