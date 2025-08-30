import {Component} from 'react';
import {Linking} from 'react-native';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView  } from 'react-native-safe-area-context';

class Explanation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      penjelasan: [
        {
          text: 'Gangguan pembekuan darah yang diturunkan, akibat tubuh kekurangan faktor VIII ataupun faktor IX',
        },
        {
          text: 'Kondisi ini menimbulkan pendarahan yang tidak seharusnya, bahkan pendarahan spontan',
        },
        {
          text: 'Semakin rendah jumlah faktor VIII atau IX di dalam tubuh, maka pendarahan yang timbul menjadi semakin hebat dan dapat menyebabkan masalah kesehatan yang serius',
        },
      ],
      berpotensi: [
        {
          text: 'Anak dari orang tua yang salah satu atau keduanya menderita hemofilia',
        },
        {
          text: 'Memiliki keluarga dekat dengan riwayat hemofilia atau gangguan pembekuan darah',
        },
        {
          text: 'Jenis kelamin laki-laki',
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
                Tentang Hemofilia
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
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#CE1E20',
                    marginBottom: 3,
                  }}>
                  Apa itu Hemofilia ?
                </Text>
                <FlatList
                  data={this.state.penjelasan}
                  renderItem={({item}) => (
                    <View style={{flexDirection: 'row', marginVertical: 5}}>
                      <Text
                        style={{
                          fontSize: 18,
                          marginHorizontal: 5,
                          color: '#CE1E20',
                        }}>
                        •
                      </Text>
                      <Text style={{fontSize: 12, color: '#5C5C5C', flex: 1}}>
                        {item.text}
                      </Text>
                    </View>
                  )}
                  keyExtractor={({item, index}) => index}
                />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: '#ffffff',
                marginHorizontal: 8,
                marginVertical: 10,
                padding: 20,
                borderRadius: 8,
                flexDirection: 'row',
                elevation: 3,
              }}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#CE1E20',
                    marginBottom: 3,
                  }}>
                  Siapa yang berpotensi ?
                </Text>
                <FlatList
                  data={this.state.berpotensi}
                  renderItem={({item}) => (
                    <View style={{flexDirection: 'row', marginVertical: 5}}>
                      <Text
                        style={{
                          fontSize: 18,
                          marginHorizontal: 5,
                          color: '#CE1E20',
                        }}>
                        •
                      </Text>
                      <Text style={{fontSize: 12, color: '#5C5C5C', flex: 1}}>
                        {item.text}
                      </Text>
                    </View>
                  )}
                  keyExtractor={({item, index}) => index}
                />
                <Text
                  onPress={() =>
                    Linking.openURL(
                      'https://www.cdc.gov/ncbddd/hemophilia/facts.html',
                    )
                  }
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: 'black',
                    marginBottom: 3,
                  }}>
                  Sumber:{'\n'}
                  https://www.cdc.gov/ncbddd/hemophilia/facts.html
                </Text>
              </View>
            </View>
          </View>
          <View>
            {/* content */}

            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 10,
                backgroundColor: '#ffffff',
                elevation: 5,
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => this.props.navigation.navigate('Home')}>
                <Icon name="home" size={25} color="#CE1E20" />
                <View style={{borderBottomWidth: 1, width: 20, marginTop: 2}} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => this.props.navigation.navigate('Blog')}>
                <Icon name="newspaper" size={25} color="#D5D5D5" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() =>
                  this.props.navigation.navigate('AssessmentIntro')
                }>
                <Icon name="file-signature" size={25} color="#D5D5D5" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => this.props.navigation.navigate('Login')}>
                <Icon name="user" size={25} color="#D5D5D5" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default Explanation;
