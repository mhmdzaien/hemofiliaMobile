import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {WebView} from 'react-native-webview';
class Symptoms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symptoms: [
        {
          title: 'Pendarahan pada persendian',
          body: 'Adanya bengkak di sendi/pendarahan sendi seperti di area lutut, siku, pergelangan kaki tanpa didahului trauma yang bermakna',
          img: 'https://care4blood.ulm.ac.id/frontTemplate/img/icon/ikon%206.png',
        },
        {
          title: 'Mudah mengalami memar',
          body: 'Mudah mengalami memar',
          img: 'https://care4blood.ulm.ac.id/frontTemplate/img/icon/ikon%205.png',
        },
        {
          title: 'Pendarahan pada mulut dan gusi',
          body: 'Adanya pendarahan selaput bibir, mimisan, gusi berdarah ataupun saluran cerna tanpa pencetus yang jelas',
          img: 'https://care4blood.ulm.ac.id/frontTemplate/img/icon/ikon%202.png',
        },
        {
          title: 'Pendarahan sulit berhenti setelah sunat',
          body: 'Adanya buang air kecil kemerahan/kecoklatan/berdarah tanpa pencetus yang jelas',
          img: 'https://care4blood.ulm.ac.id/frontTemplate/img/icon/ikon%203.png',
        },
        {
          title: 'Pendarahan setelah disuntik',
          body: '-',
          img: 'https://care4blood.ulm.ac.id/frontTemplate/img/icon/ikon%205.png',
        },
        {
          title: 'mimisan yang sulit dihentikan.',
          body: 'Adanya pendarahan kepala tanpa trauma yang bermakna',
          img: 'https://care4blood.ulm.ac.id/frontTemplate/img/icon/ikon%201.png',
        },
      ],
    };
  }

  componentDidMount() {}
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: '#CE1E20'}}>
          <View style={{flex: 1 / 5, backgroundColor: '#CE1E20'}}>
            <View
              style={{
                justifyContent: 'center',
                paddingVertical: 15,
                paddingHorizontal: 15,
                flexDirection: 'row',
                elevation: 5,
              }}>
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
                style={{fontWeight: 'bold', fontSize: 18, color: '#ffffff'}}>
                Gejala Hemofilia
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
            <View
              style={{
                flex: 1,
                backgroundColor: '#ffffff',
                marginHorizontal: 10,
                marginVertical: 10,
                padding: 20,
                borderRadius: 8,
                flexDirection: 'row',
                elevation: 3,
              }}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <FlatList
                  data={this.state.symptoms}
                  renderItem={({item}) => (
                    <View
                      style={{
                        flex: 1 / 5,
                        backgroundColor: '#ffffff',
                        marginHorizontal: 10,
                        marginTop: 5,
                        marginBottom: 5,
                        padding: 10,
                        borderRadius: 20,
                        flexDirection: 'row',
                        elevation: 3,
                      }}>
                      <View>
                        <Image
                          source={{uri: item.img}}
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
                          {item.title}
                        </Text>
                        {/* <Text style={{fontSize:14,textAlign:'justify',color:'#5C5C5C'}}>{item.position}</Text> */}
                        <Text
                          style={{
                            fontSize: 12,
                            textAlign: 'left',
                            marginTop: 5,
                            color: '#5C5C5C',
                          }}>
                          {item.body}
                        </Text>
                      </View>
                    </View>
                  )}
                  keyExtractor={(item, key) => item.title}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default Symptoms;
