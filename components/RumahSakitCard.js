import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Touchable,
  TouchableOpacity,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import {Image as RNImage} from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row',
  },

  titleContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  subTitle: {},
  title: {
    flexWrap: 'wrap',
    fontWeight: 'bold',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  imageContainer: {
    padding: 5,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const showMap = row => {
  if (row.latitude && row.longitude) {
    const scheme = Platform.select({
      ios: 'maps://0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${row.latitude},${row.longitude}`;
    const label = row.nama_rumah_sakit;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  } else {
    Alert.alert('Informasi', 'Lokasi pada map belum tersedia', [
      {
        cancelable: true,
        text: 'Tutup',
      },
    ]);
  }
};

const RumahSakitCard = ({data}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{data.nama_rumah_sakit}</Text>
        <Text style={styles.subTitle}>{data.alamat}</Text>
        <Text style={styles.subTitle}>Kontak : {data.no_telpon}</Text>
        <Text style={styles.subTitle}>
          Jarak : {data.jarak ? Math.round(Number(data.jarak) / 100) / 10 : '-'}{' '}
          KM
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => showMap(data)}>
          <Image
            style={styles.image}
            source={require('../src/images/show-map.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RumahSakitCard;
