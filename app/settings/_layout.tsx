import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="wallet-connections" options={{ headerShown: false }} />
        <Stack.Screen name="security" options={{ headerShown: false }} />
        <Stack.Screen name="profile-edit" options={{ headerShown: false }} />
        <Stack.Screen name="terms" options={{ headerShown: false }} />
        <Stack.Screen name="about" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

