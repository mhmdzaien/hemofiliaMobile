import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Menu from '../../components/Menu';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AssessmentLanguage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      languages: '',
    };
  }

  getData = () => {
    fetch('https://care4blood.ulm.ac.id/api/bahasa/')
      .then(response => response.json())
      .then(json => this.setState({languages: json}))
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View
            style={{
              backgroundColor: '#ffffff',
              justifyContent: 'center',
              paddingVertical: 15,
              paddingHorizontal: 15,
              flexDirection: 'row',
              elevation: 5,
            }}>
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
          <View style={{flex: 1, paddingTop: 10}}>
            {/* content */}
            <View style={{flex: 1, marginHorizontal: 10}}>
              {this.state.languages.data ? (
                <TouchableOpacity
                  style={{
                    backgroundColor: '#ffffff',
                    elevation: 3,
                    padding: 8,
                    margin: 5,
                    borderRadius: 5,
                    alignItems: 'center',
                    height: 130,
                    flexDirection: 'row',
                  }}
                  onPress={() =>
                    this.props.navigation.navigate('Assessment', {
                      uuid: this.state.languages.data.uuid,
                    })
                  }>
                  <Image
                    source={{uri: this.state.languages.data.attributes.gambar}}
                    style={{width: 130, height: 100, borderRadius: 5}}
                  />
                  <View style={{flex: 1, paddingHorizontal: 10}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 24,
                        color: '#303030',
                      }}>
                      {this.state.languages.data.attributes.bahasa}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <></>
              )}
            </View>
          </View>
          <Menu screenName="Assessment" />
        </View>
      </SafeAreaView>
    );
  }
}

export default AssessmentLanguage;
