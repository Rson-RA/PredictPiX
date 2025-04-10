import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {CompositeScreenProps} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Main: undefined;
  ChooseMarket: undefined;
  CreateMarket1: undefined;
  CreateMarket2: undefined;
  CreateMarket3: undefined;
  CreateMarket4: undefined;
  ConfirmPurchase: {
    marketQuestion: string;
    position: string;
    probability: number;
    stake: number;
    potentialProfit: number;
    fee: number;
  };
  MarketDetail: {
    market: {
      category: string;
      title: string;
      volume: string;
      timeRemaining: string;
      totalTrades: number;
      currentPrice: number;
      yesPrice: number;
      noPrice: number;
      chartData: number[];
    };
  };
};

export type RootTabParamList = {
  Home: undefined;
  Markets: undefined;
  Portfolio: undefined;
  Leaderboard: undefined;
  Profile: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type RootTabScreenProps<T extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>; 