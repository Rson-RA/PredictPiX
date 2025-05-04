import api from "./config";
import { ReferralFilters, Referral, ReferralResponse } from "@/types/models";

const referralApi = {
    getReferralHistory: async (filters: ReferralFilters = {}): Promise<Referral[]> => {
        const response = await api.get('referral/history', {
          params: filters,
        });
        return response.data;
      },
    getMyReferrals: async (): Promise<ReferralResponse> => {
        const response = await api.get('referral/my-referral');
        return response.data;
      }
  };
  
  export default referralApi; 