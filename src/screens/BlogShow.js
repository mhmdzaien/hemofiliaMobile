import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {WebView} from 'react-native-webview';
import Menu from '../../components/Menu';
import { SafeAreaView  } from 'react-native-safe-area-context';

class BlogShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: '',
    };
  }

  getData = () => {
    fetch(
      `https://care4blood.ulm.ac.id/api/berita/${this.props.route.params.uuid}`,
    )
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
              <Icon name="user" size={20} color="#ffffff" />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <Text
                style={{fontWeight: 'bold', fontSize: 16, color: '#ffffff'}}>
                {this.state.news.judul}
              </Text>
              <Text style={{fontSize: 12, color: '#ffffff'}}>
                {this.state.news.admin} - {this.state.news.created_at}
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
              paddingTop: 20,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Image
                source={{uri: this.state.news.gambar}}
                style={{width: 350, height: 200, borderRadius: 20}}
              />
            </View>
            <WebView
              originWhitelist={['*']}
              source={{html: this.state.news.isi}}
              style={{marginTop: 20}}
            />
          </View>
          <Menu screenName="Blogs" />
        </View>
      </SafeAreaView>
    );
  }
}

export default BlogShow;
