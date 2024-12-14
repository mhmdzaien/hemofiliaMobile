import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {WebView} from 'react-native-webview';
import Menu from '../../components/Menu';
class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kontak: '',
      team: [
        {
          name: 'dr. WULANDEWI MARHAENI, Sp.A(K)',
          position: 'Team Leader',
          background:
            'Departemen Ilmu Kesehatan Anak, RSUD Ulin Banjarmasin / Fakultas Kedokteran Universitas Lambung Mangkurat',
          image: 'https://care4blood.ulm.ac.id/frontTemplate/img/wulandewi.jpg',
        },
        {
          name: 'Dr. dr. MEITRIA SYAHADATINA NOOR, M.Kes',
          position: 'Assessment Developer',
          background:
            'Departemen Ilmu Kesehatan Masyarakat, Magister Kesehatan Masyarakat, Fakultas Kedokteran Universitas Lambung Mangkurat',
          image: 'https://care4blood.ulm.ac.id/frontTemplate/img/meitria.jpeg',
        },
        {
          name: 'dr. FX HENDRIYONO, Sp.PK',
          position: 'Data Laboratory',
          background:
            'Departemen Patologi Klinik, RSUD Ulin Banjarmasin / Fakultas Kedokteran Universitas Lambung Mangkurat',
          image:
            'https://care4blood.ulm.ac.id/frontTemplate/img/hendriyono.jpg',
        },
        {
          name: 'dr. ANDREAS BUDI WIJAYA, Sp.A',
          position: 'Data Manager',
          background:
            'Departemen Ilmu Kesehatan Anak, RSUD Ulin Banjarmasin / Fakultas Kedokteran Universitas Lambung Mangkurat',
          image: 'https://care4blood.ulm.ac.id/frontTemplate/img/andreas.jpeg',
        },
        {
          name: 'dr. PANDJI WINATA NURIKHWAN, M.Pd.Ked',
          position: 'Website Manager',
          background:
            'Departemen Pendidikan Kedokteran / Fakultas Kedokteran Universitas Lambung Mangkurat',
          image: 'https://care4blood.ulm.ac.id/frontTemplate/img/pandji.jpeg',
        },
      ],
    };
  }

  getDataKontak = () => {
    fetch('https://care4blood.ulm.ac.id/api/kontak/')
      .then(response => response.json())
      .then(json => this.setState({kontak: json}))
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.getDataKontak();
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={style.ScreenBody}>
          <View style={style.Header}>
            <View style={style.HeaderIconLeft}>
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
            <View style={style.HeaderTitle}>
              <Text
                style={{fontWeight: 'bold', fontSize: 18, color: '#ffffff'}}>
                Tentang Kami
              </Text>
            </View>
          </View>
          <View style={style.MainContent}>
            <View
              style={{
                backgroundColor: '#ffffff',
                padding: 10,
                elevation: 3,
                borderRadius: 8,
              }}>
              <View>
                <Text
                  style={{
                    marginHorizontal: 10,
                    marginTop: 5,
                    fontWeight: 'bold',
                    color: '#5C5C5C',
                    fontSize: 12,
                  }}>
                  Alamat
                </Text>
                <Text
                  style={{
                    marginHorizontal: 10,
                    marginBottom: 3,
                    color: '#5C5C5C',
                    fontSize: 12,
                    textAlign: 'justify',
                  }}>
                  {this.state.kontak.alamat}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    marginHorizontal: 10,
                    marginTop: 5,
                    fontWeight: 'bold',
                    color: '#5C5C5C',
                    fontSize: 12,
                  }}>
                  Email
                </Text>
                <Text
                  style={{
                    marginHorizontal: 10,
                    marginBottom: 3,
                    color: '#5C5C5C',
                    fontSize: 12,
                    textAlign: 'justify',
                  }}>
                  {this.state.kontak.email}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    marginHorizontal: 10,
                    marginTop: 5,
                    fontWeight: 'bold',
                    color: '#5C5C5C',
                    fontSize: 12,
                  }}>
                  Nomor Telepon
                </Text>
                <Text
                  style={{
                    marginHorizontal: 10,
                    marginBottom: 3,
                    color: '#5C5C5C',
                    fontSize: 12,
                    textAlign: 'justify',
                  }}>
                  {this.state.kontak.no_telpon}
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('PrivacyPolicy')
                  }>
                  <Text
                    style={{
                      marginHorizontal: 10,
                      marginBottom: 3,
                      marginTop: 5,
                      color: '#5C5C5C',
                      fontSize: 14,
                      fontWeight: 'bold',
                      textAlign: 'justify',
                    }}>
                    Privacy Policy Information
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text
              style={{
                marginHorizontal: 10,
                marginVertical: 10,
                fontWeight: 'bold',
                color: '#171717',
              }}>
              Our Team
            </Text>
            <FlatList
              data={this.state.team}
              renderItem={({item, index}) => (
                <View style={style.TeamCard}>
                  <View>
                    <Image
                      source={{uri: item.image}}
                      style={{width: 100, height: 100, borderRadius: 10}}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      padding: 6,
                      color: '#5C5C5C',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        textAlign: 'left',
                        fontWeight: 'bold',
                        color: '#5C5C5C',
                      }}>
                      {item.name}
                    </Text>
                    {/* <Text style={{fontSize:14,textAlign:'justify',color:'#5C5C5C'}}>{item.position}</Text> */}
                    <Text
                      style={{
                        fontSize: 12,
                        textAlign: 'left',
                        marginTop: 5,
                        color: '#5C5C5C',
                      }}>
                      {item.background}
                    </Text>
                  </View>
                </View>
              )}
              keyExtractor={item => item.name}
            />
          </View>
          <View>
            {/* content */}
            <Menu screenName="Home" />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  ScreenBody: {
    flex: 1,
    backgroundColor: '#CE1E20',
  },
  Header: {
    flex: 1 / 5,
    backgroundColor: '#CE1E20',
  },
  HeaderIconLeft: {
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    elevation: 5,
  },
  HeaderTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  MainContent: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  TeamCard: {
    flex: 1 / 5,
    backgroundColor: '#ffffff',
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    borderRadius: 20,
    flexDirection: 'row',
    elevation: 3,
  },
});

export default About;
