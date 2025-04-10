import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import BottomTabNavigator from './BottomTabNavigator';
import MarketDetailScreen from '../screens/MarketDetailScreen';
import SignIn from '../screens/SignIn';
import CreateMarket1 from '../screens/CreateMarket1';
import CreateMarket2 from '../screens/CreateMarket2';
import CreateMarket3 from '../screens/CreateMarket3';
import CreateMarket4 from '../screens/CreateMarket4';
import ChooseMarketScreen from '../screens/ChooseMarketScreen';
import ConfirmPurchaseScreen from '../screens/ConfirmPurchaseScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="ChooseMarket" component={ChooseMarketScreen} />
      <Stack.Screen name="CreateMarket1" component={CreateMarket1} />
      <Stack.Screen name="CreateMarket2" component={CreateMarket2} />
      <Stack.Screen name="CreateMarket3" component={CreateMarket3} />
      <Stack.Screen name="CreateMarket4" component={CreateMarket4} />
      <Stack.Screen
        name="MarketDetail"
        component={MarketDetailScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="ConfirmPurchase"
        component={ConfirmPurchaseScreen}
        options={{
          animation: 'slide_from_bottom',
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator; 