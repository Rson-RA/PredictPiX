export interface Market {
  id: number;
  title: string;
  description: string;
  end_time: string;
  resolution_time: string;
  status: 'pending' | 'active' | 'closed' | 'settled' | 'cancelled';
  total_pool: number;
  yes_pool: number;
  no_pool: number;
  correct_outcome?: string;
  creator_fee_percentage: number;
  platform_fee_percentage: number;
  creator: {
    id: number;
    username: string;
  };
  created_at: string;
  updated_at: string;
  total_predictions: number;
  category?: string;
}

export interface Prediction {
  id: number;
  market_id: number;
  user_id: number;
  prediction_value: string;
  confidence: number;
  stake_amount: number;
  status: 'pending' | 'won' | 'lost';
  created_at: string;
  updated_at: string;
  reward_amount: number | null;
  user: {
    username: string;
    avatar_url: string | null;
  };
}

export interface Transaction {
  id: number;
  user_id: number;
  type: 'deposit' | 'withdrawal' | 'stake' | 'reward';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
  description: string;
  market_id?: number;
  prediction_id?: number;
}

export interface Review {
  id: number;
  market_id: number;
  user_id: number;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
  user: {
    username: string;
    avatar_url: string | null;
  };
} 

export interface User {
    id: number;
    pi_user_id: string | null;
    email: string;
    username: string;
    phone_number: string;
    firstname: string;
    lastname: string;
    hashed_password: string;
    avatar_url: string | null;
    role: string
    balance: number;
    is_active: boolean;
    referral_code: string;
    referral_earnings: number;
    referred_by_id: number | null;
    created_at: string;
    updated_at: string;
}

export interface Trader extends User {
  total_profit: number;
  total_predictions: number;
  win_rate: number;
  rank?: number;
}

export interface Profile extends User {
  total_referrals: number;
  total_earnings_from_referrals: number;
  total_profit: number;
  predictions: number;
  win_rate: number;
  rank: number;
  created_at: string;
  updated_at: string;
}

interface TraderResponse {
  items: Trader[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}


