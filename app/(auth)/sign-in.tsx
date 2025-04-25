import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';
import { Stack, Link, useRouter } from 'expo-router';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    Alert.alert('Error', 'Please fill in all fields');
    setIsLoading(true);
    try {
      await login({ email, password });
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.content}>
          {/* Email Icon */}
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="email-outline" size={32} color="#FFFFFF" />
          </View>

          {/* Title and Subtitle */}
          <Text style={styles.title}>Sign In with Email</Text>
          <Text style={styles.subtitle}>
            Access your PredictPIX account or create a new one.
          </Text>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor="#6B7280"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder="••••••••"
                  placeholderTextColor="#6B7280"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <Pressable 
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons 
                    name={showPassword ? "eye-outline" : "eye-off-outline"} 
                    size={20} 
                    color="#6B7280" 
                  />
                </Pressable>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.signInButton}
              onPress={handleSignIn}
              disabled={isLoading}
            >
              <Text style={styles.signInButtonText}>
              {isLoading ? 'Signing In...' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <Text style={styles.dividerText}>or</Text>
            </View>

            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <Link href="/sign-up" style={styles.signUpLink}>Sign Up</Link>
            </View>
          </View>

          {/* Back Button */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBack}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    width: '100%',
    gap: 20,
  },
  inputContainer: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 14,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 14,
  },
  signInButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPassword: {
    color: '#9CA3AF',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 16,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerText: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
    width: '100%',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  signUpLink: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '500',
  },
  backButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 