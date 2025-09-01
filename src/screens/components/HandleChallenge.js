import React, { useState } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

  const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const HandleChallenge = () => {
    const [isVisible, setVisible] = useState(true);
    const [url, setUrl] = useState('https://care4blood.ulm.ac.id/api/rumahSakit?page=2&search=&longitude=-122.083922&latitude=37.4217937');

    const toggleVisibility = (visibility, url) => {
        setVisible(visibility); // Toggle the value of isVisible
        setUrl(url);
    };

    const handleNavigationStateChange = (navState) => {
        // Cek jika challenge sudah selesai
        // Extract cookies atau token
        // setVisible(false);
        // onSuccess(navState);
    };

    const [cookies, setCookies] = useState('');
    // JavaScript yang akan diinjeksi ke WebView
    const injectedJavaScript = `
    (function() {
      // Kirim cookies ke React Native
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'COOKIES',
        cookies: document.cookie
      }));
    })();
    true; // note: this is required, or you'll sometimes get silent failures
  `;

    // Handle message dari WebView
    const onMessage = (event) => {
        try {
            const data = JSON.parse(event.nativeEvent.data);
            if (data.type === 'COOKIES') {
                setCookies(data.cookies);
                console.log('Cookies from WebView:', data);
            }
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    };

    return (
        isVisible ? <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: url }}
                style={{ flex: 1 }}
                injectedJavaScript={injectedJavaScript}
                onMessage={onMessage}
                sharedCookiesEnabled={true}
                thirdPartyCookiesEnabled={true}
                userAgent={userAgent}
                onNavigationStateChange={handleNavigationStateChange}
            />
        </View> : <View></View>
    );
};

export default HandleChallenge;