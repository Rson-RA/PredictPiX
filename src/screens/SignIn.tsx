import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignIn = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = () => {
    // Handle regular sign in logic here
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    // Add your email/password authentication logic here
  };

  const handlePiNetworkSignIn = async () => {
    try {
      setIsLoading(true);
      // Here you would typically:
      // 1. Initialize Pi Network SDK
      // 2. Request user authentication
      // 3. Handle the authentication response
      
      // For now, we'll simulate a successful authentication
      setTimeout(() => {
        setIsLoading(false);
        // Navigate to the main screen
        navigation.replace('Main');
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Failed to sign in with Pi Network. Please try again.');
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.contentContainer}>
        {/* Logo and Title */}
        <View style={styles.headerContainer}>
          <Text style={styles.logoText}>
            Predict<Text style={styles.logoHighlight}>PiX</Text>
          </Text>
          <View style={styles.iconContainer}>
            <Icon name="stats-chart" size={32} color="#8B5CF6" />
          </View>
          <Text style={styles.title}>Predict Smarter</Text>
          <Text style={styles.subtitle}>
            Welcome to PredictPiX – the decentralized prediction market powered by Pi.
          </Text>
        </View>

        {/* Pi Network Sign In Button */}
        <TouchableOpacity
          style={[styles.piNetworkButton, isLoading && styles.piNetworkButtonDisabled]}
          onPress={handlePiNetworkSignIn}
          disabled={isLoading}
        >
          {isLoading ? (
            <Text style={styles.piNetworkButtonText}>Connecting...</Text>
          ) : (
            <>
              <Icon name="logo-bitcoin" size={24} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.piNetworkButtonText}>Sign In with Pi Network</Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.dividerText}>or sign in with email</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Icon name="mail-outline" size={20} color="#6B7280" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#6B7280"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Icon name="lock-closed-outline" size={20} color="#6B7280" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#6B7280"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Sign In Button */}
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        {/* Create Account Link */}
        <TouchableOpacity style={styles.createAccountContainer} onPress={handleCreateAccount}>
          <Text style={styles.createAccountText}>
            New here? <Text style={styles.createAccountLink}>Create an account</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#111827',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  logoHighlight: {
    color: '#FF9500',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#2D2E3D',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  piNetworkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B5CF6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  piNetworkButtonDisabled: {
    opacity: 0.7,
  },
  buttonIcon: {
    marginRight: 8,
  },
  piNetworkButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerText: {
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D2E3D',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 16,
  },
  signInButton: {
    backgroundColor: '#8B5CF6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  createAccountContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  createAccountText: {
    color: '#6B7280',
    fontSize: 14,
  },
  createAccountLink: {
    color: '#8B5CF6',
    textDecorationLine: 'underline',
  },
});

export default SignIn; 