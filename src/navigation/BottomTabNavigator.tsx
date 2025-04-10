import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useColorScheme, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type {RootTabParamList} from './types';
import {colors, typography, spacing} from '../styles/theme';
import AppHeader from '../components/AppHeader';

// Screen imports
import HomeScreen from '../screens/HomeScreen';
import MarketsScreen from '../screens/MarketsScreen';
import PortfolioScreen from '../screens/PortfolioScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();

const BottomTabNavigator: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.navigation.active,
        tabBarInactiveTintColor: colors.navigation.inactive,
        tabBarLabelStyle: styles.tabLabel,
        headerStyle: {
          backgroundColor: colors.background.primary,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: colors.text.primary,
        headerTitleStyle: styles.headerTitle,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icon name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Markets"
        component={MarketsScreen}
        options={{
          header: () => <AppHeader title="PiPredict" />,
          tabBarIcon: ({color}) => (
            <Icon name="chart-line" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="briefcase" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{
          header: () => <AppHeader title="PiPredict" />,
          tabBarIcon: ({color}) => (
            <Icon name="trophy" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="account" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.navigation.background,
    borderTopWidth: 0,
    elevation: 0,
    height: 60,
    paddingBottom: spacing.xs,
    paddingTop: spacing.xs,
  },
  tabLabel: {
    fontSize: typography.sizes.xs,
    fontFamily: 'System',
    fontWeight: typography.weights.medium,
    marginBottom: 0,
  },
  headerTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
  },
});

export default BottomTabNavigator; 