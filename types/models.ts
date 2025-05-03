export interface Market {
  id: number;
  creator_id: number;
  title: string;
  description: string;
  end_time: string;
  resolution_time: string;
  status: 'pending' | 'active' | 'closed' | 'settled' | 'cancelled';
  tier: 'basic' | 'trusted' | 'partner';
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
  category?: string;
  market_metadata?: {
    yes: string;
    no: string;
    source: string;
    yesDescription: string;
    noDescription: string;

  };
  total_predictions: number;
  user_prediction_amount: number;
  user_predicted_outcome: string;
  total_markets_by_creator: number;
  current_odds: {
    yes: number;
    no: number;
  };
  implied_probabilities: {
    yes: number;
    no: number;
  };
}

export interface MarketCreate {
  tier: string;
  title: string;
  description: string;
  resolution_time: string;
  creator_fee_percentage: number;
  platform_fee_percentage: number;
  metadata: {
    yes: string;
    no: string;
    source: string;
    yesDescription: string;
    noDescription: string;
  };
  end_time: string;
}

export interface PlacePredictResponse {
  prediction_id: number;
  transaction_hash: string;
  block_number: string;
}

export interface Prediction {
  id: number;
  market_id: number;
  user_id: number;
  amount: number;
  predicted_outcome: string;
  potential_winnings: number;
  status: 'pending' | 'active' | 'won' | 'lost' | 'cancelled';
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    pi_user_id: string | null;
    email: string;
    username: string;
    phone_number: string;
    firstname: string;
    lastname: string;
    avatar_url: string | null;
  };
  market: {
    title: string;
    description: string;
    end_time: string;
    status: string;
    tier: string;
    resolution_time: string;
    creator_fee_percentage: number;
    platform_fee_percentage: number;
    creator: {
      username: string;
      avatar_url: string | null;
    };
  };
  reward: {
    amount: number;
    status: 'pending' | 'processed' | 'failed' | 'cancelled';
    created_at: string;
    updated_at: string;
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


