import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#111827',
          },
          headerTintColor: '#FFFFFF',
          headerShadowVisible: false,
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="withdraw-pi"
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="profile-edit"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="wallet-connections"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="settings/support"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="settings/about"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="referral"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="referral/history"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
