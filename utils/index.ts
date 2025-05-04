import { BASE_URL } from '@/constants/Config';
import { formatDate } from './date';

const getFullAvatarUrl = (avatarUrl: string | null | undefined) => {
    if (!avatarUrl) {
        return `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 100)}`;
    }
    return BASE_URL + avatarUrl;
};

const getFullName = (firstName: string, lastName: string) => {
    if (!firstName && !lastName) {
        return 'Unknown';
    }
    return `${firstName} ${lastName}`;
};

const getTimeLeft = (endTime: string) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end.getTime() - now.getTime();
    return diff;
};

// Helper function to safely calculate time remaining
const getTimeRemaining = (endTimeStr: string): { value: number; unit: 'days' | 'hours' } | null => {
    try {
      const endTime = new Date(endTimeStr).getTime();
      const now = new Date().getTime();
      
      if (isNaN(endTime)) {
        return null;
      }
      
      const diffMs = endTime - now;
      if (diffMs <= 0) {
        return null;
      }
      
      const days = Math.ceil(diffMs / (24 * 60 * 60 * 1000));
      if (days > 0) {
        return { value: days, unit: 'days' };
      }
      
      const hours = Math.ceil(diffMs / (60 * 60 * 1000));
      return { value: hours, unit: 'hours' };
    } catch {
      return null;
    }
  };
  
  // Helper function to render time remaining
  const renderTimeRemaining = (endTime: string): string => {
    const remaining = getTimeRemaining(endTime);
    if (!remaining) {
      return 'Ended';
    }
    return `${remaining.value}${remaining.unit === 'days' ? 'd' : 'h'} left`;
  };

  const logger = (tag: string, message: any) => {
    console.log(`[${new Date().toISOString()}] ${tag}`, message);
  }

  const getValidName = (firstname: string | null | undefined, lastname: string | null | undefined, username: string | null | undefined): string => {
    if (!firstname && !lastname) {
        return username || 'Unknown';
    }
    return `${firstname} ${lastname}`;
  }

export { getFullAvatarUrl, getFullName, getTimeLeft, getTimeRemaining, renderTimeRemaining, formatDate, logger, getValidName };


