import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Menu from '../../components/Menu';

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      news: {},
      newsShow: {},
    };
  }

  getData = () => {
    fetch('https://care4blood.ulm.ac.id/api/berita/')
      .then(response => response.json())
      .then(json => {
        this.setState({news: json}), this.setState({newsShow: json});
      })
      .catch(err => console.log(err));
  };

  //   pencarian = () => {
  //     let data = this.state.news.data;
  //     // console.log(data)

  //     data = data.filter((item) => console.log(item.judul));

  //     this.setState({newsShow:data});
  //     console.log(data)
  // }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
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
                style={{fontWeight: 'bold', fontSize: 18, color: '#ffffff'}}>
                Berita Hemofilia
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
            {/* content */}
            {/* <View style={{marginHorizontal:10,marginVertical:10}}>
                <TextInput 
                  style={{borderBottomWidth:1,borderColor:'#D5D5D5'}}
                  placeholder="search .." 
                  value={this.state.search}
                  onChangeText={(text) => this.setState({search:text}, () => this.pencarian())}
                />
            </View> */}
            <View style={{flex: 1, marginHorizontal: 10}}>
              <FlatList
                data={this.state.newsShow.data}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    style={style.CardBlog}
                    onPress={() =>
                      this.props.navigation.navigate('BlogShow', {
                        uuid: item.uuid,
                      })
                    }>
                    <Image
                      source={{uri: item.attributes.gambar}}
                      style={{width: 130, height: 100, borderRadius: 5}}
                    />
                    <View style={{flex: 1, paddingHorizontal: 10}}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 14,
                          color: '#5C5C5C',
                        }}>
                        {item.attributes.judul}
                      </Text>
                      <Text
                        style={{
                          color: '#CE1E20',
                          textAlign: 'justify',
                          marginTop: 3,
                          fontSize: 12,
                        }}>
                        {item.attributes.created_at}
                      </Text>
                      <Text
                        style={{
                          color: 'lightgrey',
                          textAlign: 'justify',
                          marginTop: 3,
                          fontSize: 12,
                        }}>
                        {item.attributes.admin}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.uuid}
              />
            </View>
          </View>
          <Menu screenName="Blogs" />
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
  CardBlog: {
    backgroundColor: '#ffffff',
    elevation: 3,
    padding: 8,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
    height: 130,
    flexDirection: 'row',
  },
});
export default Blog;
