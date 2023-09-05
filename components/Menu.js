import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Menu = ({screenName}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 10,
        backgroundColor: '#ffffff',
        elevation: 5,
      }}>
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        onPress={() => navigation.navigate('Home')}>
        <Icon
          name="home"
          size={25}
          color={screenName == 'Home' ? '#CE1E20' : '#D5D5D5'}
        />
        <Text style={{fontSize: 10, fontWeight: 'bold'}}>Beranda</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        onPress={() => navigation.navigate('Blog')}>
        <Icon
          name="newspaper"
          size={25}
          color={screenName == 'Blogs' ? '#CE1E20' : '#D5D5D5'}
        />
        <Text style={{fontSize: 10, fontWeight: 'bold'}}>Berita</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        onPress={() => navigation.navigate('AssessmentIntro')}>
        <Icon
          name="file-signature"
          size={25}
          color={screenName == 'Assessment' ? '#CE1E20' : '#D5D5D5'}
        />
        <Text style={{fontSize: 10, fontWeight: 'bold'}}>Pemeriksaan</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        onPress={() => navigation.navigate('RsNearby')}>
        <Icon
          name="building"
          size={25}
          color={screenName == 'RsNearby' ? '#CE1E20' : '#D5D5D5'}
        />
        <Text style={{fontSize: 10, fontWeight: 'bold'}}>Rumah Sakit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        onPress={() => navigation.navigate('Login')}>
        <Icon
          name="user"
          size={25}
          color={screenName == 'Login' ? '#CE1E20' : '#D5D5D5'}
        />
        <Text style={{fontSize: 10, fontWeight: 'bold'}}>Profil</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Menu;
