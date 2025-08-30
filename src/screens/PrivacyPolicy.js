import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView  } from 'react-native-safe-area-context';

class PrivacyPolicy extends Component {
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
            </View>
            <View style={style.HeaderTitle}>
              <Text
                style={{fontWeight: 'bold', fontSize: 18, color: '#ffffff'}}>
                Privacy Policy
              </Text>
            </View>
          </View>
          <View style={style.MainContent}>
            <ScrollView>
              <Text style={style.Paragraph}>
                Fakultas Kedokteran Universitas Lambung Mangkurat built the Care
                for Hemophilia app as a Free app. This SERVICE is provided by
                Fakultas Kedokteran Universitas Lambung Mangkurat at no cost and
                is intended for use as is.
              </Text>
              <Text style={style.Paragraph}>
                This page is used to inform visitors regarding our policies with
                the collection, use, and disclosure of Personal Information if
                anyone decided to use our Service.
              </Text>
              <Text style={style.Paragraph}>
                If you choose to use our Service, then you agree to the
                collection and use of information in relation to this policy.
                The Personal Information that we collect is used for providing
                and improving the Service. We will not use or share your
                information with anyone except as described in this Privacy
                Policy.
              </Text>
              <Text style={style.Paragraph}>
                The terms used in this Privacy Policy have the same meanings as
                in our Terms and Conditions, which are accessible at Care for
                Hemophilia unless otherwise defined in this Privacy Policy.
              </Text>
              <Text style={{fontWeight: 'bold', marginVertical: 5}}>
                Information Collection and Use
              </Text>
              <Text style={style.Paragraph}>
                For a better experience, while using our Service, we may require
                you to provide us with certain personally identifiable
                information, including but not limited to Name (Optional),
                Gender (Optional), Birthday (Optional), Address (Optional),
                Health. The information that we request will be retained by us
                and used as described in this privacy policy.
              </Text>
              <Text style={style.Paragraph}>
                The app does use third-party services that may collect
                information used to identify you.
              </Text>
              <Text style={style.Paragraph}>
                Link to the privacy policy of third-party service providers used
                by the app Google Play Services
              </Text>
              <Text style={{fontWeight: 'bold', marginVertical: 5}}>
                Log Data
              </Text>
              <Text style={style.Paragraph}>
                We want to inform you that whenever you use our Service, in a
                case of an error in the app we collect data and information
                (through third-party products) on your phone called Log Data.
                This Log Data may include information such as your device
                Internet Protocol (“IP”) address, device name, operating system
                version, the configuration of the app when utilizing our
                Service, the time and date of your use of the Service, and other
                statistics.
              </Text>
              <Text style={{fontWeight: 'bold', marginVertical: 5}}>
                Service Providers
              </Text>
              <Text style={style.Paragraph}>
                We may employ third-party companies and individuals due to the
                following reasons:
              </Text>
              <Text>- To facilitate our Service;</Text>
              <Text>- To provide the Service on our behalf;</Text>
              <Text>- To perform Service-related services; or</Text>
              <Text>- To assist us in analyzing how our Service is used.</Text>
              <Text style={style.Paragraph}>
                We want to inform users of this Service that these third parties
                have access to their Personal Information. The reason is to
                perform the tasks assigned to them on our behalf. However, they
                are obligated not to disclose or use the information for any
                other purpose.
              </Text>
              <Text style={{fontWeight: 'bold', marginVertical: 5}}>
                Security
              </Text>
              <Text style={style.Paragraph}>
                We value your trust in providing us your Personal Information,
                thus we are striving to use commercially acceptable means of
                protecting it. But remember that no method of transmission over
                the internet, or method of electronic storage is 100% secure and
                reliable, and we cannot guarantee its absolute security.
              </Text>
              <Text style={{fontWeight: 'bold', marginVertical: 5}}>
                Children’s Privacy
              </Text>
              <Text style={style.Paragraph}>
                These Services do not address anyone under the age of 13. We do
                not knowingly collect personally identifiable information from
                children under 13 years of age. In the case we discover that a
                child under 13 has provided us with personal information, we
                immediately delete this from our servers. If you are a parent or
                guardian and you are aware that your child has provided us with
                personal information, please contact us so that we will be able
                to do the necessary actions.
              </Text>

              <Text style={{fontWeight: 'bold', marginVertical: 5}}>
                Changes to This Privacy Policy
              </Text>
              <Text style={style.Paragraph}>
                We may update our Privacy Policy from time to time. Thus, you
                are advised to review this page periodically for any changes. We
                will notify you of any changes by posting the new Privacy Policy
                on this page.
              </Text>
              <Text style={style.Paragraph}>
                This policy is effective as of 2023-01-28
              </Text>
              <Text style={{fontWeight: 'bold', marginVertical: 5}}>
                Contact Us
              </Text>
              <Text style={style.Paragraph}>
                If you have any questions or suggestions about our Privacy
                Policy, do not hesitate to contact us at
                Care4BloodUlm@gmail.com.
              </Text>
            </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  Paragraph: {
    marginVertical: 3,
  },
});

export default PrivacyPolicy;
