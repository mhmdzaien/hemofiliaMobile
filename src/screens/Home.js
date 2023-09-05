import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Menu from '../../components/Menu';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: '',
      symptoms: [
        {
          text: 'Pendarahan pada persendian',
          img: 'https://care4blood.ulm.ac.id/frontTemplate/img/icon/ikon%206.png',
        },
        {
          text: 'Mudah mengalami memar',
          img: 'https://care4blood.ulm.ac.id/frontTemplate/img/icon/ikon%205.png',
        },
        {
          text: 'Pendarahan pada mulut dan gusi',
          img: 'https://care4blood.ulm.ac.id/frontTemplate/img/icon/ikon%202.png',
        },
        {
          text: 'Pendarahan sulit berhenti setelah sunat',
          img: 'https://care4blood.ulm.ac.id/frontTemplate/img/icon/ikon%203.png',
        },
        {
          text: 'Pendarahan pada sendi yang ditandai nyeri serta bengkak pada sendi lutut',
          img: 'https://care4blood.ulm.ac.id/frontTemplate/img/icon/ikon%205.png',
        },
        {
          text: 'Mimisan yang sulit dihentikan',
          img: 'https://care4blood.ulm.ac.id/frontTemplate/img/icon/ikon%201.png',
        },
      ],
    };
  }

  getData = () => {
    fetch('https://care4blood.ulm.ac.id/api/berita/')
      .then(response => response.json())
      .then(json => this.setState({news: json}))
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={style.screenBody}>
          <View style={style.navbarContainer}>
            <View style={style.navbarIconLeft}>
              <TouchableOpacity>
                <Icon name="house-user" size={20} color="#ffffff" />
              </TouchableOpacity>
              <View style={style.navbarText}></View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('About')}>
                <Icon name="info-circle" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
            <View style={style.HeaderTitle}>
              <Text style={style.HeaderTitleHeading}>Care For Hemophilia</Text>
              <Text style={style.HeaderTitleSub}>
                Early Detection, Saving Generation
              </Text>
            </View>
          </View>
          <View style={style.MainContent}>
            <ScrollView>
              <View style={style.mainBanner}>
                <View style={style.MainBannerContent}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#5C5C5C',
                    }}>
                    Apa itu Hemofilia ?
                  </Text>
                  <Text style={{fontSize: 12, color: '#5C5C5C'}}>
                    Hemofilia biasanya merupakan kelainan pendarahan bawaan
                    dimana darah tidak dapat membeku secara normal
                  </Text>
                  <TouchableOpacity
                    style={style.MainBannerButton}
                    onPress={() =>
                      this.props.navigation.navigate('Explanation')
                    }>
                    <Text style={{color: '#ffffff', fontSize: 12}}>
                      Selengkapnya ...
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={style.MainBannerImage}>
                  <Image
                    source={require('../images/header.png')}
                    style={{width: 85, height: 120}}
                  />
                </View>
              </View>
              <View style={style.SignAndSymtomps}>
                <Text style={{color: '#5C5C5C', fontWeight: 'bold'}}>
                  Tanda dan Gejala
                </Text>
                <FlatList
                  data={this.state.symptoms}
                  renderItem={({item, key}) => (
                    <TouchableOpacity
                      style={style.SignsAndSymptomsCard}
                      onPress={() =>
                        this.props.navigation.navigate('Symptoms')
                      }>
                      <Image
                        source={{uri: item.img}}
                        style={{width: 100, height: 100, borderRadius: 5}}
                      />
                      <View style={{padding: 2}}>
                        <Text style={{fontSize: 12, color: '#5C5C5C'}}>
                          {item.text}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  horizontal
                />
              </View>
              <View style={style.SecondBanner}>
                <View style={{justifyContent: 'center', marginRight: 20}}>
                  <Image
                    source={require('../images/header.png')}
                    style={{width: 40, height: 55}}
                  />
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text
                    style={{
                      color: '#ffffff',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    Apakah Anda berpotensi?
                  </Text>
                  <Text style={{color: '#ffffff', fontSize: 12}}>
                    Lakukan pengisian penilaian mandiri untuk mendapatkan
                    penilaian risiko Anda terhadap hemofilia.
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: 3,
                      padding: 2,
                      width: '40%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 5,
                    }}
                    onPress={() =>
                      this.props.navigation.navigate('AssessmentIntro')
                    }>
                    <Text style={{fontSize: 12, color: '#5C5C5C'}}>
                      Cek disini
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={style.Blogs}>
                <Text
                  style={{
                    marginLeft: 10,
                    color: '#5C5C5C',
                    fontWeight: 'bold',
                  }}>
                  Berita Hemofilia
                </Text>
                <FlatList
                  data={this.state.news.data}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      style={style.BlogCard}
                      onPress={() =>
                        this.props.navigation.navigate('BlogShow', {
                          uuid: item.uuid,
                        })
                      }>
                      <Image
                        source={{uri: item.attributes.gambar}}
                        style={{width: 140, height: 100, borderRadius: 5}}
                      />
                      <View style={{marginTop: 5}}>
                        <Text style={{fontSize: 12, color: '#5C5C5C'}}>
                          {item.attributes.judul}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.uuid}
                  horizontal
                />
              </View>
              <View
                style={{
                  backgroundColor: '#ffff',
                  marginHorizontal: 15,
                  marginVertical: 15,
                  padding: 5,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#5C5C5C',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Didukung oleh
                </Text>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Image
                      source={require('../images/grifols.jpeg')}
                      style={{width: 60, height: 20}}
                    />
                  </View>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Image
                      source={require('../images/gagha.jpg')}
                      style={{width: 60, height: 20}}
                    />
                  </View>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Image
                      source={require('../images/ulm.jpeg')}
                      style={{width: 30, height: 30}}
                    />
                  </View>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Image
                      source={require('../images/rsud_ulin.png')}
                      style={{width: 50, height: 30}}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
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
  screenBody: {
    flex: 1,
    backgroundColor: '#CE1E20',
  },
  navbarContainer: {
    flex: 1 / 5,
    backgroundColor: '#CE1E20',
  },
  navbarIconLeft: {
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    elevation: 5,
  },
  navbarText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  HeaderTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  HeaderTitleHeading: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#ffffff',
  },
  HeaderTitleSub: {
    fontSize: 14,
    color: '#ffffff',
  },
  MainContent: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  mainBanner: {
    flex: 1 / 4,
    backgroundColor: '#ffffff',
    marginHorizontal: 10,
    marginTop: 5,
    padding: 20,
    borderRadius: 8,
    flexDirection: 'row',
    elevation: 3,
  },
  MainBannerContent: {
    flex: 1,
    justifyContent: 'center',
  },
  MainBannerButton: {
    width: 150,
    backgroundColor: '#CE1E20',
    marginTop: 10,
    padding: 4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainBannerImage: {
    justifyContent: 'center',
    padding: 5,
  },
  SignAndSymtomps: {
    flex: 1 / 2,
    backgroundColor: '#ffffff',
    marginHorizontal: 5,
    marginTop: 5,
    padding: 10,
  },
  SignsAndSymptomsCard: {
    width: 100,
    backgroundColor: '#ffffff',
    elevation: 3,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
    height: 180,
  },
  SecondBanner: {
    flex: 1 / 4,
    backgroundColor: '#CE1E20',
    marginHorizontal: 10,
    marginTop: 5,
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    elevation: 3,
  },
  Blogs: {
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
  },
  BlogCard: {
    width: 160,
    backgroundColor: '#ffffff',
    elevation: 3,
    padding: 6,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
    height: 150,
  },
});

export default Home;
