import { logger } from '@/utils';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Modal, View, Platform, Linking, Alert } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
// import { PiWalletService } from '@/api/piWallet';


interface PiAuthWebViewProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: (userInfo: UserInfo) => void;
}

interface UserInfo {
    uid: string;
    accessToken: string;
    username: string;
    wallet_address: string;
  }

const PiAuthWebView = ({ visible, onClose, onSuccess }: PiAuthWebViewProps): JSX.Element => {

  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

  const handleDeepLink = (navState: WebViewNavigation) => {
    const url = navState.url;
    logger('PiAuthWebView', url);
    const parsed = new URL(url);
    const uid = parsed.searchParams.get('uid') || "";
    const accessToken = parsed.searchParams.get('accessToken') || "";
    const username = parsed.searchParams.get('username') || "";
    const wallet_address = parsed.searchParams.get('wallet_address') || "";
    if (uid && accessToken) {
    //   setUserInfo({ uid, accessToken, username, wallet_address });
      Alert.alert('Authenticated!', `UID: ${uid}`);
      onSuccess({ uid, accessToken, username, wallet_address });
    }
    // onClose();
    logger("piview close", visible);
  };

  useEffect(() => {
    logger("piview open", visible);
  }, [])

  const handleMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    logger('handleMessage', data);
    if (data.user && data.user.uid) {
      Alert.alert('Login Successful', `Welcome ${data.user.username}`);
      // Send token to backend to verify signature and log in user
    } else {
      Alert.alert('Login Failed', 'Authentication error');
    }
  };

  useEffect(() => {
    if (!isMobile) {
      const handleMessage = (event: any) => {
        console.log('Message from iframe:', event.data);
      };

      window.addEventListener('message', handleMessage);
      
      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }
  }, []);

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
      presentationStyle="pageSheet"
      transparent={false}
    >
      <View style={styles.container}>
        {isMobile ? (
          <WebView
            source={{ uri: 'http://192.168.109.117:8000/pi' }}
            // onNavigationStateChange={handleDeepLink}
            style={styles.webview}
            onMessage={handleMessage}
            javaScriptEnabled={true}
          /> 
        ) : (
          <iframe
            // src="http://192.168.109.117:8000/pi"
            src="https://app.teamscorecards.online/pi.html"
            style={{ width: '100%', height: '100vh', border: 'none' }}
            title="HTML Page"
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  webview: {
    flex: 1,
  },
});

export default PiAuthWebView; 