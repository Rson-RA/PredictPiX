import { Tabs } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  console.log('colorScheme', colorScheme);
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? '#111827F2' : '#ffffff',
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
        },
        tabBarActiveTintColor: '#8B5CF6', // Purple color for active tab
        tabBarInactiveTintColor: isDark ? '#6B7280' : '#9CA3AF',
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="markets"
        options={{
          title: 'Markets',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="bar-chart" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="portfolio"
        options={{
          title: 'Portfolio',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="briefcase" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="trophy" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
